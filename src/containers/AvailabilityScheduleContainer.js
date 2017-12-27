import { connect } from 'react-redux';
import AvailabilitySchedulePage from '../pages/AvailabilitySchedulePage';
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

const AvailabilityScheduleContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AvailabilitySchedulePage);

export default AvailabilityScheduleContainer;