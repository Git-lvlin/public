<template>
  <div class="coupon-box">
    <div class="head"
    :style="{
      'background-image': `url('${getImgUrl('publicMobile/coupon/bg.png')}')`
    }"
    >
      <div class="coupon-index"
      :style="{
        'background-image': `url('${getImgUrl('publicMobile/coupon/box-bg.png')}')`
      }"
      >
        <div class="time-end">
          <van-count-down class="time-end-item" :time="timeDown" format="HH:mm:ss后结束" />
        </div>
        <div class="coupon"
        :style="{
          'background-image': `url('${getImgUrl('publicMobile/coupon/red.png')}')`
        }"
        >
          <div class="position1">
            ¥<span class="big">8</span>.88
          </div>
          <div class="position2">
            <p class="p1">{{couponType}}</p>
            <p class="p2">{{timeInfo.couponName}}</p>
            <p class="p3">有效期至:{{endTime}}</p>
          </div>
          <div class="position3" v-if="!robed">
            <div class="small" @click="nowRob">抢</div>
          </div>
          <div class="position4" v-else @click="goUse">去使用</div>
        </div>
      </div>
      <div class="btn-tab">
        <div class="btn-box">
          <btn v-for="item in btns" :key="item" v-on:actId="getId" :good="item" />
        </div>
      </div>
      <div class="bottom-box"
      :style="{
        'background-image': `url('${getImgUrl('publicMobile/coupon/bottom-bg.png')}')`
      }"
      >
        <div class="list-box">
          <div class="list-box-sub">
            <van-list
              v-if="list.length"
              v-model="loading"
              offset=0
              :immediate-check="false"
              :finished="finished"
              finished-text="一滴也没有了"
              @load="onBottomReach"
            >
              <item v-for="item in list" :key="item" :good="item" />
            </van-list>
          </div>
        </div>  
      </div>
      <div class="cushions"></div>

    </div>

  </div>
</template>

<script>
import Vue from 'vue';
import { Image as VanImage, List, Dialog, CountDown } from 'vant';
import { getImgUrl, getQueryObj, debounce } from '@/utils/tools';
import teamApi from '@/apis/appointment';
import Btn from './components/btn';
import Item from './components/coupon';

Vue.use(VanImage);
Vue.use(List);
Vue.use(CountDown);

