<template>
  <div class="info" style="width: 70%;margin-top: 30px;float: left">
    <div>
      <h1>{{Team.tname}}</h1>
      <el-radio-group v-model="SelectMode">
        <el-radio-button :label="true" border>
          文档
<!--          <el-button style="color: white" type="text" icon="el-icon-circle-plus" v-if="SelectMode" @click="NewTeamFileVisible=true"></el-button>-->
<!--          <el-button style="color: white" type="text" icon="el-icon-circle-plus" v-if="!SelectMode" @click="SelectMode=!SelectMode"></el-button>-->
          <i style="color: white" class="el-icon-circle-plus" v-if="SelectMode" @click="NewTeamFileVisible=true"></i>
          <i style="color: #409eff" class="el-icon-s-order" v-if="!SelectMode" @click="SelectMode=!SelectMode"></i>
        </el-radio-button>
        <el-radio-button :label="false" border>
          成员
          <i style="color: white" class="el-icon-circle-plus" v-if="!SelectMode" @click="SearchNewMemberVisible=true"></i>
          <i style="color: #409eff" class="el-icon-user-solid" v-if="SelectMode" @click="SelectMode=!SelectMode"></i>
<!--          <el-button style="color: white" type="text" icon="el-icon-circle-plus" v-if="!SelectMode" @click="SearchNewMemberVisible=true"></el-button>-->
<!--          <el-button style="color: white" type="text" icon="el-icon-circle-plus" v-if="SelectMode" @click="SelectMode=!SelectMode"></el-button>-->
        </el-radio-button>
      </el-radio-group>
    </div>
    <div style="border-bottom:2px solid #CCC;padding-top: 30px"></div>
    <div>
      <el-table v-show="SelectMode" :data="TeamFile" stripe border>
        <el-table-column prop="fields.title" label="标题"></el-table-column>
        <el-table-column prop="fields.lastedittime" label="最近修改日期"></el-table-column>
        <el-table-column prop="fields.createtime" label="创建日期"></el-table-column>
        <el-table-column prop="fields.uid" label="作者"></el-table-column>
        <el-table-column width="150">
          <template slot-scope="scope">
              <el-button type="primary" @click="Config(scope.row)" icon="el-icon-edit" v-if="isCaptain||scope.row.fields.uid==$store.state.uid||scope.row.fields.visibility>1"></el-button>
              <el-button type="info" @click="View(scope.row)" icon="el-icon-view" v-if="!isCaptain&&scope.row.fields.uid!=$store.state.uid&&scope.row.fields.visibility<=1"></el-button>
              <el-button type="danger" @click="DeleteFile(scope.$index)" icon="el-icon-delete" :disabled="!isCaptain&&scope.row.fields.uid!=$store.state.uid"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table v-show="!SelectMode" :data="TeamMember" stripe border>
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
                       @cancel="ConfigOldTeamFileVisible=false"></ConfigOldTeamFile>
    <SearchNewMember :visible="SearchNewMemberVisible"
                     :team="Team"
                     :team-member="TeamMember"
                     @cancel="SearchNewMemberVisible=false"></SearchNewMember>
    <OtherUserInfo :visible="OtherUserInfoVisible"
                   v-if="OtherUserInfoVisible"
                   :id="SelectUser.uid"
                   @cancel="OtherUserInfoVisible=false"></OtherUserInfo>
  </div>
</template>
<script>
  import NewTeamFile from "./NewTeamFile";
  import ConfigOldTeamFile from "./ConfigOldTeamFile";
  import axios from 'axios'
  import SearchNewMember from "./SearchNewMember";
  import OtherUserInfo from "./OtherUserInfo";
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
      })]).then((res)=>{
        console.log(res)
        this.TeamMember=this.TeamMember.concat(res[0].data.userList)
        for(let i of res[1].data.ArticleList){
          i.fields.lastedittime=this.TimeFormat(i.fields.lastedittime)
          i.fields.createtime=this.TimeFormat(i.fields.createtime)
          i.fields.commentGranted=i.fields.commentGranted?1:0
        }
        for(let i=0;i<res[1].data.ArticleList.length;i++){
          if(res[1].data.ArticleList[i].fields.visibility==0&&parseInt(this.$store.state.uid)!=res[1].data.ArticleList[i].fields.uid&&this.$store.state.name!=this.Team.creatorname){
            console.log('delete!')
            res[1].data.ArticleList.splice(i,1)
            i--
          }
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
        // TeamName:'大北航帝国',
        SelectMode:true,
        SelectUser:null,
        SelectArticle:null,
        TeamMember:[],
        TeamFile:[],
      }
    },
    methods:{
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
      Config(row){
        this.SelectArticle=row
        this.ConfigOldTeamFileVisible=true
      },
      DeleteFile(index){
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
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
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
      }
    },
    computed:{
      isCaptain(){
        return this.Team.creatorname==this.$store.state.name
      },
    },
    components:{OtherUserInfo, SearchNewMember, ConfigOldTeamFile, NewTeamFile},
  }
</script>
<style scoped>
  .info{
    margin-left: 8%;
  }
</style>
