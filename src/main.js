import Vue from 'vue'
import App from './App.vue'

// 导入element-ui的js文件和css
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// use一下
Vue.use(ElementUI);

// 导入axios 自己开发的插件
import axios from './lib/vue-axios';
Vue.use(axios);
//导入路由
import router from './lib/router';

// 引入base.css
import './assets/base.css';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  //挂载到Vue实例对象 （传入参数）
  router,
}).$mount('#app')
