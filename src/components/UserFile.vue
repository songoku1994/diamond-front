<template>
  <div class="info" style="width: 70%;margin-top: 30px;float: left">
    <div style="float: left">
      <h1 style="float: left">{{username}}的文档</h1>
    </div>
    <div style="border-bottom:2px solid #CCC;padding-top: 100px"></div>
    <div >
      <el-table :data="AllFile" stripe border>
        <el-table-column prop="Title" label="文件名" ></el-table-column>
        <el-table-column prop="LastViewDate" label="上次编辑日期" ></el-table-column>
        <el-table-column prop="CreateDate" label="创建日期"></el-table-column>
        <el-table-column width="118">
          <template slot-scope="scope">
            <el-button type="primary" @click="EditFile(scope.$index)" icon="el-icon-edit" circle></el-button>
            <el-button type="danger" @click="DeleteFile(scope.$index)" icon="el-icon-delete" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <ConfigOldFile v-if="ConfigOldFileVisible"
                   :visible.sync="ConfigOldFileVisible"
                   :title="SelectArticle.Title"
                   :simple-message="SelectArticle.SimpleMessage"
                   :article-authority="SelectArticle.Authority"
                   :revise="SelectArticle.Revise"
                   :aid="SelectArticle.aid"
                   :able-to-edit="true"
                   @cancel="ConfigOldFileVisible=false"></ConfigOldFile>
  </div>
</template>

<script>
  import axios from 'axios'
  import ConfigOldFile from "./ConfigOldFile";
  export default {
    name: "UserFile",
    components: {ConfigOldFile},
    created() {
      axios({
        url:"http://127.0.0.1:8000/getAllArticle",
        method:"get",
        params:{
          name:this.$store.state.name,
          token:this.$store.state.token
        }
      }).then(res =>{
        console.log( res.data.articles[0])
        for( let a of res.data.articles)
        {
          console.log(typeof a.fields.title)
          let obj = {}
          obj.LastViewDate = this.TimeFormat(a.fields.lastedittime)
          obj.CreateDate = this.TimeFormat(a.fields.createtime)
          obj.Author = this.$store.state.name
          obj.aid = a.pk
          obj.TeamId=a.fields.tid
          obj.Title = a.fields.title
          obj.SimpleMessage = a.fields.message
          obj.Authority = a.fields.visibility
          obj.Revise = a.fields.commentGranted? 1:0
          this.AllFile.push(obj)
        }
      })
    },
    data(){
      return{
        ConfigOldFileVisible:false,
        SelectArticle:{},
        AllFile:[
          // {Title:'北航帝国简史',LastViewDate:'2020/8/11 18:10',CreateDate:'2010/2/30',Author:'徐惠彬',Collected:false},
          // {Title:'毛泽东选集',LastViewDate:'2020/8/11 20:21',CreateDate:'1944/1/1',Author:'毛泽东',Collected:true},
        ],
        username:'我',
      }
    },
    methods:{
      Star(index){
        if(this.AllFile[index].Collected===true)
          return 'el-icon-star-on'
        else
          return 'el-icon-star-off'
      },
      TimeFormat(str){
        return str.substring(0,10)+" "+str.substring(11,19)
      },
      EditFile(index){
        let i=index
        console.log(this.AllFile[i].aid)
        this.SelectArticle=this.AllFile[i]
        console.log(this.SelectArticle)
        this.ConfigOldFileVisible=true
      //   this.$router.push({
      //     path:'/tools/editfile',
      //     query:{
      //       NewFile:this.AllFile[i]
      //     }
      //   })
      },
      DeleteFile(index){
        this.$confirm('此操作将删除该文档, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios({
            url:'/deleteArticle/'+this.AllFile[index].aid,
            params:{
              name:this.$store.state.name,
              token:this.$store.state.token
            }
          }).then(res=>{
            this.AllFile.splice(index,1)
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
      CollectFile(index){

      }


    },
  }
</script>

<style scoped>
  .info{
    margin-left: 8%;
  }
</style>
