import React, {PropTypes} from 'react';

// import './styles/AddressSection.css';

class AddressSection extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedBooking: null,
    };
  }


  render() {
    return (
      <div>Address section goes here</div>
    );
  }
}

AddressSection.propTypes = {
  booking: PropTypes.object,
};

export default AddressSection;