<template>
  <div class="shop-pk">
    <div class="rule" @click="show">
      <span>规</span>
      <span>则</span>
    </div>
    <div class="top-box">
      <van-image
        class="bg"
        width="100%"
        :src="getImgUrl('publicMobile/shopkeeperpk/banner.png')"
      />
      <div class="banners-box">
        <van-image
          class="theme"
          width="326.5px"
          height="129px"
          :src="getImgUrl('publicMobile/shopkeeperpk/banner-title.png')"
        />
        <div class="shop-name">{{storeName}}</div>
        <div class="user-head">
          <div class="head">
            <van-image
              width="55px"
              height="55px"
              :src="storeLogo"
            />
          </div>
        </div>
        <div class="ranking-now" v-if="rank>1&&rank<101">当前排名第<span class="ss">{{rank}}</span>名</div>
        <div class="disparity" v-if="rank!==1">超越上1名仅需集约<span class="s">{{rank===0?'1':beforeTotalFee}}</span>元</div>
        <div class="disparity" v-if="rank===1">集约更多商品,保持领先优势!</div>
        <div class="intensive-btn">
          <van-image
            class="intensive-btn-bg"
            width="151.5px"
            height="43px"
            :src="getImgUrl('publicMobile/shopkeeperpk/btn.png')"
          />
          <div class="btn-text" @click="go">立即集约</div>
        </div>
      </div>
    </div>

    <div class="list-box">
      <div class="list-title-box">
        <van-image
          class="list-title"
          width="231.5px"
          height="42.5px"
          :src="getImgUrl('publicMobile/shopkeeperpk/content-title.png')"
        />
        <div class="list-title-text">·优秀店主排行榜·</div>
      </div>
      <div class="list-bg-box">
        <van-image
          class="list-bg"
          width="100%"
          height="100%"
          :src="getImgUrl('publicMobile/shopkeeperpk/content-bg.png')"
        />
        <div class="list-bg-content">
          <div class="top-tips">— 奖金以活动结束后的最终排名为准 —</div>
          <div class="table-head">
            <div class="one">排名</div>
            <div class="two">店铺名称</div>
            <div class="three">集约金额</div>
            <div class="four">奖金</div>
          </div>

          <div class="ranking-list">
            <div class="ranking-item" v-for="(item, index) in info" :key="index">
              <div class="user-pic-box2" v-if="index<3">
                <van-image
                  v-if="index==0"
                  class="no1-b"
                  width="59.5px"
                  height="66px"
                  :src="getImgUrl('publicMobile/shopkeeperpk/no1-t.png')"
                />
                <van-image
                  v-if="index==1"
                  class="no1-b"
                  width="59.5px"
                  height="66px"
                  :src="getImgUrl('publicMobile/shopkeeperpk/no2-t.png')"
                />
                <van-image
                  v-if="index==2"
                  class="no1-b"
                  width="59.5px"
                  height="66px"
                  :src="getImgUrl('publicMobile/shopkeeperpk/no3-t.png')"
                />
                <van-image
                  class="user-head-pic"
                  width="48px"
                  height="48px"
                  :src="item.storeLogo"
                />
                <div class="num-box"
                  v-if="index==0"
                  :style="{
                    'background-image': `url('${getImgUrl('publicMobile/shopkeeperpk/no1-b.png')}')`
                  }"
                >
                  NO.{{item.rank}}
                </div>
                <div class="num-box"
                  v-if="index==1"
                  :style="{
                    'background-image': `url('${getImgUrl('publicMobile/shopkeeperpk/no2-b.png')}')`
                  }"
                >
                  NO.{{item.rank}}
                </div>
                <div class="num-box"
                  v-if="index==2"
                  :style="{
                    'background-image': `url('${getImgUrl('publicMobile/shopkeeperpk/no3-b.png')}')`
                  }"
                >
                  NO.{{item.rank}}
                </div>
              </div>
              <div class="user-pic-box" v-else>
                <van-image
                  class="pic"
                  width="45px"
                  height="45px"
                  :src="item.storeLogo"
                />
                <div class="num">
                  NO.<span class="number">{{item.rank}}</span>
                </div>
              </div>
              <div class="user-name-box">
                <div class="name">{{item.storeName}}</div>
                <div class="phone" v-if="item.memberPhone">{{item.memberPhone}}</div>
              </div>
              <div class="user-price">¥{{item.totalFee}}</div>
              <div class="user-bonus">¥{{item.price}}</div>
            </div>
          </div>
        </div>
      </div>



      <div class="bottom-box">
        <div class="title">·约购平台扶持·</div>
        <div class="detail">12月集约金额排名前10的获奖店主除现金奖励还将纳入约购“优秀店主扶持计划”额外享受如下福利：</div>
        <div class="welfare1">
          <div class="item">
            <div class="img-box">
              <van-image
                class="icon1"
                width="31px"
                height="36px"
                :src="getImgUrl('publicMobile/shopkeeperpk/icon1.png')"
              />
            </div>
            <div class="item-text">定制奖杯</div>
          </div>
          <div class="item item2">
            <div class="img-box">
              <van-image
                class="icon2"
                width="34.5px"
                height="37px"
                :src="getImgUrl('publicMobile/shopkeeperpk/icon2.png')"
              />
            </div>
            <div class="item-text">云颁奖典礼表彰</div>
          </div>
          <div class="item">
            <div class="img-box">
              <van-image
                class="icon3"
                width="30px"
                height="31.5px"
                :src="getImgUrl('publicMobile/shopkeeperpk/icon3.png')"
              />
            </div>
            <div class="item-text">专项报道</div>
          </div>
        </div>
        <div class="welfare2">
          <div class="item item4">
            <div class="img-box">
              <van-image
                class="icon4"
                width="30.5px"
                height="31px"
                :src="getImgUrl('publicMobile/shopkeeperpk/icon4.png')"
              />
            </div>
            <div class="item-text">店主C端社群</div>
            <div class="item-text">运营帮扶</div>
          </div>
          <div class="item">
            <div class="img-box">
              <van-image
                class="icon5"
                width="39.5px"
                height="30.5px"
                :src="getImgUrl('publicMobile/shopkeeperpk/icon5.png')"
              />
            </div>
            <div class="item-text">店主专业技能</div>
            <div class="item-text">培训</div>
          </div>
        </div>
      </div>

    </div>
    <van-popup :style="{ width:'100%', background: 'none',overflow: 'hidden'}" v-model="showPopup">
      <div class="popup-box">
        <div class="popup-title">
          <van-image
            class="popup-title-img"
            width="151.5px"
            height="31.5px"
            :src="getImgUrl('publicMobile/shopkeeperpk/popup-title.png')"
          />
          <div class="popup-title-text">·活动规则·</div>
        </div>
        <van-image
          class="popup-bg"
          width="343px"
          height="20.5px"
          :src="getImgUrl('publicMobile/shopkeeperpk/popup-subtitle.png')"
        />
        <div class="popup-content">
          <div class="text1">1、活动时间：2021年12月1日-12月31日</div>
          <div class="text2">2、活动期间店主发起集约，集约金额达到3000元以上，即可参加“店主集约PK赛”活动，PK赛根据店主集约金额从高到低排名，活动结束后对排名前10的店主，给予现金奖励并加入约购优秀店主扶持计划，具体如下：</div>
          <div class="text3">
            <div class="head1">集约金额 排名</div>
            <div class="head2">现金奖励（税前）</div>
            <div class="head3">优秀店主 计划</div>
          </div>
          <div class="text4">
            <div class="left">
              <div class="left-item singular">
                <span class="sp1">第1名</span>
                <span class="sp2">￥4000</span>
              </div>
              <div class="left-item">
                <span class="sp1">第2名</span>
                <span class="sp2">￥2000</span>
              </div>
              <div class="left-item singular">
                <span class="sp1">第3名</span>
                <span class="sp2">￥1000</span>
              </div>
              <div class="left-item">
                <span class="sp1">第4-10名</span>
                <span class="sp2">￥500</span>
              </div>
            </div>
            <div class="right">
              <div class="right-item">·精美定制奖杯·</div>
              <div class="right-item">·云颁奖典礼表彰·</div>
              <div class="right-item">·专项报道·</div>
              <div class="right-item right-item4">
                <div>店主C端社群</div>
                <div>运营帮扶</div>
              </div>
              <div class="right-item">·店主技能培训·</div>
            </div>
          </div>
          <div class="text5">3、店主集约金额一致以取得该排名的时间先后顺序排名</div>
          <div class="text6">4、获奖店主须承担获奖现金7%的代缴税，由约购平台完成代扣后将剩余现金交付给获奖店主</div>
          <div class="text7">5、获得现金奖励的店主须出席参加线上或线下颁奖仪式（时间、地点、方式待定）</div>
          <div class="text8">6、获奖店主须在7个工作日内配合约购工作人员完成获奖资格登记确认，逾期视为弃奖</div>
          <div class="text9">7、活动相关信息将通过“约购快讯”微信公众号发布，未尽事宜以“约购快讯”微信公众号发布的信息为准</div>
          <div class="text10">8、本活动最终解释权归约购所有</div>
        </div>
        <van-image
          class="popup-close"
          width="50px"
          height="50px"
          :src="getImgUrl('publicMobile/shopkeeperpk/close.png')"
          @click="close"
        />
      </div>
    </van-popup>
  </div>
