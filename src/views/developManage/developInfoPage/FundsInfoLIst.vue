<template>
  <div class="page-main" style="overflow: auto">
    <div class="head-row">
      <div class="title-row">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/home/developManage/1/10?type=second' }">数据统计</el-breadcrumb-item>
          <el-breadcrumb-item>三公经费明细</el-breadcrumb-item>
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
              <el-form-item class="tool-item" prop="agencyUnit">
                <el-select v-model="formSearch.agencyUnit" placeholder="机关单位">
                  <el-option v-for="item in unitData" :key="item.theValue" :label="item.label"
                             :value="item.label"/>
                </el-select>
              </el-form-item>
              <el-form-item class="tool-item" prop="expenseType">
                <el-select v-model="formSearch.expenseType" placeholder="费用类型">
                  <el-option v-for="item in expenseTypeData" :key="item.keyValue" :label="item.keyName"
                             :value="item.keyName"/>
                </el-select>
              </el-form-item>
              <!--              <el-input v-model="searchName"-->
              <!--                        style="width: 300px;padding-right: 10px"-->
              <!--                        @keyup.native.enter="getData()"-->
              <!--                        placeholder="搜索名称"/>-->
              <div>
                <el-button style="margin: 0" type="primary" @click.stop="keySearch(formSearch)">筛选
                </el-button>
                <el-button type="primary" @click="resetForm('toolbarForm')">重置</el-button>
              </div>
              <!--              <div class="add-button">-->
              <!--                <el-button type="primary" @click.stop="goAddFn('ss','add')">添加实施项目-->
              <!--                </el-button>-->
              <!--              </div>-->
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
                <el-table-column prop="expenseType" width="100" label="费用类型">
                  <template slot-scope="scope">
                    <span>    {{scope.row.expenseType || '--'}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="year" width="160" label="日期">
                  <template slot-scope="scope">
                    <span>    {{ dateFormat(scope.row.recordDate,'YYYY-MM-DD') || '--'}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="detail" min-width="350" label="名称">
                  <template slot-scope="scope">
                    <span>    {{scope.row.detail}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="visitorsNumber" min-width="250" label="责任人/出国名单">
                  <template slot-scope="scope">
                    <span>    {{scope.row.visitorsNumber}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="visitorsPayMoney" width="150" label="参会缴纳费用">
                  <template slot-scope="scope">
                    <span>    {{scope.row.visitorsPayMoney}}</span>
                  </template>
                </el-table-column>


                <el-table-column prop="money" width="150" label="经费">
                  <template slot-scope="scope">
                    <span>    {{scope.row.money}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="remarks" min-width="150" label="备注">
                  <template slot-scope="scope">
                    <div v-if="role===2">
                      <span>    {{scope.row.remarks || '未填写'}}</span>
                    </div>
                    <div v-else>
                      <el-button type="text" size="small"
                                 @click="showAddFn(scope.row)">
                        <span>    {{scope.row.remarks || '未填写'}}</span>
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
      </div>

    </div>
    <add-funds-info-modal ref="addFundsInfoModal"></add-funds-info-modal>

  </div>
</template>

<script>
  import Api from '../../../api';
  import addFundsInfoModal from '../addPage/addFundsInfoModal';
  import { dateFormat } from '../../../filter/index';
  export default {
    name: 'developManage',
    data() {
      return {
        dataListLoading: false,
        agencyUnit: '',
        searchName: '',
        role: '',
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
        expenseTypeData: window.ww_FilterList.ExpenseType,
        searchArr: [],
        searchArrAll: {
          1: [
            {
              label: '业务处',
              theValue: 1,
            }, {
              label: '减灾处',
              theValue: 2,
            }, {
              label: '办公室',
              theValue: 3,
            }, {
              label: '规划发展处',
              theValue: 4,
            }, {
              label: '预报处',
              theValue: 5,
            },
          ],
          2: [
            {
              label: '天文观测部',
              theValue: 1,
            }, {
              label: '气候研究部',
              theValue: 2,
            }, {
              label: '气候观测部',
              theValue: 3,
            }, {
              label: '综合部',
              theValue: 4,
            }, {
              label: '设施管理部',
              theValue: 5,
            },
          ],
          3: [
            {
              label: '气象服务部',
              theValue: 1,
            }, {
              label: '综合部',
              theValue: 2,
            }, {
              label: '防雷服务部',
              theValue: 3,
            },
          ],
          4: [
            {
              label: '综合管理部',
              theValue: 1,
            },
          ],
        },
        pageSizesCom: [10, 20, 50],
        currentPageCom: 1,
        pageSizeCom: 10,
        PageCountCom: 1,
        itemTotal: 0,
        routeData: {},
        formSearch: {
          param: '',
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
      let formSearch = this.formSearch;
      this.routeData = this.$route;
      if (this.routeData.query.unit) {
        formSearch.agencyUnit = this.routeData.query.unit;
      }
      if (this.routeData.query.type && this.routeData.query.type !== 'jg') {
        formSearch.expenseType = this.routeData.query.type;
      }
      this.formSearch = JSON.parse(JSON.stringify(this.formSearch));
      this.getData();
    },
    methods: {
      dateFormat,
      backFn() {
        this.$router.go(-1);
      },
      showAddFn(value) {
        const child = this.$refs.addFundsInfoModal;
        child.formLabelData = JSON.parse(JSON.stringify(child.backupForm));
        child.ctrlDialog = true;
        child.titleText = `修改三公经费明细-备注`;

        if (value !== 'add') {
          child.getDataInfo(value);
          child.type = 'update';
        } else {
          child.type = value;
        }

        this.$Bus.$once('addFundsInfoModelData', (s) => {
          if (s === 0) {
            this.getData();
          }
        });
        child.ctrlDialog = true;
      },
      goAddFn(e, id) {
        if (e === 'ss') {
          this.$router.push({ path: `/home/addImplementationInfo/${id}` });
        } else if (e === 'ys') {
          this.$router.push({ path: `/home/addBudgetInfo/${id}` });
        } else if (e === 'editYS') {
          this.$router.push({ path: `/home/budgetInfo/${id}` });
        } else if (e === 'editSS') {
          this.$router.push({ path: `/home/implementationInfo/${id}` });
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

        // if (this.searchName.length > 0) {
        //   params.param = this.searchName;
        // }
        if (!params.param) {
          delete params.param;
        }

        let apiText = 'getFinanceFundsSub';

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
      addFundsInfoModal,
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
  }

</style>
