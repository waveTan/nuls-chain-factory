<template>
  <div class="build bg-gray">

    <div class="bg-white top">
      <h3 class="title tc" v-if="packingState ===0">搭建区块链</h3>
      <h3 class="title tc" v-else-if="packingState ===1 || packingState ===3">链工厂正在按照你的配置生产区块链，请稍等</h3>
      <h3 class="title tc" v-else-if="packingState ===2">链信息提交审核失败</h3>
      <h3 class="title tc" v-else-if="packingState ===4">打包失败</h3>
      <h3 class="title tc" v-else-if="packingState ===5">区块链搭建完成</h3>
    </div>
    <div class="w1200 mt_30 bg-white info" v-if="packingState ===0">
      <el-tabs tab-position="left" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="业务场景" name="first">
          <!--选择业务场景-->
          <div class="steps">
            <div class="steps-scene" :class="isSteps===1 ? 'is-active' : ''" @click="choiceSteps(1)">
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
            <div class="steps-scene" :class="isSteps===2 ? 'is-active' : ''" @click="choiceSteps(2)">
              <h6>智能合约版</h6>
              <p>该版本在区块链的分布式记账功能，基础上支持了智能合约的运行，开发者可在该链上开发具有业务逻辑的Dapp</p>
              <ul>
                <li>游戏</li>
                <li>积分系统</li>
                <li>公司治理</li>
                <li>社交应用</li>
              </ul>
            </div>
            <div class="steps-scene" :class="isSteps===3 ? 'is-active' : ''" @click="choiceSteps(3)">
              <h6>POCM版</h6>
              <p>该版本在区块链的分布式记账功能，基础上支持了智能合约的运行，开发者可在该链上开发具有业务逻辑的Dapp</p>
              <ul>
                <li>游戏</li>
                <li>积分系统</li>
                <li>公司治理</li>
                <li>社交应用</li>
              </ul>
            </div>
            <el-button type="success" class="btn-next" @click="toUrl('newAddress')" v-if="!accountInfo.address">
              登录
            </el-button>
            <el-button type="success" class="btn-next" @click="submitSteps" v-else>提交业务场景</el-button>
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
                <UploadBar :imgUrl="infoForm.logoUrl" @func="getMsgFormSon"></UploadBar>
              </el-form-item>
              <el-form-item label="地址前缀" prop="prefix">
                <el-input v-model="prefixToUpperCase"></el-input>
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
              <el-form-item label="高级" v-show="false">
                <el-switch v-model="infoForm.senior"></el-switch>
              </el-form-item>
              <!--<el-form-item label="" v-show="infoForm.senior">-->
              <el-form-item label="" v-show="false">
                <el-input type="textarea" :rows="5" v-model="infoForm.desc"></el-input>
              </el-form-item>
              <el-form-item class="tc">
                <el-button type="success" class="btn-next" @click="toUrl('newAddress')" v-if="!accountInfo.address">
                  登录
                </el-button>
                <el-button type="primary" class="btn-next" @click="infoSubmitForm('infoForm')" v-else>提交基本信息</el-button>
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
                    <el-input type="number" v-model.number="domain.coins"></el-input>
                  </el-form-item>
                  <el-form-item label="锁定时间" class="time fr">
                    <el-date-picker v-model="domain.lockTime" value-format="timestamp" type="datetime"
                                    placeholder="选择日期时间"
                                    default-time="12:00:00">
                    </el-date-picker>
                  </el-form-item>
                </div>
              </el-col>
              <el-form-item class="btn-next cb">
                <div class="btn">
                  <el-button type="success" @click="nodeSubmitForm('nodeForm')">备份地址私钥</el-button>
                </div>
                <div class="btn">
                  <el-button type="success" class="btn-next" @click="toUrl('newAddress')" v-if="!accountInfo.address">
                    登录
                  </el-button>
                  <el-button @click="submintNodeInfo" :disabled="!isBackup" v-else>提交创世块信息</el-button>
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
        <el-tab-pane label="配置种子节点" name="fourth">
          <!--链信息-->
          <el-row class="steps-set">
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
                      <el-input v-model="domain.ip"></el-input>
                    </el-form-item>
                  </div>
                </el-col>
              </el-form>
              <div class="seed_backups">
                <el-button @click="backupsSeedList" type="success">下载共识节点出块地址私钥</el-button>
              </div>
            </div>
            <div class="btn-next tc">
              <div class="btn">
                <el-button type="success" class="btn-next" @click="toUrl('newAddress')" v-if="!accountInfo.address">
                  登录
                </el-button>
                <el-button type="success" @click="submintChainInfo" :disabled="!isSeedBackup" v-else>提交链信息</el-button>
              </div>
            </div>

          </el-row>
        </el-tab-pane>
        <el-tab-pane label="确认订单" name="five">
          <!--确认订单-->
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
                <p class="cb"><span class="fl">地址前缀</span><font class="fl">{{infoForm.prefix.toUpperCase()}}</font></p>
                <p class="cb"><span class="fl">通证名称</span><font class="fl">{{infoForm.symbol}}</font></p>
                <p class="cb"><span class="fl">精度</span><font class="fl">{{infoForm.decimals}}</font></p>
                <p class="cb"><span class="fl">总发行量</span><font class="fl">{{infoForm.total}}</font></p>
              </div>

              <div class="title bg-gray">
                创世块 <span class="yellow font12" v-show="nodeForm.addressList.length===0">(请配置创世块)</span>
              </div>
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

              <div class="title bg-gray">
                种子节点
                <span class="yellow font12" v-show="seedForm.seedList.length ===0">(请配置种子节点)</span>
              </div>
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

              <div class="title bg-gray" v-show="false">节点</div>
              <div class="infos" v-show="false">
                <p class="cb"><span class="fl">模式</span><font class="fl"> {{isApply=== '0' ? '云节点运行':'自行部署' }}</font>
                </p>
                <div v-show="isApply=== '0'">
                  <p class="cb"><span class="fl">运行时间</span><font class="fl">{{applyForm.runTime}}个月</font></p>
                  <p class="cb"><span class="fl">共识节点</span><font class="fl">{{applyForm.node}}个</font></p>
                  <p class="cb"><span class="fl">费用</span><font class="fl">{{applyForm.netFee}} <font
                          class="fCN">NULS</font></font></p>
                </div>

              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <div class="packing bg-white" v-else>
      <div class="tc" v-show="packingState !==5">
        <img src="./../../assets/img/packing.png"/>
      </div>
      <div class="font16 tc" v-show="packingState ===3">
        链打包中...<i class="el-icon-loading"></i>
      </div>
      <ul class="w1200" v-show="packingState ===5">
        <li class="bg-gray">
          <h6><img src="./../../assets/img/client.png"/></h6>
          <p>可通过该客户端创建共识节点，维护网络XXX的区块链网络</p>
          <el-button type="success" class="btn-next" @click="download(downloadList.walletProUrl)">下 载</el-button>
        </li>
        <li class="bg-gray" v-show="false">
          <h6><img src="./../../assets/img/wallet.png"/></h6>
          <p>可通过轻钱包连接本地或网络中可信任节点客户端，进行资产的转入转出等操作</p>
          <el-button type="success" class="btn-next" @click="download(downloadList.walletUrl)">下 载</el-button>
        </li>
        <li class="bg-gray">
          <h6><img src="./../../assets/img/browser.png"/></h6>
          <p>可通过该浏览器查看XXX网络中的账户，交易等信息</p>
          <el-button type="success" class="btn-next" @click="download(downloadList.walletUrl)">下 载</el-button>
        </li>
      </ul>
    </div>

    <div class="w1200 bg-white bottoms cb" v-show="activeName ==='five'">
      <div class="b-left fl">
        <div class="fl total">
          <p>总费用: <span class="yellow">{{ isPartake ? 1000: 200}}</span><font class="fCN">&nbsp;NULS</font></p>
        </div>
        <el-popover placement="top" width="320" trigger="click" class="popover">
          <div class="detailed">
            <h6 class="bg-gray">账单明细</h6>
            <p class="cb">
              <u class="fl gray">创建基本信息</u>
              <span class="fl">{{isPartake ? 0:200 }}</span>
              <font class="fCN">&nbsp;NULS</font>
            </p>
            <p class="cb">
              <el-checkbox v-model="isPartake" class="partake fl"></el-checkbox>
              <u class="fl gray">跨链抵押</u>
              <span class="fl">{{isPartake? 1000:0 }} </span>
              <font class="fCN">&nbsp;NULS</font>
            </p>
            <!--<p class="cb"><u class="fl gray">运行3个种子节点</u><span class="fl">0.01</span><font class="fCN">&nbsp;NULS</font>
            </p>
            <p class="cb"><u class="fl gray">运行5个共识节点</u><span class="fl">0.01</span><font class="fCN">&nbsp;NULS</font>
            </p>-->
            <p class="cb all">
              <u class="fl gray">总计</u>
              <span class="yellow fl">{{ isPartake ? 1000: 200}}</span>
              <font class="fCN">&nbsp;NULS</font></p>
          </div>
          <el-link :underline="false" type="primary" slot="reference">明细</el-link>
        </el-popover>

      </div>
      <div class="b-right fr">
        <el-button type="success" class="btn-next" @click="toUrl('newAddress')" v-if="!accountInfo.address">
          登录
        </el-button>
        <el-button type="success" @click="confirm" :disabled="isSubmit" v-else>确认订单</el-button>
      </div>
    </div>
    <Password ref="password" @passwordSubmit="passSubmit">
    </Password>
  </div>

