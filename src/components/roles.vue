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
              <el-table :data="rolesList" border  style="width: 100%">
                <!-- 展开项 -->
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <!-- 生成一级项 -->
                        <el-row v-for="(item, index) in props.row.children" :key="item.id" >
                            <el-col :span='4'>
                                <el-tag closable type=""> {{item.authName}}</el-tag>
                                <i class='el-icon-arrow-right'></i>
                            </el-col>
                            <!-- 二级项 -->
                            <el-col :span='20'>
                                <el-row v-for="(level2) in item.children" :key="level2.id"> 
                                    <el-col :span='4'>
                                        <el-tag closable type="success"> {{level2.authName}}</el-tag>
                                        <i class='el-icon-arrow-right'></i>
                                    </el-col>
                                    <!-- 三级项 -->
                                    <el-col :span='20'>
                                        <el-tag v-for="(level3) in level2.children" :key="level3.id" closable type="warning"> {{level3.authName}}</el-tag>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
                <el-table-column type='index' label="#" width="30"></el-table-column>
                <el-table-column prop="roleName" label="角色名称" width="150"></el-table-column>
                <el-table-column prop="roleDesc" label="角色描述" width="300"></el-table-column>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 面包屑导航的数据  
      level2: "权限管理",
      level3: "角色列表",
      // 表格数据
      rolesList: [],
    };
  },
  // 生命周期函数
  async created(){
      //发请求
      let res = await this.$axios.get('roles');
      
      console.log(res);
      this.rolesList = res.data.data;
      
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
