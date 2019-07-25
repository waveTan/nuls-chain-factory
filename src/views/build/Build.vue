<template>
  <div class="build bg-gray">
    <div class="bg-white top">
      <h3 class="title">搭建区块链</h3>
    </div>

    <div class="w1200 mt_30 bg-white info">
      <el-steps :active="stepsActive" finish-status="success">
        <el-step title="选择业务场景" icon="el-icon-edit"></el-step>
        <el-step title="填写基本信息" icon="el-icon-edit-outline"></el-step>
        <el-step title="配置创世块" icon="el-icon-folder"></el-step>
        <el-step title="设置跨链" icon="el-icon-folder-add"></el-step>
        <el-step title="申请节点" icon="el-icon-tickets"></el-step>
        <el-step title="确认订单" icon="el-icon-monitor"></el-step>
      </el-steps>

      <!--选择业务场景-->
      <el-row class="steps" v-show="stepsActive ===0">
        <el-col class="steps-scene">
          <h6>分布式账本版</h6>
          <p>该版本拥有区块链的分布式记账功能，能够以800的TPS记录链上的交易，且账本公开透明，不可篡改。</p>
          <ul>
            <li>金融结算</li>
            <li>供应链</li>
            <li>分布式证书</li>
            <li>防伪溯源</li>
            <li>发票</li>
          </ul>
        </el-col>
        <el-col class="steps-scene">
          <h6>分布式账本版</h6>
          <p>该版本拥有区块链的分布式记账功能，能够以800的TPS记录链上的交易，且账本公开透明，不可篡改。</p>
          <ul>
            <li>金融结算</li>
            <li>供应链</li>
            <li>分布式证书</li>
            <li>防伪溯源</li>
            <li>发票</li>
          </ul>
        </el-col>
        <el-col class="steps-scene" style="margin: 0 0 0 30px">
          <h6>分布式账本版</h6>
          <p>该版本拥有区块链的分布式记账功能，能够以800的TPS记录链上的交易，且账本公开透明，不可篡改。</p>
          <ul>
            <li>金融结算</li>
            <li>供应链</li>
            <li>分布式证书</li>
            <li>防伪溯源</li>
            <li>发票</li>
          </ul>
        </el-col>
        <el-button type="success" class="btn-next" @click="next">下一步</el-button>
      </el-row>

      <!--填写基本信息-->
      <el-row class="steps-info" v-show="stepsActive ===1">
        <el-form :model="infoForm" :rules="infoRules" ref="infoForm" status-icon class="steps-infoForm">
          <el-form-item label="链名称" prop="name">
            <el-input v-model="infoForm.name"></el-input>
          </el-form-item>
          <el-form-item label="链Logo" prop="name">
            <!--<el-input v-model="infoForm.logoUrl"></el-input>-->
            <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
              <img v-if="infoForm.logoUrl" :src="infoForm.logoUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="通证简称" prop="name">
            <el-input v-model="infoForm.symbol"></el-input>
          </el-form-item>
          <el-form-item label="发行总量" prop="name">
            <el-input v-model="infoForm.total"></el-input>
          </el-form-item>
          <el-form-item label="精度" prop="name">
            <el-input v-model="infoForm.precision"></el-input>
          </el-form-item>
          <el-form-item label="高级" prop="delivery">
            <el-switch v-model="infoForm.senior"></el-switch>
          </el-form-item>
          <el-form-item label="" prop="desc" v-show="infoForm.senior">
            <el-input type="textarea" v-model="infoForm.desc"></el-input>
          </el-form-item>
          <el-form-item class="btn-next tc">
            <el-button type="success" @click="infoSubmitForm('infoForm')">下一步</el-button>
          </el-form-item>
        </el-form>
      </el-row>

      <!--配置创世块-->
      <el-row class="steps-node" v-show="stepsActive ===2">
        <el-form :model="nodeForm" ref="nodeForm" class="steps-nodeForm">
          <el-col class="address bg-gray" v-for="(domain, index) in nodeForm.addressList">
            <div class="node-address">
              <p>地址{{index}}:{{domain.address}}</p>
              <span>
                <i class="el-icon-circle-plus-outline click" @click="addDomain"></i>
                <i class="el-icon-remove-outline click" @click.prevent="removeDomain(domain)"></i>
              </span>
            </div>
            <div class="node-form cb">
              <el-form-item label="通证数量" prop="pass" class="number fl">
                <el-input v-model="domain.number"></el-input>
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
              <el-button @click="next">下一步</el-button>
            </div>
          </el-form-item>
        </el-form>

        <el-dialog title="备份地址私钥列" :visible.sync="backupsDialog" width="80%" class="backups-dialog">
          <el-table :data="addressKeyData" border>
            <el-table-column property="nu" label="序号" width="50"></el-table-column>
            <el-table-column property="address" label="地址" width="400"></el-table-column>
            <el-table-column property="key" label="私钥" min-width="300"></el-table-column>
          </el-table>
          <!--<el-button type="success" class="btn-next">复制</el-button>-->
        </el-dialog>

      </el-row>

      <!--设置跨链-->
      <el-row class="steps-set" v-show="stepsActive ===3">
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
            <el-link type="info">当前账户余额: 35656.225 <span class="fCN">NULS</span></el-link>
          </div>
          <div class="btn">
            <el-button type="success" @click="next">下一步</el-button>
          </div>
        </div>

      </el-row>

      <!--申请节点-->
      <div class="steps-apply" v-show="stepsActive ===4">
        <el-col class="tc radio">
          <el-radio v-model="isApply" label="0">云节点运行 <i class="el-icon-warning"></i></el-radio>
          <el-radio v-model="isApply" label="1">自行部署 <i class="el-icon-warning"></i></el-radio>
        </el-col>
        <div class="from-div cb">
          <el-form :model="applyForm" :rules="applyRules" ref="applyForm" class="apply-form">
            <div class="cloud-node" v-show="isApply==='0'">
              <el-form-item label="运行时间" prop="runTime">
                <el-select v-model="applyForm.runTime" placeholder="">
                  <el-option label="10K" value="0"></el-option>
                  <el-option label="20K" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="节点" prop="node">
                <el-select v-model="applyForm.node" placeholder="">
                  <el-option label="1个" value="0"></el-option>
                  <el-option label="5个" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="网络维护费" prop="netFee">
                <el-input v-model="applyForm.netFee" placeholder="全部节点维护费"></el-input>
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
            <p>智能合约版</p>
          </div>
          <div class="title bg-gray">基本信息</div>
          <div class="infos">
            <p class="logo cb"><span class="fl">Logo</span><font class="fl"><img src="./../../assets/img/logo.svg"/></font></p>
            <p class="cb"><span class="fl">链名称</span><font class="fl">BTC网络</font></p>
            <p class="cb"><span class="fl">通证名称</span><font class="fl">BTC</font></p>
            <p class="cb"><span class="fl">进度</span><font class="fl">8</font></p>
            <p class="cb"><span class="fl">总发行量</span><font class="fl">21000000</font></p>
          </div>

          <div class="title bg-gray">创世块</div>
          <div class="infos node-infos">
            <ul>
              <li class="titles">
                <span class="fl">地址</span>
                <font class="fl">分配数量</font>
              </li>
              <li>
                <span class="fl">tNULSeBaMoNnKitV28JeuUdBaPSR6n1xHfKLj2</span>
                <font class="fl">2,222,200,000</font>
              </li>
              <li>
                <span class="fl">tNULSeBaMoNnKitV28JeuUdBaPSR6n1xHfKLj2</span>
                <font class="fl">2,222,200,000</font>
              </li>
              <li>
                <span class="fl">tNULSeBaMoNnKitV28JeuUdBaPSR6n1xHfKLj2</span>
                <font class="fl">2,222,200,000</font>
              </li>
            </ul>
          </div>

          <div class="title bg-gray cb">跨链</div>
          <div class="infos">
            <p class="cb"><span class="fl">是否跨链</span><font class="fl">是</font></p>
            <p class="cb"><span class="fl">抵押金</span><font class="fl">200000 <font class="fCN">NULS</font></font></p>
          </div>
          <div class="title bg-gray">节点</div>
          <div class="infos">
            <p class="cb"><span class="fl">模式</span><font class="fl">云节点运行</font></p>
            <p class="cb"><span class="fl">运行时间</span><font class="fl">6个月</font></p>
            <p class="cb"><span class="fl">共识节点</span><font class="fl">4个</font></p>
            <p class="cb"><span class="fl">费用</span><font class="fl">2976 <font class="fCN">NULS</font></font></p>
          </div>
        </div>


      </div>

    </div>

    <div class="w1200 bg-white bottoms cb">
      <div class="b-left fl">
        <div class="fl total">
          <p>总费用: <span class="yellow">56464</span><font class="fCN">&nbsp;NULS</font></p>
        </div>
        <el-popover placement="top" width="320" trigger="click" class="popover">
          <div class="detailed">
            <h6 class="bg-gray">账单明细</h6>
            <p class="cb"><u class="fl gray">创建基本信息</u><span class="fl">0.01</span><font class="fCN">&nbsp;NULS</font></p>
            <p class="cb"><u class="fl gray">跨链抵押</u><span class="fl">0.01</span><font class="fCN">&nbsp;NULS</font></p>
            <p class="cb"><u class="fl gray">运行3个种子节点</u><span class="fl">0.01</span><font class="fCN">&nbsp;NULS</font></p>
            <p class="cb"><u class="fl gray">运行5个共识节点</u><span class="fl">0.01</span><font class="fCN">&nbsp;NULS</font></p>
            <p class="cb all"><u class="fl gray">总计</u><span class="yellow fl">0.01</span><font class="fCN">&nbsp;NULS</font></p>
          </div>
          <el-link :underline="false" type="primary"  slot="reference">明细</el-link>
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
  import {API_CHAIN_ID} from '@/config'
  import {getAddressInfoByAddress} from '@/api/requestData'

  export default {
    data() {
      return {
        stepsActive: 5,//步骤条

        infoForm: {
          name: '',
          logoUrl: '',
          symbol: '',
          total: '',
          precision: '',
          senior: false,
          desc: ''
        },
        infoRules: {
          name: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
          ],
          logoUrl: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
          ],
          symbol: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
          ],
          total: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
          ],
          precision: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
          ],
          senior: [
            {required: true, message: '请选择活动资源', trigger: 'change'}
          ]
        },

        nodeForm: {
          addressList: [
            {address: 'tNULSeBaMvH8TmMZUPQKvc19qeLrD7oN643aBL', number: '', time: ''}
          ],
        },
        backupsDialog: false,
        addressKeyData: [
          {
            nu: '1',
            address: 'tNULSeBaMvH8TmMZUPQKvc19qeLrD7oN643aBL',
            key: '77b6e2d46cd08aaff18098e7b556323a4b36aff80f49acc01d1f3d9670889df8'
          }
        ],

        isPartake: '0', //设置跨链模式

        isApply: '0', //节点申请方式
        applyForm: {
          runTime: '0',
          node: '0',
          netFee: '',
          seedNode1: '',
          seedNode2: '',
          seedNode3: '',
        },
        applyRules: {},


      };
    },
    methods: {

      /**
       * 下一步方法
       **/
      next() {
        this.stepsActive = this.stepsActive + 1;
      },

      /**
       * 上传图片信息
       **/
      handleAvatarSuccess(res, file) {
        this.addModuleForm.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },

      /**
       * 基本信息提交
       **/
      infoSubmitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            this.next();
            return false;
          }
        });
      },

      /**
       * 创世块提交
       * @param formName
       * */
      nodeSubmitForm(formName) {
        this.backupsDialog = true;
        /*this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            this.next();
            return false;
          }
        });*/
      },

      removeDomain(item) {
        let index = this.nodeForm.addressList.indexOf(item);
        if (index !== -1) {
          this.nodeForm.addressList.splice(index, 1)
        }
      },
      addDomain() {
        this.nodeForm.addressList.push(
          {address: 'tNULSeBaMvH8TmMZUPQKvc19qeLrD7oN643aBL', number: '', time: '', key: Date.now()}
        );
      },

      /**
       * 申请节点提交
       * @param formName
       * */
      applySubmitForm(formName) {
        this.next();
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('submit!');
          } else {
            this.next();
            return false;
          }
        });
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
        border: 1px solid #608fff;
        margin: 0 30px 0;
        width: 290px;
        text-align: left;
        &:first-child {
          margin: 0 30px 0 0;
        }
        &:last-child {
          margin: 0 0 0 30px;
        }
        h6 {
          background-color: #d6e2ff;
          font-size: 16px;
          color: #5f6b88;
          line-height: 40px;
          padding: 0 0 0 20px;
          border-bottom: 1px solid #aec6ff;
        }
        p {
          font-size: 14px;
          padding: 20px;
          color: #8794b1;
          line-height: 20px;
          border-bottom: 1px solid #aec6ff;
        }
        ul {
          padding: 10px;
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
        }
        .avatar-uploader {
          .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            &:hover {
              border-color: #409EFF;
            }
          }
        }
        .avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 80px;
          height: 80px;
          line-height: 80px;
          text-align: center;
        }
        .avatar {
          width: 80px;
          height: 80px;
          display: block;
        }
      }

      .steps-node {
        width: 680px;
        height: 120px;
        margin: 30px auto 0;
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

      .steps-confirm{
        .w700{
          width: 700px;
          margin: 50px auto 10px;
          .title{
            height: 40px;
            line-height: 40px;
            font-weight: bold;
            text-align: left;
            padding: 0 0 0 40px;
            font-size: 16px;
          }
          .infos{
            padding: 10px 0 10px 40px;
            p{
              font-size: 14px;
              height: 22px;
              line-height: 22px;
              width: 100%;
              margin: 5px 0;
              span{
                display: block;
                width: 160px;
              }
            }
            .logo{
              height: 60px;
              img{
                width: 60px;
                height: 60px;
                border: @BD1;
                padding: 5px;
              }
            }
            ul{
              margin: 5px 0;
              li{
                border-bottom: @BD1;
                line-height: 30px;
                height: 30px;
                font-size: 14px;
                padding: 0 0 0 40px;
                span{
                  display: block;
                  width:360px;

                }
                font{
                  margin: 0 0 0 20px;
                }
                &:last-child{
                  border-bottom: 0;
                }
              }
              .titles{
                border-bottom: 2px solid #dfe4ef;
              }
            }
          }
          .node-infos{
            padding: 10px 0 10px 0;
          }
        }
      }
    }
    .bottoms{
      height: 100px;
      margin: 30px auto 100px;
      line-height: 100px;
      .b-left,.b-right{
        text-align: center;
        width: 48%;
      }
      .b-left{
        .total{
          margin: 0 0 0 280px;
        }
      }
    }

  }

  .el-popper{
    padding: 0;
    border: @BD1;
    border-radius: 2px;
    .detailed{
      h6{
        font-size: 24px;
        color: #17202e;
        padding: 10px 0 10px 20px;
        margin: 0 0 20px 0;
      }
      p{
        line-height: 28px;
        font-size: 16px;
        padding: 0 0 0 20px;
        u{
          display: block;
          width: 150px;
        }
        span{
          color: #17202e;
        }
      }
      .all{
        border-top: @BD1;
        padding: 5px 0 15px 20px;
        span{
          color:#FD9D2D;
          font-size: 20px;
        }
      }

    }
  }


</style>
