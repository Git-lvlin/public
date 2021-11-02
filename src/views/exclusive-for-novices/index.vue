<template>
  <div class="price_comparsion">
    <van-image
      width="100%"
      :src="getImgUrl('publicMobile/newpeoples/head-bg-914.png')"
    />
    <div class="save-goods-box">
      <div class="title">新人1重好礼：100元新人红包</div>
      <van-image
        class="title-icon"
        :src="getImgUrl('publicMobile/newpeoples/money-icon.png')"
      />
      <div class="border-box"></div>
      <div class="save-list">
        <div class="save-box">
          <save
            v-for="item in listData"
            :key="item.skuId"
            :good="item"
            :hold="hold"
          />
        </div>
      </div>
      <div v-if="listData.length" class="text">(新人红包仅当前新人专享商品可用。)</div>
      <div class="get-button" v-if="listData.length">
        <van-image
          @click="getCoupon"
          v-if="hold!==2"
          width="100%"
          :src="getImgUrl('publicMobile/newpeoples/button.png')"
        />
        <van-image
          @click="getCoupon"
          v-else
          width="100%"
          :src="getImgUrl('publicMobile/newpeoples/buttoned.png')"
        />
      </div>
    </div>
    <div class="list-title">
        <van-image
          width="24px"
          height="24px"
          :src="getImgUrl('publicMobile/newpeoples/red-icon.png')"
        />
      <span>新人2重好礼：下单最高减50元</span>
        <van-image
          width="24px"
          height="24px"
          :src="getImgUrl('publicMobile/newpeoples/red-icon.png')"
        />
    </div>
    <div class="hot-recommend-box">
      <div class="hot-list">
        <van-list
          style="display: flex;flex-direction: row;flex-wrap: wrap;justify-content: space-between;"
          v-if="list.length"
          v-model="loading"
          offset=0
          :immediate-check="false"
          :finished="finished"
          finished-text=""
          @load="onBottomReach"
        >
          <hot v-for="item in list" :key="item" :good="item" />
        </van-list>
        <!-- <div class="no" v-show="finished">没有更多了</div> -->
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Image as VanImage, List, Dialog } from 'vant';
import { getImgUrl } from '@/utils/tools';
import { judgeVersionIsNew } from '@/utils/userInfo';
import Save from './components/goods-list';
import Hot from './components/coupon';
import teamApi from '@/apis/appointment';
Vue.use(VanImage);
Vue.use(List);
export default {
  props: {
    list: {
      type: Array,
      default: []
    },
    listData: {
      type: Array,
      default: []
    },
  },
  data() {
    return {
      couponId: '',
      hold: 1,
      listData: [],
      list: [],
      loading: false,
      finished: true,
      page: 1,
      size: 10,
      totalPage: 1,
      token: null,
      indexVersion: null,
      isNew: false,
      info: {},
      flag: true,
    };
  },
  components: {
    Save,
    Hot,
    [Dialog.Component.name]: Dialog.Component,
  },
  methods: {
    async getCoupon() {
      if (!this.flag) {
        return
      }
      this.flag = false
      if (this.hold === 2) {
        return
      }
      if (this.token) {
          teamApi.getNewRedbox({}, {token: this.token}).then((res) => {
            if(res.code ===0) {
              this.hold = 2
              Dialog({ message: '领取成功!' });
            }
            this.flag = true
          })
      } else {
        Dialog({ message: '未登录' });
        console.log('token is null', this.token)
      }
    },
    getUserInfo() {
      return new Promise((resolve) => {
        this.$bridge.callHandler('getUserInfo',{},(res) => {
          const d = JSON.parse(res)
          this.token = d.data.accessToken
          this.isNew = d.data.isNew
          resolve()
        })
      })
    },
    getAppInfo() {
      Promise.all([this.getToken(), this.getIndexVersion(), this.getMemberRecognize()]).then(() => {
        this.getListData()
      })
    },
    getToken() {
      return new Promise((resolve) => {
        this.$bridge.callHandler('fetchToken',{},(a) => {this.token = a;resolve()})
      })
    },
    getMemberRecognize() {
      return new Promise((resolve) => {
        this.$bridge.callHandler('getMemberRecognize',{},(a) => {this.isNew = a;resolve()})
      })
    },
    getIndexVersion() {
      return new Promise((resolve) => {
        this.$bridge.callHandler('indexVersion',{},(a) => {this.indexVersion = a;resolve()})
      })
    },
    getMiniprogramInfo() {
      this.indexVersion = this.$router.history.current.indexVersion
      this.token = this.$router.history.current.token
      this.isNew = this.$router.history.current.isNew
    },
    getImgUrl,
    getListData() {
      teamApi.getNewPeoplesCoupon({}, {token:this.token}).then((res) => {
        if (res.code === 0) {
          this.hold = res?.data?.pLqStatus
          this.listData = res?.data?.couponInfo?.records
          if (this.hold == 1) {
            this.getCoupon()
          }
        }
      })
    },
    onLoad() {
      this.loading = true;
      teamApi.getNewCouponGoodsList({}).then((res) => {
        let data = res.data.goodsList;
        this.list = data
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      });
    },
    onBottomReach() {
    },
  },
  async mounted() {
    if (this.$store.state.appInfo.isApp) {
      const isNewVersion = judgeVersionIsNew(this.$store.state.appInfo.appVersion)
      if (isNewVersion) {
        await this.getUserInfo();
        this.getListData()
        return
      }
      console.log('兼容低版本逻辑')
      this.getAppInfo()
    } else {
      this.getMiniprogramInfo()
      this.getListData()
    }
    this.onLoad()
  }
};
</script>

