<template>
  <van-share-sheet
    v-model="showShare"
    title="立即分享给好友"
    :options="options"
    @select="onSelect"
  />
</template>

<script>
import { ShareSheet, Toast } from 'vant';
import App from '@/utils/app';
import { post } from '@/utils/request';
import { urlAddParams } from '@/utils/tools';
import copy from 'copy-to-clipboard';

export default {
  props: {
    title: {
      type: String,
      default: '宾购商城',
    },
    imgUrl: {
      type: String,
      default: 'https://bingou.com.cn/static/h5/img/logo.png',
    },
    desc: {
      type: String,
      default: '享省，享赚，就选宾购商城，快去看看吧',
    },
    link: {
      type: String,
      default: '',
    },
    memberId: {
      type: Number,
      required: true,
    },
  },
  components: {
    [ShareSheet.name]: ShareSheet,
  },
  computed: {
    shareData() {
      return {
        title: this.title,
        imgUrl: this.imgUrl,
        desc: this.desc,
        link: this.link || urlAddParams(`share_id=${this.memberId}`),
      };
    },
  },
  created() {
    window.share = () => {
      this.showShare = true;
    };
  },
  data() {
    return {
      showShare: false,
      options: [
        {
          name: '微信好友',
          icon: 'https://bingou.com.cn/static/h5/img/icon_weixin.png',
        },
        {
          name: '朋友圈',
          icon: 'https://bingou.com.cn/static/h5/img/icon_pengyouquan.png',
        },
        {
          name: 'QQ好友',
          icon: 'https://bingou.com.cn/static/h5/img/icon_QQ.png',
        },
        {
          name: '复制链接',
          icon: 'link',
        },
      ],
    };
  },
  methods: {
    
    onSelect(option) {
      switch (option.name) {
        case '微信好友':
          this.naviteShare('SHARE_WEIXIN');
          this.shareLog(3, 1);
          break;
        case '朋友圈':
          this.naviteShare('SHARE_WEIXIN_CIRCLE');
          this.shareLog(3, 2);
          break;
        case 'QQ好友':
          this.naviteShare('SHARE_QQ');
          this.shareLog(3, 3);
          break;
        case '复制链接':
          if (copy(this.shareData.link)) {
            Toast('复制成功');
          }
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .van-share-sheet__options {
  justify-content: space-between;
  padding-left: 0px !important;
}
</style>
