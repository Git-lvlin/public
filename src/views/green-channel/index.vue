<template>
  <div class="container" v-if="pageType===1">
    <div class="register-box">
      <div class="phone">
        <div class="error" v-if="nameErr">
          <van-image
            class="error-icon"
            width="14px"
            height="14px"
            :src="getImgUrl('publicMobile/green/icon-error.png')"
          />
          <div class="msg">{{nameErr}}</div>
        </div>
        <div class="span"></div>
        <div class="label">店铺名称</div>
        <input class="input phone-input" :class="storeName?'hasContent':'noContent'" @focus="focusChange('name')" v-model="storeName" type="text" placeholder="2-15个字，仅支持汉字、字母、-">
      </div>
      <div class="phone" @click="onShowPicker">
        <div class="error" v-if="areaAllErr">
          <van-image
            class="error-icon"
            width="14px"
            height="14px"
            :src="getImgUrl('publicMobile/green/icon-error.png')"
          />
          <div class="msg">{{areaAllErr}}</div>
        </div>
        <div class="span"></div>
        <div class="label">所属地区</div>
        <div class="input phone-input" :class="areaAll!=='请选择'?'hasContent':''">{{areaAll}}</div>
        <van-image
          class="address-icon"
          width="12px"
          height="12px"
          :src="getImgUrl('publicMobile/green/right.png')"
        />
      </div>
      <div class="phone">
        <div class="error" v-if="addressErr">
          <van-image
            class="error-icon"
            width="14px"
            height="14px"
            :src="getImgUrl('publicMobile/green/icon-error.png')"
          />
          <div class="msg">{{addressErr}}</div>
        </div>
        <div class="span"></div>
        <div class="label">详细地址</div>
        <input class="input phone-input" :class="address?'hasContent':''" @focus="focusChange('address')" v-model="address" type="text" placeholder="例：26号2单元201室">
      </div>
      <div class="pic-upload">
        <div class="upload-title">
          <div class="span"></div>
          <div class="label">证明材料</div>
        </div>
        <div class="pic-tips">
          <div class="t1">i</div>
          <div class="t2">请确保照片完整、图像清晰</div>
          <div class="t3" @click="look">查看示例</div>
        </div>
        <div class="upload-btn">
          <van-image
            class="upload-btn"
            width="156px"
            height="117px"
            :src="getImgUrl('publicMobile/green/upload-icon.png')"
          />
          <input id="file" @change='handleFileChange' type="file" ref="inputer" name="file" accept="image/png,image/jpeg,image/gif,image/jpg" />
        </div>
      </div>
      <div class="phone">
        <div class="error" v-if="phoneErr">
          <van-image
            class="error-icon"
            width="14px"
            height="14px"
            :src="getImgUrl('publicMobile/green/icon-error.png')"
          />
          <div class="msg">{{phoneErr}}</div>
        </div>
        <div class="span"></div>
        <div class="label">手机号码</div>
        <input class="input phone-input" :class="phone?'hasContent':''" @focus="focusChange('phone')" v-model="phone" maxlength="11" oninput="value=value.replace(/[^\d]/g,'')" type="text" placeholder="请输入手机号码">
      </div>
      <div class="code-box">
        <div class="error" v-if="codeErr">
          <van-image
            class="error-icon"
            width="14px"
            height="14px"
            :src="getImgUrl('publicMobile/green/icon-error.png')"
          />
          <div class="msg">{{codeErr}}</div>
        </div>
        <div class="span"></div>
        <div class="label">短信验证码</div>
        <input class="input code-input" :class="code?'hasContent':''" @focus="focusChange('code')" v-model="code" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入验证码" type="text">
        <div class="code-btn" @click="getCode" v-if="countDown">{{codeText}}</div>
        <div class="code-btn code-btn-no" v-else v-html="time + 'S后再次发送'"></div>
      </div>
    </div>
    <div class="submit-top"></div>
    <div class="submit">
      <div class="submit-text-box">
        <div class="click-reg" @click="checkTypeChange"></div>
        <van-image
          v-show="checkType"
          class="submit-yes-icon"
          width="18px"
          height="18px"
          :src="getImgUrl('publicMobile/green/checked.png')"
        />
        <van-image
          v-show="!checkType"
          class="submit-yes-icon"
          width="18px"
          height="18px"
          :src="getImgUrl('publicMobile/green/checkout.png')"
        />
        <div class="submit-text">我已阅读并同意和签订<span class="red-span" @click="lookXY(0)">店铺协议</span>、<span class="red-span" @click="lookXY(1)">隐私政策</span>和<span class="red-span" @click="lookXY(2)">服务合同</span></div>
      </div>
      <div class="submit-button" :class="checkType?'open':''" @click="submit">提交申请</div>
    </div>
    <van-popup v-model="showPicker" round position="bottom">
      <van-picker show-toolbar @confirm="onConfirm" @cancel="onCancel" title="所属地区" :columns="columns" />
    </van-popup>
  </div>
  <div class="container2" v-else-if="pageType===2">
    <div class="look-h1">请确保图像清晰完整，光线均匀</div>
    <div class="look-h2">图片符合要求才能更快完成审核</div>
    <van-image
      class="look-img"
      width="100%"
      height="238px"
      :src="getImgUrl('publicMobile/green/example.png')"
    />
    <div class="look-btn" @click="ok">知道了</div>
  </div>
  <div class="container3" v-else>
    <van-image
      class="success-icon"
      width="188px"
      height="188px"
      :src="getImgUrl('publicMobile/green/ed.png')"
    />
    <div class="ed-title">资料提交成功</div>
    <div class="ed-border"></div>
    <div class="ed-info">
      <div class="ed-info-title">申请信息</div>
      <div class="ed-info-item">
        <div class="ed-item-label">手机号码</div>
        <div class="ed-item-value">{{phone}}</div>
      </div>
      <div class="ed-info-item">
        <div class="ed-item-label">店铺名称</div>
        <div class="ed-item-value">{{storeName}}</div>
      </div>
      <div class="ed-info-item">
        <div class="ed-item-label">提货点地址</div>
        <div class="ed-item-value ed-address">{{address}}</div>
      </div>
    </div>
    <div class="ed-btn" @click="download">下载约购APP</div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Image as VanImage, Popup, Picker, Toast } from 'vant';
