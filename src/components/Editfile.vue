<template>
  <div>
    <el-container>
      <el-aside style="width: 100%;height: 550px">
        <div>
          <quill-editor
            class="ql-editor"
            v-model="content"
            style="height: 500px;"
            ref="myQuillEditor"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @change="onEditorChange($event)"
          >
          </quill-editor>
        </div>
      </el-aside>
      <el-main> </el-main>
      <el-footer style="width: 85%;display: flex">
        <div style="flex: 1"></div>
        <el-button-group style="float: right">
          <el-button type="primary" style="width: 120px" @click="submit()"
          >保存</el-button
          >
          <el-button type="danger" style="width: 120px" @click="subexit()">保存并退出</el-button>
        </el-button-group>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  import "quill/dist/quill.core.css";
  import "quill/dist/quill.snow.css";
  import "quill/dist/quill.bubble.css";
  import Quill from "quill";
  import { quillEditor } from "vue-quill-editor";
  import { ImageDrop } from "quill-image-drop-module";
  import ImageResize from "quill-image-resize-module";
  Quill.register("modules/imageDrop", ImageDrop);
  Quill.register("modules/imageResize", ImageResize);

  //自定义字体类型
  var fonts = [
    "SimSun",
    "SimHei",
    "Microsoft-YaHei",
    "KaiTi",
    "FangSong",
    "Arial",
    "Times-New-Roman",
    "sans-serif"
  ];
  var Font = Quill.import("formats/font");
  Font.whitelist = fonts; //将字体加入到白名单
  Quill.register(Font, true);
  import axios from 'axios'
  export default {
    name: "editfile",
    created() {
      console.log('NNNEEEWWW!!!')
      console.log(this.$route.query.NewFile)
      if(this.$route.query.NewFile.aid>0)
      {
        console.log(this.$route.query.NewFile);
        axios({
          url:"http://127.0.0.1:8000/getArticleContent/"+this.$route.query.NewFile.aid,
          params: {
            name:this.$store.state.name,
            token: this.$store.state.token
          }
        }).then(
          res => {
            console.log(res.data)
            this.content=res.data.content
          }
        )
      }


    },
    data() {
      return {
        contentCode: '',
        content:'',
        editorOption: {
          modules: {
            toolbar: [
              ["bold", "italic", "underline", "strike", "image"],
              ["formula", "clean"],
              ["blockquote", "code-block"],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ script: "sub" }, { script: "super" }],
              [{ size: ["small", false, "large", "huge"] }],
              [{ font: fonts }],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ color: [] }, { background: [] }],
              [{ align: [] }],
              [{ direction: "rtl" }]
            ],
            history: {
              delay: 1000,
              maxStack: 50,
              userOnly: false
            },
            imageDrop: true,
            imageResize: {
              displayStyles: {
                backgroundColor: "black",
                border: "none",
                color: "white"
              },
              modules: ["Resize", "DisplaySize", "Toolbar"]
            }
          },
          placeholder: "输入内容........"
        }
      };
    },
    components: {
      quillEditor
    },
    methods: {
      onEditorReady(editor) {
        // 准备编辑器
        console.log("111");
      },
      onEditorBlur() {
        // 失去焦点事件
        console.log("111");
      },
      onEditorFocus() {
        // 获得焦点事件
        console.log("222");
      },
      onEditorChange() {
        // 内容改变事件
        console.log(this.content);
      },
      submit() {
        let formData = new FormData();
        formData.append('name', this.$store.state.name,);
        formData.append( 'token',this.$store.state.token);
        formData.append('content',this.content);
        formData.append('ifteam',this.$route.query.NewFile.TeamId);
        formData.append('title',this.$route.query.NewFile.Title);
        formData.append('message',this.$route.query.NewFile.SimpleMessage);
        formData.append('visibility',this.$route.query.NewFile.Authority);
        formData.append('commentGranted',this.$route.query.NewFile.Revise);
        formData.append('aid',this.$route.query.NewFile.aid);
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        axios.post('http://127.0.0.1:8000/uploadNewArticle',formData,config).then(res =>
        {
          console.log(res)
          this.$route.query.NewFile.aid=res.data.aid
          if(res.data.state === 1)
          {
            alert("上传成功！")
          }
        })


      },
      subexit(){
        this.submit()
        if(this.$route.query.NewFile.TeamId===-1)
        {
          this.$router.push('/tools/userfile')
          location.reload()
        }
      }
    }
  };
</script>
