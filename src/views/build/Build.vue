<template>
  <div class="build bg-gray">
    <div class="bg-white top">
      <h3 class="title">搭建区块链</h3>
    </div>

    <div class="w1200 mt_30 bg-white info">
      <el-steps :active="stepsActive" finish-status="success">
        <el-step title="选择业务场景" icon="el-icon-edit"></el-step>
        <el-step title="填写基本信息" icon="el-icon-edit-outline"></el-step>
        <el-step title="配置经济模型" icon="el-icon-tickets"></el-step>
        <el-step title="配置创世块" icon="el-icon-folder"></el-step>
        <el-step title="设置跨链" icon="el-icon-folder-add"></el-step>
        <!-- <el-step title="申请节点" icon="el-icon-tickets"></el-step>-->
        <el-step title="确认订单" icon="el-icon-monitor"></el-step>
      </el-steps>

      <!--选择业务场景-->
      <div class="steps" v-show="stepsActive ===0">
        <div class="steps-scene" :class="isSteps===1 ? 'is-active' : ''" @click="changeSteps(1)">
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
        <div class="steps-scene" :class="isSteps===2 ? 'is-active' : ''" @click="changeSteps(2)">
          <h6>智能合约版</h6>
          <p>该版本在区块链的分布式记账功能，基础上支持了智能合约的运行，开发者可在该链上开发具有业务逻辑的Dapp</p>
          <ul>
            <li>游戏</li>
            <li>积分系统</li>
            <li>公司治理</li>
            <li>社交应用</li>
          </ul>
        </div>
        <div class="steps-scene" :class="isSteps===3 ? 'is-active' : ''" @click="changeSteps(3)">
          <h6>POCM版</h6>
          <p>该版本在区块链的分布式记账功能，基础上支持了智能合约的运行，开发者可在该链上开发具有业务逻辑的Dapp</p>
          <ul>
            <li>游戏</li>
            <li>积分系统</li>
            <li>公司治理</li>
            <li>社交应用</li>
          </ul>
        </div>
        <div class="steps-scene" :class="isSteps===4 ? 'is-active' : ''" @click="changeSteps(4)" v-show="false">
          <h6>自定义版本</h6>
          <p>该版本可将业务逻辑以模块的形式独立并置于区块链底层，该版本正在内测中，请耐心等待...</p>
          <ul>
            <li>业务场景</li>
            <li>根据实际业务进行定制</li>
          </ul>
        </div>
        <el-button type="success" class="btn-next" @click="stepsNext">下一步</el-button>
      </div>

      <!--填写基本信息-->
      <el-row class="steps-info" v-show="stepsActive ===1">
        <el-form :model="infoForm" :rules="infoRules" ref="infoForm" status-icon class="steps-infoForm"
                 :hide-required-asterisk="true">
          <el-form-item label="链名称" prop="name">
            <el-input v-model="infoForm.name" @change="changeName">
            </el-input>
          </el-form-item>
          <el-form-item label="链Logo" prop="logoUrl">
            <UploadBar @func="getMsgFormSon"></UploadBar>
          </el-form-item>
          <el-form-item label="通证简称" prop="symbol">
            <el-input v-model="infoForm.symbol"></el-input>
          </el-form-item>
          <el-form-item label="发行总量" prop="total">
            <el-input v-model="infoForm.total"></el-input>
          </el-form-item>
          <el-form-item label="精度" prop="precision">
            <el-input v-model="infoForm.precision"></el-input>
          </el-form-item>
          <el-form-item label="高级" prop="delivery">
            <el-switch v-model="infoForm.senior"></el-switch>
          </el-form-item>
          <el-form-item label="" prop="desc" v-show="infoForm.senior">
            <el-input type="textarea" :rows="5" v-model="infoForm.desc"></el-input>
          </el-form-item>
          <el-form-item class="btn-next tc">
            <el-button type="success" @click="infoSubmitForm('infoForm')">下一步</el-button>
          </el-form-item>
        </el-form>
      </el-row>

      <!--通胀模型-->
      <div class="steps-inflation" v-show="stepsActive ===2">
        <div class="from-div cb w630">
          <el-form :model="inflationForm" :rules="inflationRules" ref="inflationForm" class="inflation-form">
            <el-form-item label="通胀金额" prop="netFee">
              <el-input v-model="inflationForm.amount" placeholder="初始通胀金额">
              </el-input>
            </el-form-item>
            <el-form-item label="开始时间" prop="seedNode1">
              <div class="cd time">
                <el-date-picker v-model="inflationForm.startTime" type="datetime" placeholder="通胀开始计算时间">
                </el-date-picker>
              </div>
            </el-form-item>
            <el-form-item label="通缩比例" prop="seedNode2">
              <el-input v-model="inflationForm.proportion" placeholder="通缩比例">
              </el-input>
            </el-form-item>
            <el-form-item label="间隔时间/天" prop="seedNode3">
              <el-input v-model="inflationForm.intervalTime" placeholder="通缩间隔时间">
              </el-input>
            </el-form-item>
            <el-form-item class="btn-next tc">
              <el-button type="success" @click="inflationSubmitForm('inflationForm')">下一步</el-button>
            </el-form-item>
          </el-form>
        </div>

      </div>

      <!--配置创世块-->
      <el-row class="steps-node" v-show="stepsActive ===3">
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
              <el-form-item label="通证数量" prop="pass" class="number fl">
                <el-input v-model.number="domain.number" type="number"></el-input>
              </el-form-item>
              <el-form-item label="锁定时间" prop="pass" class="time fr">
                <el-date-picker v-model="domain.time" type="datetime" placeholder="选择日期时间" default-time="12:00:00">
                </el-date-picker>
              </el-form-item>
            </div>
          </el-col>
          <el-form-item class="btn-next cb">
            <div class="btn">
              <el-button type="success" @click="nodeSubmitForm('nodeForm')">备份地址私钥</el-button>
            </div>
            <div class="btn">
              <el-button @click="nodeNext">下一步</el-button>
            </div>
          </el-form-item>
        </el-form>

        <el-dialog title="备份地址私钥列" :visible.sync="backupsDialog" width="80%" class="backups-dialog">
          <el-table :data="addressKeyData" border>
            <el-table-column type="index" label="序号" width="50">
            </el-table-column>
            <el-table-column property="address" label="地址" width="400">
            </el-table-column>
            <el-table-column property="pri" label="私钥" min-width="300">
            </el-table-column>
          </el-table>
          <!--<el-button type="success" class="btn-next">复制</el-button>-->
        </el-dialog>

      </el-row>

      <!--设置跨链-->
      <el-row class="steps-set" v-show="stepsActive ===4">
        <el-col class="tc radio">
          <el-radio v-model="isPartake" label="0">参与跨链</el-radio>
          <el-radio v-model="isPartake" label="1">不参与跨链</el-radio>
        </el-col>
        <div class="tc tips font16">
          <p v-show="isPartake ==='0'">需缴纳跨链抵押金: <span class="yellow">20000</span> <font class="fCN">NULS</font></p>
          <p v-show="isPartake ==='1'">不参与跨链，无需缴纳跨链抵押金</p>
        </div>
        <div class="btn-next tc">
          <div class="btn">
            <el-link type="info">当前账户余额: {{accountInfo.balance}} <span class="fCN">NULS</span></el-link>
          </div>
          <div class="btn">
            <el-button type="success" @click="next">下一步</el-button>
          </div>
        </div>

      </el-row>

      <!--申请节点-->
      <div class="steps-apply" v-show="stepsActive ===4" v-if="false">
        <el-col class="tc radio">
          <el-radio v-model="isApply" label="0">云节点运行 <i class="el-icon-warning"></i></el-radio>
          <el-radio v-model="isApply" label="1">自行部署 <i class="el-icon-warning"></i></el-radio>
        </el-col>
        <div class="from-div cb">
          <el-form :model="applyForm" :rules="applyRules" ref="applyForm" class="apply-form">
            <div class="cloud-node" v-show="isApply==='0'">
              <el-form-item label="运行时间" prop="runTime">
                <el-select v-model="applyForm.runTime" placeholder="">
                  <el-option label="10K" value="10"></el-option>
                  <el-option label="20K" value="20"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="节点" prop="node">
                <el-select v-model="applyForm.node" placeholder="">
                  <el-option label="1个" value="1"></el-option>
                  <el-option label="5个" value="5"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="网络维护费" prop="netFee">
                <el-input v-model="applyForm.netFee" placeholder="全部节点维护费" disabled>
                </el-input>
                <i class="el-icon-warning fr"></i>
              </el-form-item>
            </div>
            <div class="selt-deploy" v-show="isApply==='1'">
              <el-form-item label="种子节点一的IP/域名" prop="seedNode1">
                <el-input v-model="applyForm.seedNode1" placeholder="种子节点一的IP/域名"></el-input>
              </el-form-item>
              <el-form-item label="种子节点二的IP/域名" prop="seedNode2">
                <el-input v-model="applyForm.seedNode2" placeholder="种子节点二的IP/域名"></el-input>
              </el-form-item>
              <el-form-item label="种子节点三的IP/域名" prop="seedNode3">
                <el-input v-model="applyForm.seedNode3" placeholder="种子节点三的IP/域名"></el-input>
              </el-form-item>
            </div>
            <el-form-item class="btn-next tc">
              <el-button type="success" @click="applySubmitForm('applyForm')">下一步</el-button>
            </el-form-item>
          </el-form>
        </div>

      </div>

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
  import {MAIN_INFO,API_COFIG} from '@/config'
  import UploadBar from './../../components/UploadBar';

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
      let validatePrecision = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入精度系数'));
        } else {
          callback();
        }
      };

      return {
        accountInfo: JSON.parse(localStorage.getItem('accountInfo')),//地址信息

        stepsActive: 0,//步骤条
        isSteps: 1,//业务场景选中模块

        //基本信息表单
        infoForm: {
          name: 'wave',
          logoUrl: 'http://zlj-1.oss-cn-hangzhou.aliyuncs.com/1565085680556.png',
          symbol: 'wave',
          total: '88888',
          precision: '5',
          senior: false,
          desc:'',
        },
        infoRules: {
          name: [
            {validator: validateName, trigger: 'blur'}
          ],
          logoUrl: [
            {validator: validateLogo, trigger: 'blur'},
          ],
          symbol: [
            {validator: validateSymbol, trigger: 'blur'},
          ],
          total: [
            {validator: validateTotal, trigger: 'blur'},
          ],
          precision: [
            {validator: validatePrecision, trigger: 'blur'},
          ],
        },

        //经济模型表单
        inflationForm: {
          amount: 5000000000,
          startTime: '2019-08-23 00:00:00',
          proportion: '10',
          intervalTime: '365',
        },
        inflationRules: {},

        //创世块表单
        nodeForm: {
          addressList: [
            {
              address: "tNULSeBaMvN1zdsRJY96pLtFkke5YJV9fzJNXR",
              key: 1565085784984,
              number: 55555,
              pri: "4c4853ef46900f77db5b0af41e16ed408f26c9f4611356bce2b81aebfbe6e0ba",
              time: 1567828800000
            },
            {
              address: "tNULSeBaMgKuMz7VMGftERR6UDSDDwcsaJZesT",
              key: 1565085795453,
              number: 33333,
              pri: "0b7c56e6e4a1400dcdc639f3be4f1cf7cf5fc7004dfe151bd3d6b30ebe1d0bd9",
              time: 1566446400000
            }
          ],
        },
        backupsDialog: false,
        addressKeyData: [],

        isPartake: '0', //设置跨链模式 0:参与跨链 1:不参与跨链

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
      //this.addDomain();
    },
    mounted() {
      localStorage.getItem('accountInfo');
    },
    methods: {

      /**
       * 选择业务类型
       * @param type
       **/
      changeSteps(type) {
        this.isSteps = type;
      },

      /**
       * 业务类型下一步
       **/
      stepsNext(){
        this.next();
        console.log(API_COFIG);
        this.infoForm.desc = JSON.stringify(API_COFIG);
      },

      /**
       * 验证名称
       **/
      async changeName() {
        //console.log(this.infoForm.name);
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
       * 基本信息提交
       **/
      infoSubmitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.infoForm);
            this.next();
          } else {
            return false;
          }
        });
      },

      /**
       * 经济模型提交
       **/
      inflationSubmitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.inflationForm);
            this.next();
            this.addDomain();
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
        let newAddressInfo = nuls.newAddress(MAIN_INFO.chainId, '');
        this.nodeForm.addressList.push(
          {address: newAddressInfo.address, number: '', time: '', pri: newAddressInfo.pri, key: Date.now()}
        );
      },

      /**
       * 创世块下一步
       **/
      nodeNext() {
        console.log(this.nodeForm);
        let newNodeList = this.nodeForm.addressList;
        let nuData = newNodeList.filter((v) => {
          return v.number === ''
        });
        let timeData = newNodeList.filter((v) => {
          return v.time === '' || !v.time
        });
        if (nuData.length === 0 && timeData.length === 0) {
          for (let item of this.nodeForm.addressList) {
            item.time = new Date(item.time).getTime()
          }
          this.next()
        } else {
          this.$message({message: "有未填写参数 ", type: 'error', duration: 2000});
        }
      },

      /**
       * 申请节点提交
       * @param formName
       * */
      applySubmitForm(formName) {
        console.log(this.applyForm);
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.next();
          } else {
            this.next();
            return false;
          }
        });
      },

      /**
       * 下一步方法
       **/
      next() {
        this.stepsActive = this.stepsActive + 1;
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
      .steps {
        margin: 30px 100px 100px;
        text-align: center;
        .btn-next {
          margin: 100px auto 0;
          width: 360px;
        }
      }
      .steps-scene {
        border: @BD1;
        margin: 0 30px 0;
        width: 290px;
        text-align: left;
        cursor: pointer;
        z-index: 3;
        float: left;
        &:first-child {
          margin: 0 30px 0 0;
        }
        &:nth-child(3n){
          margin: 0 0 0 30px;
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
                margin: 0 20px 0 0;
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
            margin: 10px auto 0;
            .btn {
              text-align: center;
              margin: 20px 0 30px 0;
            }
          }
        }

        .backups-dialog {
          .el-dialog__body {
            background-color: #FFFFFF;
            padding: 20px 30px 50px;
            .el-table {

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
        .btn-next {
          .el-link--info {
            .el-link--inner {
              font-size: 16px;
              line-height: 40px;
            }
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
