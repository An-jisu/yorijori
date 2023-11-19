import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as f from "../components/CommonStyle";
import styled from "styled-components";
import Header from "../components/Header";
import { ThemeProvider } from "styled-components";
import theme from "../Theme";
// 이미지
import mylist from "../assets/img/mylist.png";

const ListContainer = styled.div`
  padding: 40px 150px;
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const ListContent = styled.div`
  color: #000;
  font-family: "Cafe24Ssurround-v2.0";
  font-size: 30px;
  font-weight: 700;
  line-height: normal;
`;

const ListGrid = styled.div`
  display: grid;
  grid-template: repeat(2, 1fr) / repeat(2, 1fr);
  gap: 70px;
`;

const ListBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ListImg = styled.img`
  width: 400px;
  height: 270px;
  border-radius: 10px;
  flex-shrink: 0;
`;

const ListName = styled.div`
  padding: 10px 0 0 20px;
  color: #000;
  font-size: 20px;
  font-weight: 700;
  line-height: normal;
`;

const EmptyContainer = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  justify-content: center;
  align-items: center;
`;
const EmptyContent = styled.div`
  font-size: 20px;
`;

function MyList() {
  const navigate = useNavigate();
  const [nameList, setNameList] = useState([]);

  useEffect(() => {
    const list = [];

    for (let i = 0; i < window.localStorage.length; i++) {
      list.push(window.localStorage.key(i));
    }
    setNameList(list);
  }, []);

  useEffect(() => {
    console.log(nameList);
  }, [nameList]);

  const handleHeader = () => {
    navigate("/");
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <f.Totalframe>
          <Header onClick={handleHeader} />
          {/* 나의 여행 리스트 */}
          <ListContainer>
            <ListContent>나의 여행 리스트</ListContent>
            {window.localStorage.length !== 0 ? (
              <ListGrid>
                {nameList.map((key) => (
                  <Link
                    to={`/showroute/${key}`}
                    style={{ textDecoration: "none" }}
                  >
                    <ListBox>
                      <ListImg
                        src={
                          "https://jisoobucket.s3.ap-northeast-2.amazonaws.com/" +
                          JSON.parse(localStorage.getItem(key))[0][0][0] +
                          ".jpeg"
                        }
                      ></ListImg>
                      <ListName>{key}</ListName>
                    </ListBox>
                  </Link>
                ))}
              </ListGrid>
            ) : (
              <EmptyContainer>
                <ListImg src={mylist} />
                <EmptyContent>제주 여행을 계획해보세요!</EmptyContent>
              </EmptyContainer>
            )}
          </ListContainer>
        </f.Totalframe>
      </ThemeProvider>
    </div>
  );
}

export default MyList;
