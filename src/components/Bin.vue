<template>
  <div>
    <div style="width: 70%;margin-top: 30px;float: left">
      <div class="info" style="vertical-align: center;">
        <h1 style="float: left">我的回收站</h1>
      </div>
      <div class="info" style="border-bottom:2px solid #CCC;padding-top: 100px;margin-right:100px"></div>
      <div style="display: flex" align="center">
        <el-table :data="BinData" stripe>
        <el-table-column prop="Name" label="文件名" width="200"></el-table-column>
        <el-table-column prop="DeleteDate" label="删除日期" width="200"></el-table-column>
        <el-table-column
          width="120">
          <template slot-scope="scope">
            <el-button @click="Recover(scope.row)" type="text" size="small">恢复</el-button>
          </template>
        </el-table-column>
          <el-table-column
            width="120">
            <template slot-scope="scope">
              <el-button @click="FinalDelete(scope.row)" type="text" size="small">彻底删除</el-button>
            </template>
          </el-table-column>
          <el-table-column
            width="120">
            <template slot-scope="scope">
              <el-button @click="MoreMessage(scope.row)" type="text" size="small">详情</el-button>
            </template>
          </el-table-column>
      </el-table>
      </div>
      <br>
      <div style="display: flex">
        <div style="flex: 1"></div>
        <el-button type="primary" style="right: 50px" @click="AllRecover" icon="el-icon-refresh-right">全部恢复</el-button>
        <el-button type="primary" style="left: 50px" @click="AllDelete" icon="el-icon-delete-solid">全部删除</el-button>
        <div v-for="i in 35">&nbsp;</div>
      </div>
    </div>
    <el-dialog
      :title="this.ShowData.Name"
      :visible.sync="DialogVisible"
      width="30%">
      <span style="font-size: 20px">删除日期:&nbsp;{{this.ShowData.DeleteDate}}</span>
      <div v-for="i in 2"><br></div>
      <span style="font-size: 20px">缩略信息:</span>
      <div v-for="i in 2"><br></div>
      <div>{{ShowMessage}}</div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="DialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
    import TopTools from "./TopTools";
    import Aside from "./Aside";
    export default {
      name: "Bin",
      created() {
        /*这里写后端代码（初始化）








         */
      },
      data(){
          return{
            BinData:[
              {Name:'我是垃圾甲',DeleteDate:'2020/8/10'},
              {Name:'我是垃圾乙',DeleteDate:'2012/12/21'},
              {Name:'我是垃圾丙',DeleteDate:'2020/2/30'},
              ],
            ShowData:'',
            ShowMessage:'嘤嘤嘤',
            DialogVisible:false
          }
      },
      methods:{
        Recover(row) {
        this.$confirm('此操作将恢复该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          /*这里写后端代码（恢复文档）








         */
          this.BinData.splice(this.FindRow(row),1)
          this.$message({
            type: 'success',
            message: '恢复成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消恢复'
          });
        });
      },
        FinalDelete(row){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          /*这里写后端代码（彻底删除）








         */
          this.BinData.splice(this.FindRow(row),1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
        FindRow(row){
          for(let i=0;i<this.BinData.length;i++){
            if(row.Name==this.BinData[i].Name&&row.DeleteDate==this.BinData[i].DeleteDate){
              return i
            }
          }
          return -1
        },
        MoreMessage(row){
        /*这里写后端代码（查看详情信息）
        将this.ShowMessage的值变为this.BinData[this.Find(row)]的详情信息







         */
        this.ShowData=this.BinData[this.FindRow(row)]
        this.DialogVisible=true
      },
        AllDelete(){

          this.$confirm('此操作将删除所有文档, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            /*这里写后端代码（删除全部文档）








           */
            this.BinData.splice(0,this.BinData.length)
            this.$message({
              type: 'success',
              message: '全部删除!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },
        AllRecover(){

          this.$confirm('此操作将恢复所有文档, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            /*这里写后端代码（恢复全部文档）








           */
            this.BinData.splice(0,this.BinData.length)
            this.$message({
              type: 'success',
              message: '全部恢复!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消恢复'
            });
          });
        },
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
