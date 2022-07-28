<template>
  <div class="page">
    <div id="demo"></div>
  </div>
</template>

<script>
import Pdfh5 from "pdfh5";
import "pdfh5/css/pdfh5.css";
export default {
  mounted() {
    this.pdfh5 = new Pdfh5("#demo", {
      backTop: false,
      pageNum: false,
      pdfurl: 'https://pro-yeahgo-oss.yeahgo.com/publicMobile/make-money/pdf.pdf'
    })
  },
};
</script>

<style lang="scss" scoped>

.page {
  background: #fff;
  height: 100vh;
  overflow: hidden;
}

#demo {
  height: 100vh;
}
</style>
