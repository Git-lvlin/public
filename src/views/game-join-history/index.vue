<template>
  <div class="history-box">
    <div class="bar-list">
      <div :class="`bar-item ${actType == 1 ? 'bar-act' : ''}`" @click="onChangeBar(1)">获得机会</div>
      <div :class="`bar-item ${actType == 2 ? 'bar-act' : ''}`" @click="onChangeBar(2)">我的红包奖励</div>
    </div>

    <div class="history-content">

    </div>
  </div>
</template>

<script>
import { getImgUrl } from '@/utils/tools';

export default {
  data() {
    return {
      actType: 1,
    };
  },
  components: {
    Image,
  },
  mounted () {
  },
  methods: {
    getImgUrl,
    onChangeBar(type) {
      if(type != this.actType) {
        this.actType = type
      }
    }
  },
};
</script>

<style lang="scss" scoped>
  .history-box {
    min-height: 100vh;
    background-color: #F5F5F5;
  }
  .bar-list {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 46px;
    background-color: #fff;
    border-top: 1px solid #eee;
  }
  .bar-item {
    position: relative;
    width: 50%;
    font-size: 14px;
    color: #999999;
    line-height: 46px;
    text-align: center;
  }
  .bar-act {
    font-weight: 600;
    color: #E5352F;
  }
  .bar-act::after {
    content: '';
    position: absolute;
    bottom: 2px;
    left: 0;
    width: 100%;
    height: 2px;
    background: #E5352F;
  }

  .history-content {
    margin-top: 8px;
  }
  
</style>
