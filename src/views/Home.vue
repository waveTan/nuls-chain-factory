<template>
  <div class="home">
    <div class="carousel cb">
      <el-carousel :interval="5000" arrow="always" :height="carouselHeight">
        <el-carousel-item v-for="item in 1" :key="item">
          <div class="carousel_bg"><img src="./../assets/img/bank.png"/></div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="w1200 bg-white">
      <div class="left fl">
        <p>{{$t('home.home0')}}</p>
        <el-row>
          <el-button>{{$t('home.home1')}}</el-button>
          <el-button type="success" @click="toUrl('build')">{{$t('home.home2')}}</el-button>
        </el-row>
      </div>
      <div class="right fr pc">
        <img style="margin: 50px 0 0 0" src="./../assets/img/1.png"/>
      </div>
    </div>
    <div class="bg-gray">
      <div class="w1200">
        <div class="left fl pc">
          <img style="margin: 30px 0 0 0" src="./../assets/img/2.png"/>
        </div>
        <div class="right fr">
          <p>{{$t('home.home3')}}</p>
          <el-row>
            <el-button type="success" @click="toUrl('build')">{{$t('home.home2')}}</el-button>
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
        isMobile: /(iPhone|iOS|Android|Windows Phone)/i.test(navigator.userAgent),//访问界面终端
        carouselHeight: this.isMobile ? '10rem' : '400px'
      };
    },
    created() {
      console.log(this.isMobile)
    },
    methods: {

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
  .home {
    .carousel {
      height: 400px;
      width: 100%;
      border-bottom: 1px solid #5e6983;
      .carousel_bg {
        width: 100%;
        text-align: center;
        background-color: #141526;
        img {
          height: 100%;
        }
      }

      @media screen and (max-width: 1000px) {
        height: 10rem;
        img {
          height: 100%;
          width: 100%;
        }
      }
    }
    .w1200 {
      height: 450px;
      @media screen and (max-width: 1000px) {
        height: 20rem;
      }
      .left, .right {
        width: 50%;
        @media screen and (max-width: 1000px) {
          width: 100%;
        }
        p {
          font-size: 18px;
          font-weight: bold;
          line-height: 36px;
          color: #000000;
          width: 500px;
          margin: 100px auto 70px;
          @media screen and (max-width: 1000px) {
            width: 100%;
            margin: 2rem auto 1.5rem;
            padding: 0 0.5rem;
          }
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
