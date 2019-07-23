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
          <el-form-item class="btn-next">
            <div class="btn">
              <el-button type="success" @click="nodeSubmitForm('nodeForm')">备份地址私钥</el-button>
            </div>
            <div class="btn">
              <el-button @click="next">下一步</el-button>
            </div>
          </el-form-item>
        </el-form>
      </el-row>

      <!--设置跨链-->
      <div class="steps-set" v-show="stepsActive ===3"> 设置跨链</div>

      <!--申请节点-->
      <div class="steps-apply" v-show="stepsActive ===4"> 申请节点</div>

      <!--确认订单-->
      <div class="steps-confirm" v-show="stepsActive ===5"> 确认订单</div>


    </div>
  </div>

</template>

<script>
  import {API_CHAIN_ID} from '@/config'
  import {getAddressInfoByAddress} from '@/api/requestData'

  export default {
    data() {
      return {
        stepsActive: 2,//步骤条

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
       *创世块提交
       * */
      nodeSubmitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            this.next();
            return false;
          }
        });
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

      }
    }

  }

</style>
