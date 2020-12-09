import Vue from 'vue';
import VueRouter from 'vue-router';
// import Home from '../views/Home.vue';

Vue.use(VueRouter);
import Login from '../views/login/login';
import Home from '../views/Home';
import ProjectManage from '../views/projectManage/projectManage';
import AddImplementationInfo from '../views/projectManage/addPage/addImplementationInfo';
import AddBudgetInfo from '../views/projectManage/addPage/addBudgetInfo';
import ImplementationInfo from '../views/projectManage/addPage/implementationInfo';
import BudgetInfo from '../views/projectManage/addPage/budgetInfo';
import ProjectShow from '../views/projectShow/projectShow';
import ProjectStatistics from '../views/projectStatistics/projectStatistics';
import DevelopManage from '../views/developManage/developManage';
import AssetInfoList from '../views/developManage/developInfoPage/AssetInfoList';
import FundsInfoLIst from '../views/developManage/developInfoPage/FundsInfoLIst';
import FileManage from '../views/fileManage/fileManage';
import FinanceManage from '../views/financeManage/financeManage';
import JournalManage from '../views/journalManage/journalManage';
import AddFinanceInfo from '../views/financeManage/addPage/addFinanceInfo';
import UserList from '../views/userManage/userList';
import ProjectList from '../views/developManage/developInfoPage/projectList';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      {
        path: 'project/:page/:count',
        name: 'projectManage',
        component: ProjectManage,
      },
      {
        path: 'addImplementationInfo/:id',
        name: 'addImplementationInfo',
        component: AddImplementationInfo,
      },
      {
        path: 'addBudgetInfo/:id',
        name: 'addBudgetInfo',
        component: AddBudgetInfo,
      }, {
        path: 'implementationInfo/:id',
        name: 'implementationInfo',
        component: ImplementationInfo,
      }, {
        path: 'budgetInfo/:id',
        name: 'budgetInfo',
        component: BudgetInfo,
      },
      {
        path: 'projectShow/:page/:count',
        name: 'projectShow',
        component: ProjectShow,
      },
      {
        path: 'projectStatistics/:page/:count',
        name: 'projectStatistics',
        component: ProjectStatistics,
      },
      {
        path: 'developManage/:page/:count',
        name: 'developManage',
        component: DevelopManage,
      },  {
        path: 'FundsInfoLIst/:page/:count',
        name: 'FundsInfoLIst',
        component: FundsInfoLIst,
      },  {
        path: 'AssetInfoList/:page/:count',
        name: 'AssetInfoList',
        component: AssetInfoList,
      },
      {
        path: 'fileManage/:page/:count',
        name: 'fileManage',
        component: FileManage,
      },
      {
        path: 'financeManage/:page/:count',
        name: 'financeManage',
        component: FinanceManage,
      },
      {
        path: 'fddFinanceInfo/:id',
        name: 'fddFinanceInfo',
        component: AddFinanceInfo,
      },
      {
        path: 'userList/:page/:count',
        name: 'userList',
        component: UserList,
      }, {
        path: 'projectList/:page/:count',
        name: 'projectList',
        component: ProjectList,
      }, {
        path: 'journal/:page/:count',
        name: 'journal',
        component: JournalManage,
      },
      
      ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
