<template>
  <div class="edit-dialog-wrap" v-if="ctrlDialog">
    <el-dialog @open="openDialogFn"
               :close-on-click-modal="true"
               :title="titleText"
               width="600px"
               :visible.sync="ctrlDialog">
      <div v-loading="dialogLoading" class="form-wrap">
        <el-form
          :model="formLabelData" label-position="right" :rules="rules" ref="PersonalForm" label-width="120px">
          <el-row :gutter="20">
            <el-col :span="24">
              <el-col :span="22">
                <el-form-item label="项目ID" prop="projectId">
                  <el-input :maxlength="20" placeholder="填写会议费预算" v-model="formLabelData.projectId"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="项目名称" prop="projectName">
                  <el-input :maxlength="20" placeholder="填写项目名称" v-model="formLabelData.projectName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="投标公司" prop="bidCompany">
                  <el-input :maxlength="20" placeholder="填写出投标公司" v-model="formLabelData.bidCompany"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="投标金额" prop="bidMoney">
                  <el-input :maxlength="20" placeholder="填写车辆经费预算" v-model="formLabelData.bidMoney"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="专家" prop="experts">
                  <el-input :maxlength="20" placeholder="填写专家名字(格式如：张三,李四)"
                            v-model="formLabelData.experts"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="评标方式" prop="evaluationMethod">
                  <el-select v-model="formLabelData.evaluationMethod "
                             placeholder="请选择评标方式">
                    <el-option v-for="item in styleData" :label="item.label"
                               :value="item.label"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col v-if="formLabelData.evaluationMethod==='综合评分法'" :span="22">
                <el-form-item label="综合评分" prop="comprehensiveScore">
                  <el-input :maxlength="20" placeholder="填写综合评分"
                            v-model="formLabelData.comprehensiveScore"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="资质审核状态" prop="auditStatus">
                  <el-select v-model="formLabelData.auditStatus "
                             placeholder="请选资质审核状态">
                    <el-option v-for="item in auditStatusData" :label="item.label"
                               :value="item.label"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="评标结果" prop="assessResult">
                  <el-select v-model="formLabelData.assessResult"
                             placeholder="请选择评标结果">
                    <el-option v-for="item in getStatusData" :label="item.label"
                               :value="item.label"/>
                  </el-select>
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
        dialogLoading: false,
        IsButton: true,
        type: '',
        loading: false,
        styleData: [
          {
            label: '综合评分法',
            theValue: 1,
          }, {
            label: '最低价法',
            theValue: 2,
          }, {
            label: '单一来源法',
            theValue: 3,
          },
        ],
        auditStatusData: [
          {
            label: '审核未通过',
            theValue: 1,
          }, {
            label: '审核通过',
            theValue: 2,
          },
        ],
        getStatusData: [
          {
            label: '未已中标',
            theValue: 1,
          }, {
            label: '已中标',
            theValue: 2,
          },
        ],
        ctrlDialog: false,
        submitFormLoading: false,
        formLabelData: {},
        backupForm: {},
        imageUrl: '',
        errors: {
          phone: '',
        },
        rules: {
          projectId: [
            { required: true, message: '请填写项目编号', trigger: 'blur' },
          ],
          projectName: [
            { required: true, message: '请填写项目名称', trigger: 'blur' },
          ],
          evaluationMethod: [
            { required: true, message: '填选择评分方式', trigger: 'blur' },
          ],
          comprehensiveScore: [
            { required: true, message: '请填写综合评分', trigger: 'blur' },
          ],
          experts: [
            { required: true, message: '请填写出专家', trigger: 'blur' },
          ],
          bidCompany: [
            { required: true, message: '请填写投标公司', trigger: 'blur' },
          ],
          bidMoney: [
            { required: true, message: '请填写投标金额', trigger: 'blur' },
          ],
          auditStatus: [
            { required: true, message: '请选择资质审核状态', trigger: 'blur' },
          ],
          assessResult: [
            { required: true, message: '请选择评标结果', trigger: 'blur' },
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
              Api.addFinancePurchaseInfo(
                form,
              )
              .then((res) => {
                if (res.code === 0) {
                  this.$message({
                    type: 'success',
                    message: `${typeText}成功!`,
                  });
                  this.$Bus.$emit('addPurchaseData', 0);
                  this.ctrlDialog = false;
                }
              });
            } else if (type === 'update') {
              typeText = '更新';
              Api.addFinancePurchaseInfo(
                form,
              )
              .then((res) => {
                if (res.code === 0) {
                  this.$message({
                    type: 'success',
                    message: `${typeText}成功!`,
                  });
                  this.$Bus.$emit('addPurchaseData', 0);
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
        this.ctrlDialog = false;
      },
    },
    components: {},
  };
</script>


