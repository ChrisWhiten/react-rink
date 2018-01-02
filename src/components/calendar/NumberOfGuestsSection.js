import React from 'react';
import {
  FormGroup,
  FormControl,
  Col,
} from 'react-bootstrap';
import People from 'material-ui/svg-icons/social/people';

import './styles/NumberOfGuestsSection.css';

class NumberOfGuestsSection extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedBooking: null,
      numberOfGuests: 0,
    };

    this.handleNumberOfPlayersChanged = this.handleNumberOfPlayersChanged.bind(this);
  }

  handleNumberOfPlayersChanged(event) {
    this.setState({
      numberOfGuests: parseInt(event.target.value, 10),
    });
  }


  render() {
    return (
      <div className='number-of-guests-section'>
        <Col md={11} lg={11} sm={11} xs={11}>
          <FormGroup controlId='formControlsSelect'>
            <FormControl componentClass='select' onChange={this.handleNumberOfPlayersChanged}>
              <option value='number-of-players'>Number of Players</option>
              <option value='1'>1 Player</option>
              <option value='2'>2 Players</option>
              <option value='3'>3 Players</option>
              <option value='4'>4 Players</option>
              <option value='5'>5 Players</option>
            </FormControl>
          </FormGroup>
        </Col>
        <Col md={1} lg={1} sm={1} xs={1}>
          <People />
        </Col>
      </div>
    );
  }
}

NumberOfGuestsSection.propTypes = {
};

export default NumberOfGuestsSection;