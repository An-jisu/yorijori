import {useEffect, useState} from 'react';
import {Link, Navigate, useNavigate, useParams} from 'react-router-dom';
import { Map, MapMarker, Polyline} from "react-kakao-maps-sdk";
import * as f from '../components/CommonStyle';
import styled from 'styled-components';
import Header from '../components/Header';
import BigDay from '../components/BigDay';
import Number from '../components/Number';
import PlaceInfo from '../components/PlaceInfo';

// 이미지
import sample from "../assets/sample.png";
import add from "../assets/add.svg";
import remove from "../assets/remove.svg";

const MapContainer=styled.div`
    margin-bottom: 40px;
    width: 100%;
    height: 70vh;
    font-size: 100px;
`
const RouteContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 40px;
    margin-bottom: 50px;
`

const RouteBox=styled.div`
    max-height: 90vh; 
    overflow-y: auto; 
    width: 75%;
    display: flex;
    flex-direction: column;
    gap: 20px;
`

const DayToggle=styled.div`
    display: flex;
    gap:0;
`

const BasketContainer=styled.div`
    max-height: 90vh; 
    display: flex;
    flex-direction: column;
    gap: 25px;
`

const BasketContent=styled.div`
    color: #000;
    font-family: Roboto;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`

const BasketBox=styled.div`
    overflow-y: auto; 
    width: 200px;
    height: 600px;
    background: rgba(255, 220, 178, 0.25);
`
const OneBasket=styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 10px;
    gap: 20px;
    position: relative;
`
const RemoveIcon=styled.img`
    position: absolute;
    top: 27px;
    right: 17px;
    width: 20px;
    height: 20px;
`

const BasketList=styled.img`
    width: 100%;
    border-radius: 10px;
`


const RouteList=styled.div`
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`

const CreateButton=styled.div`
    width: 10%;
    height: 40px;
    flex-shrink: 0;
    margin: 10px auto;
    background: #F8EFA0;
    border-radius: 5px;
    margin-bottom: 20px;
`

const ButtonContent=styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #000;
    text-align: center;
    font-family: Roboto;
    font-size: 20px;
    font-weight: 700;
    line-height: normal;
`
const RouteFactor=styled.div`
    display: flex;
    gap: 15px;
`

const Container=styled.div`
    width: 80%;
    height: 100%;
    position: absolute;
    top: 0;
    background-color: ${(props)=> props.isClicked? 'rgba(255, 255, 255, 0.5)':null};
    z-index:2;
`

const Box=styled.div`
    width: 600px;
    height: 320px;
    background: #FFDCB2;
    margin: 0 auto;
    border-radius: 8px;
    z-index: 1;
    position: absolute;
    top: 280px;
    left: 280px;
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items: center;
    gap: 10px;
`

const Content=styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const DetailTitle=styled.div`
    margin: 40px;
    color: #000;
    font-family: Inter;
    font-size: 35px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px; /* 48% */
`
const ButtonContainer=styled.div`
    display: flex;
    gap: 10px;
`
const Label=styled.div`
    color: #000;
    font-family: Inter;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px; 
    margin-bottom: 10px;

