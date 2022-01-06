<template>
  <div class="nodata" :style="`padding-top: ${top}px`">
    <div class="nodata_item" >
      <img class="img" :src="imgObj[icon || 'content'].img" />
      <div class="title">{{!!title ? title : imgObj[icon || 'content'].title}}</div>
    </div>
  </div>
</template>

<script>
import { getImgUrl } from '@/utils/tools';
import { NODATA_LIST } from '@/constant/index';

export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: "content"
    },
    top: {
      type: Number,
      default: 90
    },
  },
  data() {
    return {
      imgObj: NODATA_LIST,
    };
  },
  methods: {
    getImgUrl,
  }
};
</script>

<style lang="scss" scoped>
  .nodata_item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .img {
    width: 160px;
    height: 160px;
  }

  .title {
    font-size: 14px;
    color: #999;
    margin-top: 8px;
    line-height: 20px;
  }
</style>
