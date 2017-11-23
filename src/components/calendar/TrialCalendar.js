import React, {PropTypes} from 'react';
import Dialog from 'material-ui/Dialog';
import moment from 'moment';
import BookingPanel from './BookingPanel';
import CircularProgress from 'material-ui/CircularProgress';

import './styles/TrialCalendar.css';

class AvailabilityList extends React.Component {
  constructor() {
    super();

    this.state = {
      open: false,
      selectedBooking: null,
    };
  }

  _handleOpen(b) {
    if (!b.availableToBook) {
      return;
    }

    this.setState({
      open: true,
      selectedBooking: b,
    });
  }

  _handleClose() {
    this.setState({
      open: false,
    });
  }

  _renderCalendarItems(bookings) {
    return (
      <tbody>
        <tr>
          <th className='filler-slot'>
          </th>
          <th className='filler-slot'>
          </th>
        </tr>
        {
          bookings.map(b => {
            return (
              <tr key={`${b.id}_booking`}>
                <td className='open-spot christopher'>
                  <div className='open-spot-time-label'>
                    <span>{moment(b.time).format('LT')}</span>
                  </div>
                  {
                    b.booking &&
                    <div className='booking-slot sixty-mins unbooked' onTouchTap={this._handleOpen.bind(this, b)}>
                      <div className='slot-details'>
                        <span className='slot-time'>
                          {moment(b.booking.startTime).format('LT')} - {moment(b.booking.endTime).format('LT')}
                        </span>
                        <h3>20 Available</h3>
                      </div>
                    </div>
                  }
                </td>
      
                <td className='open-spot'>
                  <div className='open-spot-time-label'>
                    <span>{moment(b.time).format('LT')}</span>
                  </div>
      
                  {
                    b.booking &&
                    <div className='booking-slot sixty-mins unbooked' onTouchTap={this._handleOpen.bind(this, b)}>
                      <div className='slot-details'>
                        <span className='slot-time'>
                          {moment(b.booking.startTime).format('LT')} - {moment(b.booking.endTime).format('LT')}
                        </span>
                        <h3>20 Available</h3>
                      </div>
                    </div>
                  }
                </td>
              </tr>
            )
          })
        }
      </tbody>
    );
  }

  _renderTimeRow(hour, meridian, minutes) {
    return (
      <tr>
        <td className='time-container'>
          {
            minutes === '00' &&
            <div className='time-hour'>
              <span className='hour-text'>{hour}</span>
              <span className='ampm-text'>{meridian}</span>
            </div>
          }

          <div className='time-minutes'>{minutes}</div>
        </td>
      </tr>
    );
  }

  _renderTimesTable() {
    const hours = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const pieces = ['00', '15', '30', '45'];
    const slots = [];
    
    // am
    hours.forEach(h => {
      pieces.forEach(p => {
        slots.push({
          hour: h,
          minutes: p,
          meridian: 'am',
        });
      });
    });

    // pm
    hours.forEach(h => {
      pieces.forEach(p => {
        slots.push({
          hour: h,
          minutes: p,
          meridian: 'pm',
        });
      });
    });

    return (
      <table className='times-table'>
        <tbody>
          {
            slots.map(s => {
              return this._renderTimeRow(s.hour, s.meridian, s.minutes);
            })
          }
        </tbody>
      </table>
    );
  }

  render() {
    const { bookings } = this.props;

    let foo = {
      padding: 0,
      margin: 0,
      maxWidth: '450px',
    };

    let baz = {
      maxWidth: '450px',
    };

    if (bookings.isFetching) {
      return (
        <div style={{position: 'relative', width: '100%'}}>
          <CircularProgress style={{marginLeft: '50%', position: 'relative'}} />
        </div>
      );
    }

    return (
      <div className='trial-calendar'>
        <div className='calendar-container'>
          <div className='times-slider'>
            { this._renderTimesTable() }
          </div>
          <div className='locations-wrapper'>
            <table className='locations-table'>
              <thead>
                <tr>
                  <th className='location-header'>
                    <span className='location-title'>Lansdowne Park</span>
                  </th>
                  <th className='location-header'>
                    <span className='location-title'>Canadian Tire Centre</span>
                  </th>
                </tr>
              </thead>
            </table>
          </div>
          <div className='calendar-section'>
            <table className='scrolling-table'>
              { this._renderCalendarItems(this.props.bookings.items) }
            </table>
          </div>
        </div>

        <Dialog
          className='booking-dialog'
          bodyStyle={foo}
          contentStyle={baz}
          modal={true}
          open={this.state.open}
          onRequestClose={this._handleClose.bind(this)}
        >
          <BookingPanel booking={this.state.selectedBooking} onRequestClose={this._handleClose.bind(this)} />
        </Dialog>
      </div>
    );
  }
}

AvailabilityList.propTypes = {
  bookings: PropTypes.object,
};

export default AvailabilityList;
