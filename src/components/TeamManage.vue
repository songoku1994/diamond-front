<template>
  <div class="info" style="width: 70%;margin-top: 30px;float: left">
    <div>
      <h1>{{TeamName}}</h1>
      <el-radio-group v-model="SelectMode">
        <el-radio-button :label="true" border>
          文档
          <el-button style="color: white" type="text" icon="el-icon-circle-plus" v-if="SelectMode" @click="NewTeamFileVisible=true"></el-button>
          <el-button style="color: white" type="text" icon="el-icon-circle-plus" v-if="!SelectMode"></el-button>
        </el-radio-button>
        <el-radio-button :label="false" border>
          成员
          <el-button style="color: white" type="text" icon="el-icon-circle-plus" v-if="!SelectMode"></el-button>
          <el-button style="color: white" type="text" icon="el-icon-circle-plus" v-if="SelectMode"></el-button>
        </el-radio-button>
      </el-radio-group>
    </div>
    <div style="border-bottom:2px solid #CCC;padding-top: 30px"></div>
    <div>
      <el-table v-show="SelectMode" :data="TeamFile" stripe border>
        <el-table-column prop="Title" label="标题"></el-table-column>
        <el-table-column prop="LastEditDate" label="最近修改日期"></el-table-column>
        <el-table-column prop="CreateDate" label="创建日期"></el-table-column>
        <el-table-column prop="Author" label="作者"></el-table-column>
        <el-table-column width="175">
          <template slot-scope="scope">
            <el-button-group>
              <el-button type="primary" @click="Config(scope.$index)" icon="el-icon-edit"></el-button>
              <el-button type="success" @click="CollectFile(scope.$index)" :icon="Star(scope.row)" circle></el-button>
              <el-button type="danger" @click="" icon="el-icon-delete" :disabled="!scope.row.AbleToConfig"></el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <el-table v-show="!SelectMode" :data="TeamMember" stripe border>
        <el-table-column prop="Name" label="用户名"></el-table-column>
        <el-table-column prop="LastLoginDate" label="最近登录日期"></el-table-column>
        <el-table-column prop="JoinDate" label="加入日期"></el-table-column>
        <el-table-column width="190">
          <template slot-scope="scope">
            <el-button-group>
              <el-button type="info" @click="" icon="el-icon-info"></el-button>
              <el-button type="primary" @click="" icon="el-icon-chat-line-round"></el-button>
              <el-button type="danger" @click="" icon="el-icon-delete" :disabled="!isCaptain"></el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <NewTeamFile v-if="NewTeamFileVisible"
                 :visible="NewTeamFileVisible"
                 :team-id="TeamId"
                 :team-name="TeamName"
                 @cancel="NewTeamFileVisible=false"></NewTeamFile>
    <ConfigOldTeamFile v-if="ConfigOldTeamFileVisible"
                       :visible="ConfigOldTeamFileVisible"
                       :title="SelectArticle.Title"
                       :team-id="TeamId"
                       :team-name="TeamName"
                       :article-authority="SelectArticle.Authority"
                       :simple-message="SelectArticle.SimpleMessage"
                       :revise="SelectArticle.Revise"
                       :aid="SelectArticle.aid"
                       @cancel="ConfigOldTeamFileVisible=false"></ConfigOldTeamFile>
  </div>
</template>
<script>
  import NewTeamFile from "./NewTeamFile";
  import ConfigOldTeamFile from "./ConfigOldTeamFile";
  export default {
    name: "TeamManage",
    created() {
      // this.TeamId=this.$route.query.Team.TeamId
      // this.TeamName=this.$route.query.Team.TeamName
    },
    data(){
      return{
        TeamId:24601,
        NewTeamFileVisible:false,
        ConfigOldTeamFileVisible:false,
        TeamName:'大北航帝国',
        SelectMode:true,
        SelectArticle:null,
        TeamMember:[
          {Name:'马冬什么',LastLoginDate:'2020/8/12',JoinDate:'2018/9/1'},
          {Name:'马什么梅',LastLoginDate:'2020/8/11',JoinDate:'2018/9/2'},
          {Name:'什么冬梅',LastLoginDate:'2020/8/1',JoinDate:'2018/9/3'},
        ],
        TeamFile:[
          {Title:'北航帝国简史',LastEditDate:'2020/8/14',CreateDate:'2010/2/30',Author:'徐惠彬',SimpleMessage:'我大北航科学技术世界第一',Authority:2,Revise:1,aid:1,Collected:false,AbleToConfig:true},
          {Title:'毛泽东选集',LastEditDate:'1990/7/1',CreateDate:'1944/1/1',Author:'毛泽东',SimpleMessage:'伟大的毛主席指引我们向前进',Authority:0,Revise: 1,aid:2,Collected:true,AbleToConfig:false},
        ],
        isCaptain:false
      }
    },
    methods:{
      Star(row){
        if(row.Collected===true)
          return 'el-icon-star-on'
        else
          return 'el-icon-star-off'
      },
      CollectFile(index){

      },
      Config(index){
        this.SelectArticle=this.TeamFile[index]
        console.log(this.SelectArticle)
        this.ConfigOldTeamFileVisible=true
      },
    },
    components:{ConfigOldTeamFile, NewTeamFile},
  }
</script>
<style scoped>
  .info{
    margin-left: 8%;
  }
</style>
