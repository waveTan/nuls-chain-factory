<template>
  <div class="bottom">
    <div class="pc">
      <div class="w1200 ">
        <div class="fl">
          <p class="p1">NULS {{$t('bottom.foundation')}}</p>
          <p class="p2">{{$t('bottom.beLocated')}}</p>
        </div>
        <div class="fr">
          <ul>
            <li class="fl">
              <svg id="icon-nuls" viewBox="0 0 50 50" @click="toUrl('url','https://nuls.community/',1)">
                <path d="M25 0C11.2 0 0 11.2 0 25s11.2 25 25 25 25-11.2 25-25S38.8 0 25 0zm10.7 32.1c0 1.3-1 2.4-2.4 2.4h-.7l-7.8-4.7L17 19v17.5l4.7 2.1v-7.8l3.1 4 .3 7.9L14.3 38V16.2c0-1.3 1-2.4 2.4-2.4h.7L27.6 28l5.4 3.1V13.6l-4.7-2.1V23l-3.1-4V7.3L35.7 12v20.1z">
                </path>
              </svg>
            </li>
            <li class="fl">
              <svg id="icon-telegram" viewBox="0 0 50 50" @click="toUrl('url','https://t.me/Nulsio',1)">
                <path d="M25 0c13.8 0 25 11.2 25 25S38.8 50 25 50 0 38.8 0 25 11.2 0 25 0zm11.6 15c.1-.5-.3-1-.6-.9-.1 0-.2.1-.3.1l-25.2 9.6c-.7.2-.7 1.3 0 1.5l5.8 2 3.5 7c0 .1.2.2.3.2 0 0 .1 0 .2-.1l3.3-2.8 5.4 4.1c.3.2.7.3 1 .3.7 0 1.4-.5 1.7-1.3L36.6 15zm-19 11.9l14-8.4-11.7 10.2.3 3.7-2.6-5.5z"></path>
              </svg>
            </li>
            <li class="fl">
              <svg id="icon-twitter" viewBox="0 0 50 50" @click="toUrl('url','https://twitter.com/Nuls',1)">
                <path d="M50 25c0 13.8-11.2 25-25 25S0 38.8 0 25 11.2 0 25 0s25 11.2 25 25zM20.4 38.2c11.1 0 17.1-9.2 17.1-17.1v-.8c1.2-.9 2.2-1.9 3-3.1-1.1.5-2.2.8-3.5 1 1.2-.8 2.2-1.9 2.7-3.3-1.2.7-2.5 1.2-3.8 1.5-1.1-1.2-2.7-1.9-4.4-1.9-3.3 0-6 2.7-6 6 0 .5 0 .9.2 1.4-5-.2-9.4-2.6-12.4-6.3-.5.9-.8 1.9-.8 3 0 2.1 1.1 3.9 2.7 5-1 0-1.9-.3-2.7-.8v.1c0 2.9 2.1 5.4 4.8 5.9-.5.1-1 .2-1.6.2-.4 0-.8 0-1.1-.1.8 2.4 3 4.1 5.6 4.2-2.1 1.6-4.7 2.6-7.5 2.6-.5 0-1 0-1.4-.1 2.6 1.6 5.7 2.6 9.1 2.6z"></path>
              </svg>
            </li>
            <li class="clicks fl">
              <svg id="icon-reddit" viewBox="0 0 50 50" @click="toUrl('url','https://www.reddit.com/r/nulsservice/',1)">
                <path d="M25 0c13.8 0 25 11.2 25 25S38.8 50 25 50 0 38.8 0 25 11.2 0 25 0zm14.6 28.4c1.2-.6 2.1-1.9 2.1-3.3 0-2.1-1.7-3.7-3.7-3.7-1 0-1.9.4-2.5 1-2.4-1.8-5.9-3-9.7-3.1l1.7-7.8 5.4 1.1c.1 1.4 1.2 2.5 2.6 2.5 1.4 0 2.6-1.2 2.6-2.6 0-1.4-1.2-2.6-2.6-2.6-1 0-1.9.6-2.3 1.5l-6.1-1.3c-.2 0-.4 0-.5.1-.2.1-.2.2-.3.4l-1.8 8.7c-3.9.1-7.4 1.3-9.9 3.1-.6-.6-1.5-1-2.5-1-2.1 0-3.7 1.7-3.7 3.7 0 1.5.9 2.7 2.2 3.3-.1.3-.1.7-.1 1.1 0 5.6 6.5 10.1 14.6 10.1s14.6-4.5 14.6-10.1c0-.4 0-.7-.1-1.1zm-9.3 5.1c.3-.3.7-.3 1.1 0 .2.3.2.7-.1 1-1.8 1.8-5.2 1.9-6.2 1.9s-4.4-.1-6.2-1.9c-.3-.3-.3-.7 0-1 .3-.3.7-.3 1 0 1.1 1.1 3.5 1.5 5.2 1.5 1.7 0 4.1-.4 5.2-1.5zm-8.4-5.9c0 1.4-1.2 2.6-2.6 2.6-1.4 0-2.6-1.2-2.6-2.6 0-1.4 1.2-2.6 2.6-2.6 1.4 0 2.6 1.2 2.6 2.6zm8.8-2.6c1.5 0 2.6 1.2 2.6 2.6 0 1.4-1.2 2.6-2.6 2.6-1.4 0-2.6-1.2-2.6-2.6 0-1.4 1.2-2.6 2.6-2.6z"></path>
              </svg>
            </li>
            <li class="clicks fl">
              <svg id="icon-github" viewBox="0 0 50 50" @click="toUrl('url','https://github.com/nuls-io',1)">
                <path fill-rule="evenodd"
                      d="M25 0C11.2 0 0 11.467 0 25.597c0 11.262 7.2 20.886 17.1 24.265 1.2.205 1.7-.512 1.7-1.229v-4.3c-6.9 1.536-8.4-3.379-8.4-3.379-1.1-2.969-2.8-3.788-2.8-3.788-2.3-1.536.2-1.536.2-1.536 2.5.205 3.8 2.662 3.8 2.662 2.2 3.891 5.8 2.765 7.3 2.15.2-1.638.9-2.764 1.6-3.378C15 36.45 9.1 34.197 9.1 24.47c0-2.764 1-5.119 2.6-6.86-.3-.614-1.1-3.276.2-6.757 0 0 2.1-.717 6.9 2.662 2-.614 4.1-.82 6.3-.82 2.1 0 4.3.308 6.3.82 4.8-3.276 6.9-2.662 6.9-2.662 1.4 3.481.5 6.143.2 6.757 1.6 1.741 2.6 4.096 2.6 6.86 0 9.83-5.8 11.98-11.4 12.594.9.819 1.7 2.355 1.7 4.71v6.962c0 .717.4 1.433 1.7 1.228C42.8 46.381 50 36.86 50 25.597 50 11.467 38.8 0 25 0z"></path>
              </svg>
            </li>
            <li class="clicks fl">
              <svg id="icon-medium" viewBox="0 0 50 50" @click="toUrl('url','https://medium.com/@nuls',1)">
                <path d="M25 0C11.2 0 0 11.2 0 25s11.2 25 25 25 25-11.2 25-25S38.8 0 25 0zm16.5 11.8l-2.7 2.6c-.2.2-.3.5-.3.8v18.9c0 .3.1.6.3.8l2.6 2.6v.6H28.3v-.6l2.7-2.6c.3-.3.3-.3.3-.8V18.7l-7.5 19.2h-1L14 18.7v12.8c-.1.5.1 1.1.5 1.5l3.5 4.3v.6H8v-.6l3.5-4.3c.4-.4.5-.9.5-1.5V16.7c0-.4-.1-.8-.4-1.1l-3.1-3.8v-.6h9.7l7.5 16.5 6.6-16.5h9.3v.6h-.1z"></path>
              </svg>
            </li>
            <li class="clicks fl">
              <svg id="icon-discord" viewBox="0 0 50 50"
                   @click="toUrl('url','https://discordapp.com/invite/uZ3QcxW',1)">
                <path d="M25 0c13.8 0 25 11.2 25 25S38.8 50 25 50 0 38.8 0 25 11.2 0 25 0zm7.9 37c6.3-.2 8.8-4.4 8.8-4.5 0-9.2-4.1-16.6-4.1-16.6-4.1-3.1-8-3-8-3l-.4.5c4.8 1.5 7.1 3.6 7.1 3.6-3-1.6-5.9-2.4-8.6-2.7-2.1-.2-4.1-.1-5.8.1-.2 0-.3.1-.5.1-1 .1-3.4.5-6.5 1.8-1.1.5-1.7.8-1.7.8s2.4-2.2 7.5-3.7l-.3-.3s-3.9-.1-8 3c0 0-4.1 7.4-4.1 16.6 0 0 2.4 4.1 8.7 4.3 0 0 1.1-1.3 1.9-2.3-3.6-1.1-5-3.4-5-3.4s.3.2.8.5c0 0 0 .1.1.1s.2 0 .3.1c.7.4 1.4.7 2.1 1 1.2.4 2.6.9 4.2 1.2 2.1.4 4.7.5 7.4 0 1.3-.2 2.7-.6 4.1-1.2 1-.4 2.1-1 3.3-1.7 0 0-1.5 2.3-5.2 3.4.9 1.1 1.9 2.3 1.9 2.3zM19.7 23.7c1.6 0 2.9 1.4 2.9 3.2 0 1.8-1.3 3.2-2.9 3.2-1.6 0-2.9-1.5-2.9-3.2 0-1.8 1.3-3.2 2.9-3.2zm10.4 0c1.6 0 2.9 1.4 2.9 3.2 0 1.8-1.3 3.2-2.9 3.2-1.6 0-2.9-1.5-2.9-3.2 0-1.8 1.3-3.2 2.9-3.2z"></path>
              </svg>
            </li>
            <li class="clicks fl">
              <svg id="icon-facebook" viewBox="0 0 50 50"
                   @click="toUrl('url','https://www.facebook.com/nulscommunity/',1)">
                <path d="M50.2,25.2C50.2,11.3,38.9,0,25,0S-0.2,11.3-0.2,25.2c0,12.6,9.2,23,21.2,24.8V32.4h-6.4v-7.3h6.4v-5.5 c0-6.3,3.8-9.8,9.5-9.8c2.8,0,5.6,0.5,5.6,0.5v6.2H33c-3.1,0-4.1,1.9-4.1,3.9v4.7h7l-1.1,7.3h-5.9V50C41,48.1,50.2,37.7,50.2,25.2z"></path>
              </svg>
            </li>
            <li class="clicks fl">
              <svg id="icon-steemit" viewBox="0 0 50 50" @click="toUrl('url','https://steemit.com/@nuls',1)">
                <path fill-rule="evenodd"
                      d="M28.9 18.8c2 .2 3.8 1.1 5.3 2.6 3.4 3.5 3.3 9.4-.2 12.8-1.8 1.8-4.4 2.8-6.4 3-1.4.2-2.9.2-4.4 0-2.2-.3-3.7-.9-5.3-1.5.8-.8 1.6-1.8 1.9-2.7.2-.5.1-1.1-.1-1.6-1.6-3.4-.9-7.5 1.8-10.1 2-2 4.7-2.8 7.4-2.5zM25 0c13.8 0 25 11.2 25 25S38.8 50 25 50 0 38.8 0 25 11.2 0 25 0zm11.1 35.9c4.6-4.6 4.7-12.1 0-16.8-1.2-1.2-2.6-2.1-4.2-2.7.9-2.6 4.1-3.6 4.1-3.6s-7.4-3.9-15.5-2.4c-2.8.4-5.4 2.1-7.3 4.3-4.2 4.8-3.6 12.1 1.2 16.1.7.7 2.4 1.6 2.4 1.7-1.1 2.7-4.6 3.5-4.6 3.5s4.6 2.9 10.8 3.7c1.7.3 3.4.3 5.2.1 2.8-.2 5.7-1.8 7.9-3.9z"></path>
              </svg>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="mobile">
        <el-menu default-active="1" class="menu" @open="handleOpen" @close="handleClose">
          <el-menu-item index="home">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="block">
            <i class="el-icon-s-operation"></i>
            <span slot="title">搭建区块链</span>
          </el-menu-item>
          <el-menu-item index="user">
            <i class="el-icon-user"></i>
            <span slot="title">我的</span>
          </el-menu-item>
        </el-menu>
    </div>
  </div>

