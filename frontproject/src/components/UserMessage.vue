<template>
  <div class="info" style="width: 70%;margin-top: 30px;float: left">
    <div style="float: left">
      <h1 style="float: left">我的消息</h1>
    </div>
    <div style="border-bottom:2px solid #CCC;padding-top: 100px"></div>
    <div>
      <h2 style="float: left">未读消息</h2>
      <el-table :data="RecentFile" stripe border>
        <el-table-column prop="fields.type" label="类型"></el-table-column>
        <el-table-column prop="fields.content" label="内容"></el-table-column>
        <el-table-column prop="fields.time" label="发送日期"></el-table-column>
        <el-table-column width="210">
          <template slot-scope="scope">
            <el-button type="primary" @click="AlreadyRead(scope.row)" v-if="scope.row.fields.type!=='团队邀请'">标记已读</el-button>
            <el-button type="danger" @click="Delete(scope.row)" v-if="scope.row.fields.type!=='团队邀请'">删除</el-button>
            <el-button type="primary" @click="Accept_Refuse(scope.row,true)" v-if="scope.row.fields.type==='团队邀请'">接受邀请</el-button>
            <el-button type="danger" @click="Accept_Refuse(scope.row,false)" v-if="scope.row.fields.type==='团队邀请'">拒绝</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <h2 style="float: left">已读消息</h2>
      <el-table :data="OldFile" stripe border>
        <el-table-column prop="fields.type" label="类型"></el-table-column>
        <el-table-column prop="fields.content" label="内容"></el-table-column>
        <el-table-column prop="fields.time" label="发送日期"></el-table-column>
        <el-table-column width="95">
          <el-button-group slot-scope="scope">
            <el-button style="float: right" type="danger" @click="Delete(scope.row,false,scope.$index)">删除</el-button>
          </el-button-group>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    Title: "UserFile",
    created() {
      axios({
        url:'http://127.0.0.1:8000/myMessage',
        params:{
          name: this.$store.state.name,
          token: this.$store.state.token,
        }
      }).then(res=>{
        for(let i of res.data.message){
          console.log(i)
          i.fields.time=this.TimeFormat(i.fields.time)
          if(i.fields.checked===false)
            this.RecentFile.push(i)
          else
            this.OldFile.push(i)
        }
      })
    },
    data(){
      return{
        RecentFile:[
          // {Title:'大师兄，不好了',SendDate:'2020/8/11 18:10',SimpleMessage:'师傅他被妖精抓走了！',SpeakMan:'沙悟净'},
        ],
        OldFile:[
          // {Title:'二师兄，不好了',SendDate:'2020/8/11 18:10',SimpleMessage:'师傅他被妖精抓走了！',SpeakMan:'沙悟净'},
          // {Title:'师傅，不好了',SendDate:'2020/8/11 18:10',SimpleMessage:'大师兄和二师兄打起来了！',SpeakMan:'沙悟净'},
        ],
      }
    },
    methods:{
      TimeFormat(str){
        return str.substring(0,10)+" "+str.substring(11,19)
      },
      Accept_Refuse(row,bool){
        axios({
          url:'http://127.0.0.1:8000/AcceptToJoinTeam',
          params: {
            name: this.$store.state.name,
            token: this.$store.state.token,
            tid:row.fields.tid,
            pmid:row.pk,
            Accept:bool
          }
        }).then(res=>{
          console.log(res)
          location.reload()
        })
      },
      AlreadyRead(row){
        axios({
          url:'http://127.0.0.1:8000/checkMessage',
          params: {
            name: this.$store.state.name,
            token: this.$store.state.token,
            pmid:row.pk,
          }
        }).then(res=>{
          console.log(res)
          location.reload()
        })
      },
      Delete(row,isRecent,index){
        axios({
          url:'http://127.0.0.1:8000/deleteMessage',
          params: {
            name: this.$store.state.name,
            token: this.$store.state.token,
            pmid:row.pk,
          }
        }).then(res=>{
          console.log(res)
          location.reload()
        })
      }
    }
  }
</script>

<style scoped>
  .info{
    margin-left: 8%;
  }
</style>
