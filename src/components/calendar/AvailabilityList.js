import React, {PropTypes} from 'react';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import moment from 'moment';
import BookingPanel from './BookingPanel';

import './AvailabilityList.css';

class AvailabilityList extends React.Component {
  constructor() {
    super();

    this.state = {
      open: false,
      selectedBooking: null,
    };
  }

  _handleOpen(b) {
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

    return (
      <Paper className='availability-list'>
        <div className='internal-container'>
          <div className='list'>
            {
              bookings.map(b => {
                const time = b.time;
                return (
                  <div className='booking' key={`booking-${time}`} onTouchTap={this._handleOpen.bind(this, b)}>
                    <span className='time' key={`time-${time}`}>
                      {moment(new Date(time)).format('h:mm a')}
                    </span>
                    <span className='booking-detail'>
                      Available (click to book)
                    </span>
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
  bookings: PropTypes.array,
};

export default AvailabilityList;
