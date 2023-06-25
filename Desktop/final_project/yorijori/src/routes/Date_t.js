import React from 'react';
import styled from 'styled-components';

const StyledDateWrapper = styled.div`
  background-color: orange;
  padding: 0 150px;
`;

const StyledDateText = styled.p`
  text-align: left;
`;

function Date_t({ startDate, endDate }) {
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  return (
    <StyledDateWrapper>
      <StyledDateText>{formatDate(startDate)} ~ {formatDate(endDate)}</StyledDateText>
    </StyledDateWrapper>
  );
}

export default Date_t;
