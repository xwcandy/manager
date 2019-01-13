//所有跟路由相关的都写到这里

//导入vue
import Vue from 'vue';
//导入 vue-router
import VueRouter from 'vue-router';
//use一下
Vue.use(VueRouter);

//导入路由里面的组件
import login from '../components/login.vue';
import main from '../components/main.vue';

//写路由规则
let routes = [
    {
        path: '/login',
        component: login
    },
    {
        path: '/',
        component: main
    }
]

//实例化路由对象
let router = new VueRouter({
    routes  //routes: routes
})

//暴露出去  （实例化路由对象）
export default router;
