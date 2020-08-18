<template>
  <div>
    <div class="info" style="width: 70%;margin-top: 30px;float: left">
      <div style="float: left">
        <h1 style="float: left">我的团队</h1>
      </div>
      <div style="border-bottom:2px solid #CCC;padding-top: 100px"></div>
      <div  v-for="(i,index) in TeamData" @click="Jump(index)" style="float: left;margin-top: 45px">
        <div v-for="j in 15" style="float: left">&nbsp;</div>
        <el-card class="box-card" shadow="hover" style="cursor: pointer">
          <div slot="header" class="clearfix" style="height: 30px">
            <div style="float: left;font-size: 20px">{{i.tname}}</div>
            <div style="float: right">
            </div>
            <el-dropdown style="float: right" @command="ShowMore" >
              <span style="cursor: pointer;color:#409EFF"><i class="el-icon-more"></i></span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="{name:MoreMessage,data:index}">团队简介</el-dropdown-item>
                <el-dropdown-item :command="{name:Config,data:index}" v-if="$store.state.name===TeamData[index].creatorname">团队设置</el-dropdown-item>
                <el-dropdown-item :command="{name:Quit,data:index}" style="color: #f56c6c">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <el-image key="cover" :src="'http://127.0.0.1:8000/media/'+i.Teamphoto"></el-image>
        </el-card>
      </div>
      <div style="float: left;margin-top: 45px">
        <div v-for="j in 15" style="float: left">&nbsp;</div>
        <el-button type="info" style="height: 300px;width: 280px;font-size:200px;float: left" icon="el-icon-plus" class="clearfix" @click="NewTeam"></el-button>
      </div>
    </div>
    <el-dialog
      :title="ShowData.tname"
      :visible.sync="ShowMessageVisible"
      width="30%" :show-close="false" :close-on-click-modal="false">
      <div style="margin-top: 10px">团队信息:</div>
      <el-input placeholder="该团队暂无团队信息" :rows="10" v-model="ShowData.tIntro" style="width: 80%;margin-top: 15px" type="textarea" disabled></el-input>
      <div style="margin-top: 30px">团队人数:[{{ShowData.membernumber}}]</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="ShowMessageVisible=false">返 回</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="新建团队"
      :visible.sync="NewMessageVisible"
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
      <el-button @click="NewMessageVisible=false">取 消</el-button>
      <el-button type="primary" @click="SubmitNewTeam()">确 定</el-button>
  </span>
    </el-dialog>
    <ConfigTeamMsg :visible="ConfigTeamMsgVisible"
                   :team="Team"
                   @cancel="ConfigTeamMsgVisible=false"
                   v-if="ConfigTeamMsgVisible" @success="Change"></ConfigTeamMsg>
  </div>
</template>

<script>
  import axios from 'axios'
  import ConfigTeamMsg from "./ConfigTeamMsg";
  export default {
    name: "UserTeam",
    components: {ConfigTeamMsg},
    created() {
      axios({
        url:'http://127.0.0.1:8000/myTeam',
        params:{
          name: this.$store.state.name,
          token: this.$store.state.token,
        }
      }).then(res=>{
        console.log(res)
        this.TeamData=this.TeamData.concat(res.data.teamList)
        for(let i in this.TeamData){
          this.TeamData[i].creatorname=res.data.teamCreatorList[i]
        }
      })
    },
    data(){
      return{
        TeamData:[],
        ShowMessageVisible:false,
        ShowData:{},
        NewTeamData:{name:'',MoreMessage:''},
        NewMessageVisible:false,
        ButtonVisible:false,
        image:null,
        fileList:[],
        imageUrl:null,
        Team:null,
        ConfigTeamMsgVisible:false
      }
    },
    watch:{
      fileList(){
        console.log(this.fileList)
      },
      imageUrl(){
        console.log(this.imageUrl)
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
      Quit(index){
        if(this.TeamData[index].creatorname==this.$store.state.name){
          this.$confirm('你是该团队的创建者，退出团队将解散团队，是否继续', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            console.log(this.TeamData[index].tid)
            axios({
              url:'http://127.0.0.1:8000/DisbandTeam',
              params:{
                name:this.$store.state.name,
                token:this.$store.state.token,
                tid:this.TeamData[index].tid,
              }
            }).then(res=>{
              console.log(res)
              this.TeamData.splice(index,1)
              this.$message({
                type:"success",
                message:'解散成功'
              })
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            });
          })
        }
        else{
          this.$confirm('此操作将退出团队, 是否继续', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            axios({
              url:'http://127.0.0.1:8000/exitTeam',
              params:{
                name:this.$store.state.name,
                token:this.$store.state.token,
                tid:this.TeamData[index].tid,
                uid:this.$store.state.uid
              }
            }).then(res=>{
              console.log(res)
              this.TeamData.splice(index,1)
              this.$message({
                type:"success",
                message:'退出成功'
              })
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            });
          })
        }
      },
      MoreMessage(index){
        this.ShowMessageVisible=true
        this.ShowData=this.TeamData[index]
      },
      NewTeam(){
        this.NewTeamData.name=''
        this.NewTeamData.MoreMessage=''
        this.NewMessageVisible=true
      },
      SubmitNewTeam(){
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
        formData.append('tid',-1);
        formData.append('tintro',this.NewTeamData.MoreMessage);
        if(this.fileList[this.fileList.length-1]!==undefined)
          formData.append('tphoto',this.fileList[this.fileList.length-1].raw);
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        axios.post('http://127.0.0.1:8000/createTeam',formData,config).then(res =>
        {
          console.log(res)
          if(res.data.msg==="团队名已存在"){
            this.$message({
              type:"error",
              message:'团队名已存在！'
            })
          }else {
            this.NewMessageVisible=false
            location.reload()
          }
        })
      },
      ShowMore(object){
        object.name(object.data)
      },
      Jump(index){
        this.$router.push({
          path:'/tools/teammanage/',
          query:{
            Team:JSON.stringify(this.TeamData[index]),
          }
        })
      },
      Config(index){
        console.log(this.TeamData[index])
        this.Team=this.TeamData[index]
        this.Team.index=index
        this.ConfigTeamMsgVisible=true
      },
      Change(val){
        console.log(val)
        this.ConfigTeamMsgVisible=false
        this.$message({
          type:"success",
          message:'修改成功'
        })
        setTimeout(() =>{
          window.location.reload()
        },1000);
      },
    }
  }
</script>

<style scoped>
  .info{
    margin-left: 8%;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 280px;
    height: 300px;
  }
</style>
