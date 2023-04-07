<template>
  <div class="container">
    <div class="course_details">
        <video
          :id="`my-player-${asb}`"
          controls
          preload="auto"
          webkit-playsinline="true"
          playsinline="true"
          class="video-js vjs-big-play-centered vjs-fluid"
          autoplay
          @click="JumpDetails"
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
              <h1>{{detailsArr[$route.query.index].title}}</h1>
            </div>
            <p>{{detailsArr[$route.query.index].annotation}}</p>
          </div>
          <div class="course_name">
            <div class="hed">
              <span></span>
              <h1>{{detailsArr[$route.query.index].courseDescription}}</h1>
            </div>
            <p>{{detailsArr[$route.query.index].introduce}}</p>
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
import examResult from '@/apis/training-course-examination';

Video.addLanguage("zh-CN", video_zhCN);
Video.addLanguage("en", video_en);

export default {
  data() {
    return {
      Prototype: '',
      detailsArr: [
        {
          title: '课程名称',
          annotation: '公益职业化与商业职业化课程培训',
          videoAddress: 'https://dev-yeahgo.oss-cn-shenzhen.aliyuncs.com/publicMobile/training-course-examination/yeahgo_Trim.mp4',
          courseDescription: '课程介绍',
          introduce: '在您的感觉，工作或家庭中，您是否有“不想做但仍然要做”的经历？有没有人生活在别人的期望中？在您的感觉，工作或家庭中，您是否生活在别人的期望中？在您的感觉，工作或家庭中，您是否有“不想做但仍然要做”的经历？有没有人生活在别人的期望中？在您的感觉，工作或家庭中，您是否生活在别人的期望中？'
        },
        {
          title: '课程名称',
          annotation: '公益职业化与商业职业化课程培训',
          videoAddress: 'https://dev-yeahgo.oss-cn-shenzhen.aliyuncs.com/publicMobile/training-course-examination/huineng.mp4',
          courseDescription: '课程介绍',
          introduce: '在您的感觉，工作或家庭中，您是否有“不想做但仍然要做”的经历？有没有人生活在别人的期望中？在您的感觉，工作或家庭中，您是否生活在别人的期望中？在您的感觉，工作或家庭中，您是否有“不想做但仍然要做”的经历？有没有人生活在别人的期望中？在您的感觉，工作或家庭中，您是否生活在别人的期望中？'
        },
        {
          title: '课程名称',
          annotation: '公益职业化与商业职业化课程培训',
          videoAddress: 'https://dev-yeahgo.oss-cn-shenzhen.aliyuncs.com/publicMobile/training-course-examination/huineng.mp4',
          courseDescription: '课程介绍',
          introduce: '在您的感觉，工作或家庭中，您是否有“不想做但仍然要做”的经历？有没有人生活在别人的期望中？在您的感觉，工作或家庭中，您是否生活在别人的期望中？在您的感觉，工作或家庭中，您是否有“不想做但仍然要做”的经历？有没有人生活在别人的期望中？在您的感觉，工作或家庭中，您是否生活在别人的期望中？'
        },
      ],
      asb: `${Math.random()}`.substring(2)
    };
  },
  created () {

  },
  mounted() {
    var data = {
      src: this.detailsArr[this.$route.query.index].videoAddress,
      type: "video/mp4",
      autoplay: true,
    };
    this.Prototype =Video(`my-player-${this.asb}`, data, function () {
      this.pause();
      this.src(data);
      this.load(data);
      this.play();
      this.on("play", function(){
         examResult.examResultIsLearned({ subOrderType:25, orderId:this.$route.query.id,classType:1,classId:'' },{token:this.token}).then(res=>{

          })
      });
    });

    this.$bridge.callHandler('getUserInfo',{},(res) => {
      const d = JSON.parse(res)
      this.token = d.data.accessToken
    })
    
  },
  unmounted(){
    this.Prototype.pause()
  },
  methods: {
    getImgUrl,
    JumpDetails(val){
        console.log('val',val)
    },
    testNow(){
      this.Prototype.pause()
      this.$router.push({
        path: '/web/training-course-examination',
        query: {
          id: this.$route.query.id,
          _immersive: 0
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
            height: 16px;
            background: #FF110D;
            border-radius: 2px 2px 2px 2px;
            opacity: 1;
            margin-top: 5px;
          }
          h1{
            font-size: 20px;
            font-weight: 500;
            color: #333333;
            line-height: 29px;
            margin-left: 5px;
          }
        }
        p{
          font-size: 16px;
          font-weight: 500;
          color: #666666;
          line-height: 24px;
          margin-top: 5px;
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
