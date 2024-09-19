import { Editor, Transforms, Element as SlateElement } from "slate";

export const isMarkActive = (editor, format) => {
  // Editor.marks : 현재 선택된 영역에서 텍스트에 추가될 mark를 가져온다.
  // Editor.marks(editor: Editor) => Omit<Text, 'text'> | null
  // Omit<Type, Keys> : Type에서 모든 프로퍼티를 선택하고 Keys를 제거한 타입을 생성
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

export const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
  });

  return !!match;
};

export const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);

  Transforms.setNodes(editor, {
    type: isActive ? "paragraph" : format,
  });

  if (!isActive) {
    Transforms.wrapNodes(editor, {
      type: format,
      children: [],
    });
  }
};
