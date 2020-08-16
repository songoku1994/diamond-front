<template>
  <div class="info" style="width: 70%;margin-top: 30px;float: left">
    <div>
      <h1>{{ TeamName }}</h1>
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
        <el-table-column width="210">
          <template slot-scope="scope">
            <el-button-group>
              <el-button type="info" @click="" icon="el-icon-edit"></el-button>
              <el-button
                type="primary"
                @click=""
                icon="el-icon-setting"
              ></el-button>
              <el-button
                type="danger"
                @click=""
                icon="el-icon-delete"
              ></el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <el-table v-show="SelectMode === '成员'" :data="TeamMember" stripe border>
        <el-table-column prop="Name" label="用户名"></el-table-column>
        <el-table-column prop="Email" label="邮箱"></el-table-column>
        <el-table-column prop="JoinDate" label="创建日期"></el-table-column>
        <el-table-column width="70">
          <template slot-scope="scope">
            <el-button-group>
              <el-button type="info" @click="" icon="el-icon-info"></el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <el-table v-show="SelectMode === '团队'" :data="Team" stripe border>
        <el-table-column prop="Name" label="团队名"></el-table-column>
        <el-table-column prop="CreateDate" label="创建日期"></el-table-column>
        <el-table-column prop="Number" label="人数"></el-table-column>
        <el-table-column width="70">
          <template slot-scope="scope">
            <el-button-group>
              <el-button type="info" @click="" icon="el-icon-info"></el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "SearchFile",
  data() {
    return {
      TeamName: "搜索结果",
      SelectMode: "文档",
      key: null,
      TeamMember: [
      ],
      TeamFile: [
      ],
      Team: [
      ],
      isCaptain: false
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
      console.log(response)

      for (let a of response.data.userList) {
        let obj = {};
        obj.Name = a.fields.name;
        obj.Email = a.fields.email;
        obj.JoinDate = a.fields.createtime;
        this.TeamMember.push(obj);
      }
      for (let a of response.data.teamList) {
        let obj = {};
        obj.Name = a.fields.tname;
        obj.CreateDate = a.fields.createtime;
        obj.Number = 100;
        this.Team.push(obj);
      }
      for (let a of response.data.articleList) {
        let obj = {};
        obj.Name = a.fields.title;
        obj.LastEditDate = this.TimeFormat(a.fields.lastedittime);
        obj.CreateDate = this.TimeFormat(a.fields.createtime);
        obj.Author = a.pk;
        this.TeamFile.push(obj);
      }
    });
  },
  methods: {
    TimeFormat(str) {
      return str.substring(0, 10) + " " + str.substring(11, 19);
    }
  }
};
</script>

<style scoped>
.info {
  margin-left: 8%;
}
</style>
