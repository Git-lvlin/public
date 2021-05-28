<template>
  <van-tabbar
    class="tabbar"
    :value="active"
    active-color="#f50c0c"
    inactive-color="#858585"
    :placeholder="true"
  >
    <van-tabbar-item
      v-for="item in tabbarData"
      :to="item.to"
      :name="item.pathName"
      :key="item.name"
    >
      <span>{{item.name}}</span>
      <template #icon="{active}">
        <img :src="active? item.selectedImgUrl: item.normalImgUrl" />
      </template>
    </van-tabbar-item>

  </van-tabbar>
</template>
<script>
import { Tabbar, TabbarItem } from 'vant';

export default {
  data() {
    return {
      tabbarData: [
        {
          name: '首页',
          to: '/',
          pathName: 'Home',
          selectedImgUrl:
            'https://bingou.com.cn/static/h5/img/tab_resource_selected.png',
          normalImgUrl:
            'https://bingou.com.cn/static/h5/img/tab_resource_normal.png',
        },
        {
          name: '分类',
          to: '/category',
          pathName: 'Category',
          selectedImgUrl:
            'https://bingou.com.cn/static/h5/img/tab_classify_selected.png',
          normalImgUrl:
            'https://bingou.com.cn/static/h5/img/tab_classify_normal.png',
        },
        {
          name: '购物车',
          to: '/shoppingcart',
          pathName: 'ShoppingCart',
          selectedImgUrl:
            'https://bingou.com.cn/static/h5/img/tab_shopping_selected.png',
          normalImgUrl:
            'https://bingou.com.cn/static/h5/img/tab_shopping_normal.png',
        },
        {
          name: '我的',
          to: '/member',
          pathName: 'Member',
          selectedImgUrl:
            'https://bingou.com.cn/static/h5/img/tab_my_selected.png',
          normalImgUrl: 'https://bingou.com.cn/static/h5/img/tab_my_normal.png',
        },
      ],
    };
  },
  computed: {
    active() {
      return this.$route.name;
    },
  },
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
  },
};
</script>
<style lang="scss" scoped>
.tabbar {
}
</style>
