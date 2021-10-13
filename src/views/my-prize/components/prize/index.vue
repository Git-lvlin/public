<template>
  <div class="prize">
    <van-image class="img" width="89px" height="89px" :src="good.imageUrl" />
    <div class="content">
      <p class="title van-multi-ellipsis--l2">{{good.goodsName}}</p>
      <p class="time">获得时间：{{good.createTime}}</p>
      <p class="time">失效时间：{{good.expireTime}}</p>
    </div>
    <div v-if="good.status===0" class="btn" @click="go">免费兑换</div>
    <div v-else-if="good.status===1" class="ing">兑换中</div>
    <div v-else-if="good.status===2" class="ed">已兑换</div>
    <div v-else class="out">已失效</div>
  </div>
</template>

<script>
import { getImgUrl } from '@/utils/tools';
import { appBaseUrl } from "@/constant/index";
import { goToApp } from '@/utils/userInfo';

export default {
  props: {
    good: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    getImgUrl,
    go() {
      // 跳转到商品详情页面
      const { skuId, spuId, orderId, chanceId, memberId, orderType, activityId, objectId } = this.good;
      const param = `?skuId=${skuId}&spuId=${spuId}&orderId=${orderId}&chanceId=${chanceId}&memberId=${memberId}&orderType=${orderType}&activityId=${activityId}&objectId=${objectId}`;
      console.log('param', param);
      goToApp(appBaseUrl, '/shopping/detail', param, this.$bridge)
    }
  }
}
</script>

<style lang="scss" scoped>
.prize {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 351px;
  height: 109px;
  background: #FFFFFF;
  border-radius: 4px;
}
.img {
  width: 89px;
  height: 89px;
}
.content {
  margin-left: 10px;
  margin-right: 13px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 145px;
  .title {
    height: 40px;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 20px;
  }
  .time {
    margin-top: 5px;
    height: 16px;
    font-size: 11px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
    line-height: 16px;
  }
}
.btn {
  width: 74px;
  height: 39px;
  background: #D93D33;
  border-radius: 4px;
  font-size: 12px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #FFFFFF;
  line-height: 39px;
  text-align: center;
}
.ing,.ed {
  width: 74px;
  height: 39px;
  background: #D93D33;
  border-radius: 4px;
  opacity: 0.3;
  font-size: 12px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #FFFFFF;
  line-height: 39px;
  text-align: center;
}
.out {
  width: 74px;
  height: 39px;
  background: #CCCCCC;
  border-radius: 4px;
  font-size: 12px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #FFFFFF;
  line-height: 39px;
  text-align: center;
}
</style>

