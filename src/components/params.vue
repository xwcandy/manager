<template>
  <div class="users-container">
    <!-- 面包屑导航 -->
    <el-row class="bg-purple">
      <el-col :span="24">
        <myBreadcrumb :level2="level2" :level3="level3"></myBreadcrumb>
      </el-col>
    </el-row>
    <!-- 警告框 -->
    <el-row class="mt mb">
      <el-col :span="24">
        <el-alert title="警告提示的文案" type="warning" show-icon></el-alert>
      </el-col>
    </el-row>
    <!-- 级联选择器 -->
    <el-row>
      <el-col :span="24">
        <span>请选择商品分类：</span>
        <el-cascader expand-trigger="hover" :options="paramsList" :props='props' v-model="selectedOptions"></el-cascader>
      </el-col>
    </el-row>
    <!-- tab栏区 -->
    <el-row>
      <el-col :span="24">
        <el-tabs v-model="activeTab" >
          <el-tab-pane label="动态参数" name="dynamic">
              <el-button type="primary" size="mini">添加动态参数</el-button>
              <!-- 表格 -->
              <el-table  border  style="width: 100%">
                <el-table-column  label="" width="30"></el-table-column>
                <el-table-column type='index' label="#" width="30"></el-table-column>
                <el-table-column prop="role_name" label="商品参数" width="150"></el-table-column>
                <el-table-column label="操作">
                    <!-- 操作按钮 -->
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" plain class='el-icon-edit'></el-button>
                        <el-button size="mini" type="danger" plain class='el-icon-delete'></el-button>
                        <el-button size="mini" type="warning" plain class='el-icon-check'></el-button>
                    </template>
                </el-table-column>
              </el-table>
          </el-tab-pane>
          <el-tab-pane label="静态参数" name="static">
              <el-button type="primary" size="mini">添加静态参数</el-button>
              <!-- 表格 -->
              <el-table  border  style="width: 100%">
                <el-table-column type='index' label="#" width="30"></el-table-column>
                <el-table-column prop="role_name" label="属性名称" width="150"></el-table-column>
                <el-table-column prop="role_name" label="属性值" width="150"></el-table-column>
                <el-table-column label="操作">
                    <!-- 操作按钮 -->
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" plain class='el-icon-edit'></el-button>
                        <el-button size="mini" type="danger" plain class='el-icon-delete'></el-button>
                        <el-button size="mini" type="warning" plain class='el-icon-check'></el-button>
                    </template>
                </el-table-column>
              </el-table>
          </el-tab-pane>
        </el-tabs>
        
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 面包屑导航的数据
      level2: "商品管理",
      level3: "分类参数",
      // 级联选择器（下拉菜单）数据
      paramsList: [],
      //起别名
      props: {
          label: 'cat_name',
          value: 'cat_id'
      },
      selectedOptions: [],
      //选中的tab栏
      activeTab: 'dynamic'
    };
  },
  // 生命周期函数
  //   async
  async created() {
    //发请求
    let res = await this.$axios.get("categories?type=3");

    console.log(res);
    this.paramsList = res.data.data;
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
