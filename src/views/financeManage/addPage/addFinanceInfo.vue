<template>
  <div class="page-main" style="overflow: auto">
    <div class="head-row">
      <div class="title-row">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/home/financeManage/1/10' }">发展规划数据管理</el-breadcrumb-item>
          <el-breadcrumb-item>新增数据</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="add-view">
      <!--      <div class="edit-back">-->
      <!--        <el-button @click="backFn(true)">退后</el-button>-->
      <!--      </div>-->
      <div v-loading="dialogLoading" class="form-wrap  form-view">
        <el-form
          :model="formLabelData" label-position="right" :rules="rules" ref="DataForm" label-width="120px">
          <el-row :gutter="70">
            <el-col :span="22">
              <el-col :span="16">
                <el-form-item label="规划名称" prop="planningName">
                  <el-input
                    placeholder="请输入规划名称"
                    v-model="formLabelData.planningName">
                  </el-input>
                </el-form-item>
              </el-col>
<!--              <el-col :span="8">-->
<!--                <el-form-item label="责任单位" prop="agencyUnit">-->
<!--                  <el-select v-model="formLabelData.agencyUnit " @change="changeUnitFn"-->
<!--                             placeholder="请选择责任单位">-->
<!--                    <el-option v-for="item in unitData" :label="item.keyName"-->
<!--                               :value="item.keyName"/>-->
<!--                  </el-select>-->
<!--                </el-form-item>-->
<!--              </el-col>-->
              <el-col :span="8">
                <el-form-item label="规划类型" prop="planType">
                  <el-select v-model="formLabelData.planType " placeholder="请选择规划类型">
                    <el-option v-for="item in planTypeArr" :key="item.id" :label="item.keyName"
                               :value="item.keyValue"/>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-col>
            <el-col :span="22">
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
                <el-form-item label="时间范围" prop="timeRanges">
                  <el-date-picker
                    v-model="formLabelData.timeRanges"
                    type="monthrange"
                    range-separator="至"
                    start-placeholder="开始月份"
                    end-placeholder="结束月份">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="批复金额" prop="replyMoney">
                  <el-input
                    type="number"
                    placeholder="请输入批复金额"
                    v-model="formLabelData.replyMoney">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-col>
            <el-col :span="22">


            </el-col>

            <el-col :span="24">
              <el-col :span="22">
                <el-form-item label="规划目标" prop="planningObjectives">
                  <el-input
                    type="textarea"
                    :rows="3"
                    maxlength="100"
                    placeholder="请输入内容"
                    v-model="formLabelData.planningObjectives ">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="指标体系" prop="indexSystem">
                  <el-input
                    type="textarea"
                    :rows="3"
                    maxlength="100"
                    placeholder="请输入内容"
                    v-model="formLabelData.indexSystem ">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="重点任务" prop="keyTasks">
                  <el-input
                    type="textarea"
                    :rows="3"
                    maxlength="100"
                    placeholder="请输入内容"
                    v-model="formLabelData.keyTasks">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="重大工程" prop="majorProjects">
                  <el-input
                    type="textarea"
                    :rows="3"
                    maxlength="100"
                    placeholder="请输入内容"
                    v-model="formLabelData.majorProjects">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="涉及工程金" prop="projectFunds">
                  <el-input
                    type="textarea"
                    :rows="3"
                    maxlength="100"
                    placeholder="请输入内容"
                    v-model="formLabelData.performance  ">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="执行情况" prop="implementation  ">
                  <el-input
                    type="textarea"
                    :rows="3"
                    maxlength="100"
                    placeholder="请输入内容"
                    v-model="formLabelData.implementation  ">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="规划内容" prop="planContent">
                  <el-input
                    type="textarea"
                    :rows="3"
                    maxlength="100"
                    placeholder="请输入内容"
                    v-model="formLabelData.planContent">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="规划依据" prop="planBasis">
                  <el-input
                    type="textarea"
                    :rows="3"
                    maxlength="100"
                    placeholder="请输入内容"
                    v-model="formLabelData.planBasis">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="规划指标" prop="planIndex">
                  <el-input
                    type="textarea"
                    :rows="3"
                    maxlength="100"
                    placeholder="请输入内容"
                    v-model="formLabelData.planIndex">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="规划需求" prop="planDemand">
                  <el-input
                    type="textarea"
                    :rows="3"
                    maxlength="100"
                    placeholder="请输入内容"
                    v-model="formLabelData.planDemand">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="与我局相关工作" prop="govWorkRelated">
                  <el-input
                    type="textarea"
                    :rows="3"
                    maxlength="100"
                    placeholder="请输入内容"
                    v-model="formLabelData.govWorkRelated">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="第一年完成目标" prop="firstYearCompleted">
                  <el-input
                    type="textarea"
                    :rows="3"
                    maxlength="100"
                    placeholder="请输入内容"
                    v-model="formLabelData.firstYearCompleted">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="第二年完成目标" prop="secondYearCompleted">
                  <el-input
                    type="textarea"
                    :rows="3"
                    maxlength="100"
                    placeholder="请输入内容"
                    v-model="formLabelData.secondYearCompleted">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="第三年完成目标" prop="thirdYearCompleted">
                  <el-input
                    type="textarea"
                    :rows="3"
                    maxlength="100"
                    placeholder="请输入内容"
                    v-model="formLabelData.thirdYearCompleted">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="第四年完成目标" prop="fourthYearCompleted">
                  <el-input
                    type="textarea"
                    :rows="3"
                    maxlength="100"
                    placeholder="请输入内容"
                    v-model="formLabelData.fourthYearCompleted">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="第五年完成目标" prop="fifthYearCompleted">
                  <el-input
                    type="textarea"
                    :rows="3"
                    maxlength="100"
                    placeholder="请输入内容"
                    v-model="formLabelData.fifthYearCompleted">
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="22">
                <el-form-item label="备注" prop="remarks">
                  <el-input
                    type="textarea"
                    :rows="3"
                    maxlength="100"
                    placeholder="请输入内容"
                    v-model="formLabelData.remarks   ">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="add-footer">
        <el-button type="primary" @click="submitFn('DataForm')">提 交</el-button>
        <el-button @click="backFn(true)">取 消</el-button>
      </div>

    </div>
  </div>
