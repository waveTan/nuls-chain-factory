<template>
  <div class="user bg-gray bg-white">
    <div class="bg-white user-info">
      <div class="w1200 balance">
        <span>账户: {{accountAddress.address}}</span>&nbsp;&nbsp;
        <font class="fr">余额: {{accountAddress.balance}} <font class="fCN">NULS</font></font>
      </div>
      <div class="cb"></div>
      <div class="bg-white w1200 user-bottom">
        <div class="left fl">
          <div class="steps-confirm">
            <div class="w700">
              <div class="title bg-gray">业务场景</div>
              <div class="infos">
                <p v-show="isSteps === 1">智能合约版</p>
                <p v-show="isSteps === 2">智能合约版</p>
                <p v-show="isSteps === 3">智能合约版</p>
              </div>
              <div class="title bg-gray">基本信息</div>
              <div class="infos">
                <p class="logo cb">
                  <span class="fl">Logo</span>
                  <font class="fl"><img :src="infoForm.logoUrl"/></font>
                </p>
                <p class="cb"><span class="fl">链名称</span><font class="fl">{{infoForm.name}}</font></p>
                <p class="cb"><span class="fl">地址前缀</span><font class="fl">{{infoForm.prefix}}</font></p>
                <p class="cb"><span class="fl">通证名称</span><font class="fl">{{infoForm.symbol}}</font></p>
                <p class="cb"><span class="fl">精度</span><font class="fl">{{infoForm.decimals}}</font></p>
                <p class="cb"><span class="fl">总发行量</span><font class="fl">{{infoForm.total}}</font></p>
              </div>

              <div class="title bg-gray">创世块</div>
              <div class="infos node-infos">
                <ul>
                  <li class="titles">
                    <span class="fl">地址</span>
                    <font class="fl">分配数量</font>
                  </li>
                  <li v-for="(domain, index) in nodeForm.addressList" :key="index">
                    <span class="fl">{{domain.address}}</span>
                    <font class="fl">{{domain.coins}}</font>
                  </li>
                </ul>
              </div>

              <div class="title bg-gray cb">链信息</div>
              <div class="infos">
                <p class="cb"><span class="fl">是否跨链</span><font class="fl">{{isPartake=== '1' ? '是':'否' }}</font></p>
                <p class="cb"><span class="fl">抵押金</span><font class="fl">{{isPartake=== '1' ? '20000':'0' }} <font
                        class="fCN">NULS</font></font></p>
              </div>

              <div class="title bg-gray">种子节点</div>
              <div class="infos node-infos">
                <ul>
                  <li class="titles">
                    <span class="fl">地址</span>
                    <font class="fl">IP</font>
                  </li>
                  <li v-for="(domain, index) in seedForm.seedList" :key="index">
                    <span class="fl">{{domain.address}}</span>
                    <font class="fl">{{domain.ip}}</font>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="right fr">
          <el-button type="success" class="btn-next" @click="downloadResources">下载资源</el-button>
        </div>
      </div>
      <div class="cb"></div>
    </div>

  </div>
</template>

