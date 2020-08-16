<template>
  <div>
    <div style="width: 70%;margin-top: 30px;float: left">
      <div class="info" style="float: left">
        <h1 style="float: left">我的团队</h1>
      </div>
      <div class="info" style="border-bottom:2px solid #CCC;padding-top: 100px"></div>
      <br>
      <div  v-for="(i,index) in TeamData" style="float: left">
        <div v-for="j in 15" style="float: left">&nbsp;</div>
        <el-card class="box-card">
          <div slot="header" class="clearfix" style="height: 30px">
            <div style="float: left;font-size: 20px">{{i.name}}</div>
            <div style="float: right">
            </div>
          </div>
          <el-image src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"></el-image>
          <div style="float: right">
            <el-button type="text" @click="MoreMessage(index)" style="font-size: 15px">详情</el-button>
            <el-button type="text" style="color:red;font-size: 15px" @click="quit(index)">退出</el-button>
          </div>
        </el-card>
        <br>
      </div>
      <div style="float: left">
        <div v-for="j in 15" style="float: left">&nbsp;</div>
        <el-button type="info" style="height: 300px;width: 280px;font-size:200px;float: left" icon="el-icon-plus" class="clearfix" @click="NewTeam"></el-button>
      </div>
      <br>
    </div>
    <el-dialog
      :title="ShowData.name"
      :visible.sync="ShowMessageVisible"
      width="30%">
      <span style="font-size: 20px">团队口号:</span>
      <br><br>
      <div>{{ShowData.MoreMessage}}</div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="ShowMessageVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="新建团队"
      :visible.sync="NewMessageVisible"
      width="30%">
      <div style="width: 80%">
        团队名称:<br><el-input placeholder="请输入团队名称" v-model="NewTeamData.name"></el-input>
      </div>
      <br><br>
      <div>团队信息:</div>
      <br>
      <el-input placeholder="请输入团队信息" :rows="10" v-model="NewTeamData.MoreMessage" style="width: 80%" type="textarea"></el-input>
      <span slot="footer" class="dialog-footer">
      <el-button @click="NewMessageVisible=false">取 消</el-button>
      <el-button type="primary" @click="SubmitNewTeam(NewTeamData)">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "UserTeam",
      created() {
        /*这里写后端代码（初始化）








         */
      },
      data(){
          return{
            TeamData:[
              {name:'大北航帝国',MoreMessage:'我大北航帝国科学技术世界第一'},
              {name:'大士谔书院',MoreMessage:'我大士谔书院科学技术世界第一'},
              {name:'大软件学院',MoreMessage:'我大软件书院科学技术世界第一'},
              {name:'大熊猫',MoreMessage:'我大熊猫科学技术世界第一'},
            ],
            ShowMessageVisible:false,
            ShowData:{name:'',MoreMessage:''},
            NewTeamData:{name:'',MoreMessage:''},
            NewMessageVisible:false,
          }
      },
      methods:{
        quit(index){
            this.$confirm('此操作将退出团队, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              /*这里写后端代码（退出团队）








             */
              this.TeamData.splice(index,1)
              this.$message({
                type: 'success',
                message: '退出成功!'
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消'
              });
            });
          },
        MoreMessage(index){
          this.ShowMessageVisible=true
          this.ShowData.name=this.TeamData[index].name
          this.ShowData.MoreMessage=this.TeamData[index].MoreMessage
        },
        NewTeam(){
          this.NewTeamData.name=''
          this.NewTeamData.MoreMessage=''
          this.NewMessageVisible=true
        },
        SubmitNewTeam(NewTeamData){
          this.TeamData.push(NewTeamData)
          this.NewMessageVisible=false
          this.$message({
            type:"success",
            message:'创建成功',
          })
        },
      }
    }
</script>

<style scoped>
  .info{
    margin-left: 8%;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 280px;
    height: 300px;
  }
</style>
