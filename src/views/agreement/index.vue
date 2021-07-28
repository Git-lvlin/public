<template>
  <div class="box">
    <div v-if="reg==='user'">
      <user0 v-if="index==0" />
      <user1 v-if="index==1" />
    </div>
    <div v-if="reg==='store'">
      <store0 v-if="index==0" />
      <store1 v-if="index==1" />
      <store2 v-if="index==2" />
      <store3 v-if="index==3" />
    </div>
    <div v-if="reg==='business'">
      <business0 v-if="index==0" />
      <business1 v-if="index==1" />
      <business2 v-if="index==2" />
      <business3 v-if="index==3" />
      <business4 v-if="index==4" />
      <business5 v-if="index==5" />
      <business6 v-if="index==6" />
      <business7 v-if="index==7" />
    </div>
  </div>
</template>

<script>
import user0 from './components/user/0.vue';
import user1 from './components/user/1.vue';

import store0 from './components/store/0.vue';
import store1 from './components/store/1.vue';
import store2 from './components/store/2.vue';
import store3 from './components/store/3.vue';

import business0 from './components/business/0.vue';
import business1 from './components/business/1.vue';
import business2 from './components/business/2.vue';
import business3 from './components/business/3.vue';
import business4 from './components/business/4.vue';
import business5 from './components/business/5.vue';
import business6 from './components/business/6.vue';
import business7 from './components/business/7.vue';

const pdfNameMap = {
  business: [
    '诚信经营承诺书-商家通用-入驻签署1.0',
    '危险物品合规承诺书-商家通用-入驻签署1.0',
    '消费者保障规则-商家通用-入驻阅读1.0',
    '约购平台保证金管理规则-商家通用1.0',
    '约购平台商家入驻服务协议1.0',
    '约购平台商品退换货规则-商家通用-入驻阅读1.0',
    '约购平台自营店发货规则1.0',
    '约购平台自营店卖家服务须知-自营店卖家后台查阅1.0',
  ],
  store: [
    '约购平台发货规则-社区店和自营店1.0',
    '约购平台集约模式规则说明1.0',
    '约购平台商品退换货规则-通用1.0',
    '约购平台社区店服务须知1.0',
  ],
  user: [
    '约购平台个人信息保护及隐私权政策1.0',
    '约购平台用户服务协议1.0',
  ],
}
export default {
  data() {
    return {
      reg: null,
      index: null,
    };
  },
  components: {
    user0,
    user1,
    store0,
    store1,
    store2,
    store3,
    business0,
    business1,
    business2,
    business3,
    business4,
    business5,
    business6,
    business7,
  },
  created () {

  },
  methods: {
    getData() {
      const {
        query,
      } = this.$router.history.current;
      console.log('query', query);
      this.reg = query.reg || 'user';
      this.index = query.index || 0;
    }
  },
  mounted() {
    this.getData()
  }
};
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color:#ffffff; 
  padding: 10px 10px;
}
strong {
  text-align: center;
  padding-bottom: 20px;
}
p {
  text-indent:2em;
}
</style>