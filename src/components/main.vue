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
              <el-button type="danger" @click="logout">退出</el-button>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <!-- 主体 -->
      <el-container>
        <!-- 侧边栏 -->
        <el-aside width="200px">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            router   
          >
            <el-submenu v-for="(item, index) in menuList" :key="item.id" :index="item.order+''">
              <template slot="title" class='nav-title'>
                <i class="el-icon-location"></i>
                <span>{{item.authName}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item v-for="(ele, i) in item.children" :key="ele.id" :index="'/'+ele.path">
                    <i class="el-icon-menu"></i>
                    <span>{{ele.authName}}</span> 
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>

          </el-menu>
        </el-aside>
        <!-- 右边内容 -->
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
      return {
          menuList: [],
      }
  },
  methods: {
    logout() {
      this.$confirm("你真的要狠心离开我吗?", "提示", {
        confirmButtonText: "狠心抛弃",
        cancelButtonText: "不忍离开",
        type: "warning"
      })
        .then(() => {
          // 确认退出
          this.$message({
            type: "success",
            message: "你真狠心!"
          });
          // 删除token
          window.sessionStorage.removeItem("token");
          // 跳转到登录页 编程式导航
          this.$router.push("/login");
        })
        .catch(() => {
          // 取消
          this.$message({
            type: "success",
            message: "你真的好极了！"
          });
        });
    }
  },
  // 生命周期函数   created实例创建完成就会触发
  created(){
    //发请求
    this.$axios.get('menus',{
        headers: {'Authorization':sessionStorage.getItem('token')}
    }).then( res => {
        console.log(res);
        this.menuList = res.data.data;
    }).catch( err => {
        console.log(err);
    })   
  },
  
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
  .el-menu {
      border-right: 0;
      .el-submenu__title{
          text-align: left;
      }
      
      
  }
  
}
</style>

