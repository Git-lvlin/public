<template>
  <div class="container">
    <div class="examination_confirmation" v-if="examina">
       <div class="hint">
          <img class="symbol" :src="getImgUrl('publicMobile/training-course-examination/dbx.png')"/>
          <h1>考试即将开始啦，请注意！</h1>
       </div>
       <div class="content_operation">
          <p class="mark">您是否已参加培训（内容包含 CPR&AED、传统文化、素质教育与管理、就业创业培训及应急救援证件）？（请为您的选择负责）</p>
          <p class="sele">请如实选择：</p>
          <div class="notarize">
            <div :class="whether==1?'selected':''" @click="onOff(1)">是 <van-icon name="success" class="icon" size="25px"/></div>
            <div :class="whether==2?'selected':''" @click="onOff(2)">否 <van-icon name="success" class="icon" size="25px"/></div>
          </div>
       </div>
       <div :class="whether==2?'set_ash':'examination'"   @click="testNow">
         立即考试
       </div>
    </div>
    <div class="examination_answer" v-else :style="`backgroundImage:url(${getImgUrl('publicMobile/training-course-examination/bj.png')})`">
       <div class="content_operation">
          <div class="item_number">
            <p class="mark">{{topicArr[present].type==1?'单选':'多选'}}，本题{{topicArr[present].grade}}分</p>
            <p><span class="mark">{{present+1}}</span>/{{topicArr.length}}</p>
          </div>
          <p class="headline">{{topicArr[present].title}}</p>
          <div class="notarize" v-for="(item,index) in topicArr[present].topic_option " :key="index">
            <div :class="selectCss(index)" @click="select(index)">{{item.name}}</div>
          </div>
          <img v-if="topicArr[present].answer_state === 1" class="feedback" :src="getImgUrl('publicMobile/training-course-examination/zq.png')">
          <img v-if="topicArr[present].answer_state === 0" class="feedback" :src="getImgUrl('publicMobile/training-course-examination/cw.png')">
          <div class="next_problem"  @click="affirm">
            确认
          </div>
       </div>
       <p class="current_performance">当前成绩为: {{gross_score}} 分</p>
       <van-overlay :show="show">
          <div class="wrapper" :style="`backgroundImage:url(${getImgUrl(gross_score>=70?'publicMobile/training-course-examination/dialog.png':'publicMobile/training-course-examination/notPass.png')})`">
             <div 
              class="back_continue" 
              :style="`backgroundImage:url(${getImgUrl('publicMobile/training-course-examination/cancel.png')})`"
              @click="cancel"
             >
             </div>
             <div 
              v-if="gross_score<70" 
              class="back_continue back_go" 
              :style="`backgroundImage:url(${getImgUrl('publicMobile/training-course-examination/continue_exam.png')});`"
              @click="continueExam"
             >
             </div>
             <p v-if="gross_score>=70" class="test_score">您的考试成绩为：<span>{{gross_score}}分</span></p>
          </div>
        </van-overlay>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Image as VanImage, Icon, Dialog, Overlay, Toast  } from 'vant';
