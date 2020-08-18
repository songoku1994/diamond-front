<template>
  <div class="card">
    <el-row
      :gutter="20"
      type="flex"
      justify="center"
      align="middle"
      style="height:22cm"
    >
      <el-col :span="13" push="2">
        <div class="grid-content bg-purple" style="height:15cm">
          <el-carousel indicator-position="inside" height="620px">
            <el-carousel-item v-for="item in imagesbox" :key="item.id">
              <img :src="item.idView" class="carousel-image" />
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-col>
      <el-col :span="11" push="4">
        <el-row
          style="text-align: center;"
          type="flex"
          justify="end"
          align="middle"
        >
          <el-col>
            <div class="card2" style="border-radius: 25px;">
              <el-row>
                <h2 align="center">用户登录</h2>
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
                  <el-button
                    type="primary"
                    style="width: 100%;"
                    @click="doSubmit()"
                    >登录</el-button
                  >
                </el-col>
              </el-row>
              <el-row style="text-align: center; margin-top: -10px;;">
                <el-link type="primary" @click="doRetrieve()">忘记密码</el-link>
                <el-col></el-col>
                <el-link type="primary" @click="doRegister()">用户注册</el-link>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      imagesbox: [
        { id: 0, idView: require("../assets/1.jpg") },
        { id: 1, idView: require("../assets/2.jpg") },
        { id: 2, idView: require("../assets/3.jpg") },
        { id: 3, idView: require("../assets/4.jpg") }
      ]
    };
  },
  created() {
    this.username = this.$route.query.username;
    this.password = this.$route.query.password;
    axios({
      url: "http://127.0.0.1:8000/Authentication",
      methods: "get",
      params: {
        name: this.$store.state.name,
        token: this.$store.state.token
      }
    }).then(res => {
      console.log(res);
      if (res.data.state === 1) {
        this.$router.push("/tools/home");
      }
    });
  },
  methods: {
    doRegister() {
      this.$router.push("/register");
    },
    doRetrieve() {
      this.$router.push("/retrievepsd");
    },
    doSubmit() {
      // this.$router.push('/tools/home')
      axios({
        url: "http://127.0.0.1:8000/login",
        method: "get",
        params: {
          name: this.username,
          password: this.password
        }
      }).then(res => {
        console.log(res);
        if (res.data.state === 1) {
          this.$store.commit("login", res);
          this.$router.push("/tools/home");
        } else {
          this.$message({
            showClose: true,
            message: "用户名或密码错误！",
            type: "error"
          });
        }
      });
    }
  }
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
  background-color: #ffffffa6;
  display: table-cell;
  vertical-align: middle;
}
</style>
