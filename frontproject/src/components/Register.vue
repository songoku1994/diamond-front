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
        <el-input placeholder="请输入邮箱" v-model="email" clearable>
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
        <el-button type="primary" style="width: 100%;" @click="doSubmit()"
          >注册</el-button
        >
      </el-col>
    </el-row>
  </div>
</template>

<script>
import App from "../App";
import axios from 'axios'
export default {
  name: "login",
  data() {
    return {
      username: "",
      email:"",
      password: "",
      password2: ""
    };
  },
  methods: {
    judgePassword(password){
      let str = password;
      if (str == null || str.length <8) {
        return false;
      }
      let reg1 = new RegExp(/^[0-9A-Za-z]+$/);
      if (!reg1.test(str)) {
        return false;
      }
      let reg = new RegExp(/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/);
      if (reg.test(str)) {
        return true;
      } else {
        return false;
      }
    },
    judgeUserName(name){
      if(name==="")
        return false
      else if(name.length>10)
        return false
      return true
    },
    judgeRepassword()
    {
      return this.password===this.password2
    },
    judgeEmail(){
      let mail=this.email
      const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      return reg.test(mail);
    }
    ,
    doSubmit() {
      if(!this.judgeUserName(this.username))
      {
        this.$message({

            showClose: true,
            message: "用户名不能为空！",
            type: "error"
          })

      }else if(!this.judgePassword(this.password))
      {
        this.$message({

          showClose: true,
          message: "密码必须不少于八位，且不能是纯数字或字母！",
          type: "error"
        })
      }else if(!this.judgeRepassword())
      {
        this.$message({

          showClose: true,
          message: "两次密码输入必须一致！",
          type: "error"
        })
      }else if(!this.judgeEmail())
      {
        this.$message({

          showClose: true,
          message: "邮箱输入不合法！",
          type: "error"
        })
      }else{
        let formData = new FormData();
        formData.append('name', this.username);
        formData.append('email', this.email);
        formData.append('password', this.password);
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        axios.post('http://127.0.0.1:8000/register',formData,config).then(res =>
        {
            this.$message({
              showClose: true,
              message: res.data.msg,
              type: res.data.state===1? "success":"error"
            });
            if(res.data.state === 1)
            {
                this.$router.push({
                  path: "/login",
                  query: {
                    username: this.username,
                    password: this.password
                  }
                });
            }
        })
      }

    }
  },
  created() {
  }
};
</script>

<style>
.el-row {
  margin-bottom: 15px;
}
</style>
