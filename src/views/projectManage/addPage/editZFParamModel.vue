<template>
  <div class="edit-dialog-wrap" v-if="ctrlDialog">
    <el-dialog @open="openDialogFn"
               :close-on-click-modal="true"
               :title="titleText"
               width="650px"
               :visible.sync="ctrlDialog">
      <div v-loading="dialogLoading" class="form-wrap">

        <el-row :gutter="20">
          <el-col :span="24">
            <el-col :span="24">
              <div v-if="param==='appointment'" class="tis">
                <span>注：更新合同约定支付方式后,支付情况会重置</span>
              </div>
              <el-table
                v-if="formLabelData.length>0"
                :data="formLabelData"
                border
                style="width: 100%">
                <el-table-column
                  width="110"
                  type="index"
                  :index="indexMethod"
                  label="支付期数">
                </el-table-column>
                <el-table-column prop="payMoney" label="支付金额(万元)">
                  <template slot-scope="scope">
                    <div v-if="param==='appointment'">
                      <el-input
                        @input="changeMoneyFn(scope.row)"
                        @change="changeMoneyFn(scope.row)"
                        placeholder="支付金额"
                        v-model="scope.row.payMoney">
                      </el-input>
                    </div>
                    <div v-if="param==='payInfo'">
                      {{scope.row.payMoney}}
                    </div>

                  </template>
                </el-table-column>
                <el-table-column prop="percentage" width="160" label="占总金额百分比(%)">
                  <template slot-scope="scope">
                    <div v-if="param==='appointment'">
                      <el-input
                        @change="changeBfbFn(scope.row)"
                        placeholder="占总金额百分比(%)"
                        v-model="scope.row.percentage">
                      </el-input>
                    </div>
                    <div v-if="param==='payInfo'">
                      {{scope.row.percentage}}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="percentage" width="170" label="操作">
                  <template slot-scope="scope">
                    <el-button v-if="param==='appointment'" type="text " style="color: #E6365F;" size="small"
                               @click="deleteAddFn(scope.$index)">删除
                    </el-button>
                    <el-switch
                      v-if="param==='payInfo'"
                      v-model="scope.row.isPay"
                      active-text="已支付"
                      inactive-text="未支付"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      :active-value="1"
                      :inactive-value="null">
                    </el-switch>
                  </template>
                </el-table-column>
              </el-table>
              <div v-else>
                合同支付方式不是最新版本,请重新设置合同支付方式！
              </div>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col v-if="param==='appointment'" :span="24">
              <el-button style="width: 100%;margin-top: 10px" @click="addForm">新增一期</el-button>
            </el-col>
          </el-col>
        </el-row>

      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('PersonalForm')">取 消</el-button>
        <el-button v-if="formLabelData.length>0" :loading="submitFormLoading" @click="submitForm('PersonalForm')"
                   type="primary" class="btn-submit">保 存


        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="less" rel="stylesheet/less" scoped>

  .tis {
    width: 100%;
    text-align: center;
    color: #E6365F;
    padding-bottom: 10px
  }
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
        projectId: '',
        loading: false,
        ctrlDialog: false,
        submitFormLoading: false,
        formLabelData: [],
        orgFormData: {},
        backupForm: [],
        rules: {
          caiwuId: [
            { pattern: /^[a-zA-Z\d]+$/, message: '只能输入英文字母跟数字', trigger: 'blur' }
          ],
        },
      };
    },

    created() {
      this.backupForm = JSON.parse(JSON.stringify(this.formLabelData));
    },

    watch: {},
    methods: {
      indexMethod(index) {
        return `第${index + 1}期`;
      },
      deleteAddFn(index) {
        this.formLabelData.splice(index, 1)
      },
      changeBfbFn(e) {
        const thisBidMoney = this.bidMoney
        let thisPercentage = (e.percentage / 100).toFixed(4)
        e.payMoney = (thisBidMoney * thisPercentage).toFixed(4)
        e.percentage = `${((thisPercentage * 100)-0).toFixed(2)}`
        e.percentageValue = `${(thisPercentage - 0).toFixed(2)}`
      },
      changeMoneyFn(e) {
        const thisBidMoney = this.bidMoney

        let thisPercentage = (e.payMoney / thisBidMoney).toFixed(4)
        e.percentage = `${(thisPercentage * 100).toFixed(2)}`
        e.percentageValue = `${(thisPercentage - 0).toFixed(2)}`
      },
      addForm() {
        this.formLabelData.push({
          payMoney: '',
          percentage: '',
          percentageValue: '',
        })
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
        _this.projectId = val;
        if (val) {
          let param = {
            projectId: val,
          };
          Api.getFindContract(param).then(res => {
            if (res.code === 0) {

              if (res.response.length === 0) {
                if (this.param === 'appointment') {
                  this.formLabelData = [
                    {
                      payMoney: '',
                      percentage: '',
                      percentageValue: '',
                    },
                  ]
                } else {
                  this.formLabelData = []
                }
              } else {
                this.formLabelData = [];
                for (let i = 0; i < res.response.length; i += 1) {
                  this.formLabelData.push(
                    {
                      payMoney: (res.response[i].payMoney / 10000).toFixed(4),
                      percentage: `${(res.response[i].percentage * 100).toFixed(0)}%`,
                      percentageValue: res.response[i].percentage,
                      isPay: res.response[i].isPay,
                      id: res.response[i].id,
                    }
                  )
                }
              }
            }
          });
        }
      },
      submitForm(formName) {
        // 处理form数据格式
        const form = JSON.parse(JSON.stringify(this.formLabelData));
        // 提交数据
        let count = 0
        let param = []
        for (let i = 0; i < form.length; i += 1) {

          if (form[i].payMoney) {
            param.push({
              "projectId": this.projectId,
              "projectPeriod": i + 1,
              "payMoney": (form[i].payMoney - 0) * 10000,
              "percentage": form[i].percentageValue - 0,
            })
            count += form[i].payMoney - 0
          }
        }
        // if (count > this.bidMoney) {
        //   this.$message({
        //     message: '请注意！支付计划已经超出总金额',
        //     type: 'warning',
        //   });
        // }
        let apiText = 'updateFindContract'
        this.submitFormLoading = true;

        if (this.param == 'payInfo') {
          apiText = 'updateDate'
          param = []
          for (let i = 0; i < form.length; i += 1) {
            if (form[i].payMoney) {
              param.push({
                "id": form[i].id,
                "projectId": this.projectId,
                "isPay": form[i].isPay,
              })
            }
          }
        }
        Api[apiText](
          param,
        )
        .then((res) => {
          if (res.code === 0) {

            if (count > this.bidMoney && apiText === 'updateFindContract') {
              this.$message({
                message: '请注意！支付计划已经超出总合同金额',
                type: 'warning',
              });
            } else {
              this.$message({
                type: 'success',
                message: `操作成功!`,
              });
            }
            this.$Bus.$emit('editZFOneParamData', 0);
            this.ctrlDialog = false;
          }
        });
        this.submitFormLoading = false;
      },
      resetForm(formName) {
        this.formLabelData = JSON.parse(JSON.stringify(this.backupForm));
        this.orgFormData = {};
        this.ctrlDialog = false;
      },
    },
    components: {},
  };
</script>


