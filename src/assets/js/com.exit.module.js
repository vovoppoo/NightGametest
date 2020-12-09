import { bus } from './vue.event.bus';
import buildURL from './lib/buildURL';

let ApiTimeOut = null;
/**
 * exitSystem 退出系统模块
 * @param url
 * @param auto
 */
export const exitSystem = function(url, auto) {
  let login_from_url = window.localStorage.getItem('login_from_url');
  let _url = login_from_url || url || '';
  if (!auto) {
    if (_url.indexOf('#') <= -1) {
      _url = _url + '/#/';
    }
    _url = buildURL(_url, {
      sign_out: 'true',
      user_name: '',
    });
    window.location.href = _url;
    return;
  }
  window.localStorage.removeItem('ww_userData');
  window.localStorage.removeItem('ww_token');
  bus.$message.error({
    type: 'error',
    duration: 0,
    message: '用户会话状态已过期，请重新登录!',
  });
  
  clearTimeout(ApiTimeOut);
  ApiTimeOut = setTimeout(() => {
    if (window.__UserData) {
      _url = buildURL(_url, {
        sign_out: 'true',
        user_name: window.__UserData.userName || '',
      });
    } else {
      _url = buildURL(_url, {
        sign_out: 'true',
      });
    }
    window.localStorage.removeItem('login_from_url');
    window.location.href = _url;
  }, 5000);
  
};
export default exitSystem;
