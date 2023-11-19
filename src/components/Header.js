import styled from "styled-components";
import logo from "../assets/img/logo.svg";

const Container = styled.div`
  padding: 10px 30px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;
const Logo = styled.img`
  width: 150px;
  height: 100px;
  flex-shrink: 0;
`;

const Content = styled.div`
  color: black;
  text-decoration: none;
  font-family: "나눔손글씨 연지체";
  font-size: 45px;
`;

const Header = ({ onClick }) => {
  return (
    <Container>
      <Logo src={logo} onClick={onClick} />
      <Content>떠나요 제주도 푸른밤 하늘 아래로</Content>
    </Container>
  );
};

export default Header;
