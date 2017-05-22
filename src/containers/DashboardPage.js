import React from 'react';
import Work from 'material-ui/svg-icons/action/work';
import TurnedIn from 'material-ui/svg-icons/action/turned-in';
import UpcomingBox from '../components/dashboard/UpcomingBox';
import api from '../data/api';

import './DashboardPage.css';

const DashboardPage = () => {
  const upcomingParticipations = api.getUpcomingParticipations();
  const upcomingOrganized = api.getUpcomingOrganized();

  return (
    <div>
      <div className="row">

        <div className="responsive-box">
          <UpcomingBox Icon={TurnedIn}
           title="Upcoming Games I'm Playing"
           topColour='red'
           upcomingEvents={upcomingParticipations}
           emptyMessage='You have no upcoming events'
          />
        </div>


        <div className="responsive-box">
          <UpcomingBox Icon={Work}
             title="Upcoming Games I'm Organizing"
             topColour='#00c0ef'
             upcomingEvents={upcomingOrganized}
             emptyMessage="You aren't organizing any events"
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
