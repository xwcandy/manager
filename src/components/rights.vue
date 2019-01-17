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
      <el-col :span="24">
        <el-button type="primary" round plain>添加角色</el-button>
      </el-col>
    </el-row>
    <!-- 表格区 -->
    <el-row>
        <el-col :span='24'>
            <template>
              <el-table :data="rightsList" border  style="width: 100%">
                <el-table-column type='index' label="#" width="40"></el-table-column>
                <el-table-column prop="authName" label="权限名称" width="400"></el-table-column>
                <el-table-column prop="path" label="路径" width="400"></el-table-column>
                <el-table-column prop='level' label="层级">
                    <!-- 操作按钮 -->
                    <template slot-scope="scope">
                        <span v-if="scope.row.level == 0">一级</span>
                        <span v-if="scope.row.level == 1">二级</span>
                        <span v-if="scope.row.level == 2">三级</span>
                    </template>
                </el-table-column>
              </el-table>
            </template>
        </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 面包屑导航的数据  
      level2: "权限管理",
      level3: "权限列表",
      // 表格数据
      rightsList: [],
    };
  },
  // 生命周期函数
  async created(){
      //发请求
      let res = await this.$axios.get('rights/list');
      
      console.log(res);
      this.rightsList = res.data.data;
      
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
        .el-tag {
            margin: 5px;
        }
    }
    
</style>
