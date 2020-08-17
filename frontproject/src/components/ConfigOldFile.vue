<template>
  <el-dialog title="编辑文档" v-if="Visible" :visible.sync="Visible" width="490px" top="5vh" :show-close="false" :close-on-click-modal="false">
    <div style="width: 80%">
      文档标题:<br><br>
      <el-input :placeholder="TitlePlaceholder" v-model="OldFile.Title" :disabled="!AbleToEdit"></el-input>
    </div>
    <br>
    <div>文档简介:</div>
    <br>
    <el-input :placeholder="SimpleMessagePlaceholder" :rows="5" v-model="OldFile.SimpleMessage" style="width: 80%" type="textarea" :disabled="!AbleToEdit"></el-input>
    <br><br>
    <div>
      <div>权限:</div>
      <div>
        <el-select v-model="OldFile.Authority" :disabled="!AbleToEdit">
          <el-option v-if="index===0||index>2" v-for="(i,index) in Authority" :label="i" :value="index">{{i}}</el-option>
        </el-select>
        <el-select v-model="OldFile.Revise" v-if="OldFile.Authority!==0" :disabled="!AbleToEdit">
          <el-option label="不可评论" :value="0">不可评论</el-option>
          <el-option label="可评论" :value="1">可评论</el-option>
        </el-select>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit" icon="el-icon-edit" v-if="AbleToEdit">编辑内容</el-button>
        <el-button type="primary" @click="save" v-if="AbleToEdit">保存并退出</el-button>
        <el-button type="danger" @click="$emit('cancel')">{{quit}}</el-button>
      </span>
  </el-dialog>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "ConfigOldFile",
    props:['Visible','Title','SimpleMessage','ArticleAuthority','Revise','aid','AbleToEdit'],
    data(){
      return {
        OldFile:{Title:'',SimpleMessage:'',TeamId:-1,Authority:'',Revise:'',TeamName:'',aid:''},
        Authority:['仅自己','','','所有人可见','所有人可编辑'],
      }
    },
    created() {
      //从TeamManage中传入的团队名字和团队ID
      this.OldFile.Title=this.Title
      this.OldFile.SimpleMessage=this.SimpleMessage
      this.OldFile.Authority=this.ArticleAuthority
      this.OldFile.Revise=this.Revise
      this.OldFile.aid=this.aid
      console.log('OLDFILE!!!')
      console.log(this.OldFile)
    },
    methods:{
      submit(){
        if(this.OldFile.Title==='')
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
            tid:this.OldFile.TeamId,
            title:this.OldFile.Title,
            aid:this.OldFile.aid
          }}
        ).then(res=>{
          // isRepetitiveArticleName
          if(res.data.isRepetitiveArticleName===true){
            this.$message({type:"error",message:'已有同名标题'})
            return
          }
          this.$emit('cancel')
          console.log(this.OldFile)
          this.$router.push({
            path:'/tools/editfile',
            query:{
              NewFile:JSON.stringify(this.OldFile)
            }
          })
        }).catch(res=>{
          this.$message({type:"warning",message:res})
        })
      },
      save(){
        console.log(this.OldFile)
        axios.get('http://127.0.0.1:8000/judgeRepetitiveArticleName',{params:{
            name:this.$store.state.name,
            token:this.$store.state.token,
            tid:this.OldFile.TeamId,
            title:this.OldFile.Title,
            aid:this.OldFile.aid
          }}
        ).then(res=>{
          // isRepetitiveArticleName
          if(res.data.isRepetitiveArticleName===true){
            this.$message({type:"error",message:'已有同名标题'})
            return
          }
          let formData = new FormData();
          formData.append('name', this.$store.state.name,);
          formData.append( 'token',this.$store.state.token);
          formData.append('content',null);
          formData.append('ifteam',this.OldFile.TeamId);
          formData.append('title',this.OldFile.Title);
          formData.append('message',this.OldFile.SimpleMessage);
          formData.append('visibility',this.OldFile.Authority);
          formData.append('commentGranted',this.OldFile.Revise);
          formData.append('aid',this.OldFile.aid);
          let config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
          axios.post('http://127.0.0.1:8000/uploadNewArticle',formData,config).then(res =>
          {
            console.log(res)
            this.$emit('cancel')
            location.reload()
          })
        }).catch(res=>{
          this.$message({type:"warning",message:res})
        })
      },
    },
    computed:{
      quit(){
        if(this.AbleToEdit===true)
          return '不保存退出'
        else
          return '退出'
      },
      /**
       * @return {string}
       */
      TitlePlaceholder(){
        if(this.AbleToEdit===true)
          return '请输入标题'
        else
          return ''
      },
      /**
       * @return {string}
       */
      SimpleMessagePlaceholder(){
        if(this.AbleToEdit===true)
          return '请输入文档简介'
        else
          return ''
      }
    },
    watch:{
      'OldFile.TeamId'(){
        if(this.OldFile.TeamId===-1&&1<=this.OldFile.Authority&&this.OldFile.Authority<=2){
          this.OldFile.Authority=0;
        }
      },
      'OldFile.Authority'(){
        if(this.OldFile.Authority===0){
          this.OldFile.Revise=0
        }
      }
    },
  }
</script>

<style scoped>

</style>

