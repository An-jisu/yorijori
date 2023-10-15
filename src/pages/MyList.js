import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as f from '../components/CommonStyle';
import styled from 'styled-components';
import Header from '../components/Header'

// 이미지
import sample from "../assets/sample.png";

const ListContainer = styled.div`
  padding: 40px 150px;
  display: flex;
  flex-direction: column;
  gap: 50px;
`

const ListContent = styled.div`
  color: #000;
  font-family: Roboto;
  font-size: 30px;
  font-weight: 700;
  line-height: normal;
`

const ListGrid = styled.div`
  display: grid;
  grid-template: repeat(10, 1fr)/repeat(2, 1fr);
  gap: 70px;
`

const ListBox = styled.div`
  display: flex;
  flex-direction: column;
  gap:8px;
`

const ListImg = styled.img`
  width: 100%;
  height: 290px;
  border-radius:10px;
  flex-shrink: 0;
`

const ListName = styled.div`
  padding: 10px 0 0 20px;
  color: #000;
  font-family: Roboto;
  font-size: 20px;
  font-weight: 700;
  line-height: normal;
`

function MyList() {
  const navigate = useNavigate();
  const [nameList, setNameList] = useState([]);

  useEffect(() => {
    const list = [];

    for (let i = 0; i < window.localStorage.length; i++) {
      list.push(window.localStorage.key(i))
    }
    setNameList(list);
  }, [])

  useEffect(() => {
    console.log(nameList);
  }, [nameList])

  return (
    <div>
      <f.Totalframe>
        <Link to="/">
          <Header />
        </Link>
        {/* 나의 여행 리스트 */}
        <ListContainer>
          <ListContent>나의 여행 리스트</ListContent>
          <ListGrid>
            {nameList.map((key) => (
              <Link to={`/showroute/${key}`} style={{ textDecoration: 'none' }}>
                <ListBox>
                  <ListImg src={"https://seumu-s3-bucket.s3.ap-northeast-2.amazonaws.com/" + JSON.parse(localStorage.getItem(key))[0][0][0] + '.jpeg'}></ListImg>
                  <ListName>{key}</ListName>
                </ListBox>
              </Link>

            ))}
            {/* <ListBox>
              <ListImg src={sample}></ListImg>
              <ListName>제주1</ListName>
            </ListBox>
            <ListBox>
              <ListImg src={sample}></ListImg>
              <ListName>제주2</ListName>
            </ListBox>
            <ListBox>
              <ListImg src={sample}></ListImg>
              <ListName>제주3</ListName>
            </ListBox>
            <ListBox>
              <ListImg src={sample}></ListImg>
              <ListName>제주4</ListName>
            </ListBox>
            <ListBox>
              <ListImg src={sample}></ListImg>
              <ListName>제주5</ListName>
            </ListBox> */}
          </ListGrid>
        </ListContainer>
      </f.Totalframe>
    </div>
  );
}

export default MyList;