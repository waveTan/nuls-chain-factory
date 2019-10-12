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
//链前缀
export const API_PREFIX = 'NULS';
//正式、测试网络的api
export let API_URL = IS_DEV ? 'https://public1.nuls.io' : 'https://public1.nuls.io';
//请求最迟时间
export const API_TIME = '8000';
//浏览器连接地址
export const EXPLORER_URL = IS_DEV ? 'https://nulscan.io/' : 'https://nulscan.io/';
//高级配置的默认值
export const API_COFIG = {
  "packingInterval": 10, //每次出块间隔时间，单位秒，取值5-100w
  "nodeMaxIn": 20,//每次同步块数，取值1-1000
  "nodeMaxOut": 50,//最大被动连接数，取值0-1000
  "syncBlockCount": 10, //最大主动连接数，取值0-1000
  "networkPort": 18001,//节点网络端口号，取值1-65535
  "magicNumber": 89898989,//网络魔法参数
  "inflationAmount": "500000000000000",//初始通胀金额
  "totalInflationAmount":"5000000000000000", //默认资产最终通货总额
  "initTime": 1563951658, //通胀开始计算时间(单位:S)
  "deflationRatio": 100,//通缩比例(如果没有通缩则设为100，最大值100)
  "deflationTimeInterval": 31536000 //通缩间隔时间(单位：S)
};

