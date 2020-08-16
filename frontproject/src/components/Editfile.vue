<template>
  <div>
    <el-container>
      <el-aside style="width: 100%;height: 550px">
        <div>
          <quill-editor
            v-model="content"
            style="height: 500px;"
            ref="myQuillEditor"
            :options="editorOption"
            @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
            @change="onEditorChange($event)">
          </quill-editor>
        </div>
      </el-aside>
      <el-main>
      </el-main>
      <el-footer style="width: 85%;display: flex">
        <div style="flex: 1"></div>
        <el-button-group style="float: right">
          <el-button type="primary" style="width: 120px">保存</el-button>
          <el-button type="danger" style="width: 120px">保存并退出</el-button>
        </el-button-group>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  import { quillEditor } from 'vue-quill-editor'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  export default {
    name: 'editfile',
    data () {
      return {
        content: null,
        editorOption: {}
      }
    },
    components: {
      quillEditor
    },
    methods: {
      onEditorReady (editor) {
        // 准备编辑器
        console.log('111')
      },
      onEditorBlur () {
        // 失去焦点事件
        console.log('111')
      },
      onEditorFocus () {
        // 获得焦点事件
        console.log('222')
      },
      onEditorChange () {
        // 内容改变事件
        console.log('333')
      }
    }
  }
</script>
