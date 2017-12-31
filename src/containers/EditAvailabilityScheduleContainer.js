import { connect } from 'react-redux';
import EditAvailabilitySchedulePage from '../pages/EditAvailabilitySchedulePage';
import { 
  fetchSchedule,
  updateSchedule,
  createSchedule,
} from '../actions';


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchSchedule: (id) => {
      dispatch(fetchSchedule(id));
    },
    updateSchedule: (schedule, cb) => {
      dispatch(updateSchedule(schedule, cb));
    },
    createSchedule: (schedule, cb) => {
      dispatch(createSchedule(schedule, cb));
    }
  };
};

const mapStateToProps = (state) => {
  return {
    schedule: state.schedule,
    locations: state.locations,
  };
};

const EditAvailabilityScheduleContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditAvailabilitySchedulePage);

export default EditAvailabilityScheduleContainer;