<template>
  <div class="header bg-white">
    <div class="w1200 pc">
      <div class="logo fl">
        <img class="clicks" @click="toUrl('home')" :src="logoSvg">
      </div>
      <div class="nav fl">
        <el-menu :default-active="activeIndex" class="fl" mode="horizontal" @select="handleSelect">
          <el-menu-item index="warehouse" v-show="false">{{$t('nav.moduleWarehouse')}}</el-menu-item>
          <el-menu-item index="block">{{$t('nav.buildingBlock')}}</el-menu-item>
        </el-menu>
        <div class="user fr tc">
          <div class="height fl">
            <i class="el-icon-s-grid fCN"></i>
            <span> {{height}} </span>
          </div>
          <div class="fr">
            <div class="user_info fl" v-if="accountAddress">
              <el-menu mode="horizontal" @select="handleSelect" class="user_menu">
                <el-submenu index="user">
                  <template slot="title"><i class="el-icon-s-custom click "></i>&nbsp;
                  </template>
                  <el-menu-item index="userInfo">{{$t('nav.user')}}</el-menu-item>
                  <el-menu-item index="backupsAddress">{{$t('nav.backup')}}</el-menu-item>
                  <el-menu-item index="help">{{$t('nav.help')}}</el-menu-item>
                  <el-menu-item index="signOut">{{$t('nav.signOut')}}</el-menu-item>
                </el-submenu>
              </el-menu>
            </div>
            <div v-if="!accountAddress" class="click font14 fl landing" @click="toUrl('newAddress')">
              {{$t('nav.login')}}
            </div>
            <div class="language fr font14 click" @click="selectLanguage">{{lang === 'en' ? '简体中文':'English' }}</div>
          </div>
        </div>

      </div>
    </div>
    <div class="mobile font16">
      首页
    </div>
    <Password ref="password" @passwordSubmit="passSubmit">
    </Password>
    <div class="cb"></div>
  </div>
</template>

<script>
  import Password from '@/components/PasswordBar'
  import {connect,passwordVerification} from '@/api/util'
  import logoBeta from '@/assets/img/logo-beta.svg'
  import logo from '@/assets/img/logo.svg'
  import {RUN_DEV} from '@/config'

  export default {
    data() {
      return {
        logoSvg: RUN_DEV ? logo : logoBeta,
        activeIndex: '1',//导航选中
        accountInfo: {},//账户信息
        accountAddress: '',//账户地址
        height: 0,//最新高度
        lang: 'cn',
      };
    },
    created() {
      this.getBestBlockHeader();
      let lang = navigator.language || navigator.userLanguage;//常规浏览器语言和IE浏览器
      if (sessionStorage.hasOwnProperty('lang')) {
        this.lang = sessionStorage.getItem('lang')
      } else {
        if (lang.substr(0, 2) === 'zh') {
          this.lang = 'cn'
        } else {
          this.lang = 'en'
        }
      }
      this.$i18n.locale = this.lang;
    },
    mounted() {
      setInterval(() => {
        if (localStorage.hasOwnProperty('accountInfo')) {
          this.accountInfo = JSON.parse(localStorage.getItem('accountInfo'));
          this.accountAddress = this.accountInfo.address;
        }
      }, 500);

      setInterval(() => {
        this.getBestBlockHeader()
      }, 10000)
    },
    components: {
      Password,
    },
    methods: {

      /**
       * 语言切换
       */
      selectLanguage() {
        if (this.lang === 'en') {
          this.lang = 'cn'
        } else {
          this.lang = 'en'
        }
        sessionStorage.setItem('lang', this.lang);
        this.$i18n.locale = this.lang;
      },

      /**
       * 导航切换
       * @param key
       */
      handleSelect(key) {
        if (key === 'warehouse') {
          this.toUrl('module')
        } else if (key === 'block') {
          this.toUrl('build')
        } else if (key === 'userInfo') {
          this.toUrl('user')
        } else if (key === 'backupsAddress') {
          this.toUrl('backupsAddress');
        } else if (key === 'help') {
          connect('help', 'https://docs.nuls.io/Guide/g_pocm.html', 1);
        } else if (key === 'signOut') {
          this.signOut();
        }
      },

      /**
       * 退出
       */
      signOut() {
        this.$confirm(this.$t('tips.tips30'), this.$t('tips.tips29'), {
          confirmButtonText: this.$t('nav.backup'),
          cancelButtonText: this.$t('nav.signOut'),
          type: 'warning',
          showClose: false,
          closeOnClickModal: false,
          closeOnPressEscape: false,
          center: true
        }).then(() => {
          this.toUrl('backupsAddress');
        }).catch(() => {
          this.$refs.password.showPassword(true);
        });
      },

      /**
       *  获取密码框的密码
       * @param password
       **/
      async passSubmit(password) {
        let isPassword = await passwordVerification(this.accountInfo, password);
        if (isPassword.success) {
          localStorage.removeItem('accountInfo');
          this.accountInfo = {};
          this.accountAddress = '';
          this.toUrl('newAddress');
        } else {
          this.$message({message: this.$t('tips.tips4'), type: 'error', duration: 3000});
        }
      },

      /**
       * 获取最新高度
       */
      getBestBlockHeader() {
        this.$post('/', 'getBestBlockHeader', [])
          .then((response) => {
            //console.log(response);
            if (response.hasOwnProperty("result")) {
              this.height = response.result.height;
            } else {
              this.height = 0;
            }
          }).catch((error) => {
          this.height = 0;
          console.log(error);
        })
      },

      /**
       * url 连接
       * @param name
       */
      toUrl(name) {
        this.$router.push({
          name: name,
        })
      }
    }
  }
</script>

<style lang="less">
  @import "./../assets/css/style";

  .header {
    .pc{
      border-bottom: 1px solid #bebebe;
      height: 100px;
      line-height: 100px;
      width: 100%;
      .logo {
        width: 104px;
        margin: 18px 0 0 0;
        height: 42px;
        img {
          width: 100px;
        }
      }
      .nav {
        width: 1095px;
        height: 98px;
        .el-menu.el-menu--horizontal {
          border-bottom: 0;
          width: 850px;
          height: 98px;
          .el-menu-item {
            height: 98px;
            line-height: 100px;
            padding: 0;
            margin: 0 25px;
            font-size: 18px;
            color: #333;
            &:hover {
              color: @Ncolour;
            }
            &:first-child {
              margin-left: 75px;
            }
          }
          .is-active {
            color: @Ncolour;
            border-bottom: 0 solid transparent;
          }
        }
        .user {
          .height {
            width: 120px;
            float: left;
            line-height: 105px;
          }
          .user_info {
            width: 28px;
            .user_menu {
              width: 28px;
              text-align: center;
              .el-submenu {
                &:hover {
                  background-color: transparent;
                }
                .el-submenu__title {
                  line-height: 20px;
                  height: 20px;
                  margin: 40px auto 0;
                  padding: 0;
                  width: 25px;
                  border: 0;
                  &:hover {
                    background-color: transparent;
                  }
                  .el-icon-arrow-down {
                    font-size: 0;
                  }
                }
              }
            }
          }
          .language {
            width: 70px;
            line-height: 105px;
            margin-left: 20px;
          }
        }
        .landing {
          width: 30px;
          line-height: 105px;
          text-align: center;
          z-index: 99;
          position: relative;
        }
      }
      .password-dialog {
        line-height: 20px;
      }
    }
    .mobile{
      text-align: center;
    }

  }
  .el-message-box__wrapper {
    .el-message-box__content {
      .el-message-box__message {
        p {
          color: red;
        }
      }
    }
  }
</style>
