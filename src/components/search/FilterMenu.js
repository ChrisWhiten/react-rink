import React from 'react';
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import FilterList from 'material-ui/svg-icons/content/filter-list';
import EventIcon from 'material-ui/svg-icons/action/event';
import Checkbox from 'material-ui/Checkbox';
import classNames from 'classnames';
import moment from 'moment';

import './styles/FilterMenu.css';

class FilterMenu extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className='filter-menu'>
        <div className='filter-list-icon'>
          <FilterList className='filter-list-icon-svg' />
        </div>
        <div className='filter-date-picker'>
          <span>
            {moment(new Date()).format('ddd, MMM Do, YYYY')}
          </span>
          <div className='filter-date-picker-icon'>
            <EventIcon className='filter-date-picker-svg' />
          </div>
        </div>

        <div className='filter-date-navigator'>
          <div className='filter-chevron'>
            <ChevronLeft className='filter-chevron-svg' />
          </div>
          
          <p className='jump-to-today'>
            TODAY
          </p>

          <div className='filter-chevron'>
            <ChevronRight className='filter-chevron-svg' />
          </div>
        </div>

      </div>
    );
  }
}

export default FilterMenu;