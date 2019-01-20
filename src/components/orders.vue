<template>
  <div class='users-container'>
    <!-- 面包屑导航 -->
    <el-row class='bg-purple'>
      <el-col :span="24" >
        <myBreadcrumb :level2="level2" :level3="level3"></myBreadcrumb>
      </el-col>
    </el-row>
    <!-- 表格区 -->
    <el-row>
        <el-col :span='24'>
            <template>
              <el-table :data="ordersList" border  style="width: 100%">
                <el-table-column type='index' label="#" width="40"></el-table-column>
                <el-table-column prop="order_number" label="订单编号" width="260"></el-table-column>
                <el-table-column prop="order_price" label="订单价格" width="100"></el-table-column>
                <el-table-column prop="order_pay" label="是否付款" width="100">
                    <template slot-scope='scope'>
                       <!-- {{scope.row.order_pay == 0? '未付款':'已付款'}} -->
                       <el-button v-if="scope.row.order_pay == 0" type="danger" plain size='mini'>未付款</el-button>
                       <el-button v-if="scope.row.order_pay == 1" type="danger" plain size='mini'>已付款</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="is_send" label="是否发货" width="100"></el-table-column>
                <el-table-column prop='create_time' label="下单时间" width="160">
                    <template slot-scope="scope">
                        {{scope.row.create_time | beautifyTime}}
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
      level2: "订单管理",
      level3: "订单列表",
      // 表格数据
      ordersList: [],
      // 发送的数据
      sendData: {
          pagenum: 1,
          pagesize: 10,
      },
      //数据总数量
      total: 0,
    };
  },
  methods: {
      // 封装请求获取商品
      async getorders(){
          //发请求
          let res = await this.$axios.get('orders',{
              params: this.sendData
          })
      
          console.log(res);
          this.ordersList = res.data.data.goods;
          // 总数量保存一下
          this.total = res.data.data.total;
      },
      // 页码改变会触发
      currentPage(pagenum){
          console.log(pagenum);
          this.sendData.pagenum = pagenum;
          this.getorders();
      },
      // 页容量改变会触发
      sizeChange(pagesize){
          console.log(pagesize);
          this.sendData.pagesize = pagesize;
          this.getorders();
      }
  },
  // 生命周期函数
  created(){
      this.getorders();   
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
