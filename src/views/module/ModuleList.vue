<template>
  <div class="storehouse bg-gray">
    <div class="bg-white top">
      <h3 class="title">模块仓库</h3>
    </div>
    <div class="w1200 mt_30 info">
      <div class="upload click font14" @click="toUrl('moduleAdd')"><i class="el-icon-cloudy font18"></i> 上传模块</div>
      <ul class="module_list">
        <li class="bg-white">
          <p class="bg-gray"><i class="el-icon-sunny fCN"></i><span class="font12 right">V 1.2.0</span></p>
          <h6>
            <span class="left">名称</span>
            <span class="right">POC共识模块</span></h6>
          <h6>
            <span class="left">作者</span>
            <span class="right">Wave</span></h6>
          <h6>
            <span class="left">源码</span>
            <span class="click right">查看GitHub</span></h6>
          <h5 class="tc"><span class="click" @click="toUrl('moduleInfo')">详情</span></h5>
        </li>
        <li class="bg-white">
          <p class="bg-gray"><i class="el-icon-sunny fCN"></i><span class="font12 right">V 1.2.0</span></p>
          <h6>
            <span class="left">名称</span>
            <span class="right">POC共识模块</span></h6>
          <h6>
            <span class="left">作者</span>
            <span class="right">Wave</span></h6>
          <h6>
            <span class="left">源码</span>
            <span class="click right">查看GitHub</span></h6>
          <h5 class="tc"><span class="click">详情</span></h5>
        </li>
        <li class="bg-white">
          <p class="bg-gray"><i class="el-icon-sunny fCN"></i><span class="font12 right">V 1.2.0</span></p>
          <h6>
            <span class="left">名称</span>
            <span class="right">POC共识模块</span></h6>
          <h6>
            <span class="left">作者</span>
            <span class="right">Wave</span></h6>
          <h6>
            <span class="left">源码</span>
            <span class="click right">查看GitHub</span></h6>
          <h5 class="tc"><span class="click">详情</span></h5>
        </li>
        <li class="bg-white">
          <p class="bg-gray"><i class="el-icon-sunny fCN"></i><span class="font12 right">V 1.2.0</span></p>
          <h6>
            <span class="left">名称</span>
            <span class="right">POC共识模块</span></h6>
          <h6>
            <span class="left">作者</span>
            <span class="right">Wave</span></h6>
          <h6>
            <span class="left">源码</span>
            <span class="click right">查看GitHub</span></h6>
          <h5 class="tc"><span class="click" @click="toUrl('moduleInfo')">详情</span></h5>
        </li>
        <li class="bg-white">
          <p class="bg-gray"><i class="el-icon-sunny fCN"></i><span class="font12 right">V 1.2.0</span></p>
          <h6>
            <span class="left">名称</span>
            <span class="right">POC共识模块</span></h6>
          <h6>
            <span class="left">作者</span>
            <span class="right">Wave</span></h6>
          <h6>
            <span class="left">源码</span>
            <span class="click right">查看GitHub</span></h6>
          <h5 class="tc"><span class="click" @click="toUrl('moduleInfo')">详情</span></h5>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import nuls from 'nuls-sdk-js'
  import {API_CHAIN_ID} from '@/config'
  import {getAddressInfoByAddress} from '@/api/requestData'

  export default {
    data() {
      return {};
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
  @import "./../../assets/css/style";

  .storehouse {
    .top {
      height: 120px;
      line-height: 100px;
      font-size: 18px;
      font-weight: bold;
    }
    .info {
      min-height: 500px;
      border: 1px solid transparent;
      .upload {
        text-align: right;
        margin-top: -30px;
        line-height: 30px;
        i {
        }
      }
      .module_list {
        li {
          width: 285px;
          height: 165px;
          border: @BD1;
          float: left;
          margin: 0 19.3px 30px 0;
          &:nth-child(4n) {
            margin: 0 0 30px 0;
          }
          p {
            height: 34px;
            line-height: 34px;
            border-bottom: @BD1;
            margin: 0 0 20px 0;
            i {
              margin: 0 0 0 20px;
            }
            .right {
              float: right;
              line-height: 30px;
              margin: 0 20px 0 0;
            }
          }
          h6 {
            height: 24px;
            line-height: 24px;
            .left {
              margin: 0 0 0 20px;
            }
            .right {
              float: right;
              margin: 0 20px 0 0;
            }
          }
          h5 {
            border-top: @BD1;
            margin: 8px 0 0 0;
            line-height: 26px;
          }
        }
      }
    }

  }

</style>
