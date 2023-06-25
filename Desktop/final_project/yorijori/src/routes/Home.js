import React, { useState } from 'react';
import Choose_area from './Choose_area';
import Home_head from './Home_head';
import Recommend_list from './Recommend_list';

function Home() {
  const [createTrip, setCreateTrip] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState(null);

  const handleCreateTrip = (dateRange) => {
    setSelectedDateRange(dateRange);
    setCreateTrip(true);
  };

  return (
    <div>
      {createTrip ? (
        <Choose_area startDate={selectedDateRange.startDate} endDate={selectedDateRange.endDate} />
      ) : (
        <>
          <Home_head onCreateTrip={handleCreateTrip} />
          <Recommend_list />
        </>
      )}
    </div>
  );
}

export default Home;
