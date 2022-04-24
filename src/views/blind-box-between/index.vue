<template>
  <div class="container">
    <van-image
      class="banner"
      width="100%"
      height="100%"
      :src="getImgUrl('publicMobile/between/banner.png')"
    />
    <div class="box">
      <van-image
        class="go_btn"
        width="225px"
        height="41px"
        :src="getImgUrl('publicMobile/between/in-new.png')"
        @click="outPage"
      />
      <van-image
        class="open_btn"
        width="225px"
        height="41px"
        :src="getImgUrl('publicMobile/between/open-new.png')"
        @click="download"
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
  data() {
    return {
      inviteCode: '',
    };
  },
  created () {
  },
  mounted() {
    const {
      query,
    } = this.$router.history.current;
    this.inviteCode = query.inviteCode || '';
  },
  methods: {
    download() {
      const u = window.navigator.userAgent;
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
    outPage() {
      this.$router.push({
        path: '/web/new-share',
        query: {
          inviteCode: this.inviteCode
        },
      });
    },
    getImgUrl,
  },
};
</script>

<style lang='scss' scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #FD4825;
  position: relative;
}
.box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.go_btn {
  margin-top: 100px;
}
.open_btn {
  margin-top: 24px;
}
</style>
