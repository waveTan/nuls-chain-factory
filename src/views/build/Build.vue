<template>
  <div class="build bg-gray">
    <div class="bg-white top">
      <h3 class="title tc">搭建区块链</h3>
    </div>

    <div class="w1200 mt_30 bg-white info">

      <el-tabs tab-position="left" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="业务场景" name="first">
          <!--选择业务场景-->
          <div class="steps">
            <div class="steps-scene" :class="isSteps===1 ? 'is-active' : ''">
              <h6>分布式账本版</h6>
              <p>该版本拥有区块链的分布式记账功能，能够以800的TPS记录链上的交易，且账本公开透明，不可篡改</p>
              <ul>
                <li>金融结算</li>
                <li>供应链</li>
                <li>分布式证书</li>
                <li>防伪溯源</li>
                <li>发票</li>
              </ul>
            </div>
            <div class="steps-scene" :class="isSteps===2 ? 'is-active' : ''">
              <h6>智能合约版</h6>
              <p>该版本在区块链的分布式记账功能，基础上支持了智能合约的运行，开发者可在该链上开发具有业务逻辑的Dapp</p>
              <ul>
                <li>游戏</li>
                <li>积分系统</li>
                <li>公司治理</li>
                <li>社交应用</li>
              </ul>
            </div>
            <div class="steps-scene" :class="isSteps===3 ? 'is-active' : ''">
              <h6>POCM版</h6>
              <p>该版本在区块链的分布式记账功能，基础上支持了智能合约的运行，开发者可在该链上开发具有业务逻辑的Dapp</p>
              <ul>
                <li>游戏</li>
                <li>积分系统</li>
                <li>公司治理</li>
                <li>社交应用</li>
              </ul>
            </div>
            <el-button type="success" class="btn-next" @click="stepsNext">确 定</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="填写基本信息" name="second">
          <!--填写基本信息-->
          <el-row class="steps-info">
            <el-form :model="infoForm" :rules="infoRules" ref="infoForm" status-icon class="steps-infoForm"
                     :hide-required-asterisk="true">
              <el-form-item label="链名称" prop="name">
                <el-input v-model="infoForm.name" @change="changeName">
                </el-input>
              </el-form-item>
              <el-form-item label="链Logo" prop="logoUrl">
                <UploadBar @func="getMsgFormSon"></UploadBar>
              </el-form-item>
              <el-form-item label="地址前缀" prop="prefix">
                <el-input v-model="infoForm.prefix"></el-input>
              </el-form-item>
              <el-form-item label="通证简称" prop="symbol">
                <el-input v-model="infoForm.symbol"></el-input>
              </el-form-item>
              <el-form-item label="发行总量" prop="total">
                <el-input v-model="infoForm.total"></el-input>
              </el-form-item>
              <el-form-item label="精度" prop="decimals">
                <el-input v-model="infoForm.decimals"></el-input>
              </el-form-item>
              <el-form-item label="单次通胀金额" prop="amount">
                <el-input v-model="infoForm.amount" placeholder="初始通胀金额">
                </el-input>
              </el-form-item>
              <el-form-item label="总通胀金额" prop="totalAmount">
                <el-input v-model="infoForm.totalAmount" placeholder="初始通胀金额">
                </el-input>
              </el-form-item>
              <el-form-item label="开始时间" prop="startTime">
                <div class="cd time">
                  <el-date-picker v-model="infoForm.startTime" type="datetime" placeholder="通胀开始计算时间">
                  </el-date-picker>
                </div>
              </el-form-item>
              <el-form-item label="通缩比例" prop="proportion">
                <el-input v-model="infoForm.proportion" placeholder="通缩比例">
                </el-input>
              </el-form-item>
              <el-form-item label="间隔时间/天" prop="intervalTime">
                <el-input v-model="infoForm.intervalTime" placeholder="通缩间隔时间">
                </el-input>
              </el-form-item>
              <el-form-item label="高级">
                <el-switch v-model="infoForm.senior"></el-switch>
              </el-form-item>
              <el-form-item label="" v-show="infoForm.senior">
                <el-input type="textarea" :rows="5" v-model="infoForm.desc"></el-input>
              </el-form-item>
              <el-form-item class="tc">
                <el-button type="primary" class="btn-next" @click="infoSubmitForm('infoForm')">确 定</el-button>
              </el-form-item>
            </el-form>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="配置创世块" name="third">
          <!--配置创世块-->
          <el-row class="steps-node">
            <el-form :model="nodeForm" ref="nodeForm" class="steps-nodeForm">
              <el-col class="address bg-gray" v-for="(domain, index) in nodeForm.addressList" :key="index">
                <div class="node-address">
                  <p>地址{{index}}:{{domain.address}}</p>
                  <span>
                <i class="el-icon-circle-plus-outline click" @click="addDomain"></i>
                <i class="el-icon-remove-outline click" @click.prevent="removeDomain(domain)"
                   v-show="nodeForm.addressList.length !==1 "></i>
              </span>
                </div>
                <div class="node-form cb">
                  <el-form-item label="通证数量" class="number fl">
                    <el-input v-model.number="domain.coins" @change="changeNumber"></el-input>
                  </el-form-item>
                  <el-form-item label="锁定时间" class="time fr">
                    <el-date-picker v-model="domain.lockTime" type="datetime" placeholder="选择日期时间"
                                    default-time="12:00:00"
                                    @change="changeTime">
                    </el-date-picker>
                  </el-form-item>
                </div>
              </el-col>
              <el-form-item class="btn-next cb">
                <div class="btn">
                  <el-button type="success" @click="nodeSubmitForm('nodeForm')">备份地址私钥</el-button>
                </div>
                <div class="btn">
                  <el-button @click="submintNodeInfo" :disabled="!isBackup">提交创世块信息
                  </el-button>
                </div>
              </el-form-item>
            </el-form>

            <el-dialog title="备份地址私钥列" width="40rem" class="backups-dialog"
                       :visible.sync="backupsDialog"
                       :close-on-click-modal="false"
                       :close-on-press-escape="false"
                       :show-close="false"
            >
              <h5 class="font16 mt_20 mb_20">请务必保存好创世块地址私钥，否则将面临丢失资产的风险。资产丢失后，NULS也无法帮你找回</h5>
              <div class="tc">
                <el-button @click="backupsNodeList" type="success">下载地址私钥TXT</el-button>
              </div>
            </el-dialog>

          </el-row>
        </el-tab-pane>
        <el-tab-pane label="链信息" name="fourth">
          <!--链信息-->
          <el-row class="steps-set">
            <el-col class="tc radio">
              <el-radio v-model="isPartake" label="0">参与跨链</el-radio>
              <el-radio v-model="isPartake" label="1">不参与跨链</el-radio>
            </el-col>
            <div class="tc tips font16">
              <p v-show="isPartake ==='0'">需缴纳跨链抵押金: <span class="yellow">20000</span> <font class="fCN">NULS</font></p>
            </div>
            <div class="seed cb w630">
              <el-form :model="seedForm" ref="seedForm">
                <el-col class="seed_list bg-gray" v-for="(domain, index) in seedForm.seedList" :key="index">
                  <div class="node-address">
                    <p>地址{{index}}:{{domain.address}}</p>
                    <span>
                <i class="el-icon-circle-plus-outline click" @click="addSeedDomain"></i>
                <i class="el-icon-remove-outline click" @click.prevent="removeSeedDomain(domain)"
                   v-show="seedForm.seedList.length !==1 "></i>
              </span>
                  </div>
                  <div class="node-form cb">
                    <el-form-item label="种子节点IP" class="number fl">
                      <el-input v-model="domain.IP"></el-input>
                    </el-form-item>
                  </div>
                </el-col>
              </el-form>
              <div class="seed_backups">
                <el-button @click="backupsSeedList" type="success">下载共识节点出块地址私钥</el-button>
              </div>
            </div>
            <div class="btn-next tc">
              <!--<div class="balance">
                当前账户余额: {{accountInfo.balance}} <span class="fCN">NULS</span>
              </div>-->
              <div class="btn">
                <el-button type="success" @click="submintChainInfo" :disabled="!isSeedBackup">提交链信息</el-button>
              </div>
            </div>

          </el-row>
        </el-tab-pane>
        <el-tab-pane label="确认订单" name="five">
          确订单
        </el-tab-pane>
      </el-tabs>
      <!--确认订单-->
      <div class="steps-confirm" v-show="stepsActive ===5">
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
            <p class="cb"><span class="fl">进度</span><font class="fl">{{infoForm.precision}}</font></p>
            <p class="cb"><span class="fl">总发行量</span><font class="fl">{{infoForm.total}}</font></p>
          </div>

          <div class="title bg-gray">创世块</div>
          <div class="infos node-infos">
            <ul>
              <li class="titles">
                <span class="fl">地址</span>
                <font class="fl">分配数量</font>
              </li>
              <li v-for="item of nodeForm.addressList" :key="item.key">
                <span class="fl">{{item.address}}</span>
                <font class="fl">{{item.number}}</font>
              </li>
            </ul>
          </div>

          <div class="title bg-gray cb">跨链</div>
          <div class="infos">
            <p class="cb"><span class="fl">是否跨链</span><font class="fl">{{isPartake=== '0' ? '是':'否' }}</font></p>
            <p class="cb"><span class="fl">抵押金</span><font class="fl">{{isPartake=== '0' ? '20000':'0' }} <font
                    class="fCN">NULS</font></font></p>
          </div>
          <div class="title bg-gray">节点</div>
          <div class="infos">
            <p class="cb"><span class="fl">模式</span><font class="fl"> {{isApply=== '0' ? '云节点运行':'自行部署' }}</font></p>
            <div v-show="isApply=== '0'">
              <p class="cb"><span class="fl">运行时间</span><font class="fl">{{applyForm.runTime}}个月</font></p>
              <p class="cb"><span class="fl">共识节点</span><font class="fl">{{applyForm.node}}个</font></p>
              <p class="cb"><span class="fl">费用</span><font class="fl">{{applyForm.netFee}} <font
                      class="fCN">NULS</font></font></p>
            </div>

          </div>
        </div>
      </div>

    </div>

    <div class="w1200 bg-white bottoms cb" v-show="stepsActive ===5">
      <div class="b-left fl">
        <div class="fl total">
          <p>总费用: <span class="yellow">56464</span><font class="fCN">&nbsp;NULS</font></p>
        </div>
        <el-popover placement="top" width="320" trigger="click" class="popover">
          <div class="detailed">
            <h6 class="bg-gray">账单明细</h6>
            <p class="cb"><u class="fl gray">创建基本信息</u><span class="fl">0.01</span><font class="fCN">&nbsp;NULS</font>
            </p>
            <p class="cb"><u class="fl gray">跨链抵押</u><span class="fl">{{isPartake=== '0' ? '20000':'0' }} </span><font
                    class="fCN">&nbsp;NULS</font></p>
            <p class="cb"><u class="fl gray">运行3个种子节点</u><span class="fl">0.01</span><font class="fCN">&nbsp;NULS</font>
            </p>
            <p class="cb"><u class="fl gray">运行5个共识节点</u><span class="fl">0.01</span><font class="fCN">&nbsp;NULS</font>
            </p>
            <p class="cb all"><u class="fl gray">总计</u><span class="yellow fl">0.01</span><font
                    class="fCN">&nbsp;NULS</font></p>
          </div>
          <el-link :underline="false" type="primary" slot="reference">明细</el-link>
        </el-popover>

      </div>
      <div class="b-right fr">
        <el-button>上一步</el-button>
        <el-button type="success">确认订单</el-button>
      </div>
    </div>
  </div>

