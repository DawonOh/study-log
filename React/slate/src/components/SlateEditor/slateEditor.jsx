import { useCallback } from "react";
import { Editable, Slate } from "slate-react";
import Toolbar from "../Toolbar/Toolbar";
import { Element, Leaf } from "./deserialize";

const SlateEditor = ({ editor, value }) => {
  // https://docs.slatejs.org/libraries/slate-react/slate
  // props로 editor, value, children을 받는다.

  // https://docs.slatejs.org/libraries/slate-react/editable
  // <Editable> 컴포넌트는 Slate 컴포넌트 안에 위치해야 한다.

  const renderElement = useCallback((props) => <Element {...props} />, []);

  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  return (
    <Slate editor={editor} initialValue={value}>
      <Toolbar />
      <Editable
        placeholder="내용을 입력하세요."
        renderElement={renderElement}
        renderLeaf={renderLeaf}
      />
    </Slate>
  );
};

export default SlateEditor;
