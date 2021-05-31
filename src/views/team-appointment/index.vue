<template>
  <div
    class="team_appointment"
  >
    <div class="flex_fix">
      <NavBar title="团约专享" />
    </div>
    <img
      class="back_img flex_fix"
      :src="getImgUrl('publicMobile/together/activity_back.png')"
    />
    <div class="container">
      <SeparateLine title="正在疯抢" />
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="goods_list">
          <TeamItem />
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import { Image, List } from 'vant';
import { getImgUrl } from '@/utils/tools';
import NavBar from '@/components/navbar';
import TeamItem from '@/components/team-item';
import SeparateLine from '@/components/separate-line';
import teamApi from '@/apis/appointment';

export default {
  data() {
    return {
      loading: false,
      finished: true,
    };
  },
  components: {
    NavBar,
    TeamItem,
    SeparateLine,
    [Image.name]: Image,
    [List.name]: List,
  },
  mounted () {
    // 不推荐在这里调用 fetchItem
    console.log(234234234234234);
    teamApi.getTeamList({
      page: 1,
      size: 10,
    }).then((res) => {
      console.log('sdfsd', res);
    });
  },
  methods: {
    getImgUrl,
    onLoad() {
      console.log(2344234234);
    },
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

  .team_appointment {
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
  .goods_list {
    padding: 0 12px;
  }
</style>
