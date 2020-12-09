<template>
  <div class="page-main">
    <div class="head-row">
      <div class="title-row">
        规划发展数据
      </div>
      <div class="back-icon-title">
      </div>
    </div>
    <div class="table-view">
      <div class="tabs-row">
        <div class="table-view">
          <el-form :model="formSearch" ref="toolbarForm" class="toolbar-wrap-form" style="display: flex">
            <div class="search-row">
              <div class="search-left">
                <el-form-item class="tool-item" prop="year">
                  <el-date-picker
                    v-model="formSearch.year"
                    type="year"
                    placeholder="年度">
                  </el-date-picker>
                </el-form-item>
                <el-form-item class="tool-item" prop="procurementMethod">
                  <el-select v-model="formSearch.planType" clearable placeholder="规划类型">
                    <el-option v-for="item in purchaseArr" :key="item.id" :label="item.keyName"
                               :value="item.keyValue"></el-option>
                  </el-select>
                </el-form-item>

                <div>
                  <el-button style="margin: 0" type="primary" @click.stop="keySearch(formSearch)">筛选
                  </el-button>
                  <el-button type="primary" @click="resetForm('toolbarForm')">重置</el-button>
                </div>
              </div>

              <div v-if="role!==2" class="add-button">
                <el-button type="primary" @click.stop="goAddFn('add')">添加数据
                </el-button>
              </div>
            </div>
            <div class="table-view-con">

              <el-table
                v-loading="dataListLoading"
                :data="dataList"
                row-key="id"
                :row-style="{'font-size':'16px'}"
                style="width: 100%"
                :header-cell-class-name="'table-head-class'"
                border
                class="no-border"
              >
                <el-table-column prop="planningName"
                                 fixed="left"
                                 min-width="300" label="规划名称">
                  <template slot-scope="scope">
                    <div> {{scope.row.planningName || '--'}}</div>
                  </template>
                </el-table-column>
                <el-table-column prop="year" width="60" label="年度">
                  <template slot-scope="scope">
                    <div> {{scope.row.year || '--'}}</div>
                  </template>
                </el-table-column>
                <el-table-column prop="planningObjectives" min-width="300" label="规划目标">
                  <template slot-scope="scope">
                    <el-tooltip popper-class="hover-tis" :disabled="scope.row.planningObjectives.length<80"
                                :content="scope.row.planningObjectives "
                                placement="left-end"
                                effect="light">
                      <div> {{scope.row.planningObjectives.substring(0,80)}} <span v-if="scope.row.planningObjectives.length>80"><span v-if="scope.row.planningObjectives.length>80">...</span></span> </div>
                    </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column prop="indexSystem" min-width="300" label="指标体系">
                  <template slot-scope="scope">
                    <el-tooltip popper-class="hover-tis" :disabled="scope.row.indexSystem.length<80"
                                :content="scope.row.indexSystem "
                                placement="left-end"
                                effect="light">
                      <div> {{scope.row.indexSystem .substring(0,80)}}<span v-if="scope.row.indexSystem.length>80">...</span></div>
                    </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column prop="keyTasks" min-width="300" label="重点任务">
                  <template slot-scope="scope">
                    <el-tooltip popper-class="hover-tis" :disabled="scope.row.keyTasks.length<80"
                                :content="scope.row.keyTasks "
                                placement="left-end"
                                effect="light">
                      <div> {{scope.row.keyTasks.substring(0,80)}}<span v-if="scope.row.keyTasks.length>80">...</span></div>
                    </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column prop="majorProjects" min-width="300" label="重大工程">
                  <template slot-scope="scope">
                    <el-tooltip popper-class="hover-tis" :disabled="scope.row.majorProjects.length<80"
                                :content="scope.row.majorProjects "
                                placement="left-end"
                                effect="light">
                      <div> {{scope.row.majorProjects.substring(0,80)}}<span v-if="scope.row.majorProjects.length>80">...</span></div>
                    </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column prop="projectFunds" min-width="300" label="涉及工程资金">
                  <template slot-scope="scope">
                    <el-tooltip popper-class="hover-tis" :disabled="scope.row.projectFunds.length<80"
                                :content="scope.row.projectFunds "
                                placement="left-end"
                                effect="light">
                      <div> {{scope.row.projectFunds.substring(0,80)}}<span v-if="scope.row.projectFunds.length>80">...</span></div>
                    </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column prop="implementation" min-width="300" label="执行情况">
                  <template slot-scope="scope">
                    <el-tooltip popper-class="hover-tis" :disabled="scope.row.implementation.length<80"
                                :content="scope.row.implementation "
                                placement="left-end"
                                effect="light">
                      <div> {{scope.row.implementation.substring(0,80)}}<span v-if="scope.row.implementation.length>80">...</span></div>
                    </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column prop="planType" width="150" label="规划类型">
                  <template slot-scope="scope">
                    <el-tooltip popper-class="hover-tis" :disabled="scope.row.planType.length<80"
                                :content="purchaseArrShow[scope.row.planType]"
                                placement="left-end"
                                effect="light">
                      <div> {{purchaseArrShow[scope.row.planType].substring(0,80)}}<span v-if="scope.row.planType.length>80">...</span></div>
                    </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column prop="planContent" min-width="300" label="规划内容">
                  <template slot-scope="scope">
                    <el-tooltip popper-class="hover-tis" :disabled="scope.row.planContent.length<80"
                                :content="scope.row.planContent "
                                placement="left-end"
                                effect="light">
                      <div> {{scope.row.planContent.substring(0,80)}}<span v-if="scope.row.planContent.length>80">...</span></div>
                    </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column prop="planBasis" min-width="300" label="规划依据">
                  <template slot-scope="scope">
                    <el-tooltip popper-class="hover-tis" :disabled="scope.row.planBasis.length<80"
                                :content="scope.row.planBasis "
                                placement="left-end"
                                effect="light">
                      <div> {{scope.row.planBasis.substring(0,80)}}<span v-if="scope.row.planBasis.length>80">...</span></div>
                    </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column prop="planIndex" min-width="300" label="规划指标">
                  <template slot-scope="scope">
                    <el-tooltip popper-class="hover-tis" :disabled="scope.row.planIndex.length<80"
                                :content="scope.row.planIndex "
                                placement="left-end"
                                effect="light">
                      <div> {{scope.row.planIndex.substring(0,80)}}<span v-if="scope.row.planIndex.length>80">...</span></div>
                    </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column prop="planDemand" min-width="300" label="执行情况">
                  <template slot-scope="scope">
                    <el-tooltip popper-class="hover-tis" :disabled="scope.row.planDemand.length<80"
                                :content="scope.row.planDemand "
                                placement="left-end"
                                effect="light">
                      <div> {{scope.row.planDemand.substring(0,80)}}<span v-if="scope.row.planDemand.length>80">...</span></div>
                    </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column prop="timeRanges" width="150" label="时间范围">
                  <template slot-scope="scope">
                    <el-tooltip popper-class="hover-tis" :disabled="scope.row.timeRanges.length<80"
                                :content="scope.row.timeRanges "
                                placement="left-end"
                                effect="light">
                      <div> {{scope.row.timeRanges.substring(0,80)}}<span v-if="scope.row.timeRanges.length>80">...</span></div>
                    </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column prop="replyMoney" min-width="300" label="批复金额">
                  <template slot-scope="scope">
                    <el-tooltip popper-class="hover-tis" :disabled="scope.row.replyMoney.length<80"
                                :content="scope.row.replyMoney "
                                placement="left-end"
                                effect="light">
                      <div> {{scope.row.replyMoney.substring(0,80)}}<span v-if="scope.row.replyMoney.length>80">...</span></div>
                    </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column prop="govWorkRelated" min-width="300" label="与我局相关工作">
                  <template slot-scope="scope">
                    <el-tooltip popper-class="hover-tis" :disabled="scope.row.govWorkRelated.length<80"
                                :content="scope.row.govWorkRelated "
                                placement="left-end"
                                effect="light">
                      <div> {{scope.row.govWorkRelated.substring(0,80)}}<span v-if="scope.row.govWorkRelated.length>80">...</span></div>
                    </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column prop="firstYearCompleted" min-width="300" label="第一年完成目标">
                  <template slot-scope="scope">
                    <el-tooltip popper-class="hover-tis" :disabled="scope.row.firstYearCompleted.length<80"
                                :content="scope.row.firstYearCompleted "
                                placement="left-end"
                                effect="light">
                      <div> {{scope.row.firstYearCompleted.substring(0,80)}}<span v-if="scope.row.firstYearCompleted.length>80">...</span></div>
                    </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column prop="secondYearCompleted" min-width="300" label="第二年完成目标">
                  <template slot-scope="scope">
                    <el-tooltip popper-class="hover-tis" :disabled="scope.row.secondYearCompleted.length<80"
                                :content="scope.row.secondYearCompleted "
                                placement="left-end"
                                effect="light">
                      <div> {{scope.row.secondYearCompleted.substring(0,80)}}<span v-if="scope.row.secondYearCompleted.length>80">...</span></div>
                    </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column prop="thirdYearCompleted" min-width="300" label="第三年完成目标">
                  <template slot-scope="scope">
                    <el-tooltip popper-class="hover-tis" :disabled="scope.row.thirdYearCompleted.length<80"
                                :content="scope.row.thirdYearCompleted "
                                placement="left-end"
                                effect="light">
                      <div> {{scope.row.thirdYearCompleted.substring(0,80)}}<span v-if="scope.row.thirdYearCompleted.length>80">...</span></div>
                    </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column prop="fourthYearCompleted" min-width="300" label="第四年完成目标">
                  <template slot-scope="scope">
                    <el-tooltip popper-class="hover-tis" :disabled="scope.row.fourthYearCompleted.length<80"
                                :content="scope.row.fourthYearCompleted "
                                placement="left-end"
                                effect="light">
                      <div> {{scope.row.fourthYearCompleted.substring(0,80)}}<span v-if="scope.row.fourthYearCompleted.length>80">...</span></div>
                    </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column prop="fifthYearCompleted" min-width="300" label="第五年完成目标">
                  <template slot-scope="scope">
                    <el-tooltip popper-class="hover-tis" :disabled="scope.row.fifthYearCompleted.length<80"
                                :content="scope.row.fifthYearCompleted "
                                placement="left-end"
                                effect="light">
                      <div> {{scope.row.fifthYearCompleted.substring(0,80)}}<span v-if="scope.row.fifthYearCompleted.length>80">...</span></div>
                    </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column prop="remarks" min-width="300" label="备注">
                  <template slot-scope="scope">
                    <el-tooltip popper-class="hover-tis" :disabled="scope.row.remarks.length<80"
                                :content="scope.row.remarks "
                                placement="left-end"
                                effect="light">
                      <div> {{scope.row.remarks.substring(0,80)}}<span v-if="scope.row.remarks.length>80">...</span></div>
                    </el-tooltip>
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
      </div>

    </div>
  </div>
