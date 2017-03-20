import React from 'react';

import PageBase from '../components/PageBase';
import Timeline from '../components/search/Timeline';

const SearchPage = () => {
  return (
    <PageBase title="Join Ice time"
              navigation="OneRink / Join Ice Time">

      <div>
        <Timeline />
      </div>
    </PageBase>
  );
};

export default SearchPage;
