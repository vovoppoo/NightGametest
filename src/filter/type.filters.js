/**
 * Created by enjoyzhou on 17-3-7.
 */
import Vue from 'vue';

Vue.filter('frequency_FR', function (value) {
  /*巡查频率，"1/1/1"//
    3天/1次  不要巡查 "0/0/0"
     1.//第一个字段是类型，  
    1://按天计算，以天单位的时间，
    3表示3天   2：//按周  3://按季度
     4://半个月,15号分界线  5://按月,月底分界线
    6://按半年,6月底分界线  7://按年
    */
  if (!value) {
    return '--';
  }
  let _l = {};
  let types = {
    '0/0/0': '不需要',
    '2/0/1': '每周1次',
    '3/0/1': '每季度1次',
    '4/0/1': '半月1次',
    '5/0/1': '每月1次',
    '6/0/1': '每半年1次',
    '7/0/1': '每年1次',
  };
  for (let i = 0; i < 6; i++) {
    _l[`1/1/${i + 1}`] = `每日${i + 1}次`;
  }
  for (let i = 1; i < 6; i++) {
    _l[`1/${(i + 1)}/1`] = `${i + 1}天1次`;
  }
  types = Object.assign(_l, types);
  return types[value] || '未知频率';
});

Vue.filter('newType_FR', function (value) {
  const types = ['全部', '新闻', '案例', '法律法规', '知识库'];
  return types[value * 1];
});

Vue.filter('megType_FR', function (value) {
  const types = {
    message: '通知',
    notice: '公告',
    special: '专项任务',
  };
  return types[value];
});

Vue.filter('sbStatus_FR', function (value) {
  const types = ['未知', '正常', '故障', '维修中', '已停用', '待审核', '排除风险', '确认故障'];
  return types[value];
});
Vue.filter('netSbStatus_FR', function (value) {
  const types = {
    1: '正常',
    2: '故障',
    3: '停用',
  };
  return types[value] || '未知';
});

Vue.filter('userRole_FR', function (value) {
  const types = [
    { text: '最高管理员', value: 0 },
    { text: '管理员', value: 1 },
    { text: '检修员', value: 2 },
    { text: '外协人员', value: 3 },
  ];
  return types[value - 1].text;
});
Vue.filter('fileTypeClass_FR', function (value) {
  const types = {
    ppt: 'ico-dg-ppt',
    pptx: 'ico-dg-ppt',
    txt: 'ico-dg-txt',
    pdf: 'ico-dg-pdf',
    rar: 'ico-dg-rar',
    xls: 'ico-dg-xls',
    xlsx: 'ico-dg-xls',
    doc: 'ico-dg-doc',
    docx: 'ico-dg-doc',
    zip: 'ico-dg-zip',
    apk: 'ico-dg-apk',
    file: 'ico-dg-wenjian',
  };
  
  if (types.hasOwnProperty(value)) {
    return types[value];
  } else {
    return types['file'];
  }
});
Vue.filter('netSystemName_FR', function (value) {
  const types = {
    1: '视频监控系统',
    2: '气监测系统',
    3: '水系统监测系统',
  };
  return types[value];
});
export const receiptType_FR = Vue.filter('receiptType_FR', function (val) {
  const type = ['无', '确认接收', '回复内容', '上传文件'];
  return type[val];
});

export default {
  receiptType_FR,
};
