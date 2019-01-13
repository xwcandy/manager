// 导入axios
import axios from 'axios';

// 设置基地址
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/';

//暴露
export default{ 
    install(Vue){
        Vue.prototype.$axios = axios;
    }
}