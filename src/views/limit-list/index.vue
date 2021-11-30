<template>
  <div class="container">
    <div class="box" v-if="listData.length">
      <div class="item" v-for="(item, index) in listData" :key="index">
        <van-image
          class="user-img"
          width="41px"
          height="41px"
          lazy-load
          :src="item.icon"
        />
        <div class="content">
          <div class="phone">{{item.memberMobile}}</div>
          <div class="time">{{item.createTime}}</div>
        </div>
        <div class="prize">+{{item.freeAmount/100}}元</div>
      </div>
    </div>
    <div class="null" v-else>
      <van-image
        class="null-img"
        width="160px"
        height="160px"
        lazy-load
        :src="getImgUrl('publicMobile/limit/record-null.png')"
      />
      <div class="null-text">暂无相关记录~</div>
    </div>
    <div class="ft">提示：获得的红包可在「约购」APP"我的-红包"页面中查看</div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Image as VanImage, Lazyload } from 'vant';
import { getImgUrl } from '@/utils/tools';
import teamApi from '@/apis/limit';
Vue.use(VanImage);
Vue.use(Lazyload);
export default {
  data() {
    return {
      listData: [],
      token: null,
    };
  },
  created () {
    
  },
  async mounted() {
    const {
      query,
    } = this.$router.history.current;
    this.couponInviteId = query.couponInviteId;
    await this.getUserInfo();
    console.log('couponInviteId', this.couponInviteId)
    console.log('token', this.token)
    this.getRecords();
  },
  methods: {
    getImgUrl,
    getUserInfo() {
      return new Promise((resolve) => {
        this.$bridge.callHandler('getUserInfo',{},(res) => {
          const d = JSON.parse(res)
          this.token = d.data.accessToken
          resolve()
        })
      })
    },
    // 获取邀请记录
    getRecords() {
      const param = {
        couponInviteId: this.couponInviteId,
        size: 99,
        next: 0,
      }
      teamApi.getRecordList(param, {token: this.token}).then(res => {
        this.listData = res.data.records
      })
    },
  },
};
</script>

<style lang='scss' scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #FFFFFF;
}
.box {
  padding-left: 16px;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
}
.ft {
  padding-top: 10px;
  padding-bottom: 44px;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 17px;
  background-color: #FFFFFF;
  text-align: center;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  line-height: 17px;
}
.item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid #eeeeee;
  width: 100%;
  height: 70px;
}
.content {
  margin-left: 13px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 253px;
}
.title {
  margin-bottom: 3px;
  width: 100%;
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  line-height: 20px;
}
.time {
  width: 100%;
  height: 17px;
  font-size: 12px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #999999;
  line-height: 17px;
}
.prize {
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #EF8537;
  line-height: 20px;
}
.user-img {
  width: 41px;
  height: 41px;
  border-radius: 50%;
  overflow: hidden;
}
.null {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.null-img {
  width: 160px;
  height: 160px;
}
.null-text {
  margin-top: 8px;
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  line-height: 20px;
}
</style>
