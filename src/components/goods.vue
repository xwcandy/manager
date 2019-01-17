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
        <el-button type="success" plain>添加商品</el-button>
      </el-col>
    </el-row>
    <!-- 表格区 -->
    <el-row>
        <el-col :span='24'>
            <template>
              <el-table :data="goodsList" border  style="width: 100%">
                <el-table-column type='index' label="#" width="40"></el-table-column>
                <el-table-column prop="goods_name" label="商品名称" width="500"></el-table-column>
                <el-table-column prop="goods_price" label="商品价格" width="100"></el-table-column>
                <el-table-column prop="goods_weight" label="商品重量" width="100"></el-table-column>
                <el-table-column prop='add_time' label="创建时间" width="160">
                    <template slot-scope="scope">
                        {{scope.row.add_time | beautifyTime}}
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <!-- 操作按钮 -->
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" plain class='el-icon-edit'></el-button>
                        <el-button size="mini" type="danger" plain class='el-icon-delete'></el-button>
                    </template>
                </el-table-column>
              </el-table>
            </template>
        </el-col>
    </el-row>
    <!-- 分页区 -->
    <el-row>
        <el-col :span='24'>
            <el-pagination 
                :current-page='sendData.pagenum'
                :page-sizes="[4, 6, 8, 10]"
                :page-size='sendData.pagesize'
                layout="total, sizes, prev, pager, next, jumper"
                :total='total'
                @current-change='currentPage'
                @size-change='sizeChange'
                >
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
      level2: "商品管理",
      level3: "商品列表",
      // 表格数据
      goodsList: [],
      // 发送的数据
      sendData: {
          query: '',
          pagenum: 1,
          pagesize: 10,
      },
      //数据总数量
      total: 0,
    };
  },
  methods: {
      // 封装请求获取商品
      async getGoods(){
          //发请求
          let res = await this.$axios.get('goods',{
              params: this.sendData
          })
      
          console.log(res);
          this.goodsList = res.data.data.goods;
          // 总数量保存一下
          this.total = res.data.data.total;
      },
      // 页码改变会触发
      currentPage(pagenum){
          console.log(pagenum);
          this.sendData.pagenum = pagenum;
          this.getGoods();
      },
      // 页容量改变会触发
      sizeChange(pagesize){
          console.log(pagesize);
          this.sendData.pagesize = pagesize;
          this.getGoods();
      }
  },
  // 生命周期函数
  created(){
      this.getGoods();   
  },

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