</template>

<script>
  import {connect} from '@/api/util'

  export default {
    name: "bottom-bar",
    methods: {

      /**
       * @disc: url 连接
       * @params: name, parameter, type
       * @date: 2019-08-22 14:26
       * @author: Wave
       */
      toUrl(name, parameter, type) {
        let newPath = connect(name, parameter, type);
        if (newPath.success) {
          this.$router.push(newPath.data);
        }
      },
    }
  }
</script>

<style lang="less">
  @import "./../assets/css/style";

  .bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #FFFFFF;
    z-index: 9999;
    .pc {
      height: 60px;
      border-top: 1px solid #bebebe;
      .w1200 {
        height: 100%;
        line-height: 60px;
        .fl {
          .p1, .p2 {
            font-size: 12px;
            line-height: 20px;
          }
          .p1 {
            margin-top: 8px;
          }
        }
        ul {
          margin-top: 8px;
          li {
            padding: 0 5px;
            font-size: 14px;
            &:first-child {
              padding: 0;
            }
            &:last-child {
              font-size: 14px;
              padding: 0 0 0 5px;
            }
            svg {
              cursor: pointer;
              width: 25px;
              fill: #4ff16a;
            }
          }
        }
      }
    }

    .mobile {
      height: 50px;
      .menu{
        .el-menu-item{
          width: 33%;
          float: left;
          text-align: center;
          i{
            display: block;
            margin: 0.5rem auto 0;
          }
          span{
            display: block;
            line-height: 1.2rem;
          }
        }
      }
    }

  }
</style>
