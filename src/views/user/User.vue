<template>
  <div class="user bg-gray">
    <div class="bg-white user-info">
      <div class="w1200">
        <span>账户: {{accountAddress.address}}</span>&nbsp;&nbsp;
        <font>余额: {{accountAddress.balance}} <font class="fCN">NULS</font></font>
      </div>

    </div>
    <div class="bg-white w1200 mt_30">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="chain" label="链" width="180" align="center">
        </el-table-column>
        <el-table-column prop="id" label="ID" width="180" align="center">
        </el-table-column>
        <el-table-column prop="nodeInfo" label="云节点数量【预计可运行时间】" align="center">
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">追加网络维护费</el-button>
            <el-button type="text" size="small">下载资源</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="维护网络" :visible.sync="addDialog" width="30rem">
      <el-form :model="addForm">
        <el-form-item label="运行时间" :label-width="formLabelWidth">
          <el-select v-model="addForm.time" placeholder="">
            <el-option label="10K" value="10K"></el-option>
            <el-option label="20K" value="20K"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="节点" :label-width="formLabelWidth">
          <el-select v-model="addForm.node" placeholder="">
            <el-option label="0个" value="0"></el-option>
            <el-option label="5个" value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="网络维护费" :label-width="formLabelWidth">
          <el-input v-model="addForm.cost" placeholder="全部节点维护费" class="input-200"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="addDialog = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios'
  import {API_URL, MAIN_INFO} from '@/config'
  import {divisionDecimals} from '@/api/util'

  export default {
    data() {
      return {
        accountAddress: JSON.parse(localStorage.getItem('accountInfo')),//地址信息
        tableData: [
          {chain: 'bitcoin', id: '666', nodeInfo: '7【18小时17分钟】'},
          {chain: 'bitcoin', id: '777', nodeInfo: '7【18小时17分钟】'},
          {chain: 'bitcoin', id: '888', nodeInfo: '7【18小时17分钟】'},
          {chain: 'bitcoin', id: '999', nodeInfo: '7【18小时17分钟】'}
        ],
        addDialog: false,//追加维护网络弹窗
        formLabelWidth: '150px',
        addForm: {
          time: '10K',
          node: '0',
          cost: '',
        },
      };
    },
    created() {
      this.getBalanceByAddress(this.accountAddress.address);
    },
    mounted() {
    },
    methods: {

      /**
       * 获取转出地址余额信息
       *  @param assetChainId
       *  @param assetId
       *  @param address
       **/
      async getBalanceByAddress(address) {
        const params = {
          "jsonrpc": "2.0",
          "method": "getAccountBalance",
          "params": [2, MAIN_INFO.chainId, MAIN_INFO.assetsId, address],
          "id": Math.floor(Math.random() * 1000)
        };
        axios.post(API_URL, params)
          .then((response) => {
            //console.log(response.data);
            if (response.data.hasOwnProperty("result")) {
              this.accountAddress.balance = divisionDecimals(response.data.result.balance);
              localStorage.setItem('accountInfo', JSON.stringify(this.accountAddress));
            } else {
              this.accountAddress.balance = 0;
              localStorage.setItem('accountInfo', JSON.stringify(this.accountAddress));
            }
          })
          .catch((error) => {
            this.accountAddress.balance = 0;
            localStorage.setItem('accountInfo', JSON.stringify(this.accountAddress));
            console.log("getAccountBalance:" + error)
          })
      },

      handleClick(row) {
        console.log(row);
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

  .user {
    .user-info {
      height: 120px;
      line-height: 100px;
      font-size: 18px;
      font-weight: bold;
    }

  }

</style>
