<template>
    <div class="page-main" style="overflow: auto">
        <div class="head-row">
            <div class="title-row">
                项目管理
            </div>
            <div class="back-icon-title">
            </div>
        </div>

        <div class="nav-menu-row">
            <div v-if="role!==5">
                <el-menu :default-active="activeIndex"
                         background-color="#FFEEDA" class="el-menu-ww-item" mode="horizontal"
                         @select="handleSelect">
                    <el-menu-item index="1">全部</el-menu-item>
                    <el-menu-item index="2">深圳市气象局</el-menu-item>
                    <el-menu-item index="3">深圳市国家气候观象台</el-menu-item>
                    <el-menu-item index="4">深圳市气象服务中心</el-menu-item>
                    <el-menu-item index="5">粤港澳大湾区气象监测预警预报中心</el-menu-item>
                </el-menu>
            </div>
            <div v-if="role===5">
                <el-menu :default-active="activeIndex"
                         background-color="#FFEEDA" class="el-menu-ww-item" mode="horizontal"
                         @select="handleSelect">
                    <el-menu-item v-if="activeIndex=='1'" index="1">全部</el-menu-item>
                    <el-menu-item v-if="activeIndex=='2'" index="2">深圳市气象局</el-menu-item>
                    <el-menu-item v-if="activeIndex=='3'" index="3">深圳市国家气候观象台</el-menu-item>
                    <el-menu-item v-if="activeIndex=='4'" index="4">深圳市气象服务中心</el-menu-item>
                    <el-menu-item v-if="activeIndex=='5'" index="5">粤港澳大湾区气象监测预警预报中心</el-menu-item>
                </el-menu>
            </div>

            <div class="menu-search-item">
                <div style="display: flex">
                    <el-input v-model="searchName"
                              @keyup.native.enter="getData()"
                              placeholder="搜索项目名/责任人"/>
                    <el-button style="margin: 0" type="primary" @click.stop="keySearch()">搜索
                    </el-button>
                </div>
            </div>
        </div>
        <div class="tabs-row">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="项目实施情况" name="first">
                    <div class="statistics-row" v-loading="dataListLoading">
                        <div class="statistics-view">
                            <div class="title-min">
                                项目状态统计
                            </div>
                            <div class="back-icon"></div>
                            <div class="statistics-con" :class="{'show-flex':show}">
                                <div class="con-item">
                                    <div class="number">
                                        {{statisticsData.COMPLETIONPERCENTAGE || 0}}
                                        <div class="company">%</div>
                                    </div>
                                    <div class="label">
                                        资金支付率
                                    </div>

                                </div>
                                <div class="con-item">
                                    <div class="number">
                                        {{statisticsData.PROJECTCOUNT}}
                                        <div class="company">个</div>
                                    </div>
                                    <div class="label">
                                        项目总数
                                    </div>

                                </div>
                                <div class="con-item ">
                                    <div class="number yellow" :class="thisHover=='wqd'? 'this-hover' : ''">
                                        <el-button type="text"
                                                   @click="goSearchFn('wqd',1)"> {{statisticsData.UNSTARTCOUNT}}
                                        </el-button>
                                        <div class="company">个</div>
                                    </div>
                                    <div class="label ">
                                        未启动
                                    </div>

                                </div>
                                <div class="con-item">
                                    <div class="number">
                                        {{statisticsData.ONGOINGCOUNT || 0}}
                                        <div class="company">个</div>
                                    </div>
                                    <div class="label">
                                        已启动
                                    </div>

                                </div>
                                <div class="con-item">
                                    <div class="number green" :class="thisHover=='ywc'? 'this-hover' : ''">
                                        <el-button type="text"
                                                   @click="goSearchFn('ywc',7)">
                                            {{statisticsData.COMPLETEDCOUNT || 0}}
                                        </el-button>
                                        <div class="company">个</div>
                                    </div>
                                    <div class="label">
                                        已完成
                                    </div>

                                </div>

                                <div class="con-item">
                                    <div class="number red" :class="thisHover=='yq'? 'this-hover' : ''">
                                        <el-button type="text"
                                                   @click="goSearchFn('yq',1)">
                                            {{statisticsData.ISPAYOVERDUE || 0}}
                                        </el-button>
                                        <div class="company">个</div>
                                    </div>
                                    <div class="label">
                                        项目逾期
                                    </div>

                                </div>
                            </div>
                        </div>
                        <!--            <div class="statistics-view">-->
                        <!--              <div class="title-min">-->
                        <!--                项目逾期统计-->
                        <!--              </div>-->
                        <!--              <div class="statistics-con">-->
                        <!--                <div class="con-item">-->
                        <!--                  <div class="number red">-->
                        <!--                    {{statisticsData.ISPAYOVERDUE}}-->
                        <!--                    <div class="company ">个</div>-->
                        <!--                  </div>-->
                        <!--                  <div class="label">-->
                        <!--                    进度逾期-->
                        <!--                  </div>-->
                        <!--                </div>-->
                        <!--                <div class="con-item">-->
                        <!--                  <div class="number red">-->
                        <!--                    {{statisticsData.ISPAYOVERDUE}}-->
                        <!--                    <div class="company ">个</div>-->
                        <!--                  </div>-->
                        <!--                  <div class="label">-->
                        <!--                    支付逾期-->
                        <!--                  </div>-->
                        <!--                </div>-->
                        <!--              </div>-->
                        <!--            </div>-->
                    </div>
                    <div class="table-view">
                        <el-form :model="formSearch" ref="toolbarForm" class="toolbar-wrap-form" style="display: flex">
                            <div class="search-row">
