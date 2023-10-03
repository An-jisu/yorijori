import {useState} from 'react';
import {Link} from 'react-router-dom';
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
    border: 1px solid red;
    font-size: 100px;
`
const RouteContainer = styled.div`
    display: flex;
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

function ShowRoute() {
    const [selectedDay, setSelectedDay] = useState(1);

    const handleDay = (props) =>{
        setSelectedDay(props);
    }

  return (
    <div>
      <f.Totalframe>
        <Link to="/">
            <Header />
        </Link>
        <f.Screen>
            {/* 지도 */}
            <MapContainer>지도</MapContainer>

            <RouteContainer>
                <RouteBox>
                    {/* 날짜 선택 */}
                    <DayToggle>
                        <BigDay num={1} onClick={()=>handleDay(1)} isSelected={selectedDay===1} />
                        <BigDay num={2} onClick={()=>handleDay(2)} isSelected={selectedDay===2} />
                        <BigDay num={3} onClick={()=>handleDay(3)} isSelected={selectedDay===3} />
                    </DayToggle>
                    {/* 루트 보여주기 */}
                    <RouteList>
                        <RouteFactor>
                            <Number content={1}></Number>
                            <PlaceInfo content={'성산일출봉은 어쩌구'} src={sample}/>
                        </RouteFactor>
                        <RouteFactor>
                            <Number content={2}></Number>
                            <PlaceInfo content={'제주어쩌구~ 공항 어쩌구'} src={sample}/>
                        </RouteFactor>
                        <RouteFactor>
                            <Number content={3}></Number>
                            <PlaceInfo content={'제주어쩌구~ 공항 어쩌구'} src={sample}/>
                        </RouteFactor>
                        <RouteFactor>
                            <Number content={4}></Number>
                            <PlaceInfo content={'제주어쩌구~ 공항 어쩌구'} src={sample}/>
                        </RouteFactor>
                        <RouteFactor>
                            <Number content={5}></Number>
                            <PlaceInfo content={'제주어쩌구~ 공항 어쩌구'} src={sample}/>
                        </RouteFactor>
                    </RouteList>
                </RouteBox>

                {/* 루트 담기 */}
                <BasketContainer>
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
                </BasketContainer>
            </RouteContainer>
            <Link to='/ShowRoute' style={{ textDecoration: 'none'}}>
                <CreateButton>
                    <ButtonContent>완료</ButtonContent>
                </CreateButton>
            </Link>
        </f.Screen>
      </f.Totalframe>
    </div>
  );
}

export default ShowRoute;