<template>
  <div class="price_comparsion">
    <van-image
      width="100%"
      height="215px"
      :src="getImgUrl('publicMobile/price/bg.png')"
    />
    <div class="save-goods-box">
      <div class="title-img-box">
        <van-image
          class="title-img"
          width="283px"
          height="66px"
          :src="getImgUrl('publicMobile/price/title1.png')"
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
    <div class="hot-recommend-box">
      <div class="title-img-box">
        <van-image
          class="title-img"
          width="283px"
          height="66px"
          :src="getImgUrl('publicMobile/price/title2.png')"
        />
      </div>

      <div class="hot-list">
        <van-list
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
import { Image as VanImage, List } from 'vant';
import { getImgUrl } from '@/utils/tools';
import Save from './components/save';
import Hot from './components/hot';
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
      listData: [],
      list: [],
      loading: false,
      finished: false,
      page: 1,
      size: 5,
      totalPage: 1,
    };
  },
  components: {
    Save,
    Hot,
  },
  created () {

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
  mounted() {
    this.onLoad()
    this.getListData()
  }
};
</script>

<style lang="scss" scoped>
  body,html {
    background-color: #EA3327;
  }
  .price_comparsion {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #EA3327;
    padding-bottom: 50px;
  }
  .save-goods-box {
    padding-bottom: 24px;
  }
  .title-img-box {
    display: flex;
    justify-content: center;
  }
  .save-list {
    padding-left: 12px;
    width: 100%;
    height: 215px;
    white-space: nowrap;/*文本不会换行，文本会在在同一行上继续*/
    overflow-x: auto;
  }
  .save-box {
    height: 100%;
  }
  .hot-recommend-box {
    position: relative;
    top: -12px;
    width: 100%;
    // min-height: 618px;
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
</style>
