<template>
  <div class="music-box">
    <audio
      id="bgMusic"
      :src="getImgUrl('publicMobile/game/files/floor_game_music.mp3')"
      :loop="true"
      preload="auto"
    />
    <div :class="state == 0 ? 'music-icon' : 'music-icon'">
      <van-image
        v-show="state"
        class="m"
        width="32px"
        height="32px"
        :src="getImgUrl('publicMobile/game/music.png')"
      />
      <van-image
        v-show="!state"
        class="m"
        width="32px"
        height="32px"
        :src="getImgUrl('publicMobile/game/music-no.png')"
      />
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
      type: 1,
    };
  },
  components: {
    Icon,
    [Dialog.Component.name]: Dialog.Component,
  },
  mounted () {
    const audio = document.getElementById("bgMusic");
    audio.addEventListener('loadeddata', () => {
      console.log('加载第一帧');
      this.onPlayOrPaused();
    });
    this.audio = audio;
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState == "visible") {
        this.audio.play();
      }
      if (document.visibilityState == "hidden") {
        this.audio.pause();
      }
    })
  },
  methods: {
    getImgUrl,
    onPlayOrPaused(play) {
      let {
        state,
      } = this;
      if(play != undefined) {
        state = play ? 0 : 1;
      }
      if(state == 1) {
        // audio.currentTime = 0;
        this.state = 0;
        this.audio.pause();
      } else if(state == 0) {
        this.state = 1;
        this.audio.play();
      }
    }
  },
};
</script>

<style lang="scss" scoped>
  .music-box {
    margin-top: 12px;
    position: relative;
    width: 32px;
    height: 32px
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
  }

  .active {
    animation-play-state: running;
  }

  .paused {
    animation-play-state: paused;
  }

</style>
