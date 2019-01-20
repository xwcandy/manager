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
            <template slot="append"><i class='el-icon-search' @click='getUsers'></i></template>
         </el-input>
      </el-col>
      <el-col :span="16">
        <el-button type="success" plain @click='visible=true'>添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格区 -->
    <el-row>
        <el-col :span='24'>
            <template>
              <el-table :data="usersList" border  style="width: 100%">
                <el-table-column type='index' label="#" width="30"></el-table-column>
                <el-table-column prop="username" label="姓名" width="150"></el-table-column>
                <el-table-column prop="email" label="邮箱" width="300"></el-table-column>
                <el-table-column prop="mobile" label="电话" width="300"></el-table-column>
                <el-table-column prop='mg_state' label="用户状态" width="100">
                    <!-- 开关 -->
                    <template slot-scope='scope'>
                        <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
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
    <!-- 分页区 -->
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
    <!-- 添加用户的对话框 -->
    <el-dialog title="添加用户" :visible.sync="visible">
        <el-form :model="form" :rules="rules" ref='form'>
          <el-form-item label="用户名称"label-width="100px" prop='username'>
            <el-input v-model="form.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户密码"label-width="100px" prop='password'>
            <el-input v-model="form.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" label-width="100px">
            <el-input v-model="form.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机号" label-width="100px">
            <el-input v-model="form.mobile" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="visible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('form')">确 定</el-button>
        </div>
    </el-dialog>

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
      usersList: [],
      // 发送的数据
      sendData: {
          query: '',
          pagenum: 1,
          pagesize: 10,
      },
      //数据总数量
      total: 0,
      //是否显示添加对话框
      visible: false,
      //添加用户发送的数据
      form: {
          username: '',
          password: '',
          email: '',
          mobile: ''
      },
      //表单验证规则
      rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 23, message: '长度在 3 到 23 个字符', trigger: 'change' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 23, message: '长度在 6 到 23 个字符', trigger: 'change' }
          ]
      },
    };
  },
  methods: {
      // 将获取用户数据封装
      async getUsers(){
          //发请求
          let res = await this.$axios.get('users',{
              params: this.sendData
          })
          console.log(res);
          this.usersList = res.data.data.users;
          // 总数量保存一下
          this.total = res.data.data.total;
      },
      //   搜索用户
      //   searchUser(){
      //       this.getUsers();
      //   },
      //点确认按钮进行验证
      submitForm(form) {
        this.$refs[form].validate(async (valid) => {
          if (valid) {
            // 验证成功
            //发添加用户的请求
            let res = await this.$axios.post('users',this.form);
            console.log(res);
            if(res.data.meta.status == 201){
                //添加成功
                //关闭对话框
                this.visible = false;
                //重新请求数据  没有做提示是因为在拦截器统一做了提示
                this.getUsers();
            }
          } else {
            // 验证失败
            console.log('error submit!!');
            return false;
          }
        });
      }
      
  },
  // 生命周期函数
  //   async 
  async created(){
      this.getUsers();    
  }
}

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
