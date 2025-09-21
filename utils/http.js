import axios from 'axios';

// axios默认配置
axios.defaults.timeout = 300000;   // 超时时间
// axios.defaults.baseURL = "http://" + (process.env.API_ROOT || "") + ":3000";
//axios.defaults.baseURL = "http://" + (process.env.API_ROOT || document.domain) + ":12765"

axios.defaults.baseURL = 'http://192.168.124.166:3000'
// axios.defaults.baseURL = 'http://127.0.0.1:3000'
// axios.defaults.baseURL = 'http://smartiot.natapp1.cc'

// axios.defaults.baseURL = "http://" + '192.168.50.69' + ":3000"
console.log(axios.defaults.baseURL)

export const instance = axios.create({
  baseURL: 'http://192.168.124.203:12775'
});
instance.defaults.timeout = 500000;
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

export const instance0 = axios.create({
  baseURL: 'http://192.168.124.166:12765'
});
instance0.defaults.timeout = 50000;
instance0.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

export const instance2 = axios.create({
  baseURL: 'http://192.168.124.19'
});
instance2.defaults.timeout = 50000;
instance2.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';


export default axios;
