import React from 'react';
import Timeline from '../components/search/Timeline';
import TimelineFilter from '../components/search/TimelineFilter';
import TimePlaceFilter from '../components/search/TimePlaceFilter';

const SearchPage = () => {
  return (
      <div>
      	<TimePlaceFilter />
      	<TimelineFilter />
        <Timeline />
      </div>
  );
};

export default SearchPage;
