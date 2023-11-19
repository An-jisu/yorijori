import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";
import tourists from "../JeJuTourList";
import * as f from "../components/CommonStyle";
import styled from "styled-components";
import Header from "../components/Header";
import BigDay from "../components/BigDay";
import Number from "../components/Number";
import PlaceInfo from "../components/PlaceInfo";
import removeWhite from "../assets/img/removeWhite.svg";
import { MdCloudDone } from "react-icons/md";
import { ThemeProvider } from "styled-components";
import theme from "../Theme";

const MapContainer = styled.div`
  width: 100%;
  height: 67vh;
  font-size: 100px;
  border-radius: 15px;
`;
const RouteContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 50px;
`;

const RouteBox = styled.div`
  max-height: 90vh;
  overflow-y: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const DayToggle = styled.div`
  display: flex;
  gap: 0;
`;

const BasketContainer = styled.div`
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const BasketContent = styled.div`
  color: #000;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const BasketBox = styled.div`
  overflow-y: auto;
  width: 200px;
  height: 600px;
  background: rgba(255, 220, 178, 0.25);
`;
const OneBasket = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 10px;
  gap: 20px;
  position: relative;
`;
const RemoveIcon = styled.img`
  position: absolute;
  top: 27px;
  right: 17px;
  width: 20px;
  height: 20px;
`;

const BasketList = styled.img`
  width: 100%;
  border-radius: 10px;
`;

const RouteList = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CreateButton = styled.div`
  width: 10%;
  height: 40px;
  flex-shrink: 0;
  margin: 10px auto;
  background: ${(props) => props.theme.green1};
  border-radius: 5px;
  margin-bottom: 20px;
  &:hover {
    background: ${(props) => props.theme.green2};
  }
  cursor: pointer;
`;

const ButtonContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #000;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  line-height: normal;
`;
const RouteFactor = styled.div`
  display: flex;
  gap: 15px;
`;

const Container = styled.div`
  width: 100%;
  height: 1400px;
  position: absolute;
  top: 0;
  background-color: ${(props) =>
    props.isClicked ? "rgba(20, 20, 20, 0.8)" : null};
  z-index: 2;
`;

const Box = styled.div`
  width: 600px;
  height: 320px;
  background: #ebebf0;
  margin: 0 auto;
  border: 1px solid;
  border-radius: 8px;
  z-index: 1;
  position: sticky;
  top: 160px;
  left: 280px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  white-space: pre-line;
`;
const DetailTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 auto;
  margin-bottom: 10px;
  color: #2e2e2e;
  font-family: Inter;
  font-size: 35px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 48% */
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;
const Label = styled.div`
  color: #000;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Button = styled.div`
  width: 120px;
  height: 40px;
  padding: 5px 7px;
  background: ${(props) => props.theme.green1};
  border-radius: 10px;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background: ${(props) => props.theme.green2};
  }
`;

const DetailContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background-color: ${(props) =>
    props.isClicked ? "rgba(20, 20, 20, 0.8)" : null};
`;

const DetailBox = styled.div`
  width: 330px;
  height: 500px;
  margin: 0 auto;
  border-radius: 8px;
  z-index: 1;
  position: absolute;
  top: 40px;
  left: 400px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
`;

const DetailContent = styled.div`
  background-color: #f5f5f5;
  padding: 30px;
  border-radius: 8px;
`;
const DetailImg = styled.img`
  border-radius: 8px;
  width: 330px;
  height: 230px;
  object-fit: cover;
`;
const DetailPlaceName = styled.div`
  color: #000;
  font-size: 27px;
  font-weight: 700;
  line-height: normal;
  margin: 0;
  padding: 0;
`;

const DetailDescription = styled.div`
  padding: 10px 0 0 10px;
  color: #000;
  font-size: 16px;
  font-weight: 400;
  line-height: 25px;
  height: 150px;
  overflow-y: auto;
`;
const CloseButton = styled.img`
  display: flex;
  justify-content: flex-start;
  width: 30px;
  height: 30px;
  color: white;
`;

