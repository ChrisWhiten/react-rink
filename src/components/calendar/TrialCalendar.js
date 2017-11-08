import React, {PropTypes} from 'react';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import moment from 'moment';
import BookingPanel from './BookingPanel';
import classNames from 'classnames';
import CircularProgress from 'material-ui/CircularProgress';

import './TrialCalendar.css';

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

    const b = {
      time: new Date(),
      availableToBook: true,
    };

    return (
      <div className='trial-calendar'>
        <div className='calendar-container'>
          <div className='times-slider'>
            <table className='times-table'>
              <tbody>
                <tr>
                  <td className='time-container'>
                    <div className='time-hour'>
                      <span className='hour-text'>12</span>
                      <span className='ampm-text'>am</span>
                    </div>

                    <div className='time-minutes'>00</div>
                  </td>
                </tr>

                <tr>
                  <td className='time-container'>
                    <div className='time-minutes'>15</div>
                  </td>
                </tr>

                <tr>
                  <td className='time-container'>
                    <div className='time-minutes'>30</div>
                  </td>
                </tr>

                <tr>
                  <td className='time-container'>
                    <div className='time-minutes'>45</div>
                  </td>
                </tr>

                <tr>
                  <td className='time-container'>
                    <div className='time-hour'>
                      <span className='hour-text'>1</span>
                      <span className='ampm-text'>am</span>
                    </div>

                    <div className='time-minutes'>00</div>
                  </td>
                </tr>

                 <tr>
                  <td className='time-container'>
                    <div className='time-minutes'>15</div>
                  </td>
                </tr>

                <tr>
                  <td className='time-container'>
                    <div className='time-minutes'>30</div>
                  </td>
                </tr>

                <tr>
                  <td className='time-container'>
                    <div className='time-minutes'>45</div>
                  </td>
                </tr>

                <tr>
                  <td className='time-container'>
                    <div className='time-hour'>
                      <span className='hour-text'>2</span>
                      <span className='ampm-text'>am</span>
                    </div>

                    <div className='time-minutes'>00</div>
                  </td>
                </tr>

                 <tr>
                  <td className='time-container'>
                    <div className='time-minutes'>15</div>
                  </td>
                </tr>

                <tr>
                  <td className='time-container'>
                    <div className='time-minutes'>30</div>
                  </td>
                </tr>

                <tr>
                  <td className='time-container'>
                    <div className='time-minutes'>45</div>
                  </td>
                </tr>

                <tr>
                  <td className='time-container'>
                    <div className='time-hour'>
                      <span className='hour-text'>3</span>
                      <span className='ampm-text'>am</span>
                    </div>

                    <div className='time-minutes'>00</div>
                  </td>
                </tr>

                 <tr>
                  <td className='time-container'>
                    <div className='time-minutes'>15</div>
                  </td>
                </tr>

                <tr>
                  <td className='time-container'>
                    <div className='time-minutes'>30</div>
                  </td>
                </tr>

                <tr>
                  <td className='time-container'>
                    <div className='time-minutes'>45</div>
                  </td>
                </tr>

                <tr>
                  <td className='time-container'>
                    <div className='time-hour'>
                      <span className='hour-text'>4</span>
                      <span className='ampm-text'>am</span>
                    </div>

                    <div className='time-minutes'>00</div>
                  </td>
                </tr>

                 <tr>
                  <td className='time-container'>
                    <div className='time-minutes'>15</div>
                  </td>
                </tr>

                <tr>
                  <td className='time-container'>
                    <div className='time-minutes'>30</div>
                  </td>
                </tr>

                <tr>
                  <td className='time-container'>
                    <div className='time-minutes'>45</div>
                  </td>
                </tr>

                <tr>
                  <td className='time-container'>
                    <div className='time-hour'>
                      <span className='hour-text'>5</span>
                      <span className='ampm-text'>am</span>
                    </div>

                    <div className='time-minutes'>00</div>
                  </td>
                </tr>

                 <tr>
                  <td className='time-container'>
                    <div className='time-minutes'>15</div>
                  </td>
                </tr>

                <tr>
                  <td className='time-container'>
                    <div className='time-minutes'>30</div>
                  </td>
                </tr>

                <tr>
                  <td className='time-container'>
                    <div className='time-minutes'>45</div>
                  </td>
                </tr>

                <tr>
                  <td className='time-container'>
                    <div className='time-hour'>
                      <span className='hour-text'>6</span>
                      <span className='ampm-text'>am</span>
                    </div>

                    <div className='time-minutes'>00</div>
                  </td>
                </tr>

                 <tr>
                  <td className='time-container'>
                    <div className='time-minutes'>15</div>
                  </td>
                </tr>

                <tr>
                  <td className='time-container'>
                    <div className='time-minutes'>30</div>
                  </td>
                </tr>

                <tr>
                  <td className='time-container'>
                    <div className='time-minutes'>45</div>
                  </td>
                </tr>

                <tr>
                  <td className='time-container'>
                    <div className='time-hour'>
                      <span className='hour-text'>7</span>
                      <span className='ampm-text'>am</span>
                    </div>

                    <div className='time-minutes'>00</div>
                  </td>
                </tr>

                 <tr>
                  <td className='time-container'>
                    <div className='time-minutes'>15</div>
                  </td>
                </tr>

                <tr>
                  <td className='time-container'>
                    <div className='time-minutes'>30</div>
                  </td>
                </tr>

                <tr>
                  <td className='time-container'>
                    <div className='time-minutes'>45</div>
                  </td>
                </tr>

                <tr>
                  <td className='time-container'>
                    <div className='time-hour'>
                      <span className='hour-text'>8</span>
                      <span className='ampm-text'>am</span>
                    </div>

                    <div className='time-minutes'>00</div>
                  </td>
                </tr>

                 <tr>
                  <td className='time-container'>
                    <div className='time-minutes'>15</div>
                  </td>
                </tr>

                <tr>
                  <td className='time-container'>
                    <div className='time-minutes'>30</div>
                  </td>
                </tr>

                <tr>
                  <td className='time-container'>
                    <div className='time-minutes'>45</div>
                  </td>
                </tr>

                <tr>
                  <td className='time-container'>
                    <div className='time-hour'>
                      <span className='hour-text'>9</span>
                      <span className='ampm-text'>am</span>
                    </div>

                    <div className='time-minutes'>00</div>
                  </td>
                </tr>

                 <tr>
                  <td className='time-container'>
                    <div className='time-minutes'>15</div>
                  </td>
                </tr>

                <tr>
                  <td className='time-container'>
                    <div className='time-minutes'>30</div>
                  </td>
                </tr>

                <tr>
                  <td className='time-container'>
                    <div className='time-minutes'>45</div>
                  </td>
                </tr>

                <tr>
                  <td className='time-container'>
                    <div className='time-hour'>
                      <span className='hour-text'>10</span>
                      <span className='ampm-text'>am</span>
                    </div>

                    <div className='time-minutes'>00</div>
                  </td>
                </tr>

                 <tr>
                  <td className='time-container'>
                    <div className='time-minutes'>15</div>
                  </td>
                </tr>

                <tr>
                  <td className='time-container'>
                    <div className='time-minutes'>30</div>
                  </td>
                </tr>

                <tr>
                  <td className='time-container'>
                    <div className='time-minutes'>45</div>
                  </td>
                </tr>

                <tr>
                  <td className='time-container'>
                    <div className='time-hour'>
                      <span className='hour-text'>11</span>
                      <span className='ampm-text'>am</span>
                    </div>

                    <div className='time-minutes'>00</div>
                  </td>
                </tr>

                 <tr>
                  <td className='time-container'>
                    <div className='time-minutes'>15</div>
                  </td>
                </tr>

                <tr>
                  <td className='time-container'>
                    <div className='time-minutes'>30</div>
                  </td>
                </tr>

                <tr>
                  <td className='time-container'>
                    <div className='time-minutes'>45</div>
                  </td>
                </tr>

                <tr>
                  <td className='time-container'>
                    <div className='time-hour'>
                      <span className='hour-text'>12</span>
                      <span className='ampm-text'>pm</span>
                    </div>

                    <div className='time-minutes'>00</div>
                  </td>
                </tr>

                 <tr>
                  <td className='time-container'>
                    <div className='time-minutes'>15</div>
                  </td>
                </tr>

                <tr>
                  <td className='time-container'>
                    <div className='time-minutes'>30</div>
                  </td>
                </tr>

                <tr>
                  <td className='time-container'>
                    <div className='time-minutes'>45</div>
                  </td>
                </tr>

                <tr>
                  <td className='time-container'>
                    <div className='time-hour'>
                      <span className='hour-text'>1</span>
                      <span className='ampm-text'>pm</span>
                    </div>

                    <div className='time-minutes'>00</div>
                  </td>
                </tr>

                 <tr>
                  <td className='time-container'>
                    <div className='time-minutes'>15</div>
                  </td>
                </tr>

                <tr>
                  <td className='time-container'>
                    <div className='time-minutes'>30</div>
                  </td>
                </tr>

                <tr>
                  <td className='time-container'>
                    <div className='time-minutes'>45</div>
                  </td>
                </tr>

                <tr>
                  <td className='time-container'>
                    <div className='time-hour'>
                      <span className='hour-text'>2</span>
                      <span className='ampm-text'>pm</span>
                    </div>

                    <div className='time-minutes'>00</div>
                  </td>
                </tr>

                 <tr>
                  <td className='time-container'>
                    <div className='time-minutes'>15</div>
                  </td>
                </tr>

                <tr>
                  <td className='time-container'>
                    <div className='time-minutes'>30</div>
                  </td>
                </tr>

                <tr>
                  <td className='time-container'>
                    <div className='time-minutes'>45</div>
                  </td>
                </tr>

              </tbody>
            </table>
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
              <tbody>
                <tr>
                  <th className='filler-slot'>
                  </th>
                  <th className='filler-slot'>
                  </th>
                </tr>

                <tr>
                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>

                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>

                    <div className='booking-slot sixty-mins unbooked' onTouchTap={this._handleOpen.bind(this, b)}>
                      <div className='slot-details'>
                        <span className='slot-time'>
                          10:30am - 11:30am
                        </span>
                        <h3>20 Available</h3>
                      </div>
                    </div>
                  </td>

                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>

                    <div className='booking-slot sixty-mins booked'>
                      <div className='slot-details'>
                        <span className='slot-time'>
                          1:30pm - 2:30pm
                        </span>
                        <h3>9 available (11/20 booked)</h3>
                      </div>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>

                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>
                </tr>

                 <tr>
                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>

                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>

                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>
                </tr>

                 <tr>
                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>

                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>

                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>
                </tr>

                 <tr>
                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>

                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>

                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>
                </tr>

                 <tr>
                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>

                    <div className='booking-slot sixty-mins booked'>
                      <div className='slot-details'>
                        <span className='slot-time'>
                          1:30pm - 2:30pm
                        </span>
                        <h3>11 available (9/20 booked)</h3>
                      </div>
                    </div>
                  </td>

                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>

                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>
                </tr>

                 <tr>
                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>

                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>

                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>

                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>

                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>

                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>

                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>

                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>

                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>

                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>

                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>

                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>

                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>

                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>

                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>

                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>

                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>

                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>

                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>

                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>

                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>

                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>

                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>

                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>

                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>

                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>

                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>

                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>

                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>

                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>

                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>

                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>

                  <td className='open-spot'>
                    <div className='open-spot-time-label'>
                      <span>12:00am-12:15am</span>
                    </div>
                  </td>
                </tr>
              </tbody>
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
