<template>
  <div class="withdrawal-application">
    <div class="content-box">
      <div class="alipay-user">
        <span class="alipay-user-title">到账账户：</span>
        <img class="alipay-user-avatar" src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngbe046035975747431f7d3bdc5edb2d89b9f7d5bc4ad25437f4edcbc509bf17d0" />
        <span class="alipay-user-account">支付宝（2355）</span>
      </div>
      <div class="withdrawal-box">
        <div class="withdrawal-title">提现金额</div>
        <div class="withdrawal-price">
          <span class="price-util">¥</span>
          <input class="price-input" v-model="price" />
        </div>
        <div class="line"></div>
        <div class="use-price">
          <span>当前余额</span>
          <span class="use-price-text">{{total}}</span>
          <span>元</span>
        </div>
      </div>
      <div :class="`withdrawal-btn ${price ? '' : 'unclick'}`" @click="onSubmit">立即提现</div>
      <div class="withdrawal-desc">
        说明：
        <br />
        1、前3次不限金额提现，后面需要≥3元起提现,例如3元、4元、5元····；
        <br />
        2、约购APP平台按照国家税收规定代缴纳20%的偶然所得税，从用户提现金额中扣除，忘悉知
        <br />
        3、提现永久有效
      </div>
    </div>
    <div class="withdrawal-history" @click="onToList">提现记录</div>

    <Popup
      :style="{background: 'transparent'}"
      v-model="showMsg"
    >
      <div class="msg-popup">
        <span class="popup-title">请输入短信验证码</span>
        <span class="popup-name">提现</span>
        <span class="popup-price">¥8689.99</span>
        <div class="info-item">
          <div class="info-item-title">提现服务费：</div>
          <div class="info-item-text"><span class="info-item-bold">0</span>元</div>
        </div>
        <div class="info-item">
          <div class="info-item-title">费率：</div>
          <div class="info-item-text"><span class="info-item-bold">0</span>元/笔</div>
        </div>
        <div class="withdrawal-ps ps-list">
          <PasswordInput
            :value="msgCode"
            :gutter="10"
            :mask="false"
            @focus="focusCode = true"
          />
        </div>
        <div class="time-down">
          <span>{{showTimeText}}</span>
          <span class="get-code-down" v-if="showReGetCode">重新获取</span>
        </div>
        <div class="popup-btn-list">
          <div class="popup-btn popup-btn-gray" @click="onShowMsg">取消</div>
          <div class="popup-btn popup-btn-red" @click="onShowMsg">确认提现</div>
        </div>
      </div>
    </Popup>
    <NumberKeyboard
      :z-index="9999"
      v-model="msgCode"
      :show="focusCode"
      @blur="focusCode = false"
    />
  </div>
</template>

<script>
import Vue from 'vue';
import { Image, Toast, Popup, PasswordInput, NumberKeyboard } from 'vant';
import { getImgUrl } from '@/utils/tools';

const timeText = 's后可重新获取'
const defTimeText = '60s后可重新获取'

export default {
  data() {
    return {
      msgCode: '123',
      focusCode: false,
      price: 880.6,
      total: 15.00,
      maxTime: 59,
      showMsg: false,
      timer: null,
      showTimeText: defTimeText,
      showReGetCode: false,
    };
  },
  components: {
    Image,
    Popup,
    PasswordInput,
    NumberKeyboard,
  },
  mounted () {
  },
  methods: {
    getImgUrl,
    // 申请提现
    onSubmit() {
      const {
        price,
      } = this;
      const regNumber = /^[0-9]+(.[0-9]{1,2})?$/;
      const isNumber = regNumber.test(price);
      if(!price) {
        Toast({ message: '请输入提现金额' });
        return;
      }
      if(!isNumber) {
        Toast({ message: '请输入正确金额' });
        return;
      }
      Toast({ message: '提现' });
      this.showMsg = true;
      this.maxTime = 59;
      this.startTimeDown();
    },
    onShowMsg() {
      // if(this.showMsg) {
      //   this.showTimeText = defTimeText;
      //   this.showReGetCode = false;
      //   clearInterval(this.timer);
      // }
      this.showMsg = !this.showMsg;
    },
    // 开始倒计时
    startTimeDown() {
      this.timer = setInterval(() => {
        this.runCountDown();
      }, 1000); 
    },
    // 倒计时循环
    runCountDown() {
      let maxTime = this.maxTime;
      if (maxTime >= 1) {
        let seconds = Math.floor(maxTime % 60);
        this.showTimeText = `${seconds}${timeText}`
        this.maxTime = this.maxTime - 1;
      } else{
        clearInterval(this.timer);
        this.showTimeText = '';
        this.showReGetCode = true;
      }
    },
    // 跳转提现列表
    onToList() {
      this.$router.push('/web/game-withdrawal-list');
    },
  },
};
</script>

