<template>
  <el-dialog
    title="上传动态"
    :visible.sync="Visible"
    width="40%" :show-close="false" :close-on-click-modal="false">
    <div>
      <el-input placeholder="输入你的动态吧" :rows="15" v-model="Action" style="width: 90%;margin-top: 10px" type="textarea"></el-input>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('cancel')">取 消</el-button>
      <el-button type="primary" @click="UploadAction">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "UploadAction",
    props:['Visible','aid','tid'],
    data(){
      return{
        Action:'',
      }
    },
    methods:{
      UploadAction(){
        axios({
          url:'http://127.0.0.1:8000/uploadWorkTrend',
          params:{
            name:this.$store.state.name,
            token: this.$store.state.token,
            aid:this.aid,
            tid:this.tid,
            content:this.Action
          }
        }).then(res=>{
          console.log(res)
          this.$emit('submit')
        })
      }
    }
  }
</script>

<style scoped>

</style>
