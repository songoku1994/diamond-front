<template>
  <div class="card">
    <el-row
      :gutter="20"
      type="flex"
      justify="center"
      align="middle"
      style="height:22cm"
    >
      <el-col :span="12">
        <el-row class="card-step">
          <el-col>
            <el-steps :active="active" finish-status="success">
              <el-step title="步骤 1"></el-step>
              <el-step title="步骤 2"></el-step>
              <el-step title="步骤 3"></el-step>
            </el-steps>
          </el-col>
        </el-row>
        <el-row
          style="text-align: center;"
          type="flex"
          justify="center"
          align="middle"
          v-if="state === 'step1'"
        >
          <el-col :offset="7">
            <div class="card2">
              <el-row>
                <h2 align="center">用户注册</h2>
              </el-row>
              <el-row type="flex" justify="center">
                <el-col :span="14">
                  <el-input
                    placeholder="请输入用户名"
                    v-model="username"
                    clearable
                  >
                  </el-input>
                </el-col>
              </el-row>
              <el-row type="flex" justify="center">
                <el-col :span="14">
                  <el-input
                    placeholder="请输入密码"
                    v-model="password"
                    show-password
                  >
                  </el-input>
                </el-col>
              </el-row>
              <el-row type="flex" justify="center">
                <el-col :span="14">
                  <el-input
                    placeholder="请确认密码"
                    v-model="password2"
                    show-password
                  >
                  </el-input>
                </el-col>
              </el-row>
              <el-row type="flex" justify="center">
                <el-col :span="6">
                  <el-button
                    type="primary"
                    style="width: 100%;"
                    @click="next1()"
                    >下一步
                  </el-button>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-row
          style="text-align: center;"
          type="flex"
          justify="center"
          align="middle"
          v-if="state === 'step2'"
        >
          <el-col :offset="7">
            <div class="card2">
              <el-row>
                <h2 align="center">邮箱验证</h2>
              </el-row>
              <el-row type="flex" justify="center">
                <el-col :span="14">
                  <el-input
                    placeholder="请输入邮箱地址"
                    v-model="email"
                    clearable
                  >
                  </el-input>
                </el-col>
                <el-col :span="2" :offset="2">
                  <el-button
                    type="primary"
                    icon="el-icon-message"
                    @click="subEmail()"
                    circle
                  ></el-button>
                </el-col>
              </el-row>
              <el-row type="flex" justify="center">
                <el-col :span="14">
                  <el-input placeholder="请输入验证码" v-model="psd" clearable>
                  </el-input>
                </el-col>
                <el-col :span="2" :offset="2">
                  <el-button
                    type="success"
                    icon="el-icon-check"
                    circle
                    @click="next2()"
                  ></el-button>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-row
          style="text-align: center;"
          type="flex"
          justify="center"
          align="middle"
          v-if="state === 'step3'"
        >
          <el-col :offset="7">
            <div class="card2">
              <el-row>
                <h2 align="center">用户注册成功</h2>
              </el-row>
              <el-row type="flex" justify="center">
                <el-col :span="10">
                  <el-button
                    type="primary"
                    style="width: 100%;"
                    @click="tologin()"
                    >返回登录界面
                  </el-button>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import App from "../App";
