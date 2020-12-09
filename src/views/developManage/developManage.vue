<template>
  <div class="page-main">
    <div class="head-row">
      <div class="title-row">
        数据统计
      </div>
      <div class="back-icon-title">
      </div>
    </div>
    <div class="table-view">
      <div v-if="activeName === 'fourth'" class="add-button">
        <el-button type="primary" @click="showAddFn('add')">新增
        </el-button>
      </div>
      <div class="tabs-row">
        <el-tabs v-model="activeName" class="border-b" type="card" @tab-click="handleClick">
          <el-tab-pane label="一级总表" name="first2">
            <div class="table-view">
              <el-form :model="formSearch" ref="toolbarForm" class="toolbar-wrap-form" style="display: flex">
                <div class="search-row">
                  <el-form-item class="tool-item" prop="year">
                    <el-date-picker
                      v-model="formSearch.year"
                      type="year"
                      @change="keySearch()"
                      placeholder="年份">
                    </el-date-picker>
                  </el-form-item>

                  <!--                  <div>-->
                  <!--                    <el-button style="margin: 0" type="primary" @click.stop="keySearch(formSearch)">筛选-->
                  <!--                    </el-button>-->
                  <!--                    <el-button type="primary" @click="resetForm('toolbarForm')">重置</el-button>-->
                  <!--                  </div>-->
                </div>
                <div class="table-view-con">

                  <el-table
                    v-loading="dataListLoading"
                    :data="dataList"
                    :row-style="{'font-size':'13px'}"
                    style="width: 100%"
                    row-key="id"
                    :header-cell-class-name="'table-head-class'"
                    border
                    class="no-border"
                  >
                    <el-table-column prop="mainProjectName"
                                     fixed="left"
                                     min-width="280" label="机关单位">
                      <template slot-scope="scope">
                        <el-button type="text" size="small"
                                   @click="goTowListFn(scope.row.agencyUnit)"><span>{{scope.row.agencyUnit ||
                          '--'}}</span>
                        </el-button>
                      </template>
                    </el-table-column>
                    <el-table-column prop="year" fixed="left" width="60" label="年度">
                      <template slot-scope="scope">
                        <span>    {{scope.row.year || '--'}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="totalMoney" width="110" label="资金总额 (万元)">
                      <template slot-scope="scope">
                        <span>    {{moneyFormat(scope.row.totalMoney) || '--'}}</span>
                      </template>
                    </el-table-column>
<!--                    <el-table-column prop="appendFunds" width="120" label="追加经费(万元)">-->
<!--                      <template slot-scope="scope">-->
<!--                        <span>    {{moneyFormat(scope.row.appendFunds) || '&#45;&#45;'}}</span>-->
<!--                      </template>-->
<!--                    </el-table-column>-->
                    <el-table-column prop="governmentInvestment" width="110" label="政府投资 (万元)">
                      <template slot-scope="scope">
                        <span>    {{moneyFormat(scope.row.governmentInvestment) || '--'}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="safetySpecial" width="120" label="安全生产专项(万元)">
                      <template slot-scope="scope">
                        <span>    {{moneyFormat(scope.row.safetySpecial) || '--'}}</span>
                      </template>
                    </el-table-column>

                    <el-table-column prop="scientificResearch" width="110" label="科研专项 (万元)">
                      <template slot-scope="scope">
                        <span>    {{moneyFormat(scope.row.scientificResearch) || '--'}}</span>
                      </template>
                    </el-table-column>
<!--                    <el-table-column prop="basicExpenditure" width="120" label="基本支出(万元)">-->
<!--                      <template slot-scope="scope">-->
<!--                        <span>    {{moneyFormat(scope.row.basicExpenditure) || '&#45;&#45;'}}</span>-->
<!--                      </template>-->
<!--                    </el-table-column>-->
                    <el-table-column prop="projectExpenditure" width="110" label="项目支出 (万元)">
                      <template slot-scope="scope">
                        <span>    {{moneyFormat(scope.row.projectExpenditure) || '--'}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="projectExpenditure" width="120" label="预算类项目数">
                      <template slot-scope="scope">
                        <span>    {{scope.row.budgetPrjectNumber || '--'}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="govPrjectNumber" width="135" label="政府投资项目数">
                      <template slot-scope="scope">
                        <span>    {{scope.row.govPrjectNumber || '--'}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="releaseProjectNumber" width="120" label="下达项目数">
                      <template slot-scope="scope">
                        <span>    {{scope.row.releaseProjectNumber || '--'}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="startProjectNumber" width="120" label="已启动数">
                      <template slot-scope="scope">
                        <span>    {{scope.row.startProjectNumber || '--'}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="overdueProjectNumber" width="120" label="逾期项目数">
                      <template slot-scope="scope">
                        <span>    {{scope.row.overdueProjectNumber || '--'}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="yearPlanMoney" width="120" label="年度计划支付(万元)">
                      <template slot-scope="scope">
                        <span>    {{moneyFormat(scope.row.yearPlanMoney) || '--'}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="totalPayMoney" width="110" label="累计支付 (万元)">
                      <template slot-scope="scope">
                        <span>    {{moneyFormat(scope.row.totalPayMoney) || '--'}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="totalPayPercentage" width="120" label="累计支付比">
                      <template slot-scope="scope">
                        <span>    {{(scope.row.totalPayPercentage*100).toFixed(2) || '--'}} % </span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="remarks" width="120" label="备注">
                      <template slot-scope="scope">
                        <span>    {{scope.row.remarks || '--'}}</span>
                      </template>
                    </el-table-column>

                  </el-table>
                </div>
              </el-form>
              <div class="table-footer" v-if="false">
                <div class="pagination">
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    layout="total,sizes,prev,pager,next,jumper"
                    :page-count="PageCountCom"
                    :page-size="pageSizeCom"
                    :current-page="currentPageCom"
                    :page-sizes="pageSizesCom"
                    :total="itemTotal">
                  </el-pagination>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="二级总表" name="second2">
            <div class="table-view">
              <el-form :model="formSearch" ref="toolbarForm" class="toolbar-wrap-form" style="display: flex">
                <div class="search-row">
                  <el-form-item class="tool-item" prop="agencyUnit">
                    <el-select style="width: 280px" v-model="formSearch.agencyUnit" @change="keySearch()"
                               placeholder="机关单位">
                      <el-option v-for="item in unitData" :key="item.keyValue" :label="item.keyName"
                                 :value="item.keyName"/>
                    </el-select>
                  </el-form-item>
                  <el-form-item class="tool-item" prop="year">
                    <el-date-picker
                      v-model="formSearch.year"
                      type="year"
                      @change="keySearch()"
                      placeholder="年份">
                    </el-date-picker>
                  </el-form-item>
                </div>
                <div class="table-view-con">

                  <el-table
                    v-loading="dataListLoading"
                    :data="dataList"
                    :row-style="{'font-size':'13px'}"
                    style="width: 100%"
                    row-key="id"
                    :span-method="objectSpanMethod"
                    :header-cell-class-name="'table-head-class'"
                    border
                    class="no-border"
                  >
                    <el-table-column prop="agencyUnit" min-width="230" label="机关单位">
                      <template slot-scope="scope">
                        <span>    {{scope.row.agencyUnit}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="department" width="110" label="责任处室">
                      <template slot-scope="scope">
                        <el-button type="text" size="small"
                                   @click="goIndexPageFn(scope.row)"><span>{{scope.row.department ||
                          '--'}}</span>
                        </el-button>
                      </template>
                    </el-table-column>

                    <el-table-column prop="year" width="60" label="年度">
                      <template slot-scope="scope">
                        <span>    {{scope.row.year || '--'}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="yearPlanMoney" width="120" label="年度计划金额(万元)">
                      <template slot-scope="scope">
                        <span>    {{moneyFormat(scope.row.yearPlanMoney)}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="yearPrjectNumber" width="135" label="年度预算项目数">
                      <template slot-scope="scope">
                        <span>    {{scope.row.yearPrjectNumber}}</span>
                      </template>
                    </el-table-column>
<!--                    <el-table-column prop="quarterPlanMoney" width="120" label="季度计划金额(万元)">-->
<!--                      <template slot-scope="scope">-->
<!--                        <span>    {{moneyFormat(scope.row.quarterPlanMoney)}}</span>-->
<!--                      </template>-->
<!--                    </el-table-column>-->
<!--                    <el-table-column prop="quarterCountMoney" width="160" label="季度累计完成金额(万元)">-->
<!--                      <template slot-scope="scope">-->
<!--                        <span>    {{moneyFormat(scope.row.quarterCountMoney)}}</span>-->
<!--                      </template>-->
<!--                    </el-table-column>-->
                    <el-table-column prop="meetingProjectNumber" width="180" label="已过会审议进行中项目数">
                      <template slot-scope="scope">
                        <span>    {{scope.row.meetingProjectNumber}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="completedProjectNumber" width="120" label="已完成项目数">
                      <template slot-scope="scope">
                        <span>    {{scope.row.completedProjectNumber }}</span>
                      </template>
                    </el-table-column>
                    <!--                    <el-table-column prop="carBudgetMoney" width="110" label="车辆费用预算数">-->
                    <!--                      <template slot-scope="scope">-->
                    <!--                        <span>    {{scope.row.carBudgetMoney }}</span>-->
                    <!--                      </template>-->
                    <!--                    </el-table-column>-->
                    <el-table-column prop="actualPayMoney" width="120" label="实际支付金额(万元)">
                      <template slot-scope="scope">
                        <span>    {{moneyFormat(scope.row.actualPayMoney)}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="actualPercentage" width="135" label="实际支付百分比">
                      <template slot-scope="scope">
                        <span>    {{(scope.row.actualPercentage*100).toFixed(2) }} %</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="unregisteredProject" width="135" label="资产未登记项目">
                      <template slot-scope="scope">
                        <span>    {{scope.row.unregisteredProject }}</span>
                      </template>
                    </el-table-column>
                    <!--                    <el-table-column prop="projectInfo" width="110" label="项目详情">-->
                    <!--                      <template slot-scope="scope">-->
                    <!--                        <span>    {{scope.row.unregisteredProject }}</span>-->
                    <!--                      </template>-->
                    <!--                    </el-table-column>-->
                    <!--                    <el-table-column prop="controlPerson" width="110" label="内控人员">-->
                    <!--                      <template slot-scope="scope">-->
                    <!--                        <span>    {{scope.row.controlPerson }}</span>-->
                    <!--                      </template>-->
                    <!--                    </el-table-column>-->
                    <el-table-column prop="remarks" width="110" label="备注">
                      <template slot-scope="scope">
                        <span>    {{scope.row.remarks }}</span>
                      </template>
                    </el-table-column>
                    <!--                    <el-table-column prop="id" width="100" label="操作">-->
                    <!--                      <template slot-scope="scope">-->
                    <!--                        <el-button type="text" size="small"-->
                    <!--                                   @click="goAddFn('editYS',scope.row.mainProjectId)">查看-->
                    <!--                        </el-button>-->
                    <!--                      </template>-->
                    <!--                    </el-table-column>-->
                  </el-table>
                </div>
              </el-form>
              <div class="table-footer">
                <div class="pagination">
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    layout="total,sizes,prev,pager,next,jumper"
                    :page-count="PageCountCom"
                    :page-size="pageSizeCom"
                    :current-page="currentPageCom"
                    :page-sizes="pageSizesCom"
                    :total="itemTotal">
                  </el-pagination>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="预算管理" name="third2">
            <div class="table-view">
              <el-form :model="formSearch" ref="toolbarForm" class="toolbar-wrap-form" style="display: flex">
                <div class="search-row">
                  <el-form-item class="tool-item" prop="year">
                    <el-date-picker
                      v-model="formSearch.year"
                      type="year"
                      @change="keySearch()"
                      placeholder="年份">
                    </el-date-picker>
                  </el-form-item>

                  <!--                  <div>-->
                  <!--                    <el-button style="margin: 0" type="primary" @click.stop="keySearch(formSearch)">筛选-->
                  <!--                    </el-button>-->
                  <!--                    <el-button type="primary" @click="resetForm('toolbarForm')">重置</el-button>-->
                  <!--                  </div>-->
                </div>
                <div class="table-view-con">

                  <el-table
                    v-loading="dataListLoading"
                    :data="dataList"
                    :row-style="{'font-size':'13px'}"
                    style="width: 100%"
                    row-key="id"
                    :header-cell-class-name="'table-head-class'"
                    border
                    class="no-border"
                  >
                    <el-table-column prop="agencyUnit" min-width="250" label="机关单位">
                      <template slot-scope="scope">
                        <span>    {{scope.row.agencyUnit}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="year" min-width="60" label="年度">
                      <template slot-scope="scope">
                        <span>    {{scope.row.year || '--'}}</span>
                      </template>
                    </el-table-column>

                    <el-table-column prop="lastYearAccounts" min-width="200" label="上年度决算数(万元)">
                      <template slot-scope="scope">
                        <span>    {{moneyFormat(scope.row.lastYearAccounts)}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="totalPay" min-width="200" label="月累计支付金额(万元)">
                      <template slot-scope="scope">
                        <span>    {{moneyFormat(scope.row.totalPay)}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="totalPayPercentage" min-width="200" label="月支付百分比">
                      <template slot-scope="scope">
                        <span>    {{(scope.row.totalPayPercentage*100).toFixed(2)+'%' }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="id" width="100" label="操作">
                      <template slot-scope="scope">
                        <el-button v-if="role!==2" type="text" size="small"
                                   @click="editYSParamModelFn(scope.row)">编辑
                        </el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </el-form>


            </div>
          </el-tab-pane>
          <el-tab-pane label="三公经费" name="second">
            <div class="table-view">
              <el-form :model="formSearch" ref="toolbarForm" class="toolbar-wrap-form" style="display: flex">
                <div class="search-row">
                  <el-form-item class="tool-item" prop="year">
                    <el-date-picker
                      v-model="formSearch.year"
                      type="year"
                      @change="keySearch()"
                      placeholder="年份">
                    </el-date-picker>
                  </el-form-item>

                  <!--                  <div>-->
                  <!--                    <el-button style="margin: 0" type="primary" @click.stop="keySearch(formSearch)">筛选-->
                  <!--                    </el-button>-->
                  <!--                    <el-button type="primary" @click="resetForm('toolbarForm')">重置</el-button>-->
                  <!--                  </div>-->
                </div>
                <div class="table-view-con">

                  <el-table
                    v-loading="dataListLoading"
                    :data="dataList"
                    :row-style="{'font-size':'13px'}"
                    style="width: 100%"
                    row-key="id"
                    :span-method="objectSpanMethod"
                    :header-cell-class-name="'table-head-class'"
                    border
                    class="no-border"
                  >
                    <el-table-column prop="agencyUnit"
                                     fixed="left"
                                     min-width="280" label="机关单位">
                      <template slot-scope="scope">
                        <el-button type="text" size="small"
                                   @click="goAddFn('jg',scope.row.agencyUnit)"><span>    {{scope.row.agencyUnit ||
                          '--'}}</span>
                        </el-button>
                      </template>
                    </el-table-column>
                    <el-table-column prop="year" fixed="left" width="60" label="年度">
                      <template slot-scope="scope">
                        <span>    {{scope.row.year || '--'}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="meetingBudgetMoney" width="120" label="会议费预算(万元)">
                      <template slot-scope="scope">
                        <span>    {{moneyFormat(scope.row.meetingBudgetMoney)}}</span>

                      </template>
                    </el-table-column>
                    <el-table-column prop="meetingPayMoney" width="120" label="会议费已支付(万元)">
                      <template slot-scope="scope">
                        <el-button type="text" size="small"
                                   @click="goAddFn('会议费',scope.row.agencyUnit)"><span>
                          {{moneyFormat(scope.row.meetingPayMoney) || '--'}}</span>
                        </el-button>
                      </template>
                    </el-table-column>
                    <el-table-column prop="lastMeetingMoney" width="160" label="上一年度会议支付(万元)">
                      <template slot-scope="scope">
                        <span>    {{moneyFormat(scope.row.lastMeetingMoney)}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="abroadBudgetMoney" width="110" label="培训预算 (万元)">
                      <template slot-scope="scope">
                        <span>    {{moneyFormat(scope.row.abroadBudgetMoney)}}</span>
                      </template>
                    </el-table-column>


                    <el-table-column prop="abroadPayMoney" width="110" label="培训支出( 万元)">
                      <template slot-scope="scope">
                        <el-button type="text" size="small"
                                   @click="goAddFn('培训支出',scope.row.agencyUnit)"><span>
                          {{moneyFormat(scope.row.abroadPayMoney) || '--'}}</span>
                        </el-button>
                      </template>
                    </el-table-column>
                    <el-table-column prop="lastAbroadMoney" width="160" label="上一年度培训支付(万元)">
                      <template slot-scope="scope">
                        <span>    {{moneyFormat(scope.row.lastAbroadMoney)}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="trainBudgetMoney" width="130" label="出国经费预算(万元)">
                      <template slot-scope="scope">
                        <span>    {{moneyFormat(scope.row.trainBudgetMoney)}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="trainPayMoney" width="135" label="出国经费已支付(万元)">
                      <template slot-scope="scope">
                        <el-button type="text" size="small"
                                   @click="goAddFn('出国经费',scope.row.agencyUnit)"><span>
                          {{moneyFormat(scope.row.trainPayMoney) || '--'}}</span>
                        </el-button>
                      </template>
                    </el-table-column>
                    <el-table-column prop="lastTrainMoney" width="160" label="上一年度出国支付(万元)">
                      <template slot-scope="scope">
                        <span>    {{moneyFormat(scope.row.lastTrainMoney)}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="carBudgetMoney" width="130" label="车辆费用预算(万元)">
                      <template slot-scope="scope">
                        <span>    {{moneyFormat(scope.row.carBudgetMoney) }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="carPayMoney" width="140" label="车辆费用已支付(万元)">
                      <template slot-scope="scope">
                        <el-button type="text" size="small"
                                   @click="goAddFn('车辆经费',scope.row.agencyUnit)"><span>
                          {{moneyFormat(scope.row.carPayMoney) ||
                          '--'}}</span>
                        </el-button>
                      </template>
                    </el-table-column>
                    <el-table-column prop="lastCarMoney" width="160" label="上一年度车辆支付(万元)">
                      <template slot-scope="scope">
                        <span>    {{moneyFormat(scope.row.lastCarMoney)}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="receptionBudgetMoney" width="120" label="接待费预算(万元)">
                      <template slot-scope="scope">
                        <span>    {{moneyFormat(scope.row.receptionBudgetMoney) }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="receptionPayMoney" width="120" label="接待费已支付(万元)">
                      <template slot-scope="scope">
                        <el-button type="text" size="small"
                                   @click="goAddFn('接待经费',scope.row.agencyUnit)"><span>
                          {{moneyFormat(scope.row.receptionPayMoney) || '--'}}</span>
                        </el-button>
                      </template>
                    </el-table-column>
                    <el-table-column prop="lastReceptionMoney" width="160" label="上一年度接待支付(万元)">
                      <template slot-scope="scope">
                        <span>    {{moneyFormat(scope.row.lastReceptionMoney)}}</span>
                      </template>
                    </el-table-column>
                    <!--                    <el-table-column prop="id" width="100" label="操作">-->
                    <!--                      <template slot-scope="scope">-->
                    <!--                        <el-button type="text" size="small"-->
                    <!--                                   @click="showAddFn('jf',scope.row)">编辑-->
                    <!--                        </el-button>-->
                    <!--                      </template>-->
                    <!--                    </el-table-column>-->
                  </el-table>
                </div>
              </el-form>
              <div class="table-footer">
                <div class="pagination">
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    layout="total,sizes,prev,pager,next,jumper"
                    :page-count="PageCountCom"
                    :page-size="pageSizeCom"
                    :current-page="currentPageCom"
                    :page-sizes="pageSizesCom"
                    :total="itemTotal">
                  </el-pagination>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="资产数据" name="third">
            <div class="table-view">
              <el-form :model="formSearch" ref="toolbarForm" class="toolbar-wrap-form" style="display: flex">
                <div class="table-view-con">

                  <el-table
                    v-loading="dataListLoading"
                    :data="dataList"
                    :row-style="{'font-size':'13px'}"
                    style="width: 100%"
                    row-key="id"
                    :header-cell-class-name="'table-head-class'"
                    border
                    class="no-border"
                  >
                    <el-table-column prop="agencyUnit" min-width="200" label="机关单位">
                      <template slot-scope="scope">
                        <el-button type="text" size="small"
                                   @click="goAddFn('zc',scope.row.agencyUnit)"><span>    {{scope.row.agencyUnit ||
                          '--'}}</span>
                        </el-button>
                      </template>
                    </el-table-column>
                    <el-table-column prop="year" width="60" label="年度">
                      <template slot-scope="scope">
                        <span>    {{scope.row.year || '--'}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="capitalTotalNumber" width="160" label="当前资金总条数">
                      <template slot-scope="scope">
                        <span>    {{scope.row.capitalTotalNumber}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="totalAssets" width="150" label="资金总金额(万元)">
                      <template slot-scope="scope">
                        <span>    {{moneyFormat(scope.row.totalAssets)}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="currentDepreciation" width="160" label="当前折旧 (万元)">
                      <template slot-scope="scope">
                        <span>    {{moneyFormat(scope.row.currentDepreciation)}}</span>
                      </template>
                    </el-table-column>


                    <el-table-column prop="totalDepreciation" width="200" label="累积折旧(万元)">
                      <template slot-scope="scope">
                        <span>    {{moneyFormat(scope.row.totalDepreciation)}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="netWorth" width="150" label="净值(万元)">
                      <template slot-scope="scope">
                        <span>    {{moneyFormat(scope.row.netWorth)}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="consumables" width="150" label="消耗品">
                      <template slot-scope="scope">
                        <span>    {{scope.row.consumables }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="remarks" min-width="350" label="备注">
                      <template slot-scope="scope">
                        <span>    {{scope.row.remarks }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="id" width="100" label="操作">
                      <template slot-scope="scope">
                        <el-button v-if="role!==2" type="text" size="small"
                                   @click="editOneParamModelFn(scope.row)">编辑
                        </el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </el-form>
              <div class="table-footer">
                <div class="pagination">
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    layout="total,sizes,prev,pager,next,jumper"
                    :page-count="PageCountCom"
                    :page-size="pageSizeCom"
                    :current-page="currentPageCom"
                    :page-sizes="pageSizesCom"
                    :total="itemTotal">
                  </el-pagination>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="物资数据" name="fourth">
            <div class="table-view">
              <el-form :model="formSearch" ref="toolbarForm" class="toolbar-wrap-form" style="display: flex">
                <div class="search-row">
                  <el-form-item class="tool-item" prop="evaluationMethod">
                    <el-select v-model="formSearch.agencyUnit" clearable placeholder="机关单位">
                      <el-option v-for="item in ResponsibleUnitArr" :key="item.keyValue"
                                 :label="item.keyName"
                                 :value="item.keyName"/>
                    </el-select>
                  </el-form-item>
                  <el-form-item class="tool-item" prop="year">
                    <el-date-picker
                      v-model="formSearch.year"
                      type="year"
                      placeholder="年">
                    </el-date-picker>
                  </el-form-item>
                  <div>
                    <el-button style="margin: 0" type="primary" @click.stop="keySearch(formSearch)">筛选
                    </el-button>
                    <el-button type="primary" @click="resetForm('toolbarForm')">重置</el-button>
                  </div>
                  <!--                                  <div class="add-button">-->
                  <!--                                    <el-button type="primary" @click.stop="goAddFn('ss','add')">添加实施项目-->
                  <!--                                    </el-button>-->
                  <!--                                  </div>-->
                </div>
                <div class="table-view-con">

                  <el-table
                    v-loading="dataListLoading"
                    :data="dataList"
                    :row-style="{'font-size':'13px'}"
                    style="width: 100%"
                    row-key="id"
                    :header-cell-class-name="'table-head-class'"
                    border
                    class="no-border"
                  >
                    <el-table-column prop="agencyUnit" min-width="250" label="机关单位">
                      <template slot-scope="scope">
                        <span>    {{scope.row.agencyUnit}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="year" width="60" label="年度">
                      <template slot-scope="scope">
                        <span>    {{scope.row.year || '--'}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="productName" min-width="250" label="品名">
                      <template slot-scope="scope">
                        <span>    {{scope.row.productName}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="meetingPayMoney" width="180" label="年度累积购买金额(元)">
                      <template slot-scope="scope">
                        <span>    {{moneyFormat(scope.row.yearTotalMoney,'set')}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="yearBuyNumber" width="150" label="年度累积购买数目">
                      <template slot-scope="scope">
                        <span>    {{scope.row.yearBuyNumber}}</span>
                      </template>
                    </el-table-column>


                    <el-table-column prop="existingInventory" width="150" label="现有库存">
                      <template slot-scope="scope">
                        <span>    {{scope.row.existingInventory}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="totalUse" width="150" label="当前累计领用">
                      <template slot-scope="scope">
                        <span>    {{scope.row.totalUse}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="remarks" min-width="350" label="备注">
                      <template slot-scope="scope">
                        <span>    {{scope.row.remarks }}</span>
                      </template>
                    </el-table-column>

                  </el-table>
                </div>
              </el-form>
              <div class="table-footer">
                <div class="pagination">
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    layout="total,sizes,prev,pager,next,jumper"
                    :page-count="PageCountCom"
                    :page-size="pageSizeCom"
                    :current-page="currentPageCom"
                    :page-sizes="pageSizesCom"
                    :total="itemTotal">
                  </el-pagination>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="自行采购项目" name="first">
            <div class="table-view">
              <el-form :model="formSearch" ref="toolbarForm" class="toolbar-wrap-form" style="display: flex">
                <div class="search-row">
                  <!--                                  <el-form-item class="tool-item" prop="year">-->
                  <!--                                    <el-date-picker-->
                  <!--                                      v-model="formSearch.year"-->
                  <!--                                      type="year"-->
                  <!--                                      placeholder="年">-->
                  <!--                                    </el-date-picker>-->
                  <!--                                  </el-form-item>-->
                  <el-form-item class="tool-item" prop="evaluationMethod">
                    <el-select v-model="formSearch.evaluationMethod" clearable placeholder="评价方式">
                      <el-option v-for="item in evaluationMethodArr" :key="item.theValue"
                                 :label="item.label"
                                 :value="item.label"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item class="tool-item" prop="assessResult">
                    <el-select v-model="formSearch.assessResult" clearable placeholder="评标结果">
                      <el-option v-for="item in assessResultArr" :key="item.id" :label="item.label"
                                 :value="item.label"></el-option>
                    </el-select>
                  </el-form-item>

                  <div>
                    <el-button style="margin: 0" type="primary" @click.stop="keySearch(formSearch)">筛选
                    </el-button>
                    <el-button type="primary" @click="resetForm('toolbarForm')">重置</el-button>
                  </div>
                  <!--                                  <div class="add-button">-->
                  <!--                                    <el-button type="primary" @click.stop="goAddFn('ss','add')">添加实施项目-->
                  <!--                                    </el-button>-->
                  <!--                                  </div>-->
                </div>
                <div class="table-view-con">

                  <el-table
                    v-loading="dataListLoading"
                    :data="dataList"
                    :row-style="{'font-size':'13px'}"
                    style="width: 100%"
                    row-key="id"
                    :header-cell-class-name="'table-head-class'"
                    border
                    class="no-border"
                  >
                    <el-table-column prop="projectId" width="100" label="项目编号">
                      <template slot-scope="scope">
                        <span>    {{scope.row.projectId || '--'}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="projectName" min-width="250" label="项目名称">
                      <template slot-scope="scope">
                        <span>    {{scope.row.projectName || '--'}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="evaluationMethod" width="120" label="评标方式">
                      <template slot-scope="scope">
                        <span>    {{scope.row.evaluationMethod || '--'}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="responsibilityDep" width="90" label="综合评分">
                      <template slot-scope="scope">
                        <span>    {{scope.row.comprehensiveScore || '--'}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="experts" min-width="150" label="专家">
                      <template slot-scope="scope">
                        <span>    {{scope.row.experts}}</span>
                      </template>
                    </el-table-column>

                    <el-table-column prop="bidCompany" min-width="200" label="投标公司">
                      <template slot-scope="scope">
                        <span>    {{scope.row.bidCompany || '--'}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="bidMoney" width="150" label="投标金额(万元)">
                      <template slot-scope="scope">
                        <span>    {{moneyFormat(scope.row.bidMoney) || '--'}}</span>
                      </template>
                    </el-table-column>

                    <el-table-column prop="auditStatus" width="120" label="资质审核状态">
                      <template slot-scope="scope">
                        <span>    {{scope.row.auditStatus || '--'}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="assessResult" width="120" label="评标结果">
                      <template slot-scope="scope">
                        <span>    {{scope.row.assessResult || '--'}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="remark" min-width="220" label="备注">
                      <template slot-scope="scope">
                        <div v-if="role===2">
                          <span>    {{scope.row.remark || '未填写'}}</span>
                        </div>
                        <div v-else>
                          <el-button type="text" size="small"
                                     @click="editOneParamFn('remark',scope.row)">
                            <span>    {{scope.row.remark || '未填写'}}</span>
                          </el-button>
                        </div>
                      </template>
                    </el-table-column>

                  </el-table>
                </div>
              </el-form>
              <div class="table-footer">
                <div class="pagination">
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    layout="total,sizes,prev,pager,next,jumper"
                    :page-count="PageCountCom"
                    :page-size="pageSizeCom"
                    :current-page="currentPageCom"
                    :page-sizes="pageSizesCom"
                    :total="itemTotal">
                  </el-pagination>
                </div>
              </div>
            </div>
          </el-tab-pane>

        </el-tabs>
      </div>

    </div>
    <add-funds-model ref="addFundsModel"></add-funds-model>
    <add-purchase-model ref="addPurchaseModel"></add-purchase-model>
    <add-material-model ref="addMaterialModel"></add-material-model>
    <edit-one-param ref="editOneParam"></edit-one-param>
    <edit-one-param-model ref="editOneParamModel"></edit-one-param-model>
    <edit-y-s-param-model ref="editYSParamModel"></edit-y-s-param-model>
  </div>
</template>

<script>
  import Api from '../../api';
  import { dateFormat, moneyFormat } from '../../filter/index';
  import addFundsModel from './addPage/addFundsModel';
  import addPurchaseModel from './addPage/addPurchaseModel';
  import addMaterialModel from './addPage/addMaterialModel';
  import editOneParam from './addPage/editRemarkModal';
  import editOneParamModel from './addPage/editOneParamModel';
  import editYSParamModel from './addPage/editYSParamModel';

  export default {
    name: 'developManage',
    data() {
      return {
        dataListLoading: false,
        searchName: '',
        role: '',
        activeName: 'first2',
        dataList: [],
        dataListCount: [],
        dataListShowCount: 0,
        pageSizesCom: [10, 20, 50],
        currentPageCom: 1,
        pageSizeCom: 10,
        PageCountCom: 1,
        itemTotal: 0,
        routeData: {},
        formSearch: {
          year: new Date(),
        },
        unitData: ww_FilterList.ResponsibleUnit,
        ResponsibleUnitArr: window.ww_FilterList.ResponsibleUnit,
        evaluationMethodArr: [{
          label: '综合评分法',
          theValue: 1,
        }, {
          label: '最低价法',
          theValue: 2,
        }, {
          label: '单一来源法',
          theValue: 3,
        }],
        assessResultArr: [
          {
            theValue: 1,
            label: '已中标',
          }, {
            theValue: 2,
            label: '未中标',
          },
        ],
      };
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      $route() {
        if (this.$route.name === this.routeData.name) {
          this.getData();
        }
      },
    },
    created() {
      this.role = JSON.parse(localStorage.getItem('ww_userData')).role;
      this.restFormSearch = JSON.parse(JSON.stringify(this.formSearch));
      if (this.$route.query.type) {
        this.activeName = JSON.parse(JSON.stringify(this.$route.query.type));
      }
      this.getData();
    },
    methods: {
      moneyFormat,
      editOneParamFn(param, value) {
        const child = this.$refs.editOneParam;
        child.formLabelData = JSON.parse(JSON.stringify(child.backupForm));
        child.ctrlDialog = true;
        child.titleText = `编辑备注`;
        child.param = param;
        child.projectId = value.projectId;
        child.formLabelData.remark = value.remark;
        child.getDataInfo(value.projectId);
        child.type = 'update';
        this.$Bus.$once('editOneParamData', (s) => {
          if (s === 0) {
            this.getData();
          }
        });
        child.ctrlDialog = true;
      },
      goAddFn(type, unit) {
        let routerString = '';
        if (this.activeName === 'second') {
          routerString = `/home/FundsInfoLIst/1/10?type=${type}&unit=${unit}`;
        } else if (this.activeName === 'third') {
          routerString = `/home/AssetInfoList/1/10?type=${type}&unit=${unit}`;
        }
        this.$router.push({ path: routerString });
      },
      editOneParamModelFn(value) {
        const child = this.$refs.editOneParamModel;
        child.formLabelData = JSON.parse(JSON.stringify(child.backupForm));
        child.ctrlDialog = true;
        child.titleText = `${value.agencyUnit} - 编辑资产数据`;
        child.getDataInfo(value);
        child.type = 'update';
        this.$Bus.$once('editOneParamModelData', (s) => {
          if (s === 0) {
            this.getData();
          }
        });
        child.ctrlDialog = true;
      },
      editYSParamModelFn(value) {
        const child = this.$refs.editYSParamModel;
        child.formLabelData = JSON.parse(JSON.stringify(child.backupForm));
        child.ctrlDialog = true;
        child.titleText = `${value.agencyUnit} - 编辑预算管理数据`;
        child.getDataInfo(value);
        child.type = 'update';
        this.$Bus.$once('editYSOneParamModelData', (s) => {
          if (s === 0) {
            this.getData();
          }
        });
        child.ctrlDialog = true;
      },
      showAddFn(value) {
        if (this.activeName === 'second') {
          const child = this.$refs.addFundsModel;
          child.formLabelData = JSON.parse(JSON.stringify(child.backupForm));
          child.ctrlDialog = true;
          child.titleText = '新增三公经费';

          if (value !== 'add') {
            child.getDataInfo(value);
            child.type = 'update';
          } else {
            child.type = value;
          }

          this.$Bus.$once('addFundsModelData', (s) => {
            if (s === 0) {
              this.getData();
            }
          });
          child.ctrlDialog = true;
        } else if (this.activeName === 'first') {
          const child = this.$refs.addPurchaseModel;
          child.formLabelData = JSON.parse(JSON.stringify(child.backupForm));
          child.ctrlDialog = true;
          child.titleText = '新增自行采购项目';
          if (value !== 'add') {
            child.getDataInfo(value);
            child.type = 'update';
          } else {
            child.type = value;
          }
          this.$Bus.$once('addPurchaseData', (s) => {
            if (s === 0) {
              this.getData();
            }
          });
          child.ctrlDialog = true;
        } else if (this.activeName === 'fourth') {
          const child = this.$refs.addMaterialModel;
          child.formLabelData = JSON.parse(JSON.stringify(child.backupForm));
          child.ctrlDialog = true;
          child.titleText = '新增物资数据';
          if (value !== 'add') {
            child.getDataInfo(value);
            child.type = 'update';
          } else {
            child.type = value;
          }
          this.$Bus.$once('addMaterialData', (s) => {
            if (s === 0) {
              this.getData();
            }
          });
          child.ctrlDialog = true;
        }
      },
      goTowListFn(agencyUnit) {
        this.formSearch.agencyUnit = agencyUnit;
        this.activeName = 'second2';
        this.getData();
      },
      goIndexPageFn(row) {
        this.$router.push({ path: `/home/projectList/1/10?agencyUnit=${row.agencyUnit}&department=${row.department}` });
      },
      handleSelect(key, keyPath) {
        if (this.menuString[key - 1].length > 0) {
          this.agencyUnit = this.menuString[key - 1];
          this.searchArr = this.searchArrAll[key - 1];
          this.resetForm('toolbarForm');
        }
        this.getData();
      },
      handleClick(tab, event) {
        this.resetForm('toolbarForm');
        let page = 10
        if (this.activeName === 'second2') {
          page = 20
        }
        this.getData(page);
      },
      handleSizeChange(val) {
        this.$router.push({
          name: this.routeData.name,
          params: {
            page: this.currentPageCom,
            count: val,
          },
        });
      },
      handleCurrentChange(val) {
        this.$router.push({
          name: this.routeData.name,
          params: {
            page: val,
            count: this.pageSizeCom,
          },
        });
      },
      keySearch() {
        if (this.routeData.params.page !== '1' && this.routeData.params.page !== 1) {
          this.$router.push({
            name: this.routeData.name,
            params: {
              page: 1,
              count: this.pageSizeCom,
            },
          });
        }
        this.getData();
      },
      getData(page) {
        this.dataListLoading = true;
        this.routeData = this.$route;
        let formSearch = this.formSearch;
        let params = { ...this.$route.params, ...formSearch };

        if (params.year) {
          params.year = dateFormat(params.year, 'YYYY');
        }
        if (!params.param) {
          delete params.param;
        }
        let apiText = 'getFinancePurchase';
        if (this.activeName === 'second') {
          apiText = 'getFinanceFunds';
        } else if (this.activeName === 'third') {
          apiText = 'getFinanceAssetManagement';
        } else if (this.activeName === 'fourth') {
          apiText = 'getFinanceMaterial';
        } else if (this.activeName === 'first2') {
          apiText = 'getTotalStatisticsList';
        } else if (this.activeName === 'second2') {
          apiText = 'getProjectStatisticsList';
          params.agencyUnit = formSearch.agencyUnit;
        } else if (this.activeName === 'third2') {
          apiText = 'getLastBudgetList';
        }
        if (page) {
          params.count = page
        }
        Api[apiText](params).then(res => {
          if (res.code === 0) {
            if (res.response.datas) {
              this.dataList = res.response.datas;
              if (this.activeName === 'second2') {
                let dataYSObj = {
                  '深圳市气象局': [],
                  '深圳市国家气候观象台': [],
                  '深圳市气象服务中心': [],
                  '粤港澳大湾区气象监测预警预报中心': []
                }
                for (let i = 0; i < this.dataList.length; i += 1) {
                  dataYSObj[this.dataList[i].agencyUnit].push(this.dataList[i])
                }
                let thisDataList = []
                for (let item in dataYSObj) {
                  for (let j = 0; j < dataYSObj[item].length; j += 1) {
                    thisDataList.push(dataYSObj[item][j])
                  }
                }
                this.dataList = thisDataList
              }

              let obj = {};
              this.dataListCount = [];
              for (let i = 0; i < this.dataList.length; i += 1) {
                if (!obj[this.dataList[i].agencyUnit]) {
                  obj[this.dataList[i].agencyUnit] = [];
                  obj[this.dataList[i].agencyUnit].push(this.dataList[i]);

                } else {
                  obj[this.dataList[i].agencyUnit].push(this.dataList[i]);
                }
              }
              let _thisData = [];
              for (let item in obj) {
                let itemArr = obj[item];
                let count = 0;
                for (let j = 0; j < itemArr.length; j += 1) {
                  _thisData.push(itemArr[j]);
                  if (j === 0) {
                    this.dataListCount.push(1);
                  } else {
                    this.dataListCount.push(0);
                    count = count + 1;
                  }
                }
                this.dataListCount[this.dataListCount.length - (count + 1)] = 1 + count;
              }
              this.dataList = _thisData;
              this.currentPageCom = res.response.page;
              this.pageSizeCom = res.response.count;
              this.PageCountCom = res.response.pageCount;
              this.itemTotal = res.response.countNumber;
            } else {
              this.dataList = res.response;
              let obj = {};
              this.dataListCount = [];
              for (let i = 0; i < this.dataList.length; i += 1) {
                if (!obj[this.dataList[i].agencyUnit]) {
                  obj[this.dataList[i].agencyUnit] = [];
                  obj[this.dataList[i].agencyUnit].push(this.dataList[i]);

                } else {
                  obj[this.dataList[i].agencyUnit].push(this.dataList[i]);
                }
              }
              let _thisData = [];
              for (let item in obj) {
                let itemArr = obj[item];
                let count = 0;
                for (let j = 0; j < itemArr.length; j += 1) {
                  _thisData.push(itemArr[j]);
                  if (j === 0) {
                    this.dataListCount.push(1);
                  } else {
                    this.dataListCount.push(0);
                    count = count + 1;
                  }
                }
                this.dataListCount[this.dataListCount.length - (count + 1)] = 1 + count;
              }
              this.dataList = _thisData;
            }

          }
          this.dataListLoading = false;
        });
      },
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          const _row = this.dataListCount[rowIndex];
          const _col = _row > 0 ? 1 : 0;
          return {
            rowspan: _row,
            colspan: _col,
          };
        }
      },
      resetForm(formName) {
        this.urlQuery = {};
        this.$refs[formName].resetFields();
        this.formSearch = Object.assign({}, this.restFormSearch);
        this.searchName = '';
        if (this.routeData.params.page === '1' || this.routeData.params.page === 1) {
          this.getData();
        } else {
          this.$router.push({
            name: this.routeData.name,
            params: {
              page: 1,
              count: this.routeData.params.count,
            },
          });
        }
      },
    },
    components: {
      addFundsModel,
      addPurchaseModel,
      addMaterialModel,
      editOneParam,
      editOneParamModel,
      editYSParamModel,
    },
  };
</script>

<style lang="less" scoped>


  .back-icon-title{
    top: 84px !important;
  }
  .tabs-row {
    padding: 0 30px;
  }

  .table-view {
    position: relative;
    padding-bottom: 10px;

    .search-row {
      padding: 10px 0 0 0;
    }

    .table-view-con {
      padding: 0;
    }

    .add-button {
      position: absolute;
      top: 9px;
      right: 40px;
      z-index: 1;
    }
  }
</style>