</template>

<script>
  import Api from '../../api';
  import { dateFormat, moneyFormat } from '../../filter';
  export default {
    name: 'developManage',
    data() {
      return {
        dataListLoading: false,
        searchName: '',
        role: '',
        dataList: [],
        pageSizesCom: [10, 20, 50],
        currentPageCom: 1,
        pageSizeCom: 10,
        PageCountCom: 1,
        itemTotal: 0,
        routeData: {},
        purchaseArr:ww_FilterList.planType,
        purchaseArrShow:ww_FilterList_show.planType,
        formSearch: {
          year: new Date(),
        },
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
      this.getData();
    },
    methods: {
      dateFormat,
      goAddFn(id) {
        this.$router.push({ path: `/home/fddFinanceInfo/${id}` });
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
        this.dataListLoading = true;
        this.routeData = this.$route;
        let formSearch = this.formSearch;
        let params = { ...this.$route.params, ...formSearch };

        if (params.year) {
          params.year = dateFormat(params.year, 'YYYY');
        }

        // if (this.searchName.length > 0) {
        //   params.param = this.searchName;
        // }
        if (!params.param) {
          delete params.param;
        }
        let apiText = 'getPlanDepModule';

        Api[apiText](params).then(res => {
          if (res.code === 0) {
            if (res.response.datas) {

              res.response.datas.map(item => {
                for (let obj in item) {
                  if (!item[obj]) {
                    item[obj] = '';
                  }
                }
                return item;
              });

              this.dataList = res.response.datas;
              this.currentPageCom = res.response.page;
              this.pageSizeCom = res.response.count;
              this.PageCountCom = res.response.pageCount;
              this.itemTotal = res.response.countNumber;
            } else {
              this.dataList = res.response;
            }

          }
          this.dataListLoading = false;
        });
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

  .back-icon-title{
    top: 84px !important;
  }
  .page-main .table-view {
    padding: 5px 10px 40px;




    .table-footer {
      padding-top: 0;
    }

    .search-row {
      display: flex;
      justify-content: space-between;

      .search-left {
        display: flex;
      }
    }


  }

  .table-view-con .el-table .cell > div {
    min-height: 114px;
    overflow: hidden; /*超出隐藏*/
    text-overflow: ellipsis; /*文本溢出时显示省略标记*/
    display: -webkit-box; /*设置弹性盒模型*/
    -webkit-line-clamp: 4; /*文本占的行数,如果要设置2行加<span v-if="scope.row.planningObjectives.length>80">...</span>则设置为2*/
    -webkit-box-orient: vertical; /*子代元素垂直显示*/
  }
</style>
