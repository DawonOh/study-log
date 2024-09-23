import { Transforms } from "slate";
import {
  ReactEditor,
  useFocused,
  useSelected,
  useSlateStatic,
} from "slate-react";
import { isUrl } from "is-url";
import styled from "styled-components";
import { forwardRef } from "react";
import Button from "../common/Button";

const ImgContainer = styled.div`
  position: relative;
`;

const Img = styled.img`
  display: block;
  max-width: 100%;
  max-height: 20em;
  box-shadow: ${(props) =>
    props.$selected && props.$focused ? "0 0 0 3px #B4D5FF" : "none"};
`;

const DeleteButton = styled(Button)`
  display: ${(props) => (props.$selected && props.$focused ? "block" : "none")};
  position: absolute;
  top: 0.5em;
  left: 0.5em;
  background-color: white;
  z-index: 1;
  padding: 2px 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  cursor: pointer;
`;

// 이미지 파일 확인
const isImageUrl = (url) => {
  if (!url) return false;
  if (!isUrl(url)) return false;
  const ext = new URL(url).pathname.split(".").pop().toLowerCase();
  return ["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(ext);
};

// 드래그로 원하는 위치에 이미지 삽입 - write.jsx에서 사용
export const withImages = (editor) => {
  // isVoid(element: Element) => boolean : 요소가 비어있는지 확인
  const { insertData, isVoid } = editor;

  editor.isVoid = (element) => {
    return element.type === "image" ? true : isVoid(element);
  };

  editor.insertData = (data) => {
    const text = data.getData("text/plain");
    const { files } = data;

    if (files && files.length > 0) {
      for (const file of files) {
        const reader = new FileReader();
        const [mime] = file.type.split("/");

        if (mime === "image") {
          reader.addEventListener("load", () => {
            const url = reader.result;
            insertImage(editor, url);
          });

          reader.readAsDataURL(file);
        }
      }
    } else if (isImageUrl(text)) {
      insertImage(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};

// 이미지 삽입
// 이미지 바로 하단에 빈 문단 삽입 : 이미지 뒤에 빈 문단을 넣어야 내용을 작성할 수 있음
const insertImage = (editor, url) => {
  const text = { text: "" };
  const image = { type: "image", url, children: [text] };
  Transforms.insertNodes(editor, image);
  Transforms.insertNodes(editor, {
    type: "paragraph",
    children: [{ text: "" }],
  });
};

export const Image = forwardRef(({ attributes, children, element }, ref) => {
  // 현재 에디터 가져오기
  const editor = useSlateStatic();
  // 요소 위치 가져오기
  const path = ReactEditor.findPath(editor, element);

  // 이미지 삭제 버튼 클릭 시 실행될 함수
  const removeImage = () => {
    Transforms.removeNodes(editor, { at: path });
  };

  // 요소 선택 / 포커스 여부
  // selected가 false에서 바뀌지 않는 문제 발생
  const selected = useSelected();
  const focused = useFocused();

  return (
    <div {...attributes} ref={ref}>
      {children}
      <ImgContainer contentEditable={false}>
        <Img
          src={element.url}
          alt="image"
          $selected={selected}
          $focused={focused}
        />
        <DeleteButton
          $active
          $selected={selected}
          $focused={focused}
          onClick={removeImage}
        >
          삭제
        </DeleteButton>
      </ImgContainer>
    </div>
  );
});

export const InsertImageButton = () => {
  const editor = useSlateStatic();
  return (
    <input
      type="file"
      accept="image/*"
      onChange={(event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.addEventListener("load", () => {
            const imageUrl = reader.result;
            insertImage(editor, imageUrl);
          });
          reader.readAsDataURL(file);
        }
      }}
    />
  );
};
