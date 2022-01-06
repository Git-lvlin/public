<template>
  <div class="join-box" id="openAppBox">
    <div :class="listClass">
      <div class="join-item" v-for="item in prizeWinMsg" :key="item">
        <van-image round custom-class="avatar" width="19" height="19" :src="item.icon" />
        <div class="user-name" >{{item.msg}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Image } from 'vant';
import { getImgUrl } from '@/utils/tools';

export default {
  props: {
    prizeWinMsg: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      // prizeWinMsg: [{
      //   avatar: getImgUrl('publicMobile/common/defaultIcon.png'),
      //   name: '莫本溪***',
      //   text: '获得888元'
      // }, {
      //   avatar: getImgUrl('publicMobile/common/defaultIcon.png'),
      //   name: '莫本溪***',
      //   text: '获取888元'
      // }, {
      //   avatar: getImgUrl('publicMobile/common/defaultIcon.png'),
      //   name: '莫本溪***',
      //   text: '获取888元'
      // }, {
      //   avatar: getImgUrl('publicMobile/common/defaultIcon.png'),
      //   name: '莫本溪***',
      //   text: '获取888元'
      // }, {
      //   avatar: getImgUrl('publicMobile/common/defaultIcon.png'),
      //   name: '莫本溪***',
      //   text: '获取888元'
      // }, {
      //   avatar: getImgUrl('publicMobile/common/defaultIcon.png'),
      //   name: '莫本溪***',
      //   text: '获取888元'
      // }],
      listClass: {
        "join-list": true,
        transition: true,
        "transform-100": false,
        "transform-0": false,
      }
    };
  },
  components: {
    Image,
  },
  mounted () {
  },
  methods: {
    getImgUrl,
  },
};
</script>

<style lang="scss" scoped>
  .join-box {
    position: relative;
    z-index: 5;
    width: 100%;
    height: 32px;
    overflow: hidden;
    // background-color: rgba($color: #ff0000, $alpha: 0.5);
  }
  
  @keyframes translateAnimate {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
  .join-list {
    position: absolute;
    display: flex;
    align-items: center;
    animation: translateAnimate 24s linear infinite;
  } 

  .transition {
    transition: translate 5s;
  }
  
  .transform-100 {
    transform: translateX(-100);
  }
  
  .transform-0 {
    transform: translateX(0);
  }

  .join-item {
    padding-left: 2px;
    margin-right: 13px;
    display: flex;
    align-items: center;
    width: 141px;
    height: 23px;
    border-radius: 14px;
    background: rgba(0, 0, 0, 0.35);
    overflow: hidden;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
  }

  .avatar {
    flex-grow: 0;
    flex-shrink: 0;
  }

  .user-name {
    white-space: nowrap;
    padding-left: 2px;
  }


</style>
