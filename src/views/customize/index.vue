<template>
  <div v-if="customizeData">
    <div :class="`banner ${contentData.bannerTime.xL}${contentData.bannerTime.yL}`">
      <img :src="contentData.bannerImgUrl" />
      <div class="count-down" v-if="contentData.bannerTime.switch && customizeData.time < customizeData.endTime"
        :style="`margin-left:${contentData.bannerTime.edgeDistance.l * scale}px;margin-right:${contentData.bannerTime.edgeDistance.r * scale}px;margin-top:${contentData.bannerTime.edgeDistance.t * scale}px;margin-bottom:${contentData.bannerTime.edgeDistance.b * scale}px;background-color:rgba(${hslToRgb(contentData.bannerTime.alphaMasked)},0.2);`">
        距{{ customizeData.time > customizeData.startTime ? '结束' : '开始' }}
        <van-count-down :time="time" @finish="timeFinish">
          <template #default="timeData">
            <span class="block">{{ timeData.days }}</span>
            <span class="colon">天</span>
            <span class="block">{{ timeData.hours }}</span>
            <span class="colon">时</span>
            <span class="block">{{ timeData.minutes }}</span>
            <span class="colon">分</span>
            <span class="block">{{ timeData.seconds }}</span>
            <span class="colon">秒</span>
          </template>
        </van-count-down>
      </div>
    </div>
    <div class="sub-image" v-if="contentData.subImage.switch">
      <img :src="contentData.subImage.imgUrl" :style="`width:${getSize(contentData.subImage.imgUrl).width}px`" />
    </div>

    <div :class="`goods-list${contentData.goodsCards.showType}`">
      <div class="goods-item" v-for="g in contentData.goods" :key="g.spuId" @click="onToDetail(g)"
        :style="`background-color: ${contentData.goodsCards.background.color}; background-image:url(${contentData.goodsCards.background.imgUrl});background-size:${getSize(contentData.goodsCards.background.imgUrl).width}px ${getSize(contentData.goodsCards.background.imgUrl).height}px; border-radius: ${contentData.goodsCards.radius * scale}px; border: ${borderLineWidth}px solid ${borderLineColor}`">
        <div class="img"
          :style="`border-radius: ${contentData.goodsCards.goodsRadius * scale}px;border: ${goodsBorderLineWidth}px solid ${goodsBorderLineColor}`">
          <img :src="g.imageUrl">
        </div>
        <div class="info">
          <div>
            <div class="title van-multi-ellipsis--l2"
              :style="`font-size: ${contentData.goodsCards.textStyle.fontSize * scale}px; color:${contentData.goodsCards.textStyle.color}`">
              {{ g.goodsName }}
            </div>
            <div class="label">
              即将恢复¥{{ g.salePrice / 100 }}
            </div>
          </div>
          <div class="price">
            <div class="price1">
              活动价 <span>¥{{ g.actPrice / 100 }} </span>
            </div>
            <div class="price2">
              市场价: <span>¥{{ g.marketPrice / 100 }} </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="goods-list2">
      <div class="goods-item" v-for="g in contentData.goods" :key="g.spuId"
        :style="`background-color: ${contentData.goodsCards.background.color}; background-image:url(${contentData.goodsCards.background.imgUrl});background-size:${getSize(contentData.goodsCards.background.imgUrl).width}px ${getSize(contentData.goodsCards.background.imgUrl).height}px; border-radius: ${contentData.radius * scale}px;`">
        <div class="img"
          :style="`border-radius: ${contentData.goodsCards.goodsRadius * scale}px;border: ${goodsBorderLineWidth * scale}px solid ${goodsBorderLineColor}`">
          <img :src="g.imageUrl">
        </div>
        <div class="info">
          <div>
            <div class="title van-multi-ellipsis--l2"
              :style="`font-size: ${contentData.goodsCards.textStyle.fontSize * scale}px; color:${contentData.goodsCards.textStyle.color}`">
              {{ g.goodsName }}
            </div>
            <div class="label">
              即将恢复¥{{ g.salePrice / 100 }}
            </div>
          </div>
          <div class="price">
            <div class="price1">
              活动价 <span>¥{{ g.actPrice / 100 }} </span>
            </div>
            <div class="price2">
              市场价: <span>¥{{ g.marketPrice / 100 }} </span>
            </div>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import Vue from "vue";
import { CountDown } from 'vant';
import { getImgUrl } from "@/utils/tools";
import { appBaseUrl, meBaseUrl } from "@/constant/index";
import { goToApp } from "@/utils/userInfo";
import api from '@/apis/customize';
import qs from 'qs';

