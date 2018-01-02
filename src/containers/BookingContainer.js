import { connect } from 'react-redux';
import BookingPage from '../pages/BookingPage';
import { 
  fetchBookings,
  createBooking,
} from '../actions';


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchBookings: (start, end) => {
      dispatch(fetchBookings(start, end));
    },
    createBooking: (booking, cb) => {
      dispatch(createBooking(booking, cb));
    },
  }
};

const mapStateToProps = (state) => {
  return {
    bookings: state.bookings,
  };
};

const BookingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BookingPage);

export default BookingContainer;