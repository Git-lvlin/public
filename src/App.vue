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
      }, false);
    } else {
      appInfo.isMiniprogram = true;
    }
    this.$store.commit("updateAppInfo", appInfo);
    console.log("mounted ~ this.$store", this)
  },
}
</script>

<style lang="scss">
@import "~@/style/common.scss";
</style>
