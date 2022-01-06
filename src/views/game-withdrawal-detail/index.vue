<template>
  <div class="withdrawal-detail">
    <div class="content-box">
      <div class="price-box">
        <img class="price-icon" :src="getImgUrl('publicMobile/game/withdrawal/withdrawal-icon.png')" />
        <div class="price">¥ 8689.99</div>
        <div class="account">账户提现到支付宝（6472）</div>
      </div>

      <div class="withdrawal-info">
        <div class="progress-box">
          <span class="flex-fix progress-title">当前状态</span>
          <div class="flex-fix progress-list">
            <div class="progress-item">
              <div class="tap" />
              <div class="line" />
            </div>
            <div class="progress-item">
              <div class="tap" v-if="progress == 3" />
              <img class="waiting-icon"  v-if="progress == 2" :src="getImgUrl('publicMobile/game/withdrawal/waiting.png')" />
            </div>
            <div class="progress-item" v-if="progress == 3">
              <div class="line" />
              <img class="success-icon" v-if="isOk" :src="getImgUrl('publicMobile/game/withdrawal/success.png')" />
              <img class="waiting-icon" v-if="!isOk" :src="getImgUrl('publicMobile/game/withdrawal/lose.png')" />
            </div>
          </div>
          <div class="progress-info">
            <div class="progress-info-item">
              <div>发起提现</div>
              <div class="progress-info-time">2021-05-21 10:18:37</div>
            </div>
            <div
              :class="`progress-info-item ${progress == 2 ? 'act-top act-bank' : ''}`"
            >银行处理中</div>
            <div
              :class="`progress-info-item act-top ${isOk ? 'success-text' : 'lose-text'}`"
              v-if="progress == 3"
            >
              <div>{{isOk ? '到账' : '提现失败'}}</div>
              <div class="progress-info-time">2021-05-21 10:18:37</div>
            </div>
          </div>
        </div>

        <div class="info-detail">
          <div class="detail-item">
            <div>提现金额</div>
            <div class="detail-value">¥8689.99</div>
          </div>
          <div class="detail-item">
            <div>服务费</div>
            <div class="detail-value">¥8689.99</div>
          </div>
          <div class="detail-item">
            <div>申请时间</div>
            <div class="detail-value">2021-05-21 10:18:37</div>
          </div>
          <div class="detail-item">
            <div>到账时间</div>
            <div class="detail-value">-</div>
          </div>
          <div class="detail-item">
            <div>提现银行</div>
            <div class="detail-value">阿的说法是</div>
          </div>
          <div class="detail-item">
            <div>提现单号</div>
            <div class="detail-value">231564564564564</div>
          </div>
          <div class="detail-item">
            <div>失败原因</div>
            <div class="detail-value">系统升级原因</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Image } from 'vant';
import { getImgUrl } from '@/utils/tools';


export default {
  data() {
    return {
      progress: 3,
      isOk: true,
    };
  },
  components: {
    Image,
  },
  mounted () {
  },
  methods: {
    getImgUrl,
    onToDetail(idx) {
      console.log("🚀 ~ file: index.vue ~ line 44 ~ onToDetail ~ idx", idx)
      this.$router.push('/web/game-withdrawal-detail');
    },
  },
};
</script>

<style lang="scss" scoped>
  .withdrawal-detail {
    min-height: 100vh;
    font-size: 15px;
    color: #999999;
    line-height: 21px;
    padding: 12px;
    background-color: rgba(249, 249, 249, 1);
  }
  .content-box {
  }
  .flex-fix {
    flex-grow: 0;
    flex-shrink: 0;
  }
  .price-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 27px 0 26px 0;
    margin-bottom: 10px;
    background-color: #fff;
    border-radius: 10px;
  }
  .price-icon {
    width: 40px;
    height: 32px;
    margin-bottom: 10px;
  }
  .price {
    font-size: 24px;
    font-weight: bold;
    color: #333333;
    line-height: 28px;
    margin-bottom: 16px;
  }
  
  .withdrawal-info {
    padding: 12px;
    background: #FFFFFF;
    border-radius: 10px;
  }
  .progress-box {
    display: flex;
    padding-bottom: 27px;
    margin-bottom: 20px;
    border-bottom: 1px solid #D8D8D8;
  }
  .progress-title {
    margin-top: 18px;
  }
  .progress-list {
    margin-top: 18px;
    margin-left: 11px;
  }
  .progress-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 22px;
  }
  .tap {
    width: 8px;
    height: 8px;
    background: #D8D8D8;
    margin-bottom: 4px;
    border-radius: 50%;
  }
  .line {
    width: 1px;
    height: 28px;
    margin-bottom: 4px;
    border-left: 1px dotted #D8D8D8;
  }
  .waiting-icon {
    width: 22px;
    height: 22px;
  }
  .success-icon {
    width: 22px;
    height: 23px;
  }
  .progress-info {
    margin-left: 32px;
  }
  .progress-info-item:not(:first-child) {
    margin-top: 15px;
  }
  .act-bank {
    color: #008CEF;
  }
  .act-top {
    margin-top: 22px !important;
  }
  .progress-info-time {
    font-size: 13px;
    line-height: 18px;
  }
  .success-text {
    color: #FF8718 !important;
  }
  .lose-text {
    color: #EF1A00 !important;
  }

  .detail-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  .detail-value {
    color: rgba(51, 51, 51, 1);
    font-size: 16px;
    line-height: 22px;
  }
</style>
