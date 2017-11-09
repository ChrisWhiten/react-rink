import React from 'react';
import moment from 'moment';
import {default as MaterialDatePicker} from 'material-ui/DatePicker';
import EventIcon from 'material-ui/svg-icons/action/event';

import './styles/DatePicker.css';

class DatePicker extends React.Component {
  constructor() {
    super();

    this.state = {
      date: null,
      dateText: 'Anytime',
    };
  }

   _handleDatePickerOpen() {
    this.refs.datePicker.openDialog();
  }

  _handleDatePickerChange(nil, d) {
    this.setState({
      date: d,
      dateText: moment(d).format('MMM Do, YYYY'),
    });
  }

  _formatDate(date) {
    if (!date) {
      return 'Anytime';
    } else {
      return `${moment(date).format('MMM Do, YYYY')} (and onwards)`;
    }
  }

  render() {
    return (
      <span>
      <div className='search-date-picker' onTouchTap={this._handleDatePickerOpen.bind(this)}>
        <div className='date-picker-target'>
          <div className='search-date-picker-icon'>
            <EventIcon className='search-date-picker-svg' />
          </div>
          <h4 className='date-text'>
            {this.state.dateText}
          </h4>
        </div>
      </div>
      <MaterialDatePicker
        id='search-date-picker'
        style={{display: 'none'}}
        ref='datePicker'
        autoOk={true}
        minDate={new Date()}
        maxDate={new Date(2050, 0, 0, 0, 0, 0, 0)}
        disableYearSelection={false}
        onChange={this._handleDatePickerChange.bind(this)}
      />
    </span>
    );
  }
}

export default DatePicker;