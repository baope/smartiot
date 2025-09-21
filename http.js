import axios from 'axios';

// axios默认配置
axios.defaults.timeout = 300000;   // 超时时间
// axios.defaults.baseURL = "http://" + (process.env.API_ROOT || "") + ":3000";
// axios.defaults.baseURL = "http://" + (process.env.API_ROOT || document.domain) + ":3000"
//axios.defaults.baseURL = 'http://192.168.124.166:3000'
 axios.defaults.baseURL = 'http://127.0.0.1:3000'

// axios.defaults.baseURL = "http://smartiot.natapp1.cc"

console.log(axios.defaults.baseURL)

export const instance = axios.create({
  // baseURL: 'http://smartiot.natapp1.cc'
  // baseURL: 'http://159.138.20.163:3000'
  //baseURL: 'http://192.168.124.166:3000'
  baseURL: 'http://127.0.0.1:3000'

});
instance.defaults.timeout = 500000;
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

export default axios;
