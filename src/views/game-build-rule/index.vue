<template>
  <div class="rule-box">
    <div class="rule-info">
      <div v-for="item in rule">
        <div :class="item.css" v-if="item.type == 'text'">{{item.text}}</div>
        <img :class="item.css" v-if="item.type == 'img'" :src="item.text" />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Image } from 'vant';
import { getImgUrl } from '@/utils/tools';

export default {
  data() {
    return {
      rule: [{
        text: '一、活动主题',
        css: 'title',
        type: 'text'
      }, {
        text: '新年盖高楼',
        css: '',
        type: 'text'
      }, {
        text: '',
        css: 'space',
        type: 'text'
      }, {
        text: '二、活动时间',
        css: 'title',
        type: 'text'
      }, {
        text: '2022年01月01日00:00:00-2022年2月28日23:59:59',
        css: '',
        type: 'text'
      }, {
        text: '',
        css: 'space',
        type: 'text'
      }, {
        text: '三、活动范围与对象',
        css: 'title',
        type: 'text'
      }, {
        text: '活动时间内全部的约购APP用户通过约购APP首页进入“新年盖高楼”的活动页面，根据页面提示参与活动',
        css: '',
        type: 'text'
      }, {
        text: '',
        css: 'space',
        type: 'text'
      }, {
        text: '四、活动内容',
        css: 'title',
        type: 'text'
      }, {
        text: '1、用户通过约购APP广告位或浏览器打开APP进入活动页面。',
        css: '',
        type: 'text'
      }, {
        text: '2、用户开始游戏后需要控制长方形楼层的长度来叠放楼层，要求上一层短于下一层，每叠放成功一层则开始下一层的叠放，如叠放的上一层长于或等于上一层则判断为游戏失败，用户需要通过完成任务获得复活机会方可继续叠放，如用户不愿意完成任务则需要重新从第一层开始叠放。',
        css: '',
        type: 'text'
      }, {
        text: '3、当用户活动期间3次盖楼机会用完时候，可以参与获得机会挑战任务，可以获得相应1次盖楼机会；',
        css: '',
        type: 'text'
      }, {
        text: getImgUrl('publicMobile/withdrawal/withdrawal-icon.png'),
        css: 'img',
        type: 'img'
      }, {
        text: '注：',
        css: '',
        type: 'text'
      }, {
        text: '1*邀请注册和玩游戏可累计奖励,例如A邀请了B成功注册约购APP奖励A一次游戏机会,B注册之后下载并参与了游戏则再奖励A一次游戏机会，一共两次。',
        css: '',
        type: 'text'
      }, {
        text: '2*邀请老用户玩游戏不赠送游戏机会。',
        css: '',
        type: 'text'
      }, {
        text: '4、从第3层开始用户可以获得1次现金红包抽奖会，根据楼层可以抽取不同金额的现金红包。49层封顶；',
        css: '',
        type: 'text'
      }]
    };
  },
  components: {
    Image,
  },
  mounted () {
    // this.onOpenApp();
  },
  methods: {
    getImgUrl,
    
  },
};
</script>

<style lang="scss" scoped>
  .rule-box {
    min-height: 100vh;
    font-size: 14px;
    color: #666;
    line-height: 22px;
    padding-top: 12px;
  }
  .rule-info {
    padding: 16px;
    background-color: #fff;
  }
  .title {
    color: #333;
    font-weight: 600;
    margin-bottom: 4px;
  }
  .space {
    height: 30px;
  }
  .img {
    width: 100%;
    margin: 10px 0;
  }
</style>
