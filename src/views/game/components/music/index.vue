<template>
  <div class="music-box">
    <audio id="bgMusic" :src="getImgUrl('publicMobile/game/files/floor_game_music.mp3')" loop></audio>
    <div :class="state == 0 ? 'music-icon paused' : 'music-icon active'">
      <Icon size="36" name="music-o" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Dialog, Icon } from 'vant';
import { getImgUrl } from '@/utils/tools';
export default {
  data() {
    return {
      audio: null,
      // 0 暂停 1 播放
      state: 0,
    };
  },
  components: {
    Icon,
    [Dialog.Component.name]: Dialog.Component,
  },
  mounted () {
    this.audio = document.getElementById("bgMusic");
  },
  methods: {
    getImgUrl, 
    onPlayOrPaused() {
      const {
        state,
      } = this;
      if(state == 1) {
        // audio.currentTime = 0;
        this.state = 0;
        this.audio.pause();
      } else if(state == 0) {
        this.state = 1;
        this.audio.play();
      }
      
      console.log(this.state);
    }
  },
};
</script>

<style lang="scss" scoped>
  .music-box {
    position: relative;
    width: 36px;
    height: 36px
  }

  @keyframes rotateAnimate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .music-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    animation: rotateAnimate 4s linear infinite;
  }

  .active {
    animation-play-state: running;
  }

  .paused {
    animation-play-state: paused;
  }

</style>
