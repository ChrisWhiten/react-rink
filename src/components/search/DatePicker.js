import React from 'react';
import moment from 'moment';
import {default as MaterialDatePicker} from 'material-ui/DatePicker';
import EventIcon from 'material-ui/svg-icons/action/event';

import './styles/DatePicker.css';

class DatePicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: props.date || null,
      dateText: this.generateDateText(props.date, props.nullText),
    };
  }

  generateDateText(date, nullText) {
    if (date) {
      return moment(date).format('MMM Do, YYYY');
    }

    if (nullText) {
      return nullText;
    }

    return 'Anytime';
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.date !== this.state.date) {
      this.setState({
        date: nextProps.date,
        dateText: this.generateDateText(nextProps.date, this.props.nullText),
      });
    }
  }

   _handleDatePickerOpen() {
    this.refs.datePicker.openDialog();
  }

  _handleDatePickerChange(nil, d) {
    this.setState({
      date: d,
      dateText: moment(d).format('MMM Do, YYYY'),
    });

    if (this.props.onChange) {
      this.props.onChange(d);
    }
  }

  _formatDate(date) {
    if (!date) {
      return this.props.nullText || 'Anytime';
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
          {
            this.state.date && this.props.hintText &&
            <h6 className='hint-text'>
              {this.props.hintText}
            </h6>
          }
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