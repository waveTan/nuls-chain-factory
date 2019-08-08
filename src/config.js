//开发模式
export const IS_DEV = process.env.NODE_ENV !== 'production';
//燃烧地址
export const API_BURNING_ADDRESS = 'tNULSeBaMgLW3Wrt8Eh8Av5MinETdiXhfGg61u';
//运行环境（true:正式环境，false:测试环境）
export const RUN_DEV = false;
//正式环境ChainId和资产ID
export const MAIN_INFO = RUN_DEV ? {chainId: 1, assetsId: 1} : {chainId: 2, assetsId: 1};
//正式、测试网络的api
export let API_MODEL_URL = RUN_DEV ? 'http://www.nulscan.io' : 'http://apitn1.nulscan.io';
//正式、测试网络的api
export let API_URL = IS_DEV ? 'http://192.168.1.192:8080/' : 'http://apitn1.nulscan.io/';
//请求最迟时间
export const API_TIME = IS_DEV ? '9000' : '8000';
//高级配置的默认值
export const API_COFIG =  {
  "rollbackCount":1000, //每次回滚最大数，取值1-1000
  "packingInterval":10, //每次出块间隔时间，单位秒，取值5-100w
  "nodeMaxIn":20,//每次同步块数，取值1-1000
  "nodeMaxOut":50,//最大被动连接数，取值0-1000
  "syncBlockCount": 10, //最大主动连接数，取值0-1000
  "networkPort": 18001,//节点网络端口号，取值1-65535
  "magicNumber": 89898989,//网络魔法参数
  "inflationAmount":"500000000000000",//初始通胀金额
  "initTime":1563951658, //通胀开始计算时间(单位:S)
  "deflationRatio":100,//通缩比例(如果没有通缩则设为100，最大值100)
  "deflationTimeInterval":31536000 //通缩间隔时间(单位：S)
};
