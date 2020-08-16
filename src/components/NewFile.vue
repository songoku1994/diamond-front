<template>
  <div>
    <el-dialog title="新建文档" v-if="Visible" :visible.sync="Visible" width="490px" top="5vh" :show-close="false">
      <div style="width: 80%">
        文档标题:<br><br>
        <el-input placeholder="请输入标题" v-model="NewFile.Title"></el-input>
      </div>
      <br>
      <div>文档简介:</div>
      <br>
      <el-input placeholder="请输入文档简介" :rows="5" v-model="NewFile.SimpleMessage" style="width: 80%" type="textarea"></el-input>
      <br><br>
      <div>
        <div>权限:</div>
        <div>
          <el-select v-model="NewFile.Authority">
            <el-option v-for="(i,index) in Authority" :label="i" :value="index">{{i}}</el-option>
          </el-select>
          <el-select v-model="NewFile.Revise" v-if="NewFile.Authority!==0">
            <el-option label="不可评论" :value="0">不可评论</el-option>
            <el-option label="可评论" :value="1">可评论</el-option>
          </el-select>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="$emit('cancel')">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "NewFile",
  props:['Visible'],
  data(){
    return{
      NewFile:{Title:'',SimpleMessage:'',TeamId:-1,Authority:0,Revise:0,aid:-1},
      Authority:['仅自己','所有人可见','所有人可编辑'],
    }
  },
  methods:{
    submit(){
      if(this.NewFile.Title==='')
      {
        this.$message({
          type:"warning",
          message:'请填写标题!'
        })
        return
      }
      axios.get('http://127.0.0.1:8000/judgeRepetitiveArticleName',{params:{
          name:this.$store.state.name,
          token:this.$store.state.token,
          tid:this.NewFile.TeamId,
          title:this.NewFile.Title
        }}
      ).then(res=>{
        // isRepetitiveArticleName
        if(res.data.isRepetitiveArticleName===true){
          this.$message({type:"error",message:'已有同名标题'})
          return
        }
        this.$emit('cancel')
        console.log(this.NewFile)
        this.$router.push({
          path:'/tools/editfile',
          query:{NewFile:this.NewFile}
        })
      }).catch(res=>{
        this.$message({type:"warning",message:res})
      })
    }
  },
  watch:{
    'NewFile.Authority'(){
      if(this.NewFile.Authority===0){
        this.NewFile.Revise=0
      }
    }
  },
}
</script>

<style scoped>

</style>
