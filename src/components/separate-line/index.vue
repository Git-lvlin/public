<template>
  <div class="separate_line">
    <div class="line left_line" />
    <div class="title" >{{title}}</div>
    <div class="line right_line" />
  </div>
</template>

<script>

export default {
  props: {
    title: {
      type: String,
      default: '',
    },
  },
};
</script>

<style>
  .separate_line {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 0;
  }
  .title {
    color:#fffcf4;
    font-size: 16px;
    line-height: 22px;
  }
  .line {
    width: 66px;
    height: 2px;
  }
  .left_line {
    margin-right: 12px;
    background: linear-gradient(-90deg, #fff 0%, rgba(255, 255, 255, 0) 100%);
  }
  .right_line {
    margin-left: 12px;
    background: linear-gradient(90deg, #fff 0%, rgba(255, 255, 255, 0) 100%);
  }
</style>
