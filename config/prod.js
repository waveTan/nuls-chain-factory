/**
 * @disc: 正式网环境配置
 * @date: 2019-09-18 9:33
 * @author: Wave
 */
"use strict";
//开发模式
export const IS_DEV = process.env.NODE_ENV !== 'production';
//运行环境（true:正式环境，false:测试环境）
export const RUN_DEV = true;
//链信息
export const MAIN_INFO = {chainId:1,assetsId:1};
//燃烧地址的公钥
export const API_BURNING_ADDRESS_PUB = '000000000000000000000000000000000000000000000000000000000000000000';
//链前缀
export const API_PREFIX = 'NULS';
//网络数据api
export let API_URL = IS_DEV ? 'https://public1.nuls.io' : 'https://public1.nuls.io';
//接口数据api
export let API_DATA_URL = IS_DEV ? 'http://192.168.1.160:8080/' : 'http://192.168.1.160:8080/';
//下载地址api
export let API_DOWNLOAD_URL = IS_DEV ? 'http://192.168.1.121:8083' : 'http://192.168.1.121:8083';
//请求最迟时间
export const API_TIME = '8000';
//浏览器连接地址
export const EXPLORER_URL = IS_DEV ? 'https://nulscan.io/' : 'https://nulscan.io/';
//造链、跨链消耗nuls数量
export const CONSUME_NULS = {
  //造链2000 = 400销毁+1600转账
  make: {burn: 400, transfer: 1600,total:2000},
  //跨链1000 = 200销毁+800锁定
  cross: {burn: 200, locking: 800,total:1000},
};

//高级配置的默认值
export const API_COFIG = {
  "packingInterval": 10, //每次出块间隔时间，单位秒，取值5-100w
  "nodeMaxIn": 20,//每次同步块数，取值1-1000
  "nodeMaxOut": 50,//最大被动连接数，取值0-1000
  "syncBlockCount": 10, //最大主动连接数，取值0-1000
  "networkPort": 8001,//节点网络端口号，取值1-65535
  "magicNumber": 100,//网络魔法参数
  "inflationAmount": "500000000000000",//初始通胀金额
  "totalInflationAmount":"5000000000000000", //默认资产最终通货总额
  "initTime": 1563951658, //通胀开始计算时间(单位:S)
  "deflationRatio": 100,//通缩比例(如果没有通缩则设为100，最大值100)
  "deflationTimeInterval": 31536000 //通缩间隔时间(单位：S)
};

