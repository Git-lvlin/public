<template>
  <video
    id="my-player"
    controls
    preload="auto"
    webkit-playsinline="true"
    playsinline="true"
    class="video-js vjs-big-play-centered vjs-fluid"
    autoplay
  >
    <p class="vjs-no-js">
      To view this video please enable JavaScript, and consider upgrading to a
      web browser that supports HTML5 video
    </p>
  </video>
</template>

<script>
import Video from "video.js";
import video_zhCN from "video.js/dist/lang/zh-CN.json";
import video_en from "video.js/dist/lang/en.json";
import "video.js/dist/video-js.css";

Video.addLanguage("zh-CN", video_zhCN);
Video.addLanguage("en", video_en);
export default {
  mounted() {
    var data = {
      src: this.$route.query.url,
      type: "video/mp4",
      autoplay: true,
    };
    Video("my-player", data, function () {
      this.pause();
      this.src(data);
      this.load(data);
      this.play();
    });
  },
};
</script>

<style lang="scss" scoped>
#my-player {
  width: 100%;
  height: 100vh;
}
</style>
