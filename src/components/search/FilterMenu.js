import React from 'react';
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import FilterList from 'material-ui/svg-icons/content/filter-list';
import EventIcon from 'material-ui/svg-icons/action/event';
import Checkbox from 'material-ui/Checkbox';
import classNames from 'classnames';
import moment from 'moment';
import {default as MaterialDatePicker} from 'material-ui/DatePicker';
import Drawer from 'material-ui/Drawer';

import TimelineFilter from './TimelineFilter';
import './styles/FilterMenu.css';

class FilterMenu extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      drawerOpen: false,
    };
  }

  _handleDatePickerOpen() {
    this.refs.bookingDatePicker.openDialog();
  }

  _handleDatePickerChange(nil, d) {
    this.setState({
      date: d,
    });
  }

  _backOne() {
    // TODO: alternative behaviour for week/month
    let newDate = new Date(this.state.date);
    newDate.setDate(newDate.getDate() - 1);
    this.setState({
      date: newDate,
    });
  }

  _forwardsOne() {
    // TODO: alternative behaviour for week/month
    let newDate = new Date(this.state.date);
    newDate.setDate(newDate.getDate() + 1);
    this.setState({
      date: newDate,
    });
  }

  _jumpToToday() {
    this.setState({
      date: new Date(),
    });
  }

  _handleFilterListToggle() {
    this.setState({
      drawerOpen: !this.state.drawerOpen,
    });
  }

  render() {
    return (
      <div className='filter-menu'>
        <TimelineFilter inverted={true} />
        <div className='filter-date-picker' onTouchTap={this._handleDatePickerOpen.bind(this)}>
          <span>
            {moment(this.state.date).format('ddd, MMM Do, YYYY')}
          </span>
          <div className='filter-date-picker-icon'>
            <EventIcon className='filter-date-picker-svg' />
          </div>
        </div>

        <div className='filter-date-navigator'>
          <div className='filter-chevron' onTouchTap={this._backOne.bind(this)}>
            <ChevronLeft className='filter-chevron-svg' />
          </div>
          
          <p className='jump-to-today' onTouchTap={this._jumpToToday.bind(this)}>
            TODAY
          </p>

          <div className='filter-chevron' onTouchTap={this._forwardsOne.bind(this)}>
            <ChevronRight className='filter-chevron-svg' />
          </div>
        </div>

        <MaterialDatePicker
          id='booking-date-picker'
          style={{display: 'none'}}
          ref='bookingDatePicker'
          autoOk={true}
          minDate={new Date()}
          maxDate={new Date(2050, 0, 0, 0, 0, 0, 0)}
          disableYearSelection={false}
          onChange={this._handleDatePickerChange.bind(this)}
        />

        <Drawer
          docked={false}
          width={200}
          containerClassName='filter-drawer'
          open={this.state.drawerOpen}
        />
      </div>
    );
  }
}

export default FilterMenu;