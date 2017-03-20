import {default as MaterialDatePicker} from 'material-ui/DatePicker';
import EventIcon from 'material-ui/svg-icons/action/event';
import React from 'react';

import './DatePicker.css';

class DatePicker extends React.Component {
  constructor() {
    super();

    this.state = {
      open: false,
      selectedBooking: null,
    };
  }

  _handleDatePickerOpen() {
    this.refs.datePicker.openDialog();
  }

  render() {
    const styles = {
      datePicker: {
        display: 'inline-block',
      },
    };

    return (
      <div className='date-picker'>
        <div className='date-picker-icon'>
          <EventIcon className='date-picker-svg' onTouchTap={this._handleDatePickerOpen.bind(this)}/>
        </div>
        <MaterialDatePicker
          ref='datePicker'
          floatingLabelText='Select a Date'
          autoOk={true}
          minDate={new Date()}
          maxDate={new Date(2020, 0, 0, 0, 0, 0, 0)}
          defaultDate={new Date()}
          disableYearSelection={false}
          formatDate={date => date.toDateString()}
          style={styles.datePicker}
        />
    </div>
    );
  }
}

export default DatePicker;