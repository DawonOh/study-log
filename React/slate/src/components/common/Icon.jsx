import styled from "styled-components";

const BoldIcon = styled.span`
  width: 1.2rem;
  height: 1.2rem;
  font-weight: 700;
`;

const ItalicIcon = styled.span`
  width: 1.2rem;
  height: 1.2rem;
  font-weight: 700;
  font-style: italic;
`;

const HeadingIcon = styled.span`
  width: 1.2rem;
  height: 1.2rem;
`;

const iconList = {
  bold: <BoldIcon>B</BoldIcon>,
  italic: <ItalicIcon>I</ItalicIcon>,
  headingOne: <HeadingIcon>H1</HeadingIcon>,
  headingTwo: <HeadingIcon>H2</HeadingIcon>,
};

const Icon = (props) => {
  const { icon } = props;
  return iconList[icon];
};

export default Icon;
