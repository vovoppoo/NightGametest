<template>
  <div class="edit-dialog-wrap" v-if="ctrlDialog">
    <el-dialog @open="openDialogFn"
               :close-on-click-modal="true"
               :title="titleText"
               width="600px"
               :visible.sync="ctrlDialog">
      <div v-loading="dialogLoading" class="form-wrap">
        <el-form
          :model="formLabelData" label-position="right" :rules="rules" ref="PersonalForm" label-width="130px">
          <el-row :gutter="20">
            <el-col :span="24">
              <el-col :span="22">
                <el-form-item label="机关单位" prop="agencyUnit">
                  <el-select v-model="formLabelData.agencyUnit "
                             placeholder="请选择机关单位">
                    <el-option v-for="item in unitData" :label="item.label"
                               :value="item.label"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="年份" prop="year">
                  <el-date-picker
                    v-model="formLabelData.year"
                    type="year"
                    placeholder="选择年">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="品名" prop="productName">
                  <el-input :maxlength="50" placeholder="填写品名" v-model="formLabelData.productName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="年度累积购买金额" prop="yearTotalMoney">
                  <el-input :maxlength="20" placeholder="填写年度累积购买金额" v-model="formLabelData.yearTotalMoney"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="年度累积购买数目" prop="yearBuyNumber">
                  <el-input :maxlength="20" placeholder="填写年度累积购买数目" v-model="formLabelData.yearBuyNumber"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="现有库存" prop="existingInventory">
                  <el-input :maxlength="20" placeholder="填写现有库存" v-model="formLabelData.existingInventory"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="当前累积领用" prop="totalUse">
                  <el-input :maxlength="20" placeholder="填写当前累积领用"
                            v-model="formLabelData.totalUse"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="备注" prop="remarks">
                  <el-input :maxlength="20" placeholder="填写备注"
                            v-model="formLabelData.remarks"></el-input>
                </el-form-item>
              </el-col>
            </el-col>
          </el-row>
        </el-form>

      </div>
      <div slot="footer" v-if="type!=='look'" class="dialog-footer">
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
          year: [
            { required: true, message: '请选择年', trigger: 'blur' },
          ],
          meetingBudgetMoney: [
            { required: true, message: '填写会议费预算', trigger: 'blur' },
          ],
          trainBudgetMoney: [
            { required: true, message: '请填写培训预算', trigger: 'blur' },
          ],
          abroadBudgetMoney: [
            { required: true, message: '填写出国经费预算', trigger: 'blur' },
          ],
          carBudgetMoney: [
            { required: true, message: '填写车辆经费预算', trigger: 'blur' },
          ],
          receptionBudgetMoney: [
            { required: true, message: '填写接待费用预算', trigger: 'blur' },
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
            form.year = dateFormat(form.year, 'YYYY');
            // 提交数据
            this.submitFormLoading = true;
            const type = this.type === 'add' ? 'add' : 'update';
            let typeText = '添加';
            if (type === 'add') {
              Api.addFinanceMaterial(
                form,
              )
              .then((res) => {
                if (res.code === 0) {
                  this.$message({
                    type: 'success',
                    message: `${typeText}成功!`,
                  });
                  this.$Bus.$emit('addMaterialData', 0);
                  this.ctrlDialog = false;
                }
              });
            } else if (type === 'update') {
              typeText = '更新';
              Api.addFinanceMaterial(
                form,
              )
              .then((res) => {
                if (res.code === 0) {
                  this.$message({
                    type: 'success',
                    message: `${typeText}成功!`,
                  });
                  this.$Bus.$emit('addMaterialData', 0);
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


