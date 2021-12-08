<template>
  <div class="shop-pk">
      <van-image
        class="bg"
        width="100%"
        height="100%"
        :src="getImgUrl('publicMobile/shopkeeperpk/banner.png')"
      />
    <div class="top-box">

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
</template>

<script>
import Vue from "vue";
import { Image as VanImage } from "vant";
import { getImgUrl } from "@/utils/tools";
import { appBaseUrl, meBaseUrl } from "@/constant/index";
import { goToApp, judgeVersionIsNew } from "@/utils/userInfo";
Vue.use(VanImage);
export default {
  data() {
    return {
    };
  },
  components: {},
  created() {
  },
  mounted() {
  },
  methods: {
    getImgUrl,
  },
};
</script>

<style lang="scss" scoped>
.shop-pk {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(0deg, #BB141E 0%, #FC4F5F 100%);
}

.bottom-box {
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
</style>
