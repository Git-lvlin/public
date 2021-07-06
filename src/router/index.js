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
