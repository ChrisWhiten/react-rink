import { connect } from 'react-redux';
import ExternalPage from '../pages/ExternalPage';
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

const ExternalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExternalPage);

export default ExternalContainer;