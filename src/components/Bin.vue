<template>
  <div>
    <TopTools></TopTools>
    <Aside></Aside>
    <div style="width: 70%;margin-top: 30px;float: left">
      <div class="info" style="float: left">
        <h1 style="float: left">我的回收站</h1>
      </div>
      <div class="info" style="border-bottom:2px solid #CCC;padding-top: 100px;margin-right:100px"></div>
      <el-table :data="BinData" style="flex: 1" stripe>
        <el-table-column prop="Name" label="文件名" width="200"></el-table-column>
        <el-table-column prop="DeleteDate" label="删除日期" width="200"></el-table-column>
        <el-table-column prop="SimpleMessage" label="缩略信息"width="200"></el-table-column>
        <el-table-column
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="Recover(scope.row)" type="text" size="small">恢复</el-button>
            <el-button @click="FinalDelete(scope.row)" type="text" size="small">彻底删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
    import TopTools from "./TopTools";
    import Aside from "./Aside";
    export default {
        name: "Bin",
      data(){
          return{
            BinData:[
              {Name:'我是垃圾甲',DeleteDate:'2020/8/10',SimpleMessage:''},
              {Name:'我是垃圾乙',DeleteDate:'2012/12/21',SimpleMessage:''},
              {Name:'我是垃圾丙',DeleteDate:'2020/2/30',SimpleMessage:''},
              ]
          }
      },
    methods:{
      Recover(row) {
        console.log(row);
      },
      FinalDelete(){

      }
    },
      components: {Aside, TopTools}
    }
</script>

<style scoped>
  .info{
    margin-left: 8%;
  }
  .edit_button {
    margin-top: 25px;
    margin-left: 20px;
  }

</style>
