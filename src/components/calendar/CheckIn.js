import PersonPinCirlce from 'material-ui/svg-icons/maps/person-pin-circle';

import React, {PropTypes} from 'react';
import './styles/CheckIn.css';

class CheckIn extends React.Component {
  constructor() {
    super();

    this.state = {
      active: false,
      selectedBooking: null,
    };
  }

  render() {
    return (
      <div className='check-in'>

        <div className='check-in-icon-container'>
          <PersonPinCirlce className='check-in-icon' />
        </div>
        <div className='check-in-text'>Check-in</div>
      </div>
    );
  }
}

CheckIn.propTypes = {
  onRequestClose: PropTypes.func,
};

export default CheckIn;
