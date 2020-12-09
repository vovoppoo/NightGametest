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
              <el-col v-if="param==='projectName'" :span="22">
                <el-form-item label="项目名称" prop="projectName">
                  <el-input :maxlength="50" placeholder="项目名称"
                            v-model="formLabelData.projectName"/>
                </el-form-item>
              </el-col>

              <el-col v-if="param==='projectStatus'" :span="22">
                <el-form-item label="项目状态" prop="projectStatus">
                  <el-select v-model="formLabelData.projectStatus" placeholder="项目状态">
                    <el-option v-for="item in projectStateArr" :key="item.keyValue" :label="item.keyName"
                               :value="item.keyValue"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col v-if="param==='procurementMethod'" :span="22">
                <el-form-item label="采购方式" prop="procurementMethod">
                  <el-select v-model="formLabelData.procurementMethod" placeholder="采购方式">
                    <el-option v-for="item in purchaseArr" :key="item.keyValue" :label="item.keyName"
                               :value="item.keyValue"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col v-if="param==='responsible'" :span="22">
                <el-form-item label="责任人(可搜索人名)" prop="responsible">
                  <el-select
                    style="width: 100%"
                    v-model="formLabelData.responsible"
                    filterable
                    remote
                    placeholder="搜索责任人名称"
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
              <el-col v-if="param==='year'" :span="22">
                <el-form-item label="年份" prop="year">
                  <el-date-picker
                    v-model="formLabelData.year"
                    type="year"
                    placeholder="选择年">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col v-if="param==='isPayOverdue'" :span="22">
                <el-form-item label="逾期状态" prop="isPayOverdue">
                  <el-select v-model="formLabelData.isPayOverdue" placeholder="逾期状态">
                    <el-option v-for="item in isPayOverdueArr" :key="item.keyValue" :label="item.keyName"
                               :value="item.keyValue"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col v-if="param==='budgetMoney'" :span="22">
                <el-form-item label="项目预算金额(万元)" prop="budgetMoney">
                  <el-input :maxlength="50" type="number" min="0" placeholder="填写项目预算金额"
                            v-model="formLabelData.budgetMoney"></el-input>
                </el-form-item>
              </el-col>
              <el-col v-if="param==='paidMoney'" :span="22">
                <el-form-item label="项目已支付金额(万元)" prop="budgetMoney">
                  <el-input :maxlength="50" type="number" min="0" placeholder="填写项目已支付金额"
                            v-model="formLabelData.paidMoney"></el-input>
                </el-form-item>
              </el-col>
              <el-col v-if="param==='currentYearPayment'" :span="22">
                <el-form-item label="本年度支付金额(万元)" prop="currentYearPayment">
                  <el-input :maxlength="50" type="number" min="0" placeholder="填写本年度支付金额"
                            v-model="formLabelData.currentYearPayment"></el-input>
                </el-form-item>
              </el-col>
              <el-col v-if="param==='bidMoney'" :span="22">
                <el-form-item label="合同金额(万元)" prop="bidMoney">
                  <el-input :maxlength="50" type="number" min="0" placeholder="填写合同金额"
                            v-model="formLabelData.bidMoney"></el-input>
                </el-form-item>
              </el-col>
              <el-col v-if="param==='startTime'" :span="22">
                <el-form-item label="合同开始时间" prop="startTime">
                  <el-date-picker
                    v-model="formLabelData.startTime"
                    placeholder="选择合同开始时间">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col v-if="param==='endTime'" :span="22">
                <el-form-item label="合同结束时间" prop="endTime">
                  <el-date-picker
                    v-model="formLabelData.endTime"
                    placeholder="选择合同结束时间">
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
        projectOptionsArr: [],
        loading: false,
        obj: {
          budgetMoney: true,
          currentYearPayment: true,
          bidMoney: true
        },
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
        objChange: {
          budgetMoney: true,
          currentYearPayment: true,
          bidMoney: true,
          paidMoney: true,
        },
        expenseTypeData: window.ww_FilterList.ExpenseType,
        ctrlDialog: false,
        submitFormLoading: false,
        orgFormData: {},
        formLabelData: {
          recordDate: '',
        },
        projectStateArr: window.ww_FilterList.ProjectStatus,
        purchaseArr: window.ww_FilterList.PurchaseMethod,
        isPayOverdueArr: [{ keyName: '是', keyValue: '1' }, { keyName: '否', keyValue: '2' },],
        backupForm: {},
        imageUrl: '',
        errors: {
          phone: '',
        },
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
      handleSelectSearch(key) {
        this.formLabelData.responsibleId = key[1];
        this.formLabelData.responsible = key[0];
      },
      remoteMethod(query) {
        if (query !== '' && query) {
          this.loading = true;
          setTimeout(() => {
            let params = {
              page: 1,
              count: 50,
              // isSupervision: 1,
              name: query
            };
            Api.getUserList(params)
            .then((res) => {
              if (res.code === 0 && res.response.datas) {
                this.projectOptionsArr = [];
                if (res.response.datas) {
                  const data = JSON.parse(JSON.stringify(res.response.datas));
                  for (let i = 0; i < data.length; i += 1) {
                    if (data[i].role !== 4) {
                      this.projectOptionsArr.push({
                        key: data[i].id,
                        label: data[i].name,
                        value: [data[i].name,
                          data[i].id]
                      });
                    }
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
          Api.getProjectInfo({ projectId: val },
          )
          .then((res) => {
            if (res.code === 0) {
              _this.dialogLoading = false;
              _this.formLabelData = res.response;
              if (this.objChange[this.param]) {
                _this.formLabelData[this.param] = (_this.formLabelData[this.param] / 10000).toFixed(4)
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
            if (this.objChange[this.param]) {
              form[this.param] = form[this.param] * 10000;
            }
            if (form.year) {
              form.year = dateFormat(form.year, 'YYYY');
              ;
            }
            if (form.endTime) {
              form.endTime = dateFormat(form.endTime, 'YYYY-MM-DD');
              ;
            }
            if (form.startTime) {
              form.startTime = dateFormat(form.startTime, 'YYYY-MM-DD');
              ;
            }
            // 提交数据
            this.submitFormLoading = true;
            const type = this.type === 'add' ? 'add' : 'update';
            let typeText = '添加';
            if (type === 'add') {
              Api.updateSSProjectInfo(
                form,
              )
              .then((res) => {
                if (res.code === 0) {
                  this.$message({
                    type: 'success',
                    message: `${typeText}成功!`,
                  });
                  window.localStorage.setItem('ww_InfoRoute', JSON.stringify(true));
                  this.$Bus.$emit('editOneParamData', 0);
                  this.ctrlDialog = false;
                }
              });
            } else if (type === 'update') {
              typeText = '更新';
              Api.updateSSProjectInfo(
                form,
              )
              .then((res) => {
                if (res.code === 0) {
                  this.$message({
                    type: 'success',
                    message: `${typeText}成功!`,
                  });
                  window.localStorage.setItem('ww_InfoRoute', JSON.stringify(true));
                  this.$Bus.$emit('editOneParamData', 0);
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


