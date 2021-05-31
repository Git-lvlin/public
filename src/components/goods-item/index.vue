<template>
  <div class="goods-item">
    <div class="flex_fix img-wrap">
      <pic
        width="100px"
        height="100px"
        src="https://12312313"
      />
      <div class="sale" >已约288件</div>
    </div>
    <div class="info_box">
      <div class="title text_two_line">宁夏菠萝蜜500g装时令鲜水果 500g装时令鲜水果宁夏菠萝蜜500g装时令鲜水果 500g装时令鲜水果</div>
      <div class="desc text_one_line">七天无理由退换丨全场包邮</div>
      <div class="time_down"><CountDown :time="time" color="#e7512d" />后结束</div>
      <div class="flex_middle footer">
        <div class="price_box">
          <div class="price_market">
            <span>市场价：</span>
            <em>¥288</em>
          </div>
          <div class="price">
            <span class="text_red">单约价 </span>
            <span class="text_small">¥</span>
            <span>288</span>
          </div>
        </div>
        <div class="btn last_arrow">去单约</div>
      </div>
    </div>
  </div>
</template>

<script>
import Image from '@/components/image';
import CountDown from '@/components/count-down';

export default {
  props: {
    width: {
      type: String,
      default: '50%',
    },
  },
  components: {
    pic: Image,
    CountDown,
  },
  data() {
    return {
      time: 30 * 60 * 60 * 60,
    };
  },
};
</script>

<style lang="scss" scoped>
.goods-item {
  display: flex;
  padding: 12px;
  margin-bottom: 12px;
  background-color: #ffffff;
  border-radius: 8px;
}

.img-wrap {
  width: 100px;
  height: 122px;
  overflow: hidden;
  border-radius: 8px;
}
.sale {
  width: 100px;
  height: 22px;
  color: #ffffff;
  font-size: 12px;
  line-height: 22px;
  text-align: center;
  background-color: #d7291d;
}

.info_box {
  margin-left: 8px;
}
.title {
  color: #333333;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 4px;
}
.desc {
  color: #999999;
  font-size: 14px;
  line-height: 20px;
}
.time_down{
  display: flex;
  justify-content: flex-end;
  color: #e7512d;
  font-size: 14px;
  line-height: 14px;
  margin: 6px 0;
}
.footer {
  justify-content: space-between;
}
.price_market {
  color: #b2b2b2;
  font-size: 10px;
  letter-spacing: 0.5px;
  text-decoration: line-through;
  line-height: 14px;
  margin-bottom: 4px;
}
.price {
  font-weight: 700;
  color: #d7291d;
  font-size: 14px;
  line-height: 15px;
}
.text_red {
  color: #e7532c;
}
.text_small {
  font-size: 10px;
}
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 75px;
  height: 32px;
  color: #ffffff;
  font-size: 14px;
  line-height: 20px;
  background-color: #d7291d;
  border-radius: 4px;
}
</style>
