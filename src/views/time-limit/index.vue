<template>
  <div class="container"
    :style="{
      'background-image': `url('${getImgUrl('publicMobile/limit/limit-bg.png')}')`
    }"
  >
    <div class="content">
      <div class="top-box">
        <van-image
          class="top-img-icon"
          width="351px"
          height="32px"
          lazy-load
          :src="getImgUrl('publicMobile/limit/top-img.png')"
        />
        <div class="top-img-text">（红包仅在此页面有效）</div>
        <div class="top-red-box">
          <div class="left-red-box"
            :style="{
              'background-image': `url('${getImgUrl('publicMobile/limit/red-left.png')}')`
            }"
          >
            <div>
              <span class="left-text1">¥ </span>
              <span class="left-text2">{{info.freeAmount/100}}</span>
              <span class="left-text3">(抵扣红包)</span>
            </div>
            <div class="left-text4">{{time}}</div>
          </div>
          <div class="right-red-box"
            :style="{
              'background-image': `url('${getImgUrl('publicMobile/limit/red-right.png')}')`
            }"
          >
            <div class="right-text">限时红包</div>
          </div>
        </div>
        <!-- <div class="top-left-box">
          <van-image
            class="top-img"
            width="101px"
            height="120px"
            lazy-load
            :src="getImgUrl('publicMobile/limit/red-box.png')"
          />
          <div class="left-content">
            <div class="left-price"><span class="lp">¥</span>{{info.freeAmount/100}}</div>
            <div class="left-text">抵扣红包</div>
          </div>
        </div>
        <div class="top-right-box">
          <div class="text">
            使用条件:<span class="sp1">{{info.useInfo}}</span>
          </div>
          <div class="fk">
            <span class="sp1">有效期:</span>{{time}}
          </div>
          <div class="text">
            <span>距过期:</span>
            <span class="dc">
              <van-count-down :time="cd">
                <template #default="timeData">
                  <span class="block">{{ timeData.days }}</span>
                  天
                  <span class="block">{{ timeData.hours }}</span>
                  <span class="colon">:</span>
                  <span class="block">{{ timeData.minutes }}</span>
                  <span class="colon">:</span>
                  <span class="block">{{ timeData.seconds }}</span>
                </template>
              </van-count-down>
            </span>
          </div>
        </div> -->
      </div>
      <div class="item-box" v-if="info.goodsList">
        <div class="item" v-for="(item, index) in info.goodsList" :key="index">
          <van-image
            class="top-img"
            width="117px"
            height="117px"
            lazy-load
            :src="item.image"
          />
          <div class="item-right-box">
            <div class="item-title van-ellipsis">{{item.goodsName}}</div>
            <div class="item-tag">{{item.couponList[0].couponDesc}}</div>
            <!-- <div class="tag-box" v-for="(tagItem,tagIndex) in item.couponList" :key="tagIndex">
              <div class="item-tag" v-if="tagItem">{{tagItem.couponDesc}}</div>
            </div> -->
            <div class="item-o-price">销售价:¥{{item.salePrice/100}}</div>
            <div class="item-price">到手价¥<span class="price-num">{{item.finalPrice/100}}</span></div>
          </div>
          <div class="item-btn" @click="buy(item.actionUrl)">抢购</div>
        </div>
      </div>
      <div class="null-box" v-else>
        <van-image
          class="null-img"
          width="160px"
          height="160px"
          lazy-load
          :src="getImgUrl('publicMobile/limit/null.png')"
        />
        <div class="null-text">暂无相关商品~</div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Image as VanImage, Lazyload, CountDown } from 'vant';
