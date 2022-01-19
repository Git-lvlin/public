<template>
  <div class="rule-box">
    <div class="back-height">
      <div class="flex_fix bar-list">
        <div :class="`bar-item ${actType == 1 ? 'bar-act' : ''}`" @click="onChangeBar(1)">攻略</div>
        <div :class="`bar-item ${actType == 2 ? 'bar-act' : ''}`" @click="onChangeBar(2)">活动规则</div>
      </div>
    </div>
    <div class="content-box">
      <div class="introduction-info" v-if="actType == 1">
        <div class="title">第一步: 试玩游戏</div>
        <div>点击“试玩游戏”熟悉游戏玩法</div>
        <div class="flex_center">
          <img class="img" :src="getImgUrl('publicMobile/game/introduction/introduction_1.png')" >
        </div>
        <div class="space" />
        <div class="title">第二步: 开始盖楼</div>
        <div>1.试玩结束后点击“开始盖楼”</div>
        <div class="flex_center">
          <img class="img" :src="getImgUrl('publicMobile/game/introduction/introduction_2.png')" >
        </div>
        <div>2.控制上一层楼短于下一层，盖的越高越好</div>
        <div class="flex_center">
          <img class="img" :src="getImgUrl('publicMobile/game/introduction/introduction_3.png')" >
        </div>
        <div class="space" />
        <div class="title">第三步: 抽188元现金红包</div>
        <div>游戏结束后盖楼3层（含）以上，即有机会获得随机现金红包</div>
        <div class="text_red"><span class="text_bold">小贴士：</span>楼层越高奖励的红包金额越大，最高获得188元现金红包，现金红包提现到支付宝秒到账!</div>
        <div class="flex_center">
          <img class="img" :src="getImgUrl('publicMobile/game/introduction/introduction_4.png')" >
        </div>
        <div class="space" />
        <div class="title">第四步: 获取游戏机会</div>
        <div>游戏机会用完后可以通过邀请新用户注册和玩游戏获得机会</div>
        <div class="text_red"><span class="text_bold">小贴士：分享游戏</span>邀请1个新用户一起玩游戏可以获得2次游戏机会</div>
        <div class="flex_center">
          <img class="img_264" :src="getImgUrl('publicMobile/game/introduction/introduction_55.png')" >
        </div>
        <div class="space" />
        <div class="title">第五步: 冲榜拿8888元现金红包</div>
        <div>活动结束后邀请用户，排名前10名的用户额外获得现金大奖</div>
        <div class="flex_center">
          <img class="img_264" :src="getImgUrl('publicMobile/game/introduction/introduction_6.png?v=2022')" >
        </div>
        <div class="flex_center">
          <img class="img" :src="getImgUrl('publicMobile/game/introduction/introduction_5.png')" >
        </div>
        <div class="space" />
        <div>特别说明：通过玩盖楼游戏和邀请用户排名获得的现金红包提现需要扣除20%的偶然所得税，提现到账金额为扣除税费后的金额。</div>
      </div>

      <div class="rule-info" v-if="actType == 2">
        <div class="title left">一、活动时间</div>
        <div>2022年1月25日10:00:00-2月16日23:59:59</div>
        <div class="space" />
        <div class="title left">二、参与条件</div>
        <div>约购APP注册用户，且用户的约购APP已更新到最新版本。</div>
        <div class="space" />
        <div class="title left">三、参与方式</div>
        <div>活动时间内用户通过约购APP进入“新年盖高楼”游戏页面，根据页面提示参与活动。</div>
        <div class="space" />
        <div class="title left">四、新年盖高楼活动细则</div>
        <div>1.活动期间每个用户有3次试玩机会，用户可通过试玩来熟悉游戏玩法，试玩游戏没有奖励；</div>
        <div>2.试玩结束后用户可以点击“开始盖楼”参与游戏，游戏开始后，用户需控制长方形楼层的长度来叠放楼层，要求上一层短于下一层，每叠放成功一层则开始下一层的叠放；</div>
        <div>3.如用户叠放楼层的上一层长于或等于下一层，则游戏立即结束，用户需要重新开始盖楼；</div>
        <div>4.游戏结束后盖楼3层（含）以上，即有机会获得随机现金红包，用户完成的的楼层越高，奖励的随机现金红包越大；</div>
        <div>5.活动期间每个用户赠送3次游戏机会，超出后需要通过游戏页面的“分享”按钮，邀请新用户注册和玩游戏来获得游戏机会，每邀请1个新用户注册约购，赠送1次游戏机会，新用户参与盖楼活动（试玩游戏不算），再赠送1次游戏机会，每邀请1个新用户注册且玩游戏（试玩游戏不算）最多获得2次游戏机会；</div>
        <div>举例：A邀请B注册，获得1次游戏机会，B注册并参与游戏，A再获得1次游戏机会，一共奖励两次游戏机会；</div>
        <div>6.奖励的游戏机会24小时内有效，过期自动失效，游戏机会失效前将发送站内信提醒用户；</div>
        <div>7.邀请新用户注册≥30人即可参与“邀请用户”排名，邀请人数越多排名越高，活动结束后排名第1名的用户奖励8888元现金红包，第2名奖励1888元现金红包，第3名奖励888元现金红包，第4-10名奖励188元现金红包；</div>
        <div>8.“邀请用户”排名奖励将在获得结束后的7个工作日内，核实发放到获奖用户账户；</div>
        <div>9.如邀请人数一致，以取得该排名的时间先后顺序进行排名；</div>
        <div>10.现金红包可提现到支付宝账户，用户提现前需绑定支付宝账户（如没有支付宝账户需注册支付宝账户），前3次提现≥0.13元，超过3次，提现金额需≥3元以上方可提现（提现仅支持整数金额）；</div>
        <div>11.现金红包提现需要缴纳20%的偶然所得税，用户提现后的到账金额为扣除20%偶然所得税后的剩余金额；</div>
        <div>12.同一支付宝账户（同一身份信息下的所有支付宝账户均视为同一账户）仅限绑定一个约购账户，提现不成功可自行换绑账号，提现成功后不支持换绑，换绑疑问可以咨询客服指导操作；</div>
        <div>13.除邀请用户以外，闯关楼层也进行排名，闯关楼层越高排名越高，如层数一致，以取得该层数的时间先后顺序进行排名；</div>
        <div>14.闯关楼层排名仅作为荣誉奖励，不给予现金红包奖励；</div>
        <div class="space" />
        <div class="title left">五、其他注意事项</div>
        <div>15.用户需遵循诚实、信用的原则参与活动，如在参与活动的过程出现违规或作弊行为（如机器批量注册账户、通过技术手段修改游戏数据等）约购有权冻结用户提现资格，并保留进一步追责的权利；</div>
        <div>16.约购可以根据本活动的实际举办情况对活动规则进行变动和调整，相关变动或调整将公布在活动页面上，公布后依法生效；</div>
        <div>17.本活动与苹果公司无关；</div>
      </div>

      <div class="copyright">本次活动一切解释权归约购APP所有！</div>
    </div>
  </div>
