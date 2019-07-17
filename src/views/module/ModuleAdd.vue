<template>
  <div class="module_add bg-gray">
    <div class="bg-white top">
      <BackBar backTitle="创建地址"></BackBar>
      <h3 class="title">上传模块</h3>
    </div>
    <div class="w1200 mt_30 info">
      <el-form :model="addModuleForm" :rules="addModuleRules" ref="addModuleForm" class="add_module_form">
        <div class="module_div bg-white">
          <div class="base bg-gray">基本信息</div>
          <div class="w630 mt_20">
            <el-form-item label="模块名称" prop="name">
              <el-input v-model="addModuleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="模块英文名称" prop="nameTwo">
              <el-input v-model="addModuleForm.nameTwo"></el-input>
            </el-form-item>
            <el-form-item label="模块logo" prop="logo">
              <el-upload
                      class="avatar-uploader"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload">
                <img v-if="addModuleForm.imageUrl" :src="addModuleForm.imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </div>
        </div>
        <div class="module_div bg-white">
          <div class="base bg-gray">代码信息（更新代码信息后，将触发平台重新编译模块）</div>
          <div class="w630 mt_20">
            <el-form-item label="Github地址" prop="url">
              <el-input v-model="addModuleForm.url"></el-input>
            </el-form-item>
            <el-form-item label="版本号" prop="version">
              <el-input v-model="addModuleForm.version"></el-input>
            </el-form-item>
          </div>
        </div>
        <el-form-item class="form-next">
          <el-button type="success bt-400" @click="submitForm('ruleForm')">上传</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>

</template>

<script>
  import {API_CHAIN_ID} from '@/config'
  import {getAddressInfoByAddress} from '@/api/requestData'
  import BackBar from '@/components/BackBar'

  export default {
    data() {
      return {
        addModuleForm: {
          name: '',
          nameTwo: '',
          imageUrl: '',
          url: '',
          version: ''
        },
        addModuleRules: {},
      };
    },
    components: {
      BackBar
    },
    methods: {
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

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
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

  .module_add {
    .top {
      height: 120px;
      .title {
        margin: -30px auto 0;
      }
    }
    .info {
      .add_module_form {
        margin: 0 0 100px 0;
        .module_div {
          border: @BD1;
          margin: 0 0 30px 0;
          .base {
            width: 1198px;
            height: 50px;
            line-height: 50px;
            border-bottom: @BD1;
            padding: 0 0 0 20px;
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

      }
    }

  }

</style>
