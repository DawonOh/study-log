import { useSlate } from "slate-react";
import {
  isBlockActive,
  isMarkActive,
  toggleBlock,
  toggleMark,
} from "./toolbarFunctions.js";
import Button from "../common/Button.jsx";
import Icon from "../common/Icon.jsx";
import defaultToolbarGroups from "./toolbarGroups.js";
import styled from "styled-components";
import { InsertImageButton } from "./Image.jsx";

const ToolbarDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  position: sticky;
  top: 0;
  background: #ffffff;
  padding: 1rem;
  border: 1px solid #f5f5f5;
`;

const ToolbarSpan = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  margin: 0 10px;
`;

const Toolbar = () => {
  const editor = useSlate();

  // format : toolbarGroups.js
  const MarkButton = ({ format }) => {
    return (
      <Button
        active={isMarkActive(editor, format)}
        format={format}
        onMouseDown={(e) => {
          e.preventDefault();
          toggleMark(editor, format);
        }}
      >
        <Icon icon={format} />
      </Button>
    );
  };

  const BlockButton = ({ format }) => {
    return (
      <Button
        active={isBlockActive(editor, format)}
        format={format}
        onMouseDown={(e) => {
          e.preventDefault();
          toggleBlock(editor, format);
        }}
      >
        <Icon icon={format} />
      </Button>
    );
  };

  return (
    <ToolbarDiv>
      {defaultToolbarGroups.map((group, idx) => (
        <ToolbarSpan key={idx}>
          {group.map((el) => {
            switch (el.type) {
              case "mark":
                return <MarkButton key={el.id} {...el} />;
              case "block":
                return <BlockButton key={el.id} {...el} />;
              default:
                return null;
            }
          })}
          <InsertImageButton />
        </ToolbarSpan>
      ))}
    </ToolbarDiv>
  );
};
export default Toolbar;
