<template>
  <div class="goods-item-wrap" :style="{'width': width}">
    <div class="goods-item">
      <div class="img-wrap">
        <img src="https://hznt-mall.oss-cn-shenzhen.aliyuncs.com/home/store/goods/178/alioss_178_2020082217535991940.jpg" />
      </div>
      <div class="info-box">
        <div class="title">宾购限量版</div>
        <div class="price-box">
          <div class="price-1">
            <span>会员价</span>
            <em>¥288</em>
          </div>
          <div class="price-2">
            <span>会员价</span>
            <em>¥288</em>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: '50%',
    },
  },
};
</script>

<style lang="scss" scoped>
.goods-item-wrap {
  width: 49%;
}
.goods-item {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.img-wrap {
  width: 100%;
  padding-top: 100%;
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
}

.info-box {
  background: #fff;
  padding: 0 5px 5px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.title {
  font-size: 14px;
  color: #333;
  margin-top: 5px;
}

.price-box {
  > div {
    margin-top: 5px;
  }
  span {
    display: inline-block;
    margin-right: 10px;
    padding: 0 5px;
  }
}

.price-1 {
  font-size: 12px;
  span {
    background-color: #fae8b2;
    color: #6a4c31;
    border-radius: 2px;
  }

  em {
    color: #f50c0c;
  }
}

.price-2 {
  font-size: 12px;
  color: #b1b1b1;

  em {
    text-decoration: line-through;
  }
}
</style>
