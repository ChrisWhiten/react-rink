import React from 'react';

import PageBase from '../components/PageBase';
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
