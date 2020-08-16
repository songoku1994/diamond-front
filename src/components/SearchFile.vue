<template>
  <div class="info" style="width: 70%;margin-top: 30px;float: left">
    <div>
      <h1>{{TeamName}}</h1>
      <el-radio-group v-model="SelectMode">
        <el-radio-button label="文档" border></el-radio-button>
        <el-radio-button label="成员" border></el-radio-button>
        <el-radio-button label="团队" border></el-radio-button>
      </el-radio-group>
    </div>
    <div style="border-bottom:2px solid #CCC;padding-top: 30px"></div>
    <div>
      <el-table v-show="SelectMode=='文档'" :data="TeamFile" stripe border>
        <el-table-column prop="Name" label="标题"></el-table-column>
        <el-table-column prop="LastEditDate" label="最近修改日期"></el-table-column>
        <el-table-column prop="CreateDate" label="创建日期"></el-table-column>
        <el-table-column prop="Author" label="作者"></el-table-column>
        <el-table-column width="210">
          <template slot-scope="scope">
            <el-button-group>
              <el-button type="info" @click="" icon="el-icon-edit"></el-button>
              <el-button type="primary" @click="" icon="el-icon-setting" :disabled="scope.row.AbleToConfig"></el-button>
              <el-button type="danger" @click="" icon="el-icon-delete" :disabled="scope.row.AbleToConfig"></el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <el-table v-show="SelectMode=='成员'" :data="TeamMember" stripe border>
        <el-table-column prop="Name" label="用户名"></el-table-column>
        <el-table-column prop="LastLoginDate" label="最近登录日期"></el-table-column>
        <el-table-column prop="JoinDate" label="加入日期"></el-table-column>
        <el-table-column width="70">
          <template slot-scope="scope">
            <el-button-group>
              <el-button type="info" @click="" icon="el-icon-info"></el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <el-table v-show="SelectMode=='团队'" :data="Team" stripe border>
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
  export default {
    name: "SearchFile",
    data(){
      return{
        TeamName:'搜索结果',
        SelectMode:'文档',
        TeamMember:[
          {Name:'马冬什么',LastLoginDate:'2020/8/12',JoinDate:'2018/9/1'},
          {Name:'马什么梅',LastLoginDate:'2020/8/11',JoinDate:'2018/9/2'},
          {Name:'什么冬梅',LastLoginDate:'2020/8/1',JoinDate:'2018/9/3'},
        ],
        TeamFile:[
          {Name:'北航帝国简史',LastEditDate:'2020/8/14',CreateDate:'2010/2/30',Author:'徐惠彬',AbleToConfig:true},
          {Name:'毛泽东选集',LastEditDate:'1990/7/1',CreateDate:'1944/1/1',Author:'毛泽东',AbleToConfig:false},
        ],
        Team:[
          {Name:'软院',CreateDate:'2020/8/12',Number:'100'},
          {Name:'计院',CreateDate:'2020/8/11',Number:'100'},
          {Name:'微电子',CreateDate:'2020/8/1',Number:'100'},
        ],
        isCaptain:false
      }
    }
  }
</script>

<style scoped>
  .info{
    margin-left: 8%;
  }
</style>
