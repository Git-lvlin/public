<template>
  <div class="history-box">
    <div class="bar-list">
      <div :class="`bar-item ${actType == 1 ? 'bar-act' : ''}`" @click="onChangeBar(1)">获得机会</div>
      <div :class="`bar-item ${actType == 2 ? 'bar-act' : ''}`" @click="onChangeBar(2)">我的红包奖励</div>
    </div>

    <div class="history-content">
      <!-- 获得机会 -->
      <div class="opportunity-content" v-if="actType == 1">
        <div class="flex_middle opportunity-time" @click="showDate = true">
          2020年11月
          <div class="tap-bottom" />
        </div>

        <div class="opportunity-list">
          <div class="flex_between list-item">
            <div class="list-info">
              <div>邀请188****8888新用户注册</div>
              <div class="list-info-time">2021-01-01 10:00:00</div>
            </div>
            <div class="list-num">游戏机会+1</div>
          </div>
          <div class="no-more">暂无更多~</div>
        </div>

        <Popup
          v-model="showDate"
          position="bottom"
        >
          <DatetimePicker
            v-model="currentDate"
            type="year-month"
            title="选择年月"
            :min-date="minDate"
            :max-date="maxDate"
            :formatter="formatter"
            @confirm="onConfirmTime"
            @cancel="showDate = false"
          />
        </Popup>
      </div>

      <!-- 红包奖励 -->
      <div class="red-content" v-if="actType == 2">
        <div class="flex_between red-price">
          <div class="">
            <div class="flex_middle">
              获得红包奖励总额(元)
              <img class="ask-icon" @click="showRedDesc = true" :src="getImgUrl('publicMobile/game/withdrawal/history_desc_ask.png')" />
            </div>
            <div class="red-price-text">88.8</div>
          </div>
          <img class="withdrawal-icon" @click="onWithdrawal" :src="getImgUrl('publicMobile/game/withdrawal/history_withdrawal.png')" />
        </div>

        <div class="red-list">
          <div class="flex_between list-item">
            <div class="list-info">
              <div>盖楼9层抽奖</div>
              <div class="list-info-time">2021-01-01 10:00:00</div>
            </div>
            <div class="list-num">5.00元</div>
          </div>
          <div class="no-more">暂无更多~</div>
        </div>
        <Popup
          v-model="showRedDesc"
          style="background-color: transparent"
        >
          <div class="red-desc-popup">
            <div class="red-desc-content">
              <img class="red-desc-back" :src="getImgUrl('publicMobile/game/withdrawal/history_desc.png')" />
              <img class="red-desc-close" @click="showRedDesc = false" :src="getImgUrl('publicMobile/game/withdrawal/history_desc_close.png')" />
              <div class="red-desc-box">
                <div class="red-desc-title">温馨提示</div>
                <div class="red-desc-text">
                  1、对该活动抽奖获得的奖励：现金红包可以提现到支付宝账户，用户提现前需绑定支付宝账户，前3次不限金额提现，后面需要按照1的整数倍提现（提现按钮分别为:全部提现（仅可提现3次）、1元、5元、10元、20元、50元、100元、自定义金额）
                  <br />
                  <br />
                  2、中奖用户请可以根据需求提现到个人的付宝账户，每个支付宝账号仅限一人使用
                </div>
              </div>
            </div>
          </div>
        </Popup>
      </div>
      
      <!-- 空数据 -->
      <div class="nodata" v-if="list.length == 0">
        <NoData
          :icon="`${actType == 1 ? 'user' : 'content'}`"
          :title="`${actType == 1 ? '暂无邀请用户记录~' : '暂无任何奖品记录~'}`"
        />
        <div class="tips">
          温馨提示： 
          <br />
          当日奖励的所有盖楼机会需在24小时内用完，逾期不候
        </div>
        <div class="footer-banner" v-if="actType == 1">
          <img class="footer-banner-img" :src="getImgUrl('publicMobile/game/withdrawal/start_task.png')" />
          <div class="footer-banner-btn" />
        </div>
        <div class="footer-banner" v-if="actType == 2">
          <img class="footer-banner-img" :src="getImgUrl('publicMobile/game/withdrawal/invite.png')" />
          <div class="footer-banner-btn" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { DatetimePicker, Popup, Dialog } from 'vant';
import { getImgUrl } from '@/utils/tools';
import NoData from '@/components/nodata'

