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
      title: '营销资源落地页',
    }
  },
  {
    path: '/web/agreement',
    name: 'Agreement',
    component: () => import('@/views/agreement'),
    meta: {
      title: '协议',
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
