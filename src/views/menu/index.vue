<template>
  <div
    id="menu"
  >
    <van-cell-group>
      <van-cell
        title="单约列表"
        is-link
        url="/user-appointment"
      />
      <van-cell
        title="团约列表"
        is-link
        url="/team-appointment"
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
