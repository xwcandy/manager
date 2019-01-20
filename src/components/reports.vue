<template>
  <div class="users-container">
    <!-- 面包屑导航 -->
    <el-row class="bg-purple">
      <el-col :span="24">
        <myBreadcrumb :level2="level2" :level3="level3"></myBreadcrumb>
      </el-col>
    </el-row>
    <el-row class='mt'>
      <el-col :span='24'>
        <div class='myEcharts' ref='myEcharts'></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 引入echarts
import echarts from 'echarts';
export default {
  data() {
    return {
      // 面包屑导航的数据
      level2: "数据统计",
      level3: "数据报表",
      //图表数据
      options: {
        title: {
          text: '用户数据'
        },
        tooltip : {
          trigger: 'axis',
          axisPointer: {
              type: 'cross',
              label: {
                  backgroundColor: '#6a7985'
              }
          }
        },
        legend: {
            data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
        },
        toolbox: {
          feature: {
              saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : ['周一','周二','周三','周四','周五','周六','周日']
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
          {
              name:'邮件营销',
              type:'line',
              stack: '总量',
              areaStyle: {},
              data:[120, 132, 101, 134, 90, 230, 210]
          },
          {
              name:'联盟广告',
              type:'line',
              stack: '总量',
              areaStyle: {},
              data:[220, 182, 191, 234, 290, 330, 310]
          },
          {
              name:'视频广告',
              type:'line',
              stack: '总量',
              areaStyle: {},
              data:[150, 232, 201, 154, 190, 330, 410]
          },
          {
              name:'直接访问',
              type:'line',
              stack: '总量',
              areaStyle: {normal: {}},
              data:[320, 332, 301, 334, 390, 330, 320]
          },
          {
              name:'搜索引擎',
              type:'line',
              stack: '总量',
              label: {
                  normal: {
                      show: true,
                      position: 'top'
                  }
              },
              areaStyle: {normal: {}},
              data:[820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      },
    };
  },
  // 生命周期函数
  // 渲染完之后会触发
  async mounted() {
    // 基于准备好的dom，初始化echarts实例
    // let myChart = echarts.init(document.querySelector('.myEcharts'));
    let myChart = echarts.init(this.$refs.myEcharts);
    // console.log(this.$refs);
    //发请求
    let res = await this.$axios.get("reports/type/1");
    console.log(res);
    let data = res.data.data;
    // 遍历返回的对象，修改图表数据
    for(let key in data){
      this.options[key] = data[key];
    }
    // 设置不留白 (默认是true留白的)
    this.options['xAxis'][0].boundaryGap = false;
    // 绘制图表
    myChart.setOption(this.options);
    
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
  .myEcharts {
    width: 800px;
    height: 500px;
  }
}
</style>
