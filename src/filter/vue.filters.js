/**
 * Created by enjoyzhou on 17-2-20.
 */
import Vue from 'vue';

/**
 * dateFormat 格式化时间戳
 * @param value 原始时间 字符串 时间戳 毫秒
 * @param formatO 自定义格式 yyyy-MM-dd hh:mm：ss
 * @return {String} format
 */
Vue.filter('dateFormat', (value, formatO) => {
  // 返回处理后的值
  if (!value) return '';
  if (value.toString().indexOf('0000') === 0) return '';
  let date = value;
  let format = formatO || 'yyyy-MM-dd hh:mm';
  date = new Date(value);
  if (!date.getFullYear() > 0 || date.toString().indexOf('nvalid') >= 0 || isNaN(date)) {
    date = value.replace(/-/g, '/');
    date = new Date(date);
  }
  const map = {
    M: date.getMonth() + 1, // 月份
    d: date.getDate(), // 日
    h: date.getHours(), // 小时
    m: date.getMinutes(), // 分
    s: date.getSeconds(), // 秒
    q: Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  };
  format = format.replace(/([yMdhmsqS])+/g, (all, t) => {
    let v = map[t];
    if (v !== undefined) {
      if (all.length > 1) {
        v = `0${v}`;
        v = v.substr(v.length - 2);
      }
      return v;
    } else if (t === 'y') {
      return (`${date.getFullYear()}`).substr(4 - all.length);
    }
    return all;
  });
  return format;
});

//花样占位符
/**
 * returnPlaceholder
 * @param value 值
 * @param s 占位字符串
 * @param is 判断值的条件
 */
Vue.filter('returnPlaceholder', function(value, s, is) {
  if (is && is === value) {
    return s;
  }
  if (value)
    return value;
  return s;
});
