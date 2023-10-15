import {useState} from 'react';
import axios from 'axios';
import tourists from '../JeJuTourList';
import {Link, useNavigate} from 'react-router-dom';
import { Map, MapMarker, Polyline} from "react-kakao-maps-sdk";
import * as f from '../components/CommonStyle';
import styled from 'styled-components';
import Header from '../components/Header'
//import {localStorage} from window;

// 이미지
import sample from "../assets/sample.png";
import add from "../assets/add.svg";
import remove from "../assets/remove.svg";
import removeWhite from "../assets/removeWhite.svg";

const MapContainer=styled.div`
    margin-bottom: 40px;
    width: 100%;
    height: 70vh;
    font-size: 100px;
`
const SelectContainer = styled.div`
    display: flex;
    gap: 40px;
    margin-bottom: 50px;
    position: relative;
`

const ListPlace=styled.div`
    width: 75%;
    max-height: 90vh; 
    overflow-y: auto; 
    display: grid;
    grid-template: repeat(3, 1fr)/repeat(3,1fr);
    gap: 30px 20px;
`

const ListBox=styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
`
const AddIcon=styled.img`
    position: absolute;
    top: 10px;
    right: 40px;
    width: 20px;
    height: 20px;
`

const Img=styled.img`
    width: 230px;
    height: 150px;
    border-radius: 10px;
    object-fit: cover;
`

const Name=styled.div`
    width: 120px;
    height: 30px;
    border-bottom-left-radius: 10px; 
    border-bottom-right-radius: 10px;
    padding-top: 5px;
    padding-left: 10px;
    color: #000;
    font-family: Roboto;
    font-size: 15px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
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
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 10px;
    gap: 10px;
    position: relative;
`
const RemoveIcon=styled.img`
    position: absolute;
    top: 20px;
    right: 21px;
    width: 20px;
    height: 20px;
`

const BasketList=styled.img`
    width: 170px;
    height: 120px;
    border-radius: 10px;
`

const BasketName=styled.div`
    color: #000;
    font-family: Roboto;
    font-size: 13px;
    font-weight: 300;
    line-height: normal;
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
const DetailContainer=styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    background-color: ${(props)=> props.isClicked? 'rgba(20, 20, 20, 0.8)':null};
`

const DetailBox=styled.div`
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
`

const DetailContent=styled.div`
    background-color: #F5F5F5;
    padding: 30px;
    border-radius: 8px;
`
const DetailImg = styled.img`
    border-radius: 8px;
    width: 330px;
    height: 230px;
    object-fit: cover;
`
const DetailPlaceName=styled.div`
    color: #000;
    font-family: Roboto;
    font-size: 27px;
    font-weight: 700;
    line-height: normal;
    margin: 0;
    padding:0
`

const DetailDescription=styled.div`
    padding: 10px 0 0 10px;
    color: #000;
    font-family: Roboto;
    font-size: 16px;
    font-weight: 400;
    line-height: 25px;
    height: 150px;
    overflow-y: auto;
`
const CloseButton=styled.img`
    display: flex;
    justify-content: flex-start;
    width: 30px;
    height: 30px;
    color: white;
`
const Container=styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    background-color: ${(props)=> props.isClicked? 'rgba(255, 255, 255, 0.8)':null};
    z-index:1;
`

const Box=styled.div`
    width: 600px;
    height: 320px;
    background: #FFDCB2;
    margin: 0 auto;
    border-radius: 8px;
    z-index: 1;
    position: absolute;
    top: 160px;
    left: 280px;
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items: center;
    gap: 12px;
`

const Content=styled.div`
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items:center;
    white-space: pre-line;
`
const DetailTitle=styled.div`
    margin: 0 auto;
    margin-bottom: 40px;
    color: #000;
    font-family: Inter;
    font-size: 35px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px; /* 48% */
`
const Label=styled.div`
    color: #000;
    font-family: Inter;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px; 
    margin-bottom: 10px;

`
const GetNameForm=styled.input`
    padding-left: 10px;
    border: none;
    width: 400px;
    height: 50px;
    border-radius: 8px;
    font-size: 18px;
    flex-shrink: 0;
    &:focus{
        outline: none;
        border: 1px solid;
    }
    cursor: pointer;
`

