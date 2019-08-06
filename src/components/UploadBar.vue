<template>
  <div class="upload">
    <div class="upload_file">
      <input type="file" :id="uploadId" @change="doUpload" class="hidden"/>
      <div class="file fl" @click="upload">
        <img :src="url" v-show="url"/>
        <i class="el-icon-plus" v-show="!url"></i>
      </div>
    </div>
  </div>
</template>

<script>
  const OSS = require('ali-oss');
  import axios from 'axios'

  export default {
    name: 'upload',
    data() {
      return {
        region: 'oss-cn-hangzhou',
        bucket: 'zlj-1',
        uploadId: 'uploadId',
        percentage: 0,
        url: '',
      }
    },
    methods: {
      upload(){
        document.getElementById(this.uploadId).click()
      },

      doUpload() {
        const _this = this;
        axios.get('http://192.168.1.192:8080/oss').then((result) => {
          const client = new OSS({
            region: result.data.Region,
            accessKeyId: result.data.AccessKeyId,
            accessKeySecret: result.data.AccessKeySecret,
            stsToken: result.data.SecurityToken,
            bucket: result.data.bucket
          });
          const files = document.getElementById(_this.uploadId);
          if (files.files) {
            const fileLen = document.getElementById(_this.uploadId).files;
            for (let item in fileLen) {
              const file = fileLen[item];
              let random_name = new Date().getTime() + '.' + file.name.split('.').pop(); // 随机命名
              // 上传
              client.multipartUpload(random_name, file, {}).then((results) => {
                const url = 'http://zlj-1.oss-cn-hangzhou.aliyuncs.com/' + results.name; // 上传完成
                _this.url = url;
                _this.$emit('func',_this.url)
              }).catch((err) => {
                console.log(err)
              })
            }
          }
        })
      },
    },
  }
</script>

<style lang="less">
  .upload {
    .upload_file {
      .file {
        width: 60px;
        height: 60px;
        border: 1px dashed #d9d9d9;
        text-align: center;
        &:hover {
          border-color: #409EFF;
        }
        img{
          width: 60px;
          height: 60px;
        }
        .el-icon-plus{
          margin: 15px 0 0 0;
          font-size: 28px;
        }
      }
    }
  }
</style>
