import { connect } from 'react-redux';
import BookingPage from '../pages/BookingPage';
import { 
  fetchBookings,
} from '../actions';


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchBookings: (start, end) => {
      dispatch(fetchBookings(start, end))
    }
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