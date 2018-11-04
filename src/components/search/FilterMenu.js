import React from 'react';
import classNames from 'classnames';
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
// import FilterList from 'material-ui/svg-icons/content/filter-list';
import EventIcon from 'material-ui/svg-icons/action/event';
import moment from 'moment';
import { default as MaterialDatePicker } from 'material-ui/DatePicker';
import Drawer from 'material-ui/Drawer';

import TimelineFilter from './TimelineFilter';
import './styles/FilterMenu.css';

class FilterMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      drawerOpen: false,
      showDateIntervalOptions: false
    };

    this.toggleDateIntervalOptions = this.toggleDateIntervalOptions.bind(this);
    this.pickOneDay = this.pickOneDay.bind(this);
    this.pickThreeDays = this.pickThreeDays.bind(this);
    this.pickSevenDays = this.pickSevenDays.bind(this);
  }

  pickOneDay() {
    this.props.changeDateInterval(1, this.state.date);
    this.setState({
      showDateIntervalOptions: false
    });
  }

  pickThreeDays() {
    this.props.changeDateInterval(3, this.state.date);
    this.setState({
      showDateIntervalOptions: false
    });
  }

  pickSevenDays() {
    this.props.changeDateInterval(7, this.state.date);
    this.setState({
      showDateIntervalOptions: false
    });
  }

  toggleDateIntervalOptions() {
    this.setState({
      showDateIntervalOptions: !this.state.showDateIntervalOptions
    });
  }

  _handleDatePickerOpen() {
    this.refs.bookingDatePicker.openDialog();
  }

  _handleDatePickerChange(nil, d) {
    this.setState({
      date: d
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
      date: newDate
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
      date: newDate
    });

    if (this.props.onDateChange) {
      this.props.onDateChange(newDate);
    }
  }

  _jumpToToday() {
    this.setState({
      date: new Date()
    });
  }

  _handleFilterListToggle() {
    this.setState({
      drawerOpen: !this.state.drawerOpen
    });
  }

  render() {
    const dateInterval = this.props.isBookingPage
      ? this.props.filterOptions.bookingPageDateInterval
      : this.props.filterOptions.dateInterval;
    const filterMenuClass = classNames('filter-menu', {
      headless: !!this.props.headless
    });

    const dateIntevalOptionsClass = classNames('date-interval-options', {
      hidden: !this.state.showDateIntervalOptions
    });

    const dateIntervalPickerClass = classNames('date-interval-picker', {
      hidden: !this.props.showDateIntervalPicker
    });

    return (
      <div className={filterMenuClass}>
        <TimelineFilter
          inverted={true}
          isBookingPage={this.props.isBookingPage}
          multi={this.props.multiSelect}
          locations={this.props.locations}
          changeSelectedLocations={this.props.changeSelectedLocations}
        />
        <div className="filter-date-picker">
          <div className="filter-chevron" onClick={this._backOne.bind(this)}>
            <ChevronLeft className="filter-chevron-svg" />
          </div>
          <div
            className="date-picker-area"
            onClick={this._handleDatePickerOpen.bind(this)}
          >
            <h5 className="date-picker-text">
              {moment(this.state.date).format('ddd, MMM Do, YYYY')}
            </h5>
            <h5 className="date-picker-text-small">
              {moment(this.state.date).format('ddd, MMM Do')}
            </h5>
            <div className="filter-date-picker-icon">
              <EventIcon className="filter-date-picker-svg" />
            </div>
          </div>
          <div
            className="filter-chevron"
            onClick={this._forwardsOne.bind(this)}
          >
            <ChevronRight className="filter-chevron-svg" />
          </div>
        </div>

        <div className="filter-menu-balance">
          <div
            className={dateIntervalPickerClass}
            onClick={this.toggleDateIntervalOptions}
          >
            <div className="date-count">{dateInterval}</div>
            <div className="date-text">
              {dateInterval === 1 ? 'day' : 'days'}
            </div>
          </div>
        </div>
        <div className={dateIntevalOptionsClass}>
          <div className="arrow-box">
            <div
              className="one-day date-interval-option"
              onClick={this.pickOneDay}
            >
              <div className="date-count">1</div>
              <div className="date-text">day</div>
            </div>
            <div
              className="three-days date-interval-option"
              onClick={this.pickThreeDays}
            >
              <div className="date-count">3</div>
              <div className="date-text">days</div>
            </div>
            <div
              className="seven-days date-interval-option"
              onClick={this.pickSevenDays}
            >
              <div className="date-count">7</div>
              <div className="date-text">days</div>
            </div>
          </div>
        </div>
        <MaterialDatePicker
          id="booking-date-picker"
          style={{ display: 'none' }}
          ref="bookingDatePicker"
          autoOk={true}
          minDate={new Date()}
          maxDate={new Date(2050, 0, 0, 0, 0, 0, 0)}
          disableYearSelection={false}
          onChange={this._handleDatePickerChange.bind(this)}
        />

        <Drawer
          docked={false}
          width={200}
          containerClassName="filter-drawer"
          open={this.state.drawerOpen}
        />
      </div>
    );
  }
}

export default FilterMenu;
