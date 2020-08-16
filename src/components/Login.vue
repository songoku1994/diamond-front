<template>
  <div>
    <el-row>
      <h1 align="center">用户登录</h1>
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
        <el-button type="primary" style="width: 100%;" @click="doSubmit()">提交</el-button>
      </el-col>
    </el-row>
    <el-row style="text-align: center; margin-top: -10px;;">
      <el-link type="primary">忘记密码</el-link>
      <el-link type="primary" @click="doRegister()">用户注册</el-link>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data() {
      return {
        username: '',
        password:''
      }
    },
    methods:{
      doSubmit(){
        this.$router.push('/home')
      }
    }
  }
</script>

<style>
  .el-row {
    margin-bottom: 15px;
  }
</style>
