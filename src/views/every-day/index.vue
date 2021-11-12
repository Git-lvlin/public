<template>
  <div class="main">
    <div class="content"
      :style="{
        'background-image': `url('${getImgUrl('publicMobile/everyday/everyday-bg.png')}')`
      }"
    >
      <div class="act-box" @click="popupSwitch"></div>
      <div class="btn">
        <div class="text">规则</div>
      </div>
      <div class="top-box">
        <div class="title-box">
          <p class="title">每日红包</p>
        </div>
        <p class="subtitle">每日首单领红包,天天连续红包金额更大哦~</p>
        <div class="reds-box">
          <div class="red-box" :class="item.status?'index':''" v-for="(item, index) in redBoxData" :key="index">
            <p class="p1" v-if="!item.status">{{item.name}}</p>
            <p class="p1 p-index" v-else>{{item.name}}</p>
            <van-image
              class="center-icon"
              width="24px"
              height="24px"
              :src="item.src"
            />
            <p class="p2">{{item.text}}</p>
          </div>
          <van-image
            class="last-red-box"
            width="73px"
            height="86px"
            :src="lastBoxImg"
          />
        </div>
      </div>
      <div class="list-box">
        <van-list
          v-if="list.length"
          v-model="loading"
          offset=0
          :immediate-check="false"
          :finished="finished"
          finished-text="没有更多了"
          @load="onBottomReach"
        >
          <list v-for="item in list" :key="item" :good="item" :inviteCode="inviteCode" :hasToken="token"/>
        </van-list>
      </div>
    </div>
    <!-- 活动规则弹窗 -->
    <van-popup
      v-model="show"
      closeable
      position="bottom"
      round
      :style="{ height: '506px' }"
    >
      <div class="rule-div">
        <div class="title">活动规则</div>
        <textarea class="content" readonly v-model="ruleText"></textarea>
      </div>
    </van-popup>
  </div>
</template>

<script>
import Vue from 'vue';
import { Image as VanImage, Swipe, SwipeItem, Lazyload, Popup, Loading, Field, List } from 'vant';
import { getImgUrl } from '@/utils/tools';
import list from './components/list';
import teamApi from '@/apis/everyday';
import {
  goToApp,
  setNavigationBar,
} from '@/utils/userInfo';
Vue.use(Field);
Vue.use(Loading);
Vue.use(VanImage);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload);
Vue.use(Popup);
Vue.use(List);

