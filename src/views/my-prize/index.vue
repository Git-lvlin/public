<template>
  <div class="my-prize">
    <div class="list-box">
      <prize
        v-for="item in prizeList"
        :key="item.id"
        :good="item"
      />
    </div>
    <div class="null">没有更多了〜</div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Image as VanImage, Dialog, Swipe, SwipeItem, Lazyload, Popup } from 'vant';
import { getImgUrl } from '@/utils/tools';
import prize from './components/prize';
import teamApi from '@/apis/bindbox';
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
.list-box {
  padding: 12px;
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
