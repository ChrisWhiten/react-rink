import React from 'react';
import {cyan600, pink600} from 'material-ui/styles/colors';
import Work from 'material-ui/svg-icons/action/work';
import TurnedIn from 'material-ui/svg-icons/action/turned-in';
import UpcomingBox from '../components/dashboard/UpcomingBox';
import globalStyles from '../styles';
import api from '../data/api';

const DashboardPage = () => {
  const upcomingParticipations = api.getUpcomingParticipations();
  const upcomingOrganized = api.getUpcomingOrganized();

  return (
    <div>
      <h3 style={globalStyles.navigation}>Application / Dashboard</h3>

      <div className="row">

        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 m-b-15 ">
          <UpcomingBox Icon={TurnedIn}
           color={pink600}
           title="Upcoming Games I'm Playing"
           value="1500k"
           topColour='red'
           upcomingEvents={upcomingParticipations}
           emptyMessage='You have no upcoming events'
          />
        </div>


        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 m-b-15 ">
          <UpcomingBox Icon={Work}
             color={cyan600}
             title="Upcoming Games I'm Organizing"
             value="4231"
             topColour='blue'
             upcomingEvents={upcomingOrganized}
             emptyMessage="You aren't organizing any events"
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
