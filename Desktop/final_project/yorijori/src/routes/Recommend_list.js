import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const StyledRecommendList = styled.div`
  margin-top: 30px;
  margin: 0 150px;
`;

const Title = styled.h2`
  text-align: left;
  margin-bottom: 20px;
`;

const Slider = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  margin-bottom: 20px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const SlideItem = styled.div`
  flex: 0 0 auto;
  margin-right: 20px;
  scroll-snap-align: start;
`;

const DestinationImage = styled.img`
  width: 300px;
  height: 200px;
  object-fit: cover;
`;

const DestinationName = styled.h3`
  margin-top: 10px;
`;

function RecommendList() {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get('http://apis.data.go.kr/3330000/HeaundaeTourAttrInfoService/getTourAttrList', {
          params: {
            ServiceKey: 'YOUR_API_KEY',
            numOfRows: 5, // 가져올 여행지 개수 설정
            pageNo: 1, // 페이지 번호 설정
            MobileOS: 'ETC',
            MobileApp: 'AppTest',
            arrange: 'A',
          },
        });

        const data = response.data.response.body.items.item;
        setDestinations(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDestinations();
  }, []);

  return (
    <StyledRecommendList>
      <Title>여행지 추천</Title>
      <Slider>
        {destinations.map((destination) => (
          <SlideItem key={destination.trrsrtNm}>
            <DestinationImage src={destination.file_url} alt={destination.trrsrtNm} />
            <DestinationName>{destination.trrsrtNm}</DestinationName>
          </SlideItem>
        ))}
      </Slider>
    </StyledRecommendList>
  );
}

export default RecommendList;
