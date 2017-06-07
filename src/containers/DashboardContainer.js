import { connect } from 'react-redux';
import DashboardPage from '../pages/DashboardPage';
import { 
  declineInvitation,
} from '../actions';


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    declineInvitation: (id) => {
      dispatch(declineInvitation(id))
    }
  }
};

const mapStateToProps = (state) => {
  return {
    invitations: state.invitations,
    upcomingOrganized: state.events.upcomingOrganized,
    upcomingParticipations: state.events.upcomingParticipations,
    isLoaded: state.events.isLoaded,
  };
};

const DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardPage);

export default DashboardContainer;