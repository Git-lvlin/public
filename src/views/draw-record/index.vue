<template>
    <div class="main">
        <div class="award_list" v-for="item in rewardList" :key="item.id">
            <div class="award_list_item">
                <div>
                  <p class="award_name">{{item.goodsName}}</p>
                  <p class="award_time">奖励所属月份:{{`${item.months}`.slice(0, 4) + '-' + `${item.months}`.slice(4)}}</p>
                </div>
                <van-button v-if="item.businessId" class="draw"  @click="receiveAward(item)">查看合同</van-button>
            </div>
            <div class="divider"></div>
        </div>
    </div>
  </template>
  
  <script>
  import Vue from 'vue';
  import { Image as VanImage, Swipe, SwipeItem, Lazyload, Popup, Loading, Field, List, Dialog, Divider } from 'vant';
  import { getImgUrl } from '@/utils/tools';
  import teamApi from '@/apis/early-screening-reward';
  Vue.use(Field);
  Vue.use(Loading);
  Vue.use(VanImage);
  Vue.use(Swipe);
  Vue.use(SwipeItem);
  Vue.use(Lazyload);
  Vue.use(Popup);
  Vue.use(List);
  Vue.use(Divider);

  
  export default {
    props: {

    },
    data() {
      return {
        token: 'AQQAAAAAZe3CXBOGBxXwKYAC71eh9gFz8g8WS3uG-oK7ZvAMoa3fO3b0dCzKLkPIQZQ=',
        rewardList:[]
      }
    },
    components: {
      [Dialog.Component.name]: Dialog.Component,
    },
    async created () {

    },
    mounted() {
      this.$bridge.callHandler('getUserInfo',{},(res) => {
        const d = JSON.parse(res)
        this.token = d.data.accessToken
      })
      teamApi.rewardList({},{ token:this.token }).then(res=>{
        if(res.code==0){
          this.rewardList=res.data.records
        }
      })
    },
    methods: {
      getImgUrl,
      receiveAward(item){

      },
    },
  }
  
  </script>
  
  
  <style lang="scss" scoped>
  .main {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color:#f5f5f5;
  }

  .award_list{
    .award_list_item{
      // padding: 13px 17px 13px 17px;
      display: flex;
      justify-content: space-between;
      // align-items: center;
      .award_name{
        padding: 13px 17px 5px 17px;
        font-size: 18px;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #333333;
        line-height: 25px;
      }
      .award_time{
        padding: 0 17px 13px 17px;
        font-size: 12px;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #666666;
        line-height: 25px;
      }
      .draw{
        height: 38px;
        width: 72px;
        text-align: center;
        background: linear-gradient(138deg, #FF9C79 0%, #FF6F35 100%);
        border-radius: 6px 6px 6px 6px;
        opacity: 1;
        font-size: 14px;
        font-family: Source Han Sans CN-Bold, Source Han Sans CN;
        font-weight: 700;
        color: #FFFFFF;
        line-height: 38px;
        flex-shrink: 0;
        margin: 10px 20px 0 0;
      }
    }
    .divider{
        width: 375px;
        height: 0px;
        opacity: 1;
        border: 1px solid #D8D8D8;
      }
  }
  </style>