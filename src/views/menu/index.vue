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
