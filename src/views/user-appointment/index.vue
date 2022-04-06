<template>
  <div
    class="user_appointment"
  >
    <!-- <div class="flex_fix">
      <nav-bar title="单约专享" />
    </div> -->
    <div class="banner">
      <van-swipe class="my-swipe" :autoplay="2000" indicator-color="white">
        <van-swipe-item v-for="(item,index) in bannerList" :key="index">
          <img class="user-pic" width="100%" height="100%" :src="item.image" @click="clickBanner(item)"/>
        </van-swipe-item>
      </van-swipe>
    </div>
    <img
      class="back_img flex_fix"
      :src="getImgUrl('publicMobile/together/activity_back.png')"
    />
    <div class="container" v-if="goodList.length">
      <!-- <dotted-line v-if="!.length" title="正在疯抢" /> -->
      <van-list
        v-if="goodList.length"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多商品"
        @load="onBottomReach"
      >
        <div class="goods_list">
          <goods-item
            v-for="item in goodList"
            :key="item.id"
            :good="item"
          />
        </div>
        <template #finished>
          <!-- <separate-line title="没有更多商品" /> -->
          <dotted-line title="没有更多商品" />
        </template>
      </van-list>
    </div>
    <div class="null" v-if="isNull">
      <van-image
        class="null-icon"
        width="288px"
        height="239px"
        :src="getImgUrl('publicMobile/fresh/null.png')"
      />
      <div class="null-text">商品已抢光啦，下次早点来喔～</div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Image, List, Swipe, SwipeItem } from 'vant';
import { getImgUrl } from '@/utils/tools';
import NavBar from '@/components/navbar';
import GoodsItem from '@/components/goods-item';
import SeparateLine from '@/components/separate-line';
import DottedLine from '@/components/dotted-line';
import teamApi from '@/apis/appointment';
import commonApi from '@/apis/common';
import jsBridge from '@/utils/jsBridge';
import { goToApp } from '@/utils/userInfo';
Vue.use(Swipe);
Vue.use(SwipeItem);
export default {
  data() {
    return {
      loading: false,
      finished: true,
      page: 1,
      size: 10,
      totalPage: 1,
      goodList: [],
      bannerList: null,
      isNull: false,
    };
  },
  components: {
    'nav-bar': NavBar,
    GoodsItem,
    SeparateLine,
    DottedLine,
    [Image.name]: Image,
    [List.name]: List,
  },
  created () {
    // 不推荐在这里调用 fetchItem
    // this.getUserList();
    this.getbanner()
    this.getResourceKey();
    // console.log('windows', window);
    // console.log(this.$store.state);
    this.jsb = jsBridge;
    console.log(this.jsb);
  },
  methods: {
    getImgUrl,
    clickBanner(item) {
      console.log('点击拼团banner-item', item)
      if (!item.actionUrl) {
        return
      }
      if (item.actionUrlApp) {
        // 有类型参数就分别跳转
        if (this.$store.state.appInfo.isApp && item.actionUrlApp) {
          goToApp(item.actionUrlApp)
          return
        }
        if (this.$store.state.appInfo.isMiniprogram && item.actionUrlMini) {
          wx.miniProgram.navigateTo({
            url: item.actionUrlMini
          })
          return
        }
      } else {
        // 默认跳转app
        goToApp(item.actionUrl)
      }
    },
    getbanner() {
      const param = {
        location: 8,
        verifyVersionId: 1
      }
      commonApi.getBannerList(param).then(res=>{
        this.bannerList = res.data.map(item => {
          if (item.actionUrl && item.actionUrl.includes(',')) {
            let arr = item.actionUrl.split(',')
            item.actionUrlApp = arr[0]
            item.actionUrlMini = arr[1]
            return item
          }
          return item
        })
      })
    },
    getResourceKey() {
      // commonApi.getResourceKey({
      //   resourceKey: "MINIEXAMINE",
      //   timeVersion: new Date().getTime(),
      // }).then(res => {
      //   // console.log("res", res);
      //   if(res.code == 0) {
      //     const data = res.data.data;
      //     if(data.state == 1) {
      //       this.getUserList()
      //     }
      //   }
      // });
      this.getUserList()
    },
    getUserList() {
      const {
        page,
        size,
      } = this;
      this.loading = true;
      teamApi.getUserList({
        page,
        size,
      }).then((res) => {
        const {
          data,
        } = res;
        if (data && data.records) {
          this.totalPage = data.totalPage;
          if (page < 2) {
            this.goodList = data.records;
          } else {
            this.goodList = this.goodList.concat(data.records);
          }
          if (!this.goodList.length) {
            this.isNull = true
          }
          if (data.records.length < this.size) {
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
        this.getUserList();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .van-nav-bar {
    background-color: transparent;
    box-shadow: none;
  }
  .van-hairline--bottom::after {
    border-bottom-width: 0;
  }

  .flex_fix {
    flex-grow: 0;
    flex-shrink: 0;
  }

  .user_appointment {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #E10017;
  }

  .back_img {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 0;
    width: 375px;
    height: 210px;
  }

  .container {
    position: relative;
    z-index: 1;
    flex: 1;
    overflow-y: auto;
    padding-bottom: 62px;
  }
  .goods_list {
    padding: 0 12px;
    margin-bottom: 20px;
  }
  .banner {
    padding: 94px 12px 16px 12px;
    border-radius: 12px;
    overflow: hidden;
    z-index: 2;
  }
  .my-swipe {
    border-radius: 12px;
    overflow: hidden;
    height: 100px;
  }
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
  }
  .null {
    margin: 0 auto;
    margin-top: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 351px;
    height: 361px;
    background: #FFFFFF;
    border-radius: 12px;
    .null-text {
      font-size: 13px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      line-height: 19px;
    }
  }
</style>
