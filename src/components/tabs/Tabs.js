import React from 'react';
import {Link} from 'react-router';
import {Tabs as MaterialTabs, Tab} from 'material-ui/Tabs';
import HomeIcon from 'material-ui/svg-icons/action/home';
import SearchIcon from 'material-ui/svg-icons/action/search';
import EventIcon from 'material-ui/svg-icons/action/event';
import locale from '../../localization/locale';

import './Tabs.css';

class Tabs extends React.Component {
  constructor() {
    super();
    this.locale = locale.getLocale();
  }
  
  render() {
    return (
      <div className='tab-container'>
        <MaterialTabs>
          <Tab
            icon={<HomeIcon/>}
            label={this.locale.general.myEvents}
            containerElement={<Link to='/' />}
          />
          <Tab
            icon={<EventIcon />}
            label={this.locale.general.bookIceTime}
            containerElement={<Link to='/booking' />}
          />
          <Tab
            icon={<SearchIcon />}
            label={this.locale.general.joinAGame}
            containerElement={<Link to='/join' />}
          />
        </MaterialTabs>
      </div>
    );
  }
}

export default Tabs;
