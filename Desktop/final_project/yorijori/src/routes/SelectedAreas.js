import React from 'react';
import styled from 'styled-components';
import Date_t from './Date_t';

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

function SelectedAreas({ startDate, endDate, selectedRegions }) {
  return (
    <Container>
      <Date_t startDate={startDate} endDate={endDate} />
      <StyledSelectedRegionsWrapper>
        <h3 style={{ textAlign: 'center' }}>선택된 지역:</h3>
        <StyledSelectedRegions>
          {selectedRegions.map((region) => (
            <SelectedRegion key={region}>{region}</SelectedRegion>
          ))}
        </StyledSelectedRegions>
      </StyledSelectedRegionsWrapper>
    </Container>
  );
}

export default SelectedAreas;
