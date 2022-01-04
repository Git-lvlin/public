<template>
  <div class="join-box" id="openAppBox">
    <div :class="listClass">
      <div class="join-item" v-for="item in userList" key="item">
        <van-image custom-class="avatar" width="20" height="20" :src="item.avatar" />
        <div class="user-name" >{{item.name}}{{item.text}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Image } from 'vant';
import { getImgUrl } from '@/utils/tools';

export default {
  data() {
    return {
      userList: [{
        avatar: getImgUrl('publicMobile/common/defaultIcon.png'),
        name: '莫本溪阿萨',
        text: '获取水电费改成'
      }, {
        avatar: getImgUrl('publicMobile/common/defaultIcon.png'),
        name: '阿萨姆波哥',
        text: '获取一元'
      }, {
        avatar: getImgUrl('publicMobile/common/defaultIcon.png'),
        name: '哈尔德',
        text: '获取XXXXXXX'
      }, {
        avatar: getImgUrl('publicMobile/common/defaultIcon.png'),
        name: '莫本溪阿萨',
        text: '获取水电费改成'
      }, {
        avatar: getImgUrl('publicMobile/common/defaultIcon.png'),
        name: '阿萨姆波哥',
        text: '获取一元'
      }, {
        avatar: getImgUrl('publicMobile/common/defaultIcon.png'),
        name: '哈尔德',
        text: '获取XXXXXXX'
      }],
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
    background-color: rgba($color: #ff0000, $alpha: 0.5);
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
    animation: translateAnimate 8s linear infinite;
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
    display: flex;
    align-items: center;
  }

  .avatar {
    flex-grow: 0;
    flex-shrink: 0;
  }

  .user-name {
    white-space: nowrap;
  }


</style>
