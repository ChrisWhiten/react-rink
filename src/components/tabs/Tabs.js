import React from 'react';
import {Link} from 'react-router';
import {Tabs as MaterialTabs, Tab} from 'material-ui/Tabs';
import HomeIcon from 'material-ui/svg-icons/action/home';
import SearchIcon from 'material-ui/svg-icons/action/search';
import EventIcon from 'material-ui/svg-icons/action/event';

import './Tabs.css';

class Tabs extends React.Component {

  render() {
    return (
      <div className='tab-container'>
        <MaterialTabs>
          <Tab
            icon={<HomeIcon/>}
            label='MY EVENTS'
            containerElement={<Link to='/' />}
          />
          <Tab
            icon={<EventIcon />}
            label='BOOK ICE TIME'
            containerElement={<Link to='/booking' />}
          />
          <Tab
            icon={<SearchIcon />}
            label='JOIN A GAME'
            containerElement={<Link to='/join' />}
          />
        </MaterialTabs>
      </div>
    );
  }
}

export default Tabs;
