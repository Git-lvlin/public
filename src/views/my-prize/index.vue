<template>
  <div class="my-prize" v-if="prizeList">
    <div class="list-box">
      <list
        v-for="item in prizeList"
        :key="item.id"
        :good="item"
      />
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Image as VanImage, Dialog, Swipe, SwipeItem, Lazyload } from 'vant';
import { getImgUrl } from '@/utils/tools';
import { appBaseUrl } from "@/constant/index";
import { list } from './components/list';
import teamApi from '@/apis/bindbox';
import QrcodeVue from 'qrcode.vue';

export default {
  data() {
    return {
      prizeList: null,
    };
  },
  components: {
    list,
  },
  created () {
  },
  methods: {
    getImgUrl,
    init() {
      const {
        query,
      } = this.$router.history.current;
      teamApi.getPrizeList({size:100,next:1}, {token: query.token}).then((res) => {
        if(res.code === 0) {
          this.prizeList = res.data.records
        }
      })
    }
  },
  mounted() {
    this.init()
  }
};
</script>

<style lang="scss" scoped>
.my-prize {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #F5F5F5;
}
.list-box {
  padding: 12px;
}
</style>
