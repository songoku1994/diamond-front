<template>
  <div>
    <div style="width: 70%;margin-top: 30px;float: left">
      <WorkPlace active="1"/>
      <div class="info" style="border-bottom:2px solid #CCC;padding-top: 80px"></div>
      <el-main>
        <el-row id="firstblock">
          <div v-for="(item,index) in card" :key="index" style="float:left;" @click="viewfile(item.id)">
            <el-col class="eachcard">
              <el-card class="box-card">
                <el-image :src="require('../assets/file_logo.jpg')" fit="cover"> </el-image>
                <div>
                  <br>
                  <div style="font-size: 20px;white-space: nowrap; text-overflow: ellipsis; overflow: hidden; width:140px">
                    <span id="title" >{{item.title}}</span>
                  </div>
                  <div style="font-size: 13px; margin-top: 8px;float: left;font-style: italic;white-space: nowrap; text-overflow: ellipsis; overflow: hidden; width:140px">
                    <span>Written By {{item.author}}</span>
                  </div>
                  <br>
                  <div class="bottom clearfix">
                    <time class="time">{{ item.date }}</time>
                    <el-dropdown @command="handleCommand" style="padding-left: 5px;float: right;" :key="item.id">
                      <span style="cursor:pointer;color:#409EFF"><i class="el-icon-more"></i></span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for="(item2,i) in operate" :key="i" :icon="item2.icon" :command="{task:item2.task,id:item.id,cot:index}" style="flex: 1">{{item2.title}}</el-dropdown-item>
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
      card: [
        // {title: "最近文档五哇哇哇哇哇哇哇哇哇哇哇", id : "5", author:"y55555555555555", date: "2020-05-11"},
        // {title: "最近文档六", id : "6", author:"y6", date: "2020-04-11"},
      ],
      currentDate: "2020-08-11",
      operate:[
        {title: "分享", task: "share", icon: "el-icon-star-off"},
        {title: "移除", task: "delete", icon: "el-icon-delete"}
      ],
    }
  },
  created(){
    const _this = this;
    console.log("created_recent_file");
    axios({
      url: "http://127.0.0.1:8000/getBrowerHistory",
      method:"get",
      params: {
        name:this.$store.state.name,
        token:this.$store.state.token
      }
    }).then(res => {
      console.log(res)
      let len = res.data.historyList.length < 10 ? res.data.historyList.length : 10
      // for(let a of res.data.historyList){
      //   let obj = {}
      //   obj.id = a.fields.article
      //   this.card.push(obj)
      // }
      for(let i=0; i<len ; i++){
        let obj = {}
        obj.id = res.data.historyList[i].fields.article
        obj.title = res.data.articleList[i].title
        obj.date = this.TimeFormat(res.data.historyList[i].fields.browertime)
        obj.author = res.data.authorList[i]
        obj.bhid = res.data.historyList[i].pk
        this.card.push(obj)
      }
    })
  },
  methods:{
    TimeFormat(str){
        return str.substring(0,10)
    },
    viewfile(id){
      this.$router.push({
          path: "/tools/viewfile/"+id,
          params: {
            id : id,
          }
        })
    },
    shareitem(id){
      this.$notify({
          title: '复制链接以分享',
          message: 'http://127.0.0.1:8000/#/tools/viewfile/' + id,
          type: 'success'
      });
    },
    deleteitem(id,index){
      this.$confirm('此操作将移除这条浏览记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // this.card.splice(index,1);
        axios({
          url: "http://127.0.0.1:8000/deleteBrowerHistory",
          method: "get",
          params: {
            name: this.$store.state.name,
            token: this.$store.state.token,
            bhid: this.card[index].bhid,
          }
        }).then(res => {
          console.log(res);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          setTimeout(() =>{
            window.location.reload()
          },500);
        })
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
  background-color:rgb(255, 241, 212);
  transition: 0.2s;
}
</style>