import { getImgUrl } from '@/utils/tools';
import teamApi from '@/apis/limit';
import { goToApp } from '@/utils/userInfo';
import { appBaseUrl, meBaseUrl } from "@/constant/index";
Vue.use(Lazyload);
Vue.use(VanImage);
Vue.use(CountDown);
export default {
  data() {
    return {
      cd: 99999,
      info: {},
      token: null,
      memberCouponId: null,
    };
  },
  created () {
    
  },
  async mounted() {
    const {
      query,
    } = this.$router.history.current;
    this.memberCouponId = query.memberCouponId
    console.log('this.memberCouponId', this.memberCouponId)
    await this.getUserInfo();
    this.getInfo();
  },
  methods: {
    getImgUrl,
    timestampToTime(timestamp) {
      var date = new Date(timestamp*1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '年';
      var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '月';
      var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + '日 ';
      var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
      var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes());
      return Y+M+D+h+m
    },
    getMemberCouponId() {

    },
    buy(url) {
      goToApp(url);
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
    getInfo() {
      const param = {
        memberCouponId: this.memberCouponId
      }
      console.log('param', param, this.token)
      teamApi.getTimeLimit(param, {token: this.token}).then(res => {
        this.info = res.data
        this.cd = res.data.deadlineTime - res.data.currentTime
        const start = this.timestampToTime(res.data.activityStartTime)
        const end = this.timestampToTime(res.data.activityEndTime)
        this.time = start + '至' + end;
      })
    }
  },
};
</script>

<style lang='scss' scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-size: 100%;
  background-repeat: no-repeat;
  background-color: #F5F5F5;
  padding-bottom: 30px;
}
.content {
  padding-top: 97px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.top-box {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 351px;
  height: 131px;
  background: #FFFFFF;
  border-radius: 12px;
  overflow: hidden;
  .top-img-icon {
    margin-bottom: 20px;
    width: 351px;
    height: 32px;
    overflow: hidden;
  }
  .top-img-text {
    position: absolute;
    top: 8px;
    left: 93px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #EC6B4E;
  }
  .top-red-box {
    display: flex;
    justify-content: center;
    .left-red-box {
      display: flex;
      flex-direction: column;
      width: 195px;
      height: 62px;
      background-size: 195px 62px;
      .left-text1 {
        padding-left: 16px;
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
      }
      .left-text2 {
        font-size: 32px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
      }
      .left-text3 {
        margin-left: 4px;
        font-size: 12px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #FFEDC5;
      }
      .left-text4 {
        margin-top: 1px;
        padding-left: 16px;
        font-size: 11px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.85);
      }
    }
    .right-red-box {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: 124px;
      height: 62px;
      background-size: 124px 62px;
      .right-text {
        margin-right: 18px;
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
      }
    }
  }
  // .top-left-box {
  //   margin-right: 19px;
  //   position: relative;
  //   width: 101px;
  //   height: 120px;
  //   .top-img {
  //     position: absolute;
  //     top: 0;
  //     width: 101px;
  //     height: 120px;
  //     z-index: 1;
  //   }
  //   .left-content {
  //     position: absolute;
  //     top: 0;
  //     z-index: 2;
  //     display: flex;
  //     flex-direction: column;
  //     justify-content: center;
  //     align-items: center;
  //     width: 100%;
  //     height: 100%;
  //     .left-price {
  //       height: 56px;
  //       font-size: 40px;
  //       font-family: PingFangSC-Medium, PingFang SC;
  //       font-weight: 500;
  //       color: #EB483F;
  //       line-height: 56px;
  //       .lp {
  //         font-size: 16px;
  //       }
  //     }
  //     .left-text {
  //       margin-top: 20px;
  //       height: 20px;
  //       font-size: 14px;
  //       font-family: PingFangSC-Medium, PingFang SC;
  //       font-weight: 500;
  //       color: #FCEFC5;
  //       line-height: 20px;
  //     }
  //   }

  // }
  // .top-right-box {
  //   display: flex;
  //   flex-direction: column;
  //   justify-content: flex-start;
  //   .fk {
  //     margin: 4px 0;
  //     width: 200px;
  //     height: 40px;
  //     font-size: 14px;
  //     font-family: PingFangSC-Regular, PingFang SC;
  //     font-weight: 400;
  //     color: #999999;
  //     line-height: 20px;
  //     overflow: hidden;
  //     .sp1 {
  //       margin-right: 6px;
  //       color: #666666;
  //     }
  //   }
  //   .text {
  //     font-size: 14px;
  //     font-family: PingFangSC-Regular, PingFang SC;
  //     font-weight: 400;
  //     color: #666666;
  //     line-height: 20px;
  //     .sp1 {
  //       margin-left: 6px;
  //       color: #999999;
  //     }
  //   }
  // }
}
.item-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  .item {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 351px;
    height: 141px;
    background: #FFFFFF;
    border-radius: 12px;
    margin-top: 12px;
    .top-img {
      width: 117px;
      height: 117px;
      border-radius: 8px;
      margin-right: 8px;
      overflow: hidden;
    }
    .item-right-box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      overflow: hidden;
      .item-title {
        margin-bottom: 8px;
        width: 204px;
        height: 22px;
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #333333;
        line-height: 22px;
      }
      .tag-box {
        display: flex;
        justify-content: flex-start;
        margin-bottom: 27px;
      }
      .item-tag {
        margin-bottom: 27px;
        margin-right: 4px;
        padding: 0 6px;
        height: 13px;
        background: rgba(235, 72, 63, 0.1);
        border-radius: 2px;
        font-size: 10px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #EB483F;
        line-height: 13px;
      }
      .item-price {
        height: 17px;
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #D7291D;
        line-height: 17px;
        .price-num {
          font-size: 22px;
        }
      }
      .item-o-price {
        margin-bottom: 6px;
        height: 17px;
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #979797;
        line-height: 17px;
      }
    }
    .item-btn {
      position: absolute;
      right: 12px;
      bottom: 12px;
      width: 80px;
      height: 34px;
      line-height: 34px;
      background: linear-gradient(270deg, #D7291D 0%, #FB5F2A 100%);
      box-shadow: 1px 1px 2px 0px rgba(228, 45, 59, 0.3);
      border-radius: 17px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #FFFFFF;
      text-align: center;
    }
  }

}
.null-box {
  margin-top: 12px;
  padding-top: 48px;
  width: 351px;
  height: 559px;
  background: #FFFFFF;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
}
.dc {
  margin-left: 6px;
  display: inline-block;
}
.colon {
  display: inline-block;
  margin: 0 4px;
  color: #000000;
}
.block {
  display: inline-block;
  width: 16px;
  height: 16px;
  line-height: 16px;
  color: #fff;
  font-size: 11px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  text-align: center;
  background-color: #000000;
  border-radius: 2px;
}
</style>