</template>

<script>
import { getImgUrl } from '@/utils/tools';

export default {
  data() {
    return {
      actType: 1,
      rule: []
    };
  },
  methods: {
    getImgUrl,
    onChangeBar(type) {
      if(type != this.actType) {
        this.actType = type;
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }
    }
  },
};
</script>

<style lang="scss" scoped>
  .rule-box {
    min-height: 100vh;
    font-size: 14px;
    color: #666;
    line-height: 22px;
  }

  .back-height {
    height: 46px;
  }
  .bar-list {
    position: fixed;
    top: 0;
    z-index: 5;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 46px;
    background-color: #fff;
    border-top: 1px solid #eee;
  }
  .bar-item {
    position: relative;
    width: 50%;
    font-size: 14px;
    color: #999999;
    line-height: 46px;
    text-align: center;
  }
  .bar-act {
    font-weight: 600;
    color: #E5352F;
  }
  .bar-act::after {
    content: '';
    position: absolute;
    bottom: 2px;
    left: 0;
    width: 100%;
    height: 2px;
    background: #E5352F;
  }
  
  .content-box{
    padding-top: 12px;
  }

  .rule-info,
  .introduction-info {
    padding: 16px;
    background-color: #fff;
  }
  .title {
    color: #333;
    font-weight: 600;
    text-align: center;
    margin-bottom: 4px;
  }
  .left {
    text-align: left;
  }
  .space {
    height: 30px;
  }
  .img {
    width: 240px;
    margin: 5px auto;
  }
  .img_100 {
    width: 100%;
    margin: 5px auto;
  }
  .img_264 {
    width: 264px;
    margin: 5px auto;
  }
  .text_red {
    color: #F73E37;
  }
  .text_bold {
    font-weight: 600;
  }

  .copyright {
    font-size: 12px;
    font-weight: 600;
    color: #CCCCCC;
    line-height: 17px;
    text-align: center;
    padding-top: 60px;
    padding-bottom: 40px;
    background-color: #fff;
  }
</style>
