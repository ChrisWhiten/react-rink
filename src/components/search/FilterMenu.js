import React from 'react';
import classNames from 'classnames';
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
// import FilterList from 'material-ui/svg-icons/content/filter-list';
import EventIcon from 'material-ui/svg-icons/action/event';
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

    if (this.props.onDateChange) {
      this.props.onDateChange(d);
    }
  }

  _backOne() {
    // TODO: alternative behaviour for week/month
    let newDate = new Date(this.state.date);
    newDate.setDate(newDate.getDate() - 1);
    this.setState({
      date: newDate,
    });

    if (this.props.onDateChange) {
      this.props.onDateChange(newDate);
    }
  }

  _forwardsOne() {
    // TODO: alternative behaviour for week/month
    let newDate = new Date(this.state.date);
    newDate.setDate(newDate.getDate() + 1);
    this.setState({
      date: newDate,
    });

    if (this.props.onDateChange) {
      this.props.onDateChange(newDate);
    }
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
    const filterMenuClass = classNames(
      'filter-menu', {
        headless: !!this.props.headless,
      },
    );

    return (
      <div className={filterMenuClass}>
        <TimelineFilter inverted={true} />
        <div className='filter-date-picker'>
          <div className='filter-chevron' onTouchTap={this._backOne.bind(this)}>
            <ChevronLeft className='filter-chevron-svg' />
          </div>
          <div className='date-picker-area' onTouchTap={this._handleDatePickerOpen.bind(this)}>
            <h5 className='date-picker-text'>
              {moment(this.state.date).format('ddd, MMM Do, YYYY')}
            </h5>
            <div className='filter-date-picker-icon'>
              <EventIcon className='filter-date-picker-svg' />
            </div>
          </div>
          <div className='filter-chevron' onTouchTap={this._forwardsOne.bind(this)}>
            <ChevronRight className='filter-chevron-svg' />
          </div>
        </div>

        <div className='filter-menu-balance' />
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