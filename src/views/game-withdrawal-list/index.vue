<template>
  <div class="withdrawal-list">
    <div class="content-box">
      <div class="list" v-for="idx in 2" >
        <div class="item" @click="onToDetail(idx)">
          <img
            class="avatar flex-fix"
            referrerpolicy="no-referrer"
            src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng3737a564ccf0e7da452f0284f3de129a2bc5f59b859025866a8aefaebdd25978"
          />
          <div class="user-info">
            <div class="info-title">账户提现-支付宝（6472）</div>
            <div class="item-time">12月20日 19:58</div>
          </div>
          <div class="price flex-fix">¥3000.00</div>
        </div>
      </div>
      <div class="desc">
        仅展示所选月份交易数据，查看更多请选择时间
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Image } from 'vant';
import { getImgUrl } from '@/utils/tools';


export default {
  data() {
    return {
    };
  },
  components: {
    Image,
  },
  mounted () {
  },
  methods: {
    getImgUrl,
    onToDetail(idx) {
      console.log("🚀 ~ file: index.vue ~ line 44 ~ onToDetail ~ idx", idx)
      this.$router.push('/web/game-withdrawal-detail');
    },
  },
};
</script>

<style lang="scss" scoped>
  .withdrawal-list {
    min-height: 100vh;
    padding: 12px;
    background-color: rgba(249, 249, 249, 1);
  }
  .content-box {
    padding: 15px;
    background-color: #fff;
    border-radius: 10px;
  }
  .flex-fix {
    flex-grow: 0;
    flex-shrink: 0;
  }
  .list {
    height: 70px;
    padding-left: 13px;
    padding-right: 16px;
    margin-bottom: 5px;
    background-color: rgba(249, 249, 249, 1);
    border-radius: 10px;
  }
  .item {
    display: flex;
    align-items: center;
    height: 100%;
  }
  .avatar {
    width: 32px;
    height: 32px;
    margin-top: 5px;
  }
  .user-info {
    flex: 1;
    height: 46px;
    margin-left: 3px;
  }
  .info-title {
    color: rgba(90, 90, 90, 1);
    font-size: 15px;
    line-height: 21px;
    white-space: nowrap;
    margin-left: 2px;
  }
  .item-time {
    color: rgba(153, 153, 153, 1);
    font-size: 14px;
    line-height: 20px;
    margin-top: 5px;
  }
  .price {
    color: rgba(255, 135, 24, 1);
    font-size: 15px;
    text-align: center;
    line-height: 17px;
  }
  
  .desc {
    color: rgba(153, 153, 153, 1);
    font-size: 15px;
    line-height: 21px;
    margin: 20px 0 0 2px;
  }
</style>
