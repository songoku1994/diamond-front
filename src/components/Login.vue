<template>
  <div>
    <el-row style="text-align: center; margin-top: 5cm;">
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
        <el-button type="primary" style="width: 100%;" @click="doSubmit()">登录</el-button>
      </el-col>
    </el-row>
    <el-row style="text-align: center; margin-top: -10px;;">
      <el-link type="primary">忘记密码</el-link>
      <el-col span="2"></el-col>
      <el-link type="primary" @click="doRegister()">用户注册</el-link>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'login',
  data() {
    return {
      username: '',
      password:''
    }
  },
  created() {
    this.username=this.$route.query.username
    this.password=this.$route.query.password
    axios({
      url:"http://127.0.0.1:8000/Authentication",
      methods: "get",
      params:{
        name:this.$store.state.name,
        token:this.$store.state.token
      }
    }).then(res =>{
      console.log(res)
      if(res.data.state === 1)
      {
        this.$router.push('/tools/home')
      }})
  },
  methods:{
    doRegister(){
      this.$router.push('/register');
    },
    doSubmit(){
      // this.$router.push('/tools/home')
      axios({
        url:'http://127.0.0.1:8000/login',
        method:"get",
        params:{
          name:this.username,
          password:this.password
        }
      }).then(res=>{
        console.log(res)
        if(res.data.state===1)
        {
          this.$store.commit('login',res)
          this.$router.push('/tools/home')
        }else{
          this.$message({
            showClose: true,
            message: "账号或密码错误，请重试",
            type: "error"
          });
        }




      })
    },
  }
}
</script>

<style>
.el-row {
  margin-bottom: 15px;
}
</style>
