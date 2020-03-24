import 'normalize.css';
import Vue from 'vue';
import Vuex from 'vuex';
import {
  Dialog,
  Button,
  ButtonGroup,
  TimeSelect,
  TimePicker,
  Row,
  Loading,
  MessageBox,
  Message,
  Notification,
  Container,
  Aside,
  Main,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup
} from 'element-ui';
import App from './App.vue';
import router from './router/index';

Vue.use(Dialog);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(TimeSelect);
Vue.use(TimePicker);
Vue.use(Row);
Vue.use(Container);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);

Vue.use(Loading.directive);
Vue.use(Vuex);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

const config = {
  state: {},
  mutations: {},
  actions: {}
};
const store = new Vuex.Store(config);

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
