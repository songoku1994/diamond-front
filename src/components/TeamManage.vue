<template>
  <div class="info" style="width: 70%;margin-top: 30px;float: left">
    <div>
      <div>
        <h1>{{Team.tname}}</h1>
      </div>
      <div>
        <el-radio-group v-model="SelectMode">
          <el-radio-button label="1" border>
            文档
            <i style="color: white" class="el-icon-circle-plus" v-if="SelectMode=='1'" @click="NewTeamFileVisible=true"></i>
            <i style="color: #409eff" class="el-icon-s-order" v-if="SelectMode!='1'" @click="SelectMode='1'"></i>
          </el-radio-button>
          <el-radio-button label="2" border>
            成员
            <i style="color: white" class="el-icon-circle-plus" v-if="SelectMode=='2'" @click="SearchNewMemberVisible=true"></i>
            <i style="color: #409eff" class="el-icon-user-solid" v-if="SelectMode!='2'" @click="SelectMode='2'"></i>
          </el-radio-button>
          <el-radio-button label="3" border>
            动态
            <i style="color: white" class="el-icon-share" v-if="SelectMode=='3'"></i>
            <i style="color: #409eff" class="el-icon-share" v-if="SelectMode!='3'" @click="SelectMode='3'"></i>
          </el-radio-button>
        </el-radio-group>
        <el-button type="info" @click="ConfigTeamMessage" v-if="isCaptain" icon="el-icon-setting"></el-button>
      </div>
    </div>
    <div style="border-bottom:2px solid #CCC;padding-top: 30px"></div>
    <div>
      <el-table v-show="SelectMode=='1'" :data="TeamFile" stripe border>
        <el-table-column prop="fields.title" label="标题"></el-table-column>
        <el-table-column prop="fields.lastedittime" label="最近修改日期"></el-table-column>
        <el-table-column prop="fields.createtime" label="创建日期"></el-table-column>
        <el-table-column prop="name" label="作者"></el-table-column>
        <el-table-column width="170">
          <template slot-scope="scope">
            <el-button type="primary" @click="Config(scope.row)" icon="el-icon-edit" v-if="isCaptain||scope.row.fields.uid==$store.state.uid||scope.row.fields.visibility>1" circle></el-button>
            <el-button type="info" @click="View(scope.row)" icon="el-icon-view" circle></el-button>
            <el-button type="danger" @click="DeleteFile(scope.$index)" icon="el-icon-delete" :disabled="!isCaptain&&scope.row.fields.uid!=$store.state.uid" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table v-show="SelectMode=='2'" :data="TeamMember" stripe border>
        <el-table-column prop="name" label="用户名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="createtime" label="创建日期"></el-table-column>
        <el-table-column width="150">
          <template slot-scope="scope">
            <el-button type="info" @click="ShowInfo(scope.row)" icon="el-icon-info"></el-button>
            <el-button type="danger" @click="KickOut(scope.$index)" icon="el-icon-delete" :disabled="!isCaptain||scope.row.uid==$store.state.uid"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table v-show="SelectMode=='3'" :data="TeamWorkTrend" stripe border>
        <el-table-column prop="name" label="用户名"></el-table-column>
        <el-table-column prop="title" label="文档名"></el-table-column>
        <el-table-column prop="time" label="修改日期"></el-table-column>
        <el-table-column prop="content" label="修改内容" show-overflow-tooltip="true"></el-table-column>
        <el-table-column width="80">
          <template slot-scope="scope">
            <el-button type="info" @click="toviewfile(scope.row.aid)" icon="el-icon-info"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <NewTeamFile v-if="NewTeamFileVisible"
                 :visible="NewTeamFileVisible"
                 :team-id="Team.tid"
                 :team-name="Team.tname"
                 :team="Team"
                 @cancel="NewTeamFileVisible=false"></NewTeamFile>
    <ConfigOldTeamFile v-if="ConfigOldTeamFileVisible"
                       :visible="ConfigOldTeamFileVisible"
                       :title="SelectArticle.fields.title"
                       :team-id="Team.tid"
                       :team="Team"
                       :team-name="Team.tname"
                       :article-authority="SelectArticle.fields.visibility"
                       :simple-message="SelectArticle.fields.message"
                       :revise="SelectArticle.fields.commentGranted"
                       :aid="SelectArticle.pk"
                       :uid="SelectArticle.fields.uid"
                       @cancel="func()"
                        @cancel2="ConfigOldTeamFileVisible=false">

    </ConfigOldTeamFile>
    <SearchNewMember :visible="SearchNewMemberVisible"
                     :team="Team"
                     :team-member="TeamMember"
                     @cancel="SearchNewMemberVisible=false"></SearchNewMember>
    <OtherUserInfo :visible="OtherUserInfoVisible"
                   v-if="OtherUserInfoVisible"
                   :id="SelectUser.uid"
                   @cancel="OtherUserInfoVisible=false"></OtherUserInfo>
    <ConfigTeamMsg :visible="ConfigTeamMsgVisible"
                   v-if="ConfigTeamMsgVisible"
                   :team="Team"
                   @cancel="ConfigTeamMsgVisible=false"
                   @success="Change"></ConfigTeamMsg>
  </div>
