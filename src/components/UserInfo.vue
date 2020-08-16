<template>
  <div class="total">
    <div class="info" style="width: 70%;margin-top: 30px;float: left">
      <div style="float: left">
        <h1 style="float: left">个人资料</h1>
        <el-button
          class="edit_button"
          type="primary"
          v-show="!isEdit"
          @click="clickedit_info()"
        >修改信息</el-button
        >
        <el-button
          class="edit_button"
          type="primary"
          v-show="isEdit"
          @click="submitForm('ruleForm')"
        >保存信息
        </el-button>
        <el-button @click="resetForm('ruleForm')" v-show="isEdit"
        >重置</el-button
        >
      </div>
      <div style="border-bottom:2px solid #CCC;padding-top: 100px"></div>
      <div v-if="!isEdit" style="padding-top: 30px">
        <i
          class="el-icon-picture-outline"
          style="float: left;font-size:30px; margin-top: 33px; margin-right:10px"
        ></i>
        <h3 style="float: left;margin-top:35px">头像：</h3>
        <img class="photo" v-bind:src="Image" alt="" />
      </div>
      <div v-show="!isEdit" style="padding-top: 100px">
        <div>
          <i
            class="el-icon-view"
            style="float: left;font-size:30px; margin-top: 17px; margin-right:10px"
          ></i>
          <h3 style="float: left">昵称：{{ Nick }}</h3>
        </div>
      </div>
      <div v-show="!isEdit" style="padding-top: 70px">
        <i
          class="el-icon-user"
          style="float: left;font-size:30px; margin-top: 17px; margin-right:10px"
        ></i>
        <h3 style="float: left">性别：{{ Sex }}</h3>
      </div>
      <div v-show="!isEdit" style="padding-top: 70px">
        <i
          class="el-icon-present"
          style="float: left;font-size:30px; margin-top: 17px; margin-right:10px"
        ></i>
        <h3 style="float: left">生日：{{ Birthday }}</h3>
      </div>
      <div v-show="!isEdit" style="padding-top: 70px">
        <i
          class="el-icon-school"
          style="float: left;font-size:30px; margin-top: 17px; margin-right:10px"
        ></i>
        <h3 style="float: left">邮箱：{{ Email }}</h3>
      </div>
      <div v-show="!isEdit" style="padding-top: 70px">
        <i
          class="el-icon-s-promotion"
          style="float: left;font-size:30px; margin-top: 17px; margin-right:10px"
        ></i>
        <h3 style="float: left">心情：{{ Mood }}</h3>
      </div>

      <div id="editform" v-if="isEdit" style="padding-top: 30px">
        <el-form
          class="change"
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
        >
          <el-form-item label="头像：" prop="image" style="font-size:30px">
            <!-- <el-input
              v-model="ruleForm.mood"
              style="width: 200px;float: left"
            ></el-input> -->
            <el-upload
              class="avatar-uploader"
              action
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :on-change="changefile"
              :file-list="fileList"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="昵称：" prop="nick" style="font-size:30px">
            <el-input
              v-model="ruleForm.nick"
              style="width: 200px;float: left"
            ></el-input>
          </el-form-item>
          <el-form-item label="性别：" prop="sex">
            <el-radio-group
              v-model="ruleForm.sex"
              style="float: left;padding-top: 13px"
            >
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="生日：" required>
            <el-col :span="11">
              <el-form-item prop="birthday">
                <el-date-picker
                  type="date"
                  style="width: 200px;float: left"
                  placeholder="选择日期"
                  v-model="ruleForm.birthday"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="邮箱：" prop="email" style="font-size:30px">
            <el-input
              v-model="ruleForm.email"
              style="width: 200px;float: left"
            ></el-input>
          </el-form-item>
          <el-form-item label="心情：" prop="mood" style="font-size:30px">
            <el-input
              v-model="ruleForm.mood"
              style="width: 200px;float: left"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "UserInfo",
  created() {
    axios({
      url: "http://127.0.0.1:8000/myinfo",
      methods: "get",
      params: {
        name: this.$store.state.name,
        token: this.$store.state.token
      }
    }).then(res => {
      (this.Nick = res.data.Nick),
        (this.Sex = res.data.Sex === true ? "女" : "男");
      this.Birthday = res.data.Birthday;
      this.Email = res.data.Email;
      this.Image = res.data.imgurl;
      this.Mood = res.data.tags;
    });
  },
  data() {
    return {
      ruleForm: {
        image: this.Image,
        nick: this.Nick,
        sex: this.Sex,
        birthday: this.Birthday,
        email: this.Email,
        userid: this.User_id,
        mood: this.Mood,
        fileList: this.fileList
      },
      rules: {
        nick: [{ required: false, message: "请填写您的昵称", trigger: "blur" }],
        sex: [{ required: true, message: "请选择您的性别", trigger: "change" }],
        birthday: [
          { required: true, message: "请选择您的生日", trigger: "change" }
        ],
        email: [
          { required: true, message: "请填写您的邮箱", trigger: "blur" },
          { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" }
        ],
        mood: [
          { required: false },
        ],
        image: [
          { required: false },
        ]
      },
      Username: "DarkShining",
      Nick: "欧豆豆",
      Sex: "男",
      Birthday: "1999-11-26",
      Email: "269096320@qq.com",
      isEdit: false,
      Mood: "起飞",
      Image: require("../assets/logo.png"),
      fileList:[]

    };
  },
  methods: {
    lll() {
      this.$router.push("/login");
    },
    changefile(file){
      this.ruleForm.fileList.push(file)
    },
    submitForm: function(formName) {
      const _this = this;
      this.isEdit = false;
      this.$refs[formName].validate(valid => {
        if (valid) {
          let formData = new FormData();
          formData.append("name", this.$store.state.name);
          formData.append("token", this.$store.state.token);
          formData.append("newname", this.ruleForm.nick);
          formData.append("gender", (this.ruleForm.sex==="女").toString());
          formData.append("birthday", this.ruleForm.birthday);
          formData.append("newemail", this.ruleForm.email);
          if(this.ruleForm.fileList.length!==0)
          {
            formData.append("uphoto",this.ruleForm.fileList[this.ruleForm.fileList.length-1].raw)
          }
          formData.append("tags",this.ruleForm.mood)

          let config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
          console.log(formData)
          axios
            .post("http://127.0.0.1:8000/changeUserInfo", formData, config)
            .then(res => {
              console.log(res);
             this.$store.commit('changename',res)
              location.reload()
            });
        } else {
          _this.$alert("修改信息失败", "数据格式错误");
          return false;
        }
        this.isEdit = false;
      });
    }, //表单提交，修改信息
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    clickedit_info() {
      this.isEdit = true;
      this.ruleForm.nick = this.Nick;
      this.ruleForm.sex = this.Sex;
      this.ruleForm.birthday = this.Birthday;
      this.ruleForm.email = this.Email;
      this.ruleForm.mood = this.Mood;
      this.ruleForm.fileList =this.fileList

    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    handleAvatarSuccess(res, file) {
      this.ruleForm.image = URL.createObjectURL(file.raw);
      console.log("aaaaa");
    },
  }
};
</script>

<style scoped>
#editform {
  font-size: 50px;
}

.info {
  margin-left: 8%;
}

.change {
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
  float: left;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
