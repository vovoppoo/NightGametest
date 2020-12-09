<template>
  <div class="page-main" style="overflow: auto">
    <div class="head-row">
      <div class="title-row">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/home/project/1/10?type=first' }">项目管理</el-breadcrumb-item>
          <el-breadcrumb-item>添加项目实施</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="add-view ">
      <!--      <div class="edit-back">-->
      <!--        <el-button @click="backFn(true)">退后</el-button>-->
      <!--      </div>-->
      <div v-loading="dialogLoading" class="form-wrap form-view">
        <el-form
          :model="formLabelData" label-position="right" :rules="rules" ref="DataForm" label-width="130px">
          <el-row>
            <el-col :span="20">
              <el-col :span="16">
                <el-form-item label="主项目名称" prop="mainProjectName">
                  <el-select
                    style="width: 100%"
                    v-model="formLabelData.mainProjectName"
                    filterable
                    remote
                    placeholder="搜索主项目名称"
                    :remote-method="remoteMethod"
                    @change="handleSelectSearch"
                    :loading="loading">
                    <el-option
                      v-for="item in projectOptionsArr"
                      :key="item.key"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>

              </el-col>
              <el-col :span="8">
                <el-form-item label="预算金额(万元)" prop="budgetMoney">
                  <el-input
                    type="number"
                    min="0"
                    @change="changeYSFn"
                    :disabled="budgetMoney===0"
                    placeholder="请输入预算金额(请先选择主项目)"
                    v-model="formLabelData.budgetMoney">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-col>
            <el-col :span="20">
              <el-col :span="8">
                <el-form-item label="项目名称" prop="projectName">
                  <el-input
                    placeholder="请输入项目名称"
                    v-model="formLabelData.projectName">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="年份" prop="year">
                  <el-date-picker
                    v-model="formLabelData.year"
                    type="year"
                    placeholder="选择年">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="是否纳入绩效考核" prop="isAssess">
                  <el-radio-group v-model="formLabelData.isAssess">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-col>
            <el-col :span="20">
              <el-col :span="8">
                <el-form-item label="责任单位" prop="agencyUnit">
                  <el-select v-model="formLabelData.agencyUnit " @change="changeUnitFn"
                             placeholder="请选择责任单位">
                    <el-option v-for="item in unitData" :key="item.id" :label="item.label"
                               :value="item.label"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="责任处室" prop="responsibilityDep">
                  <el-select :disabled="searchArr.length==0" v-model="formLabelData.responsibilityDep"
                             @change="getUserListFn" placeholder="请选择责任处室(先选责任单位)">
                    <el-option v-for="item in searchArr" :key="item.id" :label="item.keyName"
                               :value="item.keyName"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="责任人" prop="responsible">
                  <el-select v-model="formLabelData.responsibleObj"
                             :disabled="userDataArr.length==0"
                             value-key="id"
                             @change="changeResponsibleFn(formLabelData.responsibleObj)"
                             placeholder="请选择责任人(先选责任处室)">
                    <el-option v-for="item in userDataArr" :key="item.id" :label="item.name"
                             v-if="item.role!==4"  :value="item"/>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-col>


            <el-col :span="20">

              <el-col :span="24">
                <el-form-item label="项目建设内容" prop="constructionContent">
                  <el-input
                    type="textarea"
                    :rows="5"
                    placeholder="请输入内容"
                    v-model="formLabelData.constructionContent">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-col>


          </el-row>
        </el-form>
      </div>
      <div class="add-footer">
        <el-button type="primary" :loading="dialogLoading" @click="submitFn('DataForm')">提 交</el-button>
        <el-button @click="backFn(true)">取 消</el-button>
      </div>

    </div>
  </div>
</template>

