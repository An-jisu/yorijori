import { useEffect, useState } from "react";
import axios from "axios";
import tourists from "../JeJuTourList";
import { Link, useNavigate } from "react-router-dom";
import * as f from "../components/CommonStyle";
import styled from "styled-components";
import Header from "../components/Header";
import Day from "../components/Day";
import Number from "../components/Number";
import PlaceInfo from "../components/PlaceInfo";
import { MdCardTravel } from "react-icons/md";
// 이미지
import map from "../assets/img/map.png";
import empty from "../assets/img/Rectangle 22.svg";
import removeWhite from "../assets/img/removeWhite.svg";
import { ThemeProvider } from "styled-components";
import theme from "../Theme";

const MainContainer = styled.div`
  height: 380px;
  flex-shrink: 0;
  background-color: #ebebf0;
  border-radius: 30px;
  padding: 30px 80px;
`;
const MainGrid = styled.div`
  display: flex;
`;

const LeftContainer = styled.div`
  width: 45%;
  display: flex;
  flex-direction: column;
`;
const RightContainer = styled.div`
  width: 55%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MyListText = styled.div`
  color: #313131;
  font-family: "Cafe24Ssurround-v2.0";
  font-size: 25px;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 15px;
  &:hover {
    color: black;
  }
`;

const ListImg = styled.img`
  margin-top: ${(props) => (props.empty ? "30px" : null)};
  width: 75%;
  height: 200px;
  border-radius: 10px;
  flex-shrink: 0;
  margin-bottom: 10px;
`;

const ListName = styled.div`
  padding-left: 20px;
  color: #000;
  font-size: 20px;
  font-weight: 700;
  line-height: normal;
`;
const DayToggle = styled.div`
  display: flex;
  gap: 0;
`;

const CreateButton = styled.div`
  width: 40%;
  height: 70px;
  flex-shrink: 0;
  margin: 10px auto 0;
  background: ${(props) => props.theme.green1};
  border-radius: 10px;
  margin-bottom: 25px;
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
  &:hover {
    background: ${(props) => props.theme.green2};
    font-size: 23px;
    border-radius: 10px;
  }
`;

const PopularContainer = styled.div`
  position: relative;
  padding: 40px 60px;
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const PopularContent = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 0 60px 0px 60px;
  color: #2e2e2e;
  font-family: "Cafe24Ssurround-v2.0";
  font-size: 30px;
  font-weight: 700;
  line-height: normal;
`;

const PopularGrid = styled.div`
  display: grid;
  grid-template: repeat(2, 1fr) / repeat(2, 1fr);
  gap: 50px 80px;
`;

const PopularBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
`;

// const Heart=styled.img`
//     width: 30px;
//     height: 30px;
//     position: absolute;
//     top: 20px;
//     right: 20px;
// `

const GridImg = styled.img`
  width: 450px;
  height: 300px;
  border-radius: 10px;
  object-fit: cover;
  flex-shrink: 0;
  &:hover {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3), 4px 0 20px rgba(0, 0, 0, 0.3),
      0 10px 20px rgba(0, 0, 0, 0.3), -4px 0 20px rgba(0, 0, 0, 0.3);
    transform: translate(0, -10%);
  }
`;

const PopularName = styled.div`
  padding: 10px 0 0 20px;
  color: #000;
  font-size: 30px;
  font-weight: 700;
  line-height: normal;
`;
const DetailContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 20px;
  background-color: ${(props) =>
    props.isClicked ? "rgba(20, 20, 20, 0.8)" : null};
`;

const DetailBox = styled.div`
  width: 400px;
  height: 600px;
  margin: 0 auto;
  border-radius: 8px;
  z-index: 1;
  position: absolute;
  top: 90px;
  left: 300px;
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
  width: 400px;
  height: 280px;
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

const DetailAddress = styled.div`
  margin-top: 10px;
  font-family: "GmarketSansTTFLight";
  font-size: 15px;
`;

const DetailDescription = styled.div`
  padding: 10px 0 0 10px;
  color: #000;
  font-size: 16px;
  font-weight: 400;
  line-height: 25px;
  height: 200px;
  overflow-y: auto;
`;
const CloseButton = styled.img`
  display: flex;
  justify-content: flex-start;
  width: 30px;
  height: 30px;
  color: white;
`;
const RouteContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-bottom: 50px;
`;

const RouteBox = styled.div`
  max-height: 250px;
  overflow-y: auto;
  width: 70%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const RouteList = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const RouteFactor = styled.div`
  display: flex;
  gap: 15px;
`;

const TotalBox = styled.div`
  width: 750px;
  height: 250px;
  overflow-y: auto;
`;

const EmptyImg = styled.img`
  width: 690px;
  height: 260px;
  margin-left: 100px;
  border-radius: 10px;
`;

