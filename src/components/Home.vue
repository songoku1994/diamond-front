<template>
  <div>
    <p id="head">最近浏览</p>
    <el-main>
      <el-row id="firstblock">
        <div @click="tonewfile">
          <el-col class="eachcard" :span="3">
            <el-card :body-style="{ padding: '10px' }">
              <img src="../assets/newfile.png" class="image">
              <div style="padding: 12px;">
                <span id="newtitle">新建文档</span>
              </div>
              <div class="bottom clearfix"></div>
            </el-card>
          </el-col>
        </div>
        <div v-for="(item,index) in card" :key="index">
          <el-col class="eachcard" :span="3">
            <el-card :body-style="{ padding: '10px' }">
              <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image" @click="viewfile(item.id)">
              <div style="padding: 5px;">
                <span id="title">{{item.title}}</span>
                <div class="bottom clearfix">
                  <time class="time">{{ currentDate }}</time>
                  <el-dropdown @command="handleCommand" style="padding-left: 5px;float: right;" :key="item.id">
                    <span style="cursor:pointer;color:#409EFF"><i class="el-icon-more-outline"></i></span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item v-for="(item2,i) in operate" :key="i" :command="{task:item2.task,id:item.id}" style="flex: 1">{{item2.title}}</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                  <el-button type="text" class="button" @click="edititem(item.id)">编辑</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </div>
      </el-row>
    </el-main>
  </div>
</template>

<script>
  import TopTools from "./TopTools";
  import Aside from "./Aside";
  // import HomeMenuBar from "./HomeMenuBar";
  export default {
    name: "Home",
    data(){
      return{
        card: [
          {icon: "el-icon-edit", title: "工作台", url:'/tools/home',id : "1"},
          {icon: "el-icon-share", title: "啦啦啦啦", url:'/tools/home',id : "2"},
          {icon: "el-icon-delete", title: "导航三", url:'/tools/home',id : "3"},
          {icon: "el-icon-user", title: "导航四", url:'/tools/home',id : "4"},
          {icon: "el-icon-edit", title: "工作台", url:'/tools/home',id : "5"},
          {icon: "el-icon-share", title: "啦啦啦啦", url:'/tools/home',id : "6"},
          {icon: "el-icon-delete", title: "导航三", url:'/tools/home',id : "7"},
          {icon: "el-icon-user", title: "导航四", url:'/tools/home',id : "8"},
          {icon: "el-icon-edit", title: "工作台", url:'/tools/home',id : "9"},
          {icon: "el-icon-share", title: "啦啦啦啦", url:'/tools/home',id : "10"},
        ],
        currentDate: "2020-08-11",
        operate:[
          {title: "分享", task: "share"},
          {title: "删除", task: "delete"}
        ],
      }
    },
    methods:{
      tonewfile(){
        alert("跳转到新建页面");
      },
      viewfile(id){
        alert("查看文档"+id);
      },
      shareitem(id){
        console.log("分享"+ id);
      },
      deleteitem(id){
        console.log("删除"+ id);
      },
      handleCommand(item){
        if(item.task === "share"){
          console.log("分享"+item.id);
        };
        if(item.task === "delete"){
          console.log("删除"+item.id);
        }
      },
      edititem(id){
        console.log("编辑"+ id);
      },
    },
    created() {
      /*这里写后端代码（初始化）








       */
    },
    components: {Aside, TopTools},
    currentDate: new Date()
  }
</script>

<style scoped>

</style>

<style>
  p#head {
    margin-top: 50px;
    margin-left: 330px;
    font-size: 2em;
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
</style>
