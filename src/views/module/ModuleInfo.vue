<template>
  <div class="modeule-info bg-gray">
    <div class="bg-white top">
      <h3 class="title">POC共识模块</h3>
    </div>
    <div class="w1200 mt_30 info">

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

  .modeule-info {
    .top {
      height: 120px;
      line-height: 100px;
      font-size: 18px;
      font-weight: bold;
    }
    .info{
      min-height: 500px;
      border: @BD1;
    }

  }

</style>
