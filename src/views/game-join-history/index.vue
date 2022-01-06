<template>
  <div class="history-box">
    <div class="bar-list">
      <div :class="`bar-item ${actType == 1 ? 'bar-act' : ''}`" @click="onChangeBar(1)">获得机会</div>
      <div :class="`bar-item ${actType == 2 ? 'bar-act' : ''}`" @click="onChangeBar(2)">我的红包奖励</div>
    </div>

    <div class="history-content">
      <div class="opportunity-content">
        <div class="flex_middle opportunity-time" @click="showDate = true">
          2020年11月
          <div class="tap-bottom" />
        </div>
        <div class="opportunity-list">
          <div class="flex_between opportunity-item">
            <div class="opportunity-info">
              <div>邀请188****8888新用户注册</div>
              <div class="opportunity-info-time">2021-01-01 10:00:00</div>
            </div>
            <div class="opportunity-num">游戏机会+1</div>
          </div>
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
import { DatetimePicker, Popup } from 'vant';
import { getImgUrl } from '@/utils/tools';
import NoData from '@/components/nodata'

export default {
  data() {
    return {
      actType: 1,
      list: [{}, {}],
      showDate: false,
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
  .opportunity-list {
    padding: 3px 30px 0;
    background-color: #fff;
  }
  .opportunity-item {
    font-size: 12px;
    font-weight: 600;
    color: #333333;
    line-height: 17px;
    padding: 12px 0;
    border-bottom: 1px solid #EEEEEE;
  }
  .opportunity-info-time {
    font-size: 10px;
    font-weight: 400;
    color: #999999;
    line-height: 14px;
  }
  .opportunity-num {
    font-size: 14px;
    font-weight: 600;
    color: #E5352F;
    line-height: 20px;
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
