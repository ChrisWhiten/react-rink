import { connect } from 'react-redux';
import EditAvailabilitySchedulePage from '../pages/EditAvailabilitySchedulePage';
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

const EditAvailabilityScheduleContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditAvailabilitySchedulePage);

export default EditAvailabilityScheduleContainer;