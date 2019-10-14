import axios from 'axios'
import {post} from './https'
import {API_DATA_URL} from '@/config'

/**
 * 计算手续费
 * @param tx
 * @param signatrueCount 签名数量，默认为1
 **/
export function countFee(tx, signatrueCount) {
  let txSize = tx.txSerialize().length;
  txSize += signatrueCount * 110;
  return 100000 * Math.ceil(txSize / 1024);
}

/**
 * 计算跨链交易手续费
 * @param tx
 * @param signatrueCount 签名数量，默认为1
 **/
export function countCtxFee(tx, signatrueCount) {
  let txSize = tx.txSerialize().length;
  txSize += signatrueCount * 110;
  return 1000000 * Math.ceil(txSize / 1024);
}

/**
 * 获取地址信息根据地址
 * @param address
 * @returns {Promise<any>}
 */
export async function getAddressInfoByAddress(address) {
  let newAccountRegister = await accountRegister(address);
  if (newAccountRegister.success) {
    return await post('/', 'getAccount', [address])
      .then((response) => {
        //console.log(response);
        if (response.hasOwnProperty("result")) {
          return {success: true, data: response.result}
        } else {
          return {success: false, data: response}
        }
      })
      .catch((error) => {
        return {success: false, data: error};
      });
  } else {
    console.log(newAccountRegister.data)
  }

}

/**
 * 获取地址的余额及nonce根据地址
 * @param assetChainId
 * @param assetId
 * @param address
 * @returns {Promise<any>}
 */
export async function getBalanceOrNonceByAddress(address, assetId = 1) {
  return await post('/', 'getAccountBalance', [assetId, address])
    .then((response) => {
      console.log(response);
      if (response.hasOwnProperty("result")) {
        return {success: true, data: {balance: response.result.balance, nonce: response.result.nonce}}
      } else {
        return {success: false, data: response}
      }
    })
    .catch((error) => {
      return {success: false, data: error};
    });
}

/**
 * @disc: 注册账户
 * @params: address
 * @date: 2019-10-14 11:38
 * @author: Wave
 */
export async function accountRegister(address) {
  const url = API_DATA_URL + 'account/register';
  const data = {"address": address};
  try {
    let res = await axios.post(url, data, {headers: {'Content-Type': 'application/json;charset=utf-8'}});
    //console.log(res);
    if (res.data.success && res.data.hasOwnProperty('result')) {
      return {success: true, data: res.data.result}
    } else {
      return {success: false}
    }
  } catch (err) {
    return {success: false, data: err}
  }
}

/**
 * 验证交易
 * @param txHex
 * @returns {Promise<any>}
 **/
export async function validateTx(txHex) {
  return await post('/', 'validateTx', [txHex])
    .then((response) => {
      if (response.hasOwnProperty("result")) {
        return {success: true, data: response.result};
      } else {
        return {success: false, data: response.error};
      }
    })
    .catch((error) => {
      return {success: false, data: error};
    });
}

/**
 * 广播交易
 * @param txHex
 * @returns {Promise<any>}
 **/
export async function broadcastTx(txHex) {
  return await post('/', 'broadcastTx', [txHex])
    .then((response) => {
      if (response.hasOwnProperty("result")) {
        return {success: true, data: response.result};
      } else {
        return {success: false, data: response.error};
      }
    })
    .catch((error) => {
      return {success: false, data: error};
    });
}

/**
 * 验证交易并广播
 * @param txHex
 * @returns {Promise<any>}
 **/
export async function validateAndBroadcast(txHex) {
  return await post('/', 'validateTx', [txHex])
    .then((response) => {
      //console.log(response);
      if (response.hasOwnProperty("result")) {
        let newHash = response.result.value;
        return post('/', 'broadcastTx', [txHex])
          .then((response) => {
            if (response.hasOwnProperty("result")) {
              return {success: true, hash: newHash};
            } else {
              return {success: false, data: response.error};
            }
          })
          .catch((error) => {
            return {success: false, data: error};
          });
      } else {
        return {success: false, data: response.error};
      }
    })
    .catch((error) => {
      return {success: false, data: error};
    });
}

