<template>
  <div class="index bg-gray">
    <div class="bg-white">
      <h3 class="title">搭建区块链</h3>
    </div>
    <div class="w1200 mt_30">
      搭建区块链
    </div>
  </div>

</template>

<script>
  import nuls from 'nuls-sdk-js'
  import {API_CHAIN_ID} from '@/config'
  import {getAddressInfoByAddress} from '@/api/requestData'

  export default {
    data() {
      return {
      };
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

  .index {
    .user-info {
      height: 120px;
      line-height: 100px;
      font-size: 18px;
      font-weight: bold;
    }

  }

</style>
