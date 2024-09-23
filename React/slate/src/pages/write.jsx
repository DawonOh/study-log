import { useMemo, useState } from "react";
import { withReact, Editable } from "slate-react";
import { withHistory } from "slate-history";
import { createEditor } from "slate";
import SlateEditor from "../components/SlateEditor/slateEditor";
import styled from "styled-components";
import { withImages } from "../components/Toolbar/Image";

const StyledEditable = styled(Editable)`
  background-color: white;
  border-bottom: 1px solid #eee;
  flex: 1;
  &:focus-visible {
    border: auto;
    outline: none;
  }
  padding: 10px;
`;

// SlateEditor의 초기값
const editorInitialValue = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

const Write = () => {
  const [title, setTitle] = useState("");

  const editor = useMemo(
    () => withImages(withHistory(withReact(createEditor()))),
    []
  )

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };
  return (
    <div>
      <input
        type="text"
        value={title}
        placeholder="title"
        onChange={titleHandler}
      />
      <SlateEditor editor={editor} value={editorInitialValue}>
        <StyledEditable />
      </SlateEditor>
    </div>
  );
};

export default Write;
