<template>
  <div class="container">
    <van-image
      class="bg"
      width="100%"
      height="430px"
      lazy-load
      :src="getImgUrl('publicMobile/share/border.png')"
    />
    <div class="content">
      <div class="top-box">
        <van-image
          class="top-img"
          width="101px"
          height="120px"
          lazy-load
          :src="getImgUrl('publicMobile/share/border.png')"
        />
        <div class="top-right-box">
          <div class="text">
            使用条件:<span>{{type}}</span>
          </div>
          <div class="text">
            有效期:<span>{{time}}</span>
          </div>
          <div class="text">
            <span>距过期:</span>
            <span>

            </span>
          </div>
        </div>
      </div>
      <div class="item-box" v-if="data.length">
        <div class="item" v-for="(item, index) in data" :key="index">
          <van-image
            class="top-img"
            width="117px"
            height="117px"
            lazy-load
            :src="item.src"
          />
          <div class="item-right-box">
            <div class="item-title">{{item.name}}</div>
            <div class="item-tag">{{item.tag}}</div>
            <div class="item-o-price">{{item.price}}</div>
            <div class="item-price">{{item.salePrice}}</div>
          </div>
          <div class="item-btn">抢购</div>
        </div>
      </div>
      <div class="null-box" v-else>
        <van-image
          class="null-img"
          width="160px"
          height="160px"
          lazy-load
          :src="getImgUrl('publicMobile/share/border.png')"
        />
        <div class="null-text">暂无相关商品~</div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Image as VanImage } from 'vant';
import { getImgUrl } from '@/utils/tools';
import teamApi from '@/apis/limit';
Vue.use(VanImage);
export default {
  data() {
    return {
    };
  },
  created () {
  },
  mounted() {
  },
  methods: {
    getImgUrl,
    getInfo() {
      teamApi.getTimeLimit().then(res => {
        
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
  background-color: #F5F5F5;
}
</style>
