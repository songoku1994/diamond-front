<template>
  <div id="blog_page">
    <el-container>
      <el-main id="file_main" style="">
        <div id="file_content_container">
          <div style="float: right;font-size: 15px;color: #3e3e3e;">上次修改时间：{{lasttime}} </div>
          <div id="file_title">
            {{file.title}}
          </div>
          <div id="file_author">
            Written By {{author}}
          </div>
          <div class="info" style="border-bottom:2px solid #CCC;padding-top: 10px"></div>
          <div class="ql-snow">
            <div class="ql-editor">
              <div v-html="file.content" id="file_content"></div>
            </div>
          </div>
          <div id="blog_content_footer">
            <el-form :inline="true">
              <el-tooltip :v-if="this.visibility >= '3'" class="tool_tip_item" effect="dark" content="分享" placement="top-end">
                <el-button type="success" icon="el-icon-s-promotion" circle
                           @click="share()"></el-button>
              </el-tooltip>
              <el-tooltip class="tool_tip_item" effect="dark" content="收藏" placement="top">
                <el-button :type="this.isCollected ?'warning':'default'" icon="el-icon-star-off"
                           @click="handlefavorite()" circle
                ></el-button>
              </el-tooltip>
              <el-tooltip v-if="this.allowcomment" class="tool_tip_item" effect="dark" content="评论" placement="top">
                <el-button  type="primary" icon="el-icon-edit-outline"
                            round
                            @click="dialogVisible = true">评论</el-button>
              </el-tooltip>
            </el-form>
          </div>
          <Comment v-if="this.allowcomment" class="comment_block" :aid="this.$route.params.id"/>
          <div v-if="!this.allowcomment" style="margin-top: 10px;text-align: center;font-size: 15px;">抱歉，该文章不接受评论</div>
        </div>
      </el-main>
    </el-container>
    <el-footer style="background-color: rgba(255,255,255,0)">
    </el-footer>
    <div>

    </div>
    <el-dialog
      title="写评论"
      :visible.sync="dialogVisible"
      :show-close="false"
      :close-on-click-modal="false"
      width="500px">
      <el-form :model="commentForm" ref="commentForm" :rules="rules">
        <el-form-item prop="content">
          <el-input type="textarea"
                    :row="4"
                    placeholder="请输入评论"
                    v-model="commentForm.content">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button @click="submitComment('commentForm')" type="primary">确 定</el-button>
            </span>
    </el-dialog>
  </div>
</template>

