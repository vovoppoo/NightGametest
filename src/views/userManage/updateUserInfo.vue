<template>
  <div class="edit-dialog-wrap" v-if="ctrlDialog">
    <el-dialog @open="openDialogFn"
               :close-on-click-modal="true"
               :title="titleText"
               width="1000px"
               :loading="dialogLoading"
               :visible.sync="ctrlDialog">
      <div v-loading="dialogLoading" class="form-wrap">
        <el-form
          :model="formLabelData" label-position="right" :rules="rules" ref="PersonalForm" label-width="110px">
          <el-row :gutter="20">
            <el-col :span="24">
              <el-col :span="11">
                <el-form-item label="账号" prop="account">
                    <el-input :maxlength="50" placeholder="填写账号" v-model="formLabelData.account"/>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="姓名" prop="name">
                  <el-input :maxlength="50" placeholder="填写姓名" v-model="formLabelData.name"/>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="密码" prop="password">
                  <div v-if="showPassword">
                    <el-input :maxlength="20" type="password" placeholder="填写密码" v-model="formLabelData.password"/>
                  </div>
                  <div v-else>
                    <el-button type="text" size="small"
                               @click="showEditFn()">
                      <span>点击修改密码</span>
                    </el-button>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="机关单位" prop="agencyUnit">
                  <el-select v-model="formLabelData.agencyUnit "
                             @change="changeUnitFn"
                             placeholder="请选择机关单位">
                    <el-option v-for="item in unitData" :key="item.id" :label="item.keyName"
                               :value="item.keyName"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="责任处室" prop="responsibilityDep">
                  <el-select v-model="formLabelData.responsibilityDep" placeholder="请选择责任处室">
                    <el-option v-for="item in searchArr" :key="item.id" :label="item.keyName"
                               :value="item.keyName"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="手机" prop="phone">
                  <el-input :maxlength="11" type="number" placeholder="填写手机" v-model="formLabelData.phone"/>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="办公电话" prop="officePhone">
                  <el-input :maxlength="20" type="number" placeholder="填写办公电话"
                            v-model="formLabelData.officePhone"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="电子邮件" prop="email">
                  <el-input :maxlength="20" placeholder="填写电子邮件" v-model="formLabelData.email"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="权限" prop="role">
                  <el-select v-model="formLabelData.role" placeholder="请选择权限">
                    <el-option v-for="item in searchRoleArr" :key="item.id" :label="item.keyName"
                               :value="item.keyValue"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="账号状态" prop="status">
                  <el-switch
                    v-model="status"
                    active-color="#ff4949"
                    inactive-color="#13ce66"
                    active-value="2"
                    inactive-value="1"
                  >
                  </el-switch>
                </el-form-item>
              </el-col>
            </el-col>
          </el-row>
        </el-form>

      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('PersonalForm')">取 消</el-button>
        <el-button :disabled='!IsButton' :loading="submitFormLoading" @click="submitForm('PersonalForm')"
                   type="primary" class="btn-submit">保 存


        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="less" rel="stylesheet/less" scoped>

</style>

<script>
  import Api from '../../api';
  import MD5 from 'md5';
  import { dateFormat } from '../../filter/index';

  export default {
    data() {
      return {
        titleText: '新增',
        isShowUpload: true,
        dialogLoading: false,
        IsButton: true,
        type: '',
        loading: false,
        unitData: ww_FilterList.ResponsibleUnit,
        searchArrAll: ww_FilterList.DepartmentNameArr,
        ctrlDialog: false,
        showAccount: false,
        status: 1,
        submitFormLoading: false,
        orgFormData: {},
        formLabelData: {},
        showPassword: false,
        backupForm: {},
        searchArr: [],
        searchRoleArr: window.ww_FilterList.UserRights,
        rules: {
          agencyUnit: [
            { required: true, message: '请选择单位', trigger: 'blur' },
          ],
          responsibilityDep: [
            { required: true, message: '请责任处室', trigger: 'blur' },
          ],
          account: [
            { required: true, message: '填写资账号', trigger: 'blur' },
          ],
          name: [
            { required: true, message: '请填写名称', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '填写密码', trigger: 'blur' },
          ],
          phone: [
            { required: true, message: '填写手机', trigger: 'blur' },
          ],
          role: [
            { required: true, message: '请选择权限', trigger: 'blur' },
          ],
          // responsibilityDep: [
          //   { required: true, message: '请填写所在部门', trigger: 'blur' },
          // ],
        },
      };
    },
    created() {
      this.backupForm = JSON.parse(JSON.stringify(this.formLabelData));
    },
    watch: {},
    methods: {
      showEditFn() {
        this.showPassword = true;
      },
      openDialogFn() {
        if (this.type != 'add') {
          this.dialogLoading = true;
        }
      },
      changeUnitFn() {
        let e = this.formLabelData.agencyUnit;
        if (this.searchArrAll[e]) {
          this.searchArr = this.searchArrAll[e];
        }
      },
      getDataInfo(val, row) {
        const _this = this;
        _this.ctrlDialog = true;
        _this.formLabelData = JSON.parse(JSON.stringify(_this.backupForm));
        _this.orgFormData = {};
        _this.dialogLoading = true;

        if (val) {
          Api.getUserInfo({ id: val },
          )
          .then((res) => {
            if (res.code === 0) {
              _this.dialogLoading = false;
              _this.formLabelData = res.response;
              _this.formLabelData.role = res.response.role ? res.response.role.toString() : "";
              _this.status = res.response.status ? res.response.status.toString() : '';
              _this.searchArr = _this.searchArrAll[_this.formLabelData.agencyUnit] || [];
              if (_this.formLabelData.account == null || !_this.formLabelData.account) {
                // _this.showAccount = true
              }
            }
          });
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 处理form数据格式
            const form = JSON.parse(JSON.stringify(this.formLabelData));
            form.status = this.status - 0;
            form.password = MD5(form.password);
            // form.getDate = dateFormat(form.getDate, 'YYYY-MM-DD HH:mm:ss');
            // 提交数据
            this.submitFormLoading = true;
            const type = this.type === 'add' ? 'add' : 'update';
            let typeText = '添加';
            if (type === 'add') {
              Api.addUserInfo(
                form,
              )
              .then((res) => {
                if (res.code === 0) {
                  this.$message({
                    type: 'success',
                    message: `${typeText}成功!`,
                  });
                  this.$Bus.$emit('updateUserInfoData', 0);
                  this.ctrlDialog = false;
                }
              });
            } else if (type === 'update') {
              typeText = '更新';
              Api.editUserInfo(
                form,
              )
              .then((res) => {
                if (res.code === 0) {
                  this.$message({
                    type: 'success',
                    message: `${typeText}成功!`,
                  });
                  this.$Bus.$emit('updateUserInfoData', 0);
                  this.ctrlDialog = false;
                }
              });
            }
            this.submitFormLoading = false;
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.orgFormData = {};
        this.ctrlDialog = false;
      },
    },
    components: {},
  };
</script>


