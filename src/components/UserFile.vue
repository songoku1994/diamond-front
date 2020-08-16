<template>
  <div>
    <div style="width: 70%;margin-top: 30px;float: left">
      <div class="info" style="float: left">
        <h1 style="float: left">我的文档</h1>
      </div>
      <div class="info" style="border-bottom:2px solid #CCC;padding-top: 100px"></div>
      <div class="info">
        <h2 style="float: left">最近浏览</h2>
        <el-table :data="RecentFile" stripe border>
          <el-table-column prop="Name" label="文件名" width="180"></el-table-column>
          <el-table-column prop="Author" label="作者" width="180"></el-table-column>
          <el-table-column prop="LastViewDate" label="上次浏览日期" width="180"></el-table-column>
          <el-table-column prop="CreateDate" label="创建日期" width="180"></el-table-column>
          <el-table-column width="161">
            <el-button-group slot-scope="scope">
              <el-button type="primary" @click="EditFile(scope.row)">编辑</el-button>
              <el-button type="danger" @click="DeleteFile(scope.row)">删除</el-button>
            </el-button-group>
          </el-table-column>
        </el-table>
      </div>
      <div class="info">
        <h2 style="float: left">全部文档</h2>
        <el-table :data="AllFile" stripe border>
          <el-table-column prop="Name" label="文件名" width="180"></el-table-column>
          <el-table-column prop="Author" label="作者" width="180"></el-table-column>
          <el-table-column prop="LastViewDate" label="上次浏览日期" width="180"></el-table-column>
          <el-table-column prop="CreateDate" label="创建日期" width="180"></el-table-column>
          <el-table-column width="161">
            <el-button-group slot-scope="scope">
              <el-button type="primary" @click="EditFile(scope.row)">编辑</el-button>
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
    name: "UserFile",
    created() {
      /*这里写后端代码（初始化）








       */
    },
    data(){
      return{
        RecentFile:[
          {Name:'北航帝国简史',LastViewDate:'2020/8/11 18:10',CreateDate:'2010/2/30',Author:'徐惠彬'},
        ],
        AllFile:[
          {Name:'北航帝国简史',LastViewDate:'2020/8/11 18:10',CreateDate:'2010/2/30',Author:'徐惠彬'},
          {Name:'毛泽东选集',LastViewDate:'2020/8/11 20:21',CreateDate:'1944/1/1',Author:'毛泽东'},
        ],
      }
    },
    methods:{
      FindFile(row){
        for(let i=0;i<this.AllFile.length;i++)
        {
          if(row.Name==this.AllFile[i].Name&&row.LastViewDate==this.AllFile[i].LastViewDate&&row.CreateDate==this.AllFile[i].CreateDate&&row.Author==this.AllFile[i].Author){
            return i
          }
        }
        return -1
      },
      EditFile(row){
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
