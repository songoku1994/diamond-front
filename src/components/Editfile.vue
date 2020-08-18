<template>
  <div>
    <el-container>
      <el-main>
        <div>
          <quill-editor
            class="ql-editor"
            v-model="content"
            style="height: 500px;width: 90%;margin-left: auto;margin-right: auto"
            ref="myQuillEditor"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @change="onEditorChange($event)"
          >
          </quill-editor>
        </div>
      </el-main>
      <el-footer style="width: 85%;display: flex">
        <div style="flex: 1"></div>
        <el-button-group style="float: right">
          <el-button type="primary" style="width: 120px" @click="submit()"
          >保存</el-button
          >
          <el-button type="danger" style="width: 120px" @click="UploadAction">保存并退出</el-button>
        </el-button-group>
      </el-footer>
    </el-container>
    <UploadAction :visible="UploadActionVisible"
                  v-if="UploadActionVisible"
                  @cancel="UploadActionVisible=false"
                  :aid="NewFile.aid"
                  :tid="NewFile.TeamId"
                  @submit="subexit"></UploadAction>
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
  import UploadAction from "./UploadAction";
  export default {
    name: "editfile",
    created() {
      this.SearchInput=this.$route.query.SearchInput
      this.NewFile=JSON.parse(this.$route.query.NewFile)
      if(this.NewFile.aid>0)
      {
        console.log(this.NewFile);
        axios({
          url:"http://127.0.0.1:8000/getArticleContent/"+this.NewFile.aid,
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
      else{
        this.index=JSON.parse(this.$route.query.Template);
        if(this.index===1){
          this.content='<h1 class="ql-align-center"><strong>修订记录</strong></h1><h2 class="ql-align-center"><strong style="color: rgb(0, 0, 255);"><em>名词解释</em></strong>		<em style="color: rgb(0, 0, 255);">说明：列出本文档中所用到的专门术语的定义和缩略语的全称和解释。</em></h2><h2 class="ql-align-center"><br></h2><h2><strong>参考文档</strong></h2><p><em style="color: rgb(0, 0, 255);">说明：列出本文档的所有参考文档。</em></p><h2><br></h2><h2><strong>整体流程/逻辑关系</strong></h2><p><em style="color: rgb(0, 0, 255);">说明：说明项目本份需求文档描述的产品或组件的总体流程图或逻辑关系图。</em></p><h1><strong>特性</strong></h1><h2 class="ql-indent-1"><br></h2><h2 class="ql-indent-1"><strong style="color: rgb(0, 0, 255);"><em>特性 F01 XXXX</em></strong></h2><p><em style="color: rgb(0, 0, 255);">说明：陈述该特性的简要说明。F指特性，m为1~n的自然数，Fmm为该特性的编号。</em></p><p><em style="color: rgb(0, 0, 255);">如：1.1特性F03 截图功能优化。</em></p><h3><strong>特性所包含的功能</strong></h3><p>简要描述</p><p><em style="color: rgb(0, 0, 255);">简要描述此特性包含的功能点及优先级：</em></p><p><em style="color: rgb(0, 0, 255);">1、屏幕截图灰屏机制优化 （高）</em></p><p><em style="color: rgb(0, 0, 255);">2、</em></p><p><em style="color: rgb(0, 0, 255);">3、</em></p><h3><strong>功能性需求(</strong><strong style="color: rgb(0, 0, 0);">Functional Requirements，FR</strong><strong>)</strong></h3><h3 class="ql-indent-1"><strong style="color: rgb(0, 0, 255);"><em>F01.FR01 XXXXX</em></strong></h3><p><em style="color: rgb(0, 0, 255);">说明：将复杂特性细分为系统需求，陈述该功能的详细说明。</em></p><p><em style="color: rgb(0, 0, 255);">如：1.1.2.1 F01.FR01屏幕截图灰屏机制优化。</em></p><p>&nbsp;</p><p>用户场景</p><p><em style="color: rgb(0, 0, 255);">描述此需求的使用场景</em></p><p>功能描述</p><p><em style="color: rgb(0, 0, 255);">简要描述此需求要实现的功能</em></p><p>处理流程</p><p><em style="color: rgb(0, 0, 255);">详细描述此需求的处理步骤，以及相关的交互说明</em></p><p><em style="color: rgb(0, 0, 255);">1、</em></p><p><em style="color: rgb(0, 0, 255);">2、</em></p><p><em style="color: rgb(0, 0, 255);">3、</em></p><p>补充说明</p><p><em style="color: rgb(0, 0, 255);">特别或者需要补充说明的地方</em></p><h3><strong>F01.FR02 </strong><strong style="color: rgb(0, 0, 255);">XXXXX</strong></h3><p>用户场景</p><p>&nbsp;</p><p>功能描述</p><p>&nbsp;</p><p>处理流程</p><p>1、</p><p>2、</p><p>3、</p><p>补充说明</p><p>&nbsp;</p><h2><strong>特性 F02 </strong><strong style="color: rgb(0, 0, 255);">XXXX</strong></h2><p><em style="color: rgb(0, 0, 255);">内容构架同1.1，同样描述特性2的功能性需求</em></p><p>&nbsp;</p><h1><strong>性能需求</strong></h1><p><em style="color: rgb(0, 0, 255);">对照此表进行检查，在“相关特性”中简单标注符合条件的特性</em></p><p><strong>分类</strong></p><p><strong>细项</strong></p><p><strong>提示</strong></p><p><strong>相关特性</strong></p><p>&nbsp;</p><p>数据读写</p><p>是否需要从server获取或向server发送大量数据</p><p>关注过程的耗时、资源占用</p><p>&nbsp;</p><p>是否需要保存或读取大量数据（本地）</p><p>&nbsp;</p><p>是否有大数据量的移动（导入、复制、剪切、删除，等）</p><p>&nbsp;</p><p>是否有数据搜索</p><p>&nbsp;</p><p>界面效果</p><p>是否会出现大量同类的界面元素</p><p>关注创建、展示、刷新、销毁过程的耗时</p><p>&nbsp;</p><p>是否有动画效果</p><p>关注</p><p>&nbsp;</p><p>其他</p><p>是否有批量操作</p><p>关注操作过程的耗时和响应速度</p><p>&nbsp;</p><p>是否有内嵌网页</p><p>页面测速</p><p>&nbsp;</p><p>是否有网页跳转</p><p>&nbsp;</p><p>是否有定时处理逻辑</p><p>关注定时处理的内容量</p><p>&nbsp;</p><p>是否有延时处理逻辑</p><p>关注延时点会跟其他逻辑重合、是否会造成视觉误解</p><p>&nbsp;</p><p>是否是关键操作或常用操作</p><p>关注操作过程的耗时和响应速度</p><p>&nbsp;</p><p>是否关联到关键操作：登录面板、登录/退出QQ、打开/关闭会话窗口、用户资料窗口、主面板好友列表</p><p>&nbsp;</p><p>&nbsp;</p><h1><strong>国际化需求</strong></h1><p class="ql-indent-1"><em style="color: rgb(0, 0, 255);">说明： 国际化需求包括以下方面：1、编码问题Unicode　2、区域和文化意识方面：区域，日期和日历，时间格式，货币格式，大小与转换，排序和字符串比较，数字格式，地址，纸张大小，电话号码，温度等  3、文本输入，输出及显示 4、多语言界面。 </em></p><p>描述</p><p>1、</p><p>2、</p><p>补充说明</p><p>&nbsp;</p><h1><strong>附录</strong></h1><p><em style="color: rgb(0, 0, 255);">涉及到的其他相关文档在此列明。没有则写无。</em></p><p><strong style="color: rgb(0, 0, 255);"><em>需求文档命名规范参见《Hummer产品需求规格说明书命名范例》。</em></strong></p><p><br></p>'
        }
        else if(this.index===2){
          this.content='<h1 class="ql-align-center"><strong style="color: rgb(51, 51, 51); background-color: rgb(255, 255, 255);">2020年终总结通用模板</strong></h1><p><br></p><h3>2019年，在公司领导的正确领导下，同事的帮助下，我围绕公司中心工作，结合部门的工作要求，工作上积极主动，求真务实，严格执行各项工作制度，不断提高了自身业务技术水平和工作能力，现将我一年来的工作总结如下：&nbsp;</h3><h2><strong style="color: rgb(51, 51, 51); background-color: rgb(255, 255, 255);">一.&nbsp;认真学习、端正态度，努力提升自我素养</strong></h2><h3>	<span style="color: rgb(51, 51, 51); background-color: rgb(254, 254, 254);">自年初以来，我坚持一边工作一边学习，不断提高自身政治素养。加强政治理论学习。一年来，采取集中学习与自学相结合的方式，结合公司部门的学习计划，认真学习了XX理论，XX思想等内容，深入领会其精神实质，进一步促进做好本质工作的责任感和紧迫感。&nbsp;</span></h3><h2><strong style="color: rgb(51, 51, 51); background-color: rgb(254, 254, 254);">二.&nbsp;爱岗敬业、坚持原则，树立良好的职业道德</strong><strong style="color: rgb(51, 51, 51); background-color: rgb(255, 255, 255);">&nbsp;</strong></h2><h3>	具有强烈的事业心和责任感，对待每一项工作，能做到“不负公司，不负客户”。在负责的XX工作、XX事务中做到能吃苦耐劳，始终保持积极向上的工作作风和勤恳努力的精神状态。严格公司管理规定，一年来每天都做到按时上、下班，不迟到、不早退、不串岗。无接受吃请和收受红包、礼品、回扣的现象，无差错事故发生。 </h3><h2><strong style="color: rgb(51, 51, 51); background-color: rgb(255, 255, 255);">三.&nbsp;不断学习、不断精进，提高自身的业务能力</strong></h2><h3>	积极参加公司和部门的XX业务学习，通过学习，加强了自身素质的提高。在学习和工作任务比较繁重的情况下，能积极主动的完成公司安排的各种工作，能很好的端正自己的学习态度，从不叫苦叫累。在业务工作中，认真履行部门里的各项规章制度，一切操作都严格遵守操作规程。对待工作认真负责，时刻以谨慎的工作态度处理好每一个事项，认真处理好工作中遇到的疑难问题。对有疑问、有疑惑的事务，向领导班子反映。面对新形势、新机遇、新挑战，能够清醒地认识到只有不断强化理论学习才是生存之道，因此在工作之余努力参加了业余的技能教育。同时采用网络学习、阅读XX工作相关书籍等，学习最新知识、新进展。&nbsp;</h3><h2><strong style="color: rgb(51, 51, 51); background-color: rgb(255, 255, 255);">四.&nbsp;总结</strong></h2><h3>	在新的一年，我将加强实践和理论学习相结合，不断提高自己，抓住每一次让自己学习和成长的机会，以饱满的热情全身心地投入工作学习，为自己的工作积累必要的知识与技能。端正工作态度，踏踏实实、任劳任怨地完成任务。进一步坚定自己的理想和信念，虚心向同事学习，向实践学习，取人之长补已之短，争取在新的一年里为公司的发展贡献力量。</h3>'
        }
        else if(this.index===3){
          this.content='<h1 class="ql-align-center"><strong>预备党员转正申请书</strong></h1><h3><span style="color: rgb(43, 43, 43);">尊敬的党支部：</span></h3><h3>	<span style="color: rgb(43, 43, 43);">我是XX年XX月XX日被批准为中国共产党预备党员的，预备期为一年，到XX年XX月XX日预备期结束。现将我的</span><a href="http://www.reader8.cn/data/rdz/" rel="noopener noreferrer" target="_blank" style="color: rgb(43, 43, 43);">入党转正</a><span style="color: rgb(43, 43, 43);">申请报告送上，希望党组织能够批准我的转正申请，请审查。入党一年来，我在党组织的严格要求下，在支部党员的帮助教育下，无论政治上、思想上都取得了较大进步。特别是通过参加党内一系列活动，不但加深了我对党的性质、宗旨的认识，更增强了自身的党性修养，从而认识到做一名合格的共产党员，不仅要解决组织上入党的问题，更要解决思想上入党的问题。回顾这一年来的学习、工作情况，我的收获是很大的，归纳起来有以下几点：</span></h3><h3>	<span style="color: rgb(43, 43, 43);">一、明确了作为一名共产党员，必须把实现共产主义的远大理想与学习、工作的实际紧密结合起来。入党以前，我觉得做一名共产党员要有远大的理想，要有为共产主义奋斗终生的信念，但如何把远大的共产主义理想体现在现实生活中，当时并不十分清楚。入党以后，经过党组织一年来的教育帮助，我逐步认识到对普通党员来说，端正态度，努力工作，刻苦学习，更多地掌握应知应会的知识，就是把远大的共产主义理想与现实生活结合的最佳方式。因此，我除了努力工作以外，努力边学习边总结实践理论，并以实践理论来指导自己的工作实际，为更好地胜任本职工作打下坚实的基础。</span></h3><h3>	<span style="color: rgb(43, 43, 43);">二、明确了作为一名共产党员，必须不断增强为人民服务的意识，提高自己为人民服务的本领。入党以前，我觉得管好自己就不错了，根本没有把真诚地帮助他人纳入自己的职责范围内。后来通过学习和与培养联系人交换意见，我逐渐懂得了要成为一名合格的共产党员，就要不断增强为人民服务的意识，提高为人民服务的本领。于是，我在完成好自己工作的同时，还热心帮助其他同志。在工作时间之外，我帮助年青教师备课上课，使他们能快速地成长起来;在学校的爱心捐款活动中，我积极组织并参与;在参加义务献血活动中，我第一个报名……所有这些，都让我由衷地感受到党的伟大、真情的可贵，我为自己能成为一名光荣的共产党员而感到无比自豪。</span></h3><h3>	<span style="color: rgb(43, 43, 43);">三、明确了作为一名共产党员，必须旗帜鲜明地拥护党的方针政策，并带头执行。入党以前，自己所做的一切，都可以看成是个人行为。即使做得不对，也能得到他人的谅解。成为一名预备党员后，我觉得肩上的责任更为重大了，自己的一言一行、一举一动，不是代表个人，而是代表整个组织。特别是在一些公共场合、特定场所，我必须以一名合格党员的身份出现，不但要模范遵守学校各项规章制度，而且要身体力行好党的各项决策、要求，时时处处做好群众表率。</span></h3><h3>	<span style="color: rgb(43, 43, 43);">总之，在过去的一年里，我在组织的关怀与培养下，认真学习、努力工作，政治思想觉悟都有了很大的提高，个人综合素质也有了全面的发展。但我知道还存在着一些缺点和不足，离一个优秀共产党员的标准和要求还有一定距离。我还需要继续努力，也请大家继续帮助我。在今后的工作和学习中，我将更加严格要求自己，虚心向先进的党员同志学习，努力克服自己的缺点和不足，争取在思想、工作、学习等方面有更大的进步。今天，我虽然向党组织递交了转正申请报告，但我仍愿意接受党组织的长期考验，并矢志不渝地把我的</span><a href="http://www.reader8.cn/zuowen/special/special_93.html" rel="noopener noreferrer" target="_blank" style="color: rgb(43, 43, 43);">青春</a><span style="color: rgb(43, 43, 43);">热血奉献给党的伟大事业。</span></h3><h2 class="ql-align-right"><span style="color: rgb(43, 43, 43);">申请人：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></h2><h2 class="ql-align-right"><span style="color: rgb(43, 43, 43);">XX年XX月XX日</span></h2><p><br></p>'
        }
      }
    },
    beforeDestroy() {
      axios({
        url:'http://127.0.0.1:8000/endEdit',
        params:{
          name:this.$store.state.name,
          token:this.$store.state.token,
          aid:this.NewFile.aid
        }
      })
    },
    data() {
      return {
        UploadActionVisible:false,
        SearchInput:undefined,
        NewFile:'',
        contentCode: '',
        content:'',
        index:0,
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
      UploadAction,
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
        formData.append('ifteam',this.NewFile.TeamId);
        formData.append('title',this.NewFile.Title);
        formData.append('message',this.NewFile.SimpleMessage);
        formData.append('visibility',this.NewFile.Authority);
        formData.append('commentGranted',this.NewFile.Revise);
        formData.append('aid',this.NewFile.aid);
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        axios.post('http://127.0.0.1:8000/uploadNewArticle',formData,config).then(res =>
        {
          console.log('AAAAAIIIIIIDDDD!!!!')
          console.log(this.NewFile)
          console.log(res)
          this.NewFile.aid=res.data.aid
        })
      },
      UploadAction(){
        console.log(this.NewFile.TeamId)
        if(this.NewFile.TeamId!==-1)
        {
          this.submit()
          this.UploadActionVisible=true
        }
        else
        {
          this.submit()
          this.subexit()
        }
      },
      subexit(){
        console.log('AAAAAIIIIIIDDDD!!!!')
        console.log(this.NewFile)
        axios({
          url:'http://127.0.0.1:8000/endEdit',
          params:{
            name:this.$store.state.name,
            token:this.$store.state.token,
            aid:this.NewFile.aid
          }
        }).then(res=>{
          this.NewFile.aid=res.data.aid
          this.$message({
            type:"success",
            message:'上传成功'
          })
          if(this.SearchInput!==undefined){
            this.$router.push({
              path:'/tools/searchfile',
              query:{
                asd:this.$route.query.SearchInput
              }
            })
          }
          else if(this.NewFile.TeamId===-1)
          {
            this.$router.push('/tools/userfile')
          }
          else {
            let Team=this.$route.query.Team
            console.log('TTTEEEAAAMMM!!!')
            console.log(Team)
            this.$router.push({
              path:'/tools/teammanage',
              query:{
                Team:Team
              }
            })
          }
        })
      },
    }
  };
</script>
