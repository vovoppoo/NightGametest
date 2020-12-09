<template>
    <div class="page-main">
        <div class="head-row">
            <div class="title-row">
                日志管理
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
                                <el-form-item class="tool-item" prop="timeArr">
                                    <el-date-picker
                                            v-model="formSearch.timeArr"
                                            type="daterange"
                                            range-separator="至"
                                            start-placeholder="开始日期"
                                            end-placeholder="结束日期">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item class="tool-item" prop="opRoles">
                                    <el-select v-model="formSearch.opRoles" clearable placeholder="操作用户类型">
                                        <el-option v-for="item in opRolesArr" :key="item.id" :label="item.keyName"
                                                   :value="item.keyValue"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item class="tool-item" prop="logType">
                                    <el-select v-model="formSearch.logType" clearable placeholder="操作类型">
                                        <el-option v-for="item in logTypeArr" :key="item.id" :label="item.keyName"
                                                   :value="item.keyValue"></el-option>
                                    </el-select>
                                </el-form-item>

                                <div>
                                    <el-button style="margin: 0" type="primary" @click.stop="keySearch(formSearch)">筛选
                                    </el-button>
                                    <el-button type="primary" @click="resetForm('toolbarForm')">重置</el-button>
                                </div>
                            </div>
                        </div>
                        <div class="table-view-con">
                            <el-table
                                    v-loading="dataListLoading"
                                    :data="dataList"
                                    row-key="id"
                                    style="width: 100%"
                                    :header-cell-class-name="'table-head-class'"
                                    border
                                    class="no-border"
                            >
                                <el-table-column prop="gmtCreate" width="150" label="操作时间">
                                    <template slot-scope="scope">
                                        <span>    {{dateFormat(scope.row.gmtCreate) || '--'}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="operationName" width="120" label="操作人名称">
                                    <template slot-scope="scope">
                                        <span>    {{scope.row.operationName || '--'}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="opRoles" width="120" label="操作人类别">
                                    <template slot-scope="scope">
                                        <span>    {{scope.row.opRoles===1?'用户':'系统'}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="logType" width="100" label="操作类型">
                                    <template slot-scope="scope">
                                        <span>    {{logTypeFr(scope.row.logType)}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="content" min-width="200" label="操作内容">
                                    <template slot-scope="scope">
                                        <span>    {{scope.row.content || '--'}}</span>
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
  import {dateFormat, logTypeFr} from '../../filter';

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
        opRolesArr: [{
          keyName: '用户',
          keyValue: 1,
        }, {
          keyName: '系统',
          keyValue: 2,
        }],
        logTypeArr: [{
          keyName: '更新数据',
          keyValue: 1,
        }, {
          keyName: '增加数据',
          keyValue: 2,
        }, {
          keyName: '删除数据',
          keyValue: 3,
        }],
        formSearch: {
          timeArr: [],
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
      logTypeFr,
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
        console.log(this.routeData.params, 'this.routeData.params.')
        if (this.routeData.params.page !== '1') {
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
        let params = {...this.$route.params, ...formSearch};

        if (params.timeArr.length > 0) {
          params.startDate = `${dateFormat(params.timeArr[0], 'YYYY-MM-DD')} 00:00:00`;
          params.endDate = `${dateFormat(params.timeArr[1], 'YYYY-MM-DD')} 00:00:00`;
          delete params.timeArr;
        }

        // if (this.searchName.length > 0) {
        //   params.param = this.searchName;
        // }
        if (!params.param) {
          delete params.param;
        }
        let apiText = 'getJournalList';

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

    .back-icon-title {
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
