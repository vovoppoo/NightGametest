<template>
  <div class="page-main" style="overflow: auto">
    <div class="head-row">
      <div class="title-row">
        项目展示
      </div>
    </div>
    <div class="table-view">
      <div class="tabs-row">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="一级总表" name="first">
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
                    :header-cell-class-name="'table-head-class'"
                    border
                    class="no-border"
                  >
                    <el-table-column prop="mainProjectName" min-width="250" label="机关单位">
                      <template slot-scope="scope">
                        <el-button type="text" size="small"
                                   @click="goTowListFn(scope.row.agencyUnit)"><span>{{scope.row.agencyUnit ||
                          '--'}}</span>
                        </el-button>
                      </template>
                    </el-table-column>
                    <el-table-column prop="year" width="60" label="年度">
                      <template slot-scope="scope">
                        <span>    {{scope.row.year || '--'}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="totalMoney" width="120" label="资金总额">
                      <template slot-scope="scope">
                        <span>    {{scope.row.totalMoney || '--'}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="appendFunds" width="120" label="追加经费">
                      <template slot-scope="scope">
                        <span>    {{scope.row.appendFunds || '--'}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="governmentInvestment" width="120" label="政府投资">
                      <template slot-scope="scope">
                        <span>    {{scope.row.governmentInvestment || '--'}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="safetySpecial" width="120" label="安全生产专项">
                      <template slot-scope="scope">
                        <span>    {{scope.row.safetySpecial || '--'}}</span>
                      </template>
                    </el-table-column>

                    <el-table-column prop="scientificResearch" width="120" label="科研专项">
                      <template slot-scope="scope">
                        <span>    {{scope.row.scientificResearch || '--'}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="basicExpenditure" width="120" label="基本支出">
                      <template slot-scope="scope">
                        <span>    {{scope.row.basicExpenditure || '--'}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="projectExpenditure" width="120" label="项目支出">
                      <template slot-scope="scope">
                        <span>    {{scope.row.projectExpenditure || '--'}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="projectExpenditure" width="120" label="项目支出">
                      <template slot-scope="scope">
                        <span>    {{scope.row.projectExpenditure || '--'}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="projectExpenditure" width="120" label="预算类项目数">
                      <template slot-scope="scope">
                        <span>    {{scope.row.budgetPrjectNumber || '--'}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="govPrjectNumber" width="120" label="政府投资项目数">
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
                        <span>    {{scope.row.releaseProjectNumber || '--'}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="overdueProjectNumber" width="120" label="逾期项目数">
                      <template slot-scope="scope">
                        <span>    {{scope.row.releaseProjectNumber || '--'}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="yearPlanMoney" width="120" label="年度计划支付">
                      <template slot-scope="scope">
                        <span>    {{scope.row.yearPlanMoney || '--'}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="totalPayMoney" width="120" label="累计支付">
                      <template slot-scope="scope">
                        <span>    {{scope.row.totalPayMoney || '--'}}</span>
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
          <el-tab-pane label="二级总表" name="second">
            <div class="table-view">
              <el-form :model="formSearch" ref="toolbarForm" class="toolbar-wrap-form" style="display: flex">
                <div class="search-row">
                  <el-form-item class="tool-item" prop="agencyUnit">
                    <el-select style="width: 280px" v-model="formSearch.agencyUnit" @change="keySearch()"
                               placeholder="机关单位">
                      <el-option v-for="item in unitData" :key="item.theValue" :label="item.label"
                                 :value="item.label"/>
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
                    <el-table-column prop="department" width="100" label="责任处室">
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
                    <el-table-column prop="yearPlanMoney" width="110" label="年度计划金额">
                      <template slot-scope="scope">
                        <span>    {{scope.row.yearPlanMoney}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="yearPrjectNumber" width="110" label="年度预算项目数">
                      <template slot-scope="scope">
                        <span>    {{scope.row.yearPrjectNumber}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="quarterPlanMoney" width="110" label="季度计划金额">
                      <template slot-scope="scope">
                        <span>    {{scope.row.quarterPlanMoney}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="quarterCountMoney" width="110" label="季度累计完成金额">
                      <template slot-scope="scope">
                        <span>    {{scope.row.quarterCountMoney}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="meetingProjectNumber" width="110" label="已过会审议进行中项目数">
                      <template slot-scope="scope">
                        <span>    {{scope.row.meetingProjectNumber}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="completedProjectNumber" width="110" label="已完成项目数">
                      <template slot-scope="scope">
                        <span>    {{scope.row.completedProjectNumber }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="carBudgetMoney" width="110" label="车辆费用预算数">
                      <template slot-scope="scope">
                        <span>    {{scope.row.carBudgetMoney }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="actualPayMoney" width="110" label="实际支付金额">
                      <template slot-scope="scope">
                        <span>    {{scope.row.actualPayMoney }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="actualPercentage" width="110" label="实际支付百分比">
                      <template slot-scope="scope">
                        <span>    {{(scope.row.actualPercentage*100).toFixed(2) }} %</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="unregisteredProject" width="110" label="资产未登记项目">
                      <template slot-scope="scope">
                        <span>    {{scope.row.unregisteredProject }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="projectInfo" width="110" label="项目详情">
                      <template slot-scope="scope">
                        <span>    {{scope.row.unregisteredProject }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="controlPerson" width="110" label="内控人员">
                      <template slot-scope="scope">
                        <span>    {{scope.row.controlPerson }}</span>
                      </template>
                    </el-table-column>
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
          <el-tab-pane label="预算管理" name="third">
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

                    <el-table-column prop="lastYearAccounts" min-width="200" label="上年度决算数">
                      <template slot-scope="scope">
                        <span>    {{scope.row.lastYearAccounts}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="quarterCountMoney" min-width="200" label="月累计支付金额">
                      <template slot-scope="scope">
                        <span>    {{scope.row.totalPay}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="totalPayPercentage" min-width="200" label="月支付百分比">
                      <template slot-scope="scope">
                        <span>    {{(scope.row.totalPayPercentage*100).toFixed(2)+'%' }}</span>
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
        </el-tabs>
      </div>

    </div>
  </div>
</template>

<script>
  import Api from '../../api';
  import { dateFormat } from '../../filter/index';

  export default {
    name: 'developManage',
    data() {
      return {
        dataListLoading: false,
        searchName: '',
        activeName: 'first',
        dataList: [],
        dataListCount: [],
        jiaDataList: [],
        pageSizesCom: [10, 20, 50],
        currentPageCom: 1,
        pageSizeCom: 10,
        PageCountCom: 1,
        itemTotal: 0,
        routeData: {},
        formSearch: {
          year: new Date(),
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
      this.restFormSearch = JSON.parse(JSON.stringify(this.formSearch));
      this.keySearch();
    },
    methods: {
      goTowListFn(agencyUnit) {
        this.formSearch.agencyUnit = agencyUnit;
        this.activeName = 'second';
        this.getData();
      },
      goIndexPageFn(row) {
        this.$router.push({ path: `/home/project/1/6?agencyUnit=${row.agencyUnit}&department=${row.department}` });
      },
      handleClick(tab, event) {
        this.resetForm('toolbarForm');
        this.getData();
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
        this.$router.push({
          name: this.routeData.name,
          params: {
            page: 1,
            count: this.pageSizeCom,
          },
        });
        this.getData();
      },
      getData() {
        this.routeData = this.$route;
        let formSearch = JSON.parse(JSON.stringify(this.formSearch));
        let params = { ...this.$route.params, ...formSearch };

        // if (this.searchName.length > 0) {
        //   params.param = this.searchName;
        // }
        if (!params.param) {
          delete params.param;
        }
        if (params.agencyUnit) {
          delete params.agencyUnit;
        }
        if (params.year) {
          params.year = dateFormat(params.year, 'YYYY');
        }
        let apiText = 'getTotalStatisticsList';
        if (this.activeName === 'second') {
          apiText = 'getProjectStatisticsList';
          params.agencyUnit = formSearch.agencyUnit;
        } else if (this.activeName === 'third') {
          apiText = 'getLastBudgetList';
        }
        this.dataListLoading = true;

        Api[apiText](params).then(res => {
          if (res.code === 0) {
            if (res.response.datas) {
              this.dataList = res.response.datas;
              this.currentPageCom = res.response.page;
              this.pageSizeCom = res.response.count;
              this.PageCountCom = res.response.pageCount;
              this.itemTotal = res.response.countNumber;

              let obj = {
                '深圳市气象局': [],
                '深圳市国家气候观象台': [],
                '深圳市气象服务中心': [],
                '粤港澳大湾区气象监测预警预报中心': [],
              };
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
                if (itemArr.length > 0) {
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
              }
              this.dataList = _thisData;
            } else {
              this.dataList = res.response;
              let obj = {
                '深圳市气象局': [],
                '深圳市国家气候观象台': [],
                '深圳市气象服务中心': [],
                '粤港澳大湾区气象监测预警预报中心': [],
              };
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
                if (itemArr.length > 0) {
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
  };
</script>

<style lang="less" scoped>

  .page-main {
    .table-view {
      padding-bottom: 50px;
    }
  }
</style>