import axios from "axios";
export default {
  name: "login",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      password2: "",
      active: 0,
      state: "step1",
      str: "",
      psd: ""
    };
  },
  methods: {
    judgePassword(password) {
      let str = password;
      if (str == null || str.length < 8) {
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
    judgeUserName(name) {
      if (name === "") return false;
      else if (name.length > 10) return false;
      return true;
    },
    judgeRepassword() {
      return this.password === this.password2;
    },
    judgeEmail() {
      let mail = this.email;
      const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      return reg.test(mail);
    },
    next1() {
      if (!this.judgeUserName(this.username)) {
        this.$message({
          showClose: true,
          message: "用户名不能为空！",
          type: "error"
        });
      } else if (!this.judgePassword(this.password)) {
        this.$message({
          showClose: true,
          message: "密码必须不少于八位，且不能是纯数字或字母！",
          type: "error"
        });
      } else if (!this.judgeRepassword()) {
        this.$message({
          showClose: true,
          message: "两次密码输入必须一致！",
          type: "error"
        });
      } else {
        axios({
          url: "http://127.0.0.1:8000/judgeRepetitiveUserName",
          methods: "get",
          params: {
            name: this.username
          }
        }).then(response => {
          console.log(response);
          if (response.data.state === 1) {
            this.active++;
            this.state = "step2";
          } else {
            this.$message({
              showClose: true,
              message: "该用户已被注册",
              type: "error"
            });
          }
        });
      }
    },
    next2() {
      if (this.psd === this.str) {
        this.active++;
        this.state = "step3";
        let formData = new FormData();
        formData.append("name", this.username);
        formData.append("email", this.email);
        formData.append("password", this.password);
        let config = {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        };
        axios
          .post("http://127.0.0.1:8000/register", formData, config)
          .then(res => {
            this.$message({
              showClose: true,
              message: res.data.msg,
              type: res.data.state === 1 ? "success" : "error"
            });
            if (res.data.state === 1) {
              this.$router.push({
                path: "/login",
                query: {
                  username: this.username,
                  password: this.password
                }
              });
            }
          });
      } else {
        this.$message({
          showClose: true,
          message: "验证码错误",
          type: "error"
        });
      }
    },
    doSubmit() {
      if (!this.judgeUserName(this.username)) {
        this.$message({
          showClose: true,
          message: "用户名不能为空！",
          type: "error"
        });
      } else if (!this.judgePassword(this.password)) {
        this.$message({
          showClose: true,
          message: "密码必须不少于八位，且不能是纯数字或字母！",
          type: "error"
        });
      } else if (!this.judgeRepassword()) {
        this.$message({
          showClose: true,
          message: "两次密码输入必须一致！",
          type: "error"
        });
      } else if (!this.judgeEmail()) {
        this.$message({
          showClose: true,
          message: "邮箱输入不合法！",
          type: "error"
        });
      } else {
        let formData = new FormData();
        formData.append("name", this.username);
        formData.append("email", this.email);
        formData.append("password", this.password);
        let config = {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        };
        axios
          .post("http://127.0.0.1:8000/register", formData, config)
          .then(res => {
            this.$message({
              showClose: true,
              message: res.data.msg,
              type: res.data.state === 1 ? "success" : "error"
            });
            if (res.data.state === 1) {
              this.$router.push({
                path: "/login",
                query: {
                  username: this.username,
                  password: this.password
                }
              });
            }
          });
      }
    },
    tologin() {
      this.$router.push({
        path: "/login",
        query: {
          username: this.username,
          password: this.password
        }
      });
    },
    subEmail() {
      if (!this.judgeEmail()) {
        this.$message({
          showClose: true,
          message: "邮箱输入不合法！",
          type: "error"
        });
      } else {
        axios({
          url: "http://127.0.0.1:8000/judgeRepetitiveEmail",
          methods: "get",
          params: {
            email: this.email
          }
        }).then(response => {
          console.log(response);
          if (response.data.state === 1) {
            var arr = [];
            for (var i = 65; i <= 90; arr.push(i), i++) {}
            for (var j = 97; j <= 122; arr.push(j), j++) {}
            for (var k = 48; k <= 57; arr.push(k), k++) {}
            var arr2 = [];
            for (var i = 0; i < 6; i++) {
              var index = Math.floor(Math.random() * 62);
              var char = String.fromCharCode(arr[index]);
              arr2.push(char);
            }
            var str1 = arr2.toString();
            this.str = str1.replace(/,/g, "");
            axios({
              url: "http://127.0.0.1:8000/check_mail",
              method: "get",
              params: {
                email: this.email,
                str: this.str
              }
            }).then(res => {});
          } else {
            this.$message({
              showClose: true,
              message: "该邮箱已被注册",
              type: "error"
            });
          }
        });
      }
    }
  },
  created() {}
};
</script>

<style>
.el-row {
  margin-bottom: 20px;
}
.el-carousel__item {
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 610px;
  margin: 0;
}
.carousel-image {
  width: 100%;
  height: 100%;
}
.card {
  background-size: 100% 100%;
  position: fixed;
  background: url("../assets/card_bg2.jpg") center center no-repeat;
  background-size: cover;
  height: 100%;
  width: 100%;
}
.card2 {
  height: 9cm;
  width: 10cm;
  background-color: #ffffffbd;
  display: table-cell;
  vertical-align: middle;
}
</style>
