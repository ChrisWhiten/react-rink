import React from 'react';
import classNames from 'classnames';
import Work from 'material-ui/svg-icons/action/work';
import TurnedIn from 'material-ui/svg-icons/action/turned-in';
import UpcomingBox from '../components/dashboard/UpcomingBox';
import InvitationsContainer from '../components/dashboard/InvitationsContainer';

import './DashboardPage.css';

const DashboardPage = ({ declineInvitation, invitations, upcomingOrganized, upcomingParticipations }) => {
  const notificationsClass = classNames(
    'notifications-bar',
    {
      active: invitations.items.length > 0 || invitations.isFetching,
    },
  );

  return (
    <div>
      <div className={notificationsClass}>
        <InvitationsContainer invitations={invitations} onDeclineInvitation={declineInvitation} />
      </div>
      <div className="row">
        <div className="responsive-box">
          <UpcomingBox Icon={TurnedIn}
           title="Upcoming Games I'm Playing"
           topColour='red'
           upcomingEvents={upcomingParticipations.items}
           emptyMessage='You have no upcoming events'
           isFetching={upcomingParticipations.isFetching}
          />
        </div>


        <div className="responsive-box">
          <UpcomingBox Icon={Work}
             title="Upcoming Games I'm Organizing"
             topColour='#00c0ef'
             upcomingEvents={upcomingOrganized.items}
             emptyMessage="You aren't organizing any events"
             isFetching={upcomingOrganized.isFetching}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
