import Vue from 'vue';
import App from './App';

new Vue({
    el: '#app',
    template: '<App/>',
    components: {
        App
    }
});
if (module.hot) {
    module.hot.accept();
}