<template>
  <div class="login-container">
    <!-- 背景 -->
    <div id="iframe-wrap">
      <iframe id="iframe" src="./assets/xkbg.html" frameborder="0" width="100%" height="307px"></iframe>
    </div>
    <div class="form-wrap">
      <h3>用户登录</h3>
      <!-- 表单 -->
      <el-form label-position="top" :rules="rules" ref="formData" label-width="80px" :model="formData">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formData.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop='password'>
          <el-input  v-model="formData.password"></el-input>
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
      formData: {
        username: '',
        password: ''
      },
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
    submitForm(formData) {
      this.$refs[formData].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
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
