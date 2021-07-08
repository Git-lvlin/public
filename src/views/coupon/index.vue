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
        <div class="time-end">12:23:32 后结束</div>
        <div class="coupon"
        :style="{
          'background-image': `url('${getImgUrl('publicMobile/coupon/red.png')}')`
        }"
        >
          <div class="position1">
            ¥<span class="big">8</span>.88
          </div>
          <div class="position2">
            <p class="p1">无门槛</p>
            <p class="p2">满88元使用</p>
            <p class="p3">有效期:2021.05.1前有效</p>
          </div>
          <div class="position3" v-if="!robed">
            <div class="small">抢</div>
          </div>
          <div class="position4" v-else>去使用</div>
        </div>
      </div>
      <div class="btn-tab">
        <div class="btn act">全部</div>
        <div class="btn">食品专区</div>
        <div class="btn">美妆洗护</div>
        <div class="btn">日用百货</div>
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
              finished-text="没有更多商品"
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
import { Image as VanImage, List } from 'vant';
import { getImgUrl } from '@/utils/tools';
import Item from './components/coupon';
import teamApi from '@/apis/appointment';

Vue.use(VanImage);
Vue.use(List);
export default {
  props: {
    list: {
      type: Array,
      default: [
        {
          price: '8',
          type: 1,
          title: '8元新人首单券',
          time: '有效期：2021.05.01前有效'
        },
        {
          price: '8',
          type: 1,
          title: '8元新人首单券',
          time: '有效期：2021.05.01前有效'
        },
        {
          price: '8',
          type: 1,
          title: '8元新人首单券',
          time: '有效期：2021.05.01前有效'
        },
        {
          price: '8',
          type: 1,
          title: '8元新人首单券',
          time: '有效期：2021.05.01前有效'
        }
      ]
    },
  },
  data() {
    return {
      robed: false,
      list: [],
      loading: false,
      finished: false,
      page: 1,
      size: 10,
      totalPage: 1,
    };
  },
  components: {
    Item
  },
  created () {
  },
  methods: {
    getImgUrl,
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
      font-family:HuXiaoBo-NanShen;
      color:#e83527;
      font-size:16.8px;
    }
    .coupon {
      width: 290px;
      height: 74px;
      background-size: 290px 74px;
      margin-left: 44px;
      margin-top: 42px;
      display: flex;
      justify-content: space-between;
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
        margin-right: 14px;
        position: relative;
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
        margin-right: 14px;
        width:60px;
        height:27px;
        border:1px solid;
        border-color:#f6e8ca;
        border-radius:13.5px;
        font-family:PingFang SC;
        font-weight:500;
        color:#f6e8ca;
        font-size:12px;
        line-height:27px;
        text-align: center;
      }
    }
  }
  .btn-tab {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 14px 14px 12px 16px;
    overflow: hidden;
    overflow-x: auto;
    .btn {
      width:86px;
      height:37px;
      font-family:PingFang SC;
      font-weight:600;
      color:#fdf4ed;
      font-size:16px;
      line-height:37px;
      text-align:center;
    }
    .act {
      background-color:#fefaf5;
      border-radius:18.5px;
      color:#d93d33;
    }
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
</style>