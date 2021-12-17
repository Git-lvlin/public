import Vue from 'vue';
import VueRouter from 'vue-router';
import App from '@/utils/app';
import Index from '@/views/index';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    redirect: '/web/menu',
    children: [],
  },
  {
    path: '/web/user-appointment',
    name: 'UserAppointment',
    component: () => import('@/views/user-appointment'),
    meta: {
      title: '单约专享',
    },
  },
  {
    path: '/web/team-appointment',
    name: 'TeamAppointment',
    component: () => import('@/views/team-appointment'),
    meta: {
      title: '团约专享',
    },
  },
  {
    path: '/web/team-detail',
    name: 'TeamDetail',
    component: () => import('@/views/team-detail'),
    meta: {
      title: '团约详情',
    },
  },
  {
    path: '/web/menu',
    name: 'Menu',
    component: () => import('@/views/menu'),
    // meta: {
    //   title: 'H5 菜单页',
    // },
  },
  {
    path: '/web/price-comparsion',
    name: 'PriceComparsion',
    component: () => import('@/views/price-comparsion'),
    meta: {
      title: '比价优选',
    }
  },
  {
    path: '/web/store-in',
    name: 'StoreIn',
    component: () => import('@/views/store-in'),
    meta: {
      title: '社区店入驻',
    }
  },
  {
    path: '/web/special',
    name: 'Special',
    component: () => import('@/views/special'),
    meta: {
      title: '会员约购专享',
    }
  },
  {
    path: '/web/coupon',
    name: 'Coupon',
    component: () => import('@/views/coupon'),
    meta: {
      title: '领券中心',
    }
  },
  {
    path: '/web/exclusive-for-novices',
    name: 'ExclusiveForNovices',
    component: () => import('@/views/exclusive-for-novices'),
    meta: {
      title: '新人专享',
    }
  },
  {
    path: '/web/share',
    name: 'Share',
    component: () => import('@/views/share'),
    meta: {
      title: '分享页',
    }
  },
  {
    path: '/web/invitation',
    name: 'Invitation',
    component: () => import('@/views/invitation'),
    meta: {
      title: '邀请好友',
    }
  },
  {
    path: '/web/market',
    name: 'Market',
    component: () => import('@/views/market'),
    meta: {
      title: '',
    }
  },
  {
    path: '/web/agreement',
    name: 'Agreement',
    component: () => import('@/views/agreement'),
    meta: {
      title: '协议',
    }
  },
  {
    path: '/web/bind-box',
    name: 'BindBox',
    component: () => import('@/views/bind-box'),
    meta: {
      title: '盲盒',
    }
  },
  {
    path: '/web/my-prize',
    name: 'MyPrize',
    component: () => import('@/views/my-prize'),
    meta: {
      title: '我的奖品',
    }
  },
  {
    path: '/web/license',
    name: 'License',
    component: () => import('@/views/license'),
    meta: {
      title: '资质证照',
    }
  },
  {
    path: '/web/license-pc',
    name: 'LicensePc',
    component: () => import('@/views/license-pc'),
    meta: {
      title: '资质证照',
    }
  },
  {
    path: '/web/every-day',
    name: 'EveryDay',
    component: () => import('@/views/every-day'),
    meta: {
      title: '天天领红包',
    }
  },
  {
    path: '/web/five-star-qa',
    name: 'FiveStarQa',
    component: () => import('@/views/five-star-qa'),
    meta: {
      title: '五星店主',
    }
  },
  {
    path: '/web/five-star',
    name: 'FiveStar',
    component: () => import('@/views/five-star'),
    meta: {
      title: '五星店主限时抢',
    }
  },
  {
    path: '/web/invitation-list',
    name: 'InvitationList',
    component: () => import('@/views/invitation-list'),
    meta: {
      title: '邀请列表',
    }
  },
  {
    path: '/web/partake-list',
    name: 'PartakeList',
    component: () => import('@/views/partake-list'),
    meta: {
      title: '参与记录',
    }
  },
  {
    path: '/web/open-shop-list',
    name: 'OpenShopList',
    component: () => import('@/views/open-shop-list'),
    meta: {
      title: '开店记录',
    }
  },
  {
    path: '/web/new-share',
    name: 'NewShare',
    component: () => import('@/views/new-share'),
    meta: {
      title: '约购APP',
    }
  },
  {
    path: '/web/404',
    name: '404',
    component: () => import('@/views/404'),
    meta: {
      title: '404',
    }
  },
  {
    path: '/web/transfer',
    name: 'Rransfer',
    component: () => import('@/views/download'),
    meta: {
      title: '',
    }
  },
  {
    path: '/web/download',
    name: 'DownLoad',
    component: () => import('@/views/transfer'),
    meta: {
      title: '',
    }
  },
  {
    path: '/web/bingous',
    name: 'BinGous',
    component: () => import('@/views/bingous'),
    meta: {
      title: '协议',
    }
  },
  {
    path: '/web/limit-list',
    name: 'LimitList',
    component: () => import('@/views/limit-list'),
    meta: {
      title: '邀请列表',
    }
  },
  {
    path: '/web/time-limit',
    name: 'TimeLimit',
    component: () => import('@/views/time-limit'),
    meta: {
      title: '限时优惠',
    }
  },
  {
    path: '/web/polite-invitation',
    name: 'PoliteInvitation',
    component: () => import('@/views/polite-invitation'),
    meta: {
      title: '推荐有礼',
    }
  },
  {
    path: '/web/video',
    name: 'Video',
    component: () => import('@/views/video'),
    meta: {
      title: '',
    }
  },
  {
    path: '/web/star',
    name: 'Star',
    component: () => import('@/views/star'),
    meta: {
      title: '双心节',
    }
  },
  {
    path: '/web/action-center',
    name: 'ActionCenter',
    component: () => import('@/views/action-center'),
    meta: {
      title: '活动中心',
    }
  },
  {
    path: '/web/xy',
    name: 'Xy',
    component: () => import('@/views/xy'),
    meta: {
      title: '协议',
    }
  },
  {
    path: '/web/intensive',
    name: 'Intensive',
    component: () => import('@/views/intensive'),
    meta: {
      title: '集约是什么',
    }
  },
  {
    path: '/web/shop-pk',
    name: 'ShopPk',
    component: () => import('@/views/shop-pk'),
    meta: {
      title: '店主PK赛排行榜',
    }
  },
  {
    path: '/web/new-year',
    name: 'NewYear',
    component: () => import('@/views/new-year'),
    meta: {
      title: '约购年货节',
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  // scrollBehavior(to, from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition;
  //   }
  //   return { x: 0, y: 0 };
  // },
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || '约购';
  next();
});

export default router;
