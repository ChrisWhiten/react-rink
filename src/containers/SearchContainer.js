import { connect } from 'react-redux';
import SearchPage from '../pages/SearchPage';
import { 
  searchEvents,
} from '../actions';


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    searchEvents: (start, end) => {
      dispatch(searchEvents(start, end));
    }
  }
};

const mapStateToProps = (state) => {
  return {
    searchableEvents: state.events.searchableEvents,
  };
};

const SearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPage);

export default SearchContainer;