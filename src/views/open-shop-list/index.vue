<template>
  <div class="invitation-list">
    <div class="title-box">
      <div>注册手机号</div>
      <div>绑定状态</div>
      <div>开店状态</div>
      <div>开店时间</div>
    </div>
    <div class="item" v-for="(item, index) in listData" v-bind:key="index">
      <div>{{item.mobile}}</div>
      <div>{{item.inviteStatus==1?'已绑定':'未绑定'}}</div>
      <div>{{item.status?'已开店':'未开店'}}</div>
      <div>{{item.createTime}}</div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Image as VanImage, Dialog, Lazyload } from 'vant';
import { getImgUrl } from '@/utils/tools';
import teamApi from '@/apis/fivestar';

Vue.use(VanImage);
Vue.use(Lazyload);
export default {
  data() {
    return {
      token: null,
      listData: []
    };
  },
  components: {
    [Dialog.Component.name]: Dialog.Component,
  },
  async created () {
    await this.getUserInfo()
    this.getList()
  },
  methods: {
    getImgUrl,
    timestampToTime(timestamp) {
      if (!timestamp) {
        return ''
      }
      var date = new Date(timestamp*1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '/';
      var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '/';
      var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
      return Y+M+D;
    },
    getList() {
      teamApi.getInventstoreList({page:1,size:99}, {token:this.token}).then((res) => {
        this.listData = res.data.records.map(item => {
          return {
            ...item,
            createTime: this.timestampToTime(item.createTime)
          }
        })
      })
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
  },
};
</script>

<style lang="scss" scoped>
  .invitation-list {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color:#F5F5F5;
    position: relative;
  }
  .title-box {
    width: 100%;
    height: 43px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(216, 0, 16, .59);
    div {
      text-align: center;
      width: 88px;
      height: 20px;
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #FFFFFF;
      line-height: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 40px;
    div {
      text-align: center;
      width: 88px;
      height: 17px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 17px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .item:nth-child(odd) {
    background: rgba(231,103,113, .08);
  }
</style>
