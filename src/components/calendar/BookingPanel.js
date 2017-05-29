import React, {PropTypes} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import Close from 'material-ui/svg-icons/navigation/close';
import Divider from 'material-ui/Divider';
import moment from 'moment';
import SelectField from 'material-ui/SelectField';

import './BookingPanel.css';

class BookingPanel extends React.Component {
  constructor() {
    super();

    this.state = {
      open: false,
      durationValue: 60,
      eventTypeValue: 'adult_organized',
    };
  }

  _handleOpen() {
    this.setState({
      open: true,
    });
  }

  _handleClose() {
    this.setState({
      open: false,
    });
  }

  _handleDurationChange(event, index, value) {
    this.setState({
      durationValue: value,
    });
  }

  _handleEventTypeChange(event, index, value) {
    this.setState({
      eventTypeValue: value,
    });
  }

  _handleCloseClick() {
    this.props.onRequestClose();
  }

  render() {
    const { booking } = this.props;

    return (
      <div className='booking-panel'>
        <div className='header'>
          Book Ice
        </div>
        <Close className='cancel' onClick={this._handleCloseClick.bind(this)} />
        <div className='content'>
          <div className='time'>
            {`${moment(booking.time).format('h:mm a')} on ${moment(booking.time).format('dddd, MMM Do YYYY')}`}
          </div>
          <Divider style={{width: '100%'}}/>
          <SelectField floatingLabelText='Duration' value={this.state.durationValue} onChange={this._handleDurationChange.bind(this)}>
            <MenuItem value={60} primaryText='1 hour' />
            <MenuItem value={90} primaryText='1.5 hours' />
            <MenuItem value={120} primaryText='2 hours' />
          </SelectField>

          <SelectField floatingLabelText='Event Type' value={this.state.eventTypeValue} onChange={this._handleEventTypeChange.bind(this)}>
            <MenuItem value='adult_pickup' primaryText='Adult pickup hockey' />
            <MenuItem value='adult_organized' primaryText='Adult organized hockey' />
            <MenuItem value='minor_hockey' primaryText='Minor Hockey' />
            <MenuItem value='skating' primaryText='Skating' />
            <MenuItem value='other' primaryText='Other' />
          </SelectField>
          <div className='terms'>
            By clicking "Rent Ice", you agree to the venue's terms.
          </div>
        </div>
        <div className='booking-button'>
          <RaisedButton
            className='booking-raised-button'
            primary={true}
            backgroundColor='#3c8dbc'>
            <span className='booking-subtotal'>
              $162
            </span>
            <span className='booking-text'>
              Book
            </span>
          </RaisedButton>
        </div>
      </div>
    );
  }
}

BookingPanel.propTypes = {
  booking: PropTypes.object,
  onRequestClose: PropTypes.func,
};

export default BookingPanel;