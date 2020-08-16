<template>
  <div>
    <div style="width: 70%;margin-top: 30px;float: left">
      <div class="info" style="float: left">
        <h1 style="float: left">我的消息</h1>
      </div>
      <div class="info" style="border-bottom:2px solid #CCC;padding-top: 100px"></div>
      <div class="info">
        <h2 style="float: left">未读消息</h2>
        <el-table :data="RecentFile" stripe border>
          <el-table-column prop="Title" label="标题" width="180"></el-table-column>
          <el-table-column prop="SpeakMan" label="发信人" width="180"></el-table-column>
          <el-table-column prop="SendDate" label="发送日期" width="180"></el-table-column>
          <el-table-column prop="SimpleMessage" label="创建日期" width="280"></el-table-column>
          <el-table-column width="161">
            <el-button-group slot-scope="scope">
              <el-button type="primary" @click="KnowMore(scope.row)">未读</el-button>
              <el-button type="danger" @click="DeleteFile(scope.row)">删除</el-button>
            </el-button-group>
          </el-table-column>
        </el-table>
      </div>
      <div class="info">
        <h2 style="float: left">已读消息</h2>
        <el-table :data="AllFile" stripe border>
          <el-table-column prop="Title" label="文件名" width="180"></el-table-column>
          <el-table-column prop="SpeakMan" label="作者" width="180"></el-table-column>
          <el-table-column prop="SendDate" label="上次浏览日期" width="180"></el-table-column>
          <el-table-column prop="SimpleMessage" label="创建日期" width="280"></el-table-column>
          <el-table-column width="161">
            <el-button-group slot-scope="scope">
              <el-button type="info" @click="KnowMore(scope.row)">详情</el-button>
              <el-button type="danger" @click="DeleteFile(scope.row)">删除</el-button>
            </el-button-group>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    Title: "UserFile",
    created() {
      /*这里写后端代码（初始化）








       */
    },
    data(){
      return{
        RecentFile:[
          {Title:'大师兄，不好了',SendDate:'2020/8/11 18:10',SimpleMessage:'师傅他被妖精抓走了！',SpeakMan:'沙悟净'},
        ],
        AllFile:[
          {Title:'二师兄，不好了',SendDate:'2020/8/11 18:10',SimpleMessage:'师傅他被妖精抓走了！',SpeakMan:'沙悟净'},
          {Title:'师傅，不好了',SendDate:'2020/8/11 18:10',SimpleMessage:'大师兄和二师兄打起来了！',SpeakMan:'沙悟净'},
        ],
      }
    },
    methods:{
      FindFile(row){
        for(let i=0;i<this.AllFile.length;i++)
        {
          if(row.Title==this.AllFile[i].Title&&row.SendDate==this.AllFile[i].SendDate&&row.SimpleMessage==this.AllFile[i].SimpleMessage&&row.SpeakMan==this.AllFile[i].SpeakMan){
            return i
          }
        }
        return -1
      },
      KnowMore(row){
        let i=this.FindFile(row)
        /*后端代码（跳转至编辑界面）







         */
        this.$router.push('/tools/editfile')
      },
      DeleteFile(row){
        /*后端代码（删除后刷新）







         */
        location.reload()
      },
    }
  }
</script>

<style scoped>
  .info{
    margin-left: 8%;
  }
</style>