function Main() {
  const [selectedDay, setSelectedDay] = useState(1);
  const [arr, setArr] = useState([]);
  const [isClicked, setIsClicked] = useState(false); // 클릭했는 지 아닌 지
  const [selectedPlace, setSelectedPlace] = useState({});
  const [route, setRoute] = useState(null);
  const navigate = useNavigate();

  const handleDay = (props) => {
    setSelectedDay(props);
  };

  // const showDetail=(props) => {
  //     setIsClicked(props);
  // }

  // 랜덤 수 4개 생성하고,
  useEffect(() => {
    const updatedArr = [];
    // 0~json 파일 데이터 수-1 사이의 랜덤 수 4개 생성해서 arr 배열에 그 수에 해당하는 데이터값 넣음
    for (let i = 0; i < 4; i++) {
      // 랜덤 수 생성
      const rand = Math.floor(Math.random() * tourists.length);
      console.log(rand);
      // 그 수에 해당하는 tourists값 arr에 push
      updatedArr.push(tourists[rand]);
    }
    setArr(updatedArr);
    setRoute(
      JSON.parse(
        localStorage.getItem(
          window.localStorage.key(window.localStorage.length - 1)
        )
      )
    );
  }, []);

  const handleShowDetail = (props) => {
    setSelectedPlace(props);
    setIsClicked(true);
  };

  const CloseDetail = () => {
    setIsClicked(false);
    setSelectedPlace({});
  };

  const handleHeader = () => {
    navigate("/");
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <f.Totalframe>
          <Header onClick={handleHeader} />
          {/* 나의 여행 리스트 */}
          <MainContainer>
            <MainGrid>
              {/* 왼쪽 그리드 */}
              <LeftContainer>
                <Link to="/mylist" style={{ textDecoration: "none" }}>
                  <MyListText>나의 여행 리스트 > </MyListText>
                </Link>
                {window.localStorage.length === 0 ? (
                  <>
                    <ListImg src={map} empty />
                  </>
                ) : (
                  <Link
                    to={`/showroute/${window.localStorage.key(
                      window.localStorage.length - 1
                    )}`}
                    style={{ textDecoration: "none" }}
                  >
                    {route !== null ? (
                      <ListImg
                        src={
                          "https://jisoobucket.s3.ap-northeast-2.amazonaws.com/" +
                          route[0][0][0] +
                          ".jpeg"
                        }
                      />
                    ) : null}
                    <ListName>
                      {window.localStorage.key(window.localStorage.length - 1)}
                    </ListName>
                  </Link>
                )}
              </LeftContainer>
              {/* 오른쪽 그리드 */}
              <RightContainer>
                {/* 날짜 선택 */}
                {route !== null ? (
                  <DayToggle>
                    {Array.from({ length: route?.length }).map((_, index) => (
                      <Day
                        key={index}
                        num={index + 1}
                        onClick={() => handleDay(index + 1)}
                        isSelected={selectedDay === index + 1}
                      />
                    ))}
                  </DayToggle>
                ) : (
                  <DayToggle>
                    <Day num={1} onClick={() => handleDay(1)} />
                  </DayToggle>
                )}
                <TotalBox>
                  <RouteBox>
                    {/* 루트 보여주기 */}
                    {route !== null ? (
                      <RouteList>
                        {route[selectedDay - 1].map((place, index) => (
                          <RouteFactor>
                            <Number content={index + 1} main></Number>
                            <PlaceInfo
                              main
                              content={""}
                              name={place[0]}
                              src={
                                "https://jisoobucket.s3.ap-northeast-2.amazonaws.com/" +
                                place[0] +
                                ".jpeg"
                              }
                            />
                          </RouteFactor>
                        ))}
                      </RouteList>
                    ) : (
                      <RouteList>
                        <RouteFactor>
                          <Number content={1} empty></Number>
                          <PlaceInfo main content={""} src={empty} />
                        </RouteFactor>
                        <RouteFactor>
                          <Number content={2} empty></Number>
                          <PlaceInfo main content={""} src={empty} />
                        </RouteFactor>
                      </RouteList>
                    )}
                  </RouteBox>
                </TotalBox>
              </RightContainer>
            </MainGrid>
          </MainContainer>
          {/* 새로운 여행 만들기 */}
          <CreateButton>
            <Link to="/SelectPlace" style={{ textDecoration: "none" }}>
              <ButtonContent>새로운 여행 만들기</ButtonContent>
            </Link>
          </CreateButton>
          {/* 많이 찾는 여행지 */}
          <PopularContent>
            <MdCardTravel />
            추천 여행지
          </PopularContent>
          <PopularContainer>
            <PopularGrid>
              {arr.map((data) => (
                <PopularBox>
                  <GridImg
                    src={
                      "https://jisoobucket.s3.ap-northeast-2.amazonaws.com/" +
                      data["중심관광지명"] +
                      ".jpeg"
                    }
                    onClick={() => handleShowDetail(data)}
                  ></GridImg>
                  <PopularName>{data["중심관광지명"]}</PopularName>
                </PopularBox>
              ))}
            </PopularGrid>
            {isClicked ? (
              <DetailContainer isClicked>
                <DetailBox>
                  <CloseButton src={removeWhite} onClick={CloseDetail} />
                  <DetailImg
                    src={
                      "https://jisoobucket.s3.ap-northeast-2.amazonaws.com/" +
                      selectedPlace["중심관광지명"] +
                      ".jpeg"
                    }
                  />
                  <DetailContent>
                    <DetailPlaceName>
                      {selectedPlace["중심관광지명"]}
                    </DetailPlaceName>
                    <DetailAddress>{selectedPlace["주소"]}</DetailAddress>
                    <DetailDescription>
                      {selectedPlace["설명"]}
                    </DetailDescription>
                  </DetailContent>
                </DetailBox>
              </DetailContainer>
            ) : null}
          </PopularContainer>
        </f.Totalframe>
      </ThemeProvider>
    </div>
  );
}

export default Main;
