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
import teamApi from '@/apis/appointment';
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
    getListData() {
      const {
        query,
      } = this.$router.history.current;
      console.log('query', query)
      teamApi.getActivitySubject({id: query.id}).then((res) => {
        const {
          data,
        } = res;
        if (data && data.itemList) {
          this.list = data.itemList;
        }
      })
    },
  },
  mounted() {
    this.getListData()
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
