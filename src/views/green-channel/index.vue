<template>
  <div class="container" v-if="!isWeixin">
    <div class="register-box">
      <div class="phone">
        <div class="error">
          <van-image
            class="error-icon"
            width="14px"
            height="14px"
            :src="getImgUrl('publicMobile/share/logo.png')"
          />
          <div class="msg">请输入店铺名称</div>
        </div>
        <div class="span"></div>
        <div class="label">店铺名称</div>
        <input class="input phone-input" @focus="focus" v-model="phone" maxlength="11" oninput="value=value.replace(/[^\d]/g,'')" type="text" placeholder="2-15个字，仅支持汉字、字母、-">
      </div>
      <div class="phone">
        <div class="span"></div>
        <div class="label">所属地区</div>
        <input class="input phone-input" @focus="focus" v-model="phone" maxlength="11" oninput="value=value.replace(/[^\d]/g,'')" type="text" placeholder="请选择">
        <van-image
          class="address-icon"
          width="5.5px"
          height="9.5px"
          :src="getImgUrl('publicMobile/share/logo.png')"
        />
      </div>
      <div class="phone">
        <div class="span"></div>
        <div class="label">详细地址</div>
        <input class="input phone-input" @focus="focus" v-model="phone" maxlength="11" oninput="value=value.replace(/[^\d]/g,'')" type="text" placeholder="例：26号2单元201室">
      </div>
      <div class="pic-upload">
        <div class="upload-title">
          <div class="span"></div>
          <div class="label">证明材料</div>
        </div>
        <div class="pic-tips">
          <div class="t1">i</div>
          <div class="t2">请确保照片完整、图像清晰</div>
          <div class="t3">查看示例</div>
        </div>
        <div class="upload-btn">
          <van-image
            class="upload-btn"
            width="156px"
            height="117px"
            :src="getImgUrl('publicMobile/share/logo.png')"
          />
          <input id="file" @change='handleFileChange' type="file" ref="inputer" name="file" accept="image/png,image/jpeg,image/gif,image/jpg" />
        </div>
      </div>
      <div class="phone">
        <div class="span"></div>
        <div class="label">手机号码</div>
        <input class="input phone-input" @focus="focus" v-model="phone" maxlength="11" oninput="value=value.replace(/[^\d]/g,'')" type="text" placeholder="请输入手机账号">
      </div>
      <div class="code-box">
        <div class="span"></div>
        <div class="label">短信验证码</div>
        <input class="input code-input" @focus="focus" v-model="code" oninput="value=value.replace(/[^\d]/g,'')" placeholder="输入验证码" type="text">
        <div class="code-btn" @click="getCode" v-if="countDown">{{codeText}}</div>
        <div class="code-btn" v-else v-html="time"></div>
      </div>
    </div>
    <div class="submit-top"></div>
    <div class="submit">
      <div class="submit-text-box">
        <van-image
          class="submit-yes-icon"
          width="18px"
          height="18px"
          :src="yes?getImgUrl('publicMobile/share/logo.png'):getImgUrl('publicMobile/share/logo.png')"
        />
        <div class="submit-text">我已阅读并同意和签订 <span class="red-span">店铺协议</span>、<span class="red-span">隐私政策</span>和<span class="red-span">服务合同</span></div>
      </div>
      <div class="submit-button" @click="submit">提交申请</div>
    </div>
    <!-- 活动规则弹窗 -->
    <!-- <van-popup
      v-model="show"
      :lazy-render="false"
      round
      :style="{ height: '203px' }"
    >
      <div class="popup-box">
        <div class="title">温馨提示</div>
        <div class="subtitle">此手机号已经注册过啦，点击打开/下载约购APP体验吧~ </div>
        <div @click="hasWx" class="btn">打开/下载约购APP</div>
      </div>
    </van-popup> -->
  </div>
  <div class="container2" v-else>
    <van-image
      class="wxtx"
      width="100%"
      :src="getImgUrl('publicMobile/common/transfer-wx.png')"
    />
  </div>
</template>

