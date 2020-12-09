/**
 * Created by enjoyzhou on 17-2-16.
 */
import { httpGet, httpPost, httpPath, httpPathPost } from './axios.com';
import Conf from './../apiconfig';
// import { provinceCache, cityCache, areaCache } from '../cache/AddressCache';

export default {
  getResourcesInfo: httpPath('/', Conf.resourcesDomain), // 获取资源信息 列表
  getFilterList: httpGet('configuration/list'), // 过滤器选择器配置数据
  getVersion: httpGet('/jzyc_platform/kvConfig/version'), // 过滤器选择器配置数据
  
  // 4级联动位置接口 地址库
  // getProvinceList: provinceCache,
  //   // getCityList: cityCache,
  //   // getAreaList: areaCache,
  getStreetList: httpGet('/address', Conf.addressDomain),
  httpPathPostQQ: httpPathPost('/get'),
  // 密码
  ResetPass: httpGet('/person?m=modifyPassword'), // 修改密码
  sinPass: httpPost('/person?m=modifyPassword'), // 修改密码
  // 管理平台
  toLoging: httpGet('/user/login'), //  登录
  getPersonInfo: httpGet(''),
  
  //项目管理
  getMainProject: httpGet('project/mainProject/list'),
  getMainProjectInfo: httpGet('project/mainProject/info'),
  getFindConfigurationInfo: httpGet('project/findConfiguration'),
  getProject: httpGet('project/list'),
  getSearchProject: httpGet('project/findFile'),
  getProjectInfo: httpGet('project/info'),
  addYSProjectInfo: httpPost('project/mainProject/add'),
  updateYSProjectInfo: httpPost('project/mainProject/update'),
  addSSProjectInfo: httpPost('project/add'),
  updateSSProjectInfo: httpPost('project/update'),
  getFindContract: httpGet('project/findContract'),
  updateFindContract: httpPost('project/addContract'),
  updateDate: httpPost('project/updateDate'),
  deleteYSDate: httpGet('project/mainProject/delete'),
  deleteSSDate: httpGet('project/delete'),
  
  //项目展示
  getTotalStatisticsList: httpGet('totalStatistics/list'),//一级表
  getProjectStatisticsList: httpGet('projectStatistics/list'),//二级表
  getLastBudgetList: httpGet('lastBudget/list'),//预算表
  
  //财务数据
  getFinancePurchase: httpGet('ownPurchase/list'),//采购
  addFinancePurchaseInfo: httpPost('ownPurchase/add'),//添加采购
  getFinanceFunds: httpGet('expenseDetail/threePublicFunds/list'),//经费
  getFinanceFundsSub: httpGet('expenseDetail/list'),//经费明细列表
  addFinanceFundsSub: httpPost('expenseDetail/add'),//经费明细列表
  getFinanceFundsInfo: httpGet('expenseDetail/threePublicFunds/info'),//经费详情
  addFundsInfo: httpPost('expenseDetail/threePublicFunds/add'),//经费添加
  updateFundsInfo: httpPost('expenseDetail/threePublicFunds/update'),//经费修改
  getFinanceAssetManagement: httpGet('assets/management/list'),//资产管理
  getFinanceAsset: httpGet('assets/list'),//资产
  addFinanceAsset: httpPost('assets/add'),//资产
  getFinanceAssetInfo: httpGet('assets/info'),//资产
  getFinanceMaterial: httpGet('consumables/list'),//物资
  addFinanceMaterial: httpPost('consumables/add'),//添加物资
  getFinanceMaterialInfo: httpGet('consumables/info'),//物资
  updateRemark: httpPost('/ownPurchase/addRemark'),
  updateManagement: httpPost('/assets/management/update'),
  updateLastBudget: httpPost('/lastBudget/update'),//编辑预算管理
  
  //发展规划
  getPlanDepModule: httpGet('planDepModule/list'),//发展规划
  addPlanDepModule: httpPost('planDepModule/add'),//发展规划
  
  // addYSAssetInfo:httpPost('project/mainProject/add'),
  // updateYSProjectInfo:httpPost('project/mainProject/update'),
  // addSSProjectInfo:httpPost('project/add'),
  // updateSSProjectInfo:httpPost('project/update'),

  //日志管理
  getJournalList: httpGet('logger/list'),
  
  //用户管理
  getUserList: httpGet('user/list'),
  getUserInfo: httpGet('user/info'),
  addUserInfo: httpPost('user/add'),
  editUserInfo: httpPost('user/update'),
  deleteUserInfo: httpGet('user/delete'),
  
};
