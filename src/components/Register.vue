<template>
  <div>
    <el-row style="text-align: center; margin-top: 4.2cm;">
      <h1 align="center">用户注册</h1>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="6">
        <el-input placeholder="请输入用户名" v-model="username" clearable>
        </el-input>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="6">
        <el-input placeholder="请输入密码" v-model="password" show-password>
        </el-input>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="6">
        <el-input placeholder="请确认密码" v-model="password2" show-password>
        </el-input>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="6">
        <el-button type="primary" style="width: 100%;" @click="doSubmit()">注册</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data() {
      return {
        username: '',
        password:'',
        password2:''
      }
    },
    methods:{
      doSubmit(){
        this.$router.push({
          path:'/login',
          query:{
            username:this.username,
            password:this.password
          }
        });
      }

    }
  }
</script>

<style>
  .el-row {
    margin-bottom: 15px;
  }
</style>
