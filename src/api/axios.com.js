/**
 * Created by enjoyzhou on 17-2-16.
 * https://github.com/mzabriskie/axios#request-config
 */

import Axios from "axios";
import Conf from "./../apiconfig";
import { bus } from "../assets/js/vue.event.bus";
import exitSystem from "../assets/js/com.exit.module";

const Http = (path, methodKey, domainVal, ENVVal) => {
  const methodMap = {
    path: "get",
    pathPost: "post"
  };
  return (...Arg) => {
    let token = window.localStorage.getItem("ww_token");
    let isDebug = window.localStorage.getItem("qy_isDebug");
    isDebug = isDebug === "true";
    let _isMessage = true; //默认开启提示,以及第三个参数
    let data = null;
    let params = null;
    Arg.forEach((item, index) => {
      if (item === false) {
        _isMessage = false;
      } else {
        data = index === 0 ? item : data;
        params = index === 1 ? item : params;
      }
    });
    let domain = domainVal || Conf.domain;
    let envVal = ENVVal;
    const d = domain.split("@@");
    if (d.length >= 2) {
      if (!envVal) {
        envVal = d[0];
      }
      domain = d[1];
    }
    let method = methodMap[methodKey] || methodKey;
    let url = domain + path;
    let _data = methodKey === "post" ? data : null;
    let _params = methodKey === "get" ? data : params;
    if (methodKey.indexOf("path") >= 0) {
      url += data;
      _data = _params || null;
      _params = null;
    }
    const headers = {
      "QXJ-ACCESS-TOKEN": token
    };
    if (!isDebug) {
      delete headers["QXJ-USER-ENVIRONMENT"];
    }
    if (envVal) {
      headers["QXJ--USER-ENVIRONMENT"] = envVal;
    }

    return Axios({
      method: method,
      url: url,
      data: _data,
      params: _params,
      headers: JSON.parse(JSON.stringify(headers))
    })
      .then(function(response) {
        let res = response.data;
        let headers = response.headers;
        let url = "";
        if (res.response) {
          url = res.response.url || url;
        }
        if (res.code) {
          if (res.code != 0) {
            if (!isDebug) {
              if (res.code == 5 || res.code == 1000) {
                exitSystem(url, true); //自动退出系统
                return;
              }
            }
            if (_isMessage) {
              bus.$message.error(
                (res.msg || "未知错误") + " CODE-" + res.code + ""
              );
            }
          }
        } else {
        }
        if (headers["content-type"] === "application/msexcel;charset=UTF-8") {
          return response;
        } else {
          return res;
        }
      })
      .catch(function(error) {
        if (_isMessage) {
          bus.$message.error("请求数据失败,请检查网络是否正常!");
        }
        return error;
      });
  };
};

export function httpGet(path, domain, ENVVal) {
  return Http(path, "get", domain, ENVVal);
}

export function httpPost(path, domain, ENVVal) {
  return Http(path, "post", domain, ENVVal);
}

export function httpPathPost(path, domain, ENVVal) {
  return Http(path, "pathPost", domain, ENVVal);
}

export function httpPath(path, domain, ENVVal) {
  return Http(path, "path", domain, ENVVal);
}
