import axios from 'axios'
import * as config from './../config.js'

axios.defaults.timeout = config.API_TIME;
axios.defaults.baseURL = config.API_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

/**
 * 封装post请求
 * Encapsulation post method
 * @param url
 * @param methodName
 * @param data
 * @returns {Promise}
 */
export function post(url, data) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        //console.log(response.data);
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}
