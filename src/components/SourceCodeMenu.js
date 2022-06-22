import { Boot, SlateTransforms } from "@wangeditor/editor";

class SourceCodeMenu {
  constructor() {
    this.title = "源码";
    // this.iconSvg = '<svg >...</svg>'
    this.tag = "button";
    this.alwaysEnable = true;
  }
  getValue(editor) {
    const html = editor.getHtml();
    return html;
  }
  isActive(editor) {
    return editor.isDisabled(); // or false
  }
  isDisabled() {
    return false; // or true
  }
  exec(editor, value) {
    const disabled = editor.isDisabled();
    if (disabled) {
      const textareaNode = document.getElementById("textarea-source");

      const sourceCode = textareaNode.value;

      /* 匹配img标签中的图片地址 */
      // reg = new RegExp('(?<=<img src=")(https?:/{2}[^\\s]*)(?=")', "g");

      /* 将div标签替换为p标签 */
      const regDiv = new RegExp("(?<=</?)(div)(?=>)", "g");
      const replaceP = sourceCode.replace(regDiv, "p");
      /* 将v-lazy替换为src */
      const regVLazy = new RegExp("(?<=<img )(v-lazy)(?==)", "g");
      const replaceSrc = replaceP.replace(regVLazy, "src");
      editor.enable();
      if (!editor.isFocused()) editor.focus();

      editor.select([]);
      editor.deleteFragment();
      SlateTransforms.setNodes(
        editor,
        { type: "paragraph" },
        { mode: "highest" }
      );
      setTimeout(function () {
        editor.dangerouslyInsertHtml(replaceSrc);
        textareaNode.style = "visibility:hidden;";
      });
    } else {
      const editorNode = editor.getEditableContainer();
      const textareaNode =
        document.getElementById("textarea-source") ||
        document.createElement("textarea");
      textareaNode.id = "textarea-source";
      textareaNode.placeholder = "请粘贴源码";
      textareaNode.style =
        "display: block;position: absolute; top: 0; width: 100%; height: 100%; outline: none;border: none;";
      textareaNode.value = value;
      editorNode.appendChild(textareaNode);
      editor.disable();
    }
  }
}
const sourceCodeMenuConf = {
  key: "sourceCodeMenu",
  factory() {
    return new SourceCodeMenu();
  },
};

Boot.registerMenu(sourceCodeMenuConf);
