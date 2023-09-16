<template>
    <div class="main">
        <van-image
          class="guidance"
          :src="getImgUrl('publicMobile/live-pull-stream/background.png')"
        />
    </div>
  </template>
  
  <script>
  import Vue from 'vue';
  import { Image as VanImage } from 'vant';
  import { getImgUrl } from '@/utils/tools';


  Vue.use(VanImage);

  
  export default {
    props: {

    },
    data() {
      return {
      }
    },
    components: {
    
    },
    created () {

    },
    mounted() {
    },
    methods: {
        getImgUrl
    },
  }
  
  </script>
  
  
  <style lang="scss" scoped>
  .main {
    min-height: 100vh;
    background-color:#ffffff;
    overflow: hidden;
    .guidance{
        width: 100%;
    }
  }

  
  </style>