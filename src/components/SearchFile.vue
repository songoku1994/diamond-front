<template>
  <div class="info" style="width: 70%;margin-top: 30px;float: left">
    <div>
      <h1>搜索结果</h1>
      <el-radio-group v-model="SelectMode">
        <el-radio-button label="文档" border></el-radio-button>
        <el-radio-button label="成员" border></el-radio-button>
        <el-radio-button label="团队" border></el-radio-button>
      </el-radio-group>
    </div>
    <div style="border-bottom:2px solid #CCC;padding-top: 30px"></div>
    <div>
      <el-table v-show="SelectMode === '文档'" :data="TeamFile" stripe border>
        <el-table-column prop="Name" label="标题"></el-table-column>
        <el-table-column
          prop="LastEditDate"
          label="最近修改日期"
        ></el-table-column>
        <el-table-column prop="CreateDate" label="创建日期"></el-table-column>
        <el-table-column prop="Author" label="作者"></el-table-column>
        <el-table-column width="148">
          <template slot-scope="scope">
            <el-button
              type="success"
              @click="viewfile(scope.row.aid)"
              icon="el-icon-view"
            ></el-button>
            <el-button
              type="primary"
              @click="editfile(scope.row)"
              icon="el-icon-edit"
              :disabled="scope.row.visibility !== 4"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table v-show="SelectMode === '成员'" :data="TeamMember" stripe border>
        <el-table-column prop="Name" label="用户名"></el-table-column>
        <el-table-column prop="JoinDate" label="注册日期"></el-table-column>
        <el-table-column prop="Email" label="邮箱"></el-table-column>
        <el-table-column width="77">
          <template slot-scope="scope">
            <el-button
              type="info"
              @click="GainUserinfo(scope.row)"
              icon="el-icon-info"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table v-show="SelectMode === '团队'" :data="Team" stripe border>
        <el-table-column prop="Name" label="团队名"></el-table-column>
        <el-table-column prop="CreateDate" label="创建日期"></el-table-column>
        <el-table-column prop="Number" label="人数"></el-table-column>
        <el-table-column width="77">
          <template slot-scope="scope">
            <el-button
              type="info"
              @click="GainTeaminfo(scope.row)"
              icon="el-icon-info"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      :title="info.Name"
      :visible.sync="TdialogVisible"
      width="30%"
      :show-close="false"
      :close-on-click-modal="false"
    >
      <div style="margin-top: 10px">团队信息:</div>
      <el-input
        placeholder="该团队暂无团队信息"
        :rows="10"
        v-model="info.msg"
        style="width: 80%;margin-top: 15px"
        type="textarea"
        disabled
      ></el-input>
      <div style="margin-top: 30px">团队人数:[{{ info.Number }}]</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="TdialogVisible = false">返 回</el-button>
      </span>
    </el-dialog>
    <OtherUserInfo
      :Visible="OtherUserInfoVisible"
      v-if="OtherUserInfoVisible"
      :id="SelectUser.uid"
      @cancel="OtherUserInfoVisible = false"
    ></OtherUserInfo>
    <ConfigOldFile
      v-if="ConfigOldFileVisible"
      :visible.sync="ConfigOldFileVisible"
      :title="SelectArticle.Title"
      :simple-message="SelectArticle.SimpleMessage"
      :article-authority="SelectArticle.Authority"
      :revise="SelectArticle.Revise"
      :aid="SelectArticle.aid"
      :able-to-edit="true"
      @cancel="ConfigOldFileVisible = false"
    ></ConfigOldFile>
  </div>
</template>

