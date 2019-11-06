import nuls from 'nuls-sdk-js'
import axios from 'axios'
import {post} from './https'
import {API_DATA_URL, API_BURNING_ADDRESS_PUB, CONSUME_NULS,API_PREFIX} from '@/config'
import {timesDecimals,Plus} from './util'

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
    return {success: false, code: 2001, data: newAccountRegister.data};
  }

}

/**
 * 获取地址的余额及nonce根据地址
 * @param chainId
 * @param assetId
 * @param address
 * @returns {Promise<any>}
 */
export async function getBalanceOrNonceByAddress(chainId = 1, assetId = 1, address) {
  return await post('/', 'getAccountBalance', [chainId, assetId, address])
    .then((response) => {
      //console.log(response);
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
 * 获取不跨链inputs 、 outputs
 * @param transferInfo
 * @param balanceInfo
 * @returns {*}
 */
export async function inputsOrOutputs(transferInfo, balanceInfo) {
  let newAmount = Number(Plus(transferInfo.amount, transferInfo.fee));
  let newNonce = balanceInfo.nonce;
  let burnAddress = nuls.getAddressByPub(transferInfo.chainId,transferInfo.assetsId,API_BURNING_ADDRESS_PUB,API_PREFIX);
  let inputs = [{
    address: transferInfo.fromAddress,
    assetsChainId: transferInfo.chainId,
    assetsId: transferInfo.assetsId,
    amount: newAmount,
    locked: 0,
    nonce: newNonce
  }];
  let outputs = [{  //1600转账
    address: transferInfo.toAddress,
    assetsChainId: transferInfo.chainId,
    assetsId: transferInfo.assetsId,
    amount: timesDecimals(CONSUME_NULS.make.transfer),
    lockTime: 0
  }, {
    address: burnAddress,
    assetsChainId: transferInfo.chainId,
    assetsId: transferInfo.assetsId,
    amount: timesDecimals(CONSUME_NULS.make.burn),
    lockTime: 0
  }];
 /* console.log(inputs);
  console.log(outputs);*/
  return {success: true, data: {inputs: inputs, outputs: outputs}};
}

/**
 * 注册跨链交易获取inputs 、 outputs
 * @param transferInfo
 * @param balanceInfo
 * @returns {*}
 */
export async function mutiInputsOrOutputs(transferInfo, balanceInfo) {
  let newAmount = Number(timesDecimals(transferInfo.from.amount) + transferInfo.fee);
  let newLocked = 0;
  let newNonce = balanceInfo.nonce;
  if (balanceInfo.balance < newAmount) {
    return {success: false, data: "Your balance is not enough."}
  }
  let inputs = [{
    address: transferInfo.from.fromAddress,
    assetsChainId: transferInfo.assetsChainId,
    assetsId: transferInfo.assetsId,
    amount: newAmount,
    locked: newLocked,
    nonce: newNonce
  }];
  let outputs = [];
  for (let i = 0; i < transferInfo.to.length; i++) {
    let to = transferInfo.to[i];
    outputs.push({
      address: to.toAddress,
      assetsChainId: transferInfo.assetsChainId,
      assetsId: transferInfo.assetsId,
      amount: to.amount,
      lockTime: to.lockTime
    })
  }
  return {success: true, data: {inputs: inputs, outputs: outputs}};
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
      //return res.data
      return {success: false, data: res.data.error}
    }
  } catch (err) {
    return {success: false, data: err}
  }
}

/**
 * 转账交易
 * @param addressInfo
 * @param transferInfo
 * @param balanceInfo
 */
export async function transferTransaction(addressInfo, transferInfo, balanceInfo) {
  let inOrOutputs = await inputsOrOutputs(transferInfo, balanceInfo.data);
  let tAssemble = [];//交易组装
  let txhex = "";//交易签名
  let remark = '';
  if (inOrOutputs.success) {
    tAssemble = await nuls.transactionAssemble(inOrOutputs.data.inputs, inOrOutputs.data.outputs, remark, 2);
    //获取手续费
    let newFee = countFee(tAssemble, 1);
    //手续费大于0.001的时候重新组装交易及签名
    if (transferInfo.fee !== newFee) {
      transferInfo.fee = newFee;
      inOrOutputs = await inputsOrOutputs(transferInfo, balanceInfo.data);
      tAssemble = await nuls.transactionAssemble(inOrOutputs.data.inputs, inOrOutputs.data.outputs, remark, 2);
      txhex = await nuls.transactionSerialize(addressInfo.pri, addressInfo.pub, tAssemble);
    } else {
      txhex = await nuls.transactionSerialize(addressInfo.pri, addressInfo.pub, tAssemble);
    }
    console.log(inOrOutputs);
  } else {
    return {success: false, data: inOrOutputs.data}
  }
  return {success: true, data: txhex}
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

