<template>
  <div class="my-prize">
    <div class="list-box">
      <list
        v-for="item in prizeList"
        :key="item.id"
        :good="item"
      />
    </div>
  </div>
</template>

<script>
import { getImgUrl } from '@/utils/tools';
import { list } from './components/list';
import teamApi from '@/apis/bindbox';

export default {
  data() {
    return {
      prizeList: [],
      token: null,
    };
  },
  components: {
    list,
  },
  async created () {
    console.log("created")
    await this.getUserInfo()
    this.init()
    console.log("inited")
  },
  methods: {
    getImgUrl,
    getUserInfo() {
      return new Promise((resolve) => {
        this.$bridge.callHandler('getUserInfo',{},(res) => {
          const d = JSON.parse(res)
          this.token = d.data.accessToken
          resolve()
        })
      })
    },
    init() {
      teamApi.getPrizeList({size:100,next:0}, {token: this.token}).then((res) => {
        console.log('res', res)
        if(res.code === 0) {
          this.prizeList = res.data.records
        }
      })
    }
  },
  mounted() {
  }
};
</script>

<style lang="scss" scoped>
.my-prize {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #F5F5F5;
}
.list-box {
  padding: 12px;
}
</style>