</template>
<script>
  import NewTeamFile from "./NewTeamFile";
  import ConfigOldTeamFile from "./ConfigOldTeamFile";
  import axios from 'axios'
  import SearchNewMember from "./SearchNewMember";
  import OtherUserInfo from "./OtherUserInfo";
  import ConfigTeamMsg from "./ConfigTeamMsg";
  export default {
    name: "TeamManage",
    created() {
      // this.TeamId=this.$route.query.Team.TeamId
      // this.TeamName=this.$route.query.Team.TeamName
      this.Team=JSON.parse(this.$route.query.Team)
      axios.all([
        axios({
          url:'http://127.0.0.1:8000/getTeamMembers',
          params:{
            name:this.$store.state.name,
            token:this.$store.state.token,
            tid:this.Team.tid
          }
        }),axios({
          url:'http://127.0.0.1:8000/getTeamArticles',
          params:{
            name:this.$store.state.name,
            token:this.$store.state.token,
            tid:this.Team.tid
          }
        }),axios({
        url:'http://127.0.0.1:8000/getTeamWorkTrend',
        params:{
          name:this.$store.state.name,
          token:this.$store.state.token,
          tid:this.Team.tid
        }
      })]).then((res)=>{
        console.log(res)
        this.TeamMember=this.TeamMember.concat(res[0].data.userList)
        for(let i of res[1].data.ArticleList){
          i.fields.lastedittime=this.TimeFormat(i.fields.lastedittime)
          i.fields.createtime=this.TimeFormat(i.fields.createtime)
          i.fields.commentGranted=i.fields.commentGranted?1:0
        }
        for(let i=0;i<res[1].data.ArticleList.length;i++){
          res[1].data.ArticleList[i].name=res[1].data.authorList[i]
          console.log(res[1].data.ArticleList[i].name)
          console.log(res[1].data.authorList[i])
          if(res[1].data.ArticleList[i].fields.visibility==0&&parseInt(this.$store.state.uid)!=res[1].data.ArticleList[i].fields.uid&&this.$store.state.name!=this.Team.creatorname){
            console.log('delete!')
            res[1].data.ArticleList.splice(i,1)
            i--
          }
        }
        for(let i=0; i<res[2].data.worktrendlist.length; i++){
          let obj={}
          obj.content = res[2].data.worktrendlist[i].fields.content
          obj.tid = res[2].data.worktrendlist[i].fields.team
          obj.time = this.TimeFormat(res[2].data.worktrendlist[i].fields.time)
          obj.name = res[2].data.namelist[i]
          obj.aid = res[2].data.worktrendlist[i].fields.article
          obj.title = res[2].data.articleList[i]
          this.TeamWorkTrend.push(obj)
        }
        this.TeamFile=this.TeamFile.concat(res[1].data.ArticleList)
      })
    },
    data(){
      return{
        Team:null,
        creatorname:'',
        // TeamId:24601,
        OtherUserInfoVisible:false,
        NewTeamFileVisible:false,
        ConfigOldTeamFileVisible:false,
        SearchNewMemberVisible:false,
        ConfigTeamMsgVisible:false,
        // TeamName:'大北航帝国',
        SelectMode:'1',
        SelectUser:null,
        SelectArticle:null,
        TeamMember:[],
        TeamFile:[],
        TeamWorkTrend:[],
      }
    },
    methods:{
      func(){
        this.ConfigOldTeamFileVisible = false
        this.EndEdit(this.SelectArticle.pk)
      },
      toviewfile(aid){
        this.$router.push({
          path: "/tools/viewfile/"+aid,
          params: {
            id : aid,
          }
        })
      },
      View(row){
        this.$router.push({
          path:'/tools/viewfile/'+row.pk,
          params:{
            id:row.pk
          }
        })
      },
      TimeFormat(str){
        return str.substring(0,10)+" "+str.substring(11,19)
      },
      Star(row){
        if(row.Collected===true)
          return 'el-icon-star-on'
        else
          return 'el-icon-star-off'
      },
      DeleteFile(index){
        let boolean=''
        axios({
          url:'http://127.0.0.1:8000/judgeIfEditing',
          params:{
            name:this.$store.state.name,
            token:this.$store.state.token,
            aid:this.TeamFile[index].pk
          }
        }).then(res=>{
          console.log(res)
          boolean=res.data
          if(boolean.isEditing){
            this.$message({
              type:"error",
              message:boolean.msg
            })
            return
          }
          this.BeginEdit(this.TeamFile[index].pk)
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            axios({
              url:'http://127.0.0.1:8000/completelyDeleteArticle/'+this.TeamFile[index].pk,
              params:{
                name:this.$store.state.name,
                token:this.$store.state.token,
              }
            }).then(res=>{
              console.log(res)
              this.TeamFile.splice(index,1)
              this.$message({
                type:"success",
                message:'删除成功'
              })
            })
          }).catch(() => {
            this.EndEdit(this.TeamFile[index].pk)
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        })
      },
      KickOut(index){
        this.$confirm('此操作将把团队成员['+this.TeamMember[index].name+']踢出团队', '是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios({
            url:'http://127.0.0.1:8000/exitTeam',
            params:{
              name:this.$store.state.name,
              token:this.$store.state.token,
              tid:this.Team.tid,
              uid:this.TeamMember[index].uid
            }
          }).then(res=>{
            console.log(res)
            this.TeamMember.splice(index,1)
            this.$message({
              type:"success",
              message:'踢出成功'
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      ShowInfo(row){
        this.OtherUserInfoVisible=true
        this.SelectUser=row
        console.log(this.SelectUser)
      },
      ConfigTeamMessage(){
        this.ConfigTeamMsgVisible=true
      },
      Change(val){
        console.log(val)
        this.Team.tname=val.tname
        this.Team.tIntro=val.tIntro
        this.$route.query.Team=JSON.stringify(this.Team)
        console.log(JSON.parse(this.$route.query.Team))
        this.ConfigTeamMsgVisible=false
        this.$message({
          type:"success",
          message:'修改成功'
        })
      },
      Config(row){
        let boolean=''
        axios({
          url:'http://127.0.0.1:8000/judgeIfEditing',
          params:{
            name:this.$store.state.name,
            token:this.$store.state.token,
            aid:row.pk
          }
        }).then(res=>{
          console.log(res)
          boolean=res.data
          if(boolean.isEditing){
            this.$message({
              type:"error",
              message:boolean.msg
            })
            return
          }
          this.BeginEdit(row.pk)
          this.SelectArticle=row
          this.ConfigOldTeamFileVisible=true
        })
      },
      EndEdit(aid){
        axios({
          url:'http://127.0.0.1:8000/endEdit',
          params:{
            name:this.$store.state.name,
            token:this.$store.state.token,
            aid:aid
          }
        }).then(res=>{
          console.log(res)
        })
      },
      BeginEdit(aid){
        axios({
          url:'http://127.0.0.1:8000/beginEdit',
          params:{
            name:this.$store.state.name,
            token:this.$store.state.token,
            aid:aid
          }
        }).then(res=>{
          console.log(res)
        })
      },
    },
    computed:{
      isCaptain(){
        return this.Team.creatorname==this.$store.state.name
      },
    },
    components:{ConfigTeamMsg, OtherUserInfo, SearchNewMember, ConfigOldTeamFile, NewTeamFile},
  }
</script>
<style scoped>
  .info{
    margin-left: 8%;
  }
</style>