<style lang="scss" scoped>
  .price_comparsion {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-image:linear-gradient(180deg,#ff9465 0%,#ff795a 52.82%,#ff542c 100%);
  }
  .save-goods-box {
    position: relative;
    width: 351px;
    height: 196px;
    background-color: rgba(242, 61, 42, 1);
    border-radius: 12px;
    margin: 0 auto;
    text-align: center;
    margin-top: 11px;
    overflow: hidden;
    .title {
      margin-top: 10px;
      height:25px;
      text-shadow:0px 2px 4px #a40000;
      font-family:PingFang SC;
      font-weight:500;
      color:#ffffff;
      font-size:18px;
      line-height:25px;
    }
    .title-icon {
      position: absolute;
      top: 5.8px;
      right: 14px;
      width: 32px;
      height: 32px;
    }
    .border-box {
      height:12px;
      border-bottom:1px solid #ffa454;
      box-shadow:0px 2px 2px #f23d2a,0px -1px 1px #f23d2a;
      border-radius: 0px 0px 50% 50%/0 0 100% 100%;
      margin-bottom: 12px;
    }
    .text {
      position: absolute;
      bottom: 61px;
      width: 100%;
      text-align: center;
      height: 14px;
      font-size: 10px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 14px;
    }
    .get-button {
      position: absolute;
      bottom: 12px;
      left: 50%;
      transform: translateX(-50%);
      width: 260px;
      height: 46px;
    }
  }
  .save-list {
    position: absolute;
    top: 56px;
    left: 50%;
    transform: translateX(-50%);
    padding: 0px 0px 0px 14px;
    width: 351px;
    height: 70px;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.02);
    white-space: nowrap;/*文本不会换行，文本会在在同一行上继续*/
    overflow: hidden;
    overflow-x: auto;
    .save-box {
      display: flex;
      display: inline-block;
      flex-wrap: wrap;
      height: 100%;
    }
  }
  .hot-recommend-box {
    position: relative;
    width: 100%;
    min-height: 618px;
    .hot-list {
      width: 351px;
      margin: 0 auto;
    }
  }
  .list-title {
    margin-top: 15px;
    margin-bottom: 15px;
    display: flex;
    justify-content: center;
    span {
      // width:209px;
      height:25px;
      text-shadow:0px 2px 4px rgba(222, 24, 24, 0.5);
      font-family:PingFang SC;
      font-weight:500;
      color:#ffffff;
      font-size:18px;
      line-height:25px;
      margin: 0 20px;
    }
    :nth-child(3) {
      transform: rotate(26deg);
    } 
  }
  ::-webkit-scrollbar {
    width: 0 !important;
    height: 0 !important;
    display: none;
  }
  .element::-webkit-scrollbar { width: 0 !important }
  .element { -ms-overflow-style: none; }
  .element { overflow: -moz-scrollbars-none; }
  .no {
    padding-top: 22px;
    padding-bottom: 25px;
    display: block;
    width: 100%;
    text-align: center;
    height:17px;
    font-family:PingFang SC;
    color:#f5f5f5;
    font-size:12px;
    line-height:17px;
  }
</style>
