import { connect } from 'react-redux';
import ExternalPage from '../pages/ExternalPage';
import {
  fetchBookings,
  createBooking,
} from '../actions';


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchBookings: (start, end) => {
      dispatch(fetchBookings(start, end));
    },
    createBooking: (booking, slot, cb) => {
      dispatch(createBooking(booking, slot, cb));
    },
  }
};

const mapStateToProps = (state) => {
  return {
    bookings: state.bookings,
    locations: state.locations,
  };
};

const ExternalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExternalPage);

export default ExternalContainer;