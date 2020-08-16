<template>
    <div id="blog_page">
        <el-container>
            <el-main id="file_main" style="">
                <div id="file_content_container">
                    <div id="file_title">
                        {{file.title}}
                    </div>
                    <div id="file_author">
                        Written By {{file.author}}
                    </div>
                    <div class="info" style="border-bottom:2px solid #CCC;padding-top: 10px"></div>
                    <div id="file_content">
                        {{file.content}}
                    </div>
                    <div id="blog_content_footer">
                        <el-form :inline="true">
                                <el-tooltip class="tool_tip_item" effect="dark" content="分享" placement="top-end">
                                    <el-button type="success" icon="el-icon-s-promotion" circle
                                               ></el-button>
                                </el-tooltip>
                                <el-tooltip class="tool_tip_item" effect="dark" content="收藏" placement="top">
                                    <el-button :type="this.isCollected ?'warning':'default'" icon="el-icon-star-off"
                                               circle
                                               ></el-button>
                                </el-tooltip>
                                <el-tooltip class="tool_tip_item" effect="dark" content="评论" placement="top">
                                    <el-button type="primary" icon="el-icon-edit-outline"
                                               round
                                               @click="dialogVisible = true">评论</el-button>                               
                                </el-tooltip>
                            </el-form>
                    </div>
                    <Comment class="comment_block" :fileid="fid"/>
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

<script>
    import Comment from "../components/Comment";

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
                file: {title: "我是文档名", content: "我是文档内容啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊"
                       ,id: "101" , author: "我是作者"},
                fid: "001",

            }
        },
        methods: {
            submitComment(formName) {
                this.dialogVisible = false;
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.$alert(this.commentForm.content);
                        this.commentForm.content = '';
                    } else {
                        this.$alert("评论不能为空！");
                        return false;
                    }
                });
            },
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
