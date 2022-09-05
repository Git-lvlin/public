<template>
  <div class="page">
    <div id="demo"></div>
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
}

</style>