<template>
  <div
    id="index"
  >
    <!-- <router-view :style="{flex:1, overflow: 'auto'}" />
    <tabbar /> -->
  </div>
</template>

<script>

export default {
  data() {
    return {
      innerHeight: window.innerHeight,
    };
  },
  components: {},
};
</script>

<style lang="scss" scoped>
#index {
  display: flex;
  flex-direction: column;
  // height: 100%;
}
</style>
