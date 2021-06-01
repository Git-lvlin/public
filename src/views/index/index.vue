<template>
  <div
    id="index"
  >
    <!-- <router-view :style="{flex:1, overflow: 'auto'}" />
    <tabbar /> -->
    干的漂亮
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
  mounted() {
    console.log('process', process.env);
  },
};
</script>

<style lang="scss" scoped>
#index {
  display: flex;
  flex-direction: column;
  // height: 100%;
}
</style>
