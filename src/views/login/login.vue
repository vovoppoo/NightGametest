<template>
    <div class="page-main">
        <div class="login-view">
            <div class="login-logo-view">
                <div class="logo-ico">
                    <img src="./../../assets/image/signin-logo.png" alt=""/>
                </div>
                <div class="logo-label">
                    <div class="title-big">
                        深圳市气象局(台)项目一体化管理平台
                    </div>
                    <div class="title-min">
                        Meteorological Bureau Shenzhen Municipality
                    </div>
                </div>
            </div>
            <el-form
                    v-if="noSigning"
                    onkeypress="if(event.keyCode==13){return false;}"
                    onkeyup="if(event.keyCode==13){return false;}"
                    onkeydown="if(event.keyCode==13){return false;}"
                    :model="loginData"
                    :rules="rulesLogin"
                    ref="loginForm"
                    class="login-ruleForm"
            >
                <div class="sign-in-view">
                    <div class="input-row">
                        <el-form-item prop="account">
                            <el-input
                                    @input="refreshPasswrodFn"
                                    @keyup.native.enter="toFocus('[name=password]')"
                                    v-model="loginData.account"
                                    placeholder="账号"
                            />
                        </el-form-item>
                    </div>
                    <div class="input-row">
                        <el-form-item prop="password">
                            <el-input
                                    name="password"
                                    v-model="loginData.password"
                                    type="password"
                                    @keyup.native.enter="submitForm('loginForm')"
                                    placeholder="密码"
                            />
                        </el-form-item>
                    </div>

                    <div class="sig-in-button">
                        <el-form-item>
                            <el-button
                                    type="primary"
                                    v-loading="goLoading"
                                    @click.stop.prevent="submitForm('loginForm')"
                            >
                                <i v-if="goLoading" class="el-icon-upload"/>
                                <span v-else="">{{buttonString}}</span>
                            </el-button>
                        </el-form-item>
                    </div>
                </div>
            </el-form>
        </div>
    </div>
</template>
<style lang="less" scoped>
    .page-main {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;

        .login-logo-view {
            position: absolute;
            top: -160px;
            left: -67px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 550px;

            .logo-ico img {
                width: 70px;
                height: 70px;
            }

            .logo-label {
                color: #8a8585;
                text-align: center;

                .title-big {
                    font-weight: bold;
                    font-size: 28px;
                    padding-bottom: 10px;
                }

                .title-min {
                    font-size: 14px;
                }
            }
        }

        .login-view {
            position: relative;

            .input-row {
                padding: 0 15px;
                width: 420px;
            }
        }

        .sig-in-button {
            padding-top: 20px;

            /*.el-button {*/
            /*  background: #b4e5fb;*/
            /*}*/

            /*.el-button:focus, .el-button:hover {*/
            /*  color: #409EFF;*/
            /*  border-color: #c6e2ff;*/
            /*  background-color: #ecf5ff;*/
            /*}*/

            .el-form-item .el-form-item__content {
                text-align: center !important;
            }

            button {
                width: 420px;
                font-weight: bold;
            }
        }
    }

    .el-form-item .el-form-item__content .el-input .el-input__inner {
        border-color: #dc6a23;
    }