import { getImgUrl, backOff } from '@/utils/tools';
import { meBaseUrl } from "@/constant/index";
import topicArr from './data'
import examResult from '@/apis/training-course-examination';
import jsBridge from '@/utils/jsBridge';
Vue.use(VanImage);
Vue.use(Icon);
Vue.use(Dialog);
Vue.use(Overlay);
export default {
  data() {
    return {
      whether: 0,
      examina: true,
      present: 0,
      topicArr:JSON.parse(JSON.stringify(topicArr)),
      gross_score:0,
      show:false,
      token: 'AQQAAAAAZC_rvxQGzuGNAHABhvc0XWUu7vkK4SmYpnrHv8mjsg1o8ooZrDRR33N2gPw=',
      lock: true,
    };
  },
  created () {
    const data = {
      code: 0,
      msg: 'success',
      data: {
        link: `${meBaseUrl}/web/training-course-examination?id=${this.$route.query.id}&_immersive=0`,
        color: '#ff2e23',
        content: ``
      }
    }
    const zero = JSON.stringify(data);
     setTimeout(()=>{
        jsBridge.callHandler(
          'setNavigationBarRightContent',
          zero,
        )
      })
    this.dialogAlert()
  },
  mounted() {
    this.$bridge.callHandler('getUserInfo',{},(res) => {
      const d = JSON.parse(res)
      this.token = d.data.accessToken
    })
  },
  methods: {
    getImgUrl,
    testNow(){
      if(this.whether=== 1){
        this.dialogAlert()
      }else{
        Dialog.confirm({
          title: '提示',
          message: '请完成课程学习后再来参与考试',
          cancelButtonText:'关闭',
          confirmButtonText:'马上学习',
        }).then(()=>{
            this.$router.push({
              path: '/web/training-course',
              query: {
                id:this.$route.query.id,
                type:1
              },
            });
        });
      }
    },
    onOff(val){
      this.whether=val
      if(val===2){
         Dialog.confirm({
          title: '提示',
          message: '请完成课程学习后再来参与考试',
          cancelButtonText:'关闭',
          confirmButtonText:'马上学习',
        }).then(()=>{
            this.$router.push({
              path: '/web/training-course',
              query: {
                id:this.$route.query.id,
                type:1
              },
            });
        });
      }
    },
    select(index){
      if(this.lock==false){
        return
      }
     if( this.topicArr[this.present].type==1 ){
       this.topicArr[this.present].current_selection=[index]
     }else{
       if(this.topicArr[this.present].current_selection.includes(index)){
          const arr=this.topicArr[this.present].current_selection.filter(item=>item!==index)
          this.topicArr[this.present].current_selection=arr
       }else{
        this.topicArr[this.present].current_selection.push(index)
       }
     }
      
    },
    selectCss(index){
        if(this.topicArr[this.present].current_selection.includes(index)){
          return 'selected_state'
        }
    },
    computation(){
      if(this.topicArr[this.present].right_answers.sort().toString()==this.topicArr[this.present].current_selection.sort().toString()){
         this.gross_score+=parseInt(this.topicArr[this.present].grade)
         this.topicArr[this.present].answer_state=1
      }else{
        this.topicArr[this.present].answer_state=0
      }
    },

    affirm(){
      if(this.lock==false){
        return
      }
      this.lock=false
      if(this.topicArr[this.present].current_selection.length==0){
        Toast('请选择答案');
        this.lock=true
        return 
      }
      this.computation()
      if(this.present===this.topicArr.length-1){
          examResult.examResultSet({resultStatus:this.gross_score>=70?1:2, subOrderType:25, orderId:this.$route.query.id,score:this.gross_score,classType:1,classId:'' },{token:this.token}).then(res=>{
            if(res.data){
              this.show=true
              this.lock=true
            }
          })
      }else{
        setTimeout(()=>{
          this.present+=1
          this.lock=true
        },1000)
      }
    },

    cancel(){
      this.show=false
      this.$router.go(-1)
    },

    continueExam(){
      this.show=false
      this.present=0
      this.topicArr=JSON.parse(JSON.stringify(topicArr))
      this.gross_score=0
      this.lock=true
    },


    dialogAlert(){
        examResult.examResultGet({ subOrderType:25, orderId:this.$route.query.id },{token:this.token}).then(res=>{
            if(res.data.resultStatus===1){
               Dialog.alert({
                message: '您已经考试通过了！',
                confirmButtonText:'知道了',
                confirmButtonColor: '#19C018'
              });
            }else{
              this.examina=false
            }
          })
    }

  },
};
</script>

<style lang='scss'>
   .selected_state{
     background: #FCECEC !important;
     color: #FA0000;
   }
</style>


