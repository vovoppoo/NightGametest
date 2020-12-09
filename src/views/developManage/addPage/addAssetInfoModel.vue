<template>
  <div class="edit-dialog-wrap" v-if="ctrlDialog">
    <el-dialog @open="openDialogFn"
               :close-on-click-modal="true"
               :title="titleText"
               width="1000px"
               :visible.sync="ctrlDialog">
      <div v-loading="dialogLoading" class="form-wrap">
        <el-form
          :model="formLabelData" label-position="right" :rules="rules" ref="PersonalForm" label-width="110px">
          <el-row :gutter="20">
            <el-col :span="24">
              <el-col :span="11">
                <el-form-item label="机关单位" prop="agencyUnit">
                  <el-select v-model="formLabelData.agencyUnit "
                             placeholder="请选择机关单位">
                    <el-option v-for="item in unitData" :label="item.label"
                               :value="item.label"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="资产类型" prop="assetsType">
                  <el-input :maxlength="50" placeholder="填写资产类型" v-model="formLabelData.assetsType"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="资产编码" prop="assetsCode">
                  <el-input :maxlength="50" placeholder="填写资产编码" v-model="formLabelData.assetsCode"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="资产名称" prop="assetsName">
                  <el-input :maxlength="50" placeholder="填写资产名称" v-model="formLabelData.assetsName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="规格型号" prop="model">
                  <el-input :maxlength="50" placeholder="填写规格型号" v-model="formLabelData.model"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="数量" prop="theNumber">
                  <el-input :maxlength="20" placeholder="填写数量" v-model="formLabelData.theNumber"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="金额" prop="money">
                  <el-input :maxlength="20" placeholder="填写金额" v-model="formLabelData.money"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="使用人" prop="responsible">
                  <el-input :maxlength="20" placeholder="填写使用人" v-model="formLabelData.responsible"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="所在部门" prop="responsibilityDep">
                  <el-input :maxlength="20" placeholder="填写所在部门" v-model="formLabelData.responsibilityDep"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="所在地址" prop="address">
                  <el-input :maxlength="20" placeholder="填写所在地址" v-model="formLabelData.address"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="取得日期" prop="getDate">
                  <el-date-picker
                    v-model="formLabelData.getDate"
                    placeholder="选择日期">
                  </el-date-picker>
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
  import Api from '../../../api';
  import { dateFormat } from '../../../filter/index';

  export default {
    data() {
      return {
        titleText: '新增',
        isShowUpload: true,
        dialogLoading: false,
        IsButton: true,
        type: '',
        loading: false,
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
        ctrlDialog: false,
        submitFormLoading: false,
        orgFormData: {},
        formLabelData: {},
        backupForm: {},
        imageUrl: '',
        errors: {
          phone: '',
        },
        rules: {
          agencyUnit: [
            { required: true, message: '请选择机关单位', trigger: 'blur' },
          ],
          assetsType: [
            { required: true, message: '请选择日期', trigger: 'blur' },
          ],
          assetsCode: [
            { required: true, message: '填写资产编码', trigger: 'blur' },
          ],
          assetsName: [
            { required: true, message: '请填资产名称', trigger: 'blur' },
          ],
          model: [
            { required: true, message: '填写型号规格', trigger: 'blur' },
          ],
          theNumber: [
            { required: true, message: '填写数量', trigger: 'blur' },
          ],
          responsible: [
            { required: true, message: '请填写使用人', trigger: 'blur' },
          ],
          responsibilityDep: [
            { required: true, message: '请填写所在部门', trigger: 'blur' },
          ],
          address: [
            { required: true, message: '请填写所在地址', trigger: 'blur' },
          ],
          // getDate: [
          //   { required: true, message: '请选择取得时间', trigger: 'blur' },
          // ],
          money: [
            { required: true, message: '请填写金额', trigger: 'blur' },
          ],

        },
      };
    },
    created() {
      this.backupForm = JSON.parse(JSON.stringify(this.formLabelData));
    },
    watch: {},
    methods: {

      openDialogFn() {
        if (this.type != 'add') {
          this.dialogLoading = true;
        }
      },

      getDataInfo(val) {
        const _this = this;
        _this.ctrlDialog = true;
        _this.formLabelData = JSON.parse(JSON.stringify(_this.backupForm));
        _this.orgFormData = {};
        if (val) {
          _this.formLabelData = val;
          // Api.getCarInfo(val,
          // )
          // .then((res) => {
          //   if (res.code === 0) {
          //     _this.dialogLoading = false;
          //     _this.formLabelData = res.response;
          //   }
          // });
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 处理form数据格式
            const form = JSON.parse(JSON.stringify(this.formLabelData));
            form.getDate = dateFormat(form.getDate, 'YYYY-MM-DD HH:mm:ss');
            // 提交数据
            this.submitFormLoading = true;
            const type = this.type === 'add' ? 'add' : 'update';
            let typeText = '添加';
            if (type === 'add') {
              Api.addFinanceAsset(
                form,
              )
              .then((res) => {
                if (res.code === 0) {
                  this.$message({
                    type: 'success',
                    message: `${typeText}成功!`,
                  });
                  this.$Bus.$emit('addFundsInfoModelData', 0);
                  this.ctrlDialog = false;
                }
              });
            } else if (type === 'update') {
              typeText = '更新';
              Api.addFinanceAsset(
                form,
              )
              .then((res) => {
                if (res.code === 0) {
                  this.$message({
                    type: 'success',
                    message: `${typeText}成功!`,
                  });
                  this.$Bus.$emit('addFundsModelData', 0);
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


