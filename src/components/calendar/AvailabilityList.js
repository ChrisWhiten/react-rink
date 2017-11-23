import React, {PropTypes} from 'react';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import moment from 'moment';
import BookingPanel from './BookingPanel';
import classNames from 'classnames';
import CircularProgress from 'material-ui/CircularProgress';

import './styles/AvailabilityList.css';

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

    console.error(bookings);

    return (
      <Paper className='availability-list'>
        <div className='internal-container'>
          <div className='list'>
            {
              bookings.items.map(b => {
                const time = b.time;
                const isAvailable = b.availableToBook;

                const bookingClass = classNames(
                  'booking',
                  {
                    booked: !isAvailable,
                  },
                );

                return (
                  <div className={bookingClass} key={`booking-${time}`} onTouchTap={this._handleOpen.bind(this, b)}>
                    <span className='time' key={`time-${time}`}>
                      {moment(new Date(time)).format('h:mm a')}
                    </span>
                    {
                      isAvailable &&
                      <span className='booking-detail'>
                        Available (click to book)
                      </span>
                    }
                    {
                      !isAvailable &&
                      <span className='booking-detail booked'>
                        Booked
                      </span>
                    }
                  </div>
                )
              })
            }
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
      </Paper>
    );
  }
}

AvailabilityList.propTypes = {
  bookings: PropTypes.object,
};

export default AvailabilityList;