export default {
  props: {
    btns: {
      type: Array,
      default: [
        {
          regName: '全部',
          id: 0
        },
        {
          regName: '图片专区',
          id: 1
        },
        {
          regName: '直播专区',
          id: 2
        },
        {
          regName: '颜色专区',
          id: 3
        },
        {
          regName: '绿色专区',
          id: 4
        },
        {
          regName: '激情专区',
          id: 5
        },
      ]
    },
    list: {
      type: Array,
      default: []
    },
  },
  data() {
    return {
      arr: ['-', '满减券', '折扣券', '立减券'],
      btns: [],
      robed: false,
      list: [],
      loading: false,
      finished: false,
      page: 1,
      size: 10,
      totalPage: 1,
      pageSize: 10,
      options: {},
      timeInfo: {}, 
    };
  },
  computed: {
    couponType: function() {
      return this.arr[this.timeInfo.couponType] || '立减券'
    },
    endTime: function() {
      const str = this.timeInfo.activityEndTime || 1627718424000
      const date = new Date(str);
      const YY = date.getFullYear() + '.';
      const MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '.';
      const DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
      return YY + MM + DD;
    },
    timeDown: function() {
      return this.timeInfo.deadlineTime - this.timeInfo.currentTime
    }
  },
  components: {
    Item,
    Btn,
    [Dialog.Component.name]: Dialog.Component,
  },
  created () {
    this.getTimeInfo()
    this.onLoad()
    this.options = getQueryObj(window.location.href)
    console.log('options', this.options)
  },
  methods: {
    getTimeInfo() {
      teamApi.getCouponTimeInfo({memberId: this.options.memberId},{token: this.options.token}).then((res) => {
        console.log('timeInfo', res)
        if (res.data && res.data.length) {
          this.timeInfo = res.data
          if (this.timeInfo.status) {
            this.robed = true
          }
        }
      })
    },
    getId(a) {
      const {
        page,
        pageSize,
      } = this;
      clearTimeout(this.listId)
      this.listId = setTimeout(() => {
        teamApi.getCouponClassList({
          memberId: this.options.memberId,
          page,
          pageSize,
          gcId1: a
        }).then((res) => {
          const {
            data,
          } = res;
          if (data && data.records) {
            this.totalPage = data.totalpage;
            if (page < 2) {
              this.list = data.records;
            } else {
              this.list = this.list.concat(data.records);
            }
            if (this.list.length >= data.total) {
              this.finished = true;
            }
          }
          this.loading = false;
        }).catch(() => {
          this.loading = false;
        });
      }, 200)
    },
    formatDate(date) {
      var date = new Date(date);
      var YY = date.getFullYear() + '.';
      var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '.';
      var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
      return YY + MM + DD;
    },
    nowRob() {
      clearTimeout(this.timeid)
      this.timeid = setTimeout(() => {
        teamApi.getCoupon({
          couponId: this.timeInfo.couponId
        }).then((res) => {
          if (res.code === 0) {
            Dialog({ message: '抢券成功!' });
            this.robed = !this.robed
          }
        })
      }, 800)
    },
    goUse() {
      const {
        timeInfo,
      } = this;
      const paramStr = `?orderType=${timeInfo.orderType || 3}&spuId=${timeInfo.spuId || ''}&objectId=${timeInfo.objectId || ''}&activityId=${timeInfo.activityId || ''}&skuId=${timeInfo.skuId || ''}&wsId=${timeInfo.wsId || ''}`
      console.log(window.navigator)
      console.log("$store.state.appInfo", this.$store.state.appInfo)
      if (this.$store.state.appInfo.isApp) {
        this.$bridge.callHandler(
          'router',
          `${appBaseUrl}/shopping/detail${paramStr}`,
        )
      } else if (this.$store.state.appInfo.isMiniprogram) {
        wx.miniProgram.navigateTo({
          url: `/subpages/cart/detail/index${paramStr}`
        })
      } else {
        console.log('不是App内')
      }
    },
    getImgUrl,
    onLoad() {
      const {
        page,
        pageSize,
      } = this;
      this.loading = true;
      teamApi.getCouponAll({
        page,
        pageSize,
      }).then((res) => {
        const {
          data,
        } = res;
        if (data && data.records) {
          this.totalPage = data.totalpage;
          if (page < 2) {
            this.list = data.records;
          } else {
            this.list = this.list.concat(data.records);
          }
          if (this.list.length >= data.total) {
            this.finished = true;
          }
        }
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      });
    },
    onBottomReach() {
      if (this.totalPage > this.page) {
        this.page += 1;
        this.onLoad();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
html,body {
  background-color: #d93d33;
}
.coupon-box {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #d93d33;
  overflow-x: hidden;
}
.head {
  width: 100%;
  height: 548px;
  background-size: 100% 548px;
  .coupon-index {
    position: relative;
    display: flex;
    width: 100%;
    height: 140px;
    background-size: 100% 140px;
    margin-top: 196px;
    margin-left: 2px;
    .time-end {
      position: absolute;
      top: 8px;
      left: 114px;
      width: 140px;
      height: 26px;
      text-align: center;
      line-height: 26px;
      background-color:#fcf7f2;
      font-size:16.8px;
      .time-end-item {
        font-family:HuXiaoBo-NanShen;
        color:#e83527;
        font-size:16.8px;
      }
    }
    .coupon {
      position: relative;
      width: 290px;
      height: 74px;
      background-size: 290px 74px;
      margin-left: 44px;
      margin-top: 42px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .position1 {
        margin-left: 14px;
        width: 67px;
        height: 40px;
        font-size: 18px;
        font-family: Helvetica Neue;
        font-weight: 700;
        color: #80531a;
        line-height: 40px;
        text-align: center;
      }
      .position2 {
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 130px;
        height: 100%;
        .p1 {
          font-family:PingFang SC;
          font-weight:600;
          color:#f6e8ca;
          font-size:18px;
          line-height:25px;
          margin-bottom: 5px;
        }
        .p2 {
          font-family:PingFang SC;
          font-weight:500;
          color:#f6e8ca;
          font-size:12px;
          line-height:17px;
        }
        .p3 {
          font-family:PingFang SC;
          color:rgba(246, 232, 202, 0.7);
          font-size:10px;
          line-height:14px;
        }
      }
      .position3 {
        position: absolute;
        top: 14px;
        right: 14px;
        width:45px;
        height:45px;
        background-color:#f6e8ca;
        border-radius: 50%;
        .small {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          width:41px;
          height:41px;
          background-color:#f6e8ca;
          border-radius: 50%;
          border:0.88px solid;
          border-color:#ead6ab;
          line-height: 41px;
          font-family:PingFang SC;
          font-weight:600;
          color:#cc2c10;
          font-size:21.2px;
          text-align: center;
        }
      }
      .position4 {
        position: absolute;
        top: 25px;
        right: 14px;
        width: 60px;
        height: 27px;
        border: 1px solid;
        border-color: #f6e8ca;
        border-radius: 13.5px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #f6e8ca;
        font-size: 12px;
        line-height: 27px;
        text-align: center;
      }
    }
  }
  .btn-tab {
    width: 100%;
    // display: flex;
    // justify-content: center;
    padding: 14px 14px 12px 16px;
    white-space: nowrap;/*文本不会换行，文本会在在同一行上继续*/
    overflow: hidden;
    overflow-x: auto;
    .btn-box {
      height: 37px;
      white-space: nowrap;/*文本不会换行，文本会在在同一行上继续*/
    }
    // .btn {
    //   width:86px;
    //   height:37px;
    //   font-family:PingFang SC;
    //   font-weight:600;
    //   color:#fdf4ed;
    //   font-size:16px;
    //   line-height:37px;
    //   text-align:center;
    // }
    // .act {
    //   background-color:#fefaf5;
    //   border-radius:18.5px;
    //   color:#d93d33;
    // }
  }
  .bottom-box {
    width: 100%;
    height: 455px;
    background-size: 100% 455px;
    margin-left: 2px;
    .list-box {
      padding: 31px 26px 31px 26px;
      width: 100%;
      height: 455px;

      display: flex;
      flex-direction: column;
      margin: 0 auto;
      .list-box-sub {
        margin-top: 10px;
        height: 435px;
        width: 100%;
        overflow: hidden;
        overflow-y: auto;
      }
    }
  }
  .cushions {
    width: 100%;
    height: 20px;
    background-color: #d93d33;
  }
}
.big {
  font-size: 24px;
}
::-webkit-scrollbar {
  width: 0 !important;
  height: 0 !important;
  display: none;
}
.element::-webkit-scrollbar { width: 0 !important }
.element { -ms-overflow-style: none; }
.element { overflow: -moz-scrollbars-none; }
</style>