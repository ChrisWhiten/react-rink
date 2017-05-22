import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {Tabs as MaterialTabs, Tab} from 'material-ui/Tabs';
import HomeIcon from 'material-ui/svg-icons/action/home';
import SearchIcon from 'material-ui/svg-icons/action/search';
import EventIcon from 'material-ui/svg-icons/action/event';

import './Tabs.css';

class Tabs extends React.Component {

  render() {
    const {participant} = this.props;

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
      // <Link key={`link-${participant.id}`} to={`/users/${participant.id}`} style={{textDecoration: 'none'}}>
      //   <div className='participant-item-container'>
      //     {participant.name}
      //   </div>
      // </Link>
    );
  }
}

Tabs.propTypes = {
  participant: PropTypes.object,
};

export default Tabs;
