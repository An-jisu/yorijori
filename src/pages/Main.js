import {useState} from 'react';
import {Link} from 'react-router-dom';
import * as f from '../components/CommonStyle';
import styled from 'styled-components';
import Header from '../components/Header';
import Day from '../components/Day';

// 이미지
import sample from "../assets/sample.png";
import unfillheart from "../assets/heartUnfill.svg";

const MainContainer=styled.div`
    width: 100%;
    height: 350px;
    flex-shrink: 0;
    background-color: #FFDCB2;
    padding: 30px 120px;
`
const MainGrid=styled.div`
    display: grid;
    grid-template: 80%/ 1.5fr 2fr; 
`

const Grid=styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
`
const MyListText=styled.div`
    color: #000;
    font-family: Roboto;
    font-size: 30px;
    font-weight: 700;
    line-height: normal;
`

const ListImg=styled.img`
    width: 70%;
    height: 85%;
    border-radius:10px;
    flex-shrink: 0;
`

const ListName=styled.div`
    padding-left: 20px;
    color: #000;
    font-family: Roboto;
    font-size: 20px;
    font-weight: 700;
    line-height: normal;
`
const DayToggle=styled.div`
    display: flex;
    gap:0;
`

const CreateButton=styled.div`
    width: 50%;
    height: 80px;
    flex-shrink: 0;
    margin: 10px auto;
    background: #F8EFA0;
    border-radius: 10px;
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
    font-size: 25px;
    font-weight: 700;
    line-height: normal;
`

const PopularContainer=styled.div`
    margin-top: 40px;
    padding: 40px 60px;
    display: flex;
    flex-direction: column;
    gap: 50px;
`

const PopularContent=styled.div`
    color: #000;
    font-family: Roboto;
    font-size: 30px;
    font-weight: 700;
    line-height: normal;
`

const PopularGrid=styled.div`
    display: grid;
    grid-template: repeat(4,1fr)/repeat(2,1fr);
    gap: 70px 100px;
`

const PopularBox=styled.div`
    display: flex;
    flex-direction: column;
    gap:8px;
    position: relative;
`

const Heart=styled.img`
    width: 30px;
    height: 30px;
    position: absolute;
    top: 20px;
    right: 20px;
`

const GridImg=styled.img`
    width: 100%;
    height: 80%;
    border-radius:10px;
    flex-shrink: 0;
`

const PopularName=styled.div`
    padding: 10px 0 0 20px;
    color: #000;
    font-family: Roboto;
    font-size: 30px;
    font-weight: 700;
    line-height: normal;
`

function Main() {
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
            {/* 나의 여행 리스트 */}
            <MainContainer>
                <MainGrid>
                    {/* 왼쪽 그리드 */}
                    <Grid>
                        <Link to="/mylist" style={{ textDecoration: 'none'}}>
                            <MyListText>나의 여행 리스트 ></MyListText>
                        </Link>
                        <ListImg src={sample} />
                        <ListName>제주1</ListName>
                    </Grid>
                    {/* 오른쪽 그리드 */}
                    <Grid>
                        <DayToggle>
                            <Day num={1} onClick={()=>handleDay(1)} isSelected={selectedDay===1}></Day>
                            <Day num={2} onClick={()=>handleDay(2)} isSelected={selectedDay===2}></Day>
                            <Day num={3} onClick={()=>handleDay(3)} isSelected={selectedDay===3}></Day>
                        </DayToggle>
                        <div>dd</div>
                    </Grid>
                </MainGrid>
            </MainContainer>
            {/* 새로운 여행 만들기 */}
            <Link to='/SelectPlace' style={{ textDecoration: 'none'}}>
                <CreateButton>
                    <ButtonContent>새로운 여행 만들기</ButtonContent>
                </CreateButton>
            </Link>
            {/* 많이 찾는 여행지 */}
            <PopularContainer>
                <PopularContent>많이 찾는 여행지</PopularContent>
                <PopularGrid>
                    <PopularBox>
                        <GridImg src={sample}></GridImg>
                        <Heart src={unfillheart}></Heart>
                        <PopularName>제주1</PopularName>
                    </PopularBox>
                    <PopularBox>
                        <GridImg src={sample}></GridImg>
                        <Heart src={unfillheart}></Heart>
                        <PopularName>제주2</PopularName>
                    </PopularBox>
                    <PopularBox>
                        <GridImg src={sample}></GridImg>
                        <Heart src={unfillheart}></Heart>
                        <PopularName>제주3</PopularName>
                    </PopularBox>
                    <PopularBox>
                        <GridImg src={sample}></GridImg>
                        <Heart src={unfillheart}></Heart>
                        <PopularName>제주4</PopularName>
                    </PopularBox>
                    <PopularBox>
                        <GridImg src={sample}></GridImg>
                        <Heart src={unfillheart}></Heart>
                        <PopularName>제주5</PopularName>
                    </PopularBox>
                    <PopularBox>
                        <GridImg src={sample}></GridImg>
                        <Heart src={unfillheart}></Heart>
                        <PopularName>제주6</PopularName>
                    </PopularBox>
                </PopularGrid>
            </PopularContainer>
        </f.Totalframe>
    </div>
  );
}

export default Main;