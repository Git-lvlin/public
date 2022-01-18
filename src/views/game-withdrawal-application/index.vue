<template>
  <!-- <div> -->
  <div class="withdrawal-application">
    <!-- <div style="height: 50px"></div>
    <input
      v-model="accountInfo.withdrawAccount"
      placeholder="请输入支付宝账号，提现成功后不可修改"
    /> -->
    <div class="content-box">
      <div class="pay-box" v-if="bindState == 1">
        <div class="input-box">
          <input
            class="input"
            v-model="accountInfo.withdrawAccount"
            placeholder="请输入支付宝账号，提现成功后不可修改"
          />
        </div>
        <div class="input-box">
          <input
            class="input"
            v-model="accountInfo.withdrawRealname"
            placeholder="请输入支付宝账号的真实姓名"
          />
        </div>
      </div>
      <div class="alipay-user" v-if="bindState == 2">
        <span class="alipay-user-title">到账账户：</span>
        <img class="alipay-user-avatar" :src="userInfo.icon || defAvatar" />
        <span class="alipay-user-account">支付宝（{{getEncryption(accountInfo.withdrawAccount)}}）</span>
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
          <span class="use-price-text">{{accountInfo.balanceText}}</span>
          <span>元</span>
        </div>
      </div>
      <div
        :class="`withdrawal-btn ${price && accountInfo.withdrawAccount && accountInfo.withdrawRealname ? '' : 'unclick'}`"
        @click="onApply"
      >立即提现</div>
      <div class="withdrawal-history" @click="onToList">提现记录</div>
      <div class="withdrawal-desc">
        说明：
        <br />
        1、支付宝账号和用户名不一致将无法提现，请确认无误之后填写一个支付宝账号只能绑定一个约购APP进行提现。
        <br />
        2、支付宝账号提现成功后不能再修改，请谨慎操作。
        <br />
        3、前3次提现需≥0.13元，后面需要≥3元起并且为整数方可提现,例如3元、4元、5元····；
        <br />
        4、约购APP平台按照国家税收规定代缴纳20%的偶然所得税，从用户提现金额中扣除
        <br />
        5、提现永久有效
      </div>
    </div>

    <Popup
      :style="{background: 'transparent'}"
      v-model="showMsg"
      :close-on-click-overlay="false"
    >
      <div class="msg-popup">
        <span class="popup-title">请输入短信验证码</span>
        <span class="popup-name">提现</span>
        <span class="popup-price">¥{{price}}</span>
        <div class="info-item">
          <div class="info-item-title">提现服务费：</div>
          <div class="info-item-text"><span class="info-item-bold">{{parseFloat((+withdrawInfo.fee || 0) / 100).toFixed(2)}}</span>元</div>
        </div>
        <div class="info-item">
          <div class="info-item-title">偶然所得税20%：</div>
          <div class="info-item-text"><span class="info-item-bold">{{parseFloat((+withdrawInfo.tax || 0) / 100).toFixed(2)}}</span>元</div>
        </div>
        <div class="info-item">
          <div class="info-item-title">实际到账金额：</div>
          <div class="info-item-text"><span class="info-item-bold">{{parseFloat((+withdrawInfo.realAmount || 0) / 100).toFixed(2)}}</span>元</div>
        </div>
        <div class="withdrawal-ps ps-list">
          <PasswordInput
            :value="msgCode"
            length="4"
            :gutter="10"
            :mask="false"
            @focus="focusCode = true"
          />
        </div>
        <div class="time-down">
          <span>{{showTimeText}}</span>
          <span class="get-code-down" v-if="showReGetCode" @click="getWithdrawSms">重新获取</span>
        </div>
        <div class="popup-btn-list">
          <div class="popup-btn popup-btn-gray" @click="onShowMsg">取消</div>
          <div class="popup-btn popup-btn-red" @click="onConfrimApply">确认提现</div>
        </div>
      </div>
    </Popup>
    <NumberKeyboard
      :z-index="9999"
      maxlength="4"
      v-model="msgCode"
      :show="focusCode"
      @blur="focusCode = false"
    />
  </div>
</template>

<script>
import { Image, Toast, Popup, PasswordInput, NumberKeyboard } from 'vant';
import gameApi from '@/apis/game';
import { getImgUrl } from '@/utils/tools';
import { meBaseUrl } from "@/constant/index";
import { goToApp, backOff } from '@/utils/userInfo';

const timeText = 's后可重新获取'
const defTimeText = '60s后可重新获取'
let defToken = 'AQQAAAAAYfGMBhO1r6h85uACdaberb2ahlPFSv7KDBSE6JBgxdLkvYpcDoWnCKpMd4o=';

