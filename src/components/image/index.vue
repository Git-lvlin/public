<template>
  <div class="van_img" :style="{'width': width, 'height': height}">
    <van-image
      :width="width"
      :height="height"
      :fit="fit"
      :round="round"
      :lazy-load="lazyload"
      :src="src"
      :error-icon="defaultIcon"
    />
  </div>
</template>

<script>
import { Image } from 'vant';
import { getImgUrl } from '@/utils/tools';

const defaultImg = getImgUrl('publicMobile/common/default.png');
const defaultIcon = getImgUrl('publicMobile/common/defaultIcon.png');

export default {
  props: {
    width: {
      type: String,
      default: '100px',
    },
    height: {
      type: String,
      default: '100px',
    },
    fit: {
      type: String,
      default: 'cover',
    },
    lazyload: {
      type: Boolean,
      default: false,
    },
    src: {
      type: String,
      default: defaultImg,
    },
    round: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      imgError: false,
      defaultImg,
      defaultIcon,
    };
  },
  components: {
    [Image.name]: Image,
  },
  methods: {
    handleImgError() {
      this.imgError = true;
    },
  },
};
</script>

<style>
.van_img {
  overflow: hidden;
}
</style>
