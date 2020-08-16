<template>
  <div class="info" style="width: 70%;margin-top: 30px;float: left">
    <div style="float: left">
      <h1 style="float: left">我的回收站</h1>
    </div>
    <div style="border-bottom:2px solid #CCC;padding-top: 100px"></div>
    <div>
      <el-table :data="BinData" stripe border>
        <el-table-column prop="fields.title" label="文件名"></el-table-column>
        <el-table-column prop="fields.lastedittime" label="上次编辑日期"></el-table-column>
        <el-table-column prop="fields.createtime" label="创建日期"></el-table-column>
        <el-table-column width="170">
          <el-button-group slot-scope="scope" >
            <el-button type="primary" @click="Recover(scope.$index)" circle icon="el-icon-refresh-right"></el-button>
            <el-button type="primary" @click="MoreMessage(scope.$index)" circle icon="el-icon-info"></el-button>
            <el-button type="danger" @click="FinalDelete(scope.$index)" circle icon="el-icon-delete"></el-button>
          </el-button-group>
        </el-table-column>
      </el-table>
    </div>
    <div style="float: right;margin-top: 30px">
      <el-button type="primary" @click="AllRecover">全部恢复</el-button>
      <el-button type="danger" @click="AllDelete">全部删除</el-button>
    </div>
    <ConfigOldFile v-if="BinFileVisible"
                   :visible.sync="BinFileVisible"
                   :title="SelectArticle.fields.title"
                   :simple-message="SelectArticle.fields.message"
                   :article-authority="SelectArticle.fields.visibility"
                   :revise="SelectArticle.fields.commentGranted===true?1:0"
                   :aid="SelectArticle.pk"
                   :able-to-edit="false"
                   @cancel="BinFileVisible=false"></ConfigOldFile>
  </div>
</template>

<script>
import axios from 'axios'
import ConfigOldFile from "./ConfigOldFile";
export default {
  name: "Bin",
  components:{ConfigOldFile},
  created() {
    axios({
      url:'/getAbandonedArticle',
      params:{
        name: this.$store.state.name,
        token: this.$store.state.token,
      }
    }).then(res=>{
      let array=res.data.articles
      for(let i=0;i<array.length;i++){
        array[i].fields.createtime=this.TimeFormat(array[i].fields.createtime)
        array[i].fields.lastedittime=this.TimeFormat(array[i].fields.lastedittime)
      }
      this.BinData=this.BinData.concat(array)
      console.log(array)
    })
  },
  data(){
    return{
      BinFileVisible:false,
      SelectArticle:{},
      BinData:[],
      ShowData:'',
      ShowMessage:'嘤嘤嘤',
      DialogVisible:false
    }
  },
  methods:{
    TimeFormat(str){
      return str.substring(0,10)+" "+str.substring(11,19)
    },
    Recover(index) {
      this.$confirm('此操作将恢复该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios({
          url:'/articleRecover/'+this.BinData[index].pk,
          params:{
            name: this.$store.state.name,
            token: this.$store.state.token,
          }
        }).then(res=>{
          // console.log(res)
          this.BinData.splice(index,1)
          this.$message({
            type: 'success',
            message: '恢复成功!'
          });
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消恢复'
        });
      });
    },
    FinalDelete(index){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(this.BinData[index])
        axios({
          url:'completelyDeleteArticle/'+this.BinData[index].pk,
          params:{
            name: this.$store.state.name,
            token: this.$store.state.token,
          }
        }).then(res=>{
          console.log(res)
          this.BinData.splice(index,1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    MoreMessage(index){
      console.log(index)
      this.SelectArticle=this.BinData[index]
      console.log(this.SelectArticle)
      this.BinFileVisible=true
    },
    AllDelete(){
      this.$confirm('此操作将删除所有文档, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        for(let i of this.BinData){
          axios({
            url:'completelyDeleteArticle/'+i.pk,
            params:{
              name: this.$store.state.name,
              token: this.$store.state.token,
            }
          })
        }
        this.BinData.splice(0,this.BinData.length)
        this.$message({
          type: 'success',
          message: '全部删除!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    AllRecover(){
      this.$confirm('此操作将恢复所有文档, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        for(let i of this.BinData){
          axios({
            url:'/articleRecover/'+i.pk,
            params:{
              name: this.$store.state.name,
              token: this.$store.state.token,
            }
          })
        }
        this.BinData.splice(0,this.BinData.length)
        this.$message({
          type: 'success',
          message: '全部恢复!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消恢复'
        });
      });
    },
  },
}
</script>

<style scoped>
.info{
  margin-left: 8%;
}
.button{
  width: 100px;
}
</style>