const ButtonContainer=styled.div`
    display: flex;
    gap: 10px;
`

const Button=styled.div`
    width: 80px;
    height: 40px;
    background: #F8EFA0;
    border-radius: 10px;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`
const ContainerList=styled.div`
    border: 1px solid black;
    padding: 20px;
    width: 300px;    
    height: 150px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    white-space: pre;
    overflow-y: auto;
`

const PlaceName=styled.div`
    &:hover{
        color: red;
    }
    text-decoration: underline;
    word-break: break-all; /* 단어 단위로 줄바꿈 */
    white-space: pre; /* 공백 처리 */
    width: 100px;
    height: 30px;
    font-family: Inter;
    font-size: 17px;
    font-style: normal;
    font-weight: 700;
`

function SelectPlace() {
    const [selectedPlaces, setSelectedPlaces] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState([]);
    const [isClicked, setIsClicked] = useState(false); // 클릭했는 지 아닌 지
    const [selectedPlace, setSelectedPlace]=useState(null);
    const [isName, setIsName] = useState(true);
    const [name, setName] = useState('');
    const [position, setPosition] = useState({ lat: 33.5261, lng: 126.5434 });
    const [isGetStart, setIsGetStart] = useState(false);
    const [start, setStart] = useState([]);
    const navigate = useNavigate();
    // const data = [[126.8634,  33.5235],
    // [126.9341,  33.4729],
    // [126.751 ,  33.5583],
    // [126.9281,  33.4305],
    // [126.4925,  33.49  ],
    // [126.7786,  33.4027],
    // [126.6485,  33.415 ],
    // [126.4908,  33.4855],
    // [126.7532,  33.4137],
    // [126.5231,  33.5181],
    // [126.3721,  33.4107],
    // [126.4287,  33.4924],
    // [126.5279,  33.2919],
    // [126.3232,  33.4673],
    // [126.491 ,  33.4934],
    // [126.801 ,  33.4879],
    // [126.5591,  33.2382],
    // [126.1625,  33.2948],
    // [126.6166,  33.5367],
    // [126.3697,  33.2897]];

    const handleClick = () => {
        setIsGetStart(true);
    }

    const handlePopup=()=>{
        setIsName(false);
    };

    const handleInput = (e)=> {
        setName(e.target.value);
    };

    const handleStartPoint=() =>{
        async function fetch() {
            try {
                const res = await axios.post("http://localhost:5000/recommend", { 
                    selectedLocation, start
                });
                window.localStorage.setItem(name, JSON.stringify(res.data));
                console.log(res);
                navigate(`/showroute/${name}`);
            } catch (e) {
                console.log(e);
            }
        }

        fetch();
        console.log(start);
    };

    const handleBasket= (props) =>{
        setPosition({lat: props['위도'], lng: props['경도']});
        setSelectedPlace(props);
        // 선택된 관광지 리스트 업데이트
        const nowPlace = props;
        const updatedPlace = [...selectedPlaces, nowPlace];
        setSelectedPlaces(updatedPlace); // 한 템포씩 느리게 업데이트
        // 경도, 위도 배열 업데이트
        const updatedLocation = [...selectedLocation, [nowPlace['중심관광지명'], nowPlace['위도'], nowPlace['경도']]];
        setSelectedLocation(updatedLocation);
        console.log(selectedLocation);
    }

    const handleRemove = (props) => {
        // selectedPlaces에서 제거
        const updatedPlace = [...selectedPlaces].filter((data)=>props['중심관광지명']!==data['중심관광지명']);
        // selectedLocation에서 제거
        const updatedLocation = [...selectedLocation].filter((data)=> (props['위도']!==data[1]&&props['경도']!==data[2]));
        setSelectedPlaces(updatedPlace);
        setSelectedLocation(updatedLocation);
    }

    const handleShowDetail = (props) => {
        setSelectedPlace(props);
        setIsClicked(true);
        setPosition({lat: props['위도'], lng: props['경도']});
    }

    const CloseDetail=()=>{
        setIsClicked(false);
    }

    // // arr 배열 axios 통신 (ex-arr=[[경도1, 위도1],[경도2, 위도2]])
    // const sendPlacesList = () =>{
    //     async function fetchData() {
    //         try {
    //             axios.defaults.withCredentials=true;
    //             const res = await axios.post("http://localhost:5000/",
    //                 {
    //                     // updatedLocation 배열 값 전달
    //                 },
    //             );
    //             if (res.data === 'success') {
                    
    //             }
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     }
    //     fetchData();
    // }

  return (
    <div>
      <f.Totalframe>
        <Link to="/">
            <Header />
        </Link>
        <f.Screen>
            {/* 지도 */}
            <MapContainer>
                <Map
                    style={{ width: "100%", height: "500px" }}
                    center={position}
                    level={4}
                >
                    {selectedPlace!==null?
                    <MapMarker 
                    position={{ lat: selectedPlace['위도'], lng: selectedPlace['경도'] }}
                    title={selectedPlace['중심관광지명']}
                >
                </MapMarker>:null}
                </Map>
            </MapContainer>
            {/* 여행지 선택 */}
            <SelectContainer>
                {isName? (
                    <Container isClicked>
                        <Box>
                            <Content>
                                <DetailTitle>여행 추가하기</DetailTitle>
                                <Label>여행 이름</Label>
                                <GetNameForm value = {name} onChange={handleInput}></GetNameForm>
                            </Content>
                            <ButtonContainer>
                                <Button onClick={handlePopup}>확인</Button>
                            </ButtonContainer>
                        </Box>
                    </Container>)
                    :null}
                    {/* 출발지 입력받는 모달 */}
                {isGetStart? (
                    <Container isClicked>
                        <Box>
                            <Content>
                                <Label>출발지를 입력해주세요.</Label>
                                <ContainerList>
                                {selectedPlaces.map((data) => (
                                    <PlaceName onClick={()=>setStart([data['중심관광지명'], data['위도'], data['경도']])}>{data['중심관광지명']}</PlaceName>
                                ))}
                                </ContainerList>
                            </Content>
                            <ButtonContainer>
                                <Button onClick={handleStartPoint}>확인</Button>
                            </ButtonContainer>
                        </Box>
                    </Container>)
                :null}
                {/* 여행지 목록 */}
                <ListPlace>
                    {tourists.map((data)=> (
                        <ListBox>
                            <Img src={"https://seumu-s3-bucket.s3.ap-northeast-2.amazonaws.com/"+data['중심관광지명']+'.jpeg'} onClick={()=>handleShowDetail(data)}></Img>
                            <AddIcon src={add} onClick={()=> handleBasket(data)}/>
                            <Name>{data['중심관광지명']}</Name>
                        </ListBox>
                    ))}
                </ListPlace>
                {/* 여행지 담기 */} 
                <BasketContainer>
                    <BasketContent>장바구니 목록</BasketContent>
                    <BasketBox>
                    {selectedPlaces?.slice().reverse().map((data)=>(
                        <OneBasket>
                            <BasketList src={"https://seumu-s3-bucket.s3.ap-northeast-2.amazonaws.com/"+data['중심관광지명']+'.jpeg'} />
                            <BasketName>{data['중심관광지명']} </BasketName>
                            <RemoveIcon src={removeWhite} onClick={()=> handleRemove(data)}/>
                        </OneBasket>
                    ))}
                    </BasketBox>
                </BasketContainer>
                {isClicked? (<DetailContainer isClicked>
                        <DetailBox>
                            <CloseButton src={removeWhite} onClick={CloseDetail}/>
                            <DetailImg src={"https://seumu-s3-bucket.s3.ap-northeast-2.amazonaws.com/"+selectedPlace['중심관광지명']+'.jpeg'}/>
                            <DetailContent>
                                <DetailPlaceName>{selectedPlace['중심관광지명']}</DetailPlaceName>
                                <DetailDescription>{selectedPlace['설명']}</DetailDescription>
                            </DetailContent>
                        </DetailBox>
                    </DetailContainer>)
                    :null
                }
            </SelectContainer>
            <CreateButton>
                <ButtonContent onClick={handleClick}>완료</ButtonContent>
                {/* onClick={sendPlacesList} */}
            </CreateButton>
        </f.Screen>
      </f.Totalframe>
    </div>
  );
}

export default SelectPlace;