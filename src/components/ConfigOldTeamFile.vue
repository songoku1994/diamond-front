<template>
    <el-dialog title="编辑文档" v-if="Visible" :visible.sync="Visible" width="490px" top="5vh" :show-close="false" :close-on-click-modal="false">
      <div style="width: 80%">
        文档标题:<br><br>
        <el-input placeholder="请输入标题" v-model="OldTeamFile.Title"></el-input>
      </div>
      <br>
      <div>文档简介:</div>
      <br>
      <el-input placeholder="请输入文档简介" :rows="5" v-model="OldTeamFile.SimpleMessage" style="width: 80%" type="textarea"></el-input>
      <br><br>
      <div>所属团队:</div><br>
      <div>
        <el-select v-model="OldTeamFile.TeamId" disabled>
          <el-option :label="OldTeamFile.TeamName" :value="OldTeamFile.TeamId">{{OldTeamFile.TeamName}}</el-option>
        </el-select>
      </div>
      <br>
      <div>
        <div>权限:</div>
        <div>
          <el-select v-model="OldTeamFile.Authority">
            <el-option v-for="(i,index) in Authority" v-if="OldTeamFile.TeamId!==-1||(OldTeamFile.TeamId===-1&&(index<1||index>2))" :label="i" :value="index">{{i}}</el-option>
          </el-select>
          <el-select v-model="OldTeamFile.Revise" v-if="OldTeamFile.Authority!==0">
            <el-option label="不可评论" :value="0">不可评论</el-option>
            <el-option label="可评论" :value="1">可评论</el-option>
          </el-select>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="edit" icon="el-icon-edit">编辑内容</el-button>
        <el-button type="primary" @click="save">保存并退出</el-button>
        <el-button type="danger" @click="$emit('cancel')">不保存退出</el-button>
      </span>
    </el-dialog>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "ConfigOldTeamFile",
    props:['Visible','Title','SimpleMessage','TeamId','ArticleAuthority','Revise','TeamName','aid'],
    data(){
      return {
        OldTeamFile:{Title:'',SimpleMessage:'',TeamId:'',Authority:'',Revise:'',TeamName:'',aid:''},
        Authority:['仅自己','团队成员可见','团队成员可编辑','所有人可见','所有人可编辑'],
      }
    },
    created() {
      //从TeamManage中传入的团队名字和团队ID
      this.OldTeamFile.Title=this.Title
      this.OldTeamFile.SimpleMessage=this.SimpleMessage
      this.OldTeamFile.TeamId=this.TeamId
      this.OldTeamFile.Authority=this.ArticleAuthority
      this.OldTeamFile.Revise=this.Revise
      this.OldTeamFile.TeamName=this.TeamName
      this.OldTeamFile.aid=this.aid
      console.log(666)
      console.log(this.OldTeamFile)
    },
    methods:{
      submit(){
        if(this.OldTeamFile.Title==='')
        {
          this.$message({
            type:"warning",
            message:'请填写标题!'
          })
          return
        }
        axios.get('http://127.0.0.1:8000/judgeRepetitiveArticleName',{params:{
            name:this.$store.state.name,
            token:this.$store.state.token,
            tid:this.OldTeamFile.TeamId,
            title:this.OldTeamFile.Title
          }}
        ).then(res=>{
          // isRepetitiveArticleName
          if(res.data.isRepetitiveArticleName===true){
            this.$message({type:"error",message:'已有同名标题'})
            return
          }
          this.$emit('cancel')
          console.log(this.OldTeamFile)
          this.$router.push({path:'/tools/editfile',query:{OldTeamFile:this.OldTeamFile}})
        }).catch(res=>{
          this.$message({type:"warning",message:res})
        })
      },
      save(){},
      edit(){
        //   this.$router.push({
        //     path:'/tools/editfile',
        //     query:{
        //       NewFile:this.AllFile[i]
        //     }
        //   })
        this.$router.push({
          path:'/tools/editfile',
          query:{
            NewFile:this.OldTeamFile
          }
        })
      }
    },
    watch:{
      'OldTeamFile.TeamId'(){
        if(this.OldTeamFile.TeamId===-1&&1<=this.OldTeamFile.Authority&&this.OldTeamFile.Authority<=2){
          this.OldTeamFile.Authority=0;
        }
      },
      'OldTeamFile.Authority'(){
        if(this.OldTeamFile.Authority===0){
          this.OldTeamFile.Revise=0
        }
      }
    },
  }
</script>

<style scoped>

</style>
