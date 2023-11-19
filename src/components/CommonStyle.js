import styled from "styled-components";

export const Totalframe = styled.div`
  width: 70%;
  margin: 0 auto;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Screen = styled.div`
  padding: 0 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ContentMain = styled.div`
  width: 940px;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  padding: 80px 75px;
`;