<script>
  import Api from '../../../../src/api';
  import { dateFormat, moneyFormat } from '../../../filter';

  export default {
    name: 'addImplementationInfo',
    data() {
      return {
        dialogLoading: false,
        loading: false,
        mainProjectName: '',
        dataList: [],
        userDataArr: [],
        searchArr: [],
        projectOptionsArr: [],
        searchArrAll: ww_FilterList.DepartmentNameArr,
        unitData: [
          {
            label: '深圳市气象局',
            theValue: 1,
          }, {
            label: '深圳市国家气候观象台',
            theValue: 2,
          }, {
            label: '深圳市气象服务中心',
            theValue: 3,
          }, {
            label: '粤港澳大湾区气象监测预警预报中心',
            theValue: 4,
          },
        ],
        budgetMoney: 0,
        formLabelData: {},
        rules: {
          mainProjectName: [
            { required: true, message: '输入预算项目名称', trigger: 'blur,change' },
          ],
          projectName: [
            { required: true, message: '输入项目名称', trigger: 'blur,change' },
          ],
          agencyUnit: [
            { required: true, message: '请选择责任单位', trigger: 'blur,change' },
          ],
          responsibilityDep: [
            { required: true, message: '请选择责任处室', trigger: 'blur,change' },
          ],
          responsible: [
            { required: true, message: '请选择责任人', trigger: 'blur,change' },
          ],
          budgetMoney: [
            { type: 'string', required: true, message: '实施预算总金额', trigger: 'blur,change' },
          ],
        },
      };
    },
    methods: {
      changeUnitFn() {
        let e = this.formLabelData.agencyUnit;
        if (this.searchArrAll[e]) {
          this.searchArr = this.searchArrAll[e];
        }
      },
      changeResponsibleFn(item) {
        this.formLabelData.responsibleId = item.id
        this.formLabelData.responsible = item.name
      },
      changeYSFn() {
        if (this.formLabelData.budgetMoney > this.budgetMoney/10000) {
          this.$message({
            message: '实施预算不能超过项目预算！',
            type: 'warning',
          });
          this.formLabelData.budgetMoney = ''
        }
      },
      backFn() {
        this.$router.go(-1);
      },
      submitFn(formName) {
        const form = JSON.parse(JSON.stringify(this.formLabelData));
        form.mainProjectName = this.mainProjectName
        form.budgetMoney =form.budgetMoney * 10000

        if (form.responsibleId) {
          delete form.responsibleObj
        }
        if (form.year) {
          form.year = dateFormat(form.year, 'YYYY');
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {

            Api.addSSProjectInfo(form).then(res => {
              if (res.code === 0) {
                this.$router.push({ path: `/home/project/1/10` });
              }
            });
          }
        });

      },
      handleSelectSearch(key) {
        this.formLabelData.mainProjectId = key[1];
        this.formLabelData.mainProjectName = key[0];
        this.mainProjectName = key[3];
        this.budgetMoney = key[2]
      },
      remoteMethod(query) {
        if (query !== '' && query) {
          this.loading = true;
          setTimeout(() => {
            let params = {
              page: 1,
              count: 50,
              mainProjectName: query,
            };
            Api.getMainProject(params)
            .then((res) => {
              if (res.code === 0 && res.response.datas) {
                this.projectOptionsArr = [];
                if (res.response.datas) {
                  const data = JSON.parse(JSON.stringify(res.response.datas));
                  for (let i = 0; i < data.length; i += 1) {
                    this.projectOptionsArr.push({
                      key: data[i].id,
                      label: data[i].mainProjectName + `(预算: ${data[i].budgetMoney / 10000 || 0}万元)`,
                      value: [data[i].mainProjectName + `(预算: ${data[i].budgetMoney / 10000 || 0}万元)`,
                        data[i].mainProjectId,
                        data[i].budgetMoney, data[i].mainProjectName],
                    });
                  }
                } else {
                  this.projectOptionsArr = [];
                }
              }
              this.loading = false;
            });

          }, 200);
        } else {
          this.options4 = [];
        }
      },
      getUserListFn() {
        if (!this.formLabelData.agencyUnit) {
          this.$message({
            message: '请先选择责任单位！',
            type: 'warning',
          });
        }
        if (!this.formLabelData.responsibilityDep) {
          this.$message({
            message: '请先选择责任处室！',
            type: 'warning',
          });
        }

        let param = {
          page: 1,
          count: 1000,
          agencyUnit: this.formLabelData.agencyUnit,
          responsibilityDep: this.formLabelData.responsibilityDep,
        };

        Api.getUserList(param).then(res => {
          if (res.code === 0) {
            this.userDataArr = res.response.datas;
          }
        });
      },
    },
  };
</script>

<style lang="less" scoped>
  .add-view {
    min-width: 1200px;
    padding: 20px 0 100px;
    position: relative;

    .edit-back {
      position: absolute;
      top: -38px;
      right: 35px;
    }

    .el-form-item__content {
      .el-radio-group {
        width: 200px;
        text-align: left;
      }
    }


    .add-footer {
      width: 81%;
      text-align: center;
      padding-top: 30px;

      button {
        width: 200px;
      }
    }

  }
</style>
