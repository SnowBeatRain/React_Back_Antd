import axios from "axios";
import qs from "qs";
import { message } from "antd";

console.log(axios.defaults)
// 创建axios默认请求
axios.defaults.baseURL = "http://spsapp.spsing.com";
// 配置允许跨域携带cookie
axios.defaults.withCredentials = false
// 配置超时时间
axios.defaults.timeout = 100000
// 配置请求拦截
axios.interceptors.request.use(config => {
  message.loading("加载中", 0);
  // config.setHeaders([
  //   // 在这里设置请求头与携带token信息
  // ]);
  return config;
});
// 添加响应拦截器
axios.interceptors.response.use(
  function(response) {
    // message.destroy();
    return response;
  },
  function(error) {
    // message.destroy();
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);
var get = function(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(res => {
        message.destroy();
        resolve(res.data);
      })
      .catch(err => {
        message.destroy();
        // message.error('This is a message of error',2);
        reject(err);
      });
  });
};

var post = function(url, data) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, qs.stringify(data), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};
export default { get, post };
