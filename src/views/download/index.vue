<template>
  <div class="container" v-if="!isWeixin">
    <div class="head"
      :style="{
        'background-image': `url('${getImgUrl('publicMobile/share/bg.png')}')`
      }"
    >
      <div class="button" @click="download">立即下载</div>
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
  data() {
    return {
      isWeixin: 0,
    };
  },
  created () {
  },
  mounted() {
    const ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger' || ua.match(/_SQ_/i) == '_sq_'){
      this.isWeixin = 1
    }
  },
  methods: {
    getImgUrl,
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
  .head {
    width:100%;
    height: 450px;
    background-size: 100% 100%;
    position: relative;
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
    .tt {
      position: absolute;
      top: 10px;
      right: 10px;
      color: #ffffff;
      font-size: 14px;
      text-align: right;
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
}
.mark {
  width: 100%;
  height: 60px;
  position: relative;
  top: -60px;
  background-color: #ffffff;
}
</style>
