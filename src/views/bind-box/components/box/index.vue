<template>
  <div :class="'lead-box-item '+'index'+good.id" @click="selectBox(good.id)">
    <van-image class="img all" width="90px" height="90px" :src="getImgUrl('publicMobile/bindbox/box.png')" />
    <van-image class="img" :class="random==good.id&&!good.in?'out':''" width="90px" height="90px" :src="getImgUrl('publicMobile/bindbox/center-box.png')" />
    <van-image class="img other" :class="indexBox==good.id?'in':''" width="92px" height="92px" :src="getImgUrl('publicMobile/bindbox/selected.png')" />
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
    random: {
      type: Number,
      default: 5,
    },
  },
  data() {
    return {
      indexBox: 0,
    }
  },
  updated() {

  },
  methods: {
    getImgUrl,
    selectBox(id) {
      let other = document.querySelectorAll('.other')
      const indexId = id
      other.forEach((item, index)=> {
        if (index+1 !== indexId) {
          item.classList.remove('in')
        } else {
          item.classList.add('in')
        }
      })
      this.indexBox = indexId
      this.$emit('selectBox', this.indexBox)
    }
  },

}
</script>

<style lang="scss" scoped>
.lead-box-item {
  position: relative;
  width: 90px;
  height: 90px;
  .img {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
  }
  .out {
    opacity: 1;
  }
  .all {
    opacity: 1;
  }
  .in {
    opacity: 1;
  }
}
.index1,
.index2,
.index4,
.index5,
.index7,
.index8 {
  margin-right: 8px;
}
.index1,
.index2,
.index3,
.index4,
.index5,
.index6 {
  margin-bottom: 8px;
}
</style>

