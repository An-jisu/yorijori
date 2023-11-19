import styled from "styled-components";

const Container = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  max-height: 90vh;
`;
const Img = styled.img`
  width: ${(props) => (props.main ? "150px" : "200px")};
  height: ${(props) => (props.main ? "90px" : "120px")};
  border-radius: 7px;
`;
const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 70%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const PlaceName = styled.div`
  font-family: "GmarketSansTTFBold";
  font-size: ${(props) => (props.main ? "20px" : "25px")};
  font-weight: 900;
  line-height: normal;
`;

const Content = styled.div`
  height: 70px;
  overflow-y: auto;
  font-size: 17px;
  font-weight: 500;
  line-height: normal;
`;

const PlaceInfo = (props) => {
  return (
    <Container>
      <Img src={props.src} main={props.main} />
      <InfoBox>
        <PlaceName main={props.main}>{props.name}</PlaceName>
        <Content>{props.content}</Content>
      </InfoBox>
    </Container>
  );
};

export default PlaceInfo;
