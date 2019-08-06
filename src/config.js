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
