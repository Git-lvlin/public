<template>
  <div class="page">
    <div style="display:flex">
      <div class="p1">店铺名称</div>
      <div class="p2">{{ $route.query.storeName }}</div>
    </div>
    <van-divider />
    <div>
      <div class="p3">升级为VIP社区店，享受更多权益：</div>
      <div class="p4">氢原子销售和租赁分成更高</div>
    </div>
    <van-divider />

    <div class="p5">现在升级为VIP社区店</div>
    <div class="p4">技术服务费仅需：<span>¥{{ +$route.query.serviceAmount / 100
    }}</span>{{ +$route.query.top > 0 ? `(仅限前${$route.query.top}名)` : '' }}</div>
  </div>
</template>

<script>
import Vue from "vue";
import { Divider } from "vant";

export default {
  components: {
    [Divider.name]: Divider,
  }
};
</script>

<style lang="scss" scoped>


.page {
  background: #fff;
  height: 100vh;
  padding: 24px 16px 0;
  box-sizing: border-box;
}

.p1 {
  font-size: 14px;
  font-weight: 700;
  color: #333333;
  margin-right: 30px;
  padding-left: 10px;
}

.p2 {
  font-size: 14px;
  font-weight: 400;
  color: #333333;
}

.p3 {
  font-size: 14px;
  font-weight: 700;
  color: #333333;
  padding-left: 10px;
}

.p4 {
  font-size: 14px;
  font-weight: 400;
  color: #333333;
  padding-left: 10px;
  span {
    color: red;
  }
}

.p5 {
  font-size: 18px;
  font-weight: 700;
  color: #333333;
  margin-top: 20px;
  padding-left: 10px;
  margin-bottom: 5px;
}

</style>
