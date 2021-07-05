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
        to="/price-comparsion"
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
