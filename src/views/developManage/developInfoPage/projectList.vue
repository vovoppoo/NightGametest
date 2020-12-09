<template>
  <div class="page-main" style="overflow: auto">
    <div class="head-row">
      <div class="title-row">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/home/developManage/1/10?type=second2' }">数据统计</el-breadcrumb-item>
          <el-breadcrumb-item>{{formSearch.agencyUnit}} / {{formSearch.responsibilityDep}} / 实施项目列表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="table-view">
      <!--      <div class="edit-back">-->
      <!--        <el-button type="primary" @click="backFn(true)">退后</el-button>-->
      <!--      </div>-->
      <div class="edit-back">
        <!--        <el-button type="primary" @click="showAddFn('add')">新增数据</el-button>-->
      </div>
      <div class="tabs-row">
        <div class="table-view">
          <el-form :model="formSearch" ref="toolbarForm" class="toolbar-wrap-form" style="display: flex">
            <div class="search-row">
              <el-form-item class="tool-item" prop="year">
                <el-date-picker
                  v-model="formSearch.year"
                  type="year"
                  row-key="projectId"
                  placeholder="年">
                </el-date-picker>
              </el-form-item>
              <div>
                <el-button style="margin: 0" type="primary" @click.stop="keySearch(formSearch)">筛选
                </el-button>
                <el-button type="primary" @click="resetForm('toolbarForm')">重置</el-button>
              </div>
            </div>
            <div class="table-view-con">

              <el-table
                v-loading="dataListLoading"
                :data="dataList"
                row-key="id"
                :row-style="{'font-size':'13px'}"
                style="width: 100%"
                :header-cell-class-name="'table-head-class'"
                border
                class="no-border"
              >
                <el-table-column prop="mainProjectName" min-width="250" label="项目名称">
                  <template slot-scope="scope">
                    <span>    {{scope.row.projectName || '--'}}</span>
                  </template>
                </el-table-column>
                <!--                  <el-table-column prop="mainProjectName" min-width="250" label="项目名称">-->
                <!--                    <template slot-scope="scope">-->
                <!--                      <span>    {{scope.row.projectName || '&#45;&#45;'}}</span>-->
                <!--                    </template>-->
                <!--                  </el-table-column>-->
                <el-table-column prop="projectStatus" width="90" label="项目状态">
                  <template slot-scope="scope">

                    <div v-if="scope.row.projectStatus=='7'" class="green">
                        {{FilterList_show.ProjectStatus[scope.row.projectStatus]|| '--'}}
                    </div>
                    <div v-if="scope.row.projectStatus=='1'" class="red">

                        {{FilterList_show.ProjectStatus[scope.row.projectStatus]|| '--'}}
                    </div>
                    <div v-if="scope.row.projectStatus!='1' && scope.row.projectStatus!='7'">

                        {{FilterList_show.ProjectStatus[scope.row.projectStatus]|| '--'}}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="responsibilityDep" width="120" label="责任处室">
                  <template slot-scope="scope">
                    <span>    {{scope.row.responsibilityDep || '--'}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="year" width="50" label="年份">
                  <template slot-scope="scope">
                    <span>    {{scope.row.year}}</span>
                  </template>
                </el-table-column>

                <el-table-column prop="responsible" width="80" label="责任人">
                  <template slot-scope="scope">
                    <span>    {{scope.row.responsible || '--'}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="procurementMethod" width="80" label="采购方式">
                  <template slot-scope="scope">
                    <span>    {{scope.row.procurementMethod || '--'}}</span>
                  </template>
                </el-table-column>

                <el-table-column prop="budgetMoney" min-width="120" label="项目预算金额(万元)">
                  <template slot-scope="scope">
                      <span>    {{moneyFormat(scope.row.budgetMoney) || '--'}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="currentYearPayment" min-width="120" label="本年支付金额(万元)">
                  <template slot-scope="scope">
                      <span>    {{moneyFormat(scope.row.currentYearPayment) || '--'}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="paidMoney" min-width="120" label="已支付金额(万元)">
                  <template slot-scope="scope">
                    <span>    {{moneyFormat(scope.row.paidMoney) || '--'}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="bidMoney" min-width="120" label="合同金额(万元)">
                  <template slot-scope="scope">
                      <span>    {{moneyFormat(scope.row.bidMoney) || '--'}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="currentYearPayment" width="110" label="合同开始时间">
                  <template slot-scope="scope">
                      <span>    {{scope.row.startTime || '--'}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="currentYearPayment" width="110" label="合同结束时间">
                  <template slot-scope="scope">
                      <span>    {{scope.row.endTime || '--'}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="isPayOverdue" width="80" label="是否逾期">
                  <template slot-scope="scope">
                    <span v-if="scope.row.isPayOverdue==1" class="red">    {{scope.row.isPayOverdue==1?'是':'否' }}</span>
                    <span v-else>    {{scope.row.isPayOverdue==1?'是':'否' }}</span>
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
      <add-asset-info-model ref="addAssetInfoModel"></add-asset-info-model>
    </div>
  </div>

</template>

<script>
  import Api from '../../../api';
  import addAssetInfoModel from '../addPage/addAssetInfoModel';
  import { dateFormat, moneyFormat } from '../../../filter/index';

  export default {
    name: 'developManage',
    data() {
      return {
        dataListLoading: false,
        agencyUnit: '',
        searchName: '',
        menuString: ['', '深圳市气象局', '深圳市国家气候观象台', '深圳市气象服务中心', '粤港澳大湾区气象监测预警预报中心'],
        dataList: [],
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
        searchArr: [],
        searchArrAll: ww_FilterList.DepartmentIdArr,
        pageSizesCom: [10, 20, 50],
        currentPageCom: 1,
        pageSizeCom: 10,
        PageCountCom: 1,
        itemTotal: 0,
        routeData: {},
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
      this.FilterList_show = window.ww_FilterList_show;
      let formSearch = this.formSearch;
      this.routeData = this.$route;
      if (this.routeData.query.agencyUnit) {
        formSearch.agencyUnit = this.routeData.query.agencyUnit;
      }
      if (this.routeData.query.department) {
        formSearch.responsibilityDep = this.routeData.query.department;
      }
      this.restFormSearch = JSON.parse(JSON.stringify(this.formSearch));

      this.formSearch = JSON.parse(JSON.stringify(this.formSearch));
      this.getData();

    },
    methods: {
      moneyFormat,
      backFn() {
        this.$router.go(-1);
      },
      showAddFn(value) {
        const child = this.$refs.addAssetInfoModel;
        child.formLabelData = JSON.parse(JSON.stringify(child.backupForm));
        child.ctrlDialog = true;
        child.titleText = `新增资产数据明细`;

        if (value !== 'add') {
          child.getDataInfo(value);
          child.type = 'update';
        } else {
          child.type = value;
        }

        this.$Bus.$once('addAssetInfoModelData', (s) => {
          if (s === 0) {
            this.getData();
          }
        });
        child.ctrlDialog = true;
      },
      goAddFn(e, id) {
        if (e === 'ss') {
          this.$router.push({ path: `/home/addImplementationInfo/${id}` });
        }
      },
      handleSelect(key, keyPath) {
        if (this.menuString[key].length > 0) {
          this.agencyUnit = this.menuString[key];
          this.searchArr = this.searchArrAll[key];
        }
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

        let apiText = 'getProject';

        Api[apiText](params).then(res => {
          if (res.code === 0) {
            if (res.response.datas) {
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
    components: {
      addAssetInfoModel,
    },
  };
</script>

<style lang="less" scoped>
  .table-view {
    position: relative;

    .edit-back {
      position: absolute;
      top: 20px;
      right: 40px;
      z-index: 1;
    }

    .add-button {
      position: absolute;
      top: 20px;
      right: 140px;
      z-index: 1;
    }
    .red {
      color: #D05949;
      button {
        color: #D05949;
      }
    }

    .green {
      button {
        color: #67C23A;
      }
    }
  }

</style>
