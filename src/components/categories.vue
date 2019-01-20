<template>
  <div class="users-container">
    <!-- 面包屑导航 -->
    <el-row class="bg-purple">
      <el-col :span="24">
        <myBreadcrumb :level2="level2" :level3="level3"></myBreadcrumb>
      </el-col>
    </el-row>
    <!-- 操纵框 -->
    <el-row>
      <el-col :span="24">
        <el-button type="success" plain>添加分类</el-button>
      </el-col>
    </el-row>
    <!-- 表格区 -->
    <el-row>
      <el-col :span="24">
        <template>
          <el-table :data="cateList" border style="width: 100%">
            <el-table-tree-column
              file-icon="icon icon-file"
              folder-icon="icon icon-folder"
              prop="label"
              label="labelname"
              width="220"
            >
            </el-table-tree-column>
            <el-table-column prop="cat_name" label="分类名称" width="180"></el-table-column>
            <el-table-column prop="cat_name" label="分类名称" width="500"></el-table-column>
            <el-table-column prop="cat_level" label="级别" width="100">
              <template slot-scope="prop">
                <span v-if="prop.row.cat_level == 0">一级</span>
                <span v-if="prop.row.cat_level == 1">一级</span>
                <span v-if="prop.row.cat_level == 2">三级</span>
              </template>
            </el-table-column>
            <el-table-column prop="cat_deleted" label="是否有效" width="100">
              <template slot-scope="scope">{{scope.row.cat_deleted == 'true'? '否':'是'}}</template>
            </el-table-column>
            <el-table-column label="操作">
              <!-- 操作按钮 -->
              <template slot-scope="scope">
                <el-button size="mini" type="primary" plain class="el-icon-edit"></el-button>
                <el-button size="mini" type="danger" plain class="el-icon-delete"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-col>
    </el-row>
    <!-- 分页区 -->
    <el-row>
      <el-col :span="24">
        <el-pagination
          :current-page="sendData.pagenum"
          :page-sizes="[4, 6, 8, 10]"
          :page-size="sendData.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @current-change="currentPage"
          @size-change="sizeChange"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ElTreeGrid from "element-tree-grid";
export default {
  data() {
    return {
      // 面包屑导航的数据
      level2: "商品管理",
      level3: "商品分类",
      // 表格数据
      cateList: [],
      // 发送的数据
      sendData: {
        type: 3,
        pagenum: 1,
        pagesize: 10
      },
      //数据总数量
      total: 0
    };
  },
  components: {
    ElTreeGrid
  },
  methods: {
    // 封装请求获取商品
    async getCates() {
      //发请求
      let res = await this.$axios.get("categories", {
        params: this.sendData
      });

      console.log(res);
      this.cateList = res.data.data.result;
      //   // 总数量保存一下
      this.total = res.data.data.total;
    },
    // 页码改变会触发
    currentPage(pagenum) {
      console.log(pagenum);
      this.sendData.pagenum = pagenum;
      this.getCates();
    },
    // 页容量改变会触发
    sizeChange(pagesize) {
      console.log(pagesize);
      this.sendData.pagesize = pagesize;
      this.getCates();
    }
  },
  // 生命周期函数
  created() {
    this.getCates();
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
