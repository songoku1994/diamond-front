<template>
  <div>
    <div style="width: 70%;margin-top: 30px;float: left">
      <WorkPlace active="3"/>
      <div class="info" style="border-bottom:2px solid #CCC;padding-top: 80px"></div>
      <el-main>
        <el-row id="firstblock">
<!--          <div style="float: left">-->
<!--            <div v-for="j in 8" style="float: left">&nbsp;</div>-->
<!--            <el-button type="info" style="height: 250px;width: 200px;font-size:150px;float: left; margin-top: 30px;margin-right: 30px;" icon="el-icon-circle-plus" class="clearfix" @click="tonewfile()"></el-button>-->
<!--          </div>-->
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
                      <span style="cursor:pointer;color:#409EFF"><i class="el-icon-more"></i></span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for="(item2,i) in operate" :key="i" :icon="item2.icon" :command="{task:item2.task,id:item.aid,cot:index}" style="flex: 1">{{item2.title}}</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div>
                </div>
              </el-card>
            </el-col>
          </div>

        </el-row>
      </el-main>
    </div>
  </div>
</template>

<script>
  import TopTools from "./TopTools";
  import Aside from "./Aside";
  import WorkPlace from "./WorkPlace";
  import axios from "axios";
  export default {
    name: "Home",
    data(){
      return{
        card: [],
        currentDate: "2020-08-11",
        operate:[
          {title: "分享", task: "share", icon: "el-icon-star-off"},
          {title: "取消收藏", task: "delete",  icon: "el-icon-delete"}
        ],
      }
    },
    created(){
      const _this = this;
      console.log("created_收藏");
      axios({
        url:"http://127.0.0.1:8000/allFavorite",
        method:"get",
        params:{
          name:this.$store.state.name,
          token:this.$store.state.token
        }
      }).then(res => {
        console.log(res);
        console.log(res.data.articleList[0].lastedittime)
        for(let a of res.data.articleList){
          let obj = {}
          obj.LastViewDate = this.TimeFormat(a.lastedittime)
          obj.CreateDate = this.TimeFormat(a.createtime)
          obj.Author = this.$store.state.name
          obj.aid = a.aid
          obj.TeamId=a.tid
          obj.Title = a.title
          obj.SimpleMessage = a.message
          obj.Authority = a.visibility
          obj.Revise = a.commentGranted? 1:0
          this.card.push(obj)
        }
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
      TimeFormat(str){
        return str.substring(0,10)
      },
      shareitem(id){
        this.$notify({
          title: '复制链接以分享',
          message: 'http://127.0.0.1:8000/#/tools/viewfile/' +  id,
          type: 'success'
        });
      },
      deleteitem(id,index){
        this.$confirm('此操作将移除收藏, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(this.card[index].aid)
          axios({
            url:"http://127.0.0.1:8000/deleteFavorite",
            method:"get",
            params:{
              name:this.$store.state.name,
              token:this.$store.state.token,
              id:this.card[index].aid,
            }
          }).then(res => {
            console.log(res);
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            setTimeout(() =>{
              window.location.reload()
            },1000);
          })
          this.card.splice(index,1);
            // window.location.reload()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      handleCommand(item){
        if(item.task === "share"){
          this.shareitem(item.id)
        };
        if(item.task === "delete"){
          this.deleteitem(item.id,item.cot)
        }
      },
      edititem(id){
        console.log("编辑"+ id);
        this.$router.push('/tools/editfile')
      },
    },
    components: {Aside, TopTools, WorkPlace},
    currentDate: new Date()
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
    background-color:blueviolet;
    transition: 0.2s;
  }
</style>
