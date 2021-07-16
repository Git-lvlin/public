<template>
  <div class="store-in">
    <list v-for="item in list" :key="item" :good="item" />
  </div>
</template>

<script>
import Vue from 'vue';
import { Image as VanImage } from 'vant';
import { getImgUrl } from '@/utils/tools';
import List from './components/list';
Vue.use(VanImage);
export default {
  props: {
    list: {
      type: Array,
      default: []
    },
  },
  data() {
    return {
      list: []
    };
  },
  components: {
    List,
  },
  created () {
  },
  methods: {
    getImgUrl,
  },
  mounted() {

  },
};
</script>

<style lang="scss" scoped>
  .store-in {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
</style>
