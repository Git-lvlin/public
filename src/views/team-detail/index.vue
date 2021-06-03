<template>
  <div
    class="user_detail"
  >
    <div class="flex_fix">
      <nav-bar title="团约专享" :share="true" :shareObj="shareObj" />
    </div>
    <img
      class="back_img flex_fix"
      :src="getImgUrl('publicMobile/together/activity_back.png')"
    />
    <div class="container">
      <div class="team_detail_title">戴尔笔记本团约 今日疯抢中</div>
      <div class="flex_center end_time">
        <div class="end_time_text">距结束</div>
        <count-down :time="good.endTime" block />
      </div>
      <panle :good="good" />
    </div>
  </div>
</template>

<script>
import { Image, List } from 'vant';
import { getImgUrl } from '@/utils/tools';
import NavBar from '@/components/navbar';
import CountDown from '@/components/count-down';
import teamApi from '@/apis/appointment';
import Panle from './components/panle';

export default {
  data() {
    return {
      loading: false,
      finished: true,
      good: {},
      shareObj: {},
    };
  },
  components: {
    NavBar,
    CountDown,
    Panle,
    [Image.name]: Image,
    [List.name]: List,
  },
  mounted() {
    const {
      query,
    } = this.$router.history.current;
    teamApi.getTeamDetail(query).then((res) => {
      if (res.code === 0) {
        const good = res.data.curGoods;
        this.good = good;
        this.shareObj = {
          shareObjectNo: good.spuId,
          shareParams: {
            activityId: good.activityId,
            spuId: good.spuId,
            skuId: good.skuId,
            orderType: good.orderType,
            objectId: good.objectId,
            wsId: good.wsId,
          },
        }
      }
    });
  },
  methods: {
    getImgUrl,
  },
};
</script>

<style lang="scss" scoped>
.van-nav-bar {
  background-color: transparent;
  box-shadow: none;
}
.van-hairline--bottom::after {
  border-bottom-width: 0;
}

.user_detail {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #CE1E27;
}
.back_img {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
  width: 375px;
  height: 210px;
}
.container {
  position: relative;
  z-index: 1;
  flex: 1;
  overflow: hidden;
}
.team_detail_title {
  text-shadow: 0 2px 2px rgba(112, 20, 18, 0.31);
  font-weight: 600;
  color: #fff2d0;
  font-size: 22px;
  line-height: 30px;
  text-align: center;
  margin: 16px;
}
.end_time {
  width: 160px;
  height: 30px;
  margin: 0 auto 12px;
  background-color: #9a1613;
  border-radius: 15px;
}
.end_time_text {
  font-weight: 600;
  color: #ffffff;
  font-size: 14px;
  line-height: 20px;
  margin-right: 4px;
}
</style>