import { getImgUrl, arrayToTree } from '@/utils/tools';
import CallApp from 'callapp-lib';
import { DOWNLOAD_ANDROID, DOWNLOAD_IOS } from '@/constant/common';
import teamApi from '@/apis/newshare';
import api from '@/apis/green';
import axios from 'axios';
Vue.use(VanImage);
Vue.use(Popup);
Vue.use(Picker);
export default {
  data() {
    return {
      isWeixin: 0,
      show: 0,
      type: 0,
      phone: null,
      code: null,
      codeText: '获取验证码',
      time: 60,
      countDown: 1,
      inviteCode: null,
      flag: 1,
      url: null,
      checkType: false,
      fil: null,
      uploadConfig: null,
      uploadUrl: null,
      storeName: null,
      province: '湖北省',
      city: '黄冈市',
      reg: '红安县',
      address: null,
      pageType: 1,
      showPicker: false,
      columns: null,
      areaAll: '请选择',
      nameErr: null,
      phoneErr: null,
      codeErr: null,
      addressErr: null,
      areaAllErr: null,
      xy: [
        '/web/agreement',
        '/web/agreement?reg=user&index=0',
        '/web/agreement?reg=user&index=1'
      ]
    };
  },
  components: {
  },
  created () {
    this.getUrl()
  },
  mounted() {
    // const {
    //   query,
    // } = this.$router.history.current;
    // this.inviteCode = query.inviteCode
    // this.url = query.url || ''
    // this.type = query.type || 0
    // const ua = window.navigator.userAgent.toLowerCase();
    // if(ua.match(/MicroMessenger/i) == 'micromessenger' || ua.match(/_SQ_/i) == '_sq_') {
    //   this.isWeixin = query.isWeixin || 0
    // }
    const area = arrayToTree(window.yeahgo_area)
    let str = JSON.stringify(area)
    str = str.replace(/name/g, 'text')
    this.columns = JSON.parse(str)
  },
  methods: {
    lookXY(type) {
      this.$router.push({
        path: xy[type],
        query: {
          inviteCode: this.inviteCode
        },
      });
    },
    onShowPicker() {
      this.showPicker = true
    },
    onConfirm(value) {
      this.areaAllErr = ''
      this.showPicker = false
      this.areaAll = value[0] + '-' + value[1] + '-' + value[2]; 
      this.province = value[0]
      this.city = value[1]
      this.reg = value[2]
    },
    onCancel() {
      console.log('取消');
      this.showPicker = false
    },
    download() {
      const u = window.navigator.userAgent;
      console.log('u', u)
      const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
      const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
        //这个是安卓操作系统
        window.location.href = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.hznt.yeahgo';
      }
      if (isIOS) {
    　　//这个是ios操作系统
        window.location.href = 'itms-apps://itunes.apple.com/app/id1556552939?action=write-review';
      }
    },
    ok() {
      this.pageType = 1
    },
    look() {
      this.pageType = 2
    },
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
      if (!this.storeName) {
        this.nameErr = '请输入店铺名称'
        return
      }
      if (!this.areaAll) {
        this.areaAllErr = '请选择提货点所属地区'
        return
      }
      if (!this.address) {
        this.addressErr = '如您填报的地址有误，将无法及时收到商品，其损失由您承担'
        return
      }
      if (!this.uploadUrl) {
        Toast({message: '请上传证明材料'});
        return
      }
      if (!this.phone) {
        this.phoneErr = '请输入的手机号有误'
        return
      }
      if (!this.code) {
        this.codeErr = '请输入的验证码有误'
        return
      }
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
        if (res.code === 0) {
          console.log('提交成功', res)
          this.pageType = 3
        } else {
          switch(res.data.key) {
            case 'storeName':
              this.nameErr = res.msg;
              break
            case 'credentialList':
              Toast({message: res.msg});
              break
            case 'phoneNumber':
              this.phoneErr = res.msg;
              break
          }
        }
      })
    },
    checkTypeChange() {
      this.checkType = !this.checkType
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
    focusChange(type) {
      switch(type) {
        case 'name':
          this.nameErr = ''
          break
        case 'phone':
          this.phoneErr = ''
          break
        case 'code':
          this.codeErr = ''
          break
        case 'address':
          this.addressErr = ''
          break
      }
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
    handReg() {
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
  background-color: #FFFFFF;
}
.container3 {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #FFFFFF;
}
.success-icon {
  margin-top: 19px;
}
.ed-title {
  margin-top: 22px;
  font-size: 24px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
.ed-border {
  margin-top: 48px;
  margin-bottom: 24px;
  width: 311px;
  height: 1px;
  border: 1px solid #F5F5F5;
}
.ed-info {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 311px;
  .ed-info-title {
    margin-bottom: 16px;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #000000;
  }
  .ed-info-item {
    margin-bottom: 12px;
    display: flex;
    justify-content: flex-start;
    .ed-item-label {
      text-align: left;
      width: 81px;
      height: 18px;
      font-size: 13px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 18px;
    }
    .ed-item-value {
      font-size: 13px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
    }
    .ed-address {
      width: 230px;
    }

  }
}
.ed-btn {
  margin-top: 133px;
  width: 311px;
  height: 48px;
  background: linear-gradient(250deg, #F4655C 0%, #E5352F 100%);
  border-radius: 8px;
  line-height: 48px;
  text-align: center;
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #FFFFFF;
}
.look-h1 {
  margin-top: 30px;
  margin-bottom: 8px;
  width: 100%;
  font-size: 22px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  text-align: center;
}
.look-h2 {
  margin-bottom: 16px;
  width: 100%;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  text-align: center;
}
.look-btn {
  margin: 0 auto;
  margin-top: 80px;
  width: 343px;
  height: 48px;
  background: #E5352F;
  box-shadow: 0px 3px 6px 0px rgba(229, 53, 47, 0.4);
  border-radius: 8px;
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #FFFFFF;
  line-height: 48px;
  text-align: center;
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
    position: relative;
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
    .code-btn-no {
      opacity: .5;
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
    position: relative;
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
    position: relative;
    .click-reg {
      position: absolute;
      top: -30px;
      left: -16px;
      width: 60px;
      height: 60px;
      z-index: 1;
    }
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
  .open {
    opacity: 1;
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
    margin-left: 2px;
  }
}
#file {
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.address-icon {
  position: absolute;
  right: 0;
}
.hasContent {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
}
.noContent {
  color: #ccc;
}

input::-webkit-input-placeholder{
  color: #ccc;
}
input::-moz-placeholder{   /* Mozilla Firefox 19+ */
  color: #ccc;
}
input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
  color: #ccc;
}
input:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
  color: #ccc;
}
</style>
