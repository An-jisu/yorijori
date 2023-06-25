import React, { useState } from 'react';
import styled from 'styled-components';
import { MapContainer, TileLayer, Polygon } from 'react-leaflet';
import Date_t from './Date_t';

const Container = styled.div`
  margin: 0 150px;
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

  return (
    <Container>
      <Date_t startDate={startDate} endDate={endDate} />
      <MapContainer
        center={[35.540, 127.955]} // 전라도 지도의 중심 좌표
        zoom={8} // 초기 줌 레벨
        style={{ height: '400px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // 타일 레이어 URL
          attribution="Map data © OpenStreetMap contributors" // 속성 정보
        />
        <Polygon
          positions={[[35.122, 126.846], [35.065, 129.316], [34.934, 129.265]]} // 전라도 지역 경계 좌표
          eventHandlers={{
            click: () => handleRegionSelect('전라도'),
          }}
          pathOptions={{
            color: selectedRegions.includes('전라도') ? 'red' : 'blue',
          }}
        />
        {/* 다른 지역에 대한 Polygon 컴포넌트 추가 */}
      </MapContainer>
      <div>
        <h3>선택된 지역: {selectedRegions.join(', ')}</h3>
      </div>
    </Container>
  );
}

export default Choose_area;
