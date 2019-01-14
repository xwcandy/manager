// 导入axios
import axios from 'axios';
// 导入vue
// import Vue from 'vue';
//引入element-ui 中的message
import { Message } from 'element-ui';

// 设置基地址
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/';


//注册axios拦截器
//请求发送之前拦截的
axios.interceptors.request.use( (config) => {
    // console.log(config);
    if(config.url.indexOf('login')!=-1){
        // 登录接口 什么也不做
    }else{
        // 非登录接口统一设置请求头  加上Authorization字段，值为token
        config.headers.Authorization = sessionStorage.getItem('token');
    }
    return config;
  },  (error) => {
    return Promise.reject(error);
});

// 响应完成之后拦截的
axios.interceptors.response.use(function (res) {
    //响应成功  提示返回的信息
    if(res.data.meta.status === 200){
        Message({ 
            message:res.data.meta.msg,
            type: 'success',
            duration:1000    //持续时间1秒
        });
    }else if(res.data.meta.status === 400){
        // 响应失败 提示返回的信息
        Message.error(res.data.meta.msg);
    }
    return res;
  }, function (error) {
    return Promise.reject(error);
});


//暴露
export default{ 
    install(Vue){
        Vue.prototype.$axios = axios; 
    }
}