function ShowRoute() {
  const [selectedDay, setSelectedDay] = useState(1);
  const [route, setRoute] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [size, setSize] = useState(0);
  const navigate = useNavigate();
  const { key } = useParams();
  const [loc, setLoc] = useState(null);
  const handleDay = (props) => {
    setSelectedDay(props);
  };

  const handleClick = () => {
    setIsClicked(true);
  };

  const handleButtonCheck = () => {
    navigate("/mylist");
  };

  const handleButtonInitial = () => {
    navigate("/");
  };

  useEffect(() => {
    if (route === null) {
      return;
    }

    setSize(route?.length);
    console.log(route);
    // console.log(localStorage.length);
    setLoc(
      route?.map((arr) => arr.map((item) => ({ lat: item[1], lng: item[2] })))
    );
  }, [route]);

  useEffect(() => {
    if (key === undefined) {
      return;
    }

    setRoute(JSON.parse(window.localStorage.getItem(key)));
    console.log(route);
    //console.log(JSON.parse(window.localStorage.getItem(window.localStorage.key(0))));
  }, [key]);

  const getDescriptionByTourName = (tourName) => {
    const findTour = tourists.find((tour) => tour["중심관광지명"] === tourName);
    //console.log(findTour);
    return findTour ? findTour["설명"] : "";
  };

  const handleHeader = () => {
    navigate("/");
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        {isClicked ? (
          <Container isClicked>
            <Box>
              <Content>
                <DetailTitle>
                  <MdCloudDone />
                  여행 일정 생성 완료
                </DetailTitle>
                <Label>"나의 여행 리스트"로 이동하시겠습니까?</Label>
              </Content>
              <ButtonContainer>
                <Button onClick={handleButtonCheck}>확인</Button>
                <Button onClick={handleButtonInitial}>첫 페이지로</Button>
              </ButtonContainer>
            </Box>
          </Container>
        ) : null}
        <f.Totalframe>
          <Header onClick={handleHeader} />
          <f.Screen>
            {/* 지도 */}
            <MapContainer>
              <Map
                style={{ width: "100%", height: "440px" }}
                center={{ lat: 33.5261, lng: 126.5434 }}
                level={9}
              >
                {route?.map((day, index) =>
                  index + 1 === selectedDay
                    ? day?.map((data, idx) => (
                        <MapMarker
                          position={{ lat: data[1], lng: data[2] }}
                          title={data[0]}
                          image={{
                            src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png", // 마커이미지의 주소입니다
                            size: {
                              width: 36,
                              height: 37,
                            }, // 마커이미지의 크기입니다
                            options: {
                              spriteOrigin: {
                                x: 0,
                                y: idx * 46 + 10,
                              },
                              spriteSize: {
                                width: 36,
                                height: 691,
                              },
                            },
                          }}
                        ></MapMarker>
                      ))
                    : null
                )}
                {loc !== null ? (
                  <Polyline
                    path={[loc[selectedDay - 1]]}
                    strokeWeight={5}
                    strokeColor={"#0048BA"}
                    strokeOpacity={0.8}
                    strokeStyle={"solid"}
                  />
                ) : null}
              </Map>
            </MapContainer>
            <RouteContainer>
              {/* 날짜 선택 */}
              <DayToggle>
                {Array.from({ length: size }).map((_, index) => (
                  <BigDay
                    key={index}
                    num={index + 1}
                    onClick={() => handleDay(index + 1)}
                    isSelected={selectedDay === index + 1}
                    theme={theme}
                  />
                ))}
              </DayToggle>
              <RouteBox>
                {/* 루트 보여주기 */}
                {route !== null ? (
                  <RouteList>
                    {route[selectedDay - 1]?.map((place, index) => (
                      <RouteFactor>
                        <Number content={index + 1}></Number>
                        <PlaceInfo
                          name={place[0]}
                          content={getDescriptionByTourName(place[0])}
                          src={
                            "https://jisoobucket.s3.ap-northeast-2.amazonaws.com/" +
                            place[0] +
                            ".jpeg"
                          }
                        />
                      </RouteFactor>
                    ))}
                  </RouteList>
                ) : null}
              </RouteBox>
            </RouteContainer>
            <CreateButton>
              <ButtonContent onClick={handleClick}>완료</ButtonContent>
            </CreateButton>
          </f.Screen>
        </f.Totalframe>
      </ThemeProvider>
    </div>
  );
}

export default ShowRoute;