</template>

<script>
  import nuls from 'nuls-sdk-js'
  import axios from 'axios'
  import {API_COFIG, API_DATA_URL} from '@/config'
  import {timesDecimals, divisionDecimals, switchMsec} from '@/api/util'
  import UploadBar from '@/components/UploadBar';

  export default {
    data() {
      let validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入链名称'));
        } else {
          /*if (this.infoForm.logoUrl !== '') {
            this.$refs.ruleForm.validateField('logoUrl');
          }*/
          callback();
        }
      };
      let validateLogo = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请上传链logo'));
        } else {
          callback();
        }
      };
      let validatePrefix = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入地址前缀'));
        } else {
          callback();
        }
      };
      let validateSymbol = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入通证简称'));
        } else {
          callback();
        }
      };
      let validateTotal = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入发行总量'));
        } else {
          callback();
        }
      };
      let validateDecimals = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入精度系数'));
        } else {
          callback();
        }
      };
      let validateAmount = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入通货膨胀金额'));
        } else {
          callback();
        }
      };
      let validateTotalAmount = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入总通货膨胀金额'));
        } else {
          callback();
        }
      };
      let validateIntervalTime = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请选择开始时间'));
        } else {
          callback();
        }
      };
      let validateProportion = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入通缩比例'));
        } else {
          callback();
        }
      };
      let validateStartTime = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入间隔时间'));
        } else {
          callback();
        }
      };
      let validateSeedNumber = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入种子节点数量'));
        } else {
          callback();
        }
      };

      return {
        accountInfo: localStorage.hasOwnProperty('accountInfo') ? JSON.parse(localStorage.getItem('accountInfo')) : {},//地址信息
        activeName: 'fourth',
        stepsActive: 0,//步骤条
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
        infoRules: {
          name: [
            {validator: validateName, trigger: 'blur'}
          ],
          logoUrl: [
            {validator: validateLogo, trigger: 'blur'},
          ],
          prefix: [
            {validator: validatePrefix, trigger: 'blur'},
          ],
          symbol: [
            {validator: validateSymbol, trigger: 'blur'},
          ],
          total: [
            {validator: validateTotal, trigger: 'blur'},
          ],
          decimals: [
            {validator: validateDecimals, trigger: 'blur'},
          ],
          amount: [
            {validator: validateAmount, trigger: 'blur'},
          ],
          totalAmount: [
            {validator: validateTotalAmount, trigger: 'blur'},
          ],
          intervalTime: [
            {validator: validateIntervalTime, trigger: 'blur'},
          ],
          proportion: [
            {validator: validateProportion, trigger: 'blur'},
          ],
          startTime: [
            {validator: validateStartTime, trigger: 'blur'},
          ],
        },

        //创世块表单
        nodeForm: {
          addressList: [],
        },
        backupsDialog: false,
        addressKeyData: [],
        isBackup: false,//是否已经备份

        isPartake: '0', //设置跨链模式 0:参与跨链 1:不参与跨链
        seedForm: {
          seedList: [],
        },
        seedRules: {
          seedNumber: [
            {validator: validateSeedNumber, trigger: 'blur'}
          ],
        },
        isSeedBackup: false,//种子节点是否备份

        isApply: '0', //节点申请方式 0:云节点 1:自行部署
        applyForm: {
          runTime: '20',
          node: '5',
          netFee: 100,
          seedNode1: '',
          seedNode2: '',
          seedNode3: '',
        },
        applyRules: {},
      };
    },
    components: {
      UploadBar
    },
    watch: {},
    created() {
      this.getAccount(this.accountInfo.address);
      this.addSeedDomain();
    },
    mounted() {
      localStorage.getItem('accountInfo');
    },
    methods: {

      /**
       * @disc: tab选项
       * @date: 2019-10-15 13:41
       * @author: Wave
       */
      handleClick(tab) {
        if (tab.name === 'third') {
          if (this.nodeForm.addressList.length === 0) {
            this.addDomain();
          }
        } else if (tab.name === 'fourth') {
          this.addSeedDomain();
        }
      },

      /**
       * 业务类型下一步
       **/
      stepsNext() {
        this.next();
        console.log(API_COFIG);
        this.infoForm.desc = JSON.stringify(API_COFIG);
      },

      /**
       * 验证名称
       **/
      async changeName() {
        console.log(this.infoForm.name);
        await this.$post('/chain/check', {'chainId': '2', 'address': 'tNULSeBaMvH8TmMZUPQKvc19qeLrD7oN643aBL'})
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      },

      /**
       * 获取logo连接地址
       * @param data
       **/
      getMsgFormSon(data) {
        this.infoForm.logoUrl = data;
        console.log(data);
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
          console.log(res.data);
          if (res.data.success) {
            this.infoForm.name = res.data.result.chainName;
            this.infoForm.logoUrl = res.data.result.logo;
            this.infoForm.prefix = res.data.result.prefix;
            this.infoForm.chainId = res.data.result.chainId;
            let newAssetInfo = res.data.result.assetInfo;
            this.infoForm.symbol = newAssetInfo.symbol;
            this.infoForm.total = divisionDecimals(newAssetInfo.initCoins, newAssetInfo.decimals);
            this.infoForm.decimals = newAssetInfo.decimals;

            this.nodeForm.addressList = JSON.parse(res.data.result.genesisInfo);

            let newConfigInfo = JSON.parse(res.data.result.configInfo);
            this.infoForm.amount = divisionDecimals(newConfigInfo.inflationAmount, newAssetInfo.decimals);
            this.infoForm.totalAmount = divisionDecimals(newConfigInfo.totalInflationAmount, newAssetInfo.decimals);
            this.infoForm.startTime = newConfigInfo.initTime;
            this.infoForm.proportion = newConfigInfo.deflationRatio;
            this.infoForm.intervalTime = newConfigInfo.deflationTimeInterval / 86400;
            this.infoForm.desc = res.data.result.configInfo;
          }
        } catch (err) {
          console.log(err);
        }
      },

      /**
       * 基本信息提交
       **/
      async infoSubmitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            console.log(this.infoForm);
            //this.next();
            const url = API_DATA_URL + 'chain/info/base/save';
            const data = {
              "chainId": this.infoForm.chainId,
              "address": this.accountInfo.address,
              "chainName": this.infoForm.name,
              "type": this.isSteps,
              "prefix": this.infoForm.prefix,
              "logo": this.infoForm.logoUrl,
              "payTimes": 0,
              "nodeCount": 0,
              "payAmount": 0,
              "asset": {
                "assetName": this.infoForm.name,
                "symbol": this.infoForm.symbol,
                "initCoins": timesDecimals(this.infoForm.total, this.infoForm.decimals),
                "decimals": this.infoForm.decimals
              },
              "config": {
                "packingInterval": 10,
                "nodeMaxIn": 20,
                "nodeMaxOut": 50,
                "syncBlockCount": 10,
                "networkPort": 18001,
                "magicNumber": 89898989,
                "inflationAmount": timesDecimals(this.infoForm.amount, this.infoForm.decimals),
                "totalInflationAmount": timesDecimals(this.infoForm.totalAmount, this.infoForm.decimals),
                "initTime": switchMsec(this.infoForm.startTime) / 1000, //时间挫
                "deflationRatio": this.infoForm.proportion,
                "deflationTimeInterval": this.infoForm.intervalTime * 86400 //时间:秒
              }
            };
            console.log(data);
            try {
              let res = await axios.post(url, data, {headers: {'Content-Type': 'application/json;charset=utf-8'}});
              console.log(res);
            } catch (err) {
              return {success: false, data: err}
            }


          } else {
            return false;
          }
        });
      },

      /**
       * 备份私钥
       * @param formName
       * */
      nodeSubmitForm(formName) {
        console.log(formName);
        this.addressKeyData = this.nodeForm.addressList;
        this.backupsDialog = true;
      },

      //移除创世块
      removeDomain(item) {
        let index = this.nodeForm.addressList.indexOf(item);
        if (index !== -1) {
          this.nodeForm.addressList.splice(index, 1)
        }
      },

      //添加创世块
      addDomain() {
        let newAddressInfo = nuls.newAddress(this.infoForm.chainId, '', this.infoForm.prefix);
        this.nodeForm.addressList.push(
          {
            address: newAddressInfo.address,
            coins: '',
            lockTime: Date.now() + 10 * 86400000,
            pri: newAddressInfo.pri,
          }
        );
      },

      /**
       * @disc: 数值改变创世块
       * @date: 2019-10-15 13:52
       * @author: Wave
       */
      changeNumber(e) {
        console.log(e);
        console.log(this.nodeForm.addressList);
      },

      /**
       * @disc: 时间改变创世块
       * @date: 2019-10-15 14:09
       * @author: Wave
       */
      changeTime(e) {
        console.log(e);
        console.log(this.nodeForm.addressList);
      },

      /**
       * @disc: 备份创世块私钥创
       * @params:
       * @date: 2019-10-15 14:13
       * @author: Wave
       */
      backupsNodeList() {
        //let newKeyList = this.addressKeyData.splice(this.addressKeyData.findIndex(item => item.key === data.key), 1);
        let newKeyList = [];
        for (let item of this.addressKeyData) {
          let {key, ...personUnknowKey} = item;
          newKeyList.push(personUnknowKey);
        }
        let FileSaver = require('file-saver');
        let blob = new Blob([JSON.stringify(newKeyList)], {type: "text/plain;charset=utf-8"});
        FileSaver.saveAs(blob, "GenesisAddressList.txt");
        this.backupsDialog = false;
        this.isBackup = true;
      },

      /**
       * @disc:  提交创世块信息
       * @params:
       * @date: 2019-10-15 10:47
       * @author: Wave
       */
      async submintNodeInfo() {
        const url = API_DATA_URL + '/chain/info/genesis/save';
        let newNodeList = [];
        for (let item of this.nodeForm.addressList) {
          let {pri, key, ...personUnknowPri} = item;
          newNodeList.push(personUnknowPri);
        }
        const data = {
          "chainId": this.infoForm.chainId,
          "address": this.accountInfo.address,
          "genesisInfo": newNodeList
        };
        try {
          let res = await axios.post(url, data, {headers: {'Content-Type': 'application/json;charset=utf-8'}});
          console.log(res.data);
        } catch (err) {
          console.log(err)
        }
      },

      //移除种子节点
      removeSeedDomain(item) {
        let index = this.seedForm.seedList.indexOf(item);
        if (index !== -1) {
          this.seedForm.seedList.splice(index, 1)
        }
      },

      //添加种子节点
      addSeedDomain() {
        let newAddressInfo = nuls.newAddress(this.infoForm.chainId, '', this.infoForm.prefix);
        console.log(this.seedForm);
        this.seedForm.seedList.push(
          {
            address: newAddressInfo.address,
            IP: "127.0.0.1",
          }
        );
      },

      /**
       * @disc: 备份种子节点私钥
       * @date: 2019-10-15 16:59
       * @author: Wave
       */
      backupsSeedList() {
        let FileSaver = require('file-saver');
        let blob = new Blob([JSON.stringify(this.seedForm.seedList)], {type: "text/plain;charset=utf-8"});
        FileSaver.saveAs(blob, "SeedAddressList.txt");
        this.isSeedBackup = true;
      },

      /**
       * @disc: 提交链信息
       * @date: 2019-10-15 17:14
       * @author: Wave
       */
      async submintChainInfo() {
        const url = API_DATA_URL + '/chain/info/consensus/save';
        let newSeedList = [];
        for (let item of this.seedForm.seedList) {
          let {pri, ...personUnknowPri} = item;
          newSeedList.push(personUnknowPri);
        }
        const data = {
          "chainId": this.infoForm.chainId,
          "address": this.accountInfo.address,
          "seeds": newSeedList
        };
        try {
          let res = await axios.post(url, data, {headers: {'Content-Type': 'application/json;charset=utf-8'}});
          console.log(res.data);
        } catch (err) {
          console.log(err)
        }
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

  .build {
    .top {
      height: 120px;
      line-height: 100px;
      font-size: 18px;
      font-weight: bold;
    }
    .info {
      min-height: 500px;
      border: @BD1;
      .step {
        margin: 30px 10px;
      }
      .steps {
        margin: 30px 50px 100px;
        text-align: center;
        .btn-next {
          margin: 100px auto 0;
          width: 360px;
        }
      }
      .steps-scene {
        border: @BD1;
        margin: 0 15px 0;
        width: 290px;
        text-align: left;
        cursor: pointer;
        z-index: 3;
        float: left;
        &:first-child {
          margin: 0 15px 0 0;
        }
        &:nth-child(3n) {
          margin: 0 0 0 15px;
        }
        h6 {
          background-color: #dfe4ef;
          font-size: 16px;
          color: #5f6b88;
          line-height: 40px;
          padding: 0 0 0 20px;
          border-bottom: 1px solid #dfe4ef;
        }
        p {
          font-size: 14px;
          padding: 20px;
          color: #8794b1;
          line-height: 20px;
          border-bottom: 1px solid #dfe4ef;
        }
        ul {
          padding: 10px;
          z-index: 2;
          li {
            float: left;
            background-color: #eff1f6;
            color: #7d8599;
            margin: 5px 10px;
            padding: 0 5px;
            font-size: 14px;
            &:hover {
              color: @Ncolour;
              cursor: pointer;
            }
          }
        }
        &:hover {
          border: 1px solid #608fff;
          h6 {
            background-color: #d6e2ff;
            border-bottom: 1px solid #aec6ff;
          }
          p {
            border-bottom: 1px solid #aec6ff;
          }
        }
      }
      .is-active {
        border: 1px solid #608fff;
        h6 {
          background-color: #d6e2ff;
          border-bottom: 1px solid #aec6ff;
        }
        p {
          border-bottom: 1px solid #aec6ff;
        }
      }

      .steps-info {
        width: 555px;
        margin: 30px auto 100px;
        .el-form {
          .el-input__inner {
            border-radius: 2px;
            height: 28px;
            line-height: 28px;
          }
          .el-switch {
            margin: -15px 0 0 0;
          }
          .btn-next {
            width: 360px;
            margin: 0 auto;
          }
        }
      }

      .steps-inflation {
        margin: 30px auto 100px;
        .time {
          .el-date-editor {
            width: 100%;
          }

        }
      }

      .steps-node {
        width: 680px;
        min-height: 120px;
        margin: 30px auto 100px;
        .steps-nodeForm {
          .address {
            margin: 0 0 20px 0;
            height: 130px;
            z-index: 3;
            .node-address {
              line-height: 50px;
              p {
                font-size: 16px;
                color: #17202e;
                float: left;
                margin: 0 0 0 20px;
              }
              span {
                float: right;
                margin: 0 10px 0 0;
                i {
                  font-size: 26px;
                  color: #608FFF;
                }
              }
            }
            .node-form {
              height: 80px;
              margin: 0 0 0 20px;
              .el-form-item {
                width: 300px;
                height: 30px;
                .el-input__inner {
                  line-height: 30px;
                  height: 30px;
                  border-radius: 2px;
                }

              }
              .number {
              }
              .time {
                margin: -15px 20px 0 0;
                .el-form-item__label {
                  float: none;
                }
                .el-input {
                  width: 300px;
                }
              }
            }
          }
          .btn-next {
            z-index: 2;
            //margin: 10px auto 0;
            .btn {
              text-align: center;
              margin: 20px auto 30px !important;
              width: 320px !important;
              padding: 0 !important;
              border-radius: 4px !important;
              height: 40px !important;
              .el-button--default {
                span {
                  color: #17202e;
                }
              }
            }
          }
        }

        .backups-dialog {
          .el-dialog__body {
            background-color: #FFFFFF !important;
            padding: 20px 30px 50px !important;
            h5 {
              line-height: 28px;
            }
            .tc {
              .el-button--success {
                span {
                  color: #ffffff;
                }
              }
            }
          }
        }
      }

      .steps-set {
        .radio {
          margin: 50px auto 20px;
        }
        .tips {
          p {
            margin: 20px auto;
            line-height: 50px;
            font-weight: bold;
          }
        }
        .seed {
          margin: 0 auto;
          .el-form{
            width: 100%;
            .seed_list {
              .node-address {
                line-height: 50px;
                p {
                  font-size: 16px;
                  color: #17202e;
                  float: left;
                  margin: 0 0 0 20px;
                }
                span {
                  float: right;
                  margin: 0 10px 0 0;
                  i {
                    font-size: 26px;
                    color: #608FFF;
                  }
                }
              }
              .node-form{
                width: 100%;
                .number{
                  width: 460px;
                  margin: 0 0 30px 20px;
                }
              }
            }
          }
          .seed_backups{
            width: 320px;
            margin: 20px auto;
            .el-button{
              width: 320px;
            }
          }
        }
        .btn-next {
          .balance {
            font-size: 16px;
            position: inherit;
          }
          .btn {
            text-align: center;
            margin: 20px auto 30px !important;
            width: 320px !important;
            padding: 0 !important;
            border-radius: 4px !important;
            height: 40px !important;
          }
        }
      }

      .steps-apply {
        .radio {
          margin: 50px auto 20px;
          height: 30px;
        }
        .from-div {
          width: 450px;
          margin: 0 auto 50px;
          border-top: @BD1;
          .apply-form {
            padding: 30px 30px 0;
            .cloud-node {
              margin: 0 0 50px 0;
              .el-select {
                width: 100%;
              }
              .el-icon-warning {
                //display: block;
                position: absolute;
                right: -20px;
                top: 35px;
                font-size: 16px;
              }
            }
            .selt-deploy {
              margin: 0 0 50px 0;
            }
            .el-input__inner {
              line-height: 32px;
              height: 32px;
              border-radius: 2px;
            }
          }
        }
      }

      .steps-confirm {
        .w700 {
          width: 700px;
          margin: 50px auto 10px;
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
    .bottoms {
      height: 100px;
      margin: 30px auto 100px;
      line-height: 100px;
      .b-left, .b-right {
        text-align: center;
        width: 48%;
      }
      .b-left {
        .total {
          margin: 0 0 0 280px;
        }
      }
    }
  }

  .el-popper {
    padding: 0;
    border: @BD1;
    border-radius: 2px;
    .detailed {
      h6 {
        font-size: 24px;
        color: #17202e;
        padding: 10px 0 10px 20px;
        margin: 0 0 20px 0;
      }
      p {
        line-height: 28px;
        font-size: 16px;
        padding: 0 0 0 20px;
        u {
          display: block;
          width: 150px;
        }
        span {
          color: #17202e;
        }
      }
      .all {
        border-top: @BD1;
        padding: 5px 0 15px 20px;
        span {
          color: #FD9D2D;
          font-size: 20px;
        }
      }

    }
  }
</style>
