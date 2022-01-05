<template>
  <div class="bind-alipay">
    <div class="pay-box">
      <div class="input-box">
        <input
          class="input"
          v-model="account"
          placeholder="请输入支付宝账号"
        />
      </div>
      <div class="input-box">
        <input
          class="input"
          v-model="name"
          placeholder="请输入支付宝账号的真实姓名"
        />
      </div>
      <div :class="`bind-btn ${account && name ? '' : 'unbind'}`" @click="onSubmit">立即绑定</div>
      <div class="info-box">
        1、支付宝账号与用户名不一致将无法提现，请确认无误之后填写。
        <br />
        2、一个支付宝账号只能绑定一个约购app进行提现。
        <br />
        3、支付宝账号设置后不能再修改，如需修改请联系客服。
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Image, Toast } from 'vant';
import { getImgUrl } from '@/utils/tools';

export default {
  data() {
    return {
      account: '',
      name: '',
    };
  },
  components: {
    Image,
  },
  mounted () {
    // this.onOpenApp();
  },
  methods: {
    getImgUrl,
    onSubmit() {
      const {
        account,
        name,
      } = this;
      const regMobile = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
      const regEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      const isMobile = regMobile.test(account);
      const isEmail = regEmail.test(account);
      console.log("🚀 ~ file: index.vue ~ line 59 ~ onSubmit ~ isEmail", isEmail)
      if(!account) {
        Toast({ message: '请输入账号' });
        return;
      }
      if(!name) {
        Toast({ message: '请输入真实名字' });
        return;
      }
      if(!isMobile && !isEmail) {
        Toast({ message: '您输入的账号不正确，请确认' });
        return;
      }
      Toast({ message: '绑定' });
    }
  },
};
</script>

<style lang="scss" scoped>
  .bind-alipay {
    min-height: 100vh;
    padding: 12px;
    background-color: rgba(249, 249, 249, 1);
  }
  .pay-box {
    padding: 20px 0 0 14px;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 10px;
  }
  .input-box {
    width: 320px;
    height: 56px;
    border-radius: 10px;
    background-color: rgba(249, 249, 249, 1);
    margin-left: 1px;
    padding: 16px 0 0 15px;
    margin-bottom: 10px;
  }
  .input {
    width: 100%;
    height: 24px;
    color: rgba(51, 51, 51, 1);
    font-size: 16px;
    white-space: nowrap;
    line-height: 24px;
    padding: 0 15px 0 0;
    background-color: transparent;
    border: none;
  }
  .bind-btn {
    width: 320px;
    height: 56px;
    font-size: 16px;
    font-weight: 600;
    color: #FFFFFF;
    line-height: 56px;
    margin-top: 32px;
    text-align: center;
    background-color: rgba(239, 26, 0, 1);
    border-radius: 10px;
  }
  .unbind {
    background-color: rgba(239, 26, 0, 0.5);
  }
  .info-box {
    width: 320px;
    height: 156px;
    color: rgba(153, 153, 153, 1);
    font-size: 15px;
    line-height: 22px;
    margin-top: 40px;
  }
</style>
