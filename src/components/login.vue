<template>
  <div class="login-container">
    <!-- 背景 -->
    <!-- <div id="iframe-wrap">
      <iframe id="iframe" :src="src" frameborder="0" width="100%" height="307px"></iframe>
    </div> -->
    <div class="form-wrap">
      <h3>用户登录</h3>
      <!-- 表单 -->
      <el-form label-position="top" :rules="rules" ref="formData" label-width="80px" :model="formData">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formData.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop='password'>
          <el-input type='password' v-model="formData.password"></el-input>
        </el-form-item>
        <el-button type="primary" class='btn-login' @click="submitForm('formData')">登录</el-button>
      </el-form>

    </div>
  </div>
</template>

<script>

export default {
  name: 'login',
  data() {
    return {
      // 背景地址
      src: './assets/xkbg.html',
      // 表单数据
      formData: {
        username: '',
        password: ''
      },
      //验证相关数据
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '长度不能少于 6 个字符', trigger: 'change' }
        ],
      },
    }
  },
  methods: {
    // 点击登录按钮 （验证输入内容是否为空 长度是否符合要求）
    submitForm(formData) {
      this.$refs[formData].validate((valid) => {
        if (valid) {
          // 内容不为空 并且长度符合要求 成功
          // 发请求 axios 调用接口
          this.$axios.post('login',this.formData)
            .then( res => {
            //   console.log(res);
              if(res.data.meta.status === 200){
                //登录成功
                //保存token
                window.sessionStorage.setItem('token',res.data.data.token);
                // 跳转去首页 （定时器为了模拟延迟）
                setTimeout(() => {
                    this.$router.push('/');
                }, 1500);
              }else if(res.data.meta.status === 400){
                //登录失败 
              }
            })

        } else {
          // 失败 弹框提示
          this.$message.error('请正确输入用户名和密码哦！😁');
          return false;
        }
      });
    },
  },
  
}
</script>

<style lang='scss'>
  .login-container {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient( to bottom, #58B7CA,#18325B) ;
    .form-wrap {
      padding: 40px;
      width: 500px;
      border-radius: 20px;
      background-color: #fff;
      .btn-login {
        width: 100%;
      }
    }
  } 
</style>
