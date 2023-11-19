import styled from "styled-components";
import logo from "../assets/img/logo.svg";

const TotalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Container = styled.div`
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  border-radius: 5px;
  background: ${(props) =>
    props.empty ? "#D9D9D9" : "rgba(248, 239, 160, 0.8)"};
`;
const Num = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 5px;
  flex-shrink: 0;
  color: #000;
  font-size: 15px;
  font-weight: 700;
  line-height: normal;
`;

const Line = styled.div`
  height: ${(props) => (props.main ? "54px" : "75px")};
  border: 1px dashed ${(props) => (props.empty ? "#D9D9D9" : "#dac400")};
`;

const Number = (props) => {
  return (
    <TotalContainer>
      <Container empty={props.empty}>
        <Num>{props.content}</Num>
      </Container>
      <Line main={props.main} empty={props.empty} />
    </TotalContainer>
  );
};

export default Number;