export default {
  props: {
    list: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: true,
      totalPage: 1,
      page: 1,
      size: 5,
      lastBoxImg: getImgUrl('publicMobile/everyday/red.png'),
      redBoxData: [
        {
          name: '第一天',
          src: getImgUrl('publicMobile/everyday/yellow.png'),
          text: '1元',
          status: 0,
        },
        {
          name: '第二天',
          src: getImgUrl('publicMobile/everyday/yellow.png'),
          text: '2元',
          status: 0,
        },
        {
          name: '第三天',
          src: getImgUrl('publicMobile/everyday/yellow.png'),
          text: '3元',
          status: 0,
        }
      ],
      show: false,
      indexData: null,
      token: null,
      ruleText: null,
      inviteCode: '',
    }
  },
  components: {
    list,
  },
  async created () {
    const rightButton = {
      type: 'share',
      data: {
        contentType: 8,
        paramId: 10,
        shareType: 3,
        sourceType: 8,
      }
    };
    const titleLabel = {
      titleLabelColor: '', // 暂时不会传
      font: '', // 暂时不会传
      text: '', // 默认documenttitle
    };
    setNavigationBar('#FFFFFF', rightButton, titleLabel);
    await this.getUserInfo()
    this.getIndex()
  },
  mounted() {
    const {
      query,
    } = this.$router.history.current;
    if (query && query.inviteCode) {
      this.inviteCode = query.inviteCode
    }
    this.getListData()
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
    getIndex() {
      teamApi.getIndex({},{token:this.token}).then((res) => {
        this.indexData = res.data
        const {
          activityRule,
          firstDayAmount,
          secondDayAmount,
          thirdDayAmount,
          todayLqStatus,
          firstDayStatus,
          secondDayStatus,
          thirdDayStatus,
        } = this.indexData

        this.ruleText = activityRule

        if (firstDayStatus) {
          this.redBoxData[0].status = 1
          this.redBoxData[0].text = '已下单'
          this.redBoxData[0].src = getImgUrl('publicMobile/everyday/ed-yellow.png')
        } else {
          this.redBoxData[0].text = firstDayAmount/100 + '元'
        }
        if (secondDayStatus) {
          this.redBoxData[1].status = 1
          this.redBoxData[1].text = '已下单'
          this.redBoxData[1].src = getImgUrl('publicMobile/everyday/ed-yellow.png')
        } else {
          this.redBoxData[1].text = secondDayAmount/100 + '元'
        }
        if (thirdDayStatus) {
          this.redBoxData[2].status = 1
          this.redBoxData[2].text = '已下单'
          this.redBoxData[2].src = getImgUrl('publicMobile/everyday/ed-yellow.png')
        } else {
          this.redBoxData[2].text = thirdDayAmount/100 + '元'
        }

        switch(todayLqStatus) {
          case 0:
            this.lastBoxImg = getImgUrl('publicMobile/everyday/red.png');
            break
          case 1:
            this.lastBoxImg = getImgUrl('publicMobile/everyday/red-ed.png');
            break
          case 2:
            this.lastBoxImg = getImgUrl('publicMobile/everyday/red-end.png');
            break
        }
      })
    },
    popupSwitch() {
      this.show = true
    },
    onBottomReach() {
    },
    getListData() {
      this.loading = true;
      teamApi.getList().then((res) => {
        const {
          data,
        } = res;
        if (data && data.goodsList) {
          this.list = data.goodsList;
        }
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      });
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
.content {
  position: relative;
  width: 100%;
  min-height: 430px;
  background-position: 0 0;
  background-repeat:no-repeat;
  background-size: 100% 430px;
  .act-box {
    position: absolute;
    top: 100px;
    right: 0;
    width: 36px;
    height: 47px;
    z-index: 99;
  }
  .btn {
    position: absolute;
    top: 111px;
    right: 0;
    width: 18px;
    height: 36px;
    background: linear-gradient(180deg, #ED773E 0%, #EA3E2B 23%, #E33628 100%);
    border-radius: 4px 0px 0px 4px;
    border: 1px solid #FFFFFF;
    border-right: none;
    display: flex;
    justify-content: center;
    align-items: center;
    .text {
      width: 11px;
      height: 26px;
      font-size: 12px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #FFFFFF;
      line-height: 13px;
    }
  }
  .top-box {
    margin: 0 auto;
    margin-top: 164px;
    width: 351px;
    height: 176px;
    background: #FFFFFF;
    border-radius: 12px;
    overflow: hidden;
    .title-box {
      width: 100%;
      height: 32px;
      background: linear-gradient(90deg, #F6F0F0 0%, #FFFFFF 100%);
      .title {
        text-align: center;
        width: 92px;
        height: 32px;
        background: linear-gradient(90deg, #EC6A4D 0%, #EC6B4E 100%);
        font-size: 17px;
        font-family: HuXiaoBo-NanShen, HuXiaoBo;
        font-weight: normal;
        color: #FEFADD;
        line-height: 32px;
        letter-spacing: 1px;
        border-bottom-right-radius:1em;
      }
    }
    .subtitle {
      margin: 11px 0;
      padding-left: 16px;
      height: 20px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      line-height: 20px;
      text-align: left;
    }
    .reds-box {
      display: flex;
      justify-content: center;
      .index {
        background: rgba(229, 53, 47, 0.1) !important;
        border: 1px solid #E5352F;
      }
      .red-box {
        margin-right: 10px;
        width: 73px;
        height: 86px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: #F5F5F5;
        border-radius: 8px;
        .p1 {
          font-size: 15px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #333333;
          line-height: 21px;
          letter-spacing: 2px;
        }
        .p-index {
          color: #E5352F;
        }
        .center-icon {
          margin-top: 4px;
          margin-bottom: 6px;
        }
        .p2 {
          font-size: 13px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #E63A29;
          line-height: 18px;
          letter-spacing: 2px;
        }
      }
      .last-red-box {
        margin: 0;
      }
    }
  }
  .list-box {
    padding: 0 12px;
    margin-top: 12px;
  }

}
.rule-div {
  width: 100%;
  height: 482px;
  overflow: hidden;
  .title {
    padding-top: 24px;
    padding-bottom: 32px;
    height: 26px;
    font-size: 19px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 26px;
    text-align: center;
  }
  .content {
    width: 100%;
    height: 440px;
    border: none;
    padding: 32px 16px 50px 16px;
    text-align: justify;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #666666;
    line-height: 22px;
    overflow: hidden;
    overflow-y: auto;
  }
}
</style>