export default {
  data() {
    return {
      customizeData: null,
      contentData: {},
      time: 0,
      scale: window.innerWidth / 375,
      goodsBorderLineWidth: 0,
      goodsBorderLineColor: '#fff',
      borderLineWidth: 0,
      borderLineColor: '#fff',
    };
  },
  components: {
    [CountDown.name]: CountDown,
  },
  created() {
    this.getList()
  },
  methods: {
    getImgUrl,
    hslToRgb: (sColor) => {
      var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
      if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
          var sColorNew = "#";
          for (var i = 1; i < 4; i += 1) {
            sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
          }
          sColor = sColorNew;
        }
        var sColorChange = [];
        for (var i = 1; i < 7; i += 2) {
          sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
        }
        return sColorChange.join(",");
      }
      return sColor;
    },
    timeFinish() {
      this.getList();
    },
    onToDetail(item) {
      if (this.clicked) {
        return
      }
      this.clicked = true
      let time = setTimeout(() => {
        clearTimeout(time)
        this.clicked = false
      }, 1000)
      console.log('item', item)
      const { orderType, spuId, objectId, activityId, skuId, wsId } = item;
      const paramStr = `?orderType=${orderType || 3}&spuId=${spuId || ''}&objectId=${objectId || ''}&activityId=${activityId || ''}&skuId=${skuId || ''}&wsId=${wsId || ''}`
      if (this.$store.state.appInfo.isApp) {
        goToApp(appBaseUrl, '/shopping/detail', paramStr)
      } else if (this.$store.state.appInfo.isMiniprogram) {
        wx.miniProgram.navigateTo({
          url: `/subpages/cart/detail/index${paramStr}`
        })
      } else {
        console.log('不是App内')
      }
    },
    getList() {
      api.getSubjectActivityInfo({ size: 9999, id: this.$route.query.id }).then(res => {
        document.title = res.data.name
        this.customizeData = res.data
        this.contentData = this.customizeData.content
        if (this.contentData.bannerTime.switch) {
          if (this.customizeData.time < this.customizeData.startTime) {
            this.time = (this.customizeData.startTime - this.customizeData.time) * 1000
          } else {
            this.time = (this.customizeData.endTime - this.customizeData.time) * 1000
          }
        }
        const goodsBorder = this.contentData.goodsCards.goodsBorder
        const border = this.contentData.goodsCards.border
        if (border) {
          this.borderLineWidth = border.lineWidth * this.scale
          this.borderLineColor = border.color
        }
        if (goodsBorder) {
          this.goodsBorderLineWidth = goodsBorder.lineWidth * this.scale
          this.goodsBorderLineColor = goodsBorder.color
        }
      })
    },
    getSize(url) {
      return {
        width: qs.parse(url.split('?')[1]).imgWidth / 2 * this.scale,
        height: qs.parse(url.split('?')[1]).imgHeight / 2 * this.scale
      }
    },
  },
};
</script>
<style>
.MM {
  justify-content: center;
  align-items: center;
}

.MB {
  justify-content: center;
  align-items: flex-end;
}

.MT {
  justify-content: center;
  align-items: flex-start;
}

.LM {
  justify-content: flex-start;
  align-items: center;
}

.RM {
  justify-content: flex-end;
  align-items: center;
}

.LT {
  justify-content: flex-start;
  align-items: flex-start;
}

.LB {
  justify-content: flex-start;
  align-items: flex-end;
}

.RT {
  justify-content: flex-end;
  align-items: flex-start;
}

.RB {
  justify-content: flex-end;
  align-items: flex-end;
}
</style>
<style lang="scss" scoped>
.banner {
  min-height: 50px;
  position: relative;
  display: flex;

  img {
    width: 100%;
  }

  .count-down {
    height: 30px;
    background: rgba(#090909, 0.2);
    border-radius: 15px;
    position: absolute;
    // top: 50%;
    // left: 50%;
    // transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    padding: 0 10px;
    color: #fff;
    font-size: 18px;
    white-space: nowrap;

    span {
      color: #fff;
      font-size: 18px;
      line-height: normal;
    }

    .block {
      min-width: 21px;
      line-height: 20px;
      background: #FFFFFF;
      border-radius: 2px;
      font-size: 15px;
      font-weight: 400;
      color: #151515;
      display: inline-block;
      text-align: center;
      margin: 0 3px;
    }
  }
}

.sub-image {
  margin-top: 20px;
  text-align: center;
  width: 100%;
  overflow: hidden;
  text-align: center;
}

.goods-list1 {
  margin-top: 20px;
  padding: 0 12px;

  .goods-item {
    height: 124px;
    width: 100%;
    padding: 12px;
    background-color: #fff;
    border-radius: 8px;
    margin-bottom: 8px;
    display: flex;
    box-sizing: border-box;
    background-repeat: no-repeat;

    .img {
      width: 100px;
      height: 100px;
      overflow: hidden;
      margin-right: 12px;
      flex-shrink: 0;

      img {
        width: 100%;
      }
    }

    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .label {
      font-size: 10px;
      font-weight: 400;
      color: #FF3C3E;
      background: #FEF5F6;
      border-radius: 3px;
      border: 1px solid #F9C9CA;
      display: inline-block;
      padding: 2px 4px;
      margin-top: 5px;
    }

    .price1 {
      font-size: 14px;
      font-weight: 400;
      color: #E7532C;

      span {
        font-size: 16px;
        font-weight: 600;
        color: #FD0E01;
      }
    }

    .price2 {
      font-size: 12px;
      font-weight: 400;
      color: #666666;

      span {
        text-decoration: line-through;
      }
    }
  }
}

.goods-list2 {
  margin-top: 20px;
  padding: 0 12px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .goods-item {
    height: 294px;
    width: 49%;
    background: #fff;
    border-radius: 8px;
    margin-bottom: 8px;
    box-sizing: border-box;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;

    .img {
      width: 100%;
      height: 170px;
      overflow: hidden;
      margin-bottom: 12px;
      flex-shrink: 0;

      img {
        width: 100%;
      }
    }

    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 0 8px 8px;
      flex: 1;
    }

    .label {
      font-size: 10px;
      font-weight: 400;
      color: #FF3C3E;
      background: #FEF5F6;
      border-radius: 3px;
      border: 1px solid #F9C9CA;
      display: inline-block;
      padding: 2px 4px;
      margin-top: 5px;
    }

    .price1 {
      font-size: 14px;
      font-weight: 400;
      color: #E7532C;

      span {
        font-size: 16px;
        font-weight: 600;
        color: #FD0E01;
      }
    }

    .price2 {
      font-size: 12px;
      font-weight: 400;
      color: #666666;

      span {
        text-decoration: line-through;
      }
    }
  }
}
</style>
