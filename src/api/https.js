import axios from 'axios'
import {MAIN_INFO, API_TIME, API_URL} from '@/config'

axios.defaults.timeout = API_TIME;
axios.defaults.baseURL = API_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';

/**
 * 封装post请求
 * Encapsulation post method
 * @param url
 * @param methodName
 * @param data
 * @returns {Promise}
 */
export async function post(url, methodName, data = []) {
  data.unshift(MAIN_INFO.chainId);
  const parameter = {jsonrpc: "2.0", method: methodName, params: data, id: Math.floor(Math.random() * 1000)};
  try {
    let res = await axios.post(url, parameter);
    return res.data;
  } catch (err) {
    return err
  }
}
