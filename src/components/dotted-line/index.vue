<template>
  <div class="dotted_line">
    <van-image
      class="left_line"
      width="34px"
      height="1px"
      :src="linel"
    />
    <div class="title" >{{title}}</div>
    <van-image
      class="right_line"
      width="34px"
      height="1px"
      :src="liner"
    />
  </div>
</template>

<script>
import { Image } from 'vant';
import { getImgUrl } from '@/utils/tools';

const linel = getImgUrl('publicMobile/dotted/left-line.png');
const liner = getImgUrl('publicMobile/dotted/right-line.png');
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      linel,
      liner,
    };
  },
  components: {
    [Image.name]: Image,
  },
};
</script>

<style>
  .dotted_line {
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: .4;
  }
  .title {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
  }
  .left_line {
    margin-right: 12px;
  }
  .right_line {
    margin-left: 12px;
  }
</style>
