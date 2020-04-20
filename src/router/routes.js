import Home from '@/views/layout/Home.vue';
import App from '../App.vue';

export default [{
  path: '/',
  component: App,
  name: 'app',
  redirect: '/user',
  children: [{
    name: 'home',
    path: '/home',
    component: Home,
    children: [{
      path: '/index',
      name: 'index',
      component: () => import(/* webpackChunkName: index */ '../views/pages/index/index.vue')
    },
    {
      path: '/user',
      name: 'user',
      component: () => import(/* webpackChunkName: user */ '../views/pages/user/user.vue')
    }
    ]
  }]
}];