</template>

<script>
  import Api from '../../../../src/api';

  export default {
    name: 'addImplementationInfo',
    data() {
      return {
        dialogLoading: false,
        noSigning: true,
        dataList: [],
        userDataArr: [],
        searchArr: [],
        searchArrAll: window.ww_FilterList.DepartmentNameArr,
        unitData: window.ww_FilterList.Department,
        planTypeArr: window.ww_FilterList.planType,
        formLabelData: {},
        rules: {
          planningName: [
            { required: true, message: '输入规划名称', trigger: 'blur,change' },
          ],
          planType: [
            { required: true, message: '请选择规划类型', trigger: 'blur,change' },
          ],
          timeRanges: [
            { required: true, message: '请选择时间范围', trigger: 'blur,change' },
          ],
          year: [
            { required: true, message: '请选择年份', trigger: 'blur,change' },
          ],
          replyMoney: [
            { type: 'string', required: true, message: '请填写批复金额', trigger: 'blur,change' },
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
      submitFn(formName) {
        if (this.formLabelData.year) {
          this.formLabelData.year = this.formLabelData.year.getFullYear();
        }
        if (this.formLabelData.timeRanges.length>0) {
          this.formLabelData.timeRanges =
            `${this.formLabelData.timeRanges[0].getFullYear()} - ${this.formLabelData.timeRanges[1].getFullYear()}`;
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            Api.addPlanDepModule(this.formLabelData).then(res => {
              if (res.code === 0) {
                this.$router.push({ path: `/home/financeManage/1/5` });
              }
            });
          }
        });

      },
      backFn() {
        this.$router.go(-1);
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
      width: 100%;
      text-align: center;
      padding-top: 30px;

      button {
        width: 300px;
      }
    }

  }
</style>
