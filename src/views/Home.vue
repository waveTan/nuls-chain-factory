<template>
  <div class="home">
    <div class="carousel">
      <img src="./../assets/img/bank.png"/>
    </div>
    <div class="w1200 bg-white">
      <div class="left fl">
        <p>
          通过NULS链工厂，企业/个人不再需要深入钻研区块链底层技术。仅需进行简单的配置工作，就能得到一条完全属于自己的区块链。
        </p>
        <el-row>
          <el-button>了解区块链架构</el-button>
          <el-button type="success">前往搭建区块链</el-button>
        </el-row>
      </div>
      <div class="right fr">
        <img style="margin: 50px 0 0 0" src="./../assets/img/1.png"/>
      </div>
    </div>
    <div class="bg-gray">
      <div class="w1200">
        <div class="left fl">
          <img  style="margin: 30px 0 0 0" src="./../assets/img/2.png"/>
        </div>
        <div class="right fr">
          <p>
            微服务架构，支持根据实际业务定制化开发和现有模块进行结合。
          </p>
          <el-row>
            <el-button type="success">前往搭建区块链</el-button>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {chainIdNumber} from '@/api/util'

  export default {
    data() {
      return {
        addressInfo: JSON.parse(localStorage.getItem(chainIdNumber())),//地址信息
      };
    },
    created() {
    },
    methods: {}
  }
</script>

<style lang="less">
  .home {
    .carousel {
      height: 400px;
      width: 100%;
      border-bottom: 1px solid #5e6983;
    }
    .w1200 {
      height: 450px;
      .left, .right {
        width: 50%;
        p {
          font-size: 18px;
          font-weight: bold;
          line-height: 36px;
          color: #000000;
          width: 500px;
          margin: 100px auto 70px;
        }
        .el-button {
          display: block;
          width: 200px;
          height: 40px;
          margin: 0 0 0 50px;
        }
        .el-button--success {
          margin: 20px 0 0 50px;
        }
      }
    }
  }

</style>
