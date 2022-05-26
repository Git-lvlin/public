<template>
  <div class="page">
    <div id="demo"></div>
    <div class="bottom_confirm">
      <div class="comfirm_btn" @click="confirm">同意确认并支付电子合同款</div>
    </div>
  </div>
</template>

<script>
import Pdfh5 from "pdfh5";
import "pdfh5/css/pdfh5.css";
export default {
  data() {
    return {
      pdfh5: null,
    }
  },
  mounted() {
    this.pdfh5 = new Pdfh5("#demo", {
      backTop: false,
      pageNum: false,
      pdfurl: this.$route.query.url
    })
  },
  methods: {
    confirm() {
      wx.miniProgram.navigateTo({
        url: `/subpages/fadada/cashier/index?contractId=${this.$route.query.contractId}`
      })
    }
  }
}
</script>
<style scoped lang="scss">
.page {
  background: #fff;
  height: 100vh;
  overflow: hidden;
}

#demo {
  height: 100vh;
  padding-bottom: 80px;
}

.bottom_confirm {
  width: 343px;
  height: 48px;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}

.comfirm_btn {
  position: fixed;
  bottom: calc(constant(safe-area-inset-bottom) + 20px);
  bottom: calc(env(safe-area-inset-bottom) + 20px);
  left: 16px;
  width: 343px;
  height: 48px;
  font-weight: 600;
  color: #ffffff;
  font-size: 16px;
  line-height: 48px;
  text-align: center;
  background-color: #e5352f;
  border-radius: 16px;
  box-shadow: 0px 6px 12px rgba(229, 53, 47, 0.4);
}
</style>