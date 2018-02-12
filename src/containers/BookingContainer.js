import { connect } from 'react-redux';
import BookingPage from '../pages/BookingPage';
import {
  fetchBookings,
  createBooking,
  updateBooking,
  createSlot,
  fetchWalkins,
  createBlock,
  deleteBlock,
  changeDateInterval,
  changeSelectedLocations,
  loadPage,
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
    createBlock: (block, slot, cb) => {
      dispatch(createBlock(block, slot, cb));
    },
    deleteBlock: (block, slot, cb) => {
      dispatch(deleteBlock(block, slot, cb));
    },
    changeDateInterval: (interval) => {
      dispatch(changeDateInterval(interval));
    },
    changeSelectedLocations: (locations) => {
      dispatch(changeSelectedLocations(locations));
    },
    loadPage: (pageName) => {
      dispatch(loadPage(pageName));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    bookings: state.bookings,
    walkins: state.walkins,
    locations: state.locations,
    filterOptions: state.filterOptions,
  };
};

const BookingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BookingPage);

export default BookingContainer;