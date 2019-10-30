import nuls from 'nuls-sdk-js'
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
 * 获取inputs 、 outputs
 * @param transferInfo
 * @param balanceInfo
 * @param type
 * @returns {*}
 */
export async function inputsOrOutputs(transferInfo, balanceInfo, type) {
  let newAmount = transferInfo.amount + transferInfo.fee;
  let newLocked = 0;
  let newNonce = balanceInfo.nonce;
  let newoutputAmount = transferInfo.amount;
  let newLockTime = 0;
  if (balanceInfo.balance < transferInfo.amount + transferInfo.fee) {
    return {success: false, data: "Your balance is not enough."}
  }
  if (type === 4) {
    newLockTime = -1;
  } else if (type === 5) {
    newLockTime = -1;
  } else if (type === 6) {
    newAmount = transferInfo.amount;
    newLocked = -1;
    newNonce = transferInfo.depositHash.substring(transferInfo.depositHash.length - 16);
    newoutputAmount = transferInfo.amount - transferInfo.fee;
  } else if (type === 9) {
    newAmount = transferInfo.amount;
    newLocked = -1;
    newNonce = transferInfo.depositHash.substring(transferInfo.depositHash.length - 16);
    newoutputAmount = transferInfo.amount - transferInfo.fee;
    //锁定三天
    let times = (new Date()).valueOf() + 3600000 * 72;
    newLockTime = Number(times.toString().substr(0, times.toString().length - 3));
  } else {
    //return {success: false, data: "No transaction type"}
  }
  let inputs = [{
    address: transferInfo.fromAddress,
    assetsChainId: transferInfo.assetsChainId,
    assetsId: transferInfo.assetsId,
    amount: newAmount,
    locked: newLocked,
    nonce: newNonce
  }];
  let outputs = [];
  if (type === 15 || type === 17) {
    return {success: true, data: {inputs: inputs, outputs: outputs}};
  }
  if (type === 16) {
    if (!transferInfo.toAddress) {
      return {success: true, data: {inputs: inputs, outputs: outputs}};
    } else {
      newoutputAmount = transferInfo.value;
    }
  }
  outputs = [{
    address: transferInfo.toAddress ? transferInfo.toAddress : transferInfo.fromAddress,
    assetsChainId: transferInfo.assetsChainId,
    assetsId: transferInfo.assetsId,
    amount: newoutputAmount,
    lockTime: newLockTime
  }];
  /*console.log(inputs);
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
  let newAmount = transferInfo.from.amount + transferInfo.fee;
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
      lockTime: to.lockTime ? to.lockTime : 0
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
      return {success: false,data:res.data.error}
    }
  } catch (err) {
    return {success: false, data: err}
  }
}

/**
 * 转账交易
 * @param pri
 * @param pub
 * @param fromAddress
 * @param toAddress
 * @param chainId
 * @param assetsId
 * @param amount
 * @param remark
 */
export async function transferTransaction(pri, pub, fromAddress, toAddress, chainId, assetsId, amount, remark) {
  const balanceInfo = await getBalanceOrNonceByAddress(chainId, assetsId, fromAddress);

  if (!balanceInfo.success) {
    return {success: false, data: balanceInfo.data}
  }

  let transferInfo = {
    fromAddress: fromAddress,
    toAddress: toAddress,
    assetsChainId: chainId,
    assetsId: assetsId,
    amount: amount,
    fee: 100000
  };
  let inOrOutputs = await inputsOrOutputs(transferInfo, balanceInfo.data, 2);
  let tAssemble = [];//交易组装
  let txhex = "";//交易签名
  if (inOrOutputs.success) {
    tAssemble = await nuls.transactionAssemble(inOrOutputs.data.inputs, inOrOutputs.data.outputs, remark, 2);
    //获取手续费
    let newFee = countFee(tAssemble, 1);
    //手续费大于0.001的时候重新组装交易及签名
    if (transferInfo.fee !== newFee) {
      transferInfo.fee = newFee;
      inOrOutputs = await inputsOrOutputs(transferInfo, balanceInfo.data, 2);
      tAssemble = await nuls.transactionAssemble(inOrOutputs.data.inputs, inOrOutputs.data.outputs, remark, 2);
      txhex = await nuls.transactionSerialize(pri, pub, tAssemble);
    } else {
      txhex = await nuls.transactionSerialize(pri, pub, tAssemble);
    }
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
      console.log(response);
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