<!--<link href="https://cdn.bootcdn.net/ajax/libs/quill/2.0.0-dev.4/quill.bubble.min.css" rel="stylesheet">-->
<script>
  import Comment from "../components/Comment";
  import axios from "axios";

  export default {
    name: "ViewFile",
    components: {Comment},
    data() {
      return {
        rules: {
          content: [
            {required: true, message: '评论不能为空！', trigger: 'blur'}
          ]
        },
        commentForm: {
          content: ''
        },
        dialogVisible: false,
        isLiked: false,
        isCollected: false,
        file: '',
        allowcomment: "",
        visibility: "",
        author: "",
        fid: "",
        commentList: '',
        soncommentsList: '',
        lasttime: "",
      }
    },
    methods: {
      TimeFormat(str){
        return str.substring(0,10)+ " " + str.substring(11,19)
      },
      handlefavorite() {
        if(this.isCollected === true){
          axios({
            url:"http://127.0.0.1:8000/deleteFavorite",
            method:"get",
            params:{
              name:this.$store.state.name,
              token:this.$store.state.token,
              id:this.$route.params.id,
            }
          }).then(res => {
            console.log(res);
            this.$message({
              type: 'success',
              message: '取消收藏成功!'
            });
            this.isCollected = false
          })
        }
        else{
          axios({
            url:"http://127.0.0.1:8000/addFavorite",
            method:"get",
            params: {
              name: this.$store.state.name,
              token: this.$store.state.token,
              aid: this.$route.params.id,
            }
          }).then(res => {
            console.log(res)
            this.isCollected = true
            this.$message({
              type: 'success',
              message: '添加收藏成功!'
            });
          })
        }
      },
      submitComment(formName) {
        this.dialogVisible = false;
        this.$refs[formName].validate(valid => {
          if (valid) {
            // this.$alert(this.commentForm.content);
            axios({
              url:"http://127.0.0.1:8000/createComment",
              method:"get",
              params:{
                name:this.$store.state.name,
                token:this.$store.state.token,
                content:this.commentForm.content,
                aid:this.$route.params.id,
              }
            }).then(res => {
              console.log(res);
              console.log("这里是发送评论之后")
              window.location.reload();
            })
            this.commentForm.content = '';
          } else {
            this.$alert("评论不能为空！");
            return false;
          }
        });
      },
      share() {
        console.log("我们现在要分享")
        this.$notify({
          title: '复制链接以分享',
          message: 'http://127.0.0.1:8000/#/tools/viewfile/' + this.$route.params.id,
          type: 'success'
        });
      },
    },

    created() {
      console.log(this.$route.path)
      console.log(this.$route.params.id)
      axios({
        url:"http://127.0.0.1:8000/judgeFavorite",
        method:"get",
        params:{
          name:this.$store.state.name,
          token:this.$store.state.token,
          aid:this.$route.params.id,
        }
      }).then(res => {
        console.log(res);
        console.log("这里是获取是否收藏")
        this.isCollected = res.data.msg;
        console.log(this.isCollected)
      })
      axios({
        url:"http://127.0.0.1:8000/getArticleContent/"+this.$route.params.id,
        method:"get",
        params:{
          name:this.$store.state.name,
          token:this.$store.state.token,
        }
      }).then(res => {
        console.log(res);
        if(res.data.msg === "没有权限"){
          this.$alert("您没有阅读此文章的权限,即将返回首页")
          setTimeout(() =>{
            this.$router.push('/tools/home')
          },3000);
        }
        else if(res.data.msg === "文章不存在"){
          this.$alert("文章已被删除,即将返回首页")
          setTimeout(() =>{
            this.$router.push('/tools/home')
          },3000);
        }
        else{
          this.fid = this.$route.params.id;
          this.file = res.data.article;
          this.author = res.data.author;
          this.visibility = res.data.article.visibility;
          this.allowcomment = res.data.article.commentGranted;
          this.lasttime = this.TimeFormat(res.data.article.lastedittime)
          const regex = new RegExp('<img', 'gi')
          this.file.content = this.file.content.replace(regex, `<img style="max-width: 100%; height: auto"`);
          console.log("这里是viewfile")
        }

      }).catch((error) => {
        console.log(error);
        this.$alert("网络连接错误");
      })
    },
  }
</script>

<style scoped>
  #file_title {
    width: auto;
    margin-left: 25px;
    margin-top: 20px;
    font-family: "Georgia", Tahoma, Sans-Serif;
    font-size: 38px;
    color: #3e3e3e;
    line-height: 50px;
    letter-spacing: 2px;
  }

  #file_author {
    font-size: 20px;
    font-style: italic;
    margin-top: 8px;
    margin-left: 25px;
    border-bottom:darkblue;
  }

  .tool_tip_item {
    margin: 4px;
  }

  #file_main {
    width: 100%;
    margin: 0;
    padding: 0;
    min-height: 350px;
    background-color:rgb(177, 255, 177);
  }

  #file_content_container {
    /* background-color: rgb(255, 249, 236); */
    padding: 10px 10px 10px 10px;
    margin: 5px 10px 15px 5px;
    border-radius: 10px;
  }

  #blog_content_footer {
    text-align: center;
    height: 30px;
    line-height: 30px;
    /* background-color:rgb(235, 255, 195); */
    margin: 10px 0 10px 0;
    padding: 10px 15px 20px 15px;
    border-radius: 10px;
    box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.1);
    width: auto;
  }

  #file_main {
    margin: 20px;
    margin-left: 60px;
    background:rgb(228, 255, 228);
    max-width: 85%;
    border-radius: 30px;
  }

  #file_content {
    min-height: 350px;
    margin-top: 20px;
    margin-left: 10px;
    margin-right: 10px;
    border:#CCC solid 3px;
    border-radius: 15px;
    padding: 10px;
  }

  #blog_content_decoder {
    z-index: 0;
    min-width: 200px;
    background-color: rgba(255, 255, 255, 0);
  }

  .font_color_flowerblue {
    color: cornflowerblue;
  }

  .font_color_lightgrey {
    color: darkgray;
  }

  #blog_page_aside {
    padding: 10px 5px 10px 0;
    width: 300px;
    background: rgba(255, 255, 255, 0);
  }

  .page_aside_fixed {
    position: fixed;
    margin-left: 0;
    z-index: 1;
    top: auto;
    bottom: 0;
  }

  /* .comment_block {
      text-align: center;
      line-height: 30px;
      background-color:white;
      margin: 10px 0 10px 0;
      padding: 10px 15px 10px 15px;
      border-radius: 10px;
      box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.1);
      width: auto;
  } */

</style>
