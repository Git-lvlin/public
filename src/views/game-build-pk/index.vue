<template>
  <div class="pk-box">
    <img class="pk-back" :src="getImgUrl('publicMobile/game/build_pk/pk_back.png')" />
    <div class="px-content">
      <div class="bar-list">
        <div :class="`bar-item ${actType == 1 ? 'bar-act' : ''}`" @click="onChangeBar(1)">邀请用户</div>
        <div :class="`bar-item ${actType == 2 ? 'bar-act' : ''}`" @click="onChangeBar(2)">盖楼冲榜</div>
      </div>
      <div class="my-ranking">
        <div>
          我的排名
          <br />
          2908
        </div>
        <div class="ranking-user">
          <img
            class="my-avatar"
            src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng1e03efd2c09fddfda258f11c1432b23b0831578ec89a9282e764397184a60bb0"
          />
          <span class="my-name">156****6060</span>
        </div>
        <div>
          邀请
          <br />
          9880人
        </div>
      </div>
      <div class="ranking-list">
        <div class="ranking-item" v-for="(item, idx) in userList">
          <div class="item-number">
            <img
              class="item-number-icon"
              v-if="idx < 3"
              :src="getImgUrl(`publicMobile/game/build_pk/floor_${idx + 1}.png`)"
            />
            <span class="item-number-text" v-else>{{`${idx < 9 ? '0' : ''}${idx + 1}`}}</span>
          </div>
          <div class="item-user">
            <img
              class="item-user-avatar"
              src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngf9de5d4f8a078082effe03567d127eb77598cef86a0959540b2d53f692de3960"
            />
            <span class="item-user-name">乔悦</span>
          </div>
          <div class="item-invite">邀请880人</div>
        </div>
      </div>
    <div class="more">查看更多&gt;</div>
    </div>
  </div>
</template>

<script>
import { getImgUrl } from '@/utils/tools';

export default {
  data() {
    return {
      actType: 1,
      userList: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
    };
  },
  components: {
    Image,
  },
  mounted () {
  },
  methods: {
    getImgUrl,
    onChangeBar(type) {
      if(type != this.actType) {
        this.actType = type
      }
    }
  },
};
</script>

<style lang="scss" scoped>
  .pk-box {
    height: 100vh;
  }
  .pk-back {
    width: 100%;
  }
  .px-content {
    position: relative;
    z-index: 2;
    padding: 20px 12px;
    margin-top: -25px;
    background-color: #fff;
    border-radius: 30px 30px 0 0;
  }
  .bar-list {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: #999999;
    line-height: 22px;
    padding-bottom: 30px;
  }
  .bar-item {
    position: relative;
  }
  .bar-item:not(:first-child) {
    margin-left: 54px;
  }
  .bar-act {
    font-weight: 600;
    color: #EA0700;
  }
  .bar-act::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    width: 30px;
    height: 3px;
    background: #EA0300;
    border-radius: 2px;
    transform: translateX(-50%);
  }
  
  .my-ranking {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 56px;
    color: rgba(241, 117, 2, 1);
    font-size: 15px;
    text-align: center;
    line-height: 21px;
    font-weight: 600;
    margin-top: 22px;
    padding: 0 21px;
    margin-bottom: 23px;
    background-color: rgba(255, 135, 24, 0.1);
    border-radius: 28px;
  }
  .ranking-user {
    display: flex;
    align-items: center;
  }
  .my-avatar {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
  .ranking-list {
    padding: 0 8px;
  }
  .ranking-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  .item-number {
    width: 27px;
    margin-right: 25px;
  }
  .item-number-icon {
    width: 27px;
    height: 36px;
  }
  .item-number-text {
    font-size: 15px;
    font-weight: 600;
    color: #5A5A5A;
    line-height: 21px;
  }
  .item-user {
    flex: 1;
    display: flex;
    align-items: center;
  }
  .item-user-avatar {
    width: 48px;
    height: 48px;
    margin-right: 11px;
  }
  .item-user-name {
    color: rgba(90, 90, 90, 1);
    font-size: 15px;
    line-height: 21px;
  }
  .item-invite {
    color: rgba(255, 135, 24, 1);
    font-size: 15px;
    line-height: 21px;
  }

  .more {
    color: rgba(153, 153, 153, 1);
    font-size: 15px;
    text-align: center;
    line-height: 21px;
    padding: 20px 0 64px 0;
    margin: 0 auto;
  }
</style>
