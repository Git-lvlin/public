<template>
  <van-count-down :time="time" format="HH:mm:ss">
    <template #default="timeData">
      <div
        :class="block ? 'box' : ''"
        :style="{ 'color': color, 'fontSize': fontSize, 'lineHeight': fontSize }"
      >
        <span class="block">{{ formatNum(timeData.hours) }}</span>
        <span class="colon">:</span>
        <span class="block">{{ formatNum(timeData.minutes) }}</span>
        <span class="colon">:</span>
        <span class="block">{{ formatNum(timeData.seconds) }}</span>
      </div>
    </template>
  </van-count-down>
</template>

<script>
import { CountDown } from 'vant';

export default {
  props: {
    time: {
      type: Number,
      default: 100,
    },
    color: {
      type: String,
      default: '#333',
    },
    fontSize: {
      type: String,
      default: '14px',
    },
    block: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      timeqwewqe: 30 * 60 * 60 * 60,
    };
  },
  components: {
    [CountDown.name]: CountDown,
  },
  methods: {
    formatNum(num) {
      return num < 10 ? `0${num}` : num;
    },
  },
};
</script>

<style>
.box .colon {
  font-weight: bold;
  color: #ffffff;
}
.box .block {
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 20px;
  font-weight: 600;
  color: #9a1613;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  background-color: #ffffff;
  border-radius: 3px;
}
</style>
