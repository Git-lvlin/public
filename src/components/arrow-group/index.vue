<template>
  <div
    class="arrow-group-wrap"
    :class="{'active': value!==0}"
    @click="click"
  >
    <div class="title">{{title}}</div>
    <div
      class="arrow-group"
      :class="{'vertical':direction==='vertical'}"
    >
      <template v-if="direction==='horizontal'">
        <van-icon
          name="arrow-left"
          :color="value === 1?'red':''"
        />
        <van-icon
          name="arrow"
          :color="value === 2?'red':''"
        />
      </template>
      <template v-if="direction==='vertical'">
        <van-icon
          name="arrow-up"
          :color="value === 1?'red':''"
        />
        <van-icon
          name="arrow-down"
          :color="value === 2?'red':''"
        />
      </template>
    </div>
  </div>
</template>

<script>
import { Icon } from 'vant';

export default {
  props: {
    title: {
      type: String,
    },
    direction: {
      type: String,
      default: 'vertical',
      validator(value) {
        return ['vertical', 'horizontal'].indexOf(value) !== -1;
      },
    },
    value: {
      type: Number,
      default: 0,
    },
  },
  components: {
    [Icon.name]: Icon,
  },
  methods: {
    click() {
      let { value } = this;

      if (value === 0) {
        value = 1;
      } else if (value === 1) {
        value = 2;
      } else if (value === 2) {
        value = 1;
      }
      this.$emit('input', value);
      this.$emit('click', value);
    },
  },
};
</script>

<style lang="scss" scoped>
.arrow-group-wrap {
  display: inline-flex;
  align-items: center;

  &.active .title {
    color: red;
  }

}
.arrow-group {
  display: inline-flex;
  &.vertical {
    flex-direction: column;
  }

  ::v-deep .van-icon-arrow-up {
    position: relative;
    top: 3px;
  }

  ::v-deep .van-icon-arrow-down {
    position: relative;
    top: -3px;
  }
}
</style>
