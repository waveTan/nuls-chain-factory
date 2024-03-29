import nuls from 'nuls-sdk-js'
import {BigNumber} from 'bignumber.js'
import {MAIN_INFO, API_PREFIX} from '@/config'
import copy from 'copy-to-clipboard'

/**
 * 10的N 次方
 * @param arg
 * @returns {BigNumber}
 * @constructor
 */
export function Power(arg) {
  let newPower = new BigNumber(10);
  return newPower.pow(arg);
}

/**
 * 减法
 * @param nu
 * @param arg
 * @returns {BigNumber}
 * @constructor
 */
export function Minus(nu, arg) {
  let newMinus = new BigNumber(nu);
  return newMinus.minus(arg);
}

/**
 * 乘法
 * @param nu
 * @param arg
 * @returns {BigNumber}
 * @constructor
 */
export function Times(nu, arg) {
  let newTimes = new BigNumber(nu);
  return newTimes.times(arg);
}

/**
 * 加法
 * @param nu
 * @param arg
 * @returns {BigNumber}
 * @constructor
 */
export function Plus(nu, arg) {
  let newPlus = new BigNumber(nu);
  return newPlus.plus(arg);
}

/**
 * 除法
 * @param nu
 * @param arg
 * @returns {BigNumber}
 * @constructor
 */
export function Division(nu, arg) {
  let newDiv = new BigNumber(nu);
  return newDiv.div(arg);
}

/**
 * 数字除以精度系数
 */
export function divisionDecimals(nu, decimals = 8) {
  let newNu = new BigNumber(Division(nu, Power(decimals)).toString());
  return newNu.toFormat().replace(/[,]/g, '');
}

/**
 * 数字乘以精度系数
 */
export function timesDecimals(nu, decimals = 8) {
  let newNu = new BigNumber(Times(nu, Power(decimals)).toString());
  return Number(newNu);
}

/**
 * @disc: 日期转换成时间搓
 * @params: time
 * @date: 2019-10-15 11:41
 * @author: Wave
 */
export  function switchMsec (time){ // 日期转换成毫秒
  let date = new Date(time);
  return Date.parse(date);
}

/**
 * 复制 copy
 * @param value
 */
export const copys = (value) => copy(value);

/**
 * @disc: 验证密码
 * @params:  accountInfo
 * @params:  password
 * @date: 2019-08-22 12:05
 * @author: Wave
 */
export function passwordVerification(accountInfo, password) {
  let aesPri = accountInfo.aesPri ? accountInfo.aesPri : accountInfo.encryptedPrivateKey;
  const pri = nuls.decrypteOfAES(aesPri, password);
  const newAddressInfo = nuls.importByKey(MAIN_INFO.chainId, pri, password, API_PREFIX);
  if (newAddressInfo.address === accountInfo.address) {
    return {success: true, pri: pri, pub: accountInfo.pub, address: accountInfo.address,aesPri:newAddressInfo.aesPri};
  } else {
    return {success: false};
  }
}

/**
 * 获取链ID
 * @returns {number}
 */
export function chainID() {
  return MAIN_INFO.chainId
}

/**
 * 获取chainId+number
 * @returns {string}
 */
export function chainIdNumber() {
  return 'chainId' + chainID();
}

/**
 * 获取地址列表或选择地址
 * @param type 0:地址列表，1:选中地址
 * @returns {*}
 */
export function addressInfo(type) {
  let chainNumber = 'chainId' + chainID();
  let addressList = localStorage.hasOwnProperty(chainNumber) ? JSON.parse(localStorage.getItem(chainNumber)) : [];
  if (addressList) {
    if (type === 0) {
      return addressList
    } else {
      for (let item  of addressList) {
        if (item.selection) {
          return item
        }
      }
    }
  } else {
    return addressList
  }
}

/**
 * 超长数字显示
 * @param nu
 * @param powerNu
 * @returns {string}
 */
export function langNumber(nu, powerNu) {
  let newNu = new BigNumber(Division(nu, powerNu).toString());
  return newNu.toFormat().replace(/[,]/g, '');
}

/**
 * 字符串中间显示....
 * @param string
 * @param leng
 * @returns {*}
 */
export function superLong(string, leng) {
  if (string && string.length > 10) {
    return string.substr(0, leng) + "...." + string.substr(string.length - leng, string.length);
  } else {
    return string;
  }
}

/**
 * 根据不同时区显示时间
 * @param time
 * @returns {*}
 */
export function getLocalTime(time) {
  if (typeof time !== 'number') return;
  let d = new Date();
  let offset = d.getTimezoneOffset() * 60000;
  let localUtc = new Date().getTimezoneOffset() / 60;
  let utcTime;
  if (localUtc > 0) {
    utcTime = time - offset;
  } else {
    utcTime = time + offset;
  }
  let localTime = utcTime + 3600000 * Math.abs(localUtc);
  return new Date(localTime);
}

/**
 * @disc: 获取utf-8中英文混合长度
 * @params: string
 * @date: 2019-08-21 15:35
 * @author: Wave
 * @returns Number
 */
export function stringLength(string) {
  let enc = new TextEncoder("utf-8");
  return enc.encode(string).length;
}

/**
 * 连接跳转
 * @param name
 * @param parameter
 * @param type 0:路由跳转 1：连接跳转（浏览器、其他地址）
 */
export function connect(name, parameter, type) {
  if (type === 0) {
    let newQuery = {};
    let newPush = {name: name};
    if (!parameter) {
      if (name === 'projectsInfo') {
        newQuery = {releaseId: parameter}
      }
      newPush.query = newQuery;
    }
    return {success: true, data: newPush};
  } else {
    window.open(name, '_blank');
    return {success: false};
  }
}
