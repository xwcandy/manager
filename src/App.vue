<template>
  <div class="login-container">
    <div class="form-wrap">
      <h3>用户登录</h3>
      <!-- 表单 -->
      <el-form label-position="top" label-width="80px" :model="formData">
        <el-form-item label="用户名">
          <el-input v-model="formData.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formData.password"></el-input>
        </el-form-item>
        <el-button type="primary" class='btn-login'>登录</el-button>
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
      }
    }
  },
  components: {
  }
}
</script>

<style lang='scss'>
  .login-container {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: skyblue;
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
