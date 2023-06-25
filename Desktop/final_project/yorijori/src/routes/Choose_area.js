import React, { useState } from 'react';
import styled from 'styled-components';
import Date_t from './Date_t';
import Map from './Map';

const Container = styled.div`
  margin: 0 150px;
`;

const StyledSelectedRegionsWrapper = styled.div`
  margin: 20px;
`;

const StyledSelectedRegions = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 -8px;
`;

const SelectedRegion = styled.span`
  background-color: #ffcc00;
  padding: 4px 8px;
  margin: 0 8px;
`;

const NextButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
`;

function Choose_area(props) {
  const { startDate, endDate } = props;
  const [selectedRegions, setSelectedRegions] = useState([]);

  const handleRegionSelect = (region) => {
    if (selectedRegions.includes(region)) {
      setSelectedRegions(selectedRegions.filter((r) => r !== region));
    } else {
      setSelectedRegions([...selectedRegions, region]);
    }
  };

  const handleNext = () => {
    // 이곳에 다음 버튼 클릭 시 수행할 로직을 작성하세요.
    // 예시로 선택된 지역들을 출력하는 로직을 작성했습니다.
    console.log('선택된 지역:', selectedRegions);
  };

  return (
    <Container>
      <Date_t startDate={startDate} endDate={endDate} />
      <div>
        <h2 style={{ textAlign: 'center', margin: '20px 0' }}>전라도 지도</h2>
        <Map selectedRegions={selectedRegions} onRegionSelect={handleRegionSelect} />
        <StyledSelectedRegionsWrapper>
          <h3 style={{ textAlign: 'center' }}>선택된 지역:</h3>
          <StyledSelectedRegions>
            {selectedRegions.map((region) => (
              <SelectedRegion key={region}>{region}</SelectedRegion>
            ))}
          </StyledSelectedRegions>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <NextButton onClick={handleNext}>다음</NextButton>
          </div>
        </StyledSelectedRegionsWrapper>
      </div>
    </Container>
  );
}

export default Choose_area;
