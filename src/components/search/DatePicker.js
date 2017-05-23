import React from 'react';
import moment from 'moment';
import {default as MaterialDatePicker} from 'material-ui/DatePicker';
import EventIcon from 'material-ui/svg-icons/action/event';

import './DatePicker.css';

class DatePicker extends React.Component {
  constructor() {
    super();

    this.state = {
      date: null,
    };
  }

   _handleDatePickerOpen() {
    this.refs.datePicker.openDialog();
  }

  _formatDate(date) {
    if (!date) {
      return 'Anytime';
    } else {
      return `${moment(date).format('MMM Do, YYYY')} (and onwards)`;
    }
  }

  render() {
    const styles = {
      datePicker: {
        display: 'inline-block',
      },
    };

    return (
      <div className='join-date-picker'>
        <div className='join-date-picker-icon'>
          <EventIcon className='date-picker-svg' onTouchTap={this._handleDatePickerOpen.bind(this)}/>
        </div>
        <MaterialDatePicker
          ref='datePicker'
          hintText='Anytime'
          autoOk={true}
          minDate={new Date()}
          maxDate={new Date(2050, 0, 0, 0, 0, 0, 0)}
          disableYearSelection={false}
          formatDate={this._formatDate.bind(this, new Date(this.state.date))}
          style={styles.datePicker}
        />
    </div>
    );
  }
}

export default DatePicker;