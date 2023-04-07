<template>
  <div class="container">
    <div class="training_course_list" v-for="(item,index) in listArr" :key="index">
        <div 
          class="video_images" 
          :style="`backgroundImage:url(${item.img})`"
          @click="JumpDetails(index)"
        >
          <img class="play" :src="getImgUrl('publicMobile/training-course-examination/play.png')"/>
        </div>
        <p class="video_title">{{item.title}}</p>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { getImgUrl } from '@/utils/tools';
import { meBaseUrl } from "@/constant/index";
import jsBridge from '@/utils/jsBridge';
export default {
  data() {
    return {
      listArr1: [
        {
          title: '素质教育和管理培训',
          img: `${getImgUrl('publicMobile/training-course-examination/suzi.jpg')}`,
        },
        {
          title: '就业创业培训',
          img: `${getImgUrl('publicMobile/training-course-examination/jiuy.jpg')}`,
        },
        {
          title: 'CPR&AED课程培训',
          img: `${getImgUrl('publicMobile/training-course-examination/cpr.jpg')}`,
        }
      ],
      listArr2: [
        {
          title: '创业就业培训及多维度指导',
          img: `${getImgUrl('publicMobile/training-course-examination/cjiu.jpg')}`,
        },
        {
          title: '服务商营销管理培训',
          img: `${getImgUrl('publicMobile/training-course-examination/fuwushang.jpg')}`,
        },
        {
          title: '公益职业化与商业职业化培训教育',
          img: `${getImgUrl('publicMobile/training-course-examination/goyi.jpg')}`,
        }
      ],
      listArr: []
    };
  },
  created() {
    const data = {
      code: 0,
      msg: 'success',
      data: {
        link: `${meBaseUrl}/web/training-course-examination?id=${this.$route.query.id}`,
        color: '#ff2e23',
        content: `立即考试`
      }
    }
    const zero = JSON.stringify(data);
    if(this.$route.query.type==1){
      setTimeout(()=>{
        jsBridge.callHandler(
          'setNavigationBarRightContent',
          zero,
        )
      })
      this.listArr=this.listArr1
    }else{
       this.listArr=this.listArr2
    }
  },
  mounted() {

  },
  methods: {
    getImgUrl,
    JumpDetails(index){
      this.$router.push({
        path: '/web/course-details',
        query: {
          id: this.$route.query.id,
          type: this.$route.query.type,
          index: index,
          _immersive: 0
        },
      });
    }
  }
};
</script>

<style lang='scss' scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #F4F4F4;
  padding: 20px;
  .training_course_list{
    .video_images{
      width: 335px;
      height: 160px;
      box-shadow: 0px 4px 8px 0px rgba(245.00000059604645,245.00000059604645,245.00000059604645,1);
      border-radius: 12px 12px 8px 8px;
      opacity: 1;
      background-size: 100%;
      background-repeat: no-repeat;
      margin: 20px auto;
      text-align: center;
      .play{
        width: 48px;
        height: 48px;
        margin-top: 50px;
      }
    }
    .video_title{
      font-size: 20px;
      font-weight: 500;
      color: #333333;
      line-height: 29px;
    }
  }
}
</style>
