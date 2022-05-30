<template>
  <div class="rule">
    <textarea class="t" readonly v-model="ruleText"></textarea>
  </div>
</template>

<script>
import commonApi from '@/apis/common';
export default {
  data() {
    return {
      ruleText: null,
    };
  },
  created() {
  },
  mounted() {
    const {
      query,
    } = this.$router.history.current;
    const param = {
      activityId: query.activityId,
      spuId: query.spuId,
      skuId: query.skuId,
    }
    this.getR(param)
  },
  methods: {
    getR(param) {
      commonApi.getRule(param).then(res=> {
        if (res.code == 0) {
          this.ruleText = res.data
        }
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.rule {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #ffffff;

  font-size: 13px;
  font-weight: 400;
  color: #666666;
  line-height: 19px;
}
.t {
  width: 100%;
  min-height: 100vh;
  border: none;
  padding: 20px 16px;
  text-align: justify;
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #666666;
  line-height: 22px;
  overflow: hidden;
  overflow-y: auto;
}
</style>
