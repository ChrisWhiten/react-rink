import React from 'react';
import HomeIcon from 'material-ui/svg-icons/action/home';
import SearchIcon from 'material-ui/svg-icons/action/search';
import EventIcon from 'material-ui/svg-icons/action/event';

const data = {
  menus: [
    { text: 'My Events', icon: <HomeIcon />, link: '/dashboard' },
    { text: 'Book Ice Time', icon: <EventIcon />, link: '/booking' },
    { text: 'Join a Game', icon: <SearchIcon />, link: '/join' },
    { text: 'External', icon: <EventIcon />, link: '/external' },
  ],
};

export default data;
