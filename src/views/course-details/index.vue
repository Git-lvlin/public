<template>
  <div class="container">
    <div class="course_details">
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
        <div class="course_introduction">
          <div class="course_name">
            <div class="hed">
              <span></span>
              <h1>课程名称</h1>
            </div>
            <p>公益职业化与商业职业化课程培训</p>
          </div>
          <div class="course_name">
            <div class="hed">
              <span></span>
              <h1>课程介绍</h1>
            </div>
            <p>在您的感觉，工作或家庭中，您是否有“不想做但仍然要做”的经历？有没有人生活在别人的期望中？在您的感觉，工作或家庭中，您是否生活在别人的期望中？在您的感觉，工作或家庭中，您是否有“不想做但仍然要做”的经历？有没有人生活在别人的期望中？在您的感觉，工作或家庭中，您是否生活在别人的期望中？</p>
          </div>
        </div>
        <div class="examination"   @click="testNow" v-if="$route.query.type == 1">
          立即考试
       </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { getImgUrl } from '@/utils/tools';
import Video from "video.js";
import video_zhCN from "video.js/dist/lang/zh-CN.json";
import video_en from "video.js/dist/lang/en.json";
import "video.js/dist/video-js.css";

Video.addLanguage("zh-CN", video_zhCN);
Video.addLanguage("en", video_en);

export default {
  data() {
    return {
      
    };
  },
  created () {

  },
  mounted() {
    var data = {
      src: 'https://dev-yeahgo.oss-cn-shenzhen.aliyuncs.com/publicMobile/training-course-examination/yeahgo_Trim.mp4',
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
  methods: {
    getImgUrl,
    JumpDetails(){
        
    },
    testNow(){
      this.$router.push({
        path: '/web/training-course-examination',
        query: {
          id: this.$route.query.id
        },
      });
    },
  }
};
</script>

<style lang='scss' scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #F4F4F4;
  .course_details{
    #my-player{
      width: 375px;
      height: 256px;
      border-radius: 0px 0px 0px 0px;
      opacity: 1;
      object-fit:fill;
    }
    .course_introduction{
      padding: 20px;
      .course_name{
        margin-bottom: 20px;
        .hed{
          display: flex;
          span{
            width: 4px;
            background: #FF110D;
            border-radius: 2px 2px 2px 2px;
            opacity: 1;
            margin-top: 5px;
          }
          h1{
            width: 80px;
            font-size: 20px;
            font-weight: 500;
            color: #333333;
            line-height: 29px;
            margin-left: 5px;
          }
        }
        p{
          width: 328px;
          font-size: 16px;
          font-weight: 500;
          color: #666666;
          line-height: 24px;
        }
      }
    }
    .examination{
      width: 315px;
      height: 45px;
      background: linear-gradient(95deg, #FF6E53 0%, #FF0000 100%);
      box-shadow: 0px 3px 6px 0px rgba(229.00000154972076,53.00000064074993,47.0000009983778,0.4000000059604645);
      border-radius: 8px 8px 8px 8px;
      opacity: 1;
      font-size: 16px;
      color: #FFFFFF;
      text-align: center;
      line-height: 45px;
      margin: 0 auto;
    }
  }
}
</style>
