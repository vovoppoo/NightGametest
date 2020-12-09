<template>
  <div class="page-main" style="overflow: auto">
    <div class="head-row">
      <div class="title-row">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/home/project/1/10?type=second' }">项目管理</el-breadcrumb-item>
          <el-breadcrumb-item>新增预算项目</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="add-view">
      <!--      <div class="edit-back">-->
      <!--        <el-button @click="backFn(true)">退后</el-button>-->
      <!--      </div>-->
      <div v-loading="dialogLoading" class="form-wrap form-view">
        <el-form
          :model="formLabelData" label-position="left" :rules="rules" ref="DataForm" label-width="160px">
          <el-row >
            <el-col :span="20">
              <el-col :span="16">
                <el-form-item label="项目名称" prop="mainProjectName">
                  <el-input
                    placeholder="请输入项目名称"
                    v-model="formLabelData.mainProjectName">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="项目库录入名称" prop="projectLibraryName ">
                  <el-input
                    placeholder="请输入项目库录入名称"
                    v-model="formLabelData.projectLibraryName ">
                  </el-input>
                </el-form-item>
              </el-col>

            </el-col>
            <el-col :span="20">
              <el-col :span="8">
                <el-form-item label="履职分类" prop="resumptionType ">
                  <el-select v-model="formLabelData.resumptionType " placeholder="请选择履职分类">
                    <el-option v-for="item in PerformanceClassificationArr" :key="item.id" :label="item.keyName"
                               :value="item.keyName"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="业务类型" prop="businessType">
                  <el-select v-model="formLabelData.businessType " placeholder="请选择业务类型">
                    <el-option v-for="item in typeSearchArr"  :key="item.id" :label="item.keyName"
                               :value="item.keyName"/>
                  </el-select>
                </el-form-item>
              </el-col>


              <el-col :span="8">
                <el-form-item label="财务项目编号" prop="caiwuId">
                  <el-input
                    placeholder="请输入财务项目编号"
                    v-model="formLabelData.caiwuId  ">
                  </el-input>
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
                  <el-select v-model="formLabelData.responsibilityDep"
                             :disabled="searchArr.length==0"
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
              <el-col :span="8">
                <el-form-item label="项目预算总金额(万元)" prop="budgetMoney">
                  <el-input
                    type="number"
                    min="0"
                    placeholder="请输入项目预算总金额"
                    v-model="formLabelData.budgetMoney">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="本年支付金额(万元)" prop="currentYearPayment">
                  <el-input
                    type="number"
                    min="0"
                    placeholder="请输入本年支付金额"
                    v-model="formLabelData.currentYearPayment">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="跨年支付金额(万元)" prop="newYearPayment">
                  <el-input
                    type="number"
                    min="0"
                    placeholder="请输入跨年支付金额"
                    v-model="formLabelData.newYearPayment">
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="功能科目" prop="functionalSubjectName  ">
                  <el-select v-model="formLabelData.functionalSubjectName " placeholder="请选择功能科目">
                    <el-option v-for="item in typeGNArr" :label="item.keyName"
                               :value="item.keyName"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="经济科目" prop="economicSubjects  ">
                  <el-select v-model="formLabelData.economicSubjects " placeholder="请选择经济科目">
                    <el-option v-for="item in economicArr" :label="item.keyName"
                               :value="item.keyName"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="是否政府采购" prop="isGovPurchase">
                  <el-radio-group v-model="formLabelData.isGovPurchase">
                    <el-radio :label="'1'">是</el-radio>
                    <el-radio :label="'0'">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>

            </el-col>
            <el-col :span="20">
              <el-col :span="8">
                <el-form-item label="是否重点绩效" prop="caiwuId  ">
                  <el-radio-group v-model="formLabelData.isImportantPerformance ">
                    <el-radio :label="'1'">是</el-radio>
                    <el-radio :label="'0'">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="是否独立合同" prop="isIndependentContract ">
                  <el-radio-group v-model="formLabelData.isIndependentContract   ">
                    <el-radio :label="'1'">是</el-radio>
                    <el-radio :label="'0'">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="是否跨年项目" prop="isNewYear ">
                  <el-radio-group v-model="formLabelData.isNewYear   ">
                    <el-radio :label="'1'">是</el-radio>
                    <el-radio :label="'0'">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>

            </el-col>
            <el-col :span="20">
              <el-col :span="8">
                <el-form-item label="年份" prop="year  ">
                  <el-date-picker
                    v-model="formLabelData.year"
                    type="year"
                    placeholder="选择年">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-col>
            <el-col :span="20">
              <el-col :span="24">
                <el-form-item label="项目概况" prop="projectOverview ">
                  <el-input
                    type="textarea"
                    :rows="5"
                    maxlength="500"
                    placeholder="请输入内容"
                    v-model="formLabelData.projectOverview ">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="立项依据或原因" prop="projectReasons  ">
                  <el-input
                    type="textarea"
                    :rows="5"
                    maxlength="500"
                    placeholder="请输入内容"
                    v-model="formLabelData.projectReasons  ">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="测算标准" prop="measurementStandard  ">
                  <el-input
                    type="textarea"
                    :rows="5"
                    maxlength="500"
                    placeholder="请输入内容"
                    v-model="formLabelData.measurementStandard  ">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="绩效目标" prop="performance  ">
                  <el-input
                    type="textarea"
                    :rows="5"
                    maxlength="500"
                    placeholder="请输入内容"
                    v-model="formLabelData.performance  ">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="考核指标" prop="assessmentIndicators  ">
                  <el-input
                    type="textarea"
                    :rows="5"
                    maxlength="500"
                    placeholder="请输入内容"
                    v-model="formLabelData.assessmentIndicators  ">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="备注" prop="remarks   ">
                  <el-input
                    type="textarea"
                    :rows="5"
                    maxlength="500"
                    placeholder="请输入内容"
                    v-model="formLabelData.remarks   ">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="年度支付计划(万元)" prop="remarks">
                  <el-table
                    :data="tableData"
                    :show-header="false"
                    border
                    style="width: 100%">
                    <el-table-column prop="name_row1" label="label">
                      <template slot-scope="scope">
                        <div class="table-head-c" v-if="scope.row.isShow">{{scope.row.name_row1}}</div>
                        <div v-else>
                          <el-input
                            type="number"
                            min="0"
                            placeholder="请输入"
                            v-model="formLabelData[scope.row.name_row1]">
                          </el-input>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="name_row1" label="label">
                      <template slot-scope="scope">
                        <div class="table-head-c" v-if="scope.row.isShow">{{scope.row.name_row2}}</div>
                        <div v-else>
                          <el-input
                            type="number"
                            min="0"
                            placeholder="请输入"
                            v-model="formLabelData[scope.row.name_row2]">
                          </el-input>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="name_row1" label="label">
                      <template slot-scope="scope">
                        <div class="table-head-c" v-if="scope.row.isShow">{{scope.row.name_row3}}</div>
                        <div v-else>

                          <el-input
                            type="number"
                            min="0"
                            placeholder="请输入"
                            v-model="formLabelData[scope.row.name_row3]">
                          </el-input>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="name_row1" label="label">
                      <template slot-scope="scope">
                        <div class="table-head-c" v-if="scope.row.isShow">{{scope.row.name_row4}}</div>
                        <div v-else>

                          <el-input
                            type="number"
                            min="0"
                            placeholder="请输入"
                            v-model="formLabelData[scope.row.name_row4]">
                          </el-input>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="name_row1" label="label">
                      <template slot-scope="scope">
                        <div class="table-head-c" v-if="scope.row.isShow">{{scope.row.name_row5}}</div>
                        <div v-else>

                          <el-input
                            type="number"
                            min="0"
                            placeholder="请输入"
                            v-model="formLabelData[scope.row.name_row5]">
                          </el-input>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="name_row1" label="label">
                      <template slot-scope="scope">
                        <div class="table-head-c" v-if="scope.row.isShow">{{scope.row.name_row6}}</div>
                        <div v-else>

                          <el-input
                            placeholder="请输入"
                            v-model="formLabelData[scope.row.name_row6]">
                          </el-input>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="name_row1" label="label">
                      <template slot-scope="scope">
                        <div class="table-head-c" v-if="scope.row.isShow">{{scope.row.name_row7}}</div>
                        <div v-else>

                          <el-input
                            type="number"
                            min="0"
                            placeholder="请输入"
                            v-model="formLabelData[scope.row.name_row7]">
                          </el-input>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="name_row1" label="label">
                      <template slot-scope="scope">
                        <div class="table-head-c" v-if="scope.row.isShow">{{scope.row.name_row8}}</div>
                        <div v-else>

                          <el-input
                            type="number"
                            min="0"
                            placeholder="请输入"
                            v-model="formLabelData[scope.row.name_row8]">
                          </el-input>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="name_row1" label="label">
                      <template slot-scope="scope">
                        <div class="table-head-c" v-if="scope.row.isShow">{{scope.row.name_row9}}</div>
                        <div v-else>

                          <el-input
                            type="number"
                            min="0"
                            placeholder="请输入"
                            v-model="formLabelData[scope.row.name_row9]">
                          </el-input>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="name_row1" label="label">
                      <template slot-scope="scope">
                        <div class="table-head-c" v-if="scope.row.isShow">{{scope.row.name_row10}}</div>
                        <div v-else>

                          <el-input
                            type="number"
                            min="0"
                            placeholder="请输入"
                            v-model="formLabelData[scope.row.name_row10]">
                          </el-input>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="name_row1" label="label">
                      <template slot-scope="scope">
                        <div class="table-head-c" v-if="scope.row.isShow">{{scope.row.name_row11}}</div>
                        <div v-else>

                          <el-input
                            type="number"
                            min="0"
                            placeholder="请输入"
                            v-model="formLabelData[scope.row.name_row11]">
                          </el-input>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="name_row1" label="label">
                      <template slot-scope="scope">
                        <div class="table-head-c" v-if="scope.row.isShow">{{scope.row.name_row12}}</div>
                        <div v-else>

                          <el-input
                            type="number"
                            min="0"
                            placeholder="请输入"
                            v-model="formLabelData[scope.row.name_row12]">
                          </el-input>
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-form-item>
              </el-col>
              <el-col :span="24">


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
  import { dateFormat, moneyFormat } from '../../../filter';

  export default {
    name: 'addImplementationInfo',
    data() {
      return {
        dialogLoading: false,
        noSigning: true,
        dataList: [],
        userDataArr: [],
        searchArr: [],
        tableData: [
          {
            isShow: true,
            name_row1: '1月计划',
            name_row2: '2月计划',
            name_row3: '3月计划',
            name_row4: '4月计划',
            name_row5: '5月计划',
            name_row6: '6月计划',
            name_row7: '7月计划',
            name_row8: '8月计划',
            name_row9: '9月计划',
            name_row10: '10月计划',
            name_row11: '11月计划',
            name_row12: '12月计划',
          },
          {
            isShow: false,
            name_row1: 'januaryPlan',
            name_row2: 'februaryPlan',
            name_row3: 'marchPlan',
            name_row4: 'aprilPlan',
            name_row5: 'mayPlan',
            name_row6: 'junePlan',
            name_row7: 'julyPlan',
            name_row8: 'augustPlan',
            name_row9: 'septemberPlan',
            name_row10: 'octoberPlan',
            name_row11: 'novemberPlan',
            name_row12: 'decemberPlan',
          }
        ],
        searchArrAll: ww_FilterList.DepartmentNameArr,
        initData: [
          {
            label: '无资产',
            theValue: 1,
          }, {
            label: '未登记',
            theValue: 2,
          }, {
            label: '已登记',
            theValue: 3,
          },
        ],
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
        typeSearchArr: window.ww_FilterList.BusinessType,
        typeGNArr: window.ww_FilterList.FunctionAccount,
        economicArr: window.ww_FilterList.EconomicSubject,
        PerformanceClassificationArr: window.ww_FilterList.PerformanceClassification,
        formLabelData: {},
        rules: {
          mainProjectName: [
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
            { type: 'string', required: true, message: '项目预算总金额', trigger: 'blur,change' },
          ],
          internetCardCode: [
            { type: 'string', required: true, message: '请输入物联网卡号', trigger: 'blur,change' },
          ],
          expiresDate: [
            { type: 'string', required: true, message: '请选择期限', trigger: 'blur,change' },
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
      submitFn(formName) {
        const form = JSON.parse(JSON.stringify(this.formLabelData));

        if (form.year) {
          form.year = dateFormat(form.year, 'YYYY');
        }
        if (form.responsibleId) {
          delete form.responsibleObj
        }

        let objChange = {
          1: 'januaryPlan',
          2: 'februaryPlan',
          3: 'marchPlan',
          4: 'aprilPlan',
          5: 'mayPlan',
          6: 'junePlan',
          7: 'julyPlan',
          8: 'augustPlan',
          9: 'septemberPlan',
          10: 'octoberPlan',
          11: 'novemberPlan',
          12: 'decemberPlan',
          13: 'currentYearPayment',
          14: 'newYearPayment',
          15: 'budgetMoney',
        }
        for (let item in objChange) {
          if (form[objChange[item]]) {
            form[objChange[item]] = form[objChange[item]] * 10000
          }
        }

        this.$refs[formName].validate((valid) => {
          if (valid) {
            Api.addYSProjectInfo(form).then(res => {
              if (res.code === 0) {
                this.$router.push({ path: `/home/project/1/10` });
              }
            });
          }
        });

      },
      backFn() {
        this.$router.go(-1)
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

    .table-head-c {
      text-align: center;
    }


    .add-footer {
      width: 81%;
      text-align: center;
      padding-top: 30px;

      button {
        width: 300px;
      }
    }

  }
</style>
