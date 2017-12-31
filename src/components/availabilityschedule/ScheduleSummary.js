import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Add from 'material-ui/svg-icons/content/add';
import {List, ListItem} from 'material-ui/List';
import {
  Link,
} from 'react-router';

import moment from 'moment';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import Event from 'material-ui/svg-icons/action/event';
import CircularProgress from 'material-ui/CircularProgress';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import {grey400} from 'material-ui/styles/colors';
import IconMenu from 'material-ui/IconMenu';

import './ScheduleSummary.css';

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip='more'
    tooltipPosition='bottom-left'
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem>Edit</MenuItem>
    <MenuItem>Delete</MenuItem>
  </IconMenu>
);

const generateTimeframeText = (s) => {
  if (!s.start && !s.end) {
    return 'Permanent schedule';
  }
  if (!s.start && s.end) {
    return `Until ${moment(s.end).format('MMM Do, YYYY')}`
  }
  if (s.start && !s.end) {
    return `From ${moment(s.start).format('MMM Do, YYYY')} onwards`
  }

  return `From ${moment(s.start).format('MMM Do, YYYY')} to ${moment(s.end).format('MMM Do, YYYY')}`;
};

class ScheduleSummary extends React.Component {

  renderFetching(isFetching) {
    if (!isFetching) return null;

    return <div className='loading-schedules'>
      <CircularProgress />
    </div>;
  }

  renderSchedules(isFetching, schedules) {
    if (isFetching) return null;

    if (!schedules || schedules.length === 0) {
      return <div className='no-schedules'>
        No schedules!
      </div>;
    }

    return <div className='schedule-list'>
      <List>
        <Subheader inset={true}>Schedules</Subheader>
        {
          schedules.map(s => {
            return <ListItem
              key={`schedule-${s.id}`}
              containerElement={<Link to={`availabilitySchedule/${s.id}`} />}
              leftAvatar={<Avatar icon={<Event />} />}
              rightIconButton={rightIconMenu}
              primaryText={s.name}
              secondaryText={generateTimeframeText(s)}
            />
          })
        }
      </List>
    </div>;
  }

  render() {
    const schedules = this.props.schedules.items;
    const isFetching = this.props.schedules.isFetching;
    return (
      <div className='schedule-summary'>
        <div className='create-new'>
          <Link to='availabilitySchedules/new'>
          <RaisedButton
            label="Create schedule"
            primary={true}
            icon={<Add className="muidocs-icon-custom-github" />}
          />
          </Link>
        </div>

        { this.renderFetching(isFetching) }
        { this.renderSchedules(isFetching, schedules) }

      </div>
    );
  }
}

export default ScheduleSummary;
