<template>
  <el-dialog title="个人资料" v-if="Visible" :visible.sync="Visible" width="490px" top="3vh" :show-close="false" :close-on-click-modal="false">
    <div style="width: 80%">
      <div>
        <i
          class="el-icon-picture-outline"
          style="float: left;font-size:30px; margin-top: 33px; margin-right:10px"
        ></i>
        <h3 style="float: left;margin-top:35px">头像：</h3>
        <img class="photo" :src="Image" alt="" />
      </div>
      <div style="padding-top: 100px">
        <div>
          <i
            class="el-icon-view"
            style="float: left;font-size:30px; margin-top: 17px; margin-right:10px"
          ></i>
          <h3 style="float: left">昵称：{{ Nick }}</h3>
        </div>
      </div>
      <div style="padding-top: 70px">
        <i
          class="el-icon-user"
          style="float: left;font-size:30px; margin-top: 17px; margin-right:10px"
        ></i>
        <h3 style="float: left">性别：{{ Sex }}</h3>
      </div>
      <div style="padding-top: 70px">
        <i
          class="el-icon-present"
          style="float: left;font-size:30px; margin-top: 17px; margin-right:10px"
        ></i>
        <h3 style="float: left">生日：{{ Birthday }}</h3>
      </div>
      <div style="padding-top: 70px">
        <i
          class="el-icon-school"
          style="float: left;font-size:30px; margin-top: 17px; margin-right:10px"
        ></i>
        <h3 style="float: left">邮箱：{{ Email }}</h3>
      </div>
    </div>
    <span slot="footer" class="dialog-footer" style="margin-top: 30px">
        <el-button type="danger" @click="$emit('cancel')">返回</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "OtherUserInfo",
    props:['Visible','id'],
    created() {
      axios({
        url:'http://127.0.0.1:8000/getUserInfoByID',
        params:{
          name:this.$store.state.name,
          token:this.$store.state.token,
          id:this.id
        }
      }).then(res=>{
        console.log(res)
        this.Image='http://127.0.0.1:8000/media/'+res.data.userInfo.uphoto
        this.Nick=res.data.userInfo.name
        this.Sex=!res.data.userInfo.gender?'男':'女'
        this.Birthday=res.data.userInfo.birthday
        this.Email=res.data.userInfo.email
      })
    },
    data(){
      return{
        Image:null,
        Nick:null,
        Sex:null,
        Birthday:null,
        Email:null,
      }
    }
  }
</script>

<style scoped>
  .photo {
    width: 100px;
    height: 100px;
    float: left;
  }
</style>
