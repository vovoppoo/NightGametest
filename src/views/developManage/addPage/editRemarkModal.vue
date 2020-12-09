<template>
  <div class="edit-dialog-wrap" v-if="ctrlDialog">
    <el-dialog @open="openDialogFn"
               :close-on-click-modal="true"
               :title="titleText"
               width="550px"
               :visible.sync="ctrlDialog">
      <div v-loading="dialogLoading" class="form-wrap">
        <el-form
          :model="formLabelData" label-position="left" :rules="rules" ref="PersonalForm" label-width="150px">
          <el-row :gutter="20">
            <el-col :span="24">
              <el-col v-if="param==='remark'" :span="22">
                <el-form-item label="备注" prop="remark">
                  <el-input
                    type="textarea"
                    :rows="3"
                    :maxlength="150" placeholder="填写备注"
                            v-model="formLabelData.remark"/>
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
        dialogLoading: false,
        IsButton: true,
        type: '',
        loading: false,
        ctrlDialog: false,
        submitFormLoading: false,
        orgFormData: {},
        formLabelData: {},
        backupForm: {},
        rules: {
          projectStatus: [
            { required: true, message: '请选择项目状态', trigger: 'blur' },
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

        }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 处理form数据格式
            const form = JSON.parse(JSON.stringify(this.formLabelData));
            // 提交数据
            this.submitFormLoading = true;

            let apiText = 'updateRemark'
            form.projectId = this.projectId;
            if (!form.remark) {
              form.remark = '';
            }
            Api[apiText](
              form,
            )
            .then((res) => {
              if (res.code === 0) {
                this.$message({
                  type: 'success',
                  message: `操作成功!`,
                });
                this.$Bus.$emit('editOneParamData', 0);
                this.ctrlDialog = false;
              }
            });
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


