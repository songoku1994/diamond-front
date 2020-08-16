<template>
  <div class="total">
    <TopTools></TopTools>
    <Aside></Aside>
    <div style="width: 70%;margin-top: 30px;float: left">
    <div class="info" style="float: left">
        <h1 style="float: left">个人资料</h1>
        <el-button class="edit_button" type="primary" v-show="!isEdit" @click="clickedit_info">修改信息</el-button>
        <el-button class="edit_button" type="primary" v-show="isEdit" @click="submitForm('ruleForm')">保存信息
        </el-button>
        <el-button @click="resetForm('ruleForm')" v-show="isEdit">重置</el-button>
    </div>
    <div class="info" style="border-bottom:2px solid #CCC;padding-top: 100px;margin-right:100px"></div>
    <div class="info" v-show="!isEdit" style="padding-top: 30px">
        <h3 style="float: left">头像：</h3>
        <img class="photo" src="../assets/logo.png" alt="">
    </div>
    <div class="info" v-show="!isEdit" style="padding-top: 100px">
        <div>
            <h3 style="float: left">昵称：{{Nick}}</h3>
        </div>
    </div>
    <div class="info" v-show="!isEdit" style="padding-top: 70px">
        <h3 style="float: left">性别：{{Sex}}</h3>
    </div>
    <div class="info" v-show="!isEdit" style="padding-top: 70px">
        <h3 style="float: left">生日：{{Birthday}}</h3>
    </div>
    <div class="info" v-show="!isEdit" style="padding-top: 70px">
        <h3 style="float: left">学校：{{School}}</h3>
    </div>

    </div>
  </div>
</template>

<script>
import TopTools from "./TopTools";
import Aside from "./Aside";
export default {
    name: "UserInfo",
  components: {Aside, TopTools},
  data(){
      return{
        Nick: "DarkShining",
        Sex: "男",
        Birthday: "1999-11-26",
        School: "BUAA",
        isEdit:false
      }
    },
    methods:{
      clickedit_info(){

      }
    }
}
</script>

<style scoped>
    .info{
      margin-left: 8%;
    }

    .each {
        width: 30%;
        border: 1px solid black;
        margin: 5px;
        cursor: pointer;
    }

    .clitem {
        position: relative;
        width: 90%;
        height: 100px;
        border: 3px solid grey;
        border-radius: 15px;
    }

    .index {
        padding-top: 18px;
        padding-left: 30px;
        float: left
    }

    .edit_blog {
        position: absolute;
        top: 28px;
        right: 100px;
    }

    .destory_focus {
        position: absolute;
        top: 28px;
        right: 50px;
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

    .inputitem {
        margin-top: 15px;
        float: left;
        position: relative;
        font-size: 14px;
        width: 20%;
    }

    .inputitem_sex {
        margin-top: 25px;
        float: left;
        position: relative;
        font-size: 14px;
    }

    .editbirth {
        float: left;
        margin-top: 15px;
    }
</style>
