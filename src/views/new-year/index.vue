<template>
  <div class="new-year">
    <van-loading class="load" v-if="load" />
    <van-image
      class="bg"
      width="100%"
      height="235px"
      lazy-load
      :src="getImgUrl('publicMobile/happynewyear/bg.png')"
    />
    <van-image
      class="gz"
      width="78px"
      height="24px"
      lazy-load
      :src="getImgUrl('publicMobile/happynewyear/gz.png')"
      @click="showPopup"
    />
    <div class="btn-box">
      <van-image
        class="btn-left"
        width="137px"
        height="111px"
        lazy-load
        @click="goto(1)"
        :src="getImgUrl('publicMobile/happynewyear/btn-left.png')"
      />
      <van-image
        class="btn-right"
        width="135px"
        height="111px"
        @click="goto(2)"
        lazy-load
        :src="getImgUrl('publicMobile/happynewyear/btn-right.png')"
      /> 
    </div>
    <div class="content-box">
      <van-tabs background="#E1230D" line-width="0" line-height="0" duration="0" v-model="active" scrollspy sticky>
        <van-tab :title-style="index===active?'margin-top: 10px;width: 100px;height: 25px;border-radius: 13px;text-align: center;line-height: 25px;font-size: 14px;color: #F8382E;background: #FFFFFF;':'margin-top: 10px;width: 100px;height: 25px;border-radius: 13px;text-align: center;line-height: 25px;font-size: 14px;color: #FFFFFF;background: #E1230D;'" v-for="(data, index) in info" :title="info[index].name" :key="index">
          <div class="item-box">
            <van-image
              v-if="index!==0&&data.goodsInfo.length"
              class="title"
              width="211px"
              height="34px"
              lazy-load
              :src="getImgUrl(`publicMobile/happynewyear/title${index}.png`)"
            />
            <div :id="index" class="goods-box" v-if="data.goodsInfo.length">
              <div class="goods-item" @click="toDetail(goods)" v-for="(goods, i) in data.goodsInfo" :key="i">
                <div class="goods-img">
                  <van-image
                    width="100%"
                    :src="goods.goodsImageUrl"
                  />
                </div>
                <div class="goods-content" v-if="goods.redPacket">
                  <div class="goods-name van-multi-ellipsis--l2">{{goods.goodsName}}</div>
                  <div class="goods-tag">红包可抵扣{{goods.redPacket/100}}元</div>
                  <div class="price-box">
                    <div class="price">福利价 <span class="price-icon">¥</span></div>
                    <div class="price-num">{{goods.wealPrice/100}}</div>
                  </div>
                  <div class="old-price">销售价:¥{{goods.goodsSaleMinPrice/100}}</div>
                </div>
                <div class="goods-content" v-else>
                  <div class="goods-name2 van-multi-ellipsis--l3">{{goods.goodsName}}</div>
                  <div class="price-box">
                    <div class="price">销售价 <span class="price-icon">¥</span></div>
                    <div class="price-num">{{goods.goodsSaleMinPrice/100}}</div>
                  </div>
                  <div class="old-price">市场价:¥<span class="no-red-last-price">{{goods.goodsMarketPrice/100}}</span></div>
                </div>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
      <div class="tail">
        <van-image
          class="tail-left"
          width="34px"
          height="1px"
          lazy-load
          :src="getImgUrl('publicMobile/happynewyear/bottom-left.png')"
        />
        <div class="text">没有更多商品</div>
        <van-image
          class="tail-right"
          width="34px"
          height="1px"
          lazy-load
          :src="getImgUrl('publicMobile/happynewyear/bottom-right.png')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Image as VanImage, Lazyload, Popup, Tab, Tabs, Loading, Toast } from 'vant';
import { getImgUrl } from '@/utils/tools';
import { appBaseUrl, meBaseUrl } from "@/constant/index";
import api from '@/apis/year';
import teamApi from '@/apis/bindbox';
import {
  goToApp,
  bury,
  setNavigationBar,
} from '@/utils/userInfo';
import { shareGoToNewShare } from '@/utils/publicBusiness';
Vue.use(VanImage);
Vue.use(Lazyload);
Vue.use(Loading);
Vue.use(Popup);
Vue.use(Tab);
Vue.use(Tabs);
export default {
  data() {
    return {
      info: null,
      active: 0,
      inviteCode: null,
      token: null,
      bgImgUrl: getImgUrl('publicMobile/happynewyear/bg.png'),
      load: true,
    };
  },
  components: {
  },
  async created () {
    const rightButton = {
      type: 'share',
      object: {
        contentType: 11,
        paramId: 13,
        shareType: 3,
        sourceType: 11,
      }
    };
    const titleLabel = {
      titleLabelColor: '', // 暂时不会传
      font: '', // 暂时不会传
      text: '', // 默认documenttitle
    };
    setNavigationBar('#FFFFFF', rightButton, titleLabel);
    await this.getUserInfo();
    this.getTask()
  },
  
  async mounted() {
    const {
      query,
    } = this.$router.history.current;
    this.inviteCode = query.inviteCode;
    this.getNewYearInfo()
    await this.loadImg()
  },
  methods: {
    getImgUrl,
    getTask() {
      teamApi.getTask({type: 1}, {token: this.token})
      teamApi.getTask({type: 2}, {token: this.token})
      teamApi.getTask({type: 3}, {token: this.token})
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
    toDetail(item) {
      shareGoToNewShare(this.inviteCode, this.token, this.$store.state, this.$router);
      const {  defaultSkuId, spuId, orderType, activityId, objectId } = item;
      const param = `?skuId=${defaultSkuId}&spuId=${spuId}&orderType=${orderType}&activityId=${activityId}&objectId=${objectId}`;
      goToApp(appBaseUrl, '/shopping/detail', param)
      bury('web_new_year_click_to_shopping_detail', {
        spuId,
        skuId: defaultSkuId,
        orderType
      })
    },
    loadImg() {
      return new Promise((resolve, reject) => {
        let bgImg = new Image();
        bgImg.src = this.bgImgUrl; // 获取背景图片的url
        bgImg.onerror = () => {
          console.log('img onerror')
          reject()
        }
        bgImg.onload = () => { // 等背景图片加载成功后 去除loading
          setTimeout(() => {
            this.load = false
            resolve()
          }, 200)
        }
      })
    },
    goto(type) {
      if (type==1) {
        shareGoToNewShare(this.inviteCode, this.token, this.$store.state, this.$router);
        goToApp(appBaseUrl, '/flutter/mine/sign_in/detail')
        bury('web_new_year_click_to_sign_in')
      } else {
        Toast('本期盲盒活动已结束！');
        // goToApp(meBaseUrl, '/web/bind-box')
        // bury('web_new_year_click_to_bind_box')
      }
    },
    showPopup() {
      shareGoToNewShare(this.inviteCode, this.token, this.$store.state, this.$router);
      goToApp(meBaseUrl, '/web/new-year-rule?_immersive=0')
      bury('web_new_year_click_show_rule')
    },
    getNewYearInfo() {
      api.getHappy().then(res => {
        this.info = res.data
      })
    } 
  },
};
</script>

<style lang="scss" scoped>
.load {
  position: fixed;
  padding-top: 200px;
  width: 100%;
  min-height: 100vh;
  background-color: #d93d33;
  margin: auto;
  text-align: center;
  z-index: 99999;
}
.no-red-last-price {
  text-decoration: line-through;
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
    padding: 32px 0px 50px 0px;
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
  ::-webkit-scrollbar {
    width: 0 !important;
    height: 0 !important;
    display: none;
  }
  .element::-webkit-scrollbar { width: 0 !important }
  .element { -ms-overflow-style: none; }
  .element { overflow: -moz-scrollbars-none; }
  .new-year {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #E1230D;
    position: relative;
  }
  .gz {
    position: absolute;
    top: 16px;
    right: 12px;
    width: 78px;
    height: 24px;
  }
  .btn-box {
    position: relative;
    top: -40px;
    display: flex;
    justify-content: center;
    .btn-left {
      margin-right: 18px;
    }
  }
  .content-box {
    position: relative;
    top: -38px;
    display: flex;
    flex-direction: column;
  }
  .tab {
    width: 100px;
    height: 25px;
    background: #E1230D;
    border-radius: 13px;
    text-align: center;
    line-height: 25px;
    font-size: 14px;
    color: #FFFFFF;
  }
  .tab-index {
    width: 100px;
    height: 25px;
    border-radius: 13px;
    text-align: center;
    line-height: 25px;
    font-size: 14px;
    color: #F8382E;
    background: #FFFFFF;
  }
  .item-box {
    box-sizing: border-box;
    padding: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
      width: 211px;
      height: 34px;
      margin-bottom: 12px;
    }
    .goods-box {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      .goods-item {
        &:nth-child(even) {
          margin-left: 13px;
        }
        display: flex;
        margin-bottom: 12px;
        flex-direction: column;
        width: 169px;
        height: 277px;
        background: #FFFFFF;
        box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.02);
        border-radius: 8px;
        overflow: hidden;
        position: relative;
        .goods-img {
          width: 100%;
          height: 169px;
          overflow: hidden;
        }
        .goods-content {
          .goods-name {
            position: absolute;
            left: 8px;
            top: 173px;
            width: 153px;
            height: 36px;
            font-size: 13px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #333333;
            line-height: 18px;
          }
          .goods-name2 {
            position: absolute;
            left: 8px;
            top: 173px;
            width: 153px;
            height: 54px;
            font-size: 13px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #333333;
            line-height: 18px;
          }
          .goods-tag {
            padding: 0 4px;
            position: absolute;
            top: 215px;
            left: 8px;
            height: 13px;
            text-align: center;
            line-height: 13px;
            background: rgba(235, 72, 63, 0.1);
            border-radius: 2px;
            font-size: 10px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #EB483F;
          }
          .price-box {
            position: absolute;
            top: 230px;
            left: 8px;
            display: flex;
            justify-content: flex-start;
            .price {
              margin-right: 3px;
              font-size: 14px;
              color: #E7532C;
              .price-icon {
                font-size: 12px;
                font-weight: 600;
              }
            }
            .price-num {
              font-size: 16px;
              color: #E7532C;
              font-weight: 600;
            }
          }
          .old-price {
            position: absolute;
            top: 255px;
            left: 8px;
            height: 14px;
            font-size: 10px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #B2B2B2;
            line-height: 14px;
          }
        }
      }
    }
  }
  .tail {
    padding: 24px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: .59;
    width: 100%;
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 20px;
    .text {
      margin: 0 12px;
    }
  }
</style>
