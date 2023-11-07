<template>
    <div class="main">
        <div :class="1?'head':'head headEnd'">
            <div class="head_name">
                <van-image
                class="head_portrait"
                :src="getImgUrl(0?'publicMobile/live-pull-stream/expression.png':'publicMobile/live-pull-stream/yeahgo.png')"
                />
                <span>{{ 1?'范先生':'约购APP' }}</span>
            </div>
            <div class="open_yeahgo" @click="openYeahgo">
                打开约购
            </div>
        </div>
		<video id="videoPlayer" ref="videoPlayer" muted :controls="false" autoplay></video>
        <div class="encryption">
            <van-image
              class="encryption_logo"
              :src="getImgUrl('publicMobile/live-pull-stream/LOGO.png')"
            />
            <div class="direct_broadcasting_room" @click="enterPassword">
                <div>
                  <span class="signal"></span>
                  <span class="signal"></span>
                  <span class="signal2"></span>
                </div>
                点击进入直播间
            </div>
            <van-dialog  :overlay="false" v-model="show" title="直播间密码" show-cancel-button @confirm="confirmPassword" @close="value=''">
                <van-password-input
                  :value="value"
                  :focused="showKeyboard"
                  @focus="showKeyboard = true"
                  length="4"
                  :mask="false"
                  style="margin: 20px 0;"
                  :error-info="value.length==4&&value!='1234'?'密码错误':''"
                />
            </van-dialog>
        </div>
        <!-- <div class="liveStreamingEnd">
            <div class="tis">
                直播已结束
            </div>
            <div class="user">
                <van-image
                class="head_portrait"
                :src="getImgUrl('publicMobile/live-pull-stream/expression.png')"
                />
                <p>范先生</p>
            </div>
            <div class="open_yeahgo" @click="openYeahgo">打开约购，和主播打个招呼</div>
        </div> -->
        <div class="footer">
            <div class="function"  @click="openYeahgo">
                <div class="comment">
                    说点什么...
                    <van-image
                    class="expression"
                    :src="getImgUrl('publicMobile/live-pull-stream/expression.png')"
                    />
                </div>
                <van-image
                class="share"
                :src="getImgUrl('publicMobile/live-pull-stream/more.png')"
                />
                <van-image
                class="share"
                :src="getImgUrl('publicMobile/live-pull-stream/gift.png')"
                />
                <van-image
                class="share"
                :src="getImgUrl('publicMobile/live-pull-stream/like.png')"
                />
            </div>
            <div class="open_yeahgo" @click="openYeahgo">打开约购，和主播打个招呼</div>
        </div>
        <van-number-keyboard
            :show="showKeyboard"
            @blur="showKeyboard = false"
            @input="onInput"
            @delete="onDelete"
        />
    </div>
  </template>
  
  <script>
  import Vue from 'vue';
  import { Image as VanImage, PasswordInput, Dialog, NumberKeyboard } from 'vant';
  import { getImgUrl } from '@/utils/tools';
  import teamApi from '@/apis/live-pull-stream';
  import Hls from 'hls.js';
  import CallApp from 'callapp-lib';
  import { DOWNLOAD_ANDROID, DOWNLOAD_IOS } from '@/constant/common';


  Vue.use(VanImage);
  Vue.use(PasswordInput);
  Vue.use(NumberKeyboard);
  Vue.use(Dialog);

  
  export default {
    props: {

    },
    data() {
      return {
        show: false,
        value: '',
        showKeyboard: false,
        isInWechat: false,
        hls: null,
        liveStreamingInfo: {}
      }
    },
    components: {
    
    },
    created () {

    },
    mounted() {
      this.init()
    },
    beforeDestroy() {
      if (this.hls) {
        this.hls.destroy();
      }
    },
    methods: {
        getImgUrl,
        init(){
          const { query } = this.$router.history.current;
          const params={
            liveId: query.liveId || '1719965863410225200'
          }
          teamApi.getLiveInfo(params,{ token:this.token }).then(res=>{
            if(res.code==0){
                this.liveStreamingInfo=res.data
                let url = res.data.hlsPlayUrl || 'http://pili-live-hls.yeahgo.com/yeahgo/1721438431472848897.m3u8'
                const ua = window.navigator.userAgent.toLowerCase();
                if(ua.match(/MicroMessenger/i) == 'micromessenger' || ua.match(/_SQ_/i) == '_sq_'){
                this.isInWechat = true;
                }
                this.createPlayer(url); // 例如: 'http://pili-live-hls.yeahgo.com/yeahgo/1721438431472848897.m3u8'
            }
          })
        },
        openYeahgo(){ //打开约购
            console.log("🚀 ~ this.$store.state.appInfo", this.$store.state.appInfo)
            if(this.isInWechat) {
                this.$router.push({
                  path: '/web/guidance-app',
                  query: {},
                });
                return;
            }
            if (this.$store.state.appInfo.isApp || this.$store.state.appInfo.isMiniprogram) {
                return;
            }
            console.log('DOWNLOAD_ANDROID', DOWNLOAD_ANDROID);
            const options = {
                scheme: {
                //URL Scheme 的 scheme 字段，要打开的 APP 的标识
                protocol: 'yeahgo'
                },
                //安卓原生谷歌浏览器必须传递 Intent 协议地址，才能唤起 APP
                intent: {
                // APP包名
                package: 'com.hznt.yeahgo',
                scheme: 'yeahgo'
                },
                timeout: '3000',
                //APP 的 App Store
                appstore: DOWNLOAD_IOS,
                //APP 的应用宝地址，
                yingyongbao: DOWNLOAD_ANDROID,
                fallback: DOWNLOAD_ANDROID,
            };
            const callLib = new CallApp(options);
            // const h5Url = `${meBaseUrl}/web/polite-animation?_authorizationRequired=1`;
            callLib.open({
                path: "",
                //要传递的参数
                param: {
                parameter: `${this.url || ''}`,
                }
            })
        },
        createPlayer(source) {
            const video = this.$refs.videoPlayer;

            if(Hls.isSupported()) {
                this.hls = new Hls();
                this.hls.loadSource(source);
                this.hls.attachMedia(video);
                this.hls.on(Hls.Events.MANIFEST_PARSED, function() {
                video.play();
                });
            }
            else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                video.src = source;
                video.addEventListener('loadedmetadata', function() {
                video.play();
                });
            }
        },
        enterPassword(){
           this.show=true
        },
        confirmPassword(){
            this.show=false
            console.log('value',this.value)
        },
        onInput(value) {
            this.value+=`${value}`
        },
        onDelete() {
            this.value = this.value.slice(0, -1);
        },
    },
  }
  
  </script>
  
  
  <style lang="scss" scoped>
  .main {
    height: 100vh;
    background-color:#504d4d;
    margin: 0;
    padding: 0;
    overflow: hidden;
    position: relative;
    .head{
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: fixed;
        padding: 0 10px 0 19px;
        width: 100%;
        height: 67px;
        z-index: 9999;
        .head_name{
            display: flex;
            align-items: center;
            font-size: 20px;
            font-family: OPPOSans-Medium, OPPOSans;
            font-weight: 500;
            color: #FFFFFF;
            line-height: 17px;
            text-shadow: 0px 2px 6px rgba(0,0,0,0.2);
            .head_portrait{
                width: 40px;
                height: 40px;
                border-radius: 20px;
                margin-right: 6px;
            }
        }
        .open_yeahgo{
            text-align: center;
            width: 110px;
            height: 34px;
            background: linear-gradient(95deg, #FF6E53 0%, #FF0000 100%);
            border-radius: 74px 74px 74px 74px;
            opacity: 1;
            font-size: 16px;
            font-family: Source Han Sans CN-Bold, Source Han Sans CN;
            font-weight: 700;
            color: #FFFFFF;
            line-height: 34px;
        }
    }
    .headEnd{
        background: #020200;
        border-radius: 0px 0px 0px 0px;
        opacity: 1;
    }
    #videoPlayer {
      width: 100%;
      height: 100vh;
      object-fit: cover;
    }
    // video::-webkit-media-controls-enclosure {
    //  display: none;
    // }
    .encryption{
       display: flex;
       flex-direction: column;
       position: absolute;
       top: 30%;
       left: 50%;
       transform: translate(-50%, -30%);
       .encryption_logo{
          width: 166px;
          height: 139px;
       }
       .direct_broadcasting_room{
            width: 174px;
            height: 40px;
            background: rgba(216,216,216,0.02);
            border-radius: 64px 64px 64px 64px;
            opacity: 1;
            border: 2px solid rgba(255,255,255,0.2);
            font-size: 18px;
            font-family: OPPOSans-Bold, OPPOSans;
            font-weight: 700;
            color: #FFFFFF;
            line-height: 35px;
            text-align: center;
            margin-top: 42px;
            display: flex;
            justify-content: center;
            align-items: center;
            .signal{
                width: 2px;
                height: 15px;
                background: #FFFFFF;
                border-radius: 1px 1px 1px 1px;
                opacity: 1;
                display: inline-block;
                margin: 0 2px;
            }

            .signal2{
                width: 2px;
                height: 10px;
                background: #FFFFFF;
                border-radius: 1px 1px 1px 1px;
                opacity: 1;
                display: inline-block;
                margin: 0 10px 0 2px;
            }
       }
    }
    .liveStreamingEnd{
        position: absolute;
        top: 30%;
        left: 50%;
        transform: translate(-50%, -30%);
        display: flex;
        flex-direction: column;
        align-items: center;
        .tis{
            font-size: 36px;
            font-family: OPPOSans-Medium, OPPOSans;
            font-weight: 500;
            color: #FFFFFF;
            line-height: 17px;
            text-shadow: 0px 2px 6px rgba(0,0,0,0.2);
        }
        .user{
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 90px;
            .head_portrait{
                width: 80px;
                height: 80px;
                border-radius: 40px;
                opacity: 1;
            }
            p{
                font-size: 20px;
                font-family: OPPOSans-Medium, OPPOSans;
                font-weight: 500;
                color: #FFFFFF;
                line-height: 17px;
                text-shadow: 0px 2px 6px rgba(0,0,0,0.2);
                margin-top: 10px;
            }
        }
        .open_yeahgo{
            width: 296px;
            height: 52px;
            background: linear-gradient(95deg, #FF6E53 0%, #FF0000 100%);
            border-radius: 74px 74px 74px 74px;
            opacity: 1;
            font-size: 16px;
            font-family: Source Han Sans CN-Bold, Source Han Sans CN;
            font-weight: 700;
            color: #FFFFFF;
            line-height: 52px;
            text-align: center;
            margin-top: 32px;
        }
    }
    .footer{
        width: 100%;
        position: fixed;
        display: flex;
        flex-direction: column;
        bottom: 0;
        padding: 17px 13px;
        .function{
            display: flex;
            justify-content: space-between;
            .comment{
            display: flex;
            justify-content: space-between;
            padding: 0 3px 0 18px;
            width: 180px;
            height: 39px;
            background: #111118;
            border-radius: 98px 98px 98px 98px;
            opacity: 0.2;
            font-size: 14px;
            font-family: OPPOSans-Medium, OPPOSans;
            font-weight: 500;
            color: rgba(255,255,255,0.66);
            line-height: 39px;
            margin-bottom: 12px;
            .expression{
                width: 36px;
                height: 36px;
            }
        }
        .share{
            width: 39px;
            height: 39px;
        }
        }

        .open_yeahgo{
            text-align: center;
            width: 296px;
            height: 44px;
            background: linear-gradient(95deg, #FF6E53 0%, #FF0000 100%);
            border-radius: 74px 74px 74px 74px;
            opacity: 1;
            font-size: 16px;
            font-family: Source Han Sans CN-Bold, Source Han Sans CN;
            font-weight: 700;
            color: #FFFFFF;
            line-height: 44px;
            margin: 0 auto;
        }
     
    }
  }

  
  </style>