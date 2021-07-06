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
    if (!window.WeixinJSBridge || !window.WeixinJSBridge.invoke) {
      document.addEventListener('WeixinJSBridgeReady', () => {
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
  },
}
</script>

<style lang="scss">
@import "~@/style/common.scss";
</style>