<!--                                <div v-if="role==3">-->
<!--                                    <el-form-item class="tool-item" prop="responsible">-->
<!--                                        <el-select style="width: 150px" v-model="formSearch.isResponsible"-->
<!--                                                   placeholder="与我相关">-->
<!--                                            <el-option v-for="item in userArr" :key="item.keyValue"-->
<!--                                                       :label="item.keyName"-->
<!--                                                       :value="item.keyValue"></el-option>-->
<!--                                        </el-select>-->
<!--                                    </el-form-item>-->
<!--                                </div>-->
                                <el-form-item class="tool-item" prop="year">
                                    <el-date-picker
                                            style="width: 150px !important"
                                            v-model="formSearch.year"
                                            type="year"
                                            row-key="projectId"
                                            placeholder="年">
                                    </el-date-picker>
                                </el-form-item>
                                <div v-if="agencyUnit!==''">
                                    <el-form-item class="tool-item" prop="responsibilityDep">
                                        <el-select style="width: 150px" v-model="formSearch.responsibilityDep"
                                                   placeholder="责任处室">
                                            <el-option v-for="item in searchArr" :key="item.id" :label="item.keyName"
                                                       :value="item.keyName"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                                <el-form-item class="tool-item" prop="projectStatus">
                                    <el-select clearable style="width: 150px" v-model="formSearch.projectStatus"
                                               placeholder="项目状态">
                                        <el-option v-for="item in projectStateArr" :key="item.keyValue"
                                                   :label="item.keyName"
                                                   :value="item.keyValue"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item class="tool-item" prop="procurementMethod">
                                    <el-select clearable style="width: 150px" v-model="formSearch.procurementMethod"
                                               placeholder="采购方式">
                                        <el-option v-for="item in purchaseArr" :key="item.keyValue"
                                                   :label="item.keyName"
                                                   :value="item.keyName"></el-option>
                                    </el-select>
                                </el-form-item>
                                <div>
                                    <el-form-item class="tool-item" prop="isCaiwuId">
                                        <el-select clearable style="width: 150px" v-model="formSearch.projectType"
                                                   placeholder="项目类别">
                                            <el-option v-for="item in projectTypeArr" :key="item.label"
                                                       :label="item.label"
                                                       :value="item.label"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                                <div v-if="role==1">
                                    <el-form-item class="tool-item" prop="isCaiwuId">
                                        <el-select clearable style="width: 150px" v-model="formSearch.isCaiwuId"
                                                   placeholder="关联财务系统">
                                            <el-option v-for="item in isCaiwuIdArr" :key="item.keyValue"
                                                       :label="item.keyName"
                                                       :value="item.keyValue"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                                <div v-if="role==1">
                                    <el-form-item class="tool-item" prop="isOaId">
                                        <el-select clearable style="width: 150px" v-model="formSearch.isOaId"
                                                   placeholder="关联内控系统">
                                            <el-option v-for="item in isOaIdArr" :key="item.keyValue"
                                                       :label="item.keyName"
                                                       :value="item.keyValue"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>


                                <div>
                                    <el-button style="margin: 0" type="primary" @click.stop="keySearch(formSearch)">筛选
                                    </el-button>
                                    <el-button type="primary" @click="resetForm('toolbarForm')">重置</el-button>
                                </div>
                                <div class="add-button">
                                    <el-button v-if="role !==2 || role!==4" type="primary"
                                               @click.stop="goAddFn('ss','add')">添加实施项目
                                    </el-button>
                                </div>
                            </div>
                            <div class="table-view-con">

                                <el-table
                                        id="SSTable"
                                        v-loading="dataListLoading"
                                        :data="dataList"
                                        row-key="id"
                                        style="width: 100%"
                                        :header-cell-class-name="'table-head-class'"
                                        border

                                        @sort-change="sortChangeFn"
                                >
                                    <el-table-column prop="projectName" sortable="custom"
                                                     min-width="250" label="项目名称">
                                        <template slot-scope="scope">
                                            <el-tooltip popper-class="hover-tis-main" effect="dark"
                                                        :content="scope.row.projectName"
                                                        placement="bottom-start">
                                                <div v-if="role===2">
                                                    <span>    {{scope.row.projectName || '--'}}</span>
                                                </div>
                                                <div v-else>
                                                    <el-button type="text" size="small"
                                                               @click="editOneParamFn('projectName',scope.row)">
                                                        <span>    {{scope.row.projectName || '--'}}</span>
                                                    </el-button>
                                                </div>
                                            </el-tooltip>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="projectStatus" width="100" label="项目状态">
                                        <template slot-scope="scope">

                                            <div v-if="role===2">
                                                <div v-if="scope.row.projectStatus=='7'" class="green">
                                                    <el-button type="text" size="small"
                                                               @click="editOneParamFn('projectStatus',scope.row)">
                                                        {{FilterList_show.ProjectStatus[scope.row.projectStatus]||
                                                        '--'}}
                                                    </el-button>
                                                </div>
                                                <div v-if="scope.row.projectStatus=='1'" class="red">
                                                    <el-button type="text" size="small"
                                                               @click="editOneParamFn('projectStatus',scope.row)">
                                                        {{FilterList_show.ProjectStatus[scope.row.projectStatus]||
                                                        '--'}}
                                                    </el-button>
                                                </div>
                                                <div v-if="scope.row.projectStatus!='1' && scope.row.projectStatus!='7'">
                                                    <el-button type="text" size="small"
                                                               @click="editOneParamFn('projectStatus',scope.row)">
                                                        {{FilterList_show.ProjectStatus[scope.row.projectStatus]||
                                                        '--'}}
                                                    </el-button>
                                                </div>
                                            </div>
                                            <div v-else>
                                                <div v-if="scope.row.projectStatus=='7'" class="green">
                                                    <el-button type="text" size="small"
                                                               @click="editOneParamFn('projectStatus',scope.row)">
                                                        {{FilterList_show.ProjectStatus[scope.row.projectStatus]||
                                                        '--'}}
                                                    </el-button>
                                                </div>
                                                <div v-if="scope.row.projectStatus=='1'" class="red">
                                                    <el-button type="text" size="small"
                                                               @click="editOneParamFn('projectStatus',scope.row)">
                                                        {{FilterList_show.ProjectStatus[scope.row.projectStatus]||
                                                        '--'}}
                                                    </el-button>
                                                </div>
                                                <div v-if="scope.row.projectStatus!='1' && scope.row.projectStatus!='7'">
                                                    <el-button type="text" size="small"
                                                               @click="editOneParamFn('projectStatus',scope.row)">
                                                        {{FilterList_show.ProjectStatus[scope.row.projectStatus]||
                                                        '--'}}
                                                    </el-button>
                                                </div>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="responsibilityDep" width="120" label="责任处室">
                                        <template slot-scope="scope">
                                            <span>    {{scope.row.responsibilityDep || '--'}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="year" width="60" label="年份">
                                        <template slot-scope="scope">
                                            <div v-if="role===2">
                                                <span>    {{scope.row.year}}</span>
                                            </div>
                                            <div v-else>
                                                <el-button type="text" size="small"
                                                           @click="editOneParamFn('year',scope.row)">
                                                    <span>    {{scope.row.year}}</span>
                                                </el-button>
                                            </div>
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="responsible"
                                                     sortable="custom"
                                                     width="100" label="责任人">
                                        <template slot-scope="scope">
                                            <div v-if="role===2">
                                                <span>    {{scope.row.responsible || '--'}}</span>
                                            </div>
                                            <div v-else>
                                                <el-button type="text" size="small"
                                                           @click="editOneParamFn('responsible',scope.row)">
                                                    <span>    {{scope.row.responsible || '--'}}</span>

                                                </el-button>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="isPayOverdue" width="90" label="是否逾期">
                                        <template slot-scope="scope">
                                            <div v-if="role===2">
                       <span v-if="scope.row.isPayOverdue==1"
                             class="red">    {{scope.row.isPayOverdue==1?'是':'否' }}</span>
                                                <span v-else>    {{scope.row.isPayOverdue==1?'是':'否' }}</span>
                                            </div>
                                            <div v-else>
                                                <el-button type="text" size="small"
                                                           @click="editOneParamFn('isPayOverdue',scope.row)">
                     <span v-if="scope.row.isPayOverdue==1"
                           class="red">    {{scope.row.isPayOverdue==1?'是':'否' }}</span>
                                                    <span v-else>    {{scope.row.isPayOverdue==1?'是':'否' }}</span>
                                                </el-button>
                                            </div>
                                        </template>
                                    </el-table-column>


                                    <el-table-column prop="budgetMoney"
                                                     sortable="custom"
                                                     width="120" label="项目预算金额(万元)">
                                        <template slot-scope="scope">
                                            <div v-if="role===2">
                                                <span>    {{moneyFormat(scope.row.budgetMoney) || '--'}}</span>
                                            </div>
                                            <div v-else>
                                                <el-button type="text" size="small"
                                                           @click="editOneParamFn('budgetMoney',scope.row)">
                                                    <span>    {{moneyFormat(scope.row.budgetMoney) || '--'}}</span>
                                                </el-button>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="currentYearPayment"
                                                     sortable="custom"
                                                     width="120" label="本年支付金额(万元)">
                                        <template slot-scope="scope">
                                            <div v-if="role===2">
                                                <span>    {{moneyFormat(scope.row.currentYearPayment) || '--'}}</span>
                                            </div>
                                            <div v-else>
                                                <el-button type="text" size="small"
                                                           @click="editOneParamFn('currentYearPayment',scope.row)">
                                                    <span>    {{moneyFormat(scope.row.currentYearPayment) || '--'}}</span>
                                                </el-button>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="paidMoney"
                                                     sortable="custom"
                                                     width="110" label="已支付金额(万元)">
                                        <template slot-scope="scope">
                                            <div v-if="role===2">
                                                <span>    {{moneyFormat(scope.row.paidMoney) || '--'}}</span>
                                            </div>
                                            <div v-else>
                                                <el-button type="text" size="small"
                                                           @click="editOneParamFn('paidMoney',scope.row)">
                                                    <span>    {{moneyFormat(scope.row.paidMoney) || '--'}}</span>
                                                </el-button>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="bidMoney"
                                                     sortable="custom"
                                                     width="90" label="合同金额(万元)">
                                        <template slot-scope="scope">
                                            <div v-if="role===2 ">
                                                <span>    {{moneyFormat(scope.row.bidMoney) || '--'}}</span>
                                            </div>
                                            <div v-else>
                                                <el-button type="text" size="small"
                                                           @click="editOneParamFn('bidMoney',scope.row)">
                                                    <span>    {{moneyFormat(scope.row.bidMoney) || '--'}}</span>
                                                </el-button>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="startTime" width="120" label="合同开始时间">
                                        <template slot-scope="scope">
                                            <div v-if="role===2">
                                                <span>    {{scope.row.startTime || '--'}}</span>
                                            </div>
                                            <div v-else>
                                                <el-button type="text" size="small"
                                                           @click="editOneParamFn('startTime',scope.row)">
                                                    <span>    {{scope.row.startTime || '--'}}</span>
                                                </el-button>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="endTime" width="120" label="合同结束时间">
                                        <template slot-scope="scope">
                                            <div v-if="role===2">
                                                <span>    {{scope.row.endTime || '--'}}</span>
                                            </div>
                                            <div v-else>
                                                <el-button type="text" size="small"
                                                           @click="editOneParamFn('endTime',scope.row)">
                                                    <span>    {{scope.row.endTime || '--'}}</span>
                                                </el-button>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="procurementMethod" width="90" label="采购方式">
                                        <template slot-scope="scope">
                                            <div v-if="role===2">
                                                <span>    {{scope.row.procurementMethod || '--'}}</span>
                                            </div>
                                            <div v-else>
                                                <el-button type="text" size="small"
                                                           @click="editOneParamFn('procurementMethod',scope.row)">
                        <span>    {{FilterList_show.PurchaseMethod[scope.row.procurementMethod ]||
                          (scope.row.procurementMethod || '--')}}</span>
                                                </el-button>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="id" fixed="right" width="100" label="操作">
                                        <template slot-scope="scope">
                                            <el-button type="text" size="small"
                                                       @click="goAddFn('editSS',scope.row.projectId)">查看
                                            </el-button>
                                            <el-button v-if="role==1" type="text" class="red" size="small"
                                                       @click="showDeleteFn('SS',scope.row)">删除
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
                <el-tab-pane label="项目预算" name="second">
                    <div class="statistics-row" v-loading="dataListLoading">
                        <div class="statistics-view" v-if="!dataListLoading">
                            <div class="title-min">
                                项目统计
                            </div>
                            <div class="back-icon"></div>
                            <div class="statistics-con" :class="{'show-flex':show}">
                                <div class="con-item">
                                    <div class="number">
                                        {{statisticsData.PROJECT_COUNT || 0}}
                                        <div class="company">个</div>
                                    </div>
                                    <div class="label">
                                        项目总数
                                    </div>

                                </div>
                                <div class="con-item">
                                    <div class="number">
                                        {{moneyFormat(statisticsData.BUDGET_MONEY) || '0'}}
                                        <div class="company" style="width: 35px;">万元</div>
                                    </div>
                                    <div class="label">
                                        项目预算总金额
                                    </div>

                                </div>
                                <div class="con-item">
                                    <div class="number">
                                        {{moneyFormat(statisticsData.PAID_MONEY) || 0}}
                                        <div class="company" style="width: 35px;">万元</div>
                                    </div>
                                    <div class="label">
                                        累计已支付金额
                                    </div>

                                </div>
                                <div class="con-item">
                                    <div class="number">
                                        {{statisticsData.PAY_PERCENTAGE || 0}}
                                        <div class="company">%</div>
                                    </div>
                                    <div class="label">
                                        累计已支付百分比
                                    </div>

                                </div>
                                <div class="con-item">
                                    <div class="number ">
                                        {{statisticsData.IS_IMPORTANT_PERFORMANCE || 0}}
                                        <div class="company">个</div>
                                    </div>
                                    <div class="label">
                                        重点绩效
                                    </div>
                                </div>
                                <div class="con-item">
                                    <div class="number">
                                        {{statisticsData.IS_GOV_PURCHASE || 0}}
                                        <div class="company">个</div>
                                    </div>
                                    <div class="label">
                                        政府采购
                                    </div>
                                </div>
                                <div class="con-item">
                                    <div class="number">
                                        {{statisticsData.IS_INDEPENDENT_CONTRACT || 0}}
                                        <div class="company">个</div>
                                    </div>
                                    <div class="label">
                                        独立合同
                                    </div>
                                </div>
                                <div class="con-item">
                                    <div class="number">
                                        {{statisticsData.IS_NEW_YEAR || 0}}
                                        <div class="company">个</div>
                                    </div>
                                    <div class="label">
                                        跨年项目
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="table-view">
                        <el-form :model="formSearch" ref="toolbarForm" class="toolbar-wrap-form" style="display: flex">
                            <div class="search-row">
<!--                                <div v-if="role==3">-->
<!--                                    <el-form-item class="tool-item" prop="responsible">-->
<!--                                        <el-select style="width: 150px" v-model="formSearch.isResponsible"-->
<!--                                                   placeholder="与我相关">-->
<!--                                            <el-option v-for="item in userArr" :key="item.keyName" :label="item.keyName"-->
<!--                                                       :value="item.keyName"></el-option>-->
<!--                                        </el-select>-->
<!--                                    </el-form-item>-->
<!--                                </div>-->
                                <el-form-item class="tool-item" prop="year">
                                    <el-date-picker
                                            style="width: 150px !important"
                                            v-model="formSearch.year"
                                            type="year"
                                            placeholder="年">
                                    </el-date-picker>
                                </el-form-item>
                                <div v-if="agencyUnit!==''">
                                    <el-form-item class="tool-item" prop="responsibilityDep">
                                        <el-select style="width: 150px" v-model="formSearch.responsibilityDep"
                                                   placeholder="责任处室">
                                            <el-option v-for="item in searchArr" :key="item.id" :label="item.keyName"
                                                       :value="item.keyName"/>
                                        </el-select>
                                    </el-form-item>
                                </div>
                                <el-form-item class="tool-item" prop="businessType">
                                    <el-select style="width: 150px" v-model="formSearch.businessType"
                                               placeholder="业务类型">
                                        <el-option v-for="item in typeSearchArr" :key="item.id" :label="item.keyName"
                                                   :value="item.keyName"/>
                                    </el-select>
                                </el-form-item>
                                <div v-if="role==1">
                                    <el-form-item class="tool-item" prop="responsible">
                                        <el-select clearable style="width: 150px" v-model="formSearch.isCaiwuId"
                                                   placeholder="关联内控系统">
                                            <el-option v-for="item in isOaIdArr" :key="item.keyValue"
                                                       :label="item.keyName"
                                                       :value="item.keyValue"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>

                                <div>
                                    <el-button style="margin: 0" type="primary" @click.stop="keySearch(formSearch)">筛选
                                    </el-button>
                                    <el-button type="primary" @click="resetForm('toolbarForm')">重置</el-button>
                                </div>
                                <div class="add-button">
                                    <el-button v-if="role !==2" type="primary" @click.stop="goAddFn('ys','add')">添加预算项目
                                    </el-button>
                                </div>
                            </div>
                            <div class="table-view-con">

                                <el-table
                                        id="YSTable"
                                        v-loading="dataListLoading"
                                        :data="dataList"
                                        style="width: 100%"
                                        border
                                        row-key="id"
                                        :header-cell-class-name="'table-head-class'"
                                        @sort-change="sortChangeFn"
                                        :tree-props="{children: 'childProjectList', hasChildren: 'hasChildren'}">
                                    <el-table-column prop="mainProjectName"
                                                     sortable="custom"
                                                     min-width="250" label="项目名称">
                                        <template slot-scope="scope">
                      <span v-if="scope.row.dataType === 'sub'">
                         {{scope.row.mainProjectName ||  '--'}}
                      </span>
                                            <span v-else>
                        <span style="font-weight: bold">
                          <el-tag style="margin-right: 5px; background-color: #FD903E; line-height: 28px;height: 28px"
                                  v-if="scope.row.childProjectList[0]"
                                  effect="dark"
                                  type="warning">{{scope.row.childProjectList.length}}</el-tag>
                          {{scope.row.mainProjectName}}</span>
                      </span>
                                        </template>
                                    </el-table-column>
                                    <!--                  <el-table-column prop="mainProjectName" min-width="250" label="项目名称">-->
                                    <!--                    <template slot-scope="scope">-->
                                    <!--                      <span>    {{scope.row.projectName || '&#45;&#45;'}}</span>-->
                                    <!--                    </template>-->
                                    <!--                  </el-table-column>-->

                                    <el-table-column prop="agencyUnit" min-width="250" label="责任单位">
                                        <template slot-scope="scope">
                                            <span>    {{scope.row.agencyUnit}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="responsibilityDep" min-width="150" label="责任处室">
                                        <template slot-scope="scope">
                                            <span>    {{scope.row.responsibilityDep}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="responsible" sortable="custom" min-width="120" label="责任人">
                                        <template slot-scope="scope">
                                            <span>    {{scope.row.responsible}}</span>
                                        </template>
                                    </el-table-column>
                                    <!--                  <el-table-column prop="year" width="100" label="年份">-->
                                    <!--                    <template slot-scope="scope">-->
                                    <!--                      <span>    {{scope.row.year}}</span>-->
                                    <!--                    </template>-->
                                    <!--                  </el-table-column>-->

                                    <el-table-column prop="budgetMoney" sortable="custom" width="135"
                                                     label="项目预算总金额(万元)">
                                        <template slot-scope="scope">
                                            <span>    {{moneyFormat(scope.row.budgetMoney)}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="currentYearPayment" sortable="custom" width="120"
                                                     label="本年支付金额(万元)">
                                        <template slot-scope="scope">
                                            <span>    {{moneyFormat(scope.row.currentYearPayment)}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="newYearPayment" sortable="custom" width="130"
                                                     label="跨年支付金额(万元)">
                                        <template slot-scope="scope">
                                            <span>    {{moneyFormat(scope.row.newYearPayment) }}</span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column fixed="right" prop="id" width="100" label="操作">
                                        <template slot-scope="scope">
                       <span v-if="scope.row.dataType !== 'sub'">
                      <el-button type="text" size="small"
                                 @click="goAddFn('editYS',scope.row.mainProjectId)">查看
                      </el-button>
                         <el-button v-if="role==1" type="text" class="red" size="small"
                                    @click="showDeleteFn('YS',scope.row)">删除
                        </el-button>
                       </span>
                                            <span v-else>
                        <el-button type="text" size="small"
                                   @click="goAddFn('editSS',scope.row.projectId)"><span>查看</span>
                        </el-button>
                        <el-button v-if="role==1" type="text" class="red" size="small"
                                   @click="showDeleteFn('SS',scope.row)">删除
                        </el-button>
                      </span>
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
        <!--    <div id="scroll-z" class="scroll-bar-view">-->
        <!--      <div id="slider-z" class="slider-item" :style="autoHeight">-->

        <!--      </div>-->

        <!--    </div>-->
        <edit-table-row-info ref="editTableRowInfo"></edit-table-row-info>
        <edit-one-param ref="editOneParam"></edit-one-param>

    </div>

</template>

<script>
  import Api from '../../api';
  import editTableRowInfo from './addPage/editTableRowInfo';
  import editOneParam from './addPage/editOneParam';
  import {dateFormat, moneyFormat} from '../../filter';

  let windowHeight = parseInt(window.innerHeight)
  export default {
    name: 'projectManage',
    data() {
      return {
        windowHeight: windowHeight,
        autoHeight: {
          height: '',
          top: '',
          display: '',
        },
        activeIndex: '1',
        proportion: 1,
        difference: 0,
        autoHeightS: '',
        searchName: '',
        activeName: 'first',
        dataListLoading: false,
        show: true,
        editState: false,
        agencyUnit: '',
        tableHeight: 450,
        dataList: [],
        orderObj: {
          responsible: 'orderByResponsible',
          budgetMoney: 'orderByBudgetMoney',
          currentYearPayment: 'orderByCurrentYearPayment',
          paidMoney: 'orderByPaidMoney',
          bidMoney: 'orderByBidMoney',
          projectName: 'orderByProjectName',
          newYearPayment: 'orderByNewYearPayment',
          mainProjectName: 'orderByProjectName',
        },
        heightStringArr: {
          6: 450,
          12: 900,
          36: 2700,
          100: 9000,
        },

        thisHover: '',
        statisticsData: {
          COMPLETEDCOUNT: 0,
          COMPLETIONPERCENTAGE: 0,
          ISPAYOVERDUE: 0,
          ONGOINGCOUNT: 0,
          PROJECTCOUNT: 0,
          UNSTARTCOUNT: 0,
          BUDGET_MONEY: 0,
          CURRENT_YEAR_PAYMENT: 0,
          IS_GOV_PURCHASE: 0,
          IS_IMPORTANT_PERFORMANCE: 0,
          IS_INDEPENDENT_CONTRACT: 0,
          IS_NEW_YEAR: 0,
          PAID_MONEY: 0,
          PAY_PERCENTAGE: 0,
          PROJECT_COUNT: 0,
        },
        menuString: ['', '深圳市气象局', '深圳市国家气候观象台', '深圳市气象服务中心', '粤港澳大湾区气象监测预警预报中心'],
        pageSizesCom: [10, 20, 50, 100],
        currentPageCom: 1,
        pageSizeCom: 50,
        PageCountCom: 1,
        itemTotal: 0,
        routeData: {},
        order: {},
        formSearch: {
          year: new Date(),
          isResponsible: '全部',
        },
        role: '',
        searchArr: [],
        userArr: [{keyName: '我的项目', keyValue: ''}, {keyName: '全部', keyValue: '全部'}],
        isCaiwuIdArr: [{keyName: '关联财务系统', keyValue: 1}, {keyName: '未关联财务系统', keyValue: 0}],
        isOaIdArr: [{keyName: '关联内控系统', keyValue: 1}, {keyName: '未关联内控系统', keyValue: 0}],
        projectTypeArr: [
          {
            label: '项目支出',
            theValue: 1,
          }, {
            label: '政府投资项目',
            theValue: 2,
          }, {
            label: '专项支出',
            theValue: 3,
          }, {
            label: '基本支出',
            theValue: 4,
          },
        ],
        searchArrAll: ww_FilterList.DepartmentIdArr,
        typeSearchArr: ww_FilterList.BusinessType,
        projectStateArr: window.ww_FilterList.ProjectStatus,
        purchaseArr: window.ww_FilterList.PurchaseMethod,
      };
    },
    created() {
      this.role = JSON.parse(localStorage.getItem('ww_userData')).role;
      if (this.role == 3 || this.role == 4) {
        this.userArr[0].keyValue = JSON.parse(localStorage.getItem('ww_userData')).id
        this.formSearch.isResponsible = this.userArr[0].keyValue
      }


      this.restFormSearch = JSON.parse(JSON.stringify(this.formSearch));
      this.FilterList_show = window.ww_FilterList_show;
      let formSearch = this.formSearch;
      this.routeData = this.$route;
      if (this.routeData.query.agencyUnit) {
        for (let i = 0; i < this.menuString.length; i += 1) {

          if (this.routeData.query.agencyUnit === this.menuString[i]) {
            this.activeIndex = (i + 1).toString();
            this.agencyUnit = this.routeData.query.agencyUnit;
            this.searchArr = this.searchArrAll[i];
          }
        }
      }
      if (this.routeData.query.department) {
        formSearch.responsibilityDep = this.routeData.query.department;
      }

      this.formSearch = JSON.parse(JSON.stringify(formSearch));
      if (this.routeData.query.type) {
        this.activeName = JSON.parse(JSON.stringify(this.routeData.query.type));
      }
      if (JSON.parse(localStorage.getItem('tab_name'))) {
        this.activeName = JSON.parse(localStorage.getItem('tab_name'));
      }
      if (this.role === 5) {
        let unit = JSON.parse(localStorage.getItem('ww_userData')).agencyUnit;
        let conut = this.menuString.indexOf(unit)
        this.activeIndex = (conut + 1).toString()
        this.agencyUnit = unit;
        console.log(conut, 'conut')
      }
      this.getData();
      // window.addEventListener('resize', this.getHeight)

      // window.addEventListener('resize', this.getHeight)
      // this.getHeight()


    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      $route() {
        if (this.$route.name === this.routeData.name) {
          this.getData();
        }
      },
      dataList() {
        this.$nextTick(function () {
          // this.getHeight()
        })
      }

    },

    computed: {
      // 计算属性的 getter
      reversedHeight: function () {
        // `this` 指向 vm 实例

        if ((this.dataList.length + 1) * 80 > (document.body.clientHeight - 220)) {
          this.tableHeight = (document.body.clientHeight - 220)
        } else {
          if ((this.dataList.length + 1) * 80 < 600) {
            this.tableHeight = 400
          } else {
            this.tableHeight = (this.dataList.length + 1) * 80
          }
        }

        return this.tableHeight
      },

    },
    methods: {
      moneyFormat,
      getHeight() {
        let table__body = {};
        if (this.activeName === 'first') {
          table__body = document.querySelectorAll('.el-table__body-wrapper')[0];
        } else {
          table__body = document.querySelectorAll('.el-table__body-wrapper')[1];
        }
        windowHeight = parseInt(window.innerHeight)
        let thisKSHeight = windowHeight
        let thisAllHeight = thisKSHeight + table__body.scrollHeight - table__body.clientHeight

        let autoHeightS = (thisKSHeight / thisAllHeight) * windowHeight
        this.proportion = (thisAllHeight / (windowHeight - autoHeightS)).toFixed(0)
        if (thisAllHeight <= windowHeight + 204) {
          this.autoHeight.display = 'none';
        } else {
          this.autoHeight.display = '';
        }
        this.autoHeightS = autoHeightS
        this.autoHeight.height = autoHeightS + 'px';
      },
      setScroll(type) {
        return
        let table__body = {};
        if (this.activeName === 'first') {
          table__body = document.querySelectorAll('.el-table__body-wrapper')[0];
        } else {
          table__body = document.querySelectorAll('.el-table__body-wrapper')[1];
        }
        let _home = document.querySelector('.home');
        let thisKSHeight = windowHeight
        let thisAllHeight = thisKSHeight + table__body.scrollHeight + this.autoHeightS - table__body.clientHeight

        let autoHeightS = (((_home.scrollTop) / thisAllHeight) * 100).toFixed(2)
        if (type === 2) {
          autoHeightS =
            (((_home.scrollTop + table__body.scrollTop) / thisAllHeight) * 100).toFixed(2)
        }

        // console.log(_home.scrollTop, '_home.scrollTop')
        // console.log(autoHeightS, 'autoHeightS')
        if (autoHeightS >= 70) {
          autoHeightS = 70
        }
        this.autoHeight.top = autoHeightS + '%';
      },
      goAddFn(e, id) {

        if (e === 'ss') {
          this.$router.push({path: `/home/addImplementationInfo/${id}`});
        } else if (e === 'ys') {
          this.$router.push({path: `/home/addBudgetInfo/${id}`});
        } else if (e === 'editYS') {
          this.$router.push({path: `/home/budgetInfo/${id}`});
        } else if (e === 'editSS') {
          this.$router.push({path: `/home/implementationInfo/${id}`});
        }
      },
      goSearchFn(type, value) {
        this.thisHover = type
        if (type !== 'yq') {
          this.formSearch = Object.assign({}, this.restFormSearch);
          this.formSearch.projectStatus = value.toString()
        } else {
          this.formSearch = Object.assign({}, this.restFormSearch);
          this.formSearch.isPayOverdue = value.toString()
        }

        this.getData()

      },
      showDeleteFn(type, row) {

        let apiText = 'deleteYSDate'
        let param = {
          mainProjectId: row.mainProjectId,
        };
        let tisString = `此操作将永久删除该预算项目:${row.mainProjectName},并且同时删除预算项目下的实施项目, 是否继续?`
        if (type === 'SS') {
          apiText = 'deleteSSDate'
          param = {
            projectId: row.projectId,
          };
          tisString = `此操作将永久删除该实施项目:${row.projectName}, 是否继续?`
        }
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
      editOneParamFn(param, value) {

        if (this.role === 3) {
          if (value.responsibleId !== this.formSearch.isResponsible) {
            this.$message({
              type: 'warning',
              message: '您不是这个项目的负责人！'
            });
            return
          }
        }
        const child = this.$refs.editOneParam;
        child.formLabelData = JSON.parse(JSON.stringify(child.backupForm));
        child.ctrlDialog = true;
        child.titleText = `编辑`;
        child.param = param;
        child.getDataInfo(value.projectId);
        child.type = 'update';
        this.$Bus.$once('editOneParamData', (s) => {
          if (s === 0) {
            this.getData();
          }
        });
        child.ctrlDialog = true;
      },
      showEditFn(value) {
        const child = this.$refs.editTableRowInfo;
        child.formLabelData = JSON.parse(JSON.stringify(child.backupForm));
        child.ctrlDialog = true;
        child.titleText = `${value.projectName} - 编辑实施信息`;
        child.getDataInfo(value.projectId);
        child.type = 'update';
        this.$Bus.$once('editTableRowInfoData', (s) => {
          if (s === 0) {
            this.getData();
          }
        });
        child.ctrlDialog = true;
      },
      handleSelect(key, keyPath) {
        if (this.menuString[key - 1].length > 0) {
          this.agencyUnit = this.menuString[key - 1];
          this.searchArr = this.searchArrAll[key - 1];
          this.resetForm('toolbarForm');
        } else {
          this.searchArr = [];
          this.agencyUnit = '';
        }
        this.activeIndex = key
        this.getData();
      },
      handleClick(tab, event) {
        localStorage.setItem('tab_name', JSON.stringify(tab.name));
        this.resetForm('toolbarForm');
        // this.getData();
      },
      handleSizeChange(val) {
        // this.heightString = this.heightStringArr[val]
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
        this.thisHover = ''
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
        this.InfoRoute = JSON.parse(localStorage.getItem('ww_InfoRoute')) || false;
        this.dataListLoading = true;
        this.routeData = this.$route;
        let formSearch = this.formSearch;
        if (formSearch.page) {
          delete formSearch.page
          delete formSearch.count
        }
        let params = {...this.$route.params, ...formSearch};
        if (this.agencyUnit.length > 0) {
          params.agencyUnit = this.agencyUnit;
        }

        if (this.searchName) {
          params.param = this.searchName;
        }
        if (!params.param) {
          delete params.param;
        }
        if (params.isResponsible === '全部' && this.role !== 4) {
          delete params.responsibleId;
        } else if (this.role === 3 || this.role === 4) {
          params.responsibleId = params.isResponsible
          delete params.isResponsible;
        }
        if (params.year) {
          params.year = dateFormat(params.year, 'YYYY');
        }

        if (this.order && this.order.order !== null && this.order.prop) {
          params[this.orderObj[this.order.prop]] = this.order.order === 'descending' ? 1 : 0
        }

        let apiText = 'getProject';
        if (this.activeName === 'second') {
          apiText = 'getMainProject';
        }
        if (JSON.parse(localStorage.getItem('ww_params')) && this.InfoRoute) {
          params = JSON.parse(localStorage.getItem('ww_params'))
          this.formSearch = params
          this.activeIndex = params.activeIndex
          this.agencyUnit = this.menuString[this.activeIndex - 1];
          this.searchArr = this.searchArrAll[this.activeIndex - 1];
          this.searchName = params.param
          this.thisHover = params.thisHover
          window.localStorage.setItem('ww_InfoRoute', JSON.stringify(false));
          this.InfoRoute = false
        }

        Api[apiText](params).then(res => {
          if (res.code === 0) {
            this.dataList = []
            params.activeIndex = this.activeIndex
            params.thisHover = this.thisHover
            window.localStorage.setItem('ww_params', JSON.stringify(params));
            if (apiText === 'getProject') {
              this.dataList = res.response.datas;
              this.dataList.map(item => {
                item.childProjectList = []
                return item
              })

              this.currentPageCom = res.response.page;
              this.pageSizeCom = res.response.count;
              this.PageCountCom = res.response.pageCount;
              this.itemTotal = res.response.countNumber;
              if (res.response.projectCount) {
                this.statisticsData = res.response.projectCount;
                if (this.statisticsData.COMPLETIONPERCENTAGE) {
                  this.statisticsData.COMPLETIONPERCENTAGE = (this.statisticsData.COMPLETIONPERCENTAGE * 100).toFixed(2)
                }
              } else {
                this.statisticsData = {
                  COMPLETEDCOUNT: 0,
                  COMPLETIONPERCENTAGE: 0,
                  ISPAYOVERDUE: 0,
                  ONGOINGCOUNT: 0,
                  PROJECTCOUNT: 0,
                  UNSTARTCOUNT: 0,
                };
              }
            }

            if (apiText === 'getMainProject') {
              this.dataList = res.response.datas;
              this.currentPageCom = res.response.page;
              this.pageSizeCom = res.response.count;
              this.PageCountCom = res.response.pageCount;
              this.itemTotal = res.response.countNumber;
              if (res.response.mainProjectCountJson) {
                this.statisticsData = res.response.mainProjectCountJson;
                if (this.statisticsData.PAY_PERCENTAGE) {
                  this.statisticsData.PAY_PERCENTAGE = (this.statisticsData.PAY_PERCENTAGE * 100).toFixed(2)
                }
                // this.statisticsData.PAID_MONEY = (this.statisticsData.PAID_MONEY / 1000)
                // this.statisticsData.BUDGET_MONEY = (this.statisticsData.BUDGET_MONEY / 1000)
              } else {
                this.statisticsData = {
                  BUDGET_MONEY: 0,
                  CURRENT_YEAR_PAYMENT: 0,
                  IS_GOV_PURCHASE: 0,
                  IS_IMPORTANT_PERFORMANCE: 0,
                  IS_INDEPENDENT_CONTRACT: 0,
                  IS_NEW_YEAR: 0,
                  PAID_MONEY: 0,
                  PAY_PERCENTAGE: 0,
                  PROJECT_COUNT: 0,
                };
              }
              this.dataList.map(item => {
                if (item.childProjectList.length > 0) {
                  for (let i = 0; i < item.childProjectList.length; i += 1) {
                    item.childProjectList[i].dataType = 'sub'
                    item.childProjectList[i].mainProjectName = item.childProjectList[i].projectName
                    item.childProjectList[i].id = item.childProjectList[i].id + 'sub'
                  }
                }
                return item
              })
            }
          }
          this.dataListLoading = false;

        });
      },
      resetForm(formName) {
        this.urlQuery = {};
        this.$refs[formName].resetFields();
        this.thisHover = ''
        this.order = {}
        this.formSearch = Object.assign({}, this.restFormSearch);
        window.localStorage.setItem('ww_InfoRoute', JSON.stringify(false));
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
      handleScroll() { //改变元素#searchBar的top值
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        let offsetTop = document.querySelector('.el-table__body-wrapper').offsetTop;
      },
      handle(delta) {
        if (delta < 0) {//向下滚动
          let _home = document.querySelector('.home');
          if (_home.scrollTop + _home.clientHeight == _home.scrollHeight) {
            let table__body = {};
            if (this.activeName === 'first') {
              table__body = document.querySelectorAll('.el-table__body-wrapper')[0];
            } else {
              table__body = document.querySelectorAll('.el-table__body-wrapper')[1];
            }
            if (table__body) {
              table__body.scrollTop += 100
              this.setScroll(2)
            }
          } else {
            this.setScroll(1)
          }

        } else {//向上滚动
          let table__body = {};
          if (this.activeName === 'first') {
            table__body = document.querySelectorAll('.el-table__body-wrapper')[0];
          } else {
            table__body = document.querySelectorAll('.el-table__body-wrapper')[1];
          }
          let _home = document.querySelector('.home');
          if (table__body) {
            if (table__body) {
              table__body.scrollTop -= 100;
            }
            if (table__body.scrollTop == 0) {
              _home.style.overflow = "auto";
              this.setScroll(1)//设置自定义滚动条
            } else {
              this.setScroll(2)//设置自定义滚动条
              _home.style.overflow = "hidden";
              _home.scrollTop = _home.scrollTop + _home.clientHeight
            }
          }

        }
      },
      sortChangeFn(column) {
        if (column.order == null) {
          this.order = {}
        } else {
          this.order = column
        }
        this.getData()
      },
      sliderOnmousedown() {
        let divs = document.getElementById('slider-z');
        let _this = this
        divs.onmousedown = function (ev) {

          //event的兼容性
          var ev = ev || event;

          //获取鼠标按下的坐标
          var x1 = ev.clientX;
          var y1 = ev.clientY;

          //获取元素的left，top值
          var l = divs.offsetLeft;
          var t = divs.offsetTop;

          //给可视区域添加鼠标的移动事件
          document.onmousemove = function (ev) {

            //event的兼容性
            var ev = ev || event;

            //获取鼠标移动时的坐标
            // var x2 = ev.clientX;
            var y2 = ev.clientY;

            //计算出鼠标的移动距离
            // var x = x2 - x1;
            var y = y2 - y1;

            //移动的数值与元素的left，top相加，得出元素的移动的距离
            var lt = y + t;
            // var ls = x + l;

            //更改元素的left，top值

            if (lt + divs.offsetHeight > (windowHeight - 60) || lt <= 0) {
            } else {
              divs.style.top = lt + 'px';
              let table__body = {}

              if (_this.activeName === 'first') {
                table__body = document.querySelectorAll('.el-table__body-wrapper')[0];
              } else {
                table__body = document.querySelectorAll('.el-table__body-wrapper')[1];
              }
              let _home = document.querySelector('.home');

              let thisDifference = y
              // let factor = Math.abs(thisDifference - _this.difference)
              let factor = thisDifference - _this.difference
              if (_home.scrollTop + _home.clientHeight == _home.scrollHeight) {
                table__body.scrollTop += factor * _this.proportion;
                if (table__body.scrollTop == 0) {
                  _home.scrollTop -= 1 * _this.proportion
                }
                _this.difference = y;
              } else {
                _home.scrollTop += factor * _this.proportion;
                _this.difference = y;
              }

            }
          }
          document.onmouseup = function (ev) {
            _this.difference = 0
            document.onmousemove = null;

          }
        }
      },
      wheel(event) {
        let delta = 0;
        if (!event) event = window.event;
        if (event.wheelDelta) {//IE、chrome浏览器使用的是wheelDelta，并且值为“正负120”
          delta = event.wheelDelta / 120;
          if (window.opera) delta = -delta;//因为IE、chrome等向下滚动是负值，FF是正值，为了处理一致性，在此取反处理
        } else if (event.detail) {//FF浏览器使用的是detail,其值为“正负3”
          delta = -event.detail / 3;
        }
        if (delta)
          this.handle(delta);
      }
    }
    ,
    components: {
      editTableRowInfo,
      editOneParam
    }
    ,
    mounted() {

      // window.addEventListener('scroll', this.handleScroll, true)
      // if (window.addEventListener)//FF,火狐浏览器会识别该方法 监听鼠标滚轮事件
      // window.addEventListener('DOMMouseScroll', this.wheel, true);
      // window.onmousewheel = document.onmousewheel = this.wheel;//W3C
      // this.sliderOnmousedown()
      // this.getHeight()
      // 注册事件 -- 防抖
      window.onresize = () => {

        if (document.body.clientWidth < 1440) {
          this.show = false
        } else {
          this.show = true
        }
      }
    }
    ,
    beforeDestroy() {
      // 事件注销
      // window.onresize = null
      // window.removeEventListener('scroll', this.handleScroll)
      // window.removeEventListener('DOMMouseScroll', this.wheel, true)
      // window.onmousewheel = null
    },
    destroyed() {
      // window.removeEventListener('resize', this.getHeight)
    }
    ,
  }
  ;
</script>

<style lang="less" scoped>

    .scroll-bar-view {
        position: fixed;
        right: 0;
        top: 60px;
        width: 18px;
        height: calc(100vh - 60px);
        background-color: #F0F0F0;
        z-index: 10;

        .slider-item {
            background-color: #CDCDCD;
            height: 0px;
            position: absolute;
            width: 18px;
            top: 0%;
            right: 0;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }
    }

    .page-main {
        /*background-color: #F2F0F0;*/
        overflow: visible;


        .head-row {
            font-size: 32px;
            display: flex;
            padding: 30px 40px 20px;
            position: relative;
        }


        .nav-menu-row {
            display: flex;
            padding-left: 40px;
            position: relative;

            .el-menu-ww-item {
                /*width: 100%;*/
                /*border-bottom: none;*/

                .el-menu-item {
                    font-size: 16px;
                    color: #585858;
                }

                .el-menu-item.is-active {
                    border-bottom: 2px solid #FE822B;
                    color: #323232;
                    font-weight: bold;
                }
            }

            .menu-search-item {
                position: absolute;
                right: 30px;
                top: 10px;
                width: 220px;
            }
        }

        .tabs-row {
            padding: 30px 40px 20px;


            .el-tabs.el-tabs--card.el-tabs--top {
                background-color: #F5F5F5;
            }


            .statistics-row {
                display: flex;
                background-color: white;
                margin-bottom: 20px;
                border: 2px solid #F5F5F5;
            }

            .statistics-view {
                display: flex;
                position: relative;
                padding: 20px;
                width: 100%;

                .title-min {
                    position: absolute;
                    top: 13px;
                    left: 36px;
                    padding-left: 7px;
                    font-size: 22px;
                    font-weight: bold;
                    z-index: 2;
                }

                .back-icon {
                    position: absolute;
                    top: 9px;
                    left: 33px;
                    border: 1px solid #FEC38D;
                    background-color: #FEC38D;
                    border-radius: 15px;
                    height: 20px;
                    width: 20px;
                    z-index: 1;
                }

                .statistics-con {
                    display: flex;
                    padding: 44px 0px 20px 10px;
                    width: 100%;

                    &.show-flex {
                        justify-content: space-between;
                    }

                    .con-item {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-direction: column;
                        padding-right: 10px;

                        .this-hover {
                            border: 1px solid #FE822B;
                            border-radius: 15px;
                        }

                        .number {
                            font-size: 34px;
                            font-weight: bold;
                            display: flex;
                            align-items: baseline;
                            padding: 0px 10px;

                            button {
                                font-size: 34px;
                                font-weight: bold;
                            }

                            .company {
                                font-size: 16px;
                                color: black;
                                width: 18px;
                            }
                        }

                        .red {
                            button {
                                color: #D05949;
                            }
                        }

                        .green {
                            button {
                                color: #67C23A;
                            }
                        }

                        .yellow {
                            button {
                                color: #eba86e;
                            }
                        }

                        .label {
                            padding-top: 4px;
                            font-size: 16px;
                        }

                    }
                }
            }

            .table-view {
                padding: 8px;
                background-color: white;
                border: 2px solid #F5F5F5;


                .el-form {
                    flex-direction: column;
                    position: relative;

                    .add-button {
                        position: absolute;
                        right: 20px;
                        top: 20px;
                    }
                }

                .row-edit-button button {
                    width: 20px;
                    height: 20px;
                    padding: 2px;
                    font-size: 12px;
                }

                .search-row {
                    display: flex;
                    padding: 20px 20px 0;
                }

                .table-view-con {
                    padding: 0 20px;
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
        }


    }


</style>