</style>
<script>
  import Api from '../../api';
  import MD5 from 'md5';

  export default {
    name: 'login',
    data() {
      const checkuUser = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入账号'));
        }
        setTimeout(() => {
          callback();
        }, 100);
      };
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        goLoading: false,
        noSigning: true,
        dataList: [],
        buttonString: '登录',
        loginData: {
          account: '',
          password: '',
        },
        text: [
          'all',
          'ResponsibleUnit',
          'Department',
          'ProjectStatus',
          'AssetStatus',
          'PurchaseMethod',
          'FunctionAccount',
          'PerformanceClassification',
          'BusinessType',
          'EconomicSubject',
          'ExpenseType',
          'UserRights',
          'UserStatus',
          'AssetType',
          'planType',
          'projectDu',
          'projectDuSub',
        ],
        rulesLogin: {
          password: [
            {
              validator: validatePass,
              trigger: 'change',
            },
          ],
          account: [
            {
              validator: checkuUser,
              trigger: 'change',
            },
          ],
        },
      };
    },
    created() {
      this.getConfigurationFn();
    },
    mounted() {
    },
    methods: {
      toFocus(el) {
        const ele = document.querySelector(el);
        ele.focus();
      },
      refreshPasswrodFn() {
        if (this.loginData.password.length > 0) {
          this.loginData.password = '';
        }
      },
      getConfigurationFn() {
        this.goLoading = true;
        let params = {};
        Api.getFilterList(params).then(res => {
          if (res.code === 0) {
            this.buttonString = '登 录';
            const thisList = res.response;
            let _FilterList = {
              all: [],
              ResponsibleUnit: [],//责任单位
              Department: [],//部门
              ProjectStatus: [],//项目状态
              AssetStatus: [],//资产状态
              PurchaseMethod: [],//采购方式
              FunctionAccount: [],//功能科目科目名称
              PerformanceClassification: [],//履职分类
              BusinessType: [],//业务类型
              EconomicSubject: [],//经济科目
              ExpenseType: [],//费用类型
              UserRights: [],//用户权限
              UserStatus: [],//用户状态
              AssetType: [],//资产类型
              planType: [],//规划类型
              projectDu: [],//项目进度
              projectDuSub: [],//项目进度内容
            };
            let _FilterList_show = {
              all: {},
              ResponsibleUnit: {},
              Department: {},
              ProjectStatus: {},
              AssetStatus: {},
              PurchaseMethod: {},
              FunctionAccount: {},
              PerformanceClassification: {},
              BusinessType: {},
              EconomicSubject: {},
              ExpenseType: {},
              UserRights: {},
              UserStatus: {},
              AssetType: {},
              planType: {},
              projectDu: {},
              projectDuSub: {},
            };
            for (let i = 0; i < thisList.length; i += 1) {
              if (this.text[thisList[i].type]) {
                _FilterList[this.text[thisList[i].type]].push(thisList[i]);
                _FilterList_show[this.text[thisList[i].type]][thisList[i].keyValue] = thisList[i].keyName;
              }
            }
            const ResponsibleUnit = _FilterList.ResponsibleUnit;
            const Department = _FilterList.Department;
            let DepartmentIdArr = {};
            let DepartmentNameArr = {};
            for (let k = 0; k < ResponsibleUnit.length; k += 1) {
              DepartmentIdArr[ResponsibleUnit[k].id] = [];
              DepartmentNameArr[ResponsibleUnit[k].keyName] = [];
              for (let j = 0; j < Department.length; j += 1) {
                if (Department[j].parentId === ResponsibleUnit[k].id) {
                  DepartmentIdArr[ResponsibleUnit[k].id].push(Department[j]);
                  DepartmentNameArr[ResponsibleUnit[k].keyName].push(Department[j]);
                }
              }
            }
            _FilterList.DepartmentIdArr = DepartmentIdArr;
            _FilterList.DepartmentNameArr = DepartmentNameArr;
            localStorage.setItem('ww_FilterList', JSON.stringify(_FilterList));
            localStorage.setItem('ww_FilterList_Show', JSON.stringify(_FilterList_show));
            window.ww_FilterList = _FilterList;
            window.ww_FilterList_show = _FilterList_show;
          } else {
            this.buttonString = '加载资源失败,请点击刷新';
          }
          this.goLoading = false;
        });
      },
      submitForm(formName) {
        if (this.buttonString === '加载资源失败,请点击刷新') {
          location.reload();
          return;
        }
        this.$refs[formName].validate((valid) => {
            if (valid) {
              let password = JSON.parse(JSON.stringify(this.loginData.password));
              const md5Value = MD5(password);
              let params = {
                account: this.loginData.account,
                password: md5Value
              };
              this.goLoading = true;
              Api.toLoging(params).then(res => {
                if (res.code === 0) {
                  window.localStorage.setItem('ww_userData', JSON.stringify(res.response.userInfo));
                  window.localStorage.setItem('ww_userID', JSON.stringify(res.response.userInfo.id));
                  window.localStorage.setItem('ww_token', res.response.token);
                  this.$router.push({path: '/home/project/1/20'});
                }
                this.goLoading = false;
              });

            }
          },
        );
      },
    },
  };
</script>
