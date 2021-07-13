<template>
  <div class="price_comparsion">
    <van-image
      width="100%"
      :src="getImgUrl('publicMobile/special/bg.png')"
    />
    <div class="save-goods-box">
      <div class="title-img-box">
        <van-image
          width="100%"
          :src="getImgUrl('publicMobile/special/g.png')"
        />
      </div>
      <div class="save-list">
        <div class="save-box">
          <save
            v-for="item in listData"
            :key="item.skuId"
            :good="item"
          />
        </div>
      </div>
    </div>
    <div class="save-goods-box">
      <div class="title-img-box">
        <van-image
          width="100%"
          :src="getImgUrl('publicMobile/special/s.png')"
        />
      </div>
      <div class="save-list">
        <div class="save-box">
          <save
            v-for="item in listData"
            :key="item.skuId"
            :good="item"
          />
        </div>
      </div>
    </div>
    <div class="button-box">
      <div class="button show">
        <span class="b1">仅剩23:23:23</span>
        <span class="b2">正在疯约</span>
      </div>
      <div class="button">
        <span class="b1">5月28日</span>
        <span class="b2">明日开约</span>
      </div>
      <div class="button">
        <span class="b1">5月29日</span>
        <span class="b2">明日开约</span>
      </div>
    </div>
    <div class="hot-recommend-box">
      <div class="hot-list">
        <van-list
          v-if="list.length"
          v-model="loading"
          offset=0
          :immediate-check="false"
          :finished="finished"
          finished-text="没有更多商品"
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
import { Image as VanImage, List } from 'vant';
import { getImgUrl } from '@/utils/tools';
import Save from './components/group';
import Hot from './components/crazy';
import Single from './components/single';
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
    singleList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      singleList: [],
      listData: [],
      list: [],
      loading: false,
      finished: false,
      page: 1,
      size: 10,
      totalPage: 1,
    };
  },
  components: {
    Save,
    Hot,
    Single,
  },
  created () {
    this.onLoad()
    this.getListData()
  },
  methods: {
    getImgUrl,
    getListData() {
      teamApi.getSaveGoodsList().then((res) => {
        const {
          data,
        } = res;
        if (data && data.records) {
          this.listData = data.records;
        }
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
};
</script>

<style lang="scss" scoped>
  .price_comparsion {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color:#f1faff;
  }
  .save-goods-box {
    margin-top: 8px;
    position: relative;
    width: 100%;
    height: 280px;
    border-radius: 12px;
  }
  .title-img-box {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 351px;
    // height: 94px;
    border-radius: 8px 8px 0px 0px;
  }
  .p {
    position: absolute;
    top: 94px;
    left: 50%;
    transform: translateX(-50%);
    height: 40px;
    font-family: PingFang SC;
    font-weight: 600;
    color: #b43e35;
    font-size: 28px;
    letter-spacing: -0.87px;
    line-height: 40px;
    text-align: center;
  }
  .save-list {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
    padding: 11px 0px 11px 11px;
    width: 351px;
    height: 186px;
    background-color: #ffffff;
    border-radius:0px 0px 8px 8px;
    white-space: nowrap;/*文本不会换行，文本会在在同一行上继续*/
    overflow-x: auto;
  }
  .save-box {
    height: 100%;
  }
  .hot-recommend-box {
    position: relative;
    width: 100%;
    min-height: 618px;
  }
  ::-webkit-scrollbar {
    width: 0 !important;
    height: 0 !important;
    display: none;
  }
  .element::-webkit-scrollbar { width: 0 !important }
  .element { -ms-overflow-style: none; }
  .element { overflow: -moz-scrollbars-none; }
  .hot-list {
    padding: 0 12px;
  }
  .button-box {
    padding: 12px 0;
    display: flex;
    justify-content: center;
    .button {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width:87px;
      height:39px;
      background-color:rgba(229, 53, 47, 0.4);
      border-radius:19.5px;
      .b1 {
        font-family:PingFang SC;
        font-weight:500;
        color:#ffffff;
        font-size:11px;
        line-height:16px;
        text-align:center;
        margin-bottom: 2px;
      }
      .b2 {
        font-family:PingFang SC;
        font-weight:500;
        color:#ffffff;
        font-size:12px;
        letter-spacing:0.6px;
        line-height:17px;
      }
    }
    .button:nth-child(2) {
      margin: 0 17px;
    }
    .show {
      background-color:#e5352f;
    }
  }
</style>
