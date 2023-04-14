<template>
  <div class="container">
    <div v-if="flag">
      <h3>请输入图中的验证码</h3>
      <div class="codeImg">
        <img :src="url" @click="updateCode"/>
      </div>
      <van-password-input
        :value="value"
        :focused="showKeyboard"
        :mask="false"
        :length="4"
        @focus="showKeyboard = true"
      />
      <van-number-keyboard
        v-model="value"
        :show="showKeyboard"
        @blur="showKeyboard = false"
      />
    </div>
    <div v-else>
      <div class="supplier">由{{supplier}}提供发货和售后服务</div>
      <div>根据国家市场监督管理总局《网络交易监督管理办法》要求对营业执照信息公示如下：</div>
      <div v-for="(item, i) in licenseUrl" :key="i">
        <img :src="item" class="license"/>
      </div>
      <div>注：以上营业执照信息来源于商家自行申报或工商系统数据，具体以工商部门登记为准。经营者需确保信息真实有效，平台也将定期检查。如与实际不符，为了避免违规，请联系当地工商部门或平台客服更新。</div>
    </div>
  </div>
</template>

<script>
  import Vue from "vue"
  import { PasswordInput, NumberKeyboard } from 'vant'  
  import api from '@/apis/getMaterial'
  import utils from '@/utils/util'
  Vue.use(PasswordInput)
  Vue.use(NumberKeyboard)
  export default {
    props: {},
    data() {
      return {
        supplier: '',
        flag: true,
        url: '',
        show: true,
        value: '',
        showKeyboard: true,
        licenseUrl: [],
        uniCode: +new Date()
      };
    },
    created() {
      this.getCode()
    },
    methods: {
       getData () {
        api.getMaterial({
          supplierId: this.$route.query.supplierId,
          spuId: this.$route.query.spuId,
          uniCode: this.uniCode,
          verifyCode: this.value
        }).then(async (res) => {
          if(res.code === 0) {
            this.flag = false
            this.supplier = res.data.companyName,
            this.licenseUrl = res.data.supplierImg
          } else {
            await utils.sleep(1100)
            this.value = ''
          }
        })
      },
      getCode() {
        api.getCaptcha({
          type: 0,
          uniCode: this.uniCode
        }).then(res => {
          this.url = res.data.url
        })
      },
      updateCode () {
        this.uniCode = +new Date()
        this.getCode()
      }
    },
    watch: {
      value(value) {
        if(value.length === 4) {
          this.getData()
        }
      },
    },
  }
</script>

<style scoped lang="scss">
  .container {
    padding: 20px;
    background: #fff;
    height: 100vh;
    h3 {
      margin-left: 15px;
      font-size: 18px;
      font-weight: 700;
    }
    .codeImg {
      width: 160px;
      margin: 30px auto;
    }
    .license {
      width: 100%;
      margin: 10px 0;
    }
    .supplier {
      margin-bottom: 10px;
    }
  }
</style>