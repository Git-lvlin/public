<template>
  <div class="container" v-if="!isWeixin">
    <div class="head"
      :style="{
        'background-image': `url('${type?edImg:img}')`,
        'height': `${type?'450px':'351px'}`
      }"
    >
      <div @click="hasWx" v-show="type" class="button">立即下载</div>
      <!-- <p id="downloadButton2" v-show="type" class="p">已安装？点这里打开约购</p> -->
    </div>
    <div class="register-box" v-show="!type">
      <div class="phone">
        <input class="input phone-input" @focus="focus" v-model="phone" maxlength="11" oninput="value=value.replace(/[^\d]/g,'')" type="text" placeholder="请输入手机账号">
      </div>
      <div class="phone-err">{{phoneErr}}</div>
      <div class="code-box">
        <div class="code">
          <input class="input code-input" @focus="focus" v-model="code" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入验证码" type="text">
        </div>
        <div class="code-btn" @click="getCode" v-if="countDown">{{codeText}}</div>
        <div class="code-btn" v-else v-html="time"></div>
      </div>
      <div class="code-err">{{codeErr}}</div>
      <div class="button" @click="reg">提交</div>
    </div>
    <div class="title"><span class="red">约购</span>APP 约着买 更便宜</div>
    <div class="subtitle">物美价廉有温度</div>
    <van-image
      class="border"
      width="26px"
      height="4px"
      :src="getImgUrl('publicMobile/share/border.png')"
    />
    <div class="detail">
      <div class="item">
        <van-image
          width="60px"
          height="60px"
          :src="getImgUrl('publicMobile/share/img1.png')"
        />
        <div class="right-box">
          <p class="p1">约着买 <span class="red">更省心</span></p>
          <p class="p2">品牌直供 质量保障</p>
        </div>
      </div>
      <div class="item">
        <van-image
          width="60px"
          height="60px"
          :src="getImgUrl('publicMobile/share/img2.png')"
        />
        <div class="right-box">
          <p class="p1">轻创业 <span class="red">低成本</span></p>
          <p class="p2">约购模式 创富首选</p>
        </div>
      </div>
      <!-- <div class="item">
        <van-image
          width="60px"
          height="60px"
          :src="getImgUrl('publicMobile/share/img3.png')"
        />
        <div class="right-box">
          <p class="p1">邻里互动 <span class="red">更高效</span></p>
          <p class="p2">即时分享新动态 邻里更亲密</p>
        </div>
      </div> -->
    </div>
    <div class="bottom-box" v-show="flag">
      <van-image
        class="logo"
        width="54px"
        height="54px"
        :src="getImgUrl('publicMobile/share/logo.png')"
      />
      <div class="content-box">
        <p class="text1">约购-约着买更便宜</p>
        <!-- <p class="text2">新人注册领168元好礼</p> -->
      </div>
      <van-image
        class="bottom-img"
        width="112px"
        height="40px"
        :src="getImgUrl('publicMobile/share/button-img.png')"
        @click="hasWx"
      />
    </div>
    <!-- 活动规则弹窗 -->
    <van-popup
      v-model="show"
      :lazy-render="false"
      round
      :style="{ height: '203px' }"
    >
      <div class="popup-box">
        <div class="title">温馨提示</div>
        <div class="subtitle">此手机号已经注册过啦，点击下载约购APP体验吧~ </div>
        <div @click="hasWx" class="btn">下载约购APP</div>
      </div>
    </van-popup>
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
import { Image as VanImage, Popup } from 'vant';
import { getImgUrl } from '@/utils/tools';
import { appBaseUrl, meBaseUrl } from "@/constant/index";
import { goToApp } from '@/utils/userInfo';
import teamApi from '@/apis/newshare';
Vue.use(VanImage);
Vue.use(Popup);
export default {
  data() {
    return {
      isWeixin: 0,
      show: 0,
      edImg: getImgUrl('publicMobile/newshare/new-share-bg-ed.png'),
      img: getImgUrl('publicMobile/newshare/new-share-bg.png'),
      type: 0,
      phone: '',
      code:'',
      phoneErr: '',
      codeErr: '',
      codeText: '获取验证码',
      time: 60,
      countDown: 1,
      inviteCode: null,
      flag: 1,
    };
  },
  components: {
  },
  created () {
    // const a = document.createElement('script');
    // a.type = 'text/javascript';
    // a.src = 'https://web.cdn.openinstall.io/openinstall.js';
    // document.body.appendChild(a);
    // a.onload = () => {
    //   setTimeout(() => {
    //     this.nowUpdata()
    //   }, 0)
    // }
  },
  mounted() {
    this.getInviteCode()
  },
  methods: {
    hasWx() {
      this.show = 0;
      const ua = window.navigator.userAgent.toLowerCase();
      if(ua.match(/MicroMessenger/i) == 'micromessenger' || ua.match(/_SQ_/i) == '_sq_'){
        this.isWeixin = 1;
        return
      }
      goToApp(meBaseUrl, '/web/transfer', '', this.$bridge);
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
      teamApi.getCode({phoneNumber: this.phone})
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
    // nowUpdata() {
    //   const data = OpenInstall.parseUrlParams();///openinstall.js中提供的工具函数，解析url中的所有查询参数
    //   new OpenInstall({
    //     /*appKey必选参数，openinstall平台为每个应用分配的ID*/
    //     appKey : "sh7yz9",
    //     preferWakeup:true,
    //     /*自定义遮罩的html*/
    //     //mask:function(){
    //     //  return "<div id='_shadow' style='position:fixed;left:0;top:0;background:rgba(0,255,0,0.5);filter:alpha(opacity=50);width:100%;height:100%;z-index:10000;'></div>"
    //     //},
    //     /*OpenInstall初始化完成的回调函数，可选*/
    //     onready : function() {
    //       /*在app已安装的情况尝试拉起app*/
    //       this.schemeWakeup();
          
    //       /*用户点击某个按钮时(假定按钮id为downloadButton)，安装app*/
    //       var m = this,
    //       button = document.getElementById("downloadButton"),
    //       button2 = document.getElementById("downloadButton2"),
    //       button3 = document.getElementById("downloadButton3"),
    //       button4 = document.getElementById("downloadButton4");
    //       if (button) {
    //         button.onclick = function() {
    //           m.wakeupOrInstall();
    //           return false;
    //         }
    //       }
    //       if (button2) {
    //         button2.onclick = function() {
    //           m.wakeupOrInstall();
    //           return false;
    //         }
    //       }
    //       if (button3) {
    //         button3.onclick = function() {
    //           m.wakeupOrInstall();
    //           return false;
    //         }
    //       }
    //       if (button4) {
    //         button4.onclick = function() {
    //           m.wakeupOrInstall();
    //           return false;
    //         }
    //       }
    //     }
    //   }, data);
    // }
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
    .button {
      width:250px;
      height:50px;
      background-color:#ffffff;
      border-radius:3px;
      box-shadow:0px 2px 8px #ea291e;
      font-family:PingFang SC;
      color:#ea4036;
      font-size:16px;
      letter-spacing:1px;
      line-height:50px;
      text-align:center;
      margin: 0 auto;
      margin-top: 279px;
      z-index: 2;
    }
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
        width: 117px;
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
.register-box {
  padding: 23px 32px 7px 32px;
  display: flex;
  flex-direction: column;
  .phone {
    width: 311px;
    height: 46px;
    border-radius: 6px;
    border: 1px solid #E5352F;
    overflow: hidden;
  }
  .phone-err {
    margin-top: 6px;
    width: 100%;
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #EA3D35;
    line-height: 20px;
  }
  .code-box {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    .code {
      width: 196px;
      height: 46px;
      border-radius: 6px;
      border: 1px solid #E5352F;
      overflow: hidden;
    }
    .code-btn {
      margin-left: 6px;
      text-align: center;
      width: 109px;
      height: 46px;
      background: #E5352F;
      border-radius: 6px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 46px;
    }
  }
  .code-err {
    margin-top: 6px;
    width: 100%;
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #EA3D35;
    line-height: 20px;
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
  .input {
    padding-left: 12px;
    outline-style: none;
    border: 0;
    width: 100%;
    height: 100%;
    font-size: 18px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #000;
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
</style>
