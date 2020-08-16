<template>
  <div class="total">
    <div style="width: 70%;margin-top: 30px;float: left">
      <div class="info" style="float: left">
        <h1 style="float: left">个人资料</h1>
        <el-button class="edit_button" type="primary" v-show="!isEdit" @click="clickedit_info()">修改信息</el-button>
        <el-button class="edit_button" type="primary" v-show="isEdit" @click="submitForm('ruleForm')">保存信息
        </el-button>
        <el-button @click="resetForm('ruleForm')" v-show="isEdit">重置</el-button>
      </div>
      <div class="info" style="border-bottom:2px solid #CCC;padding-top: 100px"></div>
      <div class="info" v-show="!isEdit" style="padding-top: 30px">
        <i class="el-icon-picture-outline" style="float: left;font-size:30px; margin-top: 33px; margin-right:10px"></i>
        <h3 style="float: left;margin-top:35px">头像：</h3>
        <img class="photo" src="../assets/logo.png" alt="">
      </div>
      <div class="info" v-show="!isEdit" style="padding-top: 100px">
        <div>
          <i class="el-icon-view" style="float: left;font-size:30px; margin-top: 17px; margin-right:10px"></i>
          <h3 style="float: left">昵称：{{Nick}}</h3>
        </div>
      </div>
      <div class="info" v-show="!isEdit" style="padding-top: 70px">
        <i class="el-icon-user" style="float: left;font-size:30px; margin-top: 17px; margin-right:10px"></i>
        <h3 style="float: left">性别：{{Sex}}</h3>
      </div>
      <div class="info" v-show="!isEdit" style="padding-top: 70px">
        <i class="el-icon-present" style="float: left;font-size:30px; margin-top: 17px; margin-right:10px"></i>
        <h3 style="float: left">生日：{{Birthday}}</h3>
      </div>
      <div class="info" v-show="!isEdit" style="padding-top: 70px">
        <i class="el-icon-school" style="float: left;font-size:30px; margin-top: 17px; margin-right:10px"></i>
        <h3 style="float: left">邮箱：{{Email}}</h3>
      </div>

      <div id="editform" v-if="isEdit" style="padding-top: 30px">
        <el-form class="change" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
          <el-form-item label="昵称：" prop="nick" style="font-size:30px">
            <el-input v-model="ruleForm.nick" style="width: 200px;float: left"></el-input>
          </el-form-item>
          <el-form-item label="性别：" prop="sex">
            <el-radio-group v-model="ruleForm.sex" style="float: left;padding-top: 13px">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="生日：" required>
            <el-col :span="11">
              <el-form-item prop="birthday">
                <el-date-picker type="date" style="width: 200px;float: left" placeholder="选择日期"
                                v-model="ruleForm.birthday" value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="邮箱：" prop="email" style="font-size:30px">
            <el-input v-model="ruleForm.email" style="width: 200px;float: left"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
  export default {
    name: "UserInfo",
    created() {
      axios({
        url:"http://127.0.0.1:8000/myinfo",
        methods: "get",
        params:{
          name:this.$store.state.name,
          token:this.$store.state.token
        }
      }).then(res => {
        this.Nick = res.data.Nick,
        this.Sex = res.data.Sex===true?"男":"女"
        this.Birthday = res.data.Birthday
        this.Email = res.data.Email
      })
    },
    data(){
      return{
        ruleForm: {
          nick: this.Nick,
          sex: this.Sex,
          birthday: this.Birthday,
          email: this.Email,
          userid: this.User_id
        },
        rules: {
          nick: [
            {required: false, message: '请填写您的昵称', trigger: 'blur'}
          ],
          sex: [
            {required: true, message: '请选择您的性别', trigger: 'change'}
          ],
          birthday: [
            {required: true, message: '请选择您的生日', trigger: 'change'}
          ],
          email: [
            {required: true, message: '请填写您的邮箱', trigger: 'blur'},
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
          ],
        },
        Username: "DarkShining",
        Nick: "欧豆豆",
        Sex: "男",
        Birthday: "1999-11-26",
        Email: "269096320@qq.com",
        isEdit: false,

      }
    },
    methods:{
      lll(){
        this.$router.push("/login");
      },
      submitForm: function (formName) {
        const _this = this;
        this.isEdit = false;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.put('  ', this.ruleForm).then(function (resp) {//提交对个人信息的修改，需要提供接口
              console.log(resp);
              if (resp.data === 100) {
                _this.$alert("修改信息成功", "修改结果");
                window.location.reload()
              } else {
                _this.$alert("修改信息失败，请检查您的网络设置", "信息上传失败");
              }
            }).catch((error) => {
              console.log(error);
              _this.resetForm(formName);
            });
          } else {
            _this.$alert("修改信息失败", "数据格式错误");
            return false;
          }
          this.isEdit = false;
        });
      },//表单提交，修改信息
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      clickedit_info() {
        this.isEdit = true;
        this.ruleForm.nick = this.Nick;
        this.ruleForm.sex = this.Sex;
        this.ruleForm.birthday = this.Birthday;
        this.ruleForm.email = this.Email;
      },
      get_myinfo() {
        /**
         * @Interface 请求用户个人信息数据块集
         * 处理后扔进myinfo，然后再渲染,缺接口地址
         * 头像先不管
         * [attr1]: "这里是昵称",
         * [attr2]: "这里是性别",
         * [attr3]: "这里是邮箱",
         * [attr4]: "这里是生日"date类型，格式为，"yyyy-MM-dd"
         *
         */
        console.log("created_info");
        this.$axios.get(' ').then( //需要修改个人信息的接口
          (respond) => {
            console.log(respond);
            const dataList = respond.data;
            //this.User_image = ;
            //this.Nick = ;
            //this.Sex = ;
            //this.Birthday = ;
            //this.School = ;
            //this.User_id = ;
            console.log(this.User_id);
          }
        ).catch((error) => {
          console.log(error);
          this.Nick = "未接收到数据";
          this.Sex = "";
          this.Birthday = "";
          this.School = "未接收到数据";
          this.User_image = "../assets/logo.png";
          //this.$router.push("/login");
        });
      },
    },
  }
</script>

<style scoped>
  #editform{
    font-size: 50px;
  }

  .info{
    margin-left: 8%;
  }

  .change{
    margin-left: 5%;
    font-size: 20px;
  }

  .edit_button {
    margin-top: 25px;
    margin-left: 20px;
  }

  .photo {
    width: 100px;
    height: 100px;
    float: left
  }

</style>
