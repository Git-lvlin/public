<template>
  <div class="withdrawal-list">
    <List
      :finished="listFinished"
      style="padding: 12px 0;"
      @load="handleBottom"
      :offset="0"
    >
      <div class="content-box">
        <div class="list" v-for="item in list" >
          <div class="item" @click="onToDetail(item)">
            <img
              class="avatar flex-fix"
              :src="userInfo.icon || defAvatar"
            />
            <div class="user-info">
              <div class="info-title">账户提现-支付宝</div>
              <div class="item-time">{{Dayjs(item.createTime).format('MM月DD日 HH:mm')}}</div>
            </div>
            <div class="price flex-fix">¥{{parseFloat(+item.amount / 100).toFixed(2)}}</div>
          </div>
        </div>
        <!-- 空数据 -->
        <div class="nodata" v-if="list.length == 0">
          <NoData
            icon="content"
            title="暂无提现记录~"
          />
        </div>
        <!-- <div class="desc">
          仅展示所选月份交易数据，查看更多请选择时间
        </div> -->
      </div>
    </List>
  </div>
</template>

<script>
import { List } from 'vant';
import Dayjs from 'dayjs';
import { getImgUrl, objToParamStr } from '@/utils/tools';
import gameApi from '@/apis/game';
import NoData from '@/components/nodata'
import { meBaseUrl } from "@/constant/index";
import { goToApp, backOff } from '@/utils/userInfo';

let defToken = 'AQQAAAAAYfGMBhO1r6h85uACdaberb2ahlPFSv7KDBSE6JBgxdLkvYpcDoWnCKpMd4o=';
const defPage = {
  next: 0,
  size: 20,
  hasNext: false,
};

export default {
  data() {
    return {
      activityId: '',
      token: '',
      defAvatar: getImgUrl('publicMobile/common/default_avatar.png'),
      userInfo: {},
      pageData: {
        ...defPage,
      },
      list: [],
    };
  },
  components: {
    List,
    NoData,
  },
  mounted () {
    let {
      at: token,
      bid: activityId,
    } = this.$router.history.current.query;
    this.token = token;
    this.activityId = activityId;
    this.$bridge.callHandler('getUserInfo',{},(res) => {
      const d = JSON.parse(res);
      this.userInfo = d.data;
    })
    if(!token) {
      backOff();
      return;
    }
    this.getWithdrawList(true);
  },
  methods: {
    Dayjs,
    getImgUrl,
    // 获取提现列表
    getWithdrawList(frist) {
      gameApi.getWithdrawList({
        activityId: this.activityId,
        date: '',
        next: this.pageData.next,
        size: this.pageData.size,
      }, {
        token: this.token,
        showLoading: false,
      }).then(res => {
        if(res.code == 0) {
          const data = res.data;
          this.pageData.hasNext = data.hasNext;
          this.pageData.next = data.next;
          if(!data.hasNext) {
            this.listFinished = true;
          }
          if(frist) {
            this.list = data.records;
          } else {
            this.list = this.list.concat(data.records);
          }
        }
      });
    },
    handleBottom() {
      if(this.pageData.hasNext) {
        this.getWithdrawList();
      }
    },
    onToDetail(item) {
      if(!item.sn) {
        return ;
      }
      const str = objToParamStr(item);
      const path = `/web/game-withdrawal-list?_immersive=0&${str}`
      goToApp(meBaseUrl, path);
      // this.$router.push({
      //   path: '/web/game-withdrawal-detail',
      //   query: {
      //     ...item,
      //   },
      // });
    },
  },
};
</script>

<style lang="scss" scoped>
  .withdrawal-list {
    height: 100vh;
    padding: 0 12px;
    background-color: rgba(249, 249, 249, 1);
    overflow: auto;
  }
  .content-box {
    min-height: 100%;
    padding: 15px;
    background-color: #fff;
    border-radius: 10px;
  }
  .flex-fix {
    flex-grow: 0;
    flex-shrink: 0;
  }
  .nodata {
    padding-bottom: 80px;
  }
  .list {
    height: 70px;
    padding-left: 13px;
    padding-right: 16px;
    margin-bottom: 5px;
    background-color: rgba(249, 249, 249, 1);
    border-radius: 10px;
  }
  .item {
    display: flex;
    align-items: center;
    height: 100%;
  }
  .avatar {
    width: 32px;
    height: 32px;
    margin-top: 5px;
  }
  .user-info {
    flex: 1;
    height: 46px;
    margin-left: 10px;
  }
  .info-title {
    color: rgba(90, 90, 90, 1);
    font-size: 15px;
    line-height: 21px;
    white-space: nowrap;
    margin-left: 2px;
  }
  .item-time {
    color: rgba(153, 153, 153, 1);
    font-size: 14px;
    line-height: 20px;
    margin-top: 5px;
  }
  .price {
    color: rgba(255, 135, 24, 1);
    font-size: 15px;
    text-align: center;
    line-height: 17px;
  }
  
  .desc {
    color: rgba(153, 153, 153, 1);
    font-size: 15px;
    line-height: 21px;
    margin: 20px 0 0 2px;
  }
</style>
