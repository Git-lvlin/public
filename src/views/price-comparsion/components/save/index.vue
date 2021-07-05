<template>
  <div class="save">
    <van-image
      class="img"
      width="78px"
      height="78px"
      :src="getImgUrl('publicMobile/price/gold-medal1.png')"
    />
    <div class="tag">精选特惠</div>
    <div class="price">
      <span class="span1">¥{{10.88}}</span>
      <span class="span2">¥{{15.99}}</span>
    </div>
  </div>
</template>

<script>
import { getImgUrl } from '@/utils/tools';

export default {
  props: {
    good: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    getImgUrl,
  }
}
</script>

<style lang="scss" scoped>
.save {
  display: inline-block;
  margin-right: 12px;
  width: 78px;
  height: 100%;
  overflow: hidden;
}
.img {
  border-radius: 4px;
}
.tag {
  width: 46px;
  height: 14px;
  background-image: linear-gradient(270deg,#fb5f2a 0%,#e5352f 100%);
  border-radius: 2px;
  font-size: 10px;
  line-height: 14px;
  font-family: PingFang SC;
  color: #ffffff;
  text-align: center;
  margin-bottom: 4px;
}
.price {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.span1 {
  font-family: Helvetica Neue;
  font-weight: 700;
  letter-spacing: 1.17px;
  color: #d7291d;
  font-size: 10px;
}
.span2 {
  font-family: PingFang SC;
  color: #999999;
  font-size: 10px;
  letter-spacing: 0.5px;
  text-decoration: line-through;
}
</style>