<script>
import Vue from 'vue';
import { Image as VanImage, Popup, Uploader } from 'vant';
import { getImgUrl } from '@/utils/tools';
import CallApp from 'callapp-lib';
import { DOWNLOAD_ANDROID, DOWNLOAD_IOS } from '@/constant/common';
import teamApi from '@/apis/newshare';
import api from '@/apis/green';
import axios from 'axios';
Vue.use(VanImage);
Vue.use(Popup);
Vue.use(Uploader);
export default {
  data() {
    return {
      isWeixin: 0,
      show: 0,
      type: 0,
      phone: '13681935443',
      code: '1234',
      phoneErr: '',
      codeErr: '',
      codeText: '获取验证码',
      time: 60,
      countDown: 1,
      inviteCode: null,
      flag: 1,
      url: null,
      yes: false,
      fil: null,
      uploadConfig: null,
      uploadUrl: 'https://dev-yeahgo-oss.yeahgo.com//store/greenchannel1645262793160.png',
      storeName: 'mmmmmmmm',
      province: '湖北省',
      city: '黄冈市',
      reg: '红安县',
      address: 'aaaaaa'
    };
  },
  components: {
  },
  created () {
    this.getUrl()
  },
  mounted() {
    const {
      query,
    } = this.$router.history.current;
    this.inviteCode = query.inviteCode
    this.url = query.url || ''
    this.type = query.type || 0
    const ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger' || ua.match(/_SQ_/i) == '_sq_') {
      this.isWeixin = query.isWeixin || 0
    }
  },
  methods: {
    uploadAttach(data) {
      console.log('data', data)
      let contentLen = Math.round(data.file.size * 100 / 1024) / 100
      let fd = new FormData()
      fd.append('Content-Length', contentLen)
      fd.append('OSSAccessKeyId', data.OSSAccessKeyId)
      fd.append('policy', data.policy)
      fd.append('signature', data.signature)
      // 文件名字
      fd.append('key', data.path + data.name)
      fd.append('dir', data.path)
      fd.append('success_action_status', '200')
      // 文件必须声明在最后，否则异常
      fd.append('file', data.file)
      return new Promise((resolve, reject) => {
        axios.post(data.imgServer, fd, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          transformRequest: (data) => {
            return data
          }
        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getUrl() {
      api.getUploadUrl().then((res) => {
        console.log('uploadConfig', res)
        this.uploadConfig = res.data
      })
    },
    async handleFileChange(r) {
      console.log('r', r)
      let fileName = new Date().getTime()
      let dom = this.$refs.inputer
      this.file = dom.files[0];
      let file = dom.files[0];
      let data = {}
      const {host, accessid, policy, signature, dir} = this.uploadConfig
      data.imgServer = host
      data.OSSAccessKeyId = accessid
      data.policy = policy
      data.signature = signature
      data.path = dir
      let format = file.name.substring(file.name.lastIndexOf('.', file.name.length - 1))
      fileName = fileName + format
      data.name = fileName
      data.file = file
      this.uploadAttach(data).then((res) => {
        console.log('uploadAttach', {
          res: res,
          url: data.imgServer + '/' + data.path + data.name
        })
        this.uploadUrl = data.imgServer + '/' + data.path + data.name
      })
    },
    submit() {
      // if (!this.yes) {
      //   return
      // }
      const param = {
        storeName: this.storeName,
        provinceName: this.province,
        cityName: this.city,
        regionName: this.reg,
        address: this.address,
        credentialList: [this.uploadUrl],
        captcha: this.code,
        phoneNumber: this.phone,
      }
      api.submit(param).then((res) => {
        console.log('提交成功', res)
      })
    },
    onYes() {
      this.yes = !this.yes
    },
    onOpenApp() {
      console.log("🚀 ~ this.$store.state.appInfo", this.$store.state.appInfo)
      if (this.$store.state.appInfo.isApp || this.$store.state.appInfo.isMiniprogram) {
        return;
      }
      console.log('DOWNLOAD_ANDROID', DOWNLOAD_ANDROID);
      const options = {
        scheme: {
          //URL Scheme 的 scheme 字段，要打开的 APP 的标识
          protocol: 'yeahgo'
        },
        //安卓原生谷歌浏览器必须传递 Intent 协议地址，才能唤起 APP
        intent: {
          // APP包名
          package: 'com.hznt.yeahgo',
          scheme: 'yeahgo'
        },
        timeout: '3000',
        //APP 的 App Store
        appstore: DOWNLOAD_IOS,
        //APP 的应用宝地址，
        yingyongbao: DOWNLOAD_ANDROID,
        fallback: DOWNLOAD_ANDROID,
      };
      const callLib = new CallApp(options);
      // const h5Url = `${meBaseUrl}/web/polite-animation?_authorizationRequired=1`;
      callLib.open({
        path: "",
        //要传递的参数
        param: {
          parameter: `${this.url || ''}`,
        }
      })
    },
    hasWx() {
      this.show = 0;
      const ua = window.navigator.userAgent.toLowerCase();
      if(ua.match(/MicroMessenger/i) == 'micromessenger' || ua.match(/_SQ_/i) == '_sq_'){
        window.location.href += `&type=${this.type}&isWeixin=${1}`
        return
      } else {
        this.onOpenApp()
      }
      // window.location.href = `https://publicmobile.yeahgo.com/web/transfer`;
    },
    getInviteCode() {
      const {
        query,
      } = this.$router.history.current;
      this.inviteCode = query.inviteCode
    },
    focus() {
      this.flag = 0
    },
    blur() {
      this.flag = 1
    },
    getCode() {
      this.blur()
      if (!this.phone) {
        this.phoneErr='请输入手机号'
        return
      }
      if (this.phone.length !== 11) {
        this.phoneErr='手机号格式错误'
        return
      }
      this.countDown = 0
      api.getCode({phoneNumber: this.phone})
      let interval = setInterval(() => {
        if (this.time>0) {
          this.time -= 1
        } else {
          this.countDown = 1
          this.time = 60
          clearInterval(interval)
        }
      }, 1000)
    },
    reg() {
      this.blur()
      if (!this.code) {
        return
      }
      if (!this.phone) {
        return
      }
      if (this.phone.length !== 11) {
        return
      }
      const param = {
        authCode: this.code,
        phoneNumber: this.phone,
        inviteCode: this.inviteCode,
      }
      this.phoneErr = ''
      this.codeErr = ''
      console.log('param', param)
      teamApi.getReg(param, {showError: false})
        .then((res) => {
          if (res&&res.code == 0) {
            if (res.data.toString() == 'true') {
              this.type = 1
              return
            }
            if (res.data.toString() == 'false') {
              this.show = 1
            }
          } else {
            this.codeErr = res.msg || '验证码错误'
          }
        })
    },
    getImgUrl,
  },
};
</script>

<style lang='scss' scoped>
.container2 {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #FFFCFC;
  padding-bottom: 30px;
}
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #ffffff;
  padding-bottom: 111px;
  .head {
    width:100%;
    height: 450px;
    background-size: 100% 100%;
    .p {
      margin-top: 25px;
      width: 100%;
      font-family:PingFang SC;
      color:#ffffff;
      font-size:14px;
      text-decoration:underline;
      line-height:20px;
      text-align:center;
      z-index: 2;
    }
  }
  .title {
    margin-top: 41px;
    margin-bottom: 5px;
    height:25px;
    font-family:PingFang SC;
    font-weight:500;
    color:#000000;
    font-size:18px;
    line-height:25px;
    text-align:center;
    .red {
      color:#ea512b;
    }
  }
  .subtitle {
    margin-bottom: 18px;
    height:17px;
    font-family:PingFang SC;
    color:#8691a5;
    font-size:12px;
    line-height:17px;
    text-align:center;
  }
  .border {
    margin: 0 auto;
  }
  .detail {
    padding-bottom: 40px;
    margin-top: 23px;
    display: flex;
    flex-direction: column;
    .item {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 24px;
      .right-box {
        width: 140px;
        margin-left: 21px;
        display: flex;
        flex-direction: column;
        .p1 {
          height:22px;
          font-family:PingFang SC;
          font-weight:500;
          color:#000000;
          font-size:16px;
          line-height:22px;
          .red {
            color: #ea512b;
          }
        }
        .p2 {
          margin-top: 4px;
          height:20px;
          font-family:PingFang SC;
          color:#8691a5;
          font-size:14px;
          line-height:20px;
          white-space:nowrap;
        }
      }
    }
  }
  .bottom-box {
    position: fixed;
    bottom: 34px;
    width:100%;
    height:78px;
    background-color:#ffffff;
    box-shadow:0px -4px 8px rgba(0, 0, 0, 0.07);
    display: flex;
    justify-content: center;
    align-items: center;
    .content-box {
      margin: 0 22px 0 8px;
      width: 148px;
      display: flex;
      flex-direction: column;
      font-family:PingFang SC;
      color:#999999;
      font-size:12.7px;
      letter-spacing:0.45px;
      line-height:17px;
      .text1 {
        width: 100%;
        height:24px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-family:PingFang SC;
        font-weight:600;
        color:#000000;
        font-size:17px;
        line-height:24px;
      }
    }
  }
}
.input {
  outline-style: none;
  border: 0;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #CCCCCC;
}
.label {
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  line-height: 20px;
}
.span {
  margin-right: 6px;
  width: 4px;
  height: 4px;
  background: #E5352F;
  border-radius: 50%;
}
.register-box {
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  .phone {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 66px;
    overflow: hidden;
    border-bottom: 1px solid #F5F5F5;
    position: relative;
    .phone-input {
      margin-left: 32px;
      width: 208px;
      height: 20px;
    }
  }
  .code-box {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 66px;
    overflow: hidden;
    border-bottom: 1px solid #F5F5F5;
    .code-input {
      margin-left: 18px;
      width: 84px;
      height: 20px;
    }
    .code-btn {
      margin-left: 45px;
      text-align: center;
      width: 116px;
      height: 30px;
      background: #E5352F;
      border-radius: 6px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 30px;
    }
  }
  .button {
    text-align: center;
    margin-top: 22px;
    width: 311px;
    height: 48px;
    background: #E5352F;
    box-shadow: 0px 3px 6px 0px rgba(229, 53, 47, 0.4);
    border-radius: 8px;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
    line-height: 48px;
  }

}
.popup-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 295px;
  height: 203px;
  background: #FFFFFF;
  border-radius: 16px;
  overflow: hidden;
  .title {
    margin-top: 0;
    margin-bottom: 8px;
    text-align: center;
    width: 100%;
    height: 25px;
    font-size: 18px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #333333;
    line-height: 25px;
  }
  .subtitle {
    text-align: left;
    width: 228px;
    height: 42px;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 21px;
  }
  .btn {
    text-align: center;
    margin-top: 24px;
    width: 216px;
    height: 48px;
    background: #E5352F;
    border-radius: 4px;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
    line-height: 48px;
  }
}

.pic-upload {
  padding-top: 24px;
  padding-bottom: 23px;
  display: flex;
  flex-direction: column;
  width: 343px;
  border-bottom: 1px solid #F5F5F5;
  .upload-title {
    margin-bottom: 4px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .pic-tips {
    margin-bottom: 15px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 11px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #CCCCCC;
    line-height: 16px;
    .t1 {
      margin-right: 3px;
      width: 10px;
      height: 10px;
      border: 1px solid #CCCCCC;
      color: #CCCCCC;
      border-radius: 50%;
      text-align: center;
      line-height: 10px;
    }
    .t3 {
      margin-left: 10px;
      color: #E5352F;
      text-decoration: underline;
    }
  }
  .upload-btn {
    width: 156px;
    height: 117px;
    overflow: hidden;
  }
}
.submit-top {
  position: fixed;
  bottom: 138px;
  width: 100%;
  height: 8px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
  opacity: 0.1;
}
.submit {
  padding: 30px 16px 24px 16px;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 138px;
  background-color: #FFFFFF;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .submit-text-box {
    display: flex;
    justify-content: flex-start;
    .submit-text {
      margin-left: 8px;
      color: #666665;
      font-size: 13px;
      .red-span {
        color: #E5352F;
        text-decoration: underline;
      }
    }
  }
  .submit-button {
    margin-top: 18px;
    width: 343px;
    height: 48px;
    background: #E5352F;
    box-shadow: 0px 3px 6px 0px rgba(229, 53, 47, 0.4);
    border-radius: 8px;
    opacity: 0.5;
    text-align: center;
    line-height: 48px;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
  }
}
.error {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: absolute;
  bottom: 2px;
  left: 10px;
  width: 333px;
  font-size: 11px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #E5352F;
  .msg {
    margin-left: 4px;
  }
}
#file {
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
