import '../src/assets/less/theme.less';
import '../src/assets/less/g.less';
import '../src/assets/less/app.simple.less';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Api from './api';
import echarts from 'echarts';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../src/filter/vue.filters';
import { bus } from './assets/js/vue.event.bus';

Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$Bus = bus;
Vue.prototype.$Api = Api;
Vue.prototype.$echarts = echarts;

const isActivate = function() {
  window.localStorage.removeItem('ww_userData');
  window.localStorage.removeItem('ww_token');
};
router.beforeEach((to, from, next) => {
  
  if (!window.ww_FilterList) {
    if (JSON.parse(localStorage.getItem('ww_FilterList'))) {
      window.ww_FilterList = JSON.parse(localStorage.getItem('ww_FilterList'));
      window.ww_FilterList_show = JSON.parse(localStorage.getItem('ww_FilterList_Show'));
    } else {
      let params = {};
      let text = [
        'all',
        'ResponsibleUnit',
        'Department',
        'ProjectStatus',
        'AssetStatus',
        'PurchaseMethod',
        'FunctionAccount',
        'PerformanceClassification',
        'BusinessType',
        'EconomicSubject',
        'ExpenseType',
        'UserRights',
        'UserStatus',
        'AssetType',
        'planType',
      ];
      Api.getFilterList(params).then(res => {
        if (res.code === 0) {
          const thisList = res.response;
          let _FilterList = {
            all: [],
            ResponsibleUnit: [],//责任单位
            Department: [],//部门
            ProjectStatus: [],//项目状态
            AssetStatus: [],//资产状态
            PurchaseMethod: [],//采购方式
            FunctionAccount: [],//功能科目科目名称
            PerformanceClassification: [],//履职分类
            BusinessType: [],//业务类型
            EconomicSubject: [],//经济科目
            ExpenseType: [],//费用类型
            UserRights: [],//用户权限
            UserStatus: [],//用户状态
            AssetType: [],//资产类型
            planType: [],//规划类型
          };
          let _FilterList_show = {
            all: {},
            ResponsibleUnit: {},
            Department: {},
            ProjectStatus: {},
            AssetStatus: {},
            PurchaseMethod: {},
            FunctionAccount: [],
            PerformanceClassification: {},
            BusinessType: {},
            EconomicSubject: {},
            ExpenseType: {},
            UserRights: {},
            UserStatus: {},
            AssetType: {},
            planType: {},
          };
          for (let i = 0; i < thisList.length; i += 1) {
            _FilterList[text[thisList[i].type]].push(thisList[i]);
            _FilterList_show[text[thisList[i].type]][thisList[i].keyValue] = thisList[i].keyName;
          }
          
          const ResponsibleUnit = _FilterList.ResponsibleUnit;
          const Department = _FilterList.Department;
          let DepartmentIdArr = {};
          let DepartmentNameArr = {};
          for (let k = 0; k < ResponsibleUnit.length; k += 1) {
            DepartmentIdArr[ResponsibleUnit[k].id] = [];
            DepartmentNameArr[ResponsibleUnit[k].keyName] = [];
            for (let j = 0; j < Department.length; j += 1) {
              if (Department[j].parentId === ResponsibleUnit[k].id) {
                DepartmentIdArr[ResponsibleUnit[k].id].push(Department[j]);
                DepartmentNameArr[ResponsibleUnit[k].keyName].push(Department[j]);
              }
            }
          }
          _FilterList.DepartmentIdArr = DepartmentIdArr;
          _FilterList.DepartmentNameArr = DepartmentNameArr;
          localStorage.setItem('ww_FilterList', JSON.stringify(_FilterList));
          localStorage.setItem('ww_FilterList_Show', JSON.stringify(_FilterList_show));
          window.ww_FilterList = _FilterList;
          window.ww_FilterList_show = _FilterList_show;
        }
      });
    }
    
  }
  
  if (to.path === '/') {
    next();
  } else {
    if (to.path.indexOf('appPlace') !== -1) {
      next();
      return;
    }
    const token = window.localStorage.getItem('ww_token');
    if (!token) {
      next('/');
      return;
    }
    if (localStorage.getItem('ww_userData') !== 'undefined') {
      window.__UserData = JSON.parse(localStorage.getItem('ww_userData'));
    }
    if (!window.__UserData) {
      if (window.localStorage.getItem('ww_userID')) {
        Api.getPersonInfo({ platformId: window.localStorage.getItem('ww_userID') })
        .then((res) => {
          if (res.code === 0) {
            localStorage.setItem('ww_userID', JSON.stringify(res.response.id));
            let permission = res.response.permission.split(',');
            let lsArr = permission[permission.length - 1].split('?');
            
            for (let i = 0; i < lsArr.length; i += 1) {
              if (permission.indexOf(lsArr[i]) === -1) {
                permission.push(lsArr[i]);
              }
            }
            window.__UserData = res.response;
            window.__UserData.permissionArr = permission;
            
            localStorage.setItem('ww_userData', JSON.stringify(window.__UserData));
            if (from.name === 'BasicsParameterManage') {
              localStorage.removeItem('qy_FilterList');
            }
            next();
          } else {
            next('/');
            isActivate();
          }
        });
        // eslint-disable-next-line no-unreachable
      } else {
        next('/');
        // isActivate();
      }
      // eslint-disable-next-line no-unreachable
    } else {
      next();
    }
  }
  // }
  // } else {
  //   window.location.replace(`?version=${version}`);
  // }
  // });
});
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
