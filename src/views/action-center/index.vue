<template>
  <div class="action-center">
    <div class="box">
      <div class="item-box" v-for="(item, index) in list" :key="index" @click="goDetail(item)">
        <van-image
          class="banner-img"
          width="335px"
          height="142px"
          lazy-load
          :src="item.bannerImage"
        />
        <div class="title">{{item.name}}</div>
        <div class="time">{{item.time}}</div>
        <div class="btn" v-if="item.activityStatus==2">{{type[item.activityStatus]}}</div>
        <div class="btn btn-status3" v-if="item.activityStatus==3">{{type[item.activityStatus]}}</div>
        <div class="btn btn-status4" v-if="item.activityStatus==4">{{type[item.activityStatus]}}</div>
        <div class="btn btn-status4" v-if="item.activityStatus==5">{{type[item.activityStatus]}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Image as VanImage, Lazyload } from "vant";
import { getImgUrl } from "@/utils/tools";
import { appBaseUrl, meBaseUrl } from "@/constant/index";
import { goToApp } from "@/utils/userInfo";
import teamApi from '@/apis/center';
Vue.use(VanImage);
Vue.use(Lazyload);
export default {
  data() {
    return {
      list: null,
      type: [
        {},
        {},
        '进行中',
        '未开始',
        '已结束',
        '已终止',
      ]
    };
  },
  components: {},
  created() {
    this.getList();
  },
  mounted() {
  },
  methods: {
    getImgUrl,
    goDetail(item) {
      const { actionType, id } = item;
      let url = '';
      const param = `?couponInviteId=${id}`
      switch(actionType) {
        case 1:
          url='/web/polite-invitation'
          break
        case 2:
          url='/web/bind-box'
        case 3:
          url='/web/game-animation'
      }
      goToApp(meBaseUrl, url, param)
    },
    timestampToTime(timestamp) {
      var date = new Date(timestamp*1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
      var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + '';
      return Y+M+D
    },
    getList() {
      const param = {
        size: 99,
        next: 0,
      }
      teamApi.getActionList(param).then(res => {
        this.list = res.data.records.map((item) => {
          item.time = this.timestampToTime(item.activityStartTime) + ' 至 ' + this.timestampToTime(item.activityEndTime)
          if (!item.bannerImage) {
            item.bannerImage = getImgUrl('publicMobile/center/banner.png');
          }
          return item
        })
      })
    },
    getUserInfo() {
      return new Promise((resolve) => {
        this.$bridge.callHandler("getUserInfo", {}, (res) => {
          const d = JSON.parse(res);
          this.token = d.data.accessToken;
          resolve();
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.action-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #F5F5F5;
}
.box {
  padding-top: 8px;
  padding-bottom: 41px;
}
.item-box {
  margin-bottom: 12px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 351px;
  height: 217px;
  background: #FFFFFF;
  border-radius: 8px;
  .banner-img {
    margin-top: 8px;
    margin-bottom: 12px;
    width: 335px;
    height: 142px;
    border-radius: 8px 8px 0px 0px;
    overflow: hidden;
  }
}
.title {
  padding-left: 16px;
  margin-bottom: 4px;
  width: 100%;
  height: 22px;
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  line-height: 22px;
}
.time {
  padding-left: 16px;
  width: 100%;
  height: 17px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  line-height: 17px;
}
.btn {
  text-align: center;
  position: absolute;
  right: 8px;
  bottom: 18px;
  width: 82px;
  height: 32px;
  background: linear-gradient(90deg, #FF7D7E 0%, #FF3333 100%);
  border-radius: 16px;
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #FFFFFF;
  line-height: 32px;
}
.btn-status3 {
  text-align: center;
  width: 82px;
  height: 32px;
  background: rgba(255, 51, 51, 0.1);
  border-radius: 16px;
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #FF3333;
  line-height: 32px;
}
.btn-status4 {
  text-align: center;
  width: 82px;
  height: 32px;
  background: #EEEEEE;
  border-radius: 16px;
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #CCCCCC;
  line-height: 32px;
}
</style>
