<template>
  <div class="hot">
    <div class="left-box">
      <van-image
        class="hot-good-img"
        width="100px"
        height="100px"
        :src="getImgUrl('publicMobile/price/gold-medal1.png')"
      />
      <div class="save">{{good.save}}</div>
    </div>
    <div class="right-box">
      <div class="title">{{good.title}}</div>
      <div class="sort">
        <van-image
          class="sort-icon"
          width="18px"
          height="18px"
          :src="getImgUrl('publicMobile/price/icon.png')"
        />
        <span class="icon">{{good.sort}}</span>
      </div>
      <div class="num">
        <van-image
          class="hot-icon"
          width="18px"
          height="18px"
          :src="getImgUrl('publicMobile/price/hot.png')"
        />
        <span class="icon">{{good.num}}</span>
      </div>
      <div class="compare">{{good.compare}}</div>
      <div class="price">
        <span class="span1">¥{{good.price}}</span>
        <span class="span2">¥{{good.oldPrice}}</span>
        <van-image
          class="right-img"
          width="20px"
          height="20px"
          :src="getImgUrl('publicMobile/price/right.png')"
        />
      </div>
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
.hot {
  width: 100%;
  padding: 12px;
  background-color: #ffffff;
  margin-bottom: 12px;
  border-radius: 8px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
}
.left-box {
  display: flex;
  flex-direction: column;
  width: 100px;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
}
.save {
  text-align: center;
  width: 100%;
  height: 22px;
  line-height: 22px;
  background-color: #d7291d;
  color: #ffffff;
  font-family: PingFang SC;
  font-size: 12px;
}
.right-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 215px;
}
.title {
  height: 22px;
  font-family: PingFang SC;
  color: #333333;
  font-size: 16px;
  line-height: 22px;
  margin-bottom: 5px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.sort {
  display: flex;
  justify-content: flex-start;
  width: 174px;
  height: 18px;
  background-image: linear-gradient(90deg,#fdf6f2 0%,#fdf6f2 100%);
  border-radius: 9.5px;
  margin-bottom: 5px;
  font-family: PingFang SC;
  color: #333333;
  font-size: 13px;
  line-height: 18px;
}
.icon {
  margin-left: 8px;
}
.num {
  display: flex;
  justify-content: flex-start;
  width: 91px;
  height: 18px;
  background-image: linear-gradient(90deg,#fdf1f4 0%,#fdf1f4 100%);
  border-radius: 9.5px;
  margin-bottom: 4px;
  font-family: PingFang SC;
  color: #333333;
  font-size: 13px;
  line-height: 18px;
}
.compare {
  height: 17px;
  font-family: PingFang SC;
  color: #999999;
  font-size: 12px;
  letter-spacing: 0.6px;
  line-height: 17px;
  margin-bottom: 8px;
}
.price {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
}
.span1 {
  font-family: Helvetica Neue;
  font-weight: 700;
  color: #d7291d;
  font-size: 12px;
  letter-spacing: 1.4px;
}
.span2 {
  font-family: PingFang SC;
  color: #cccccc;
  font-size: 12px;
  letter-spacing: 0.6px;
  text-decoration: line-through;
}
.right-img {
  position: absolute;
  right: 24px;
}
</style>

