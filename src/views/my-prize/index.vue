<template>
  <div class="my-prize">
    <div class="null-box" v-if="!prizeList.length">
      <van-image width="180px" height="180px" :src="getImgUrl('publicMobile/bindbox/null.png')" />
      <div>暂无相关记录</div>
    </div>
    <div class="list-box" v-else>
      <div class="right-top-box" @click="look">
        <div class="right-top-btn">提现记录</div>
      </div>
      <prize
        v-for="item in prizeList"
        :key="item.id"
        :good="item"
        :token="token"
      />
    </div>
    <div v-if="prizeList.length" class="null">没有更多了〜</div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Image as VanImage, Dialog, Swipe, SwipeItem, Lazyload, Popup } from 'vant';
import { getImgUrl } from '@/utils/tools';
import prize from './components/prize';
import teamApi from '@/apis/bindbox';
import { appBaseUrl, meBaseUrl } from "@/constant/index";
import { goToApp } from '@/utils/userInfo';
Vue.use(VanImage);
export default {
  data() {
    return {
      prizeList: [],
      token: null,
    };
  },
  components: {
    prize,
  },
  async created () {
    await this.getUserInfo()
    this.init()
  },
  methods: {
    look() {
      const path = `/web/game-withdrawal-list?_immersive=0&at=${this.token}&i=1`
      goToApp(meBaseUrl, path);
    },
    getImgUrl,
    timestampToTime(timestamp) {
      var date = new Date(timestamp*1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '.';
      var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '.';
      var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
      var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
      var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes());
      return Y+M+D+h+m;
    },
    getUserInfo() {
      return new Promise((resolve) => {
        this.$bridge.callHandler('getUserInfo',{},(res) => {
          const d = JSON.parse(res)
          this.token = d.data.accessToken
          resolve()
        })
      })
    },
    init() {
      teamApi.getPrizeList({size:100,next:0}, {token: this.token}).then((res) => {
        if(res.code === 0) {
          this.prizeList = res.data.records.map((item) => {
            item.createTime = this.timestampToTime(item.createTime)
            item.expireTime = this.timestampToTime(item.expireTime)
            return item
          })
        }
      })
    }
  },
  mounted() {
  }
};
</script>

<style lang="scss" scoped>
.my-prize {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #F5F5F5;
}
.null-box {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
}
.list-box {
  padding: 12px;
  padding-bottom: 109px;
  .right-top-box {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 12px;
  }
  .right-top-btn {
    padding: 4px 8px;
    font-size: 14px;
    color: #999999;
    border: 1px solid #999999;
    text-align: center;
    line-height: 100%;
    border-radius: 8px;
  }
}
.null {
  position: absolute;
  bottom: 50px;
  text-align: center;
  width: 100%;
  height: 17px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  line-height: 17px;
}
</style>
