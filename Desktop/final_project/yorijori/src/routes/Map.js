import React from 'react';
import styled from 'styled-components';

const StyledMap = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px;
`;

const Region = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  margin: 10px;
  border: 2px solid black;
  cursor: pointer;
  background-color: ${({ selected }) => (selected ? 'green' : 'transparent')};
  color: ${({ selected }) => (selected ? 'white' : 'black')};
`;

function Map({ selectedRegions, onRegionSelect }) {
  const regions = ['전주', '익산', '군산', '정읍', '남원', '김제', '완주', '진안', '무주', '장수', '임실', '순창', '고창', '부안', '목포', '여수', '순천', '나주', '광양', '담양', '곡성', '구례', '고흥', '보성', '화순', '장흥', '강진', '해남', '영암', '무안', '함평', '영광', '장성', '완도', '진도', '신안']; // 전체 전라도 지역 목록을 포함하도록 업데이트

  const handleRegionClick = (region) => {
    onRegionSelect(region);
  };

  return (
    <StyledMap>
      {regions.map((region) => (
        <Region
          key={region}
          selected={selectedRegions.includes(region)}
          onClick={() => handleRegionClick(region)}
        >
          {region}
        </Region>
      ))}
    </StyledMap>
  );
}

export default Map;
