import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import styled from 'styled-components';

const StyledHeader = styled.header`
  text-align: center;
  background-color: orange;
  margin: 0 150px;
  padding: 50px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 150px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  div {
    background-color: white;
    padding: 10px;
    margin-right: 10px;
  }
`;

const DateRangeWrapper = styled.div`
  position: relative;

  .calendar-wrapper {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1;
    width: 300px;
    max-height: 300px;
    overflow: auto;
  }
`;

const StyledButton = styled.button`
  writing-mode: horizontal-tb;
  text-orientation: upright;
  white-space: nowrap;
`;

function Home_head({ onCreateTrip }) {
  const [destination, setDestination] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [departure, setDeparture] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
  };

  const handleArrivalTimeChange = (e) => {
    setArrivalTime(e.target.value);
  };

  const handleDepartureChange = (e) => {
    setDeparture(e.target.value);
  };

  const handleDepartureTimeChange = (e) => {
    setDepartureTime(e.target.value);
  };

  const handleDateSelect = (ranges) => {
    setDateRange([ranges.selection]);
    setShowCalendar(false);
  };

  const handleCalendarIconClick = () => {
    setShowCalendar(!showCalendar);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateTrip(dateRange[0]);
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  return (
    <StyledHeader>
      <Container>
        <StyledForm onSubmit={handleSubmit}>
          <div>
            <label>도착지</label>
            <input type="text" value={destination} onChange={handleDestinationChange} />
          </div>
          <div>
            <label>도착 시간</label>
            <input type="time" value={arrivalTime} onChange={handleArrivalTimeChange} />
          </div>
          <div>
            <label>출발지</label>
            <input type="text" value={departure} onChange={handleDepartureChange} />
          </div>
          <div>
            <label>출발 시간</label>
            <input type="time" value={departureTime} onChange={handleDepartureTimeChange} />
          </div>
          <div>
            <label>여행 기간</label>
            <DateRangeWrapper>
              <input
                type="text"
                value={`${formatDate(dateRange[0].startDate)} ~ ${formatDate(dateRange[0].endDate)}`}
                readOnly
                onClick={handleCalendarIconClick}
              />
              {showCalendar && (
                <div className="calendar-wrapper">
                  <DateRangePicker
                    ranges={dateRange}
                    onChange={handleDateSelect}
                    showDateDisplay={false}
                    showMonthAndYearPickers={false}
                    showPreview={false}
                    showSelectionPreview={false}
                    showInputArrowIcons={false}
                    moveRangeOnFirstSelection={false}
                    editableDateInputs={false}
                    direction="horizontal"
                  />
                </div>
              )}
            </DateRangeWrapper>
          </div>
          <StyledButton type="submit">여행 만들기</StyledButton>
        </StyledForm>
      </Container>
    </StyledHeader>
  );
}

export default Home_head;
