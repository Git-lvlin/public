<template>
    <div class="main">
      <div class="banner">
        <van-image
         width="100%"
         height="300px"
         :src="getImgUrl('publicMobile/general-health-service/general.png')"
        />
      </div>
      <div class="content">
        <van-image
         width="183px"
         height="37px"
         class="free_gift"
         :src="getImgUrl('publicMobile/early-screening-reward/free_gift.png')"
        />
        <div class="award_list"  v-for="(item) in rewardList" :key="item.id">
          <div class="award_list_item">
            <div>
                <p class="award_serial">{{item.awardType}}：</p>
                <p class="award_name">{{item.awardAmountDesc}}人民币的IPO股权</p>
                <p class="award_month">{{item.awardMonth}}</p>
            </div>
            <van-button :class="item.status?'draw':'drawSent'" :disabled="item.status?false:true" @click="receiveAward(item)">{{ item.statusDesc }}</van-button>
          </div>
        </div>
        <div class="no_reward" v-if="rewardList.length==0">
          <van-image
          width="300px"
          height="300px"
          :src="getImgUrl('publicMobile/early-screening-reward/backup_slices.png')"
          />
          <p>没有查到活动奖励</p>
        </div>
      </div>
      <div class="footer" @click="DrawRecord()">
        查看领取记录
      </div>
      <!-- <van-overlay :show="vipShow" @click="vipShow = false">
        <div class="equity">
          <van-image
            width="359px"
            height="306px"
            style="display: block;"
            :src="getImgUrl('publicMobile/early-screening-reward/slicess.png')"
            @click="skipVip()"
          />
          <van-image
            width="33px"
            height="33px"
            style="margin-top: 17px;"
            :src="getImgUrl('publicMobile/early-screening-reward/clonex.png')"
            @click="cloneVip()"
          />
        </div>
      </van-overlay> -->
    </div>
  </template>
  
  <script>
  import Vue from 'vue';
  import { Image as VanImage, Swipe, SwipeItem, Lazyload, Popup, Loading, Field, List, Dialog, Button, DatetimePicker, Picker, Overlay, Toast } from 'vant';
  import { getImgUrl } from '@/utils/tools';
  import teamApi from '@/apis/general-health-service';
  import jsBridge from '@/utils/jsBridge';
  import {
  goToApp,
} from '@/utils/userInfo';
import { appBaseUrl } from "@/constant/index";


  Vue.use(Field);
  Vue.use(Loading);
  Vue.use(VanImage);
  Vue.use(Swipe);
  Vue.use(SwipeItem);
  Vue.use(Lazyload);
  Vue.use(Popup);
  Vue.use(List);
  Vue.use(Button);
  Vue.use(DatetimePicker);
  Vue.use(Picker);
  Vue.use(Overlay);

  
  export default {
    props: {

    },
    data() {
      return {
        token: 'AQAAAAAAZhe81hN_mR9XMzAC9RRuYCmU7ASc0B8_ZfRIbTI9uI0anJ4S7PfvOk3Yefk=',
        rewardList: [],
        // vipShow: false
      }
    },
    components: {
      [Dialog.Component.name]: Dialog.Component,
    },
    created () {

    },
    mounted() {
      this.$bridge.callHandler('getUserInfo',{},(res) => {
        const d = JSON.parse(res)
        this.token = d.data.accessToken
        this.init()
      })
      if(!this.$store.state.appInfo.isApp){
        this.init()
      }

      document.addEventListener('visibilitychange', this.handleUnload);
    },
    methods: {
      getImgUrl,
      handleUnload(event) {
        this.init()
      },
      DrawRecord(){
        goToApp(appBaseUrl, '/web/general-draw-record', '','')
        // this.$router.push({
        //   path: '/web/general-draw-record',
        //   query: {

        //   },
        // });
      },
      init(value){
        teamApi.receivePage({  },{ token:this.token }).then(res=>{
          if(res.data.records.length){
            this.rewardList=res.data.records
          }else{
            this.rewardList=[]
          }
        })
      },
      appVersion(){
        const appVersion = this.$store.state.appInfo.appVersion;
        if(appVersion){
          const [major, minor, patch] = appVersion.split('.').map(Number);
          if (major < 2 || (major === 2 && minor < 7) || (major === 2 && minor === 7 && patch < 12)) {
            return  Toast('请升级app');
          }
        }
      },
      receiveAward(item){
        if(item.status==2){ //领取
            this.appVersion()
            teamApi.createPayOrder({ id: item.id },{ token:this.token }).then(res=>{
            if(res.code==0){
              console.log('res',res)
              const data = {
                code: 0,
                msg: 'success',
                data: {
                  url: `https://www.yeahgo.com/shopping/cashier?type=6&orderId=${res.data.orderId}&orderType=${res.data.orderType}`,
                }
              }
              const zero = JSON.stringify(data);
              jsBridge.callHandler(
                'router',
                zero,
              )
            }
          })
        }else if(item.status==3){ //签署合同
          this.appVersion()
          this.findCompanyCert(item);
        }
      },
      findCompanyCert(item){
        if(this.token){
          teamApi.getFindCert({ businessId: item.businessId },{token:this.token}).then(res=>{
              if (res.data) {
                teamApi.genContract({
                  businessId: item.businessId,
                  ext: item.ext
                },{token:this.token}).then(res => {
                  window.location.href=res.data.signUrl
                })  
              } else {
                teamApi.getVerifyUrl({
                  businessId: item.businessId,
                  ext: item.ext
                },{token:this.token}).then(res => {
                  window.location.href=res.data.verifyUrl
                })
              }
            })
          }
      },
      // skipVip(){
      //   goToApp(appBaseUrl, '/flutter/store/member/index', '','')
      //   this.vipShow=false
      // },
      // cloneVip(){
      //   this.vipShow=false
      // }
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

  .banner{
    position: absolute;
    width: 100%;
  }
  .content {
    position: relative;
    width: 100%;
    // height: 756px;
    min-height: 520px;
    padding: 0 11px;
    background-position: 0 0;
    background-repeat:no-repeat;
    background-size: 100% 430px;
    background: #FFFFFF;
    border-radius: 12px 12px 0 0;
    opacity: 1;
    margin-top: 200px;
    .free_gift{
        position: absolute;
        left: 98px;
        top: -10px;
    }
    .time_sum{
        display: flex;
        margin-top: 49px;
        justify-content: space-between;
        .time{
            font-size: 18px;
            font-family: Source Han Sans CN-Regular, Source Han Sans CN;
            font-weight: 400;
            color: #3D3D3D;
            line-height: 25px;
        }
        .sum{
            font-size: 18px;
            font-family: Source Han Sans CN-Regular, Source Han Sans CN;
            font-weight: 400;
            color: #6F6F6F;
            line-height: 25px;
        }
    }
    .award_list{
        margin-top: 48px;
        padding-bottom: 40px;
        .award_list_item{
            display: flex;
            align-items: center;
            width: 355px;
            background: #FFF8EE;
            border-radius: 5px 5px 5px 5px;
            opacity: 1;
            border: 1px solid #FFCEBA;
            margin: 11px 0;
            padding: 10px 8px;
            >div{
              width: 254px;
            }
            .award_serial{
              font-size: 18px;
              font-family: Source Han Sans CN-Medium, Source Han Sans CN;
              font-weight: 500;
              color: #5B5B5B;
              line-height: 25px;
            }
            .award_name{
              font-size: 18px;
              font-family: Source Han Sans CN-Medium, Source Han Sans CN;
              font-weight: 500;
              color: #A14A3D;
              line-height: 25px;
            }
            .award_month{
              font-size: 12px;
              font-family: Source Han Sans CN-Regular, Source Han Sans CN;
              font-weight: 400;
              color: #3D3D3D;
              line-height: 25px;
            }
            .draw{
                height: 38px;
                background: linear-gradient(138deg, #FF9C79 0%, #FF6F35 100%);
                border-radius: 6px 6px 6px 6px;
                opacity: 1;
                font-size: 20px;
                font-family: Source Han Sans CN-Bold, Source Han Sans CN;
                font-weight: 700;
                color: #FFFFFF;
                text-align: center;
                line-height: 38px;
                margin-left: 18px;
                flex-shrink: 0;
            }
            .drawSent{
                height: 38px;
                background: linear-gradient(138deg, #C1C1C1 0%, #969696 100%);
                border-radius: 6px 6px 6px 6px;
                opacity: 1;
                font-size: 20px;
                font-family: Source Han Sans CN-Bold, Source Han Sans CN;
                font-weight: 700;
                color: #FFFFFF;
                text-align: center;
                line-height: 38px;
                margin-left: 18px;
                flex-shrink: 0;
            }
        }
        .award_list_item:nth-child(1){
            margin-top: 22px;
        }
    }
    .activity_description{
        margin-top: 24px;
        padding-bottom: 36px;
        .title{
            font-size: 16px;
            font-family: Source Han Sans CN-Bold, Source Han Sans CN;
            font-weight: 700;
            color: #333333;
            line-height: 25px;
        }
        .explain{
            font-size: 11px;
            font-family: Source Han Sans CN-Bold, Source Han Sans CN;
            color: #6F6F6F;
            line-height: 25px;
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
  }
  .footer{
    width: 375px;
    height: 64px;
    background: #FFF8EE;
    border-radius: 0px 0px 0px 0px;
    opacity: 1;
    font-size: 18px;
    font-family: Source Han Sans CN-Medium, Source Han Sans CN;
    font-weight: 500;
    color: #3D3D3D;
    line-height: 64px;
    text-align: center;
    position: fixed;
    bottom: 0;
    left: 0;
  }

  .equity{
    margin: 200px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  </style>