<template>
  <div class="good-item"
    :style="{
      'background-image': `url('${getImgUrl('publicMobile/bindbox/img-box.png')}')`
    }"
  >
    <van-image class="box" width="72px" height="56px" :src="good.imageUrl" />
    <div class="text">{{good.name}}</div>
  </div>
</template>

<script>
import { getImgUrl } from '@/utils/tools';
import { appBaseUrl } from "@/constant/index";
import { goToApp, judgeVersionIsNew } from '@/utils/userInfo';

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
.good-item {
  position: relative;
  display: inline-block;
  margin-right: 12px;
  width: 102px;
  height: 71px;
  background-size: 100% 100%;
  .box {
    position: relative;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 8;
  }
  .text {
    position: absolute;
    padding-left: 3px;
    bottom: 3px;
    left: 50%;
    transform: translateX(-50%);
    width: 94px;
    height: 17px;
    line-height: 17px;
    font-size: 8px;
    background: linear-gradient(180deg, #EEF3F5 0%, #EDF4F4 100%);
    border-radius: 2px;
    color: #000000;
    display: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    z-index: 9;
  }
}
</style>

