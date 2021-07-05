<template>
  <div class="price_comparsion">
    <van-image
      width="100%"
      :src="getImgUrl('publicMobile/price/bg.png')"
    />
    <div class="save-goods-box">
      <div class="title-img-box">
        <van-image
          class="title-img"
          width="283px"
          height="66px"
          :src="getImgUrl('publicMobile/price/title.png')"
        />
        <div class="p">低价爆品</div>
      </div>
      <van-image
        class="gold-medal-img"
        width="51px"
        height="49px"
        :src="getImgUrl('publicMobile/price/gold-medal1.png')"
      />
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
          :src="getImgUrl('publicMobile/price/title.png')"
        />
        <div class="p">热门推荐</div>
      </div>
      <van-image
        class="gold-medal-img"
        width="51px"
        height="49px"
        :src="getImgUrl('publicMobile/price/gold-medal1.png')"
      />
      <div class="hot-list">
        <van-list
          v-model="loading"
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
      default: [
        {
          src: getImgUrl('publicMobile/price/gold-medal1.png'),
          title: '宁夏菠萝蜜500g装时令鲜水果g装时令鲜水果g装时令鲜水果g装时令鲜水果g装时令鲜水果',
          sort: '方便速食类销量排名第1',
          num: '销量1万+',
          compare: '共有4个商场比价',
          save: '降价50%',
          price: '10.88',
          oldPrice: '13.99',
        },
      ]
    },
    listData: {
      type: Array,
      default: [
        {
          src: getImgUrl('publicMobile/price/gold-medal1.png'),
          save: '1',
          price: '10',
          oldPrice: '13',
          type: true,
        },
        {
          src: getImgUrl('publicMobile/price/gold-medal1.png'),
          save: '1',
          price: '10',
          oldPrice: '13',
          type: true,
        },
        {
          src: getImgUrl('publicMobile/price/gold-medal1.png'),
          save: '1',
          price: '10',
          oldPrice: '13',
          type: true,
        },
        {
          src: getImgUrl('publicMobile/price/gold-medal1.png'),
          save: '1',
          price: '10',
          oldPrice: '13',
          type: true,
        },
        {
          src: getImgUrl('publicMobile/price/gold-medal1.png'),
          save: '1',
          price: '10',
          oldPrice: '13',
          type: true,
        },
        {
          src: getImgUrl('publicMobile/price/gold-medal1.png'),
          save: '1',
          price: '10',
          oldPrice: '13',
          type: true,
        }
      ]
    },
  },
  data() {
    return {
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
  },
  created () {
    this.onLoad()
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
          this.totalPage = data.totalPage;
          if (page < 2) {
            this.list = data.records;
          } else {
            this.list = this.list.concat(data.records);
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
    background-color: #b7483f;
  }
  .save-goods-box {
    position: relative;
    top: -70px;
    width: 100%;
    height: 210px;
    background-color: #f3b2b0;
    border-radius: 12px;
  }
  .title-img-box {
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
  }
  .p {
    position: absolute;
    top: 4px;
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
  .gold-medal-img {
    position: absolute;
    top: -15px;
    left: 12px;
  }
  .save-list {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 12px;
    padding: 10px 0px 10px 8px;
    width: 351px;
    height: 139px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.02);
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
    min-height: 618px;
    background-color: #f3b2b0;
    border-radius: 12px;
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
    margin-top: 59px;
    padding: 0 12px;
  }
</style>