<script>
  import axios from 'axios'
  import {API_URL, MAIN_INFO, API_DATA_URL, API_COFIG} from '@/config'
  import {divisionDecimals} from '@/api/util'

  export default {
    data() {
      return {
        accountAddress: JSON.parse(localStorage.getItem('accountInfo')),//地址信息
        isSteps: 1,//业务场景选中模块
        //基本信息表单
        infoForm: {
          name: 'wave',
          logoUrl: 'http://zlj-1.oss-cn-hangzhou.aliyuncs.com/1565085680556.png',
          prefix: 'wave',
          symbol: 'wave',
          total: 8000,
          decimals: 5,
          amount: 500,
          totalAmount: 5000,
          startTime: '2019-11-23 00:00:00',
          proportion: 10,
          intervalTime: 100,
          senior: false,
          desc: JSON.stringify(API_COFIG),
        },
        //创世块表单
        nodeForm: {
          addressList: [],
        },
        isPartake: '0', //设置跨链模式 0:不参与跨链 1:参与跨链
        seedForm: {
          seedList: [],
        },
        packingState: 0,//打包状态 0未提交 1已提交  2提交审核失败  3打包中 4打包失败  5打包成功
      };
    },
    created() {
      this.getBalanceByAddress(this.accountAddress.address);
      this.getAccount(this.accountAddress.address);
    },
    mounted() {
    },
    methods: {

      /**
       * 获取转出地址余额信息
       *  @param assetChainId
       *  @param assetId
       *  @param address
       **/
      async getBalanceByAddress(address) {
        const params = {
          "jsonrpc": "2.0",
          "method": "getAccountBalance",
          "params": [2, MAIN_INFO.chainId, MAIN_INFO.assetsId, address],
          "id": Math.floor(Math.random() * 1000)
        };
        axios.post(API_URL, params)
          .then((response) => {
            //console.log(response.data);
            if (response.data.hasOwnProperty("result")) {
              this.accountAddress.balance = divisionDecimals(response.data.result.balance);
              localStorage.setItem('accountInfo', JSON.stringify(this.accountAddress));
            } else {
              this.accountAddress.balance = 0;
              localStorage.setItem('accountInfo', JSON.stringify(this.accountAddress));
            }
          })
          .catch((error) => {
            this.accountAddress.balance = 0;
            localStorage.setItem('accountInfo', JSON.stringify(this.accountAddress));
            console.log("getAccountBalance:" + error)
          })
      },

      /**
       * @disc: 获取账户信息
       * @params: address
       * @date: 2019-10-14 11:38
       * @author: Wave
       */
      async getAccount(address) {
        const url = API_DATA_URL + '/chain/get/' + address;
        try {
          let res = await axios.post(url);
          //console.log(res.data);
          if (res.data.success) {
            this.packingState = res.data.result.status;
            this.infoForm.name = res.data.result.chainName;
            this.infoForm.logoUrl = res.data.result.logo;
            this.infoForm.prefix = res.data.result.prefix;
            this.infoForm.chainId = res.data.result.chainId;
            let newAssetInfo = res.data.result.assetInfo;
            this.infoForm.symbol = newAssetInfo.symbol;
            this.infoForm.total = divisionDecimals(newAssetInfo.initCoins, newAssetInfo.decimals);
            this.infoForm.decimals = newAssetInfo.decimals;

            if (res.data.result.genesisInfo) {
              this.nodeForm.addressList = JSON.parse(res.data.result.genesisInfo);
            }

            if (res.data.result.seeds) {
              this.seedForm.seedList = JSON.parse(res.data.result.seeds);
            }

            let newConfigInfo = JSON.parse(res.data.result.configInfo);
            this.infoForm.amount = divisionDecimals(newConfigInfo.inflationAmount, newAssetInfo.decimals);
            this.infoForm.totalAmount = divisionDecimals(newConfigInfo.totalInflationAmount, newAssetInfo.decimals);
            this.infoForm.startTime = newConfigInfo.initTime * 1000;
            this.infoForm.proportion = newConfigInfo.deflationRatio;
            this.infoForm.intervalTime = newConfigInfo.deflationTimeInterval / 86400;
            this.infoForm.desc = res.data.result.configInfo;
          } else {
            console.log('获取账户信息错误!')
          }
        } catch (err) {
          console.log(err);
        }
      },

      /**
       * @disc: 现在资源方法
       * @date: 2019-10-16 17:29
       * @author: Wave
       */
      downloadResources(){
        console.log("downloadResources");
      },

      /**
       * 连接跳转
       * @param name
       */
      toUrl(name) {
        this.$router.push({
          name: name,
        })
      },
    }
  }
</script>

<style lang="less">
  @import "./../../assets/css/style";

  .user {
    .user-info {
      .balance {
        margin: 20px auto 0;
        line-height: 30px;
        border-bottom: @BD1;
      }
    }
    .user-bottom {
      .left {
        width: 70%;
        margin-bottom: 100px;
        .steps-confirm {
          margin: 0 0 20px 0;
          .w700 {
            width: 700px;
            margin: 20px auto 10px;
            .title {
              height: 40px;
              line-height: 40px;
              font-weight: bold;
              text-align: left;
              padding: 0 0 0 40px;
              font-size: 16px;
            }
            .infos {
              padding: 10px 0 10px 40px;
              p {
                font-size: 14px;
                height: 22px;
                line-height: 22px;
                width: 100%;
                margin: 5px 0;
                span {
                  display: block;
                  width: 160px;
                }
              }
              .logo {
                height: 60px;
                img {
                  width: 60px;
                  height: 60px;
                  border: @BD1;
                  padding: 5px;
                }
              }
              ul {
                margin: 5px 0;
                li {
                  border-bottom: @BD1;
                  line-height: 30px;
                  height: 30px;
                  font-size: 14px;
                  padding: 0 0 0 40px;
                  span {
                    display: block;
                    width: 360px;

                  }
                  font {
                    margin: 0 0 0 20px;
                  }
                  &:last-child {
                    border-bottom: 0;
                  }
                }
                .titles {
                  border-bottom: 2px solid #dfe4ef;
                }
              }
            }
            .node-infos {
              padding: 10px 0 10px 0;
            }
          }
        }
      }
      .right {
        width: 30%;
        text-align: left;
        padding: 50px 0 0 0;
        .btn-next {
          width: 320px;
        }
      }

    }

  }

</style>
