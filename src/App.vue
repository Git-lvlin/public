<template>
  <div id="app">
    <router-view />
    <!-- <keep-alive :include="/.*list.*/">
    </keep-alive> -->
  </div>
</template>

<script>
const {
  appInfo,
} = this.$store.state;
if (!window.WeixinJSBridge || !window.WeixinJSBridge.invoke) {
  document.addEventListener('WeixinJSBridgeReady', () => {
    if (window.__wxjs_environment === 'miniprogram') {
      appInfo.isMiniprogram = true;
    } else {
      appInfo.isMiniprogram = false;
    }
    this.$store.commit("updateAppInfo", appInfo); 
  }, false);
}

</script>

<style lang="scss">
@import "~@/style/common.scss";
</style>