<script>
  import axios from "axios";
  import EditfileVue from "./Editfile.vue";
  import TopTools from "./TopTools";
  import Aside from "./Aside";
  import WorkPlace from "./WorkPlace";
  import ConfigOldFile from "./ConfigOldFile";
  import OtherUserInfo from "./OtherUserInfo";
  export default {
    name: "SearchFile",
    data() {
      return {
        SelectMode: "文档",
        key: null,
        TeamMember: [],
        TeamFile: [],
        Team: [],
        isCaptain: false,
        ConfigOldFileVisible: false,
        SelectArticle: {},
        info: {},
        TdialogVisible: false,
        OtherUserInfoVisible: false,
        SelectUser: null,
        NewFile: {}
      };
    },
    created() {
      this.key = this.$route.query.asd;
      console.log(this.key);
      axios({
        url: "http://127.0.0.1:8000/getListByKey",
        methods: "get",
        params: {
          name: this.$store.state.name,
          token: this.$store.state.token,
          key: this.key
        }
      }).then(response => {
        console.log(response);
        for (let a of response.data.userList) {
          let obj = {};
          obj.Name = a.fields.name;
          obj.Email = a.fields.email;
          obj.JoinDate = this.TimeFormat(a.fields.createtime);
          obj.uid = a.pk;
          this.TeamMember.push(obj);
        }
        for (let a of response.data.teamList) {
          let obj = {};
          obj.Name = a.fields.tname;
          obj.CreateDate = this.TimeFormat(a.fields.createtime);
          obj.Number = a.fields.membernumber;
          obj.msg = a.fields.tIntro;
          this.Team.push(obj);
        }
        for (let a in response.data.articleList) {
          let obj = {};
          obj.Name = response.data.articleList[a].fields.title;
          obj.LastEditDate = this.TimeFormat(response.data.articleList[a].fields.lastedittime);
          obj.CreateDate = this.TimeFormat(response.data.articleList[a].fields.createtime);
          obj.Author = response.data.authorList[a]
          obj.visibility = response.data.articleList[a].fields.visibility;
          obj.aid = response.data.articleList[a].pk;
          obj.Revise = response.data.articleList[a].fields.commentGranted ? 1 : 0;
          obj.SimpleMessage = response.data.articleList[a].fields.message;
          obj.tid = response.data.articleList[a].fields.tid;
          this.TeamFile.push(obj);
        }
      });
    },
    methods: {
      TimeFormat(str) {
        return str.substring(0, 10) + " " + str.substring(11, 19);
      },
      viewfile(aid) {
        this.$router.push({
          path: "/tools/viewfile/" + aid,
          params: {
            id: aid
          }
        });
      },
      editfile(a) {
        let obj = {};
        obj.TeamId = a.tid;
        obj.Title = a.Name;
        obj.SimpleMessage = a.SimpleMessage;
        obj.Authority = a.visibility;
        obj.Revise = a.Revise;
        obj.aid = a.aid;
        this.NewFile=obj;

        axios({
          url:'http://127.0.0.1:8000/judgeIfEditing',
          params:{
            name:this.$store.state.name,
            token:this.$store.state.token,
            aid:this.NewFile.aid
          }
        }).then(res=> {
          console.log(res)
          let boolean = res.data
          if (boolean.isEditing) {
            this.$message({
              type: "error",
              message: boolean.msg
            })
            return
          }
          axios({
            url:'http://127.0.0.1:8000/beginEdit',
            params:{
              name:this.$store.state.name,
              token:this.$store.state.token,
              aid:this.NewFile.aid,
            }
          }).then(res=>{
            console.log(res)
            this.$router.push({
              path: "/tools/editfile",
              query: {
                NewFile: JSON.stringify(this.NewFile),
                SearchInput:this.key
              }
            });
          })
        })
      },
      GainTeaminfo(a) {
        this.TdialogVisible = true;
        this.info = a;
      },
      GainUserinfo(a) {
        this.OtherUserInfoVisible = true;
        this.SelectUser = a;
        console.log(this.SelectUser);
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
      }
    },
    components: { Aside, TopTools, WorkPlace, ConfigOldFile, OtherUserInfo }
  };
</script>

<style scoped>
  .info {
    margin-left: 8%;
  }
</style>
