<template>
  <div id="app">
    <router-view />
    <!-- <keep-alive :include="/.*list.*/">
    </keep-alive> -->
  </div>
</template>

<script>
export default {
  mounted() {
    const {
      appInfo,
    } = this.$store.state;
    console.log("mounted ~ window", window.WeixinJSBridge)
    if (!window.WeixinJSBridge || !window.WeixinJSBridge.invoke) {
      console.log("spet 2");
      document.addEventListener('WeixinJSBridgeReady', () => {
      console.log("spet 3");
        if (window.__wxjs_environment === 'miniprogram') {
          appInfo.isMiniprogram = true;
        } else {
          appInfo.isMiniprogram = false;
        }
        this.$store.commit("updateAppInfo", appInfo);
        console.log("mounted ~ this.$store", this)
      }, false);
    }
    console.log("spet 4");
  },
}
</script>

<style lang="scss">
@import "~@/style/common.scss";
</style>
