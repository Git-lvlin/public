<template>
  <div class="price_comparsion">
    <van-image
      width="100%"
      :src="getImgUrl('publicMobile/newpeoples/head-bg.png')"
    />
    <div class="save-goods-box">
      <div class="title">新人1重好礼：168元新人券</div>
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
      <div class="get-button">
        <van-image
          @click="getCoupon"
          v-if="!hold"
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
      <span>新人2重好礼：新人尝鲜价</span>
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
          finished-text="没有更多了"
          @load="onBottomReach"
        >
          <hot v-for="item in list" :key="item" :good="item" />
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Image as VanImage, List, Dialog } from 'vant';
import { getImgUrl } from '@/utils/tools';
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
      hold: false,
      listData: [],
      list: [],
      loading: false,
      finished: false,
      page: 1,
      size: 10,
      totalPage: 1,
      token: null,
      indexVersion: null,
    };
  },
  components: {
    Save,
    Hot,
    [Dialog.Component.name]: Dialog.Component,
  },
  created () {
    if (this.$store.state.appInfo.isApp) {
      this.getAppInfo()
    } else if (this.$store.state.appInfo.isMiniprogram) {
      this.getMiniprogramInfo()
    } else {
      console.log('不是App内')
    }
  },
  methods: {
    getCoupon() {
      teamApi.getNewRedbox({token: this.token}).then((res) => {
        if(res.code ===0) {
          this.hold = true
          Dialog({ message: '领取成功!' });
        }
      })
    },
    getAppInfo() {
      Promise.all([this.getToken(), this.getIndexVersion()]).then(() => {
        this.getListData(this.indexVersion, this.token)
      })
    },
    getToken() {
      return new Promise((resolve) => {
        this.$bridge.callHandler('fetchToken',{},(a) => {this.token = a;resolve()})
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
    },
    getImgUrl,
    getListData(indexVersion, token) {
      teamApi.getNewPeoplesCoupon({indexVersion:indexVersion}, {token: token}).then((res) => {
        this.listData = res.data.couponInfo.records
      })
    },
    onLoad() {
      const {
        page,
        size,
      } = this;
      this.loading = true;
      teamApi.getHotGoodsList({
        page,
        size,
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
  mounted() {
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
    .get-button {
      position: absolute;
      bottom: 16px;
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
      padding: 0 12px;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }
  }
  .list-title {
    margin-top: 15px;
    margin-bottom: 15px;
    display: flex;
    justify-content: center;
    span {
      width:209px;
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
</style>
