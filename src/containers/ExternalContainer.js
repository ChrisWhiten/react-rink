import { connect } from 'react-redux';
import ExternalPage from '../pages/ExternalPage';
import {
  fetchBookings,
  createBooking,
  changeDateInterval,
  changeSelectedLocations,
  loadPage,
  processPayment
} from '../actions';

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchBookings: (start, end) => {
      dispatch(fetchBookings(start, end));
    },
    createBooking: (booking, slot, cb) => {
      dispatch(createBooking(booking, slot, cb));
    },
    changeDateInterval: interval => {
      dispatch(changeDateInterval(interval));
    },
    changeSelectedLocations: locations => {
      dispatch(changeSelectedLocations(locations));
    },
    loadPage: pageName => {
      dispatch(loadPage(pageName));
    },
    paymentProcessed: (updatedBooking, paymentAmount, cb) => {
      dispatch(processPayment(updatedBooking, paymentAmount, cb));
    }
  };
};

const mapStateToProps = state => {
  return {
    bookings: state.bookings,
    locations: state.locations,
    filterOptions: state.filterOptions
  };
};

const ExternalContainer = connect(mapStateToProps, mapDispatchToProps)(
  ExternalPage
);

export default ExternalContainer;