</template>

<script>
  import nuls from 'nuls-sdk-js'
  import axios from 'axios'
  import {MAIN_INFO, API_PREFIX, API_COFIG, API_DATA_URL, API_DOWNLOAD_URL, API_BURNING_ADDRESS_PUB} from '@/config'
  import {timesDecimals, divisionDecimals, switchMsec, passwordVerification, stringLength} from '@/api/util'
  import {
    transferTransaction,
    validateAndBroadcast,
    mutiInputsOrOutputs,
    getBalanceOrNonceByAddress,
    countFee
  } from '@/api/requestData'
  import UploadBar from '@/components/UploadBar';
  import Password from '@/components/PasswordBar'

  export default {
    data() {
      let validateName = async (rule, value, callback) => {
        const regular = /^[a-zA-Z0-9_]{3,30}$/;
        if (value === '') {
          callback(new Error('请输入链名称'));
        } else if (!regular.exec(value)) {
          callback(new Error('链名称长度为3-30英文加数字'));
        } else {
          let availabilityChangeName = await this.changeName(value, this.infoForm.chainId ? this.infoForm.chainId : 0);
          if (availabilityChangeName.success) {
            callback();
          } else {
            callback(new Error('链名称已经被占用，请更换'));
          }
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
        const regular = /^[a-zA-Z_]{1,5}$/;
        if (value === '') {
          callback(new Error('请输入地址前缀'));
        } else if (!regular.exec(value)) {
          callback(new Error('地址前缀长度为1-5英文'));
        } else {
          callback();
        }
      };
      let validateSymbol = (rule, value, callback) => {
        const regular = /^[a-zA-Z_]{2,10}$/;
        if (!value) {
          return callback(new Error('请输入通证简称'));
        } else if (!regular.exec(value)) {
          callback(new Error('通证简称长度为2-10英文'));
        } else {
          callback();
        }
      };
      let validateTotal = (rule, value, callback) => {
        const regular = /^[1-9]\d*$/;
        if (!value) {
          return callback(new Error('请输入发行总量'));
        } else if (!regular.exec(value)) {
          callback(new Error('发行总量大于0的正整数'));
        } else {
          callback();
        }
      };
      let validateDecimals = (rule, value, callback) => {
        const regular = /^([0-9]|16)$/;
        if (!value) {
          return callback(new Error('请输入精度系数'));
        } else if (!regular.exec(value)) {
          callback(new Error('精度系数为0-16的正整数'));
        } else {
          callback();
        }
      };
      let validateAmount = (rule, value, callback) => {
        const regular = /^[1-9]\d*$/;
        if (!value) {
          return callback(new Error('请输入通货膨胀金额'));
        } else if (!regular.exec(value)) {
          callback(new Error('通货膨胀金额大于0的正整数'));
        } else {
          callback();
        }
      };
      let validateTotalAmount = (rule, value, callback) => {
        const regular = /^[1-9]\d*$/;
        if (!value) {
          return callback(new Error('请输入总通货膨胀金额'));
        } else if (!regular.exec(value)) {
          callback(new Error('总通货膨胀金额大于0的正整数'));
        } else {
          callback();
        }
      };
      let validateIntervalTime = (rule, value, callback) => {
        const regular = /^[1-9]\d*$/;
        if (!value) {
          return callback(new Error('请输入间隔时间'));
        } else if (!regular.exec(value)) {
          callback(new Error('间隔时间大于0的正整数'));
        } else {
          callback();
        }
      };
      let validateProportion = (rule, value, callback) => {
        const regular = /^([1-9][0-9]{0,1}|100)$/;
        if (!value) {
          return callback(new Error('请输入通缩比例'));
        } else if (!regular.exec(value)) {
          callback(new Error('通缩比例1-100的正整数'));
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
        activeName: 'first',
        isSteps: 1,//业务场景选中模块

        //基本信息表单
        infoForm: {
          name: '',
          logoUrl: '',
          prefix: '',
          symbol: '',
          total: '',
          decimals: '',
          amount: '',
          totalAmount: '',
          startTime: '',
          proportion: '',
          intervalTime: '',
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
        infoFormOld: {},//旧的基本信息
        infoFormChange: false,//判断基本信息是否有改变

        //创世块表单
        nodeForm: {
          addressList: [],
        },
        backupsDialog: false,
        addressKeyData: [],
        isBackup: false,//是否已经备份

        isPartake: true, //设置跨链模式 false:不参与跨链 true:参与跨链
        seedForm: {
          seedList: [],
        },
        seedRules: {
          seedNumber: [
            {validator: validateSeedNumber, trigger: 'blur'}
          ],
        },
        isSeedBackup: false,//种子节点是否备份

        isSubmit: true,//提交订单是否禁用

        destroyAddress: '',//搭建链转账地址
        packingState: 0,//打包状态 0未提交 1已提交  2提交审核失败  3打包中 4打包失败  5打包成功

        downloadList: {
          walletUrl: '',
          walletProUrl: '',
        }, //下载地址

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
      Password,
      UploadBar
    },
    computed: {
      prefixToUpperCase: {
        get: function () {
          return this.infoForm.prefix;
        },
        set: function (val) {
          this.infoForm.prefix = val.toUpperCase();
        }
      }
    },
    watch: {
      'infoForm.name'(newVal) {
        if (newVal !== this.infoFormOld.chainName) {
          this.infoFormChange = true;
        }
      },
      'infoForm.prefix'(newVal) {
        if (newVal !== this.infoFormOld.prefix) {
          this.infoFormChange = true;
        }
      },
      'infoForm.symbol'(newVal) {
        let newAssetInfo = this.infoFormOld.assetInfo;
        if (newVal !== newAssetInfo.symbol) {
          this.infoFormChange = true;
        }
      },
      'infoForm.total'(newVal) {
        let newAssetInfo = this.infoFormOld.assetInfo;
        if (newVal !== divisionDecimals(newAssetInfo.initCoins, newAssetInfo.decimals)) {
          this.infoFormChange = true;
        }
      },
      'infoForm.decimals'(newVal) {
        let newAssetInfo = this.infoFormOld.assetInfo;
        if (newVal !== newAssetInfo.decimals) {
          this.infoFormChange = true;
        }
      },
    },
    created() {
      if (this.accountInfo.address) {
        this.getAccount(this.accountInfo.address);
      }
      this.getDestroyAddress();
    },
    mounted() {
      setInterval(() => {
        if (this.packingState === 3 || this.packingState === 1) {
          this.getAccount(this.accountInfo.address);
        }
      }, 60000);
    },
    methods: {

      /**
       * @disc: tab选项
       * @date: 2019-10-15 13:41
       * @author: Wave
       */
      handleClick(tab) {
        if (tab.name === 'third') {
          this.nodeForm.addressList = this.infoFormOld.genesisInfo ? JSON.parse(this.infoFormOld.genesisInfo) : [];
          if (this.nodeForm.addressList.length === 0) {
            this.addDomain();
          }
        } else if (tab.name === 'fourth') {
          this.seedForm.seedList = this.infoFormOld.seeds ? JSON.parse(this.infoFormOld.seeds) : [];
          if (this.seedForm.seedList.length === 0) {
            this.addSeedDomain();
          }
        } else if (tab.name === 'five') {
          this.getDestroyAddress();
          this.nodeForm.addressList = this.infoFormOld.genesisInfo ? JSON.parse(this.infoFormOld.genesisInfo) : [];
          this.seedForm.seedList = this.infoFormOld.seeds ? JSON.parse(this.infoFormOld.seeds) : [];
          if (this.nodeForm.addressList.length > 0 && this.seedForm.seedList.length > 0) {
            this.isSubmit = false;
          }
        }
      },

      /**
       * @disc: 选择业务类型
       * @params:e
       * @date: 2019-10-16 11:49
       * @author: Wave
       */
      choiceSteps(e) {
        this.isSteps = e;
      },

      /**
       * @disc:确定业务场景
       * @date: 2019-10-16 14:03
       * @author: Wave
       */
      submitSteps() {
        this.activeName = 'second';
      },

      /**
       * @disc: 检查chainName是否被占用
       * @params: chainName 链名称
       * @params: chainId 链ID
       * @date: 2019-10-30 17:52
       * @author: Wave
       */
      async changeName(chainName, chainId) {
        const url = API_DATA_URL + 'chain/name/check';
        const data = {"chainName": chainName, chainId: chainId};
        try {
          let res = await axios.post(url, data, {headers: {'Content-Type': 'application/json;charset=utf-8'}});
          //console.log(res.data);
          if (res.data.success) {
            return {success: true}
          } else {
            return {success: false}
          }
        } catch (err) {
          console.log(err);
          return {success: false}
        }
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
          //console.log(res.data);
          if (res.data.success) {
            if (!res.data.hasOwnProperty('result')) {
              this.packingState = 0;
              this.activeName = 'first';
            } else {
              this.infoFormOld = res.data.result;
              this.packingState = res.data.result.status;
              if (this.packingState === 5) {
                this.getDownloadByChainid(res.data.result.chainId);
              }
              this.infoForm.name = res.data.result.chainName;
              this.infoForm.logoUrl = res.data.result.logo;
              this.infoForm.prefix = res.data.result.prefix.toUpperCase();
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
            }
          } else {
            this.$message({message: '获取账户信息错误:' + JSON.stringify(res.data.error), type: 'error', duration: 3000});
          }
        } catch (err) {
          this.$message({message: '获取账户信息异常:' + err, type: 'error', duration: 3000});
        }
      },

      /**
       * @disc: 获取下载信息
       * @params: chainId
       * @date: 2019-10-14 11:38
       * @author: Wave
       */
      async getDownloadByChainid(chainId) {
        const url = API_DATA_URL + 'chain/get/download/' + chainId;
        try {
          let res = await
            axios.post(url);
          //console.log(res.data);
          if (res.data.success) {
            this.downloadList.walletUrl = API_DOWNLOAD_URL + res.data.result.wallet;
            this.downloadList.walletProUrl = API_DOWNLOAD_URL + res.data.result.wallet_pro;
          } else {
            this.$message({message: '获取下载信息错误', type: 'error', duration: 3000});
          }
        } catch (err) {
          this.$message({message: '获取下载信息异常:' + err, type: 'error', duration: 3000});
        }
      },

      /**
       * @disc: 提交基本信息
       * @params: formName
       * @date: 2019-10-16 15:39
       * @author: Wave
       **/
      async infoSubmitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            if (this.infoFormChange) {
              this.$confirm('链基本信息发生改变，创世块及种子节点将被重置', '提示', {
                confirmButtonText: '确定修改',
                cancelButtonText: '取消修改',
                type: 'warning'
              }).then(() => {
                this.chainInfoBaseSave();
                this.nodeForm.addressList = [];
                this.seedForm.seedList = [];
              }).catch(() => {
                this.getAccount(this.accountInfo.address);
              });
            } else {
              this.chainInfoBaseSave();
            }
          } else {
            return false;
          }
        });
      },

      /**
       * @disc: 提交基本信息具体方法
       * @date: ] 16:46
       * @author: Wave
       */
      async chainInfoBaseSave() {
        const url = API_DATA_URL + 'chain/info/base/save';
        const data = {
          "chainId": this.infoForm.chainId ? this.infoForm.chainId : 0,
          "address": this.accountInfo.address,
          "chainName": this.infoForm.name,
          "type": Number(this.isSteps),
          "prefix": this.infoForm.prefix.toUpperCase(),
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
            "packingInterval": JSON.parse(this.infoForm.desc).packingInterval,
            "nodeMaxIn": JSON.parse(this.infoForm.desc).nodeMaxIn,
            "nodeMaxOut": JSON.parse(this.infoForm.desc).nodeMaxOut,
            "syncBlockCount": JSON.parse(this.infoForm.desc).syncBlockCount,
            "networkPort": JSON.parse(this.infoForm.desc).networkPort,
            "magicNumber": JSON.parse(this.infoForm.desc).magicNumber === 100 ? Math.floor(Math.random() * 100000000) : JSON.parse(this.infoForm.desc).magicNumber,
            "inflationAmount": timesDecimals(this.infoForm.amount, this.infoForm.decimals),
            "totalInflationAmount": timesDecimals(this.infoForm.totalAmount, this.infoForm.decimals),
            "initTime": switchMsec(this.infoForm.startTime) / 1000, //时间挫
            "deflationRatio": this.infoForm.proportion,
            "deflationTimeInterval": this.infoForm.intervalTime * 86400 //时间:秒
          }
        };
        try {
          let res = await axios.post(url, data, {headers: {'Content-Type': 'application/json;charset=utf-8'}});
          //console.log(res);
          if (res.data.success) {
            this.getAccount(this.accountInfo.address);
            this.activeName = 'third';
            if (this.nodeForm.addressList.length === 0) {
              this.addDomain();
            }
          } else {
            this.$message({message: '基本信息提交错误:' + JSON.stringify(res.data.error), type: 'error', duration: 3000});
          }
        } catch (err) {
          this.$message({message: '基本信息提交异常:' + JSON.stringify(err), type: 'error', duration: 3000});
        }
      },

      /**
       * 备份创世块私钥
       * */
      nodeSubmitForm() {
        let total = 0;
        for (let item of this.nodeForm.addressList) {
          let reg = /^[0-9]*$/;
          if (!reg.exec(item.coins)) {
            this.$message({message: '请输入有效的整数', type: 'error', duration: 3000});
            return;
          } else {
            total = total + Number(item.coins);
          }
        }
        if (total !== Number(this.infoForm.total)) {
          this.$message({message: '创世块总和不等于发现总量', type: 'error', duration: 3000});
          return;
        }
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
        let newAddressInfo = nuls.newAddress(this.infoForm.chainId, '', this.infoForm.prefix.toUpperCase());
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
       * @disc: 下载创世块私钥
       * @date: 2019-10-15 14:13
       * @author: Wave
       */
      backupsNodeList() {
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
        const url = API_DATA_URL + 'chain/info/genesis/save';
        let newNodeList = [];
        for (let item of this.nodeForm.addressList) {
          let {pri, ...personUnknowPri} = item;
          newNodeList.push(personUnknowPri);
        }
        const data = {
          "chainId": this.infoForm.chainId,
          "address": this.accountInfo.address,
          "genesisInfo": newNodeList
        };
        //console.log(url, data);
        try {
          let res = await
            axios.post(url, data, {headers: {'Content-Type': 'application/json;charset=utf-8'}});
          //console.log(res.data);
          if (res.data.success) {
            this.getAccount(this.accountInfo.address);
            this.activeName = 'fourth';
            if (this.seedForm.seedList.length === 0) {
              this.addSeedDomain();
            }
          } else {
            this.$message({message: '提交创世块信息错误', type: 'error', duration: 3000});
          }
        } catch (err) {
          this.$message({message: '提交创世块信息异常:' + err, type: 'error', duration: 3000});
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
        let newAddressInfo = nuls.newAddress(this.infoForm.chainId, '', this.infoForm.prefix.toUpperCase());
        //console.log(newAddressInfo);
        this.seedForm.seedList.push(
          {
            address: newAddressInfo.address,
            pri: newAddressInfo.pri,
            pub: newAddressInfo.pub,
            ip: "127.0.0.1",
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
       * @disc: 提交种子节点信息
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
          let res = await
            axios.post(url, data, {headers: {'Content-Type': 'application/json;charset=utf-8'}});
          //console.log(res.data);
          if (res.data.success) {
            this.getAccount(this.accountInfo.address);
            this.activeName = 'five';
            if (this.nodeForm.addressList.length > 0 && this.seedForm.seedList.length > 0) {
              this.isSubmit = false;
            }
          } else {
            this.$message({message: '提交共识信息错误', type: 'error', duration: 3000});
          }
        } catch (err) {
          this.$message({message: '提交共识信息异常:' + err, type: 'error', duration: 3000});
        }
      },

      /**
       * @disc: 获取转账地址
       * @date: 2019-10-14 11:38
       * @author: Wave
       */
      async getDestroyAddress() {
        const url = API_DATA_URL + 'account/get/normal/destroyAddress';
        try {
          let res = await
            axios.get(url);
          //console.log(res.data);
          if (res.data.success) {
            this.destroyAddress = res.data.result.address
          }
        } catch (err) {
          console.log(err);
        }
      },

      /**
       * @disc: 确认订单
       * @date: 2019-10-16 10:39
       * @author: Wave
       */
      confirm() {
        let minBalance = this.isPartake ? 1000 : 200;
        if (this.accountInfo.balance < minBalance) {
          this.$message({message: '对不起，您的余额不足，搭建链需要消耗' + minBalance + 'NULS', type: 'error', duration: 3000});
        } else {
          this.$refs.password.showPassword(true);
        }
      },

      /**
       * @disc: 组装跨链模式交易
       * @params:
       * @date: 2019-10-18 16:14
       * @author: Wave
       */
      async registerChainAndAsset(mainInfo, addressInfo, chainInfo, assetInfo) {
        const balanceInfo = await
          getBalanceOrNonceByAddress(mainInfo.chainId, mainInfo.assetsId, addressInfo.address);

        if (!balanceInfo.success) {
          console.log("获取账户余额错误:" + balanceInfo.data);
          return
        }

        let transferInfo = {
          assetsChainId: 2,
          assetsId: 1,
          fee: 100000,
          from: {
            fromAddress: addressInfo.address,
            amount: 100000000000
          },
          to: [{
            toAddress: addressInfo.address,
            amount: 80000000000,
            loctTime: -1
          }, {
            toAddress: nuls.getAddressByPub(MAIN_INFO.chainId, MAIN_INFO.assetsId, API_BURNING_ADDRESS_PUB, API_PREFIX),
            amount: 20000000000
          }]
        };
        //console.log(transferInfo);
        let inOrOutputs = await
          mutiInputsOrOutputs(transferInfo, balanceInfo.data, 11);
        //console.log(inOrOutputs);
        let tAssemble = [];//交易组装
        let txhex = "";//交易签名
        if (inOrOutputs.success) {
          let txData = {
            address: addressInfo.address,
            chainInfo: chainInfo,
            assetInfo: assetInfo
          };
          //console.log(txData);
          tAssemble = await
            nuls.transactionAssemble(inOrOutputs.data.inputs, inOrOutputs.data.outputs, '', 11, txData);
          //获取手续费
          let newFee = countFee(tAssemble, 1);
          //手续费大于0.001的时候重新组装交易及签名
          if (transferInfo.fee !== newFee) {
            transferInfo.fee = newFee;
            inOrOutputs = await
              mutiInputsOrOutputs(transferInfo, balanceInfo.data, 11);
            tAssemble = await
              nuls.transactionAssemble(inOrOutputs.data.inputs, inOrOutputs.data.outputs, '', 11, txData);
            txhex = await
              nuls.transactionSerialize(addressInfo.pri, addressInfo.pub, tAssemble);
          } else {
            txhex = await
              nuls.transactionSerialize(addressInfo.pri, addressInfo.pub, tAssemble);
          }
        } else {
          return {success: false, data: inOrOutputs.data};
        }
        return {success: true, data: txhex};
      },

      /**
       * @disc: 输入密码框提交
       * @params: password
       * @date: 2019-09-02 10:49
       * @author: Wave
       */
      async passSubmit(password) {
        let isPassword = passwordVerification(this.accountInfo, password);
        if (isPassword.success) {
          let amount = timesDecimals(200);
          let remark = '';
          let newTxhex = '';
          if (this.isPartake) {
            let chainInfo = {
              chainId: this.infoForm.chainId,
              addressType: "1", //1 使用NULS框架构建的链 生态内，2生态外"
              chainName: this.infoForm.name,
              addressPrefix: this.infoForm.prefix.toUpperCase(),
              magicNumber: JSON.parse(this.infoForm.desc).magicNumber,
              supportInflowAsset: true,
              verifierList: this.seedForm.seedList,
              minAvailableNodeNum: 3,
              maxSignatureCount: 200,
              signatureBFTRatio: 66
            };
            let assetInfo = {
              assetId: 1,
              symbol: this.infoForm.symbol,
              assetName: this.infoForm.name,
              initNumber: this.infoForm.amount,
              decimalPlaces: this.infoForm.decimals
            };
            newTxhex = await
              this.registerChainAndAsset(MAIN_INFO, isPassword, chainInfo, assetInfo);
          } else {
            newTxhex = await
              transferTransaction(isPassword.pri, isPassword.pub, isPassword.address, this.destroyAddress, MAIN_INFO.chainId, MAIN_INFO.assetsId, amount, remark);
          }
          console.log(newTxhex);
          if (!newTxhex.success) {
            this.$message({message: '搭建链交易签名错误:' + newTxhex.data, type: 'error', duration: 3000});
            return
          }
          let newHash = await
            validateAndBroadcast(newTxhex.data);
          console.log(newHash);
          if (!newHash.success) {
            this.$message({message: '搭建链转账验证广播交易错误:' + JSON.stringify(newHash.data), type: 'error', duration: 3000});
            return
          }
          this.submintOrder(newHash.hash);
        }
      },

      /**
       * @disc: 提交订单
       * @date: 2019-10-15 17:14
       * @author: Wave
       */
      async submintOrder(txHash) {
        const url = API_DATA_URL + 'chain/info/submit';
        const data = {
          "chainId": this.infoForm.chainId,
          "address": this.accountInfo.address,
          "isCross": this.isPartake,
          "txHash": txHash
        };
        try {
          let res = await
            axios.post(url, data, {headers: {'Content-Type': 'application/json;charset=utf-8'}});
          if (res.data.success) {
            this.getAccount(this.accountInfo.address);
            this.activeName = 'first';
          } else {
            this.$message({message: '提交订单错误', type: 'error', duration: 3000});
          }
        } catch (err) {
          this.$message({message: '提交订单异常:' + err, type: 'error', duration: 3000});
        }
      },

      /**
       * @disc: 下载文件
       * @params: url
       * @date: 2019-10-16 18:03
       * @author: Wave
       */
      download(url) {
        window.open(url);
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
          .el-form {
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
              .node-form {
                width: 100%;
                .number {
                  width: 460px;
                  margin: 0 0 30px 20px;
                }
              }
            }
          }
          .seed_backups {
            width: 320px;
            margin: 20px auto;
            .el-button {
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
                  width: 460px;

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
    .packing {
      width: 100%;
      min-height: 30rem;
      ul {
        li {
          float: left;
          width: 30%;
          margin: 0 2.5% 0;
          text-align: center;
          &:first-child {
            margin-left: 0;
          }
          &:last-child {
            margin-right: 0;
          }
          h6 {
            margin: 20px 0 0 0;
            img {
              width: 60px;
              height: 60px;
            }
          }
          p {
            padding: 20px;
            text-align: left;
          }
          .btn-next {
            margin: 0 auto 30px;
            width: 60%;
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
        padding: 10px 0 10px 30px;
        margin: 0 0 20px 0;
      }
      p {
        line-height: 28px;
        font-size: 16px;
        padding: 0 0 0 30px;
        u {
          display: block;
          width: 150px;
        }
        span {
          color: #17202e;
        }
        .partake {
          margin-left: -20px;
        }
      }
      .all {
        border-top: @BD1;
        padding: 5px 0 15px 30px;
        span {
          color: #FD9D2D;
          font-size: 20px;
        }
      }

    }
  }
</style>
