<template>
  <div
    class="user_appointment"
  >
    <div class="flex_fix">
      <nav-bar title="单约专享" />
    </div>
    <img
      class="back_img flex_fix"
      :src="getImgUrl('publicMobile/together/activity_back.png')"
    />
    <div class="container">
      <separate-line v-if="goodList.length" title="正在疯抢" />
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
          <separate-line title="没有更多商品" />
        </template>
      </van-list>
    </div>
  </div>
</template>

<script>
import { Image, List } from 'vant';
import { getImgUrl } from '@/utils/tools';
import NavBar from '@/components/navbar';
import GoodsItem from '@/components/goods-item';
import SeparateLine from '@/components/separate-line';
import teamApi from '@/apis/appointment';
import commonApi from '@/apis/common';
import jsBridge from '@/utils/jsBridge';

export default {
  data() {
    return {
      loading: false,
      finished: true,
      page: 1,
      size: 10,
      totalPage: 1,
      goodList: [],
    };
  },
  components: {
    'nav-bar': NavBar,
    GoodsItem,
    SeparateLine,
    [Image.name]: Image,
    [List.name]: List,
  },
  created () {
    // 不推荐在这里调用 fetchItem
    // this.getUserList();
    this.getResourceKey();
    // console.log('windows', window);
    // console.log(this.$store.state);
    this.jsb = jsBridge;
    console.log(this.jsb);
  },
  methods: {
    getImgUrl,
    getResourceKey() {
      commonApi.getResourceKey({
        resourceKey: "MINIEXAMINE",
        timeVersion: new Date().getTime(),
      }).then(res => {
        // console.log("res", res);
        if(res.code == 0) {
          const data = res.data.data;
          if(data.state == 1) {
            this.getUserList()
          }
        }
      });

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
    background-color: #CE1E27;
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
  }
  .goods_list {
    padding: 0 12px;
  }
</style>
