import {Link} from 'react-router-dom';
import * as f from '../components/CommonStyle';
import styled from 'styled-components';
import Header from '../components/Header'

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
const SelectContainer = styled.div`
    display: flex;
    gap: 40px;
    margin-bottom: 50px;
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
    right: 10px;
    width: 20px;
    height: 20px;
`

const Img=styled.img`
    width: 100%;
    height: 100%;
    border-radius: 10px;
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

function SelectPlace() {
  return (
    <div>
      <f.Totalframe>
        <Link to="/">
            <Header />
        </Link>
        <f.Screen>
            {/* 지도 */}
            <MapContainer>지도</MapContainer>
            {/* 여행지 선택 */}
            <SelectContainer>
                {/* 여행지 목록 */}
                <ListPlace>
                    <ListBox>
                        <Img src={sample}></Img>
                        <AddIcon src={add} />
                        <Name>제주1</Name>
                    </ListBox>
                    <ListBox>
                        <Img src={sample}></Img>
                        <AddIcon src={add} />
                        <Name>제주2</Name>
                    </ListBox>
                    <ListBox>
                        <Img src={sample}></Img>
                        <AddIcon src={add} />
                        <Name>제주3</Name>
                    </ListBox>
                    <ListBox>
                        <Img src={sample}></Img>
                        <AddIcon src={add} />
                        <Name>제주4</Name>
                    </ListBox>
                    <ListBox>
                        <Img src={sample}></Img>
                        <AddIcon src={add} />
                        <Name>제주4</Name>
                    </ListBox>
                    <ListBox>
                        <Img src={sample}></Img>
                        <AddIcon src={add} />
                        <Name>제주4</Name>
                    </ListBox>
                    <ListBox>
                        <Img src={sample}></Img>
                        <AddIcon src={add} />
                        <Name>제주4</Name>
                    </ListBox>
                    <ListBox>
                        <Img src={sample}></Img>
                        <AddIcon src={add} />
                        <Name>제주4</Name>
                    </ListBox>
                    <ListBox>
                        <Img src={sample}></Img>
                        <AddIcon src={add} />
                        <Name>제주4</Name>
                    </ListBox>
                    <ListBox>
                        <Img src={sample}></Img>
                        <AddIcon src={add} />
                        <Name>제주4</Name>
                    </ListBox>
                    <ListBox>
                        <Img src={sample}></Img>
                        <AddIcon src={add} />
                        <Name>제주4</Name>
                    </ListBox>
                </ListPlace>
                {/* 여행지 담기 */}
                <BasketContainer>
                    <BasketContent>장바구니 목록</BasketContent>
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
            </SelectContainer>
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

export default SelectPlace;