<template>
    <div id="_comment_block">
        <div class="_comment_head _large _content_back _head_border">
            <el-collapse v-model="activeNames" @change="handleChange" accordion>
                <div v-for="(item,index) in comments" :key="index">
                    <el-collapse-item :title="item.userName+'评论了'" :name="index">
                        <div class="_comment_item">
                            <el-row class="_comment_author _inline-label-medium">
                                {{ item.userName }}
                            </el-row>
                            <el-row class="_comment_content">
                                <div class="_divide_line_light"></div>
                                {{ item.content }}
                            </el-row>
                            <el-row class="_comment-time-label">
                                <div class="_divide_line_light"></div>
                                发表于：{{ item.time }}
                                <div class="sonButton" @click="Write(item.cid)">
                                    评论
                                </div>                       
                            </el-row>
                        </div>
                        <div v-for="(sonConment,i) in soncomments" :key="i">
                            <div v-if="sonConment.cid === item.cid" class="_soncomment_card _soncomment_item">
                                <el-row class="_comment_author _inline-label-medium">
                                    {{ sonConment.userName }}
                                </el-row>
                                <el-row class="_comment_content">
                                    <div class="_divide_line_light"></div>
                                    {{ sonConment.content }}
                                </el-row>
                                <el-row class="_comment-time-label">
                                    <div class="_divide_line_light"></div>
                                    发表于：{{ sonConment.time }}
                                    <div class="divide_line_dark"></div>
                                </el-row>
                            </div>
                        </div>
                    </el-collapse-item>
                    <div class="divide_line_dark"></div>
                    <el-dialog
                        title="写子评论"
                        :visible.sync="dialogVisible"
                        :show-close="false"
                        width="500px"
                        >
                        <el-form :model="commentForm" ref="commentForm" :rules="rules">
                            <el-form-item prop="content">
                                <el-input type="textarea"
                                        :row="4"
                                        placeholder="请输入子评论"
                                        v-model="commentForm.content">
                                </el-input>
                            </el-form-item>
                        </el-form>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="dialogVisible = false">取 消</el-button>
                            <el-button @click="submitSonComment('commentForm')" type="primary">确 定</el-button>
                        </span>
                    </el-dialog>
                </div>
            </el-collapse>
        </div>
        
        <!-- <span v-if="comments.length===0" class="inline-label-medium">快，抢沙发!</span> -->
    </div>
</template>

<script>
  import TopTools from "./TopTools";
  import Aside from "./Aside";
  export default {        
        created() {
            console.log(this.fileid + "这是文档id");
        },
        name: "Comment",
        data() {
            return {
                comments: [
                    {cid:"01" ,userId:"111" ,userName:"yyk", content: "666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666", time: "2020-08-13"},
                    {cid:"02" ,userId:"222" ,userName:"gxw", content: "777", time: "2020-08-13"},
                    {cid:"03" ,userId:"333" ,userName:"gxw", content: "777", time: "2020-08-13"},
                ],
                soncomments: [
                    {ccid:"001" ,cid:"02" ,userId:"333" ,userName:"yyk", content: "66666666666666666666666666666666666666666666666666666666666666666", time: "2020-08-14"},
                    {ccid:"002" ,cid:"02" ,userId:"444" ,userName:"gxw", content: "777", time: "2020-08-14"},
                    {ccid:"003" ,cid:"01" ,userId:"555" ,userName:"gxw", content: "777", time: "2020-08-14"},
                ],
                rules: {
                    content: [
                        {required: true, message: '评论不能为空！', trigger: 'blur'}
                    ]
                },
                commentForm: {
                    content: '',
                    cid : '',
                },
                activeNames: ["1"],
                dialogVisible: false,
            }
        },
        props: {
            fileid: String
        },
        methods: {
            handleChange(val) {
                console.log(val);
            },
            submitSonComment(formName) {
                this.dialogVisible = false;
                this.$refs[formName][0].validate(valid => {
                    if (valid && this.commentForm.cid !== '') {
                        //this.$alert(this.commentForm.cid + "的子评论为" + this.commentForm.content);
                        this.soncomments.push({
                            ccid : 'new',
                            cid : this.commentForm.cid,
                            content : this.commentForm.content,
                            userName : 'yyk',
                            time : '2020-08-15', 
                        })
                        this.commentForm.content = '';
                        this.commentForm.cid = '';
                    } else {
                        this.$alert("子评论不能为空！");
                    }
                });
                this.commentForm.cid = '';
            },
            Write(cid) {
                this.dialogVisible = true;
                this.commentForm.cid = cid;
                console.log("In write " + this.commentForm.cid);
            },
        }
        // created() {
        //     this.$axios.get('/comment/' + this.blogid)
        //         .then(res => {
        //             console.log(res)
        //             /**
        //              * user_id => userId
        //              * user_name => userName
        //              * comment_content => content
        //              * comment_time => time
        //              */
        //             const dataList = res.data
        //             for (let i = 0; i < dataList.length; i++) {
        //                 this.comments.push({
        //                     userId: dataList[i].user_id,
        //                     userName: dataList[i].user_name,
        //                     content: dataList[i].comment_content,
        //                     time: dataList[i].comment_time
        //                 })
        //             }
        //         })
        // }
    }
