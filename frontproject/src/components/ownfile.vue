<template>
  <div>
    <div style="width: 70%;margin-top: 30px;float: left">
      <WorkPlace active="2"/>
      <div class="info" style="border-bottom:2px solid #CCC;padding-top: 80px"></div>
      <el-main>
        <el-row id="firstblock">
          <div style="float: left">
            <div v-for="j in 8" style="float: left">&nbsp;</div>
            <el-button type="info" style="height: 250px;width: 200px;font-size:150px;float: left; margin-top: 30px;margin-right: 30px;" icon="el-icon-circle-plus" class="clearfix" @click="tonewfile()"></el-button>
          </div>
          <div v-for="(item,index) in card" :key="index" style="float:left;" @click="toviewfile(item.aid)">
            <el-col class="eachcard">
              <el-card class="box-card">
                <el-image :src="require('../assets/file_logo.jpg')" fit="fill"> </el-image>
                <div>
                  <br>
                  <div style="font-size: 20px;white-space: nowrap; text-overflow: ellipsis; overflow: hidden; width:140px">
                    <span id="title" >{{item.Title}}</span>
                  </div>
                  <div style="font-size: 13px; margin-top: 8px;float: left;font-style: italic;white-space: nowrap; text-overflow: ellipsis; overflow: hidden; width:140px">
                    <span>Written By {{item.Author}}</span>
                  </div>
                  <br>
                  <div class="bottom clearfix">
                    <time class="time">{{ item.CreateDate }}</time>
                    <el-dropdown @command="handleCommand" style="padding-left: 5px;float: right;" :key="item.aid">
                      <span style=" cursor:pointer;color:#409EFF"><i class="el-icon-more"></i></span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for="(item2,i) in operate" :key="i" :icon="item2.icon" :command="{task:item2.task,  id:item.aid,  cot:index}" style="flex: 1">{{item2.title}}</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                    <el-button type="text" class="button" @click.stop="EditFile(index)">编辑</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
          </div>

        </el-row>
      </el-main>
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
    <NewFile :visible="NewFileVisible" @cancel="NewFileVisible=false"></NewFile>
  </div>
</template>

<script>
  import TopTools from "./TopTools";
  import Aside from "./Aside";
  import WorkPlace from "./WorkPlace";
  import axios from "axios";
  import ConfigOldFile from "./ConfigOldFile";
  import NewFile from "./NewFile";

  export default {
    name: "Home",
    data(){
      return{
        card: [],
        ConfigOldFileVisible:false,
        NewFileVisible: false,
        SelectArticle:{},
        currentDate: "2020-08-11",
        operate:[
          {title: "分享", task: "share", icon: "el-icon-star-off"},
          {title: "删除", task: "delete", icon: "el-icon-delete"}
        ],

      }
    },
    created(){
      //需要获取最近文档信息，存在card中，
      //title是文档名称，url是文档链接(可以不管)，id就是文档id，author是文档作者
      const _this = this;
      console.log("起飞my_file");
      axios({
        url:"http://127.0.0.1:8000/getAllArticle",
        method:"get",
        params:{
          name:this.$store.state.name,
          token:this.$store.state.token
        }
      }).then(res => {
        console.log(res);
        for(let a of res.data.articles){
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
          this.card.push(obj)
        }
      }).catch((error) => {
        console.log(error);
        this.$alert("网络连接错误");
      })
    },
    methods:{
      toviewfile(aid) {
        this.$router.push({
          path: "/tools/viewfile/"+aid,
          params: {
            id : aid,
          }
        })
      },
      tonewfile(){
        this.NewFileVisible=true
      },
      TimeFormat(str){
        return str.substring(0,10)
      },
      shareitem(id){
        this.$notify({
          title: '复制链接以分享',
          message: 'http://127.0.0.1:8000/#/tools/viewfile/' + id,
          type: 'success'
        });
      },
      handleCommand(item){
        if(item.task === "share"){
          this.shareitem(item.id)
        };
        if(item.task === "delete"){
          this.DeleteFile(item.cot)
        }
      },
      EditFile(index){
        let i=index
        console.log(this.card[i].aid)
        this.SelectArticle=this.card[i]
        console.log(this.SelectArticle)
        this.ConfigOldFileVisible=true
      },
      DeleteFile(index){
        console.log(index)
        this.$confirm('此操作将删除该文档, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios({
            url:'/deleteArticle/'+this.card[index].aid,
            params:{
              name:this.$store.state.name,
              token:this.$store.state.token
            }
          }).then(res=>{
            this.card.splice(index,1)
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            setTimeout(() =>{
              window.location.reload()
            },1000);
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
    },
    components: {Aside, TopTools, WorkPlace, ConfigOldFile, NewFile},
  }
</script>

<style scoped>
  .info{
    margin-left: 8%;
  }

  #title {
    text-align: center;
  }

  #firstblock {
    margin-left: 50px;
  }

  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 170px;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .eachcard {
    margin: 30px;
  }

  #newtitle {
    margin-left: 28%;
  }

  .box-card {
    width: 200px;
    height: 250px;
    cursor: pointer;
    transition: 2s;
  }

  .box-card:hover {
    background-color: skyblue;
    transition: 0.2s;
  }
</style>
