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
<!--              <el-col :span="22">-->
<!--                <el-form-item label="机关单位" prop="agencyUnit">-->
<!--                  <el-select v-model="formLabelData.agencyUnit "-->
<!--                             placeholder="请选择机关单位">-->
<!--                    <el-option v-for="item in unitData" :label="item.label"-->
<!--                               :value="item.label"/>-->
<!--                  </el-select>-->
<!--                </el-form-item>-->
<!--              </el-col>-->
<!--              <el-col :span="22">-->
<!--                <el-form-item label="费用类型" prop="expenseType">-->
<!--                  <el-select v-model="formLabelData.expenseType "-->
<!--                             placeholder="请选择费用类型">-->
<!--                    <el-option v-for="item in expenseTypeData" :label="item.keyName"-->
<!--                               :value="item.keyName"/>-->
<!--                  </el-select>-->
<!--                </el-form-item>-->
<!--              </el-col>-->
<!--              <el-col :span="22">-->
<!--                <el-form-item label="日期" prop="recordDate">-->
<!--                  <el-date-picker-->
<!--                    v-model="formLabelData.recordDate"-->
<!--                    placeholder="选择日期">-->
<!--                  </el-date-picker>-->
<!--                </el-form-item>-->
<!--              </el-col>-->
<!--              <el-col :span="22">-->
<!--                <el-form-item label="名称" prop="detail">-->
<!--                  <el-input :maxlength="50" placeholder="填写名称" v-model="formLabelData.detail"></el-input>-->
<!--                </el-form-item>-->
<!--              </el-col>-->
<!--              <el-col :span="22">-->
<!--                <el-form-item label="责任人/出国名单" prop="visitorsNumber">-->
<!--                  <el-input :maxlength="50" placeholder="填写责任人/出国名单" v-model="formLabelData.visitorsNumber"></el-input>-->
<!--                </el-form-item>-->
<!--              </el-col>-->
<!--              <el-col :span="22">-->
<!--                <el-form-item label="经费" prop="money">-->
<!--                  <el-input :maxlength="50" placeholder="填写经费" v-model="formLabelData.money"></el-input>-->
<!--                </el-form-item>-->
<!--              </el-col>-->
<!--              <el-col :span="22">-->
<!--                <el-form-item label="参会缴纳经费" prop="visitorsPayMoney">-->
<!--                  <el-input :maxlength="50" placeholder="填写参会缴纳经费" v-model="formLabelData.visitorsPayMoney"></el-input>-->
<!--                </el-form-item>-->
<!--              </el-col>-->
              <el-col :span="22">
                <el-form-item label="备注" prop="remarks">
                  <el-input
                    type="textarea"
                    :rows="3"
                    maxlength="200"
                    placeholder="填写参会缴纳经费"
                    v-model="formLabelData.remarks  ">
                  </el-input>
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
        expenseTypeData: window.ww_FilterList.ExpenseType,
        ctrlDialog: false,
        submitFormLoading: false,
        orgFormData: {},
        formLabelData: {
          recordDate: '',
        },
        backupForm: {},
        imageUrl: '',
        errors: {
          phone: '',
        },
        rules: {
          agencyUnit: [
            { required: true, message: '请选择机关单位', trigger: 'blur' },
          ],
          recordDate: [
            { required: true, message: '请选择日期', trigger: 'blur' },
          ],
          detail: [
            { required: true, message: '填写名称', trigger: 'blur' },
          ],
          visitorsNumber: [
            { required: true, message: '请填责任人/出国名单', trigger: 'blur' },
          ],
          money: [
            { required: true, message: '填写经费', trigger: 'blur' },
          ],
          visitorsPayMoney: [
            { required: true, message: '填写参会缴纳经费', trigger: 'blur' },
          ],
          expenseType: [
            { required: true, message: '请选择费用类型', trigger: 'blur' },
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
            form.recordDate = dateFormat(form.recordDate, 'YYYY-MM-DD HH:mm:ss');
            // 提交数据
            this.submitFormLoading = true;
            const type = this.type === 'add' ? 'add' : 'update';
            let typeText = '添加';
            if (type === 'add') {
              Api.addFinanceFundsSub(
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
              Api.addFinanceFundsSub(
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