</script>

<style scoped>
    .sonButton {
        float: right;
        font-size: 15px;
        padding-right: 20px;
        color:blue;
        cursor: pointer;
    }

    ._comment_card {
        border-style: outset;
        margin-bottom: 10px;
        border-radius: 15px;
        margin-top: 0px;
        display: block;
        clear: both;
    }

    ._soncomment_card {
        border-style: outset;
        word-break: break-word;
        margin-top: 10px;
        border-radius: 15px;
        margin-right: 0px;
        min-width: 30%;
        max-width: 50%;
        width: auto;
        float: right;
        clear: both;
        position: relative;
        display: block;
        background-color: rgb(223, 255, 255);
    }

    ._divide_line_light {
        background-color: rgba(179, 192, 209, 0.3);
        height: 2px;
        width: auto;
        margin-bottom: 5px;
    }

    .divide_line_dark{
        background-color: rgba(179, 192, 209, 0.8);
        height: 2px;
        width: 100%;
    }

    #_comment_block >>> .el-collapse-item__content{
        text-align: center;
        line-height: 30px;
        background-color:rgb(255, 241, 219);
        margin: 10px 10px 10px 10px;
        padding: 10px 15px 5px 15px;
        border-radius: 10px;
        box-shadow: 3px 3px 2px 2px rgba(0, 0, 0, 0.1);
        width: auto;
        font-size: 15px;
    }

    ._comment_content {
        /* text-overflow: ellipsis; 文本超出隐制藏 */
        word-break: break-word;
        min-height: 35px;
        line-height: 20px;
        padding: 0 10px;
        text-align: left;
    }

    ._comment_item {
        margin-bottom: 10px;
        display: block;
        /* background-color: crimson; */
    }

    ._soncomment_item {
        margin-bottom: 10px;
        padding-bottom: 5px;
    }

    ._comment-time-label {
        height: 30px;
        text-align: left;
        padding: 0 10px;
        color: #2c3e50;
        line-height: 30px;
        font-size: 14px;
        font-weight: bold;
        font-family: "Microsoft YaHei", "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "微软雅黑", Arial, sans-serif;
    }

    ._comment_author {
        border-bottom: 1px;
        text-align: left;
        border-color: #333333;
        height: 30px;
    }

    ._inline-label-medium {
        height: 30px;
        text-align: left;
        padding-left: 10px;
        color: #2c3e50;
        line-height: 30px;
        font-size: 16px;
        font-weight: bold;
        font-family: "Microsoft YaHei", "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "微软雅黑", Arial, sans-serif;
    }

    ._comment_head >>> .el-collapse-item__header {
        padding-left: 30px;
        padding-top: 5px;
        border-radius: 10px;
        background-color:rgb(251, 248, 232);
        font-size: 20px;
        font-weight: bold;
        font-family: "Microsoft YaHei", "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "微软雅黑", Arial, sans-serif;
        border-bottom:black;
    }

    ._large >>> .el-collapse {
        font-size: 35px;
        margin-left: 0px;
        border-radius: 20px;
        background-color:rgb(251, 248, 232);
    }

    ._content_back >>> .el-collapse-item__wrap {
        background-color: rgb(251, 248, 232);
    }

</style>
