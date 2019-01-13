<template>
    <div>
        main
        <el-button type='danger' @click="logout">退出</el-button>
    </div>
</template>

<script>
export default {
    beforeCreate(){
        let token = window.sessionStorage.getItem('token');
        if(token){
            //已登录
        }else{
            //未登录
            this.$message.error('不要调皮，请先登录哦😯！');
            //到登录页
            this.$router.push('/login');
        }
    },
    methods: {
        logout(){
            // 删除token
            window.sessionStorage.removeItem('token');
            // 跳转到登录页
            this.$router.push('/login');
        }
    }
}
</script>

<style>

</style>

