<template>
  <el-dialog
    title="修改团队信息"
    :visible.sync="Visible"
    width="30%" :show-close="false" :close-on-click-modal="false">
    <div style="width: 80%">
      团队名称:
      <el-input placeholder="请输入团队名称" v-model="NewTeamData.name" style="margin-top: 30px"></el-input>
    </div>
    <div style="margin-top: 30px">团队信息:</div>
    <el-input placeholder="请输入团队信息" :rows="10" v-model="NewTeamData.MoreMessage" style="width: 80%;margin-top: 15px" type="textarea"></el-input>
    <span slot="footer" class="dialog-footer">
        <div style="float: left">请添加团队图片</div>
        <el-upload style="float: left"
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
      <el-button @click="$emit('cancel')">取 消</el-button>
      <el-button type="primary" @click="Config()">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
    import axios from "axios";

    export default {
        name: "ConfigTeamMsg",
      props:['Visible','Team'],
      created() {
          this.NewTeamData.name=this.Team.tname
        this.NewTeamData.MoreMessage=this.Team.tIntro
      },
      data(){
          return{
            imageUrl:false,
            fileList:[],
            NewTeamData:{name:'',MoreMessage:''}
          }
      },
      methods:{
        changefile(file){
          this.fileList.push(file)
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
        Config(){
          if(this.NewTeamData.name.length<3){
            this.$message({
              type:"error",
              message:'团队名称过短！'
            })
            return
          }
          let formData = new FormData();
          formData.append('name', this.$store.state.name,);
          formData.append( 'token',this.$store.state.token);
          formData.append('tname',this.NewTeamData.name);
          formData.append('tid',this.Team.tid);
          formData.append('tintro',this.NewTeamData.MoreMessage);
          if(this.fileList[this.fileList.length-1]!==undefined)
            formData.append('tphoto',this.fileList[this.fileList.length-1].raw);
          let config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
          axios.post('http://127.0.0.1:8000/changeTeamInfo',formData,config).then(res =>
          {
            console.log(res)
            if(res.data.msg==="团队名已存在"){
              this.$message({
                type:"error",
                message:'团队名已存在！'
              })
            }else {
              this.$emit('success',{tname:this.NewTeamData.name,tIntro:this.NewTeamData.MoreMessage,index:this.Team.index})
            }
          })
        }
      }
    }
</script>

<style scoped>

</style>
