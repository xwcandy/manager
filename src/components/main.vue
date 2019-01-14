<template>
  <div class="main-container">
    <el-container>
      <!-- 头部 -->
      <el-header>
        <!-- layout布局 类似栅格 -->
        <el-row>
          <el-col :span="4">
            <div class="grid-content bg-purple logo">1</div>
          </el-col>
          <el-col :span="18">
            <div class="grid-content bg-purple-light title">电商后台管理系统</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple exit-btn">
                <el-button type="danger" @click='logout'>退出</el-button>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <!-- 主体 -->
      <el-container>
        <!-- 侧边栏 -->
        <el-aside width="200px">Aside</el-aside>
        <!-- 右边内容 -->
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    // let token = window.sessionStorage.getItem("token");
    // if (token) {
    //   //已登录
    // } else {
    //   //未登录
    //   this.$message.error("不要调皮，请先登录哦😯！");
    //   //到登录页
    //   this.$router.push("/login");
    // }
  },
  methods: {
    logout() {
      // 删除token
      window.sessionStorage.removeItem("token");
      // 跳转到登录页
      this.$router.push("/login");
    }
  }
};
</script>

<style lang='scss' scoped>
.main-container {
  height: 100%;
  .el-container {
    height: 100%;
  }
  .el-header,
  .el-footer {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    line-height: 60px;
    .logo {
        text-align: left;
    }
    .title {
        font-size: 30px;
        font-weight: 700;
        color: #fff;
    }
    .exit-btn {
        text-align: right;
    }
  }

  .el-aside {
    background-color: #d3dce6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
}
</style>

