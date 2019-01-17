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
// 导入面包屑组件
import myBreadcrumb from './components/myBreadcrumb.vue';

// 导入moment.js
import moment from 'moment';
// 注册全局过滤器 美化时间格式
Vue.filter('beautifyTime',(value)=>{
  return moment(value).format('YYYY-MM-DD HH:mm:ss');
})

// 注册全局组件
Vue.component('myBreadcrumb', myBreadcrumb );

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  //挂载到Vue实例对象 （传入参数）
  router,
}).$mount('#app')
