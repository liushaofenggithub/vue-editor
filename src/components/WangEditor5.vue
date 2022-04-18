<template>
  <div>
    <div style="border: 1px solid #ccc; padding: 10px">
      <!-- 工具栏 -->
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editor"
        :defaultConfig="toolbarConfig"
      />
      <!-- 编辑器 -->
      <Editor
        style="height: 400px; overflow-y: hidden"
        :defaultConfig="editorConfig"
        v-model="content"
        @onChange="onChange"
        @onCreated="onCreated"
      />
    </div>
    <div style="margin-top: 10px">
      <textarea
        v-model="html"
        style="width: 100%; height: 200px; outline: none"
      ></textarea>
    </div>
  </div>
</template>

<script>
import "./SourceCodeMenu.js";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";

export default {
  name: "MyEditor",
  components: { Editor, Toolbar },
  data() {
    return {
      content: "",
      editor: null,
      html: "",
      toolbarConfig: {
        insertKeys: {
          index: 31, // 插入的位置，基于当前的 toolbarKeys
          keys: ["sourceCodeMenu"],
        },
        // toolbarKeys: [ /* 显示哪些菜单，如何排序、分组 */ ],
        // excludeKeys: [ /* 隐藏哪些菜单 */ ],
      },
      editorConfig: {
        placeholder: "请输入内容...",
        // autoFocus: false,

        // 所有的菜单配置，都要在 MENU_CONF 属性下
        MENU_CONF: {},
      },
    };
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor); // 【注意】一定要用 Object.seal() 否则会报错
    },
    onChange(editor) {
      console.log("onChange", editor.getHtml()); // onChange 时获取编辑器最新内容
    },
  },
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁 editor ，重要！！！
  },
};
</script>

<style src="@wangeditor/editor/dist/css/style.css"></style>
