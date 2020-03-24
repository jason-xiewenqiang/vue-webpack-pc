import Home from '@/views/layout/Home.vue';
import App from '../App.vue';

export default [{
  path: '/',
  component: App,
  name: 'app',
  redirect: '/home',
  children: [{
    path: '/home',
    name: 'home',
    component: Home,
    redirect: '/home/index',
    children: [{
      path: '/home/index',
      name: 'index',
      component: () => import(/* webpackChunkName: "index" */ '@/views/pages/index/index.vue')
    },
    {
      path: '/home/user',
      name: 'user',
      component: () => import(/* webpackChunkName: "user" */ '@/views/pages/user/user.vue')
    }
    ]
  }]
}];
