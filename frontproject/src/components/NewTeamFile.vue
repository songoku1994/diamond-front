<template>
  <div>
    <el-dialog title="新建文档" v-if="visible" :visible.sync="visible" width="490px" top="5vh" :show-close="false" :close-on-click-modal="false">
      <div style="width: 80%">
        文档标题:<br><br>
        <el-input placeholder="请输入标题" v-model="NewTeamFile.Title"></el-input>
      </div>
      <br>
      <div>文档简介:</div>
      <br>
      <el-input placeholder="请输入文档简介" :rows="5" v-model="NewTeamFile.SimpleMessage" style="width: 80%" type="textarea"></el-input>
      <br><br>
      <div>所属团队:</div><br>
      <div>
        <el-select v-model="NewTeamFile.TeamName" disabled>
          <el-option :label="TeamName" :value="TeamName">{{TeamName}}</el-option>
        </el-select>
      </div>
      <br>
      <div>
        <div>权限:</div>
        <div>
          <el-select v-model="NewTeamFile.Authority">
            <el-option v-for="(i,index) in Authority" v-if="NewTeamFile.TeamId!==-1||(NewTeamFile.TeamId===-1&&(index<1||index>2))" :label="i" :value="index">{{i}}</el-option>
          </el-select>
          <el-select v-model="NewTeamFile.Revise" v-if="NewTeamFile.Authority!==0">
            <el-option label="不可评论" :value="0">不可评论</el-option>
            <el-option label="可评论" :value="1">可评论</el-option>
          </el-select>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('cancel')">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "NewTeamFile",
    props:['visible','TeamId','TeamName','Team'],
    data(){
      return {
        NewTeamFile:{Title:null,SimpleMessage:null,TeamId:null,Authority:0,Revise:0,TeamName:'',aid:-1},
        Authority:['仅自己','团队成员可见','团队成员可编辑','所有人可见','所有人可编辑'],
      }
    },
    created() {
      //从TeamManage中传入的团队名字和团队ID
      console.log(123321)
      this.NewTeamFile.Title=''
      this.NewTeamFile.SimpleMessage=''
      this.NewTeamFile.TeamId=this.TeamId
      this.NewTeamFile.TeamName=this.TeamName
    },
    methods:{
      submit(){
        if(this.NewTeamFile.Title==='')
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
            tid:this.NewTeamFile.TeamId,
            title:this.NewTeamFile.Title,
            aid:-1
          }}
        ).then(res=>{
          // isRepetitiveArticleName
          if(res.data.isRepetitiveArticleName===true){
            this.$message({type:"error",message:'已有同名标题'})
            return
          }
          this.$emit('cancel')
          console.log(this.NewTeamFile)
          this.$router.push({
            path:'/tools/editfile',
            query:{
              NewFile:JSON.stringify(this.NewTeamFile),
              Team:JSON.stringify(this.Team)
            }
          })
        }).catch(res=>{
          this.$message({type:"warning",message:res})
        })
      }
    },
    watch:{
      'NewTeamFile.TeamId'(){
        if(this.NewTeamFile.TeamId===-1&&1<=this.NewTeamFile.Authority&&this.NewTeamFile.Authority<=2){
          this.NewTeamFile.Authority=0;
        }
      },
      'NewTeamFile.Authority'(){
        if(this.NewTeamFile.Authority===0){
          this.NewTeamFile.Revise=0
        }
      }
    },
  }
</script>

<style scoped>

</style>