<style lang='scss' scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #F4F4F4;
}
.examination_confirmation{
  padding: 20px;
  .hint{
    display: flex;
    align-items: center;
    margin: 20px 0;
    .symbol{
      width: 20px;
      height: 22px;
      opacity: 1;
      margin-right: 10px;
    }
    h1{
      font-size: 18px;
      font-weight: 700;
      color: #000000;
      line-height: 18px;
    }
  }
  .content_operation{
    width: 345px;
    height: 325px;
    background: #FFFFFF;
    border-radius: 8px 8px 8px 8px;
    opacity: 1;
    padding: 20px;
    .mark{
      font-size: 14px;
      font-weight: 400;
      color: #FA0D1E;
      line-height: 22px;
      margin-bottom: 20px;
    }
    .sele{
      margin-bottom: 10px;
    }
    .notarize{
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      div{
        width: 286px;
        height: 45px;
        background: #F6F6F6;
        border-radius: 45px 45px 45px 45px;
        opacity: 1;
        text-align: center;
        line-height: 45px;
        margin: 15px 0;
        position: relative;
        .icon{
          top: 10px;
          right: 30px;
          position: absolute;
          opacity: 0;
        }
      }
      .selected{
        .icon{
          opacity: 1;
        }
        width: 286px;
        height: 45px;
        background: #FCECEC;
        border-radius: 45px 45px 45px 45px;
        opacity: 1;
        border: 1px solid #FCECEC;
        color: #FA0D1E;
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
    margin: 40px auto;
  }
  .set_ash{
    width: 315px;
    height: 45px;
    background-color: #999999;
    box-shadow: 0px 3px 6px 0px #999999;
    border-radius: 8px 8px 8px 8px;
    opacity: 1;
    font-size: 16px;
    color: #FFFFFF;
    text-align: center;
    line-height: 45px;
    margin: 40px auto;
  }
}

.examination_answer{
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #F4F4F4;
  background-size: 100%;
  padding: 20px;
  .content_operation{
    width: 345px;
    background: #FFFFFF;
    border-radius: 8px 8px 8px 8px;
    opacity: 1;
    margin-top: 100px;
    padding: 20px;
    position: relative;
      .item_number{
        display: flex;
        justify-content: space-between;
        .mark{
          width: 130px;
          height: 16px;
          font-size: 16px;
          font-weight: 400;
          color: #FF110D;
          line-height: 16px;
        }
      }
     .headline{
      width: 289px;
      height: 44px;
      font-size: 16px;
      font-weight: 700;
      color: #030303;
      line-height: 22px;
      margin: 20px 0 0 20px;
     }
     .notarize{
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      div{
        width: 286px;
        background: #F6F6F6;
        border-radius: 45px 45px 45px 45px;
        opacity: 1;
        text-align: left;
        padding:10px 20px;
        margin: 10px 0;
        position: relative;
        .icon{
          top: 10px;
          right: 30px;
          position: absolute;
          opacity: 0;
        }
      }
      .selected{
        .icon{
          opacity: 1;
        }
        width: 286px;
        height: 45px;
        background: #E5F7EB;
        border-radius: 45px 45px 45px 45px;
        opacity: 1;
        border: 1px solid #FCECEC;
        color: #E5F7EB;
      }
    }
    .feedback{
      width: 72px;
      height: 63px;
      opacity: 1;
      position: absolute;
      right: 10px;
      bottom: 80px;
    }
    .next_problem{
      width: 315px;
      height: 45px;
      background: linear-gradient(95deg, #FF6E53 0%, #FF0000 100%);
      box-shadow: 0px 3px 6px 0px rgba(229.00000154972076,53.00000064074993,47.0000009983778,0.4000000059604645);
      border-radius: 8px 8px 8px 8px;
      opacity: 1;
      color: #FFFFFF;
      text-align: center;
      line-height: 45px;
      margin-top: 30px;
    }
  }
  .current_performance{
    font-size: 12px;
    font-weight: 500;
    color: #FFFFFF;
    line-height: 16px;
    margin-top: 15px;
  }
  .wrapper{
    width: 344px;
    height: 422px;
    border-radius: 0px 0px 0px 0px;
    opacity: 1;
    background-size: 100%;
    margin: 120px auto;
    display: flex;
    align-items:flex-end;
    justify-content: center;
    position: relative;
    .back_continue{
      width: 140px;
      height: 39px;
      border-radius: 0px 0px 0px 0px;
      opacity: 1;
      background-size: 100%;
      // margin: 20px;
      margin-bottom: 70px;
    }
    .back_go{
      margin-left: 8px;
    }
    .test_score{
      position: absolute;
      height: 16px;
      font-size: 18px;
      font-weight: 700;
      color: #474C5F;
      line-height: 16px;
      bottom: 130px;
      span{
        color: #FA0D1E;
      }
    }
  }
}
</style>