export default {
  data() {
    return {
      actType: 1,
      list: [{}, {}],
      showDate: false,
      showRedDesc: false,
      minDate: new Date(2022, 0, 1),
      maxDate: new Date(2022, 2, 1),
      currentDate: new Date(),
    };
  },
  components: {
    NoData,
    DatetimePicker,
    Popup,
  },
  mounted () {
  },
  methods: {
    getImgUrl,
    onChangeBar(type) {
      if(type != this.actType) {
        this.actType = type
      }
    },
    formatter(type, val) {
      if (type === 'year') {
        return `${val}年`;
      } else if (type === 'month') {
        return `${val}月`;
      }
      return val;
    },
    onConfirmTime(date) {
      console.log("🚀 ~ file: index.vue ~ line 101 ~ onConfirmTime ~ date", date)
      this.showDate = false;
    },
    onWithdrawal() {
      Dialog.confirm({
        width: 280,
        title: '提示',
        message: '你的账户尚未绑定支付宝，请先完成支付宝账号再操作',
      }).then(() => {
          // on confirm
      }).catch(() => {
        // on cancel
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .history-box {
    min-height: 100vh;
    background-color: #F5F5F5;
  }
  .bar-list {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 46px;
    background-color: #fff;
    border-top: 1px solid #eee;
  }
  .bar-item {
    position: relative;
    width: 50%;
    font-size: 14px;
    color: #999999;
    line-height: 46px;
    text-align: center;
  }
  .bar-act {
    font-weight: 600;
    color: #E5352F;
  }
  .bar-act::after {
    content: '';
    position: absolute;
    bottom: 2px;
    left: 0;
    width: 100%;
    height: 2px;
    background: #E5352F;
  }

  .history-content {
    margin-top: 8px;
  }

  .opportunity-time {
    height: 48px;
    font-size: 17px;
    color: #333333;
    line-height: 24px;
    padding: 0 16px;
    margin-bottom: 8px;
    background: #FFFFFF;
  }
  .tap-bottom {
    width: 6px;
    height: 6px;
    margin-top: -4px;
    margin-left: 8px;
    border-right: 2px solid #333;
    border-bottom: 2px solid #333;
    transform: rotate(45deg);
  }
  .opportunity-list,
  .red-list {
    padding: 3px 30px 0;
    background-color: #fff;
  }
  .list-item {
    font-size: 12px;
    font-weight: 600;
    color: #333333;
    line-height: 17px;
    padding: 12px 0;
    border-bottom: 1px solid #EEEEEE;
  }
  .list-info-time {
    font-size: 10px;
    font-weight: 400;
    color: #999999;
    line-height: 14px;
  }
  .list-num {
    font-size: 14px;
    font-weight: 600;
    color: #E5352F;
    line-height: 20px;
  }
  .no-more {
    font-size: 14px;
    color: #999999;
    line-height: 20px;
    text-align: center;
    padding: 60px 0 40px;
  }

  .red-price {
    font-size: 16px;
    font-weight: 600;
    color: #333333;
    line-height: 22px;
    padding: 12px 0 12px 16px;
    margin-top: 8px;
    margin-bottom: 8px;
    background-color: #fff;
  }
  .ask-icon {
    width: 16px;
    height: 16px;
    margin-left: 4px;
  }
  .red-price-text {
    font-size: 48px;
    font-weight: 600;
    color: #E5352F;
    line-height: 58px;
  }
  .withdrawal-icon {
    width: 105px;
    height: 29px;
  }
  .red-desc-popup {
    padding: 14px;
  }
  .red-desc-content {
    position: relative;
  }
  .red-desc-back {
    width: 264px;
    height: 230px;
  }
  .red-desc-close {
    position: absolute;
    top: -14px;
    right: -14px;
    width: 44px;
    height: 45px;
  }
  .red-desc-box {
    position: absolute;
    top: 30px;
    left: 18px;
    right: 18px;
    bottom: 27px;
  }
  .red-desc-title {
    font-size: 16px;
    font-weight: 600;
    color: #E5352F;
    line-height: 22px;
    text-align: center;
    margin-bottom: 11px;
  }
  .red-desc-text {
    font-size: 12px;
    color: #333333;
    line-height: 16px;
  }

  .nodata {
    .tips {
      width: 160px;
      height: 88px;
      font-size: 12px;
      color: #999999;
      line-height: 22px;
      text-align: center;
      margin: 17px auto 0;
    }
  }
  .footer-banner {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .footer-banner-img {
    width: 100%;
  }
  .footer-banner-btn {
    position: absolute;
    bottom: 40px;
    left: 50%;
    width: 280px;
    height: 54px;
    transform: translateX(-50%);
  }
  
</style>