`

const Button=styled.div`
    width: 120px;
    height: 50px;
    background: #F8EFA0;
    border-radius: 10px;
    font-size: 17px;
    font-style: normal;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`

function ShowRoute() {
    const [selectedDay, setSelectedDay] = useState(1);
    const [route, setRoute] = useState(null);
    const [size, setSize] = useState(0);
    const [isClicked, setIsClicked]= useState(false);
    const navigate = useNavigate();
    const {key} = useParams();
    const [loc, setLoc] = useState(null);
    const handleDay = (props) =>{
        setSelectedDay(props);
    }

    const handleClick= () => {
        setIsClicked(true);
    };

    const handleButtonCheck=()=>{
        navigate('/mylist');
    };

    const handleButtonInitial=()=>{
        navigate('/');
    };

    useEffect(()=>{
        if(route === null) {
            return;
        }

        setSize(route?.length);
        console.log(route);
        // console.log(localStorage.length);
        setLoc(route?.map(arr => arr.map(item => ({ lat: item[1], lng: item[2] }))));
    }, [route])

    useEffect(()=>{
        if(key === undefined) {
            return;
        }

        setRoute(JSON.parse(window.localStorage.getItem(key)));
        //console.log(route);
        //console.log(JSON.parse(window.localStorage.getItem(window.localStorage.key(0))));
    }, [key])

  return (
    <div>
      <f.Totalframe>
        <Link to="/">
            <Header />
        </Link>
        <f.Screen>
            {isClicked? (
                <Container isClicked>
                    <Box>
                        <Content>
                            <DetailTitle>여행 일정이 생성되었다.</DetailTitle>
                            <Label>나의 여행 리스트로 이동하시겠습니까?</Label>
                        </Content>
                        <ButtonContainer>
                            <Button onClick={handleButtonCheck}>확인</Button>
                            <Button onClick={handleButtonInitial}>첫 페이지로</Button>
                        </ButtonContainer>
                    </Box>
                </Container>)
            :null}
            {/* 지도 */}
            <MapContainer>
                <Map
                    style={{ width: "100%", height: "500px" }}
                    center={{ lat: 33.5261, lng: 126.5434 }}
                    level={9}
                >
                    {route?.map((day, index)=> (
                        index+1===selectedDay?
                        day?.map((data, idx) => (
                            <MapMarker
                                position={{ lat: data[1], lng: data[2] }}
                                title={data[0]}
                                image={{
                                    src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png", // 마커이미지의 주소입니다
                                    size: {
                                        width: 36,
                                        height: 37               
                                    }, // 마커이미지의 크기입니다
                                    options: {
                                        spriteOrigin: {
                                            x: 0,
                                            y: (idx * 46) + 10
                                        },
                                        spriteSize: {
                                            width: 36,
                                            height: 691
                                        }
                                    }
                                }}
                            >
                            </MapMarker>
                        )):null
                    ))}
                    {loc !== null ? (
                        <Polyline
                            path={[loc[selectedDay - 1]]}
                            strokeWeight={5}
                            strokeColor={"red"}
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
                        />
                    ))}
                </DayToggle>
                <RouteBox>
                    {/* 루트 보여주기 */}
                    {route !== null ? <RouteList>
                        {route[selectedDay-1]?.map((place, index)=> (
                            <RouteFactor>
                                <Number content={index+1}></Number>
                                <PlaceInfo content={"룰라랄라"} name={place[0]} src={"https://seumu-s3-bucket.s3.ap-northeast-2.amazonaws.com/"+place[0]+'.jpeg'}/>
                            </RouteFactor>
                        ))}
                    </RouteList>: null}
                </RouteBox>

                {/* 루트 담기 */}
                {/* <BasketContainer>
                    <BasketContent>선택한 여행 일정</BasketContent>
                    <BasketBox>
                        <OneBasket>
                            <BasketList src={sample} />
                            <RemoveIcon src={remove}/>
                        </OneBasket>
                        <OneBasket>
                            <BasketList src={sample} />
                            <RemoveIcon src={remove}/>
                        </OneBasket>
                        <OneBasket>
                            <BasketList src={sample} />
                            <RemoveIcon src={remove} />
                        </OneBasket>
                        <OneBasket>
                            <BasketList src={sample} />
                            <RemoveIcon src={remove} />
                        </OneBasket>
                    </BasketBox>
                </BasketContainer> */}
            </RouteContainer>
            <CreateButton>
                <ButtonContent onClick={handleClick}>완료</ButtonContent>
            </CreateButton>
        </f.Screen>
      </f.Totalframe>
    </div>
  );
}

export default ShowRoute;