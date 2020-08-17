<template>
  <el-dialog title="邀请成员" v-if="Visible" :visible.sync="Visible" width="490px" top="5vh" :show-close="false" :close-on-click-modal="false">
    <div style="width: 80%">
      <el-input placeholder="请输入ID" v-model="SearchName" style="width: 80%"></el-input>
    </div>
    <div>
      <el-table :data="Member" stripe border style="width: 80%;margin-top: 30px" height="350">
        <el-table-column prop="name"></el-table-column>
        <el-table-column width="65">
          <template slot-scope="scope">
            <el-button type="success" icon="el-icon-postcard" circle @click="Invite(scope.row)" :disabled="scope.row.invited"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="danger" @click="$emit('cancel')">退出</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "SearchNewMember",
    props:['Visible','Team'],
    data(){
      return{
        SearchName:'',
        Member:[]
      }
    },
    methods:{
      Invite(row){
        axios({
          url:'http://127.0.0.1:8000/inviteUserToTeam',
          params: {
            name:this.$store.state.name,
            token:this.$store.state.token,
            uid:row.uid,
            tid:this.Team.tid,
          }
        }).then(res=>{
          console.log(res)
          if(res.data.msg!=='已经向该用户发出邀请！'){
            this.$message({
              type:"error",
              message:'不要重复发送邀请'
            })
          }else{
              this.$message({
                type:"success",
                message:'已发送邀请至'+row.name
              })
          }
        })
      }
    },
    watch:{
      SearchName(){
        this.Member.splice(0,this.Member.length)
        axios({
          url:'http://127.0.0.1:8000/getUserByKey',
          params:{
            name:this.$store.state.name,
            token:this.$store.state.token,
            key:this.SearchName,
            tid:this.Team.tid,
          }
        }).then(res=>{
          console.log(res.data.userList)
          for(let i of res.data.userList){
            if(i.fields.name!=this.$store.state.name){
              let obj={}
              obj.name=i.fields.name
              obj.invited=false
              obj.uid=i.pk
              // obj.
              this.Member.push(obj)
            }
            // console.log(this.Member)
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
