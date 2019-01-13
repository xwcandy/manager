import Vue from 'vue'
import App from './App.vue'

// 导入element-ui的js文件和css
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// use一下
Vue.use(ElementUI);

// 引入base.css
import './assets/base.css';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app')
