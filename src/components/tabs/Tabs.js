import React from 'react';
import {Link} from 'react-router';
import {Tabs as MaterialTabs, Tab} from 'material-ui/Tabs';
import HomeIcon from 'material-ui/svg-icons/action/home';
import SearchIcon from 'material-ui/svg-icons/action/search';
import EventIcon from 'material-ui/svg-icons/action/event';
import locale from '../../localization/locale';

import './styles/Tabs.css';

class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.locale = locale.getLocale();
  }
  
  render() {
    let selectedIndex = 0;
    switch (this.props.location.pathname) {
      case '/booking':
        selectedIndex = 1;
        break;
      case '/join':
        selectedIndex = 2;
        break;
      default:
        selectedIndex = 0;
        break;
    }

    return (
      <div className='tab-container'>
        <MaterialTabs initialSelectedIndex={selectedIndex}>
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
