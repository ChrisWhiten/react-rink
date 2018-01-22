import React from 'react';
import {Link} from 'react-router';
import {Tabs as MaterialTabs, Tab} from 'material-ui/Tabs';
// import HomeIcon from 'material-ui/svg-icons/action/home';
// import SearchIcon from 'material-ui/svg-icons/action/search';
import EventIcon from 'material-ui/svg-icons/action/event';
import Schedule from 'material-ui/svg-icons/action/schedule';
import EventSeat from 'material-ui/svg-icons/action/event-seat';
import locale from '../../localization/locale';

import './styles/Tabs.css';

class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.locale = locale.getLocale();
  }

  render() {
    let path = '';
    const parts = this.props.location.pathname.trim('/').split('/');
    if (parts.length === 2) {
      path = parts[1];
    }
    let selectedIndex = 0;
    switch (path) {
      case 'booking':
        selectedIndex = 0;
        break;
      case 'external':
        selectedIndex = 1;
        break;
      case 'availabilitySchedule':
      case 'availabilitySchedules':
        selectedIndex = 2;
        break;
      default:
        selectedIndex = 0;
        break;
    }

    return (
      <div className='tab-container'>
        <MaterialTabs initialSelectedIndex={selectedIndex}>
          {/* <Tab
            icon={<HomeIcon/>}
            className='tab'
            label={this.locale.general.myEvents}
            containerElement={<Link to='/' />}
          /> */}
          <Tab
            icon={<EventIcon />}
            className='tab'
            label={this.locale.general.bookIceTime}
            containerElement={<Link to='/booking' />}
          />
          {/* <Tab
            icon={<SearchIcon />}
            className='tab'
            label={this.locale.general.joinAGame}
            containerElement={<Link to='/join' />}
          /> */}
          <Tab
            icon={<EventSeat />}
            className='tab'
            label='External'
            containerElement={<Link to='/external' />}
          />

          <Tab
            icon={<Schedule />}
            className='tab'
            label='Scheduling'
            containerElement={<Link to='/availabilitySchedules' />}
          />

        </MaterialTabs>
      </div>
    );
  }
}

export default Tabs;
