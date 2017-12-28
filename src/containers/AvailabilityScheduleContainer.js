import { connect } from 'react-redux';
import AvailabilitySchedulePage from '../pages/AvailabilitySchedulePage';
import { 
  fetchBookings,
  fetchSchedules,
} from '../actions';


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchBookings: (start, end) => {
      dispatch(fetchBookings(start, end));
    },
    fetchSchedules: (start, end) => {
      dispatch(fetchSchedules(start, end));
    },
  }
};

const mapStateToProps = (state) => {
  return {
    bookings: state.bookings,
    schedules: state.schedules,
  };
};

const AvailabilityScheduleContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AvailabilitySchedulePage);

export default AvailabilityScheduleContainer;