<template>
  <div class="sincerely-recruiting-operators"
    :style="`background-image:url(${getImgUrl('publicMobile/sincerely-recruiting-operators/bg2.png')})`">
    <div class="btn" @click="share">
      立即分享给好友
    </div>
  </div>
</template>

<script>
import { getImgUrl } from '@/utils/tools';

export default {
  methods: {
    getImgUrl,
    share() {
      this.$bridge.callHandler('share', { "code": 0, "msg": "success", "data": { "contentType": 20, "paramId": 21, "shareType": 1, "sourceType": 1 } });
    },
  },
};
</script>

<style lang="scss" scoped>
.sincerely-recruiting-operators {
  min-height: 100vh;
  background-size: 100%;
  background-repeat: no-repeat;
  background-position-y: -55px;
  padding-top: 640px;
  padding-bottom: 100px;

  .btn {
    width: 225px;
    line-height: 36px;
    background: #E5352F;
    border-radius: 18px 18px 18px 18px;
    font-size: 12px;
    color: #FFFFFF;
    margin: 0 auto;
    text-align: center;
  }
}
</style>