export default {
  data() {
    return {
      defAvatar: getImgUrl('publicMobile/common/default_avatar.png'),
      activityId: '',
      token: '',
      userInfo: {},
      msgCode: '',
      accountInfo: {},
      bindState: 0,
      focusCode: false,
      price: '',
      withdrawInfo: {},
      total: 0,
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
    let {
      at: token,
      bid: activityId,
    } = this.$router.history.current.query;
    this.token = token;
    this.activityId = activityId;
    if(!token) {
      backOff();
      return;
    }
    this.getAccountInfo();
    this.$bridge.callHandler('getUserInfo',{},(res) => {
      const d = JSON.parse(res);
      this.userInfo = d.data;
    })
  },
  methods: {
    getImgUrl,
    // 获取支付账户信息
    getAccountInfo() {
      gameApi.getAccountInfo({
        // activityId: this.activityId,
      }, {
        token: this.token,
      }).then(res => {
        if(res.code == 0) {
          this.bindState = !!res.data.isBinding ? 2 : 1;
          // res.data = {
          //   ...res.data,
          //   withdrawAccount: '441827.b23@sina.cn',
          //   withdrawRealname: '张三',
          // }
          res.data.balanceText = parseFloat(res.data.balance / 100).toFixed(2);
          this.accountInfo = res.data;
        }
      })
    },
    // 申请提现
    onApply() {
      const {
        price,
        accountInfo,
      } = this;
      const regNumber = /^[0-9]+(.[0-9]{1,2})?$/;
      const isNumber = regNumber.test(price);
      const regMobile = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
      const regEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      if(!accountInfo.isBinding && !accountInfo.withdrawAccount) {
        Toast({ message: '请输入支付宝账号' });
        return;
      }
      if(!accountInfo.isBinding && !accountInfo.withdrawRealname) {
        Toast({ message: '请输入支付宝账号的真实姓名' });
        return;
      }
      const isMobile = regMobile.test(accountInfo.withdrawAccount);
      const isEmail = regEmail.test(accountInfo.withdrawAccount);
      if(!isMobile && !isEmail) {
        Toast({ message: '您输入的支付宝账号不正确，请确认' });
        return;
      }
      if(!price) {
        Toast({ message: '请输入提现金额' });
        return;
      }
      if(!isNumber) {
        Toast({ message: '请输入正确金额' });
        return;
      }
      if(price * 100 > accountInfo.balance) {
        Toast('您的可提现金额不足');
        return;
      }
      // 检验金额
      gameApi.getWithdrawVerify({
        // activityId: this.activityId,
        amount: price * 100,
      }, {
        token: this.token,
      }).then(res => {
        if(res.code == 0 && res.data) {
          this.withdrawInfo = res.data;
          this.getWithdrawSms();
        }
      });
    },
    // 发送短信
    getWithdrawSms() {
      if(this.maxTime > 0 && this.maxTime < 59) {
        this.showMsg = true;
        return;
      }
      gameApi.getWithdrawSms({}, {
        token: this.token,
      }).then(res => {
        if(res.code == 0) {
          Toast({
            message: '短信验证码已发送至您的手机',
          });
          this.showMsg = true;
          this.showReGetCode = false;
          this.showTimeText = defTimeText;
          this.maxTime = 59;
          this.startTimeDown()
        }
      });
    },
    // 确认提现
    onConfrimApply() {
      gameApi.getWithdrawApply({
        // activityId: this.activityId,
        // amount: this.withdrawInfo.realAmount,
        amount: this.withdrawInfo.amount,
        withdrawAccount: this.accountInfo.withdrawAccount,
        withdrawRealname: this.accountInfo.withdrawRealname,
        verifyCode: this.msgCode,
      }, {
        token: this.token,
      }).then(res => {
        if(res.code == 0) {
          Toast({
            message: '申请成功',
          });
          this.msgCode = '';
          this.price = '';
          let timer = setTimeout(() => {
            this.onShowMsg();
            this.getAccountInfo();
            clearTimeout(timer);
          }, 1000)
        }
      });
    },
    onShowMsg() {
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
    getEncryption(account = '') {
      account = account.toString()
      let text = '';
      const emailLen = account.indexOf('@');
      if(emailLen > -1) {
        if (emailLen < 3) {
          text = account.slice(0, emailLen);
        } else {
          text = account.slice(0, 3);
        }
        text = `${text}***${account.slice(emailLen)}`
      } else {
        const pat=/(\d{3})\d*(\d{2})/
        text = account.replace(pat,'$1******$2');
      }
      return text;
    },
    // 跳转提现列表
    onToList() {
      const path = `/web/game-withdrawal-list?_immersive=0&at=${this.token}&bid=${this.activityId}`
      goToApp(meBaseUrl, path);
      // this.$router.push({
      //   path: '/web/game-withdrawal-list',
      //   query: {
      //     at: this.token,
      //     bid: this.activityId,
      //   },
      // });
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
    overflow: auto;
    background-color: rgba(249, 249, 249, 1);
  }
  .content-box {
    padding: 15px;
    background-color: #fff;
    border-radius: 10px;
  }

  .pay-box {
    margin-bottom: 20px;
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
    font-size: 15px;
    white-space: nowrap;
    line-height: 24px;
    padding: 0 15px 0 0;
    background-color: transparent;
    border: none;
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
    border-radius: 50%;
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
