<template>
  <div class="my-prize">
    <div class="list-box">
      <prize
        v-for="item in prizeList"
        :key="item.id"
        :good="item"
      />
    </div>
  </div>
</template>

<script>
import { getImgUrl } from '@/utils/tools';
import prize from './components/prize';
import teamApi from '@/apis/bindbox';
export default {
  data() {
    return {
      prizeList: [],
      token: null,
    };
  },
  components: {
    prize,
  },
  async created () {
    await this.getUserInfo()
    this.init()
  },
  methods: {
    getImgUrl,
    timestampToTime(timestamp) {
      var date = new Date(timestamp*1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '.';
      var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '.';
      var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
      var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
      var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes());
      strDate = Y+M+D+h+m;
      return strDate;
    },
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
        if(res.code === 0) {
          this.prizeList = res.data.records.map((item) => {
            item.createTime = this.timestampToTime(item.createTime)
            item.expireTime = this.timestampToTime(item.expireTime)
            return item
          })
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
