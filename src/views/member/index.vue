<template>
  <div id="member">
    <div class="top">
      <div class="user-all-msg">
        <div class="user-msg">
          <div class="avatar">
            <img src="https://static.bingou.com.cn/uploads/home/common/default_user_portrait.png" />
          </div>
          <div class="nick-name">13688888888</div>
          <div class="qrcode"><img src="https://bingou.com.cn/static/h5/img/icon_erweima.png" /></div>
        </div>
        <div class="msg-list">
          <div class="unit">
            <p>0</p>
            <span>我的积分</span>
          </div>
          <div class="unit">
            <p>0</p>
            <span>我的积分</span>
          </div>
        </div>
      </div>
    </div>
    <div class="vip-area">
      成为会员 优惠更多
    </div>
    <div class="content-wrap">
      <div class="box">
        <van-cell
          title="我的订单"
          is-link
          value="全部订单"
        />
        <van-grid
          :column-num="5"
          :border="false"
        >
          <van-grid-item
            v-for="item in orderData"
            :key="item.text"
            :icon="item.imgUrl"
            :text="item.text"
          />
        </van-grid>
      </div>
      <div class="box">
        <van-grid
          :column-num="4"
          :border="false"
        >
          <van-grid-item
            v-for="item in optionData"
            :key="item.text"
            :icon="item.imgUrl"
            :text="item.text"
          />
        </van-grid>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Cell, Grid, GridItem,
} from 'vant';

export default {
  components: {
    [Cell.name]: Cell,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
  },
  data() {
    return {
      orderData: [
        {
          imgUrl: 'https://bingou.com.cn/static/h5/img/icon_daifukuan.png',
          text: '待付款',
        },
        {
          imgUrl: 'https://bingou.com.cn/static/h5/img/icon_invite.png',
          text: '待邀请',
        },
        {
          imgUrl: 'https://bingou.com.cn/static/h5/img/icon_daifahuo.png',
          text: '待发货',
        },
        {
          imgUrl: 'https://bingou.com.cn/static/h5/img/icon_daishouhuo.png',
          text: '待收货',
        },
        {
          imgUrl: 'https://bingou.com.cn/static/h5/img/icon_shouhou.png',
          text: '售后',
        },
      ],
      optionData: [
        {
          imgUrl: 'https://bingou.com.cn/static/h5/img/icon_kaidian.png',
          text: '成为合作伙伴',
        },
        {
          imgUrl: 'https://bingou.com.cn/static/h5/img/img.1.0.5/icon_add.png',
          text: '收货地址',
        },
        {
          imgUrl: 'https://bingou.com.cn/static/h5/img/icon_integral.png',
          text: '积分专区',
        },
        {
          imgUrl: 'https://bingou.com.cn/static/h5/img/icon_discount.png',
          text: '我的优惠券',
        },
        {
          imgUrl:
            'https://bingou.com.cn/static/h5/img/img.1.0.5/icon_invite.png',
          text: '我要推广',
        },
        {
          imgUrl:
            'https://bingou.com.cn/static/h5/img/img.1.0.6/icon_service.png',
          text: '联系客服',
        },
        {
          imgUrl:
            'https://bingou.com.cn/static/h5/img/img.1.0.6/icon_clear.png',
          text: '清除缓存',
        },
        {
          imgUrl: 'https://bingou.com.cn/static/h5/img/img.1.0.6/icon_out.png',
          text: '退出登录',
        },
      ],
    };
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
.user-all-msg {
  background-image: linear-gradient(90deg, #fa7c76, #ee3b47);
  padding: 12px;

  .user-msg {
    display: flex;
    align-items: center;
  }

  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
    }
  }

  .nick-name {
    font-size: 18px;
    color: #fff;
    margin: 0 10px;
  }

  .qrcode {
    margin-left: 20px;
    img {
      width: 20px;
    }
  }

  .msg-list {
    font-size: 13px;
    color: #fff;
    display: flex;
    justify-content: center;
    margin-top: 20px;

    .unit {
      text-align: center;
      margin: 0 10px;
    }
  }
}
.vip-area {
  width: 100%;
  height: 48px;
  background: url(https://bingou.com.cn/static/h5/img/img.1.0.5/VIP_bg.png) no-repeat;
  background-size: 100% 100%;
  text-align: center;
  color: #333;
  padding-top: 20px;
  font-size: 14px;
}

.content-wrap {
  padding: 15px;
}

.box {
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 10px;
}

#member {
  ::v-deep.van-grid-item__content {
    padding-left: 0;
    padding-right: 0;
  }
}
</style>
