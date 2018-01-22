import { connect } from 'react-redux';
import BookingPage from '../pages/BookingPage';
import {
  fetchBookings,
  createBooking,
  updateBooking,
  createSlot,
  fetchWalkins,
} from '../actions';


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchBookings: (start, end) => {
      dispatch(fetchBookings(start, end));
    },
    createBooking: (booking, slot, cb) => {
      dispatch(createBooking(booking, slot, cb));
    },
    updateBooking: (booking, cb) => {
      dispatch(updateBooking(booking, cb));
    },
    createSlot: (slot, cb) => {
      dispatch(createSlot(slot, cb));
    },
    fetchWalkins: () => {
      dispatch(fetchWalkins());
    },
  };
};

const mapStateToProps = (state) => {
  return {
    bookings: state.bookings,
    walkins: state.walkins,
    locations: state.locations,
  };
};

const BookingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BookingPage);

export default BookingContainer;