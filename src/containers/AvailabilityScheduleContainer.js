import { connect } from 'react-redux';
import AvailabilitySchedulePage from '../pages/AvailabilitySchedulePage';
import { 
  fetchBookings,
  fetchSchedules,
  deleteSchedule,
} from '../actions';


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchBookings: (start, end) => {
      dispatch(fetchBookings(start, end));
    },
    fetchSchedules: (start, end) => {
      dispatch(fetchSchedules(start, end));
    },
    deleteSchedule: (id) => {
      dispatch(deleteSchedule(id));
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