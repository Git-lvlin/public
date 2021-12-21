<template>
  <div class="new-year">
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
      <div class="tab-box">
        <div class="tab-show-box">
          <div :class="item.type?'tab tab-index':'tab'" v-for="(item, index) in tabData" :key="index" @click="onTab(index)">{{item.text}}</div>
        </div>
      </div>
      <div v-for="(data, index) in info" :key="index">
        <div class="item-box" v-if="data.goodsInfo.length">
          <van-image
            :id="index"
            v-if="index!==0&&data.goodsInfo.length"
            class="title"
            width="211px"
            height="34px"
            lazy-load
            :src="getImgUrl(`publicMobile/happynewyear/title${index}.png`)"
          />
          <div class="goods-box" v-if="data.goodsInfo.length">
            <div class="goods-item" @click="toDetail(goods)" v-for="(goods, i) in data.goodsInfo" :key="i">
              <van-image
                class="goods-img"
                width="100%"
                height="169px"
                :src="goods.goodsImageUrl"
              />
              <div class="goods-content">
                <div class="goods-name van-multi-ellipsis--l2">{{goods.goodsName}}</div>
                <div class="goods-tag" v-if="goods.redPacket">红包可抵扣{{goods.redPacket/100}}元</div>
                <div class="price-box">
                  <div class="price">福利价 <span class="price-icon">¥</span></div>
                  <div class="price-num">{{goods.wealPrice/100}}</div>
                </div>
                <div class="old-price">销售价:¥{{goods.goodsSaleMinPrice/100}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="item-box" v-if="data.goodsInfo.length">
          <van-image
            :id="index"
            v-if="index!==0&&data.goodsInfo.length"
            class="title"
            width="211px"
            height="34px"
            lazy-load
            :src="getImgUrl(`publicMobile/happynewyear/title${index}.png`)"
          />
          <div class="goods-box" v-if="data.goodsInfo.length">
            <div class="goods-item" @click="toDetail(goods)" v-for="(goods, i) in data.goodsInfo" :key="i">
              <van-image
                class="goods-img"
                width="100%"
                height="169px"
                :src="goods.goodsImageUrl"
              />
              <div class="goods-content">
                <div class="goods-name van-multi-ellipsis--l2">{{goods.goodsName}}</div>
                <div class="goods-tag" v-if="goods.redPacket">红包可抵扣{{goods.redPacket/100}}元</div>
                <div class="price-box">
                  <div class="price">福利价 <span class="price-icon">¥</span></div>
                  <div class="price-num">{{goods.wealPrice/100}}</div>
                </div>
                <div class="old-price">销售价:¥{{goods.goodsSaleMinPrice/100}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="item-box" v-if="data.goodsInfo.length">
          <van-image
            :id="index"
            v-if="index!==0&&data.goodsInfo.length"
            class="title"
            width="211px"
            height="34px"
            lazy-load
            :src="getImgUrl(`publicMobile/happynewyear/title${index}.png`)"
          />
          <div class="goods-box" v-if="data.goodsInfo.length">
            <div class="goods-item" @click="toDetail(goods)" v-for="(goods, i) in data.goodsInfo" :key="i">
              <van-image
                class="goods-img"
                width="100%"
                height="169px"
                :src="goods.goodsImageUrl"
              />
              <div class="goods-content">
                <div class="goods-name van-multi-ellipsis--l2">{{goods.goodsName}}</div>
                <div class="goods-tag" v-if="goods.redPacket">红包可抵扣{{goods.redPacket/100}}元</div>
                <div class="price-box">
                  <div class="price">福利价 <span class="price-icon">¥</span></div>
                  <div class="price-num">{{goods.wealPrice/100}}</div>
                </div>
                <div class="old-price">销售价:¥{{goods.goodsSaleMinPrice/100}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="item-box" v-if="data.goodsInfo.length">
          <van-image
            :id="index"
            v-if="index!==0&&data.goodsInfo.length"
            class="title"
            width="211px"
            height="34px"
            lazy-load
            :src="getImgUrl(`publicMobile/happynewyear/title${index}.png`)"
          />
          <div class="goods-box" v-if="data.goodsInfo.length">
            <div class="goods-item" @click="toDetail(goods)" v-for="(goods, i) in data.goodsInfo" :key="i">
              <van-image
                class="goods-img"
                width="100%"
                height="169px"
                :src="goods.goodsImageUrl"
              />
              <div class="goods-content">
                <div class="goods-name van-multi-ellipsis--l2">{{goods.goodsName}}</div>
                <div class="goods-tag" v-if="goods.redPacket">红包可抵扣{{goods.redPacket/100}}元</div>
                <div class="price-box">
                  <div class="price">福利价 <span class="price-icon">¥</span></div>
                  <div class="price-num">{{goods.wealPrice/100}}</div>
                </div>
                <div class="old-price">销售价:¥{{goods.goodsSaleMinPrice/100}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
        <div class="content">
          <p>1、玩法规则：</p>
          <p>进入每开盲盒活动页面，点击活动弹窗拆开红包即参与成功。本活动以三天为一个活动周期。活动周期内，您每天可在特定的时间内拆开一个红包领取优惠券（具体优惠金额、类型、使用条件等以活动页面显示为准）。当天特定时间内未拆开红包的，则当天可拆的红包将自动失效。</p>
          <p>2、活动说明：</p>
          <p>您购买页面内展示的优惠商品时，符合优惠条件的，即会自动使用并立减相应金额。每天拆红包领取的优惠券均有有效期（具体以活动页面提示为准），逾期自动失效，请您领取后及时使用。红包仅可在约购APP每日红包栏目内使用；红包可直接抵扣订单金额，不支持提现，若经查实用户通过不正当行为获得奖励（约购）有权利撤销该用户的使用红包及优惠券的资格，情节严重则将追究其法律责任。</p>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import Vue from 'vue';
import { Image as VanImage, Lazyload, Popup } from 'vant';
import { getImgUrl } from '@/utils/tools';
import { appBaseUrl, meBaseUrl } from "@/constant/index";
import api from '@/apis/year';
import {
  goToApp,
  bury,
  setNavigationBar,
} from '@/utils/userInfo';
Vue.use(VanImage);
Vue.use(Lazyload);
Vue.use(Popup);
export default {
  data() {
    return {
      info: null,
      show: false,
      tabData: [],
      // tabData: [
      //   {
      //     text: '爆款年货',
      //     type: true,
      //   },
      //   {
      //     text: '日用好货',
      //     type: false,
      //   },
      //   {
      //     text: '新年送礼',
      //     type: false,
      //   },
      //   {
      //     text: '暖心家具',
      //     type: false,
      //   },
      //   {
      //     text: '家电焕新',
      //     type: false,
      //   },
      //   {
      //     text: '美丽过年',
      //     type: false,
      //   }
      // ]
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
  },
  
  async mounted() {
    this.getNewYearInfo()
  },
  methods: {
    getImgUrl,
    toDetail(item) {
      const {  defaultSkuId, spuId, orderType, activityId, objectId } = item;
      bury('web_new_year_click_to_shopping_detail', {
        spuId,
        skuId: defaultSkuId,
        orderType
      })
      const param = `?skuId=${defaultSkuId}&spuId=${spuId}&orderType=${orderType}&activityId=${activityId}&objectId=${objectId}`;
      goToApp(appBaseUrl, '/shopping/detail', param)
    },
    goto(type) {
      if (type==1) {
        bury('web_new_year_click_to_sign_in')
        goToApp(appBaseUrl, '/flutter/mine/sign_in/detail')
      } else {
        bury('web_new_year_click_to_bind_box')
        goToApp(meBaseUrl, '/web/bind-box')
      }
    },
    onTab(index) {
      this.tabData.map((item) => {
        item.type = false
        return item
      })
      this.tabData[index].type = true
      // 定位到index锚点
      document.getElementById(index+'').scrollIntoView()
    },
    showPopup() {
      this.show = true
      bury('web_new_year_click_show_rule')
    },
    getNewYearInfo() {
      api.getHappy().then(res => {
        this.info = res.data
        this.tabData = this.info.map((item, index) => {
          let d = {}
          if (item.goodsInfo.length) {
            d = {
              text: item.name,
              type: index==0?true:false
            }
          }
          return d
        })
      })
    } 
  },
};
</script>

<style lang="scss" scoped>
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
    top: -32px;
    display: flex;
    flex-direction: column;
  }
  .tab-box {
    position: sticky;
    position: -webkit-sticky;
    top: 0;
    box-sizing: border-box;
    padding-top: 6px;
    padding-bottom: 6px;
    padding-left: 3px;
    width: 100%;
    height: 37px;
    overflow: hidden;
    overflow-x: auto;
    z-index: 9999;
    background: #E1230D;
    .tab-show-box {
      display: flex;
      justify-content: flex-start;
      width: 603px;
      height: 100%;
      .tab {
        width: 100px;
        height: 25px;
        background: #E1230D;
        border-radius: 13px;
        text-align: center;
        line-height: 25px;
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
      }
      .tab-index {
        color: #F8382E;
        background: #FFFFFF;
      }
    }
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
        .goods-img {
          width: 100%;
          height: 169px;
        }
        .goods-content {
          padding: 8px;
          .goods-name {
            margin-bottom: 6px;
            // height: 36px;
            font-size: 13px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #333333;
            line-height: 18px;
          }
          .goods-tag {
            margin-bottom: 2px;
            display: inline-block;
            padding: 2px 4px;
            line-height: 13px;
            background: rgba(235, 72, 63, 0.1);
            border-radius: 2px;
            font-size: 10px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #EB483F;
          }
          .price-box {
            display: flex;
            justify-content: flex-start;
            .price {
              margin-right: 3px;
              font-size: 14px;
              color: #E7532C;
              .price-icon {
                font-size: 12px;
                font-weight: 600px;
              }
            }
            .price-num {
              font-size: 16px;
              color: #E7532C;
              font-weight: 600px;
            }
          }
          .old-price {
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
