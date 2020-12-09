<template>
    <div class="page-main">
        <div class="head-row">
            <div class="title-row">
                文档库
            </div>
            <div class="back-icon-title">
            </div>
        </div>
        <div class="table-view">
            <div class="tabs-row">
                <div class="table-view">

                    <el-form :model="formSearch" ref="toolbarForm" class="toolbar-wrap-form" style="display: flex">
                        <div class="search-row">
                            <el-radio-group style="padding-right: 20px" @change="changeRadioFn()" v-model="radio">
                                <el-radio label="1">搜索项目</el-radio>
                                <el-radio label="2">搜索文件</el-radio>
                            </el-radio-group>
                            <el-input v-model="searchName"
                                      style="width: 300px;padding-right: 10px"
                                      @keyup.native.enter="keySearch()"
                                      placeholder="搜索名称"/>
                            <div>
                                <el-button style="margin: 0" type="primary" @click.stop="keySearch(formSearch)">筛选
                                </el-button>
                                <el-button type="primary" @click="resetForm('toolbarForm')">重置</el-button>
                            </div>
                        </div>
                        <div v-if="showRouteRow && !isSearch" class="route-row">

                            <el-breadcrumb separator="/">
                                <el-breadcrumb-item :to="{ path: `/home/fileManage/1/10?type=main&value=all` }">目录
                                </el-breadcrumb-item>
                                <div v-for="v in routeArr">
                                    <div v-if="v.clickType===1">
                                        <el-breadcrumb-item
                                                :to="{ path: `/home/fileManage/1/10?type=${v.type}&value=${v.keyValue}` }">
                                            <span class="route-label"> {{v.keyValue}}</span>
                                            <span class="route-label-g">/</span>
                                        </el-breadcrumb-item>
                                    </div>
                                    <div v-else>
                                        <el-breadcrumb-item>
                                            <span class="route-label-b"> {{v.keyValue}}</span>
                                        </el-breadcrumb-item>
                                    </div>

                                </div>

                            </el-breadcrumb>
                        </div>
                        <div class="table-view-con" v-if="!isSearch">
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
                                <el-table-column prop="mainProjectName" min-width="250" label="名称">
                                    <template slot-scope="scope">
                                        <div style="display: flex;align-items: center">
                                            <i class="el-icon-folder" style="padding-right: 5px"/>
                                            <span v-if="FileType==='main'">
                      <el-button type="text" size="small"
                                 @click="handleSelect('sub',scope.row.keyName)">
                        <span>    {{scope.row.keyName || '--'}}</span>
                      </el-button>
                    </span>
                                            <span v-if="FileType==='sub'">
                      <el-button type="text" size="small"
                                 @click="handleSelect('subPro',scope.row.keyName)">
                        <span>    {{scope.row.keyName || '--'}}</span>
                      </el-button>
                    </span>
                                            <span v-if="FileType==='subPro'">
                      <el-button type="text" size="small"
                                 @click="handleSelect('subProInfo',scope.row.projectId,scope.row.projectName)">
                        <span>    {{scope.row.keyName || '--'}}</span>
                      </el-button>
                    </span>
                                            <span v-if="FileType==='subProInfo'">
                    <Attachment :files="[scope.row]"></Attachment>
                    </span>
                                        </div>


                                    </template>
                                </el-table-column>
                                <div v-if="FileType==='subProInfo'">
                                    <el-table-column prop="name_row1" width="120" label="来源">
                                        <template slot-scope="scope">
                                            {{scope.row.sysType === 2? 'OA系统': '自行上传'}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="id" width="100" label="操作">
                                        <template slot-scope="scope">
                                            <DownFile :fileData="scope.row"></DownFile>
                                        </template>
                                    </el-table-column>
                                </div>

                            </el-table>
                        </div>
                        <div class="table-view-con" v-if="isSearch">
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
                                <el-table-column prop="mainProjectName" min-width="250" label="名称">
                                    <template slot-scope="scope">
                                        <div style="display: flex;align-items: center">
                                            <i class="el-icon-folder" style="padding-right: 5px"/>
                                            <span v-if="radio==='1'">
                                                <span v-if="scope.row.keyName">
                                                    <el-button type="text" size="small"
                                                               @click="getDataSearch(scope.row.projectId)">
                                                    <span>    {{scope.row.keyName || '--'}}</span>
                                                    </el-button>
                                                </span>
                                                <span v-else>
                                                    <Attachment :files="[scope.row]"></Attachment>
                                                </span>

                                            </span>
                                            <span v-if="radio==='2'">
                                                <Attachment :files="[scope.row]"></Attachment>
                                            </span>
                                        </div>
                                    </template>
                                </el-table-column>
                                <div v-if="radio==='2'">
                                    <el-table-column prop="name_row1" width="120" label="来源">
                                        <template slot-scope="scope">
                                            {{scope.row.sysType === 2? 'OA系统': '自行上传'}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="id" width="100" label="操作">
                                        <template slot-scope="scope">
                                            <DownFile :fileData="scope.row"></DownFile>
                                        </template>
                                    </el-table-column>
                                </div>
                                <div v-else-if="apiText==='getProjectInfo'">
                                    <el-table-column prop="name_row1" width="120" label="来源">
                                        <template slot-scope="scope">
                                            {{scope.row.sysType === 2? 'OA系统': '自行上传'}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="id" width="100" label="操作">
                                        <template slot-scope="scope">
                                            <DownFile :fileData="scope.row"></DownFile>
                                        </template>
                                    </el-table-column>
                                </div>

                            </el-table>
                        </div>
                    </el-form>
                    <div v-if="radio==='1' && isSearch" class="table-footer">
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
  import Attachment from '../../components/Attachment';
  import apiConfig from '../../apiconfig'
  import DownFile from '../../components/DownFile'
  import Axios from "axios";

  export default {
    name: 'developManage',
    data() {
      return {
        dataListLoading: false,
        showRouteRow: true,
        isSearch: false,
        agencyUnit: '',
        searchName: '',
        apiText: '',
        FileType: 'main',
        radio: '1',
        dataList: [],
        routeArr: [],
        unitList: ww_FilterList.ResponsibleUnit,
        searchArr: [],
        searchArrAll: ww_FilterList.DepartmentNameArr,
        pageSizesCom: [10, 20, 50],
        currentPageCom: 1,
        pageSizeCom: 10,
        PageCountCom: 1,
        itemTotal: 0,
        proName: '',
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
          if (!this.isSearch) {
            this.getData();
          } else {
            this.getDataSearch()
          }
        }
      },
    },
    created() {
      this.restFormSearch = JSON.parse(JSON.stringify(this.formSearch));
      this.getData(1);
    },
    methods: {
      goShowFileFn(row) {
        let domin = apiConfig.resourcesDomain
        this.dataList[row.index].disabledDown = true
        this.dataList = JSON.parse(JSON.stringify(this.dataList));
        let url = `${domin}/download/${row.resourceId}`
        Axios.get(url, {
          responseType: 'blob'
        }).then((res) => {
          this.dataList[row.index].disabledDown = false
          const blob = res.data;
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onload = (e) => {
            const a = document.createElement('a');
            a.download = `${row.title}.${row.type}`;
            a.href = e.target.result;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          };
        }).catch((err) => {
          console.log(err);
          this.dataList[row.index].disabledDown = false
          this.$message({
            message: '下载失败',
            type: 'warning',
          });
        });
      },
      handleSelect(key, keyValue, Name) {
        if (Name) {
          this.proName = Name
        }
        this.$router.push({path: `/home/fileManage/1/10?type=${key}&value=${keyValue}`});
      },
      handleClick(tab, event) {
        this.resetForm('toolbarForm');
        this.getData();
      },
      handleSizeChange(val) {
        const query = this.$route.query;
        this.$router.push({
          name: this.routeData.name,
          params: {
            page: this.currentPageCom,
            count: val,
          },
          query: query
        });
      },
      handleCurrentChange(val) {
        const query = this.$route.query;
        this.$router.push({
          name: this.routeData.name,
          params: {
            page: val,
            count: this.pageSizeCom,
          },
          query: query
        });
      },
      changeRadioFn() {
        this.resetForm('toolbarForm')
      },
      keySearch() {
        if (this.routeData.params.page !== 1 && this.routeData.params.page !== '1') {
          this.$router.push({
            name: this.routeData.name,
            params: {
              page: 1,
              count: this.routeData.params.count,
            },
            query: this.routeData.query
          });
        } else {

          this.getDataSearch();
        }
      },
      getData(getType) {
        this.routeData = this.$route;
        const query = this.$route.query;
        if (!query.type || getType === 1) {
          this.dataList = this.unitList
          this.routeArr = []
          this.agencyUnit = ''
          this.formSearch = JSON.parse(JSON.stringify(this.restFormSearch));
          return
        }
        this.FileType = query.type
        if (query.type === 'main') {
          this.dataList = this.unitList
          this.routeArr = []
          return;
        } else if (query.type === 'sub') {
          this.agencyUnit = query.value
          this.dataList = this.searchArrAll[query.value]
          if (this.routeArr.length > 1) {
            this.routeArr = []
            this.routeArr.push({type: query.type, keyValue: query.value, clickType: 1})
          } else {
            this.routeArr.push({type: query.type, keyValue: query.value, clickType: 1})
          }
          return;
        } else if (query.type === 'subPro') {
          if (this.routeArr.length > 2) {
            const routeArr = []
            routeArr.push(this.routeArr[0])
            routeArr.push({type: query.type, keyValue: query.value, clickType: 1})
            this.routeArr = routeArr
          } else {
            this.routeArr.push({type: query.type, keyValue: query.value, clickType: 1})
          }
          this.formSearch.responsibilityDep = query.value
        } else if (query.type === 'subProInfo') {
          this.routeArr.push({type: query.type, keyValue: `${query.value} - ${this.proName}`})
          this.formSearch.projectId = query.value
        }

        this.dataListLoading = true;
        let formSearch = this.formSearch;
        let params = {...this.$route.params, ...formSearch};

        if (this.searchName.length > 0) {
          params.param = this.searchName;
        }
        if (!params.param) {
          delete params.param;
        }
        let apiText = 'getProjectInfo';
        if (this.FileType === 'subPro') {
          apiText = 'getProject';
        }
        Api[apiText](params).then(res => {
          if (res.code === 0) {
            if (res.response.datas) {
              if (apiText === 'getProject') {
                this.dataList = res.response.datas;
                this.dataList.map(item => {
                  item.keyName = `${item.projectId}  ${item.projectName}`;
                  return item;
                });
              }
              this.currentPageCom = res.response.page;
              this.pageSizeCom = res.response.count;
              this.PageCountCom = res.response.pageCount;
              this.itemTotal = res.response.countNumber;
            } else {
              if (apiText === 'getProjectInfo') {
                this.dataList = res.response.resourceList;

              } else {
                this.dataList = res.response.resourceList;
              }
              this.dataList = res.response.resourceList || []
              let count = 0
              this.dataList.map(item => {
                item.disabledDown = false
                item.index = count
                count = count + 1
                return item
              })
            }

          }
          this.dataListLoading = false;
        });
      },
      getDataSearch(projectName) {
        this.routeData = this.$route;

        let params = {...this.$route.params};

        if (this.searchName.length > 0) {
          params.param = this.searchName;
        } else {
          return
        }
        this.dataListLoading = true;
        this.isSearch = true
        if (!params.param) {
          delete params.param;
        }
        let apiText = 'getProjectInfo';
        if (this.radio === '1') {
          if (typeof (projectName) === 'undefined' || !projectName) {
            apiText = 'getProject';
          } else {
            apiText = 'getProjectInfo';
            params = {
              projectId: projectName
            }
          }

        } else if (this.radio === '2') {
          apiText = 'getSearchProject';
        }
        Api[apiText](params).then(res => {
          if (res.code === 0) {
            if (res.response.datas) {
              if (apiText === 'getProject') {
                this.dataList = res.response.datas;
                this.dataList.map(item => {
                  item.keyName = `${item.projectId}  ${item.projectName}`;
                  return item;
                });
              }
              this.currentPageCom = res.response.page;
              this.pageSizeCom = res.response.count;
              this.PageCountCom = res.response.pageCount;
              this.itemTotal = res.response.countNumber;
            } else {
              if (apiText === 'getProjectInfo') {

                this.dataList = res.response.resourceList;
              } else {
                this.dataList = res.response;
              }
            }
            this.apiText = apiText

          }
          this.dataListLoading = false;
        });
      },
      resetForm(formName) {
        this.urlQuery = {};
        this.$refs[formName].resetFields();
        this.formSearch = Object.assign({}, this.restFormSearch);
        this.searchName = '';
        this.dataList = this.unitList
        this.isSearch = false
        this.routeArr = []
        // if (this.routeData.params.page === '1' || this.routeData.params.page === 1) {
        //   this.getData();
        // } else {
        if (this.routeData.query.type !== 'main') {
          this.$router.push({
            name: this.routeData.name,
            params: {
              page: 1,
              count: this.routeData.params.count,
            },
            query: {
              type: 'main',
              value: 'all'
            }
          });
        }

        // }
      },
    },
    components: {
      Attachment,
      DownFile,
    },
  };
</script>

<style lang="less" scoped>


    .search-row {
        align-items: center;
    }

    .back-icon-title {
        top: 84px !important;
    }

    .route-row {
        padding: 20px 20px 10px;
        color: #606266;
        font-weight: bold;

        .route-label {
            font-weight: bold;
            color: #606266;
            cursor: pointer;
        }

        .route-label-b {
            color: #606266;
        }

        .route-label-g {
            font-weight: bold;
            padding: 0 10px;
            font-size: 18px;
            color: #C0C4CC
        }
    }

</style>
