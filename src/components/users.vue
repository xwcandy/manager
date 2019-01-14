<template>
  <div class='users-container'>
    <!-- 面包屑导航 -->
    <el-row class='bg-purple'>
      <el-col :span="24" >
        <myBreadcrumb :level2="level2" :level3="level3"></myBreadcrumb>
      </el-col>
    </el-row>
    <!-- 操纵框 -->
    <el-row>
      <el-col :span="8">
         <el-input placeholder="请输入内容" v-model='sendData.query'>
            <template slot="append"><i class='el-icon-search'></i></template>
         </el-input>
      </el-col>
      <el-col :span="16">
        <el-button type="success" plain>添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格区 -->
    <el-row>
        <el-col :span='24'>
            <template>
              <el-table :data="tableData" border  style="width: 100%">
                <el-table-column type='index' label="#" width="30"></el-table-column>
                <el-table-column prop="role_name" label="姓名" width="150"></el-table-column>
                <el-table-column prop="email" label="邮箱" width="300"></el-table-column>
                <el-table-column prop="mobile" label="电话" width="300"></el-table-column>
                <el-table-column label="用户状态" width="100">
                    <!-- 开关 -->
                    <template slot-scope='scope'>
                        <el-switch v-model="state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <!-- 操作按钮 -->
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" plain class='el-icon-edit'></el-button>
                        <el-button size="mini" type="danger" plain class='el-icon-delete'></el-button>
                        <el-button size="mini" type="warning" plain class='el-icon-check'></el-button>
                    </template>
                </el-table-column>
              </el-table>
            </template>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span='24'>
            <el-pagination 
                :current-page='sendData.pagenum'
                :page-sizes="[4, 6, 8, 10]"
                :page-size='sendData.pagesize'
                layout="total, sizes, prev, pager, next, jumper"
                :total='total'>
            </el-pagination>
        </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 面包屑导航的数据  
      level2: "用户管理",
      level3: "用户列表",
      // 表格数据
      tableData: [],
      // 发送的数据
      sendData: {
          query: '',
          pagenum: 1,
          pagesize: 10,
      },
      //数据总数量
      total: 0,
      // 开关状态
      state: true,
    };
  },
  // 生命周期函数
  created(){
      //发请求
      this.$axios.get('users',{
          params: this.sendData
      }).then( res => {
          console.log(res);
          this.tableData = res.data.data.users;
          // 总数量保存一下
          this.total = res.data.data.total;
      })
  }
};
</script>

<style lang='scss'>
    .users-container {
        // 面包屑导航
        .el-breadcrumb {
            padding-left: 10px;
            height: 40px;
            line-height: 40px;
        }
    }
    
</style>
