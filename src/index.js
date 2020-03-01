import "normalize.css";
import "lib-flexible/flexible.js";
import Vue from "vue";
import App from "./App";
import Vuex from "vuex";

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
    Notification
} from "element-ui";

Vue.use(Dialog);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(TimeSelect);
Vue.use(TimePicker);
Vue.use(Row);

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
    el: "#app",
    store,
    render: h => h(App)
});