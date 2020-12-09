<template>
  <div class="page-main">
    <div class="head-row">
      <div class="title-row">
        用户管理
      </div>
      <div class="back-icon-title">
      </div>
    </div>
    <div class="table-view">
      <div class="tabs-row">
        <div class="table-view">
          <el-form :model="formSearch" ref="toolbarForm" class="toolbar-wrap-form" style="display: flex">
            <div class="search-row">
              <div class="left-search">
                <el-form-item class="tool-item" prop="agencyUnit">
                  <el-select v-model="formSearch.agencyUnit" @change="changeUnitFn()" clearable placeholder="单位">
                    <el-option v-for="item in unitList" :key="item.id" :label="item.keyName"
                               :value="item.keyName"/>
                  </el-select>
                </el-form-item>
                <el-form-item class="tool-item" prop="responsibilityDep">
                  <el-select v-model="formSearch.responsibilityDep" clearable placeholder="责任处室(请先选单位)">
                    <el-option v-for="item in searchArr" :key="item.id" :label="item.keyName"
                               :value="item.keyName"/>
                  </el-select>
                </el-form-item>
                <el-form-item class="tool-item" prop="status">
                  <el-select v-model="formSearch.status" clearable placeholder="账号状态">
                    <el-option v-for="item in accountStatusArr" :key="item.keyValue" :label="item.keyName"
                               :value="item.keyValue.toString()"/>
                  </el-select>
                </el-form-item>
                <el-input v-model="searchName"
                          style="width: 300px;padding-right: 10px"
                          @keyup.native.enter="getData()"
                          placeholder="搜索名称"/>
                <div>

                  <el-button style="margin: 0" type="primary" @click.stop="keySearch(formSearch)">筛选
                  </el-button>
                </div>
                <div style="padding-left: 10px">
                  <el-button type="primary" @click="resetForm('toolbarForm')">重置</el-button>

                </div>

              </div>
              <div class="add-button">
                <el-button type="primary" @click.stop="goAddFn('add')">新增用户
                </el-button>
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
                <el-table-column prop="account" min-width="160" label="账号">
                  <template slot-scope="scope">
                    <span>    {{scope.row.account || '--'}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="name" min-width="120" label="姓名">
                  <template slot-scope="scope">
                    <span>    {{scope.row.name || '--'}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="agencyUnit" min-width="200" label="单位">
                  <template slot-scope="scope">
                    <span>    {{scope.row.agencyUnit || '--'}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="responsibilityDep" width="150" label="责任处室">
                  <template slot-scope="scope">
                    <span>    {{scope.row.responsibilityDep || '--'}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="phone" width="130" label="手机">
                  <template slot-scope="scope">
                    <span>    {{scope.row.phone || '--'}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="officePhone" width="150" label="办公电话">
                  <template slot-scope="scope">
                    <span>    {{scope.row.officePhone || '--'}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="email" min-width="250" label="电子邮箱">
                  <template slot-scope="scope">
                    <span>    {{scope.row.email || '--'}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="role" width="120" label="权限">
                  <template slot-scope="scope">
                    <span>    {{UserRightsShow[scope.row.role] || '--'}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="status" width="100" label="账号状态">
                  <template slot-scope="scope">
                    <span>    {{statusShow[scope.row.status] || '--'}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="id" width="100" label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" size="small"
                               @click="goAddFn(scope.row.id,scope.row)">编辑
                    </el-button>
                    <el-button style="color: #D05949"  type="text" class="red"  size="small"
                               @click="showDeleteFn(scope.row)">删除
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
      </div>
      <update-user-info ref="updateUserInfo"/>
    </div>
  </div>
</template>

<script>
  import Api from '../../api';
  import updateUserInfo from './updateUserInfo';

  export default {
    name: 'developManage',
    data() {
      return {
        dataListLoading: false,
        searchName: '',
        dataList: [],
        unitList: ww_FilterList.ResponsibleUnit,
        searchArr: [],
        accountStatusArr: ww_FilterList.UserStatus,
        UserRightsShow: ww_FilterList_show.UserRights,
        statusShow: ww_FilterList_show.UserStatus,
        searchArrAll: ww_FilterList.DepartmentNameArr,
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
      this.restFormSearch = JSON.parse(JSON.stringify(this.formSearch));
      this.FilterList_show = window.ww_FilterList_show;
      this.getData();
    },
    methods: {
      changeUnitFn() {
        let e = this.formSearch.agencyUnit;
        if (this.searchArrAll[e]) {
          this.searchArr = this.searchArrAll[e];
        }
      },
      showDeleteFn(row){
        let apiText = 'deleteUserInfo'
        let param = {
          id: row.id,
        };
        let tisString = `此操作将永久删除用户: ${row.name},是否继续?`
        this.$confirm(tisString, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          Api[apiText](param).then(res => {
            if (res.code === 0) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getData()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      goAddFn(value, row) {
        const child = this.$refs.updateUserInfo;
        child.formLabelData = JSON.parse(JSON.stringify(child.backupForm));
        child.ctrlDialog = true;
        child.searchArr = []
        if (value !== 'add') {
          child.titleText = `编辑用户`;
          child.getDataInfo(value, row);
          child.type = 'update';
          child.showPassword = false;
        } else {
          child.titleText = `新增用户`;
          child.type = value;
          child.showPassword = true;
        }

        this.$Bus.$once('updateUserInfoData', (s) => {
          if (s === 0) {
            this.getData();
          }
        });
        child.ctrlDialog = true;
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
        if (this.searchName.length > 0) {
          params.name = this.searchName;
        }
        if (!params.param) {
          delete params.param;
        }
        let apiText = 'getUserList';

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
      updateUserInfo,
    },
  };
</script>

<style lang="less" scoped>
  .back-icon-title {
    top: 84px !important;
  }

  .table-view {
    padding: 0 10px 0px 10px;
  }

  .search-row {
    justify-content: space-between;

    .left-search {
      display: flex;
    }
  }
</style>
