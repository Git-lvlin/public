<template>
  <div
    id="menu"
  >
    <van-cell-group>
      <van-cell
        title="单约专享"
        is-link
        to="/web/user-appointment"
      />
      <van-cell
        title="团约专享"
        is-link
        to="/web/team-appointment"
      />
      <van-cell
        title="比价优选"
        is-link
        to="/web/price-comparsion"
      />
      <van-cell
        title="社区店入驻"
        is-link
        to="/web/store-in"
      />
      <van-cell
        title="会员约购专享"
        is-link
        to="/web/special"
      />
      <van-cell
        title="领券中心"
        is-link
        to="/web/coupon"
      />
      <van-cell
        title="新人专享"
        is-link
        to="/web/exclusive-for-novices"
      />
      <van-cell
        title="分享页"
        is-link
        to="/web/share"
      />
      <van-cell
        title="邀请好友"
        is-link
        to="/web/invitation"
      />
      <van-cell
        title="营销资源落地页面"
        is-link
        to="/web/market"
      />
      <van-cell
        title="协议"
        is-link
        to="/web/agreement"
      />
      <van-cell
        title="盲盒"
        is-link
        to="/web/bind-box"
      />
      <van-cell
        title="我的奖品"
        is-link
        to="/web/my-prize"
      />
      <van-cell
        title="资质证照"
        is-link
        to="/web/license"
      />
      <van-cell
        title="资质证照"
        is-link
        to="/web/license-pc"
      />
      <van-cell
        title="天天领红包"
        is-link
        to="/web/every-day"
      />
      <van-cell
        title="五星店主"
        is-link
        to="/web/five-star-qa"
      />
      <van-cell
        title="五星店主限时抢"
        is-link
        to="/web/five-star"
      />
      <van-cell
        title="邀请列表"
        is-link
        to="/web/invitation-list"
      />
      <van-cell
        title="参与记录"
        is-link
        to="/web/partake-list"
      />
      <van-cell
        title="开店记录"
        is-link
        to="/web/open-shop-list"
      />
      <van-cell
        title="约购APP"
        is-link
        to="/web/new-share"
      />
      <van-cell
        title="404"
        is-link
        to="/web/404"
      />
    </van-cell-group>
  </div>
</template>

<script>
import { Cell, CellGroup } from 'vant';

export default {
  data() {
    return {
      innerHeight: window.innerHeight,
    };
  },
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
  },
};
</script>

<style lang="scss" scoped>
#menu {
  padding: 40px 0;
}
</style>
