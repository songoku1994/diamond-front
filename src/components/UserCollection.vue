<template>
  <div>
    <div style="width: 70%;margin-top: 30px;float: left">
      <WorkPlace active="3"/>
      <div class="info" style="border-bottom:2px solid #CCC;padding-top: 80px"></div>
      <el-main>
        <el-row id="firstblock">
          <div style="float: left">
            <div v-for="j in 8" style="float: left">&nbsp;</div>
            <el-button type="info" style="height: 250px;width: 200px;font-size:150px;float: left; margin-top: 30px;margin-right: 30px;" icon="el-icon-circle-plus" class="clearfix" @click="tonewfile()"></el-button>
          </div>
          <div v-for="(item,index) in card" :key="index" style="float:left;">
            <el-col class="eachcard">
              <el-card class="box-card">
                <el-image :src="require('../assets/file_logo.jpg')" fit="fill"> </el-image>
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
  export default {
    name: "Home",
    data(){
      return{
        card: [
          {title: "收藏文档一有有有有有有有有有有有有有有有有有有有", id : "1", author:"y1", date: "2020-01-11"},
          {title: "收藏文档二啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦", id : "2", author:"y2", date: "2020-08-11"},
          {title: "收藏文档三" ,id : "3", author:"y3", date: "2020-07-11"},
          {title: "收藏文档四", id : "4", author:"y4", date: "2020-06-11"},
          {title: "收藏文档五哇哇哇哇哇哇哇哇哇哇哇", id : "5", author:"y55555555555555", date: "2020-05-11"},
          {title: "收藏文档六", id : "6", author:"y6", date: "2020-04-11"},
        ],
        currentDate: "2020-08-11",
        operate:[
          {title: "分享", task: "share", icon: "el-icon-star-off"},
          {title: "取消收藏", task: "delete",  icon: "el-icon-delete"}
        ],
      }
    },
    created(){
      //需要获取最近文档信息，存在card中，
      //title是文档名称，url是文档链接(可以不管)，id就是文档id，author是文档作者
      const _this = this;
      console.log("created_recent_file");
      this.$axios.get('http://localhost:8181/myblog/1/5').then(
        (respond) => {
          console.log(respond);
          const dataList = respond.data;
          this.totalblog = dataList.totalElements;
          for (let i = 0; i < dataList.content.length; i++) {
            this.card.push({
              id: dataList.content[i].blog_id,
              title: dataList.content[i].title,
            })
          }
        }
      ).catch((error) => {
        console.log(error);
        for (let i = 0; i < 3; i++) {
          this.card.push({
            id: "-3" + i,
            title: "ERROR",
          })
        };
      })
    },
    methods:{
      tonewfile(){
        alert("跳转到新建页面");
      },
      viewfile(id){
        alert("查看文档"+id);
      },
      shareitem(id){
        this.$notify({
          title: '复制链接以分享',
          message: '???' + id,
          type: 'success'
        });
      },
      deleteitem(id,index){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.card.splice(index,1);
          this.$axios.delete(''+id).then((resp)=> { //这个地方需要删除最近文档，或者后面商量一下作为收藏也可以
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            window.location.reload()
          });
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