<template>
  <div class="container" v-if="!isWeixin">
    <div class="head"
      :style="{
        'background-image': `url('${getImgUrl('publicMobile/share/bg.png')}')`
      }"
    >
      <div id="downloadButton" class="button">立即下载</div>
      <p id="downloadButton2" class="p">已安装？点这里打开约购</p>
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
    <div class="bottom-box">
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
        id="downloadButton3"
      />
    </div>
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
import { Image as VanImage } from 'vant';
import { getImgUrl } from '@/utils/tools';
Vue.use(VanImage);
export default {
  props: {

  },
  data() {
    return {
      isWeixin: 0,
    };
  },
  components: {
  },
  created () {
    const a = document.createElement('script');
    a.type = 'text/javascript';
    a.src = 'https://web.cdn.openinstall.io/openinstall.js';
    document.body.appendChild(a);
    a.onload = () => {
      setTimeout(() => {
        this.nowUpdata()
      }, 0)
    }
  },
  mounted() {
    const ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger' || ua.match(/_SQ_/i) == '_sq_'){
      this.isWeixin = 1
    }
  },
  methods: {
    getImgUrl,
    nowUpdata() {
      const data = OpenInstall.parseUrlParams();///openinstall.js中提供的工具函数，解析url中的所有查询参数
      new OpenInstall({
        /*appKey必选参数，openinstall平台为每个应用分配的ID*/
        appKey : "sh7yz9",
        preferWakeup:true,
        /*自定义遮罩的html*/
        //mask:function(){
        //  return "<div id='_shadow' style='position:fixed;left:0;top:0;background:rgba(0,255,0,0.5);filter:alpha(opacity=50);width:100%;height:100%;z-index:10000;'></div>"
        //},
        /*OpenInstall初始化完成的回调函数，可选*/
        onready : function() {
          /*在app已安装的情况尝试拉起app*/
          this.schemeWakeup();
          
          /*用户点击某个按钮时(假定按钮id为downloadButton)，安装app*/
          var m = this,
          button = document.getElementById("downloadButton"),
          button2 = document.getElementById("downloadButton2"),
          button3 = document.getElementById("downloadButton3");
          button.onclick = function() {
            m.wakeupOrInstall();
            return false;
          }
          button2.onclick = function() {
            m.wakeupOrInstall();
            return false;
          }
          button3.onclick = function() {
            m.wakeupOrInstall();
            return false;
          }
        }
      }, data);
    }
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
</style>
