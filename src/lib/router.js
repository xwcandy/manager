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

// 导入首页的嵌套组件
import users from '../components/users.vue'
import roles from '../components/roles.vue'
import rights from '../components/rights.vue'
import goods from '../components/goods.vue'


//写路由规则
let routes = [
    // 登录页
    {
        path: '/login',
        component: login
    },
    // 主页
    {
        path: '/',
        component: main,
        children: [
            {
                path: 'users',
                component: users
            },
            {
                path: 'roles',
                component: roles
            },
            {
                path: 'rights',
                component: rights
            },
            {
                path: 'goods',
                component: goods
            },
        ]
    }
]

//实例化路由对象
let router = new VueRouter({
    routes  //routes: routes
})


// 注册导航守卫
router.beforeEach((to,from,next) => {
    // console.log(from);
    // console.log(to);
    if(to.path == '/login'){
        // 什么也不做
        next();
    }else {
        //登录状态判断
        let token = window.sessionStorage.getItem("token");
        if (token) {
          //已登录
          next();          
        } else {
          //未登录
          Vue.prototype.$message.error("不要调皮，请先登录哦😯！");
          //到登录页
          // Vue.prototype.$router.push("/login");
          next('/login');
        }
    }
});


//暴露出去  （实例化路由对象）
export default router;
