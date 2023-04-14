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
    <div class="examination"   @click="testNow" v-if="$route.query.type == 1">
      立即考试
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { getImgUrl } from '@/utils/tools';
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
        },
        {
          title: '传统文化培训',
          img: `${getImgUrl('publicMobile/training-course-examination/4300-chuanto.jpg')}`,
        },
        {
          title: '如何成为优秀的营销人员',
          img: `${getImgUrl('publicMobile/training-course-examination/4800-ruhe.jpg')}`,
        },
      ],
      listArr2: [
        {
          title: '创业就业培训及多维度指导',
          img: `${getImgUrl('publicMobile/training-course-examination/cjiu.jpg')}`,
        },
        {
          title: '如何成为优秀的营销人员',
          img: `${getImgUrl('publicMobile/training-course-examination/4800-ruhe.jpg')}`,
        },
        {
          title: '中华传统文化培训',
          img: `${getImgUrl('publicMobile/training-course-examination/4800-chaunto.jpg')}`,
        },
        {
          title: '素质教育培训',
          img: `${getImgUrl('publicMobile/training-course-examination/4800-zhiy.jpg')}`,
        }
      ],
      listArr: []
    };
  },
  created() {
    if(this.$route.query.type==1){
      this.listArr=this.listArr1
    }else{
       this.listArr=this.listArr2
    }
  },
  mounted() {
    if(this.$route.query.type != 1){
      this.$router.replace({
        path: '/web/county-training-course',
        query: {
          id:this.$route.query.id,
        },
      });
    }
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
    },
    testNow(){
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
  align-items: center;
  min-height: 100vh;
  background-color: #F4F4F4;
  padding: 20px 20px 80px 20px;
  .training_course_list{
    .video_images{
      width: 335px;
      height: 160px;
      box-shadow: 0px 4px 8px 0px rgba(245.00000059604645,245.00000059604645,245.00000059604645,1);
      border-radius: 12px 12px 8px 8px;
      opacity: 1;
      background-size: 100%;
      background-repeat: no-repeat;
      margin: 15px auto;
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
    position: fixed;
    bottom: 10px;
    }
}
</style>
