<template>
  <div>
    <div style="width: 70%;margin-top: 30px;float: left">
      <WorkPlace active="4"/>
      <div class="info" style="border-bottom:2px solid #CCC;padding-top: 80px"></div>
      <el-main>
        <div v-for="(item,index) in card" :key="index">
            <div style="font-family: SimHei;margin-top: 25px;margin-left: 9%; font-size: 25px;white-space: nowrap; text-overflow: ellipsis; overflow: hidden; width:50%">
                <span>发表自 {{item.author}}</span>
            </div>
            <el-card class="box-card">
                <div slot="header" class="clearfix" style="height: 30px">
                    <div style="float: left;white-space: nowrap; text-overflow: ellipsis; overflow: hidden; width:50%">
                        <span>{{item.title}}</span>
                    </div>               
                    <span style="cursor:pointer;color:#409EFF; float: right;"><i class="el-icon-more"></i></span>
                </div>
                <div class="text item" style="float: left; color: grey;white-space: nowrap; text-overflow: ellipsis; overflow: hidden; width:70%">
                    <span>{{item.content}}</span>
                </div>
                <div style="float: right; color: grey; font-size: 14px; margin-bottom: 18px;">
                    <span>{{item.date}}</span>
                </div>
            </el-card>
        </div>
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
          {title: "动态一有有有有有有有有有有有有有有有有有有有", id : "1", author:"变成作者了啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊", date: "2020-01-11", content:"变成文章内容了啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊"},
          {title: "动态二啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦", id : "2", author:"y2", date: "2020-08-11", content:"变成文章内容了啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊"},
          {title: "动态三" ,id : "3", author:"y3", date: "2020-07-11", content:"变成文章内容了啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊"},
          {title: "动态四", id : "4", author:"y4", date: "2020-06-11", content:"变成文章内容了啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊"},
          {title: "动态五哇哇哇哇哇哇哇哇哇哇哇", id : "5", author:"y55555555555555", date: "2020-05-11", content:"变成文章内容了啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊"},
          {title: "动态六", id : "6", author:"y6", date: "2020-04-11", content:"变成文章内容了啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊"},
        ],
        currentDate: "2020-08-11",
        operate:[
          {title: "分享", task: "share"},
          {title: "取消收藏", task: "delete"}
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
    },
    components: {Aside, TopTools, WorkPlace},
  }
</script>

<style scoped>
  .info{
    margin-left: 8%;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
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
    margin-left: 8%;
    margin-top: 15px;
    width: 80%;
    height: 120px;
    background-image: linear-gradient(120deg, rgb(224, 249, 251), rgb(233, 218, 255), rgb(224, 249, 251));
    background-size: 200%;
    transition: 0.5s;
    cursor: pointer;
  }

  .box-card:hover {
    background-position: right;
  }
</style>