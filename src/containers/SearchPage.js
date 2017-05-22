import React from 'react';
import Timeline from '../components/search/Timeline';
import TimelineFilter from '../components/search/TimelineFilter';

const SearchPage = () => {
  return (
      <div>
      	<TimelineFilter />
        <Timeline />
      </div>
  );
};

export default SearchPage;
