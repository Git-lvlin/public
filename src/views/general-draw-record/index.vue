<template>
    <div class="main">
        <div class="award_head">
            <div class="cost">IPO累计价值：<span>{{ totalAwardAmount/100 }}元</span></div>
            <van-dropdown-menu>
              <van-dropdown-item v-model="value" :options="option" />
            </van-dropdown-menu>
        </div>
        <div class="divider"></div>
        <div class="award_list" v-for="item in rewardList" :key="item.id">
            <div class="award_list_item">
                <div class="award_list_title">
                  <p class="award_name">{{item.title}}</p>
                  <van-button v-if="item.contractId" class="draw"  @click="receiveAward(item)">查看合同</van-button>
                </div>
                <p class="award_time">{{item.subTitle}}</p>
              
            </div>
            <div class="divider"></div>
        </div>
        <div class="no_reward" v-if="rewardList.length==0">
          <van-image
          width="300px"
          height="300px"
          :src="getImgUrl('publicMobile/early-screening-reward/backup_slices.png')"
          />
          <p>没有查到领取记录</p>
        </div>
    </div>
  </template>
  
  <script>
  import Vue from 'vue';
  import { Image as VanImage, Swipe, SwipeItem, Lazyload, Popup, Loading, Field, List, Dialog, Divider,DropdownMenu, DropdownItem } from 'vant';
  import { getImgUrl } from '@/utils/tools';
  import teamApi from '@/apis/general-health-service';
  Vue.use(Field);
  Vue.use(Loading);
  Vue.use(VanImage);
  Vue.use(Swipe);
  Vue.use(SwipeItem);
  Vue.use(Lazyload);
  Vue.use(Popup);
  Vue.use(List);
  Vue.use(Divider);
  Vue.use(DropdownMenu);
  Vue.use(DropdownItem);

  
  export default {
    props: {

    },
    data() {
      return {
        rewardList:[],
        option: [
          { text: '全部', value: '' },
          { text: '泛癌早筛', value: 'screen' },
          { text: '大健康服务', value: 'provider' },
        ],
        value: '',
        token: 'AQIAAAAAZh_9nBQYvhNtHTACSlcqswhJLP9My1C4GpHbh34Zff6IuMEcPf6evju7JEU=',
        totalAwardAmount: 0
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
        this.init()
      })
      this.init()
    },
    methods: {
      getImgUrl,
      receiveAward(item){
        window.location.href=item.contractUrl
      },
      init(value){
        teamApi.awardList({ size:9999, businessType: value },{ token:this.token }).then(res=>{
          if(res.code==0){
            this.rewardList=res.data.records
          }
        })
        teamApi.awardCounts({ businessType: value },{ token:this.token }).then(res=>{
          if(res.code==0){
            this.totalAwardAmount=res.data.amount
          }
        })
      }
    },
    watch: {
      value(value) {
        this.init(value)
      },
    }
  }
  
  </script>
  
  
  <style lang="scss" scoped>
  .main {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color:#FFFFFF;
  }
  .award_head{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 17px;
    .cost{
      font-size: 14px;
      font-family: Source Han Sans CN-Bold, Source Han Sans CN;
      font-weight: 700;
      color: #000000;
      line-height: 25px;
      span{
        color: #FF0000;
      }
    }
  }
  .divider{
    width: 375px;
    height: 0px;
    opacity: 1;
    border: 1px solid #D8D8D8;
  }
  .award_list{
    .award_list_item{
      // padding: 13px 17px 13px 17px;
      .award_list_title{
        display: flex;
      justify-content: space-between;
      // align-items: center;
      }
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
        padding: 0 10px;
      }
    }
    .divider{
        width: 375px;
        height: 0px;
        opacity: 1;
        border: 1px solid #D8D8D8;
      }
  }
  .no_reward{
       margin: 0 30px 200px 30px;
       position: relative;
       p{
        position: absolute;
        left: 85px;
        bottom: 10px;
        color: #6F6F6F;
       }
    }
  </style>

<style>
   .van-dropdown-menu__bar{
    box-shadow: none !important;
  }
  .van-dropdown-menu__title{
    color: #6A6A6A;
  }
</style>