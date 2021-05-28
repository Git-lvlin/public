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
    // redirect: '/home',
    children: [],
  },
  {
    path: '/user-appointment',
    name: 'UserAppointment',
    component: () => import(/* webpackChunkName: "search" */ '@/views/user-appointment'),
    meta: {
      title: '单约列表',
    },
  },
  {
    path: '/menu',
    name: 'Menu',
    component: () => import(/* webpackChunkName: "search" */ '@/views/menu'),
    meta: {
      title: '搜索',
    },
  },
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
  if (App.isApp) {
    if (to.meta && to.meta.share) {
      if (App.appType === 'android') {
        window.Android.SHARE();
      } else {
        window.webkit.messageHandlers.SHARE.postMessage([]);
      }
    } else if (App.appType === 'android') {
      window.Android.SHARE_HIDE();
    } else {
      window.webkit.messageHandlers.SHARE_HIDE.postMessage([]);
    }
  }
});

export default router;
