<template>
  <div class="join-box" id="openAppBox">
    <div :class="listClass">
      <a @click="onOpenApp" >openAPP</a>
      <a @click="onOpenAli" >openAli</a>
      <div class="join-item" v-for="item in userList" key="item">
        <van-image custom-class="avatar" width="20" height="20" :src="item.avatar" />
        <div class="user-name" >{{item.name}}{{item.text}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Image } from 'vant';
import CallApp from 'callapp-lib';
import { getImgUrl } from '@/utils/tools';
import { DOWNLOAD_ANDROID, DOWNLOAD_IOS } from '@/constant/common';

export default {
  data() {
    return {
      userList: [{
        avatar: getImgUrl('publicMobile/common/defaultIcon.png'),
        name: '莫本溪阿萨',
        text: '获取水电费改成'
      }, {
        avatar: getImgUrl('publicMobile/common/defaultIcon.png'),
        name: '阿萨姆波哥',
        text: '获取一元'
      }, {
        avatar: getImgUrl('publicMobile/common/defaultIcon.png'),
        name: '哈尔德',
        text: '获取XXXXXXX'
      }, {
        avatar: getImgUrl('publicMobile/common/defaultIcon.png'),
        name: '莫本溪阿萨',
        text: '获取水电费改成'
      }, {
        avatar: getImgUrl('publicMobile/common/defaultIcon.png'),
        name: '阿萨姆波哥',
        text: '获取一元'
      }, {
        avatar: getImgUrl('publicMobile/common/defaultIcon.png'),
        name: '哈尔德',
        text: '获取XXXXXXX'
      }],
      listClass: {
        "join-list": true,
        transition: true,
        "transform-100": false,
        "transform-0": false,
      }
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
    onOpenApp() {
      console.log("🚀 ~ this.$store.state.appInfo", this.$store.state.appInfo)
      if (this.$store.state.appInfo.isApp || this.$store.state.appInfo.isMiniprogram) {
        return;
      }
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
        timeout: '5000',
        //APP 的 App Store
        appstore: DOWNLOAD_IOS,
        //APP 的应用宝地址，
        yingyongbao: DOWNLOAD_ANDROID,
        //唤端失败后跳转的地址。
        // fallback: ""
      };
      const callLib = new CallApp(options);
      // ${appUrl}?url=
      const appUrl = 'https://www.yeahgo.com/web/index';
      let h5Url = 'https://publicmobile-dev.yeahgo.com/web/polite-invitation?couponInviteId=1';
      callLib.open({
        path: "",
        //要传递的参数
        param: {
          parameter: `${h5Url}`,
        },
      })
    },
    
    onOpenAli() {
      const options = {
        scheme: {
          //URL Scheme 的 scheme 字段，要打开的 APP 的标识
          protocol: 'alipays'
        },
        //安卓原生谷歌浏览器必须传递 Intent 协议地址，才能唤起 APP
        intent: {
          // APP包名
          package: 'com.eg.android.AlipayGphone',
          scheme: 'alipays'
        },
        timeout: '5000',
        //APP 的 App Store
        // appstore: DOWNLOAD_IOS,
        //APP 的应用宝地址，
        // yingyongbao: DOWNLOAD_ANDROID,
        //唤端失败后跳转的地址。
        // fallback: ""
      };
      const callLib = new CallApp(options);
      callLib.open({
        path: "",
        //要传递的参数
        param: {
          test: "测试参数"
        },
      })
    },
  },
};
</script>

<style lang="scss" scoped>
  .join-box {
    position: relative;
    z-index: 5;
    width: 100%;
    height: 32px;
    overflow: hidden;
    background-color: rgba($color: #ff0000, $alpha: 0.5);
  }
  
  @keyframes translateAnimate {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
  .join-list {
    position: absolute;
    display: flex;
    align-items: center;
    // animation: translateAnimate 8s linear infinite;
  } 

  .transition {
    transition: translate 5s;
  }
  
  .transform-100 {
    transform: translateX(-100);
  }
  
  .transform-0 {
    transform: translateX(0);
  }

  .join-item {
    display: flex;
    align-items: center;
  }

  .avatar {
    flex-grow: 0;
    flex-shrink: 0;
  }

  .user-name {
    white-space: nowrap;
  }


</style>
