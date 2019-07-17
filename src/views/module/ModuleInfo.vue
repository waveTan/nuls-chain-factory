<template>
  <div class="modeule-info bg-gray">
    <div class="bg-white top">
      <h3 class="title">POC共识模块</h3>
    </div>
    <div class="w1200 mt_30 info bg-white">
      <el-tabs v-model="activeName" @tab-click="handleClick" class="module_tab">
        <el-tab-pane label="基本信息" name="first">
          <div class="base">
            <p class="font14"><span class="left">作者</span><span>Wave</span></p>
            <p class="font14"><span class="left">源码</span><span class="click">查看Github</span></p>
            <p class="font14"><span class="left">当前版本</span><span>v1.2.1</span></p>
          </div>

          <div class="md">
            README.md 文件内容读取待研究
          </div>
        </el-tab-pane>
        <el-tab-pane label="版本历史" name="second">
          <div class="block">
            <el-timeline>
              <el-timeline-item timestamp="2018/4/12" placement="top">
                <el-card>
                  <h4>更新 Github 模板</h4>
                  <p>王小虎 提交于 2018/4/12 20:46</p>
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="2018/4/3" placement="top">
                <el-card>
                  <h4>更新 Github 模板</h4>
                  <p>王小虎 提交于 2018/4/3 20:46</p>
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="2018/4/2" placement="top">
                <el-card>
                  <h4>更新 Github 模板</h4>
                  <p>王小虎 提交于 2018/4/2 20:46</p>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </div>

        </el-tab-pane>
      </el-tabs>
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
        activeName: 'second',
      };
    },
    methods: {

      handleClick(tab, event) {
        console.log(tab, event);
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
      padding: 0 50px;
      .base{
        p{
          line-height: 26px;
          .left{
            display: block;
            float: left;
            width: 8rem;
          }
        }
      }
      .module_tab{
        .el-tabs__header{
          .el-tabs__nav-wrap{
            &::after{
              height: 1px;
            }
          }
          .el-tabs__nav{
            margin: 15px 0 10px 0;
            .el-tabs__active-bar{
             background-color: transparent;
            }
            .el-tabs__item{
              font-size: 18px;
              &:hover{
                color: @Ncolour;
              }
            }
            .is-active{
              color: @Ncolour;
            }
          }
        }
      }
      .md{
        margin: 20px 0 0 0;
      }
    }

  }

</style>