<style lang="scss" >
  .withdrawal-ps {
    margin: 20px 0;
  }
  .withdrawal-ps .van-password-input {
    margin: 0;
  }
  .withdrawal-ps .van-password-input__security {
    width: 100%;
    height: auto;
    border: none;
  }
  .withdrawal-ps .van-password-input__item {
    width: 36px;
    height: 36px;
    background: #F9F9F9;
    border-radius: 6px;
    border: 1px solid #D8D8D8;
  }
</style>
<style lang="scss" scoped>
  .withdrawal-application {
    min-height: 100vh;
    padding: 12px;
    background-color: rgba(249, 249, 249, 1);
  }
  .content-box {
    padding: 15px;
    background-color: #fff;
    border-radius: 10px;
  }
  .alipay-user {
    display: flex;
    align-items: center;
    height: 32px;
    margin-left: 2px;
  }
  .alipay-user-title {
    color: rgba(153, 153, 153, 1);
    font-size: 15px;
    line-height: 21px;
    text-align: center;
  }
  .alipay-user-avatar {
    width: 32px;
    height: 32px;
  }
  .alipay-user-account {
    height: 21px;
    color: rgba(51, 51, 51, 1);
    font-size: 15px;
    line-height: 21px;
    margin-left: 5px;
  }
  .withdrawal-box {
    width: 320px;
    height: 130px;
    margin: 12px 0 0 1px;
    padding: 15px 0 0 18px;
    border-radius: 10px;
    background-color: rgba(249, 249, 249, 1);
  }
  .withdrawal-title {
    width: 60px;
    height: 21px;
    display: block;
    overflow-wrap: break-word;
    color: rgba(51, 51, 51, 1);
    font-size: 15px;
    font-family: PingFangSC-Regular;
    white-space: nowrap;
    line-height: 21px;
    text-align: center;
  }
  .withdrawal-price {
    display: flex;
    align-items: center;
    height: 28px;
    margin: 18px 0 0 4px;
  }
  .price-util {
    height: 28px;
    color: rgba(51, 51, 51, 1);
    font-size: 24px;
    line-height: 28px;
    font-weight: 600;
  }
  .price-input {
    width: 240px;
    height: 28px;
    color: rgba(51, 51, 51, 1);
    font-size: 24px;
    line-height: 28px;
    font-weight: 600;
    padding: 0;
    margin-left: 9px;
    background-color: transparent;
    border: none;
  }
  .line {
    width: 281px;
    height: 1px;
    background: #D8D8D8;
    margin: 2px 0 10px 1px;
  }
  .use-price {
    font-size: 15px;
    color: #999999;
    line-height: 22px;
  }
  .use-price-text {
    font-weight: 600;
  }
  .withdrawal-btn {
    height: 56px;
    color: rgba(255, 255, 255, 1);
    font-size: 16px;
    line-height: 56px;
    text-align: center;
    margin-top: 32px;
    background-color: rgba(239, 26, 0, 1);
    border-radius: 10px;
  }
  .unclick {
    background-color: rgba(239, 26, 0, 0.5);
  }
  .withdrawal-desc {
    color: rgba(153, 153, 153, 1);
    font-size: 15px;
    line-height: 22px;
    padding-bottom: 50px;
    margin-top: 40px;
  }
  .withdrawal-history {
    color: rgba(239, 26, 0, 1);
    font-size: 15px;
    line-height: 22px;
    text-align: center;
    margin-top: 24px;
  }

  .msg-popup {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
    padding: 20px 16px;
    background: #FFFFFF;
    border-radius: 10px;
  }
  .popup-title {
    font-size: 16px;
    font-weight: 600;
    color: #333333;
    line-height: 22px;
    margin-bottom: 20px;
  }
  .popup-name {
    font-size: 16px;
    color: #666666;
    line-height: 22px;
    margin-bottom: 5px;
  }
  .popup-price {
    width: 100%;
    font-size: 24px;
    font-weight: bold;
    color: #EF1A00;
    line-height: 28px;
    text-align: center;
    padding-bottom: 5px;
    margin-bottom: 20px;
    border-bottom: 1px solid #D8D8D8;
  }
  .info-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 5px;
  }
  .info-item-title {
    font-size: 16px;
    color: #666666;
    line-height: 22px;
  }
  .info-item-text {
    font-size: 16px;
    color: #333333;
    line-height: 19px;
  }
  .info-item-bold {
    font-weight: bold;
  }
  .time-down {
    width: 100%;
    height: 37px;
    font-size: 16px;
    color: #666;
    line-height: 22px;
    text-align: center;
    padding-bottom: 20px;
    margin-bottom: 25px;
    border-bottom: 1px solid #d8d8d8;
  }
  .get-code-down {
    color: #EF1A00;
  }
  .popup-btn-list {
    display: flex;
    align-items: center;
  }
  .popup-btn {
    width: 108px;
    height: 36px;
    font-size: 14px;
    color: #333;
    font-weight: 600;
    line-height: 36px;
    text-align: center;
    border-radius: 18px;
  }
  .popup-btn-gray {
    border: 1px solid #CCCCCC;
  }
  .popup-btn-red {
    color: #FFFFFF;
    background: #EF1A00;
    margin-left: 15px;
  }
</style>
