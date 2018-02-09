import { connect } from 'react-redux';
import BookingItemPage from '../pages/BookingItemPage';
import {
  fetchBooking,
  updateBooking,
  addNoteToBooking,
} from '../actions';


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    // fetchBookings: (start, end) => {
    //   dispatch(fetchBookings(start, end));
    // },
    // createBooking: (booking, slot, cb) => {
    //   dispatch(createBooking(booking, slot, cb));
    // },
    fetchBooking: (id) => {
      dispatch(fetchBooking(id));
    },
    updateBooking: (booking, cb) => {
      dispatch(updateBooking(booking, cb));
    },
    addNote: (id, note, cb) => {
      dispatch(addNoteToBooking(id, note, cb));
    }
  }
};

const mapStateToProps = (state) => {
  return {
    booking: state.booking,
  };
};

const BookingItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BookingItemPage);

export default BookingItemContainer;