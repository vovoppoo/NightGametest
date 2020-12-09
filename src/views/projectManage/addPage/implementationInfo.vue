<template>
    <div class="page-main" style="overflow: auto">
        <div class="head-row">
            <div class="title-row">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/home/project/1/10?type=first' }">项目管理</el-breadcrumb-item>
                    <el-breadcrumb-item>
                        <div style="display: flex;  align-items: flex-start">
                            项目实施详情
                            <!--              <div style="padding-left: 10px;font-size: 15px">-->
                            <!--                <el-tag effect="dark" style="font-size: 15px" type="success">预算项目编号：{{formLabelData-->
                            <!--                  .mainProjectId}}-->
                            <!--                </el-tag>-->

                            <!--              </div>-->
                            <div style="padding-left: 10px;font-size: 15px" v-if="role===1">

                                <el-tooltip class="item" effect="light"
                                            content="绑定财务项目编号后,该项目与财务系统关联的数据项不可手动编辑;解绑财务项目编号后，方可手动编辑。"
                                            placement="bottom">
                                    <el-tag effect="dark" @click="changeCwFn('caiwuId',formLabelData.caiwuId)"
                                            style="font-size: 15px;cursor: pointer"
                                            type="warning">财务系统项目编号：{{formLabelData.caiwuId || '未绑定'}}
                                        <span v-if="!formLabelData.caiwuId"></span><i class="el-icon-info"></i>
                                    </el-tag>
                                </el-tooltip>
                                <div v-if="formLabelData.caiwuId" style="display: inline-block;padding:0 5px"> -</div>

                                <div style="display: inline-block" v-if="formLabelData.caiwuId">
                                    <el-tag
                                            style="display:flex;align-items: center; font-size: 15px;cursor: pointer"
                                            type="info">关联标记：
                                        <div
                                                style="color: #FDAF3E; height: 25px;">
                                            <img
                                                    style="width: 17px;height: 17px"
                                                    src="../../../assets/image/lock.png"
                                                    alt=""></div>
                                    </el-tag>
                                </div>


                            </div>
                            <div style="padding-left: 10px;font-size: 15px" v-if="role===1">

                                <el-tooltip class="item" effect="light" content="绑定OA系统项目编号后,该项目与OA系统项关联的文件将可以显示在项目文件中。"
                                            placement="bottom">
                                    <el-tag effect="dark" @click="changeCwFn('oaId',formLabelData.oaId)"
                                            style="font-size: 15px;cursor: pointer"
                                            type="Danger">OA系统项目编号：{{formLabelData.oaId || '未绑定'}}
                                        <span v-if="!formLabelData.oaId"></span><i class="el-icon-info"></i>
                                    </el-tag>
                                </el-tooltip>
                            </div>
                        </div>
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </div>
        <div class="info-view form-view">
            <div v-if="activeName === 'fourth'" class="edit-upload-button">
         <span v-if="role!==2">
        <el-button type="primary" @click="showUploadFn('add')">上传文件</el-button>
         </span>
            </div>
            <div v-if="!showEdit && activeName !== 'fourth'&& activeName !== 'projectJD'" class="edit-button">
        <span v-if="role!==2">
          <span v-if="role===3">
            <span v-if="renId===formLabelData.responsibleId">
              <el-button type="primary" @click="showEditFn(true)">编辑</el-button>
            </span>
          </span>
          <span v-else>
             <el-button type="primary" @click="showEditFn(true)">编辑</el-button>
          </span>
        </span>
            </div>
            <div v-if="showEdit && activeName !== 'fourth' && activeName !== 'projectJD'" class="edit-button">
                <el-button type="primary" @click="submitFn('DataForm')">提交</el-button>
            </div>
            <div class="edit-back">
                <el-button @click="backFn(true)">退后</el-button>
            </div>

            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="基本信息" name="first">
                    <div class="info-item-view">
                        <el-form
                                :model="formLabelData" label-position="right" :rules="rules" ref="DataForm"
                                label-width="160px">
                            <el-row :gutter="70">
                                <el-col :span="20">
                                    <el-col :span="16">
                                        <el-form-item label="预算项目名称:" prop="mainProjectName">
                                            <div v-if="showEdit">
                                                <div class="input-value gl ">
                                                    {{formLabelData.mainProjectName}}( {{formLabelData.mainProjectId}})
                                                </div>
                                            </div>
                                            <div class="input-value " v-else>
                                                {{formLabelData.mainProjectName}}( {{formLabelData.mainProjectId}})
                                            </div>
                                        </el-form-item>
                                    </el-col>
                                    <!--                  <el-col :span="8">-->
                                    <!--                    <el-form-item label="预算项目编号:" prop="mainProjectId">-->
                                    <!--                      <div v-if="showEdit">-->
                                    <!--                        <div class="input-value gl ">-->
                                    <!--                          {{formLabelData.mainProjectId}}-->
                                    <!--                        </div>-->
                                    <!--                      </div>-->
                                    <!--                      <div class="input-value " v-else>-->
                                    <!--                        {{formLabelData.mainProjectId}}-->
                                    <!--                      </div>-->
                                    <!--                    </el-form-item>-->
                                    <!--                  </el-col>-->
                                    <el-col :span="8">
                                        <el-form-item label="项目状态:" prop="projectStatus ">
                                            <div class="tis-left-r"></div>

                                            <div v-if="showEdit">
                                                <el-select v-model="formLabelData.projectStatus" placeholder="请选择项目状态">
                                                    <el-option v-for="item in projectStateArr" :label="item.keyName"
                                                               :key="item.keyValue"
                                                               :value="item.keyValue"/>
                                                </el-select>
                                            </div>
                                            <div class="input-value" v-else>
                                                {{FilterList_show.ProjectStatus[formLabelData.projectStatus]}}
                                            </div>
                                        </el-form-item>
                                    </el-col>
                                </el-col>
                                <el-col :span="20">
                                    <el-col :span="16">
                                        <el-form-item label="项目名称:" prop="projectName">
                                            <!--                         <div v-if="formLabelData.caiwuId" class="tis-left-y">
                                              <img src="../../../assets/image/lock.png" alt="">
                                            </div>-->

                                            <div v-if="showEdit">
                                                <el-input
                                                        placeholder="请输入项目名称"
                                                        v-model="formLabelData.projectName">
                                                </el-input>
                                            </div>
                                            <div class="input-value" v-else>
                                                {{formLabelData.projectName}}
                                            </div>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="8">
                                        <el-form-item label="项目编号:" prop="projectId">

                                            <div v-if="showEdit">
                                                <div class="input-value gl ">
                                                    {{formLabelData.projectId}}
                                                </div>
                                            </div>
                                            <div class="input-value " v-else>
                                                {{formLabelData.projectId}}
                                            </div>

                                        </el-form-item>
                                    </el-col>


                                </el-col>
                                <el-col :span="20">
                                    <el-col :span="8">
                                        <el-form-item label="责任单位:" prop="agencyUnit">

                                            <div v-if="showEdit">
                                                <el-select v-model="formLabelData.agencyUnit " @change="changeUnitFn"
                                                           placeholder="请选择责任单位">
                                                    <el-option v-for="item in unitData" :label="item.label"
                                                               :key="item.theValue"
                                                               :value="item.label"/>
                                                </el-select>
                                            </div>
                                            <div class="input-value" v-else>
                                                {{formLabelData.agencyUnit}}
                                            </div>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="8">
                                        <el-form-item label="责任处室:" prop="responsibilityDep">

                                            <div v-if="showEdit">
                                                <el-select :disabled="searchArr.length==0"
                                                           v-model="formLabelData.responsibilityDep"
                                                           @change="getUserListFn"
                                                           placeholder="请选择责任处室(先选责任单位)">
                                                    <el-option v-for="item in searchArr" :label="item.keyName"
                                                               :key="item.keyValue"
                                                               :value="item.keyName"/>
                                                </el-select>
                                            </div>
                                            <div class="input-value" v-else>
                                                {{formLabelData.responsibilityDep}}
                                            </div>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="责任人:" prop="responsible">

                                            <div v-if="showEdit">
                                                <el-select v-model="responsibleObj"
                                                           :disabled="userDataArr.length==0"
                                                           value-key="id"
                                                           @change="changeResponsibleFn(responsibleObj)"
                                                           placeholder="请选择责任人(先选责任处室)">
                                                    <el-option v-for="item in userDataArr" :key="item.id"
                                                               :label="item.name"
                                                               v-if="item.role!==4" :value="item"/>
                                                </el-select>
                                            </div>
                                            <div class="input-value" v-else>
                                                {{formLabelData.responsible}}
                                            </div>
                                        </el-form-item>
                                    </el-col>
                                </el-col>
                                <el-col :span="20">

                                    <el-col :span="8">
                                        <el-form-item label="资产状态:" prop="isAssetRegist">
                                            <div class="tis-left-r"></div>

                                            <div v-if="showEdit">
                                                <el-select v-model="formLabelData.isAssetRegist " placeholder="请选择资产状态">
                                                    <el-option v-for="item in initData" :label="item.keyName"
                                                               :key="item.keyValue"
                                                               :value="item.keyName"/>
                                                </el-select>
                                            </div>
                                            <div class="input-value" v-else>
                                                {{formLabelData.isAssetRegist}}
                                            </div>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="资产金额(万元):" prop="assetMoney">
                                            <div class="tis-left-r"></div>

                                            <div v-if="showEdit">
                                                <el-input
                                                        type="number"
                                                        min="0"
                                                        placeholder="请输入资产金额"
                                                        v-model="formLabelData.assetMoney">
                                                </el-input>
                                            </div>
                                            <div class="input-value" v-else>
                                                {{ moneyFormat(formLabelData.assetMoney,'set')}}
                                            </div>
                                        </el-form-item>
                                    </el-col>
                                    <!--                  <el-col :span="8">-->
                                    <!--                    <el-form-item label="财务系统项目编号:" prop="caiwuId">-->
                                    <!--                      <div v-if="showEdit">-->
                                    <!--                        <el-input-->
                                    <!--                          placeholder="请输入财务项目编号"-->
                                    <!--                          v-model="formLabelData.caiwuId">-->
                                    <!--                        </el-input>-->
                                    <!--                      </div>-->
                                    <!--                      <div class="input-value" v-else>-->
                                    <!--                        {{formLabelData.caiwuId}}-->
                                    <!--                      </div>-->
                                    <!--                    </el-form-item>-->
                                    <!--                  </el-col>-->


                                    <el-col :span="8">
                                        <el-form-item label="监理:" prop="supervision">
                                            <div v-if="showEdit">
                                                <el-select v-model="supervisionObj"
                                                           value-key="id"
                                                           @change="changeSupervisionFn(supervisionObj)"
                                                           placeholder="请选择监理">
                                                    <el-option v-for="item in userJLDataArr" :key="item.name"
                                                               :label="item.name"
                                                               :value="item"/>
                                                </el-select>
                                            </div>
                                            <div class="input-value" v-else>
                                                {{formLabelData.supervision}}
                                            </div>
                                        </el-form-item>
                                    </el-col>

                                    <!--                                    <el-col :span="8">-->
                                    <!--                                      <el-form-item label="内控项目编号:" prop="neikongId">-->
                                    <!--                                        <div v-if="showEdit">-->
                                    <!--                                          <el-input-->
                                    <!--                                            placeholder="请输入内控项目编号"-->
                                    <!--                                            v-model="formLabelData.neikongId">-->
                                    <!--                                          </el-input>-->
                                    <!--                                        </div>-->
                                    <!--                                        <div class="input-value" v-else>-->
                                    <!--                                          {{formLabelData.neikongId}}-->
                                    <!--                                        </div>-->
                                    <!--                                      </el-form-item>-->
                                    <!--                                    </el-col>-->
                                </el-col>
                                <el-col :span="20">
                                    <el-col :span="8">
                                        <el-form-item label="采购方式:" prop="procurementMethod">
                                            <div class="tis-left-r"></div>

                                            <div v-if="showEdit">
                                                <el-select v-model="formLabelData.procurementMethod"
                                                           placeholder="请选择采购方式">
                                                    <el-option v-for="item in purchaseArr" :label="item.keyName"
                                                               :key="item.keyValue"
                                                               :value="item.keyValue"/>
                                                </el-select>
                                            </div>
                                            <div class="input-value" v-else>
                                                {{FilterList_show.PurchaseMethod[formLabelData.procurementMethod]}}
                                            </div>
                                        </el-form-item>
                                    </el-col>
                                    <!--                  <el-col :span="8">-->
                                    <!--                    <el-form-item label="OA系统项目编号:" prop="oaId">-->
                                    <!--                      <div v-if="showEdit">-->
                                    <!--                        <el-input-->
                                    <!--                          placeholder="请输入OA项目编号"-->
                                    <!--                          v-model="formLabelData.oaId">-->
                                    <!--                        </el-input>-->
                                    <!--                      </div>-->
                                    <!--                      <div class="input-value" v-else>-->
                                    <!--                        {{formLabelData.oaId}}-->
                                    <!--                      </div>-->
                                    <!--                    </el-form-item>-->
                                    <!--                  </el-col>-->
                                    <el-col :span="8">
                                        <el-form-item label="项目进度:" prop="projectSchedule">
                                            <div v-if="showEdit">
                                                <el-select v-model="formLabelData.projectSchedule"
                                                           placeholder="请选择项目进度">
                                                    <el-option v-for="item in projectScheduleArr" :label="item.keyName"
                                                               :key="item.keyValue"
                                                               :value="item.keyValue"/>
                                                </el-select>
                                            </div>
                                            <div class="input-value" v-else>
                                                {{projectScheduleObj[formLabelData.projectSchedule]}}
                                            </div>
                                        </el-form-item>
                                    </el-col>
                                    <!--                  <el-col :span="8">-->
                                    <!--                    <el-form-item label="资产金额(万元):" prop="assetMoney">-->
                                    <!--                      <div class="tis-left-r"></div>-->

                                    <!--                      <div v-if="showEdit">-->
                                    <!--                        <el-input-->
                                    <!--                          type="number"-->
                                    <!--                          placeholder="请输入资产金额"-->
                                    <!--                          v-model="formLabelData.assetMoney">-->
                                    <!--                        </el-input>-->
                                    <!--                      </div>-->
                                    <!--                      <div class="input-value" v-else>-->
                                    <!--                        {{ moneyFormat(formLabelData.assetMoney,'set')}}-->
                                    <!--                      </div>-->
                                    <!--                    </el-form-item>-->
                                    <!--                  </el-col>-->
                                    <el-col :span="8">
                                        <el-form-item label="年份:" prop="year">

                                            <div v-if="showEdit">
                                                <el-date-picker
                                                        v-model="formLabelData.year"
                                                        type="year"
                                                        placeholder="选择年">
                                                </el-date-picker>
                                            </div>
                                            <div class="input-value" v-else>
                                                {{formLabelData.year}}
                                            </div>
                                        </el-form-item>
                                    </el-col>
                                </el-col>
                                <el-col :span="20">
                                    <el-col :span="8">
                                        <el-form-item label="是否已下达:" prop="isRelease">
                                            <div v-if="showEdit">
                                                <el-radio-group v-model="formLabelData.isRelease">
                                                    <el-radio :label="'1'">是</el-radio>
                                                    <el-radio :label="'0'">否</el-radio>
                                                </el-radio-group>
                                            </div>
                                            <div class="input-value" v-else>
                                                {{formLabelData.isRelease ==1?'是':'否'}}
                                            </div>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="是否项目逾期:" prop="isPayOverdue">
                                            <div v-if="showEdit">
                                                <el-radio-group v-model="formLabelData.isPayOverdue">
                                                    <el-radio :label="'1'">是</el-radio>
                                                    <el-radio :label="'0'">否</el-radio>
                                                </el-radio-group>
                                            </div>
                                            <div class="input-value" v-else>
                                                {{formLabelData.isPayOverdue =='1'?'是':'否'}}
                                            </div>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="是否纳入绩效考核:" prop="isAssess">
                                            <div v-if="showEdit">
                                                <el-radio-group v-model="formLabelData.isAssess">
                                                    <el-radio :label="1">是</el-radio>
                                                    <el-radio :label="0">否</el-radio>
                                                </el-radio-group>
                                            </div>
                                            <div class="input-value" v-else>
                                                {{formLabelData.isAssess=='1'?'是':'否' }}
                                            </div>
                                        </el-form-item>
                                    </el-col>

                                    <!--                  <el-col :span="8">-->
                                    <!--                    <el-form-item label="项目支付逾期:" prop="isPayOverdue">-->
                                    <!--                      <div v-if="showEdit">-->
                                    <!--                        <el-radio-group v-model="formLabelData.isPayOverdue ">-->
                                    <!--                          <el-radio :label="'是'">是</el-radio>-->
                                    <!--                          <el-radio :label="'否'">否</el-radio>-->
                                    <!--                        </el-radio-group>-->
                                    <!--                      </div>-->
                                    <!--                      <div class="input-value" v-else>-->
                                    <!--                        {{formLabelData.isPayOverdue}}-->
                                    <!--                      </div>-->
                                    <!--                    </el-form-item>-->
                                    <!--                  </el-col>-->

                                </el-col>
                                <el-col :span="20">

                                    <el-col :span="8">
                                        <el-form-item label="是否已启动:" prop="isStart">
                                            <div v-if="showEdit">
                                                <el-radio-group v-model="formLabelData.isStart">
                                                    <el-radio :label="'1'">是</el-radio>
                                                    <el-radio :label="'0'">否</el-radio>
                                                </el-radio-group>
                                            </div>
                                            <div class="input-value" v-else>
                                                {{formLabelData.isStart =='1'?'是':'否'}}
                                            </div>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="是否其他专项:" prop="isOtherResearch">
                                            <div v-if="showEdit">
                                                <el-radio-group v-model="formLabelData.isOtherResearch">
                                                    <el-radio :label="'1'">是</el-radio>
                                                    <el-radio :label="'0'">否</el-radio>
                                                </el-radio-group>
                                            </div>
                                            <div class="input-value" v-else>
                                                {{formLabelData.isOtherResearch =='1'?'是':'否'}}
                                            </div>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="项目类别:" prop="projectType">
                                            <!--                      <div v-if="formLabelData.caiwuId" class="tis-left-y">-->
                                            <!--                        <img src="../../../assets/image/lock.png" alt="">-->
                                            <!--                      </div>-->

                                            <div v-if="showEdit">
                                                <el-select v-model="formLabelData.projectType"

                                                           placeholder="请选择项目类别">
                                                    <el-option v-for="item in projectTypeArr" :label="item.label"
                                                               :key="item.theValue"
                                                               :value="item.label"/>
                                                </el-select>
                                            </div>
                                            <div class="input-value" v-else>
                                                {{formLabelData.projectType}}
                                            </div>
                                        </el-form-item>
                                    </el-col>
                                </el-col>
                                <el-col :span="20">
                                    <el-col :span="24">
                                        <el-form-item label="重要节点:" prop="importantNode">
                                            <div v-if="showEdit">
                                                <el-input
                                                        type="textarea"
                                                        :rows="5"
                                                        maxlength="2000"
                                                        placeholder="请输入内容"
                                                        v-model="formLabelData.importantNode ">
                                                </el-input>
                                            </div>
                                            <div class="input-value" v-else>
                                                {{formLabelData.projectOverview}}
                                            </div>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="24">
                                        <el-form-item label="绩效目标:" prop="performance">
                                            <div v-if="showEdit">
                                                <el-input
                                                        type="textarea"
                                                        :rows="5"
                                                        maxlength="2000"
                                                        placeholder="请输入内容"
                                                        v-model="formLabelData.performance ">
                                                </el-input>
                                            </div>
                                            <div class="input-value" v-else>
                                                {{formLabelData.performance}}
                                            </div>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="24">
                                        <el-form-item label="项目建设内容:" prop="constructionContent">
                                            <div v-if="showEdit">
                                                <el-input
                                                        type="textarea"
                                                        :rows="5"
                                                        maxlength="2000"
                                                        placeholder="请输入内容"
                                                        v-model="formLabelData.constructionContent ">
                                                </el-input>
                                            </div>
                                            <div class="input-value" v-else>
                                                {{formLabelData.constructionContent}}
                                            </div>
                                        </el-form-item>
                                    </el-col>
                                </el-col>
                            </el-row>
                        </el-form>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="项目预算" name="second">
                    <div class="info-item-view">
                        <el-form
                                :model="formLabelData" label-position="right" :rules="rules" ref="DataForm"
                                label-width="160px">
                            <el-row :gutter="70">
                                <el-col :span="20">
                                    <el-col :span="8">
                                        <el-form-item label="项目预算金额(万元):" prop="budgetMone">
                                            <div v-if="formLabelData.caiwuId" class="tis-left-y">
                                                <img src="../../../assets/image/lock.png" alt="">
                                            </div>
                                            <div v-if="showEdit">
                                                <el-input
                                                        type="number"
                                                        min="0"
                                                        :disabled="formLabelData.caiwuId"
                                                        placeholder="请输入项目预算金额"
                                                        v-model="formLabelData.budgetMone">
                                                </el-input>
                                            </div>
                                            <div class="input-value" v-else>
                                                {{moneyFormat (formLabelData.budgetMone,'set')}}
                                            </div>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="本年支付金额(万元):" prop="currentYearPayment">
                                            <!--                                            <div v-if="formLabelData.caiwuId" class="tis-left-y">-->
                                            <!--                                              <img src="../../../assets/image/lock.png" alt="">-->
                                            <!--                                            </div>-->

                                            <div v-if="showEdit">
                                                <el-input
                                                        type="number"
                                                        min="0"
                                                        placeholder="请输入本年支付金额"
                                                        v-model="formLabelData.currentYearPayment">
                                                </el-input>
                                            </div>
                                            <div class="input-value" v-else>
                                                {{moneyFormat(formLabelData.currentYearPayment,'set')}}
                                            </div>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="已支付金额(万元):" prop="paidMoney">
                                            <div v-if="formLabelData.caiwuId" class="tis-left-y">
                                                <img src="../../../assets/image/lock.png" alt="">
                                            </div>

                                            <div v-if="showEdit">
                                                <el-input
                                                        type="number"
                                                        min="0"
                                                        :disabled="formLabelData.caiwuId"
                                                        placeholder="请输入已支付金额"
                                                        v-model="formLabelData.paidMoney">
                                                </el-input>
                                            </div>
                                            <div class="input-value" v-else>
                                                {{moneyFormat(formLabelData.paidMoney,'set')}}
                                            </div>
                                        </el-form-item>
                                    </el-col>


                                </el-col>
                                <el-col :span="20">
                                    <el-col :span="8">
                                        <el-form-item label="最终预算(万元):" prop="lastBudget">
                                            <div v-if="formLabelData.caiwuId" class="tis-left-y">
                                                <img src="../../../assets/image/lock.png" alt="">
                                            </div>

                                            <div v-if="showEdit">
                                                <el-input
                                                        type="number"
                                                        min="0"
                                                        placeholder="请输入最终预算"
                                                        :disabled="formLabelData.caiwuId"
                                                        v-model="formLabelData.lastBudget">
                                                </el-input>
                                            </div>
                                            <div class="input-value" v-else>
                                                {{moneyFormat(formLabelData.lastBudget,'set')}}
                                            </div>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="未使用金额(万元):" prop="noUseMoney">
                                            <div v-if="formLabelData.caiwuId" class="tis-left-y">
                                                <img src="../../../assets/image/lock.png" alt="">
                                            </div>

                                            <div v-if="showEdit">
                                                <el-input
                                                        type="number"
                                                        min="0"
                                                        :disabled="formLabelData.caiwuId"
                                                        placeholder="请输入未使用金额"
                                                        v-model="formLabelData.noUseMoney">
                                                </el-input>
                                            </div>
                                            <div class="input-value" v-else>
                                                {{moneyFormat(formLabelData.noUseMoney,'set')}}
                                            </div>
                                        </el-form-item>
                                    </el-col>
                                    <!--                  <el-col :span="8">-->
                                    <!--                    <el-form-item label="调增金额(万元):" prop="increaseMoney">-->
                                    <!--                      <div v-if="formLabelData.caiwuId" class="tis-left-y">-->
                                    <!--                        <img src="../../../assets/image/lock.png" alt="">-->
                                    <!--                      </div>-->

                                    <!--                      <div v-if="showEdit">-->
                                    <!--                        <el-input-->
                                    <!--                          type="number"-->
                                    <!--                          min="0"-->
                                    <!--                          :disabled="formLabelData.caiwuId"-->
                                    <!--                          placeholder="请输入调增金额"-->
                                    <!--                          v-model="formLabelData.increaseMoney">-->
                                    <!--                        </el-input>-->
                                    <!--                      </div>-->
                                    <!--                      <div class="input-value" v-else>-->
                                    <!--                        {{moneyFormat(formLabelData.increaseMoney,'set')}}-->
                                    <!--                      </div>-->
                                    <!--                    </el-form-item>-->
                                    <!--                  </el-col>-->
                                    <!--                  <el-col :span="8">-->
                                    <!--                    <el-form-item label="调减金额(万元):" prop="reduceMoney">-->
                                    <!--                      <div v-if="formLabelData.caiwuId" class="tis-left-y">-->
                                    <!--                        <img src="../../../assets/image/lock.png" alt="">-->
                                    <!--                      </div>-->

                                    <!--                      <div v-if="showEdit">-->
                                    <!--                        <el-input-->
                                    <!--                          type="number"-->
                                    <!--                          min="0"-->
                                    <!--                          :disabled="formLabelData.caiwuId"-->
                                    <!--                          placeholder="请输入调减金额"-->
                                    <!--                          v-model="formLabelData.reduceMoney">-->
                                    <!--                        </el-input>-->
                                    <!--                      </div>-->
                                    <!--                      <div class="input-value" v-else>-->
                                    <!--                        {{moneyFormat(formLabelData.reduceMoney,'set')}}-->
                                    <!--                      </div>-->
                                    <!--                    </el-form-item>-->
                                    <!--                  </el-col>-->


                                </el-col>

                                <el-col :span="20">
                                    <el-col :span="24">
                                        <el-form-item label="年度计划支付(万元):" prop="remarks">
                                            <el-table
                                                    :data="tableData"
                                                    :show-header="false"
                                                    border
                                                    style="width: 100%">
                                                <el-table-column prop="name_row1" label="label">
                                                    <template slot-scope="scope">
                                                        <div class="table-head-c" v-if="scope.row.isShow">
                                                            {{scope.row.name_row1}}
                                                        </div>
                                                        <div v-else>
                                                            <div v-if="showEdit">
                                                                <el-input
                                                                        type="number"
                                                                        min="0"
                                                                        placeholder="请输入内容"
                                                                        v-model="formLabelData[scope.row.name_row1]">
                                                                </el-input>
                                                            </div>
                                                            <div class="input-value table-head-c" v-else>
                                                                {{moneyFormat(formLabelData[scope.row.name_row1],'set')}}
                                                            </div>
                                                        </div>
                                                    </template>
                                                </el-table-column>
                                                <el-table-column prop="name_row1" label="label">
                                                    <template slot-scope="scope">
                                                        <div class="table-head-c" v-if="scope.row.isShow">
                                                            {{scope.row.name_row2}}
                                                        </div>
                                                        <div v-else>
                                                            <div v-if="showEdit">
                                                                <el-input
                                                                        type="number"
                                                                        min="0"
                                                                        placeholder="请输入内容"
                                                                        v-model="formLabelData[scope.row.name_row2]">
                                                                </el-input>
                                                            </div>
                                                            <div class="input-value table-head-c" v-else>
                                                                {{moneyFormat(formLabelData[scope.row.name_row2],'set')}}
                                                            </div>
                                                        </div>
                                                    </template>
                                                </el-table-column>
                                                <el-table-column prop="name_row1" label="label">
                                                    <template slot-scope="scope">
                                                        <div class="table-head-c" v-if="scope.row.isShow">
                                                            {{scope.row.name_row3}}
                                                        </div>
                                                        <div v-else>
                                                            <div v-if="showEdit">
                                                                <el-input
                                                                        type="number"
                                                                        min="0"
                                                                        placeholder="请输入内容"
                                                                        v-model="formLabelData[scope.row.name_row3]">
                                                                </el-input>
                                                            </div>
                                                            <div class="input-value table-head-c" v-else>
                                                                {{moneyFormat(formLabelData[scope.row.name_row3],'set')}}
                                                            </div>
                                                        </div>
                                                    </template>
                                                </el-table-column>
                                                <el-table-column prop="name_row1" label="label">
                                                    <template slot-scope="scope">
                                                        <div class="table-head-c" v-if="scope.row.isShow">
                                                            {{scope.row.name_row4}}
                                                        </div>
                                                        <div v-else>
                                                            <div v-if="showEdit">
                                                                <el-input
                                                                        type="number"
                                                                        min="0"
                                                                        placeholder="请输入内容"
                                                                        v-model="formLabelData[scope.row.name_row4]">
                                                                </el-input>
                                                            </div>
                                                            <div class="input-value table-head-c" v-else>
                                                                {{moneyFormat(formLabelData[scope.row.name_row4],'set')}}
                                                            </div>
                                                        </div>
                                                    </template>
                                                </el-table-column>
                                                <el-table-column prop="name_row1" label="label">
                                                    <template slot-scope="scope">
                                                        <div class="table-head-c" v-if="scope.row.isShow">
                                                            {{scope.row.name_row5}}
                                                        </div>
                                                        <div v-else>
                                                            <div v-if="showEdit">
                                                                <el-input
                                                                        type="number"
                                                                        min="0"
                                                                        placeholder="请输入内容"
                                                                        v-model="formLabelData[scope.row.name_row5]">
                                                                </el-input>
                                                            </div>
                                                            <div class="input-value table-head-c" v-else>
                                                                {{moneyFormat(formLabelData[scope.row.name_row5],'set')}}
                                                            </div>
                                                        </div>
                                                    </template>
                                                </el-table-column>
                                                <el-table-column prop="name_row1" label="label">
                                                    <template slot-scope="scope">
                                                        <div class="table-head-c" v-if="scope.row.isShow">
                                                            {{scope.row.name_row6}}
                                                        </div>
                                                        <div v-else>
                                                            <div v-if="showEdit">
                                                                <el-input
                                                                        type="number"
                                                                        min="0"
                                                                        placeholder="请输入内容"
                                                                        v-model="formLabelData[scope.row.name_row6]">
                                                                </el-input>
                                                            </div>
                                                            <div class="input-value table-head-c" v-else>
                                                                {{moneyFormat(formLabelData[scope.row.name_row6],'set')}}
                                                            </div>
                                                        </div>
                                                    </template>
                                                </el-table-column>
                                                <el-table-column prop="name_row1" label="label">
                                                    <template slot-scope="scope">
                                                        <div class="table-head-c" v-if="scope.row.isShow">
                                                            {{scope.row.name_row7}}
                                                        </div>
                                                        <div v-else>
                                                            <div v-if="showEdit">
                                                                <el-input
                                                                        type="number"
                                                                        min="0"
                                                                        placeholder="请输入内容"
                                                                        v-model="formLabelData[scope.row.name_row7]">
                                                                </el-input>
                                                            </div>
                                                            <div class="input-value table-head-c" v-else>
                                                                {{moneyFormat(formLabelData[scope.row.name_row7],'set')}}
                                                            </div>
                                                        </div>
                                                    </template>
                                                </el-table-column>
                                                <el-table-column prop="name_row1" label="label">
                                                    <template slot-scope="scope">
                                                        <div class="table-head-c" v-if="scope.row.isShow">
                                                            {{scope.row.name_row8}}
                                                        </div>
                                                        <div v-else>
                                                            <div v-if="showEdit">
                                                                <el-input
                                                                        type="number"
                                                                        min="0"
                                                                        placeholder="请输入内容"
                                                                        v-model="formLabelData[scope.row.name_row8]">
                                                                </el-input>
                                                            </div>
                                                            <div class="input-value table-head-c" v-else>
                                                                {{moneyFormat(formLabelData[scope.row.name_row8],'set')}}
                                                            </div>
                                                        </div>
                                                    </template>
                                                </el-table-column>
                                                <el-table-column prop="name_row1" label="label">
                                                    <template slot-scope="scope">
                                                        <div class="table-head-c" v-if="scope.row.isShow">
                                                            {{scope.row.name_row9}}
                                                        </div>
                                                        <div v-else>
                                                            <div v-if="showEdit">
                                                                <el-input
                                                                        type="number"
                                                                        min="0"
                                                                        placeholder="请输入内容"
                                                                        v-model="formLabelData[scope.row.name_row9]">
                                                                </el-input>
                                                            </div>
                                                            <div class="input-value table-head-c" v-else>
                                                                {{moneyFormat(formLabelData[scope.row.name_row9],'set')}}
                                                            </div>
                                                        </div>
                                                    </template>
                                                </el-table-column>
                                                <el-table-column prop="name_row1" label="label">
                                                    <template slot-scope="scope">
                                                        <div class="table-head-c" v-if="scope.row.isShow">
                                                            {{scope.row.name_row10}}
                                                        </div>
                                                        <div v-else>
                                                            <div v-if="showEdit">
                                                                <el-input
                                                                        type="number"
                                                                        min="0"
                                                                        placeholder="请输入内容"
                                                                        v-model="formLabelData[scope.row.name_row10]">
                                                                </el-input>
                                                            </div>
                                                            <div class="input-value table-head-c" v-else>
                                                                {{moneyFormat(formLabelData[scope.row.name_row10],'set')}}
                                                            </div>
                                                        </div>
                                                    </template>
                                                </el-table-column>
                                                <el-table-column prop="name_row1" label="label">
                                                    <template slot-scope="scope">
                                                        <div class="table-head-c" v-if="scope.row.isShow">
                                                            {{scope.row.name_row11}}
                                                        </div>
                                                        <div v-else>
                                                            <div v-if="showEdit">
                                                                <el-input
                                                                        type="number"
                                                                        min="0"
                                                                        placeholder="请输入内容"
                                                                        v-model="formLabelData[scope.row.name_row11]">
                                                                </el-input>
                                                            </div>
                                                            <div class="input-value table-head-c" v-else>
                                                                {{moneyFormat(formLabelData[scope.row.name_row11],'set')}}
                                                            </div>
                                                        </div>
                                                    </template>
                                                </el-table-column>
                                                <el-table-column prop="name_row1" label="label">
                                                    <template slot-scope="scope">
                                                        <div class="table-head-c" v-if="scope.row.isShow">
                                                            {{scope.row.name_row12}}
                                                        </div>
                                                        <div v-else>
                                                            <div v-if="showEdit">
                                                                <el-input
                                                                        type="number"
                                                                        min="0"
                                                                        placeholder="请输入内容"
                                                                        v-model="formLabelData[scope.row.name_row12]">
                                                                </el-input>
                                                            </div>
                                                            <div class="input-value table-head-c" v-else>
                                                                {{moneyFormat(formLabelData[scope.row.name_row12],'set')}}
                                                            </div>
                                                        </div>
                                                    </template>
                                                </el-table-column>
                                            </el-table>
                                        </el-form-item>
                                    </el-col>
                                </el-col>
                            </el-row>
                        </el-form>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="合同信息" name="third">
                    <div class="info-item-view">
                        <el-form
                                :model="formLabelData" label-position="right" :rules="rules" ref="DataForm"
                                label-width="170px">
                            <el-row :gutter="70">
                                <el-col :span="20">
                                    <el-col :span="16">
                                        <el-form-item label="合同名称:" prop="contractName">
                                            <div v-if="showEdit">
                                                <el-input
                                                        placeholder="请输入合同名称"
                                                        v-model="formLabelData.contractName">
                                                </el-input>
                                            </div>
                                            <div class="input-value" v-else>
                                                {{formLabelData.contractName }}
                                            </div>
                                        </el-form-item>
                                    </el-col>


                                    <el-col :span="8">
                                        <el-form-item label="合同编号:" prop="contractCode">
                                            <div v-if="showEdit">
                                                <el-input
                                                        placeholder="请输入合同编号"
                                                        v-model="formLabelData.contractCode">
                                                </el-input>
                                            </div>
                                            <div class="input-value" v-else>
                                                {{formLabelData.contractCode}}
                                            </div>
                                        </el-form-item>
                                    </el-col>

                                </el-col>
                                <el-col :span="20">
                                    <el-col :span="8">
                                        <el-form-item label="合同金额(万元):" prop="bidMoney">
                                            <div v-if="showEdit">
                                                <el-input
                                                        type="number"
                                                        min="0"
                                                        placeholder="请输入合同金额"
                                                        v-model="formLabelData.bidMoney">
                                                </el-input>
                                            </div>
                                            <div class="input-value" v-else>
                                                {{moneyFormat(formLabelData.bidMoney,'set')}}
                                            </div>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="审计意见:" prop="meetingIdea">
                                            <div v-if="showEdit">
                                                <el-input
                                                        placeholder="请输入审计意见"
                                                        v-model="formLabelData.meetingIdea">
                                                </el-input>
                                            </div>
                                            <div class="input-value" v-else>
                                                {{formLabelData.meetingIdea}}
                                            </div>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="8">
                                        <el-form-item label="中标公司联系人:" prop="bidCompanyContact">
                                            <div v-if="showEdit">
                                                <el-input
                                                        placeholder="请输入中标公司联系人"
                                                        v-model="formLabelData.bidCompanyContact">
                                                </el-input>
                                            </div>
                                            <div class="input-value" v-else>
                                                {{formLabelData.bidCompanyContact}}
                                            </div>
                                        </el-form-item>
                                    </el-col>
                                </el-col>
                                <el-col :span="20">

                                    <el-col :span="8">
                                        <el-form-item label="合同开始时间:" prop="startTime">
                                            <div v-if="showEdit">
                                                <el-date-picker
                                                        v-model="formLabelData.startTime"
                                                        type="date"
                                                        placeholder="选择日期">
                                                </el-date-picker>
                                            </div>
                                            <div class="input-value" v-else>
                                                {{formLabelData.startTime}}
                                            </div>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="合同结束时间:" prop="endTime">
                                            <div v-if="showEdit">
                                                <el-date-picker
                                                        v-model="formLabelData.endTime"
                                                        type="date"
                                                        placeholder="选择日期">
                                                </el-date-picker>
                                            </div>
                                            <div class="input-value" v-else>
                                                {{formLabelData.endTime}}
                                            </div>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="验收日期:" prop="acceptanceDate">
                                            <div v-if="showEdit">
                                                <el-date-picker
                                                        v-model="formLabelData.acceptanceDate"
                                                        type="date"
                                                        placeholder="选择日期">
                                                </el-date-picker>
                                            </div>
                                            <div class="input-value" v-else>
                                                {{formLabelData.acceptanceDate}}
                                            </div>
                                        </el-form-item>
                                    </el-col>
                                </el-col>
                                <el-col :span="20">

                                    <el-col :span="8">
                                        <el-form-item label="审定会议文号:" prop="meetingNumber ">
                                            <div v-if="showEdit">
                                                <el-input
                                                        placeholder="请输入审定会议文号"
                                                        v-model="formLabelData.meetingNumber">
                                                </el-input>
                                            </div>
                                            <div class="input-value" v-else>
                                                {{formLabelData.meetingNumber }}
                                            </div>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="审计金额(万元):" prop="auditMoney">
                                            <div v-if="showEdit">
                                                <el-input
                                                        type="number"
                                                        min="0"
                                                        placeholder="请输入审计金额"
                                                        v-model="formLabelData.auditMoney">
                                                </el-input>
                                            </div>
                                            <div class="input-value" v-else>
                                                {{moneyFormat(formLabelData.auditMoney,'set')}}
                                            </div>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="承建单位:" prop="bidCompany">
                                            <div v-if="showEdit">
                                                <el-input
                                                        placeholder="请输入承建单位"
                                                        v-model="formLabelData.bidCompany">
                                                </el-input>
                                            </div>
                                            <div class="input-value" v-else>
                                                {{formLabelData.bidCompany}}
                                            </div>
                                        </el-form-item>
                                    </el-col>
                                </el-col>
                                <el-col :span="20">
                                    <el-col :span="24">
                                        <el-form-item label="合同约定资金支付方式:" prop="appointment">
                                            <div class="input-value">
                                                <el-button type="text" size="small"
                                                           @click="editOneParamFn('appointment',formLabelData)">
                                                    {{formLabelData.appointment || '未指定'}}
                                                </el-button>
                                            </div>
                                        </el-form-item>
                                    </el-col>


                                </el-col>
                                <el-col :span="20">

                                    <el-col :span="24">
                                        <el-form-item label="支付情况:" prop="payInfo">
                                            <div class="input-value">
                                                <el-button type="text" size="small"
                                                           @click="editOneParamFn('payInfo',formLabelData)">
                                                    {{formLabelData.payInfo || '未填写'}}
                                                </el-button>
                                            </div>
                                        </el-form-item>
                                    </el-col>

                                </el-col>
                                <el-col :span="20">
                                    <el-col :span="24">
                                        <el-form-item label="备注:" prop="remark">
                                            <div v-if="showEdit">
                                                <el-input
                                                        type="textarea"
                                                        :rows="5"
                                                        maxlength="2000"
                                                        placeholder="请输入内容"
                                                        v-model="formLabelData.remark">
                                                </el-input>
                                            </div>
                                            <div class="input-value" v-else>
                                                {{formLabelData.remark}}
                                            </div>
                                        </el-form-item>
                                    </el-col>


                                </el-col>
                            </el-row>
                        </el-form>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="项目文件" name="fourth">
                    <div style="padding-top: 30px">

                        <el-table
                                :data="fileData"
                                border
                                style="width: 100%">
                            <el-table-column prop="name_row1" label="文件名称">
                                <template slot-scope="scope">
                                    <Attachment :files="[scope.row]"></Attachment>
                                </template>
                            </el-table-column>
                            <el-table-column prop="name_row1" label="来源">
                                <template slot-scope="scope">
                                    {{scope.row.sysType === 2? 'OA系统': '自行上传'}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="id" width="100" label="操作">
                                <template slot-scope="scope">
                                    <down-file :fileData="scope.row"></down-file>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>

                </el-tab-pane>
                <el-tab-pane label="项目进度" name="projectJD" style="overflow: auto">
                    <div class="jd-row" style="padding-top: 30px">
                        <div class="el-steps el-steps--horizontal">
                            <div class="el-step jd-item is-horizontal is-center" v-for=" (item,index) in projectJDArr"
                                 :key="index">
                                <div class="el-step__head " :class="{'is-success':formLabelData.projectSchedule>index}">
                                    <div class="el-step__line" style="margin-right: 0px;">
                                        <i class="el-step__line-inner"
                                           style="transition-delay: 0ms; border-width: 0px; width: 0%;"
                                           :class="{'el-step__line-inner-over':formLabelData.projectSchedule>index+1}"></i>
                                    </div>
                                    <div class="el-step__icon is-text">
                                        <div class="el-step__icon-inner">{{index+1}}</div>
                                    </div>

                                </div>
                                <div class="el-step__main">
                                    <div class="el-step__title "
                                         :class="{'is-success':formLabelData.projectSchedule>index}">
                                        {{item.keyName}}
                                    </div>
                                    <div :id="item.id+'jd'" class="el-step__description " style="padding: 10px"
                                         :class="{'is-success':formLabelData.projectSchedule>index}">

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </el-tab-pane>
            </el-tabs>

            <div class="add-footer" v-if="activeName !== 'fourth' && activeName !== 'projectJD'">
                <div v-if="showEdit">
                    <el-button type="primary" @click="submitFn('DataForm')">提 交</el-button>
                    <el-button type="info" @click="showEditFn(false)">取消</el-button>
                </div>
            </div>
        </div>
        <add-file-model ref="addFileModel"></add-file-model>
        <edit-c-w-one-param ref="editCWOneParam"></edit-c-w-one-param>
        <edit-one-param ref="editOneParam"></edit-one-param>
    </div>
</template>

<script>
  import Api from '../../../api';
  import {dateFormat, moneyFormat} from '../../../filter';
  import Attachment from '../../../components/Attachment';
  import DownFile from '../../../components/DownFile';
  import addFileModel from '../addPage/addfileModel';
  import editOneParam from './editZFParamModel';
  import editCWOneParam from './editCWOneParam';
  import apiConfig from '../../../apiconfig'
  import Axios from "axios";

  export default {
    name: 'implementationInfo',
    data() {
      let checkId = (rule, value, callback) => {
        // if (!value) {
        //   return callback(new Error('不能为空'));
        // }
        setTimeout(() => {
          let reg = new RegExp(/^[a-zA-Z0-9]{1,20}$/);
          let result = reg.test(value);
          if (!result) {
            callback(new Error('只能输入数字和英文字母'));
          } else {
            callback();
          }
        }, 1000);
      };
      return {
        dialogLoading: false,
        responsibleObj: {},
        supervisionObj: {},
        activeName: 'first',
        showEdit: false,
        dataList: [],
        userDataArr: [],
        searchArr: [],
        fileData: [],
        userJLDataArr: [],
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
        initData: window.ww_FilterList.AssetStatus,
        purchaseArr: window.ww_FilterList.PurchaseMethod,
        role: '',
        renId: '',
        objChange: {
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
          14: 'newYearPayment',
          15: 'budgetMoney',
          16: 'assetMoney',
          18: 'currentYearPayment',
          19: 'increaseMoney',
          20: 'reduceMoney',
          21: 'paidMoney',
          22: 'noUseMoney',
          23: 'bidMoney',
          25: 'auditMoney',
          26: 'lastBudget',
        },
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
        projectScheduleArr: ww_FilterList.projectDu,
        projectScheduleObj: ww_FilterList_show.projectDu,
        projectJDArr: [],
        typeSearchArr: ww_FilterList.BusinessType,
        projectStateArr: window.ww_FilterList.ProjectStatus,
        formLabelData: {},
        webTotalPayment: 0,
        showAppointment: false,
        rules: {
          mainProjectName: [
            {required: true, message: '输入项目名称', trigger: 'blur,change'},
          ],
          agencyUnit: [
            {required: true, message: '请选择责任单位', trigger: 'blur,change'},
          ],
          responsibilityDep: [
            {required: true, message: '请选择责任处室', trigger: 'blur,change'},
          ],
          responsible: [
            {required: true, message: '请选择责任人', trigger: 'blur,change'},
          ],
          budgetMoney: [
            {type: 'string', required: true, message: '项目预算总金额', trigger: 'blur,change'},
          ],
          // contractCode: [
          //   { pattern: /^[a-zA-Z\d]+$/, message: '只能输入英文字母跟数字', trigger: 'blur' }
          // ],
          // oaId: [
          //   { pattern: /^[a-zA-Z\d]+$/, message: '只能输入英文字母跟数字', trigger: 'blur' }
          // ],
          caiwuId: [
            {validator: checkId, trigger: 'blur'}
          ],
          oaId: [
            {validator: checkId, trigger: 'blur'}
          ]
        },
      };
    },

    created() {
      this.role = JSON.parse(localStorage.getItem('ww_userData')).role;
      this.renId = JSON.parse(localStorage.getItem('ww_userData')).id;
      this.FilterList_show = window.ww_FilterList_show;
      this.getDataFn();
      this.getUserJLDataArr();
      this.getFindConfigurationFn()

    },
    methods: {
      moneyFormat,

      editOneParamFn(param, value) {

        if (!value.bidMoney || value.bidMoney === 0) {
          this.$message({
            message: '请先填写合同总金额',
            type: 'warning',
          });
          return
        }
        if (this.showEdit) {
          this.$message({
            message: '请先保存其他数据再设置支付数据！',
            type: 'warning',
          });
          return
        }

        const child = this.$refs.editOneParam;
        child.titleText = `设置合同支付方式 - 合同总金额${(value.bidMoney - 0).toFixed(0) || 0}万元`;
        if (param == 'payInfo') {
          child.titleText = `编辑支付情况`;

          if (!this.formLabelData.appointment) {
            this.$message({
              message: '请先填写合同约定支付方式',
              type: 'warning',
            });
            return
          }
        }
        child.formLabelData = JSON.parse(JSON.stringify(child.backupForm));
        child.ctrlDialog = true;
        child.param = param;
        child.bidMoney = value.bidMoney;
        child.getDataInfo(value.projectId);
        child.type = 'update';
        this.$Bus.$once('editZFOneParamData', (s) => {
          if (s === 0) {
            this.getDataFn();
          }
        });
        child.ctrlDialog = true;
      },
      goShowFileFn(row) {
        let domin = apiConfig.resourcesDomain
        this.fileData[row.index].disabledDown = true
        this.fileData = JSON.parse(JSON.stringify(this.fileData));
        let url = `${domin}/download/${row.resourceId}`
        Axios.get(url, {
          responseType: 'blob'
        }).then((res) => {
          this.fileData[row.index].disabledDown = false
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
        });
        // let openSrc = `${domin}/download/${row.resourceId}`
        // if (row.sysType === 2) {
        //   openSrc = `${domin}/oa/download?oaId=${row.oaId}`
        // }
        // setTimeout(() => {
        //   window.open(openSrc, '_parent')
        // }, 100);
      },
      changeCwFn(param, value) {
        const child = this.$refs.editCWOneParam;
        child.formLabelData = JSON.parse(JSON.stringify(child.backupForm));
        child.ctrlDialog = true;
        child.titleText = `编辑财务项目编号`;
        if (param == 'oaId') {
          child.titleText = `OA系统项目编号`;
        }
        child.param = param;
        child.getDataInfo(value);
        child.type = 'SS';
        child.mainProjectId = this.formLabelData.projectId;
        this.$Bus.$once('editCWOneParamData', (s) => {
          if (s === 0) {
            this.getDataFn();
          }
        });
        child.ctrlDialog = true;
      },
      getUserJLDataArr(url) {

        let param = {
          role: 4,
        };
        Api.getUserList(param).then(res => {
          if (res.code === 0) {
            this.userJLDataArr = res.response.datas;
          }
        });
      },
      getDataFn() {
        let param = {
          projectId: this.$route.params.id,
        };
        Api.getProjectInfo(param).then(res => {
          if (res.code === 0) {
            this.formLabelData = res.response;
            for (let item in this.objChange) {
              if (this.formLabelData[this.objChange[item]]) {
                this.formLabelData[this.objChange[item]] = (this.formLabelData[this.objChange[item]] / 10000).toFixed(4)
              }
            }
            this.fileData = res.response.resourceList || []

            if (this.formLabelData.projectSchedule !== null && this.formLabelData.projectSchedule) {
              this.formLabelData.projectSchedule = res.response.projectSchedule.toString()
            }
            this.responsibleObj = {
              id: this.formLabelData.responsibleId,
              name: this.formLabelData.responsible
            }
            this.supervisionObj = {
              id: this.formLabelData.supervisionId,
              name: this.formLabelData.supervision
            }

          }
        });
      },
      getFindConfigurationFn() {
        let param = {};
        Api.getFindConfigurationInfo(param).then(res => {
          if (res.code === 0) {
            this.projectJDArr = res.response
          }
        });
      },
      handleClick(tab, event) {
        if (tab.name === "projectJD") {
          for (let i = 0; i < this.projectJDArr.length; i += 1) {

            let ele = document.getElementById(this.projectJDArr[i].id + 'jd');
            let htmlString = this.projectJDArr[i].chileConfig[0].keyName
            let htmlArr = htmlString.toString().split(";")
            let newHtmlArr = []
            for (let j = 0; j < htmlArr.length; j += 1) {
              const count = htmlArr[j].length - 2
              newHtmlArr.push(htmlArr[j].substring(0, count))
            }

            htmlString = newHtmlArr.join('<br/>')
            ele.innerHTML =
              `<div style="
          font-size: 16px;
          text-align: left;
          margin-left: 50px;
          line-height: 25px;
          padding: 10px;
          border: 1px solid #C0C4CC;" class="jd-bor" >${htmlString}</div>`;
          }
        }
      },
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
      changeSupervisionFn(item) {
        this.formLabelData.supervisionId = item.id
        this.formLabelData.supervision = item.name
      },
      submitFn(formName) {
        const form = JSON.parse(JSON.stringify(this.formLabelData));
        if (form.year && form.year.length !== 4) {
          form.year = dateFormat(form.year, 'YYYY');
        }
        if (form.startTime) {
          form.startTime = dateFormat(form.startTime, 'YYYY-MM-DD');
        }
        if (form.endTime) {
          form.endTime = dateFormat(form.endTime, 'YYYY-MM-DD');
        }
        if (form.acceptanceDate) {
          form.acceptanceDate = dateFormat(form.acceptanceDate, 'YYYY-MM-DD');
        }
        if (form.responsibleId) {
          delete form.responsibleObj
        }

        for (let item in this.objChange) {
          if (form[this.objChange[item]]) {
            form[this.objChange[item]] = form[this.objChange[item]] * 10000
          }
        }

        this.$refs[formName].validate((valid) => {
          if (valid) {
            Api.updateSSProjectInfo(form).then(res => {
              if (res.code === 0) {
                this.showEdit = false;
                this.getDataFn()
              }
            });
          }
        });

      },
      getUserListFn() {

        // if (!this.formLabelData.agencyUnit) {
        //   this.$message({
        //     message: '请先选择责任单位！',
        //     type: 'warning',
        //   });
        // }
        // if (!this.formLabelData.responsibilityDep) {
        //   this.$message({
        //     message: '请先选择责任处室！',
        //     type: 'warning',
        //   });
        // }

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
      showEditFn(value) {
        this.showEdit = value;
        if (!value) {
          this.getDataFn();
        }
        let e = this.formLabelData.agencyUnit;
        if (this.searchArrAll[e]) {
          this.searchArr = this.searchArrAll[e];
          this.getUserListFn()
        }
      },
      showUploadFn(value) {
        const child = this.$refs.addFileModel;
        child.formLabelData = JSON.parse(JSON.stringify(child.backupForm));
        child.ctrlDialog = true;
        child.titleText = `上传项目文件`;
        child.type = value;
        child.projectId = this.$route.params.id;
        this.$Bus.$once('addFileModelModelData', (s) => {
          if (s === 0) {
            this.getDataFn();
          }
        });
        child.ctrlDialog = true;

      },
      backFn(value) {
        window.localStorage.setItem('ww_InfoRoute', JSON.stringify(true));
        this.$router.go(-1);
      },
    },
    components: {
      Attachment,
      DownFile,
      addFileModel,
      editCWOneParam,
      editOneParam,
    },

  };
</script>

<style lang="less" scoped>

    .el-tag + .el-tag {
        margin-left: 10px;
    }

    .jd-row {
        overflow: auto;
        display: inline-table;

        .jd-item {
            position: relative;
            width: 240px;
            flex-basis: inherit !important;
            max-width: none;

            .jd-con {
                position: absolute;
                top: 0;
                left: 0;
            }
        }
    }

    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }

    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }

    .info-view {
        padding: 20px;
        position: relative;
        padding-bottom: 20px;


        .edit-button {
            position: absolute;
            top: -30px;
            right: 110px;
        }

        .edit-upload-button {
            position: absolute;
            top: -30px;
            right: 112px;
            z-index: 1;
        }

        .edit-back {
            position: absolute;
            top: -30px;
            right: 35px;
        }

        .add-footer {
            width: 100%;
            text-align: center;
            padding-top: 30px;

            button {
                width: 300px;
            }
        }

        .input-value {
            text-align: left;

            &.table-head-c {
                padding-left: 0 !important;
                line-height: 40px;
            }
        }

        .table-head-c {
            text-align: center;
        }
    }


</style>