</template>

<script>
import Vue from "vue";
import { Image as VanImage, Dialog, Popup } from "vant";
import { getImgUrl } from "@/utils/tools";
import { appBaseUrl, meBaseUrl } from "@/constant/index";
import { goToApp, backOff } from "@/utils/userInfo";
import teamApi from '@/apis/pk';
Vue.use(Popup);
Vue.use(VanImage);
export default {
  data() {
    return {
      token: null,
      info: null,
      beforeTotalFee: null,
      rank: null,
      storeLogo: null,
      storeName: null,
      showPopup: false,
    };
  },
  components: {
    [Dialog.Component.name]: Dialog.Component,
  },
  created() {
  },
  async mounted() {
    await this.getUserInfo()
    this.getList()
  },
  methods: {
    show() {
      this.showPopup = true
    },
    close() {
      this.showPopup = false
    },
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
    go() {
      goToApp(appBaseUrl, '/flutter/store/member/index')
    },
    getMonth() {
      // var date = new Date();//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      // var Y = date.getFullYear();
      // var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
      // return Y+''+M;
      return 202112
    },
    getList() {
      const m = this.getMonth();
      const param = {
        month: m,
        limit: 10,
      }
      teamApi.getPkList(param, {token: this.token}).then((res) => {
        const { rank, storeLogo, storeName, beforeTotalFee, top } = res.data
        if (!storeName) {
          // 不是店主 回首页
          Dialog.alert({
            message: '您还不是店主，成为店主再来吧！',
          }).then(() => {
            backOff()
          });
          return
        }
        if (rank !== '1000+') {
          this.rank = rank + 0;
        } else {
          this.rank = rank
        }
        this.storeLogo = storeLogo;
        this.storeName = storeName

        const p = (beforeTotalFee/100).toString();
        this.beforeTotalFee = p.indexOf('.')>-1?p.split('.')[0]:p
        this.info = top.map((item) => {
          switch(item.rank) {
            case 1:
              item.price=4000
              break
            case 2:
              item.price=2000
              break
            case 3:
              item.price=1000
              break
            default:
              item.price=500
          }
          // if (item.totalFee>99999999) {
          //   item.totalFee='99.99万+'
          // } else if (item.totalFee<=99999999&&item.totalFee>999999) {
          //   item.totalFee = item.totalFee/1000000 + '万'
          // } else {
          //   item.totalFee /= 100
          // }
          if (item.totalFee > 9999999) {
            const a = (item.totalFee/100).toString();
            item.totalFee = a.indexOf('.')>-1?a.split('.')[0]:a
          } else {
            item.totalFee /= 100
          }
          return item
        })
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.shop-pk {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(0deg, #BB141E 0%, #FC4F5F 100%);
}
.rule {
  position: absolute;
  top: 29.5px;
  right: 0;
  z-index: 99;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #b90c0f;
  font-size: 15px;
  font-weight: 550;
  background-color: #fcd6bb;
  width: 24px;
  height: 50px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
.top-box {
  position: relative;
  .banners-box {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .theme {
      margin-top: 25.5px;
      margin-bottom: 39px;
    }
    .shop-name {
      width: 210px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: 17px;
      font-size: 18px;
      font-family: Source Han Sans SC;
      font-weight: 500;
      color: #FFE6CA;
      text-shadow: 0px 4px 0px rgba(193, 2, 11, 0.36);
      text-align: center;
    }
    .user-head {
      box-sizing: border-box;
      margin-bottom: 15px;
      padding: 2.5px;
      width: 55px;
      height: 55px;
      border-radius: 50%;
      background-image: linear-gradient(-30deg, #F54453, #FCB945, #FF8BE5);
      .head {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: #ffffff;
        overflow: hidden;
      }
    }
    .ranking-now {
      margin-bottom: 8.5px;
      font-size: 20px;
      font-family: Source Han Sans SC;
      font-weight: 500;
      color: #FFE6CA;
      text-shadow: 0px 4px 0px rgba(193, 2, 11, 0.36);
    }
    .ss {
      font-size: 26px;
    }
    .s {
      font-size: 22px;
    }
    .disparity {
      margin-bottom: 22.5px;
      font-size: 16px;
      font-family: Source Han Sans SC;
      font-weight: 500;
      color: #FFE6CA;
      line-height: 18px;
      text-shadow: 0px 4px 0px rgba(193, 2, 11, 0.36);
    }
    .intensive-btn {
      position: relative;
      display: flex;
      justify-content: center;
      width: 117px;
      height: 43px;
      .intensive-btn-bg {
        position: absolute;
        z-index: 1;
      }
      .btn-text {
        line-height: 43px;
        text-align: center;
        font-size: 24px;
        font-family: Source Han Sans SC;
        font-weight: 500;
        color: #B90C0F;
        z-index: 2;
      }
    }
  }
}

.list-box {
  position: relative;
  top: -26px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(0deg, #BB141E 0%, #FC4F5F 100%);
  .list-title-box {
    position: relative;
    top: -28px;
    z-index: 2;
    width: 231.5px;
    height: 42.5px;
    .list-title {
      position: absolute;
      top: 0;
      width: 231.5px;
      height: 42.5px;
    }
    .list-title-text {
      position: absolute;
      top: 0;
      z-index: 99;
      width: 231.5px;
      height: 42.5px;
      font-size: 21px;
      font-family: Source Han Sans SC;
      font-weight: 500;
      color: #924501;
      line-height: 42.5px;
      text-align: center;
    }
  }

  .list-bg-box {
    position: relative;
    top: -36px;
    width: 357px;
    height: 760px;
    z-index: 1;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    overflow: hidden;
    .list-bg {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
    }
    .list-bg-content {
      position: absolute;
      top: 0;
      z-index: 99;
      width: 357px;
      height: 760px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .top-tips {
        margin-top: 30.5px;
        margin-bottom: 13px;
        font-size: 15px;
        font-family: Source Han Sans SC;
        font-weight: 500;
        color: #924501;
        opacity: 0.8;
      }
      .table-head {
        width: 340px;
        height: 30.5px;
        background: #FDEAD8;
        border-radius: 5px;
        font-size: 15px;
        font-family: Source Han Sans SC;
        font-weight: 500;
        color: #924501;
        line-height: 30.5px;
        display: flex;
        justify-content: center;
        margin-bottom: 5px;
        .two {
          margin-left: 46px;
          margin-right: 47px;
        }
        .three {
          margin-right: 42px;
        }
      }
      .ranking-list {
        width: 340px;
        .ranking-item {
          display: flex;
          justify-content: space-around;
          align-items: center;
          .user-pic-box2 {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 59.5px;
            height: 66px;
            .no1-b {
              width: 59.5px;
              height: 66px;
              background-size: 100%;
            }
            .user-head-pic {
              position: absolute;
              top: 15.5px;
              left: 7.5px;
              width: 48px;
              height: 48px;
              border-radius: 50%;
              overflow: hidden;
            }
            .num-box {
              position: absolute;
              top: 51.5px;
              width: 55px;
              height: 20px;
              font-size: 16px;
              font-family: DIN Alternate;
              font-weight: bold;
              color: #FFF5E6;
              text-shadow: 0px 3px 0px rgba(193, 2, 11, 0.36);
              text-align: center;
              line-height: 20px;
              background-size: 100%;
            }
          }
          .user-pic-box {
            position: relative;
            top: 6px;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 59.5px;
            .pic {
              width: 45px;
              height: 45px;
              border-radius: 50%;
              overflow: hidden;
            }
            .num {
              position: relative;
              top: -12px;
              z-index: 99;
              width: 40px;
              height: 16px;
              background: #924501;
              border: 1px solid #FFFFFF;
              border-radius: 8px;
              text-align: center;
              line-height: 16px;
              overflow: hidden;
              font-family: DIN Alternate;
              font-weight: bold;
              color: #FFF5E6;
              text-shadow: 0px 3px 0px rgba(193, 2, 11, 0.36);
              font-size: 12px;
              .number {
                font-size: 14px;
              }
            }
          }
          .user-name-box {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            font-size: 15px;
            font-family: Source Han Sans SC;
            font-weight: 500;
            color: #924501;
            .name {
              width: 90px;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
            }
            .phone {
              margin-top: 2px;
            }
          }
          .user-price {
            display: inline-block;
            width: 90px;
            text-align: center;
            font-size: 18px;
            color: #924501;
          }
          .user-bonus {
            display: inline-block;
            width: 50px;
            text-align: center;
            font-size: 20px;
            color: #CC000B;
          }
        }
        .ranking-item:nth-child(1),
        .ranking-item:nth-child(2),
        .ranking-item:nth-child(3) {
          margin-bottom: 6px;
        }
      }
    }
  }
}

.bottom-box {
  position: relative;
  top: -20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 357px;
  height: 320px;
  background: rgba(159, 2, 15, 0.48);
  border-radius: 5px;
  .title {
    padding-top: 18.5px;
    margin-bottom: 17px;
    font-size: 18px;
    font-family: Source Han Sans SC;
    font-weight: 500;
    color: #FFE6CA;
  }
  .detail {
    margin-bottom: 18.5px;
    width: 328px;
    height: 57px;
    font-size: 16px;
    font-family: Source Han Sans SC;
    font-weight: 400;
    color: #FFE6CA;
    line-height: 21px;
  }
  .welfare1 {
    margin-bottom: 21px;
    display: flex;
    justify-content: center;
  }
  .welfare2 {
    display: flex;
    justify-content: center;
  }
  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    .item-text {
      font-size: 15px;
      font-family: Source Han Sans SC;
      font-weight: 500;
      color: #FFE6CA;
      line-height: 18px;
    }
    .img-box {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 39.5px;
      height: 36px;
      overflow: hidden;
      margin-bottom: 6px;
    }
  }
  .item2 {
    margin-left: 35.5px;
    margin-right: 35.5px;
  }
  .item4 {
    margin-right: 25.5px;
  }
}

.popup-box {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.popup-title {
  position: relative;
  top: 8px;
  z-index: 99;
  width: 151.5px;
  height: 31.5px;
  line-height: 31.5px;
  text-align: center;
}
// .popup-title-img {
//   position: absolute;
//   top: 0;
// }
.popup-title-text {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  line-height: 31.5px;
  text-align: center;
}
.popup-content {
  // box-sizing: border-box;
  padding: 12px;
  width: 343px;
  height: 500px;
  background: #fff8ec;
  overflow: hidden;
  overflow-y: auto;
  text-align: justify;
  font-size: 16px;
  font-family: Source Han Sans SC;
  font-weight: 400;
  color: #924501;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  .text1 {
    line-height: 21px;
    margin-bottom: 17.5px;
  }
  .text2 {
    line-height: 22.5px;
    margin-bottom: 9px;
  }
  .text3 {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 315px;
    height: 60px;
    background: #FFF2E8;
    font-size: 16px;
    font-family: Source Han Sans SC;
    font-weight: 500;
    color: #924501;
    line-height: 18px;
    border: 1px solid #DEBEA2;
    .head1 {
      margin-left: 13.5px;
      margin-right: 29.5px;
      width: 64px;
      height: 33px;
      text-align: center;
    }
    .head2 {
      margin-right: 52.5px;
      width: 64px;
      height: 33px;
      text-align: center;
    }
    .head3 {
      width: 64px;
      height: 33px;
      text-align: center;
    }
  }
  .text4 {
    margin-bottom: 16.5px;
    display: flex;
    .left {
      width: 190px;
      height: 160px;
      display: flex;
      flex-direction: column;

      .left-item {
        width: 190px;
        height: 40px;
        display: flex;
        justify-content: space-around;
        border: 1px solid #DEBEA2;
        border-top: none;
        background-color: #FFF2E8;
        line-height: 40px;
        .sp1 {
          width: 68px;
          text-align: center;
        }
        .sp2 {
          width: 49px;
          text-align: center;
        }
      }
      .singular {
        background-color: #FFF8F2;
      }
    }
    .right {
      width: 125px;
      height: 160px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border: 1px solid #DEBEA2;
      border-top: none;
      border-left: none;
      font-size: 13px;
      font-family: Source Han Sans SC;
      font-weight: 500;
      color: #924501;
      line-height: 24px;
      background-color: #FFF8F2;
      .right-item {
        position: relative;
        width: 114px;
        text-align: center;
      }
      .right-item4::after {
        content: '·';
        position: absolute;
        top: 11px;
        left: 10px;
      }
      .right-item4::before {
        content: '·';
        position: absolute;
        top: 11px;
        right: 10px;
      }
    }
  }
  .text5 {
    margin-bottom: 17px;
  }
  .text6 {
    margin-bottom: 22.5px;
  }
  .text7 {
    margin-bottom: 17.5px;
  }
  .text8 {
    margin-bottom: 21px;
  }
  .text9 {
    margin-bottom: 19.5px;
  }
  .text10 {
    padding-bottom: 30px;
  }
}
.popup-close {
  margin-top: 50px;
}
</style>
