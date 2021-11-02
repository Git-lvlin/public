<template>
  <div class="container">
    <div class="head"
      :style="{
        'background-image': `url('${type?edImg:img}')`,
        'height': `${type?'450px':'351px'}`
      }"
    >
      <div id="downloadButton" v-if="type" class="button">立即下载</div>
      <p id="downloadButton2" v-if="type" class="p">已安装？点这里打开约购</p>
    </div>
    <div class="register-box">
      <div class="phone">
        <input class="input phone-input" oninput="value=value.replace(/[^\d]/g,'')" type="text" placeholder="请输入手机账号">
      </div>
      <div class="phone-err">手机号错误</div>
      <div class="code-box">
        <div class="code">
          <input class="input code-input" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入验证码" type="text">
        </div>
        <div class="code-btn">获取验证码</div>
      </div>
      <div class="code-err">手机号错误</div>
      <div class="button">提交</div>
    </div>
    <div class="title"><span class="red">约购</span>APP 1件也享批发价</div>
    <div class="subtitle">有温度的 低价电商平台</div>
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
          <p class="p1">约着买 <span class="red">更舒心</span></p>
          <p class="p2">厂家直供 正品保障</p>
        </div>
      </div>
      <div class="item">
        <van-image
          width="60px"
          height="60px"
          :src="getImgUrl('publicMobile/share/img2.png')"
        />
        <div class="right-box">
          <p class="p1">开新店 <span class="red">零成本</span></p>
          <p class="p2">海量商品 一键代发</p>
        </div>
      </div>
      <div class="item">
        <van-image
          width="60px"
          height="60px"
          :src="getImgUrl('publicMobile/share/img3.png')"
        />
        <div class="right-box">
          <p class="p1">邻里互动 <span class="red">更高效</span></p>
          <p class="p2">即时分享新动态 邻里更亲密</p>
        </div>
      </div>
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
      edImg: getImgUrl('publicMobile/newshare/new-share-bg-ed.png'),
      img: getImgUrl('publicMobile/newshare/new-share-bg.png'),
      type: 0,
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
    color: #CCCCCC;
  }
}
</style>
