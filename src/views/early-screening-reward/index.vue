<template>
    <div class="main">
      <div class="banner">
        <van-image
         width="100%"
         height="227px"
         :src="getImgUrl('publicMobile/early-screening-reward/early_screening_reward.png')"
        />
      </div>
      <div class="content">
        <van-image
         width="183px"
         height="37px"
         class="free_gift"
         :src="getImgUrl('publicMobile/early-screening-reward/free_gift.png')"
        />
        <div class="time_sum">
            <p class="time" @click="showPicker">选择月份：{{searchTime}} <van-image
            width="6px"
            height="10px"
            :src="getImgUrl('publicMobile/early-screening-reward/slices.png')"
            /></p>
            <van-popup
              v-model="show"
              :lazy-render="false"
              position="bottom"
              round
            >
              <van-picker
                title="选择年月"
                show-toolbar
                :columns="columns"
                @confirm="onConfirmTime"
                @cancel="show = 0"
              />
            </van-popup>
            <p class="sum" v-if="rewardList.length">完成单数：{{finishNum}}</p>
        </div>
        <div class="award_list"  v-for="(item,index) in rewardList" :key="item.id">
          <div class="award_list_item">
            <div>
                <p class="award_serial">奖励{{{1:'一',2:'二',3:'三',4:'四',5:'五',6:'六',7:'七',8:'八'}[index+1]}}</p>
                <p class="award_name">{{item.goodsName}}</p>
            </div>
            <van-button :class="item.status?'drawSent':'draw'" :disabled="item.status?true:false" @click="receiveAward(item)">{{ {0:'领取',1:'已领取',2:'已过期'}[item.status] }}</van-button>
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
        <div class="activity_description" v-if="rewardList.length">
            <div class="title">活动说明：</div>
            <div class="explain">
              <p>1.在活动期间：2023年8月10日-2023年12月12日，每个自然月分享2个家庭/用户，并完成6人泛癌早筛下单及采血送检服务，即可获赠活动奖励大礼包；</p> 
              <p>2.奖励礼包属于自愿行为，可自愿选择和领取；</p> 
              <p>3.免费奖励红酒和《你来我网》书籍，运费自付。红酒仅限2338箱，《你来我网》仅限12120本，送完即止。</p>
            </div>
        </div>
      </div>
      <div class="footer" @click="DrawRecord()">
        查看领取记录
      </div>
    </div>
  </template>
  
  <script>
  import Vue from 'vue';
  import { Image as VanImage, Swipe, SwipeItem, Lazyload, Popup, Loading, Field, List, Dialog, Button, DatetimePicker, Picker } from 'vant';
  import { getImgUrl } from '@/utils/tools';
  import teamApi from '@/apis/early-screening-reward';
  import jsBridge from '@/utils/jsBridge';
  import { Toast } from 'vant';


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

  
  export default {
    props: {

    },
    data() {
      return {
        token: 'AQIAAAAAZfBhhBQYvhNtHTAChOtiGIH6QuRBBVTXAAjNm4k_9qhdziUE4P8dziQSe7o=',
        searchTime: '',
        show: 0,
        columns: [],
        rewardList: [],
        finishNum: 0
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
      this.init()
      document.addEventListener('visibilitychange', this.handleUnload);
    },
    methods: {
      getImgUrl,
      handleUnload(event) {
        this.init()
      },
      DrawRecord(){
        this.$router.push({
          path: '/web/draw-record',
          query: {
            _immersive: 0
          },
        });
      },
      receiveAward(item){
        if(item.type=='book'||item.type=='wine'){
          const data = {
              code: 0,
              msg: 'success',
              data: {
                url: item.actionUrl,
              }
            }
            const zero = JSON.stringify(data);
            jsBridge.callHandler(
              'router',
              zero,
            )
        }else if(item.type=='ipo'){
          const appVersion = this.$store.state.appInfo.appVersion;
          const [major, minor, patch] = appVersion.split('.').map(Number);
          if (major < 2 || (major === 2 && minor < 7) || (major === 2 && minor === 7 && patch < 12)) {
              Toast('请升级app');
          } else {
              this.findCompanyCert(item);
          }
        }else if(item.type=='vip'){
          teamApi.awardStoreVip({ objectId: item.businessId },{ token:this.token }).then(res=>{
            if(res.code==0){
              this.init()
              Toast('领取成功');
            }
          })
        }
      },
      init(){
        teamApi.getReward({ months: parseInt(this.searchTime.replace('-', '')) },{ token:this.token }).then(res=>{
          console.log('res',res)
          this.columns=res.data.map(item=>`${item.months}`.slice(0, 4) + '-' + `${item.months}`.slice(4))
          this.searchTime=this.columns[res.data.length-1]
          this.rewardList=res.data[res.data.length-1].records
          this.finishNum=res.data[res.data.length-1].finishNum
        })
      },
      showPicker(){
        this.show = 1
      },
      onConfirmTime(date) {
        this.searchTime = date
        this.show = 0;
        this.init()
      },
      findCompanyCert(item){
        if(this.token){
          const data = {
              code: 0,
              msg: 'success',
              data: {
                url: `https://www.yeahgo.com/business/loading?type=2&orderId=${item.businessId}&ext=${JSON.stringify({"businessType": "aedIpo","ipoNum": item.ipoNum,"ipoAmount": item.ipoAmount})}`,
              }
            }
            const zero = JSON.stringify(data);
            jsBridge.callHandler(
              'router',
              zero,
            )
        }
      }
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
        .award_list_item{
            display: flex;
            align-items: center;
            width: 355px;
            height: 96px;
            background: #FFF8EE;
            border-radius: 5px 5px 5px 5px;
            opacity: 1;
            border: 1px solid #FFCEBA;
            margin: 11px 0;
            padding: 0 8px;
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
    // position: fixed;
    // bottom: 0;
    // left: 0;
  }
  
  </style>