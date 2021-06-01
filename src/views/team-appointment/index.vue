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
        offset=0
        :immediate-check="false"
        finished-text="没有更多商品"
        @load="onBottomReach"
      >
        <div class="goods_list">
          <TeamItem
            v-for="item in teamList"
            :key="item.skuId"
            :good="item"
          />
        </div>
        <template #finished>
          <SeparateLine title="没有更多商品" />
        </template>
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
      finished: false,
      page: 1,
      size: 2,
      totalPage: 1,
      teamList: [],
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
    this.getTeamList();
  },
  methods: {
    getImgUrl,
    getTeamList() {
      const {
        page,
        size,
      } = this;
      this.loading = true;
      teamApi.getTeamList({
        page,
        size,
      }).then((res) => {
        const {
          data,
        } = res;
        if (data && data.records) {
          this.totalPage = data.totalPage;
          if (page < 2) {
            this.teamList = data.records;
          } else {
            this.teamList = this.teamList.concat(data.records);
          }
          if (data.records.length < this.size) {
            this.finished = true;
          }
        }
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      });
    },
    onBottomReach() {
      if (this.totalPage > this.page) {
        this.page += 1;
        this.getTeamList();
      }
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
    height: 100vh;
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
    overflow-y: auto;
  }
  .goods_list {
    padding: 0 12px;
  }
</style>
