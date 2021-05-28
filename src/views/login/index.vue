<template>
  <div
    id="login"
    :style="{'min-height':innerHeight}"
  >
    <div class="head-img">
      <img src="~@/assets/images/login/text.png">
    </div>

    <div class="login-container">
      <van-form
        @submit="onSubmit"
        :show-error="false"
      >
        <van-field
          v-model="phone"
          type="tel"
          name="phone"
          label="手机号码"
          placeholder="请输入11位手机号码"
          :rules="[{pattern:/1\d{10}/, required: true, message: '请输入11位手机号码' }]"
          maxlength="11"
        />
        <van-field
          v-model="captchaCode"
          type="tel"
          name="图形验证码"
          label="图形验证码"
          placeholder="请输入图形验证码"
          :rules="[{ required: true }]"
          maxlength="4"
        >
          <template #button>
            <img
              class="img-code"
              :src="`https://bingou.com.cn/captcha?${captchaRandom}`"
              @click="changeCaptchaRandom"
            />
          </template>
        </van-field>
        <van-field
          v-model="smsCode"
          type="tel"
          name="短信验证码"
          label="短信验证码"
          placeholder="请输入短信验证码"
          :rules="[{ required: true }]"
          maxlength="6"
        >
          <template #button>
            <div
              v-if="!showCountDown"
              class="send_msg_code"
              @click="sendMsgCode"
            >获取验证码</div>
            <van-count-down
              v-else
              :time="time"
              format="重新获取ss"
              @finish="countDownFinish"
            />
          </template>
        </van-field>
        <div class="referrer">
          我的推荐人：无
        </div>
        <div style="margin: 16px;">
          <van-button
            round
            block
            type="info"
            native-type="submit"
            color="linear-gradient(90deg,#FE8773,#E32A13)"
          >
            进入商城
          </van-button>
        </div>
        <div class="agreement">
          <van-checkbox
            v-model="checked"
            checked-color="red"
          />我已阅读并同意<span>《用户协议》</span>和<span>《隐私协议》</span>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import {
  Form, Field, Button, CountDown, Checkbox,
} from 'vant';

export default {
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
    [CountDown.name]: CountDown,
    [Checkbox.name]: Checkbox,
  },
  data() {
    return {
      innerHeight: `${window.innerHeight}px`,
      phone: '',
      captchaCode: '',
      captchaRandom: Math.random(),
      smsCode: '',
      time: 60 * 1000,
      showCountDown: false,
      checked: true,
    };
  },
  methods: {
    changeCaptchaRandom() {
      this.captchaRandom = Math.random();
    },
    sendMsgCode() {
      this.showCountDown = true;
    },
    countDownFinish() {
      this.showCountDown = false;
    },
  },
};
</script>

<style lang="scss" scoped>
#login {
  background: #bd2520 url("~@/assets/images/login/bg.png") no-repeat;
  background-size: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .head-img {
    text-align: center;
    padding-top: 10px;
    img {
      width: 86%;
    }
  }

  .login-container {
    padding: 15px 0;
    margin: 0 15px;
    background: #fff;
    border-radius: 8px;
  }

  .img-code {
    width: 82px;
  }

  .send_msg_code {
    color: red;
  }

  .referrer {
    text-align: center;
    font-size: 14px;
    margin: 10px 0;
  }

  .agreement {
    display: flex;
    font-size: 14px;
    justify-content: center;

    span {
      color: #4888f0;
    }

    ::v-deep .van-checkbox {
      margin-right: 3px;
    }
  }
}
</style>
