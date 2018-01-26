import React from 'react';
import {
  FormGroup,
  FormControl,
  Col,
} from 'react-bootstrap';

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
    const guestCount = parseInt(event.target.value, 10);
    this.setState({
      numberOfGuests: guestCount,
    });

    this.props.onGuestCountChange(guestCount);
  }

  reset() {
    // TODO: change value of actual select component
    // this.setState({
    //   numberOfGuests: 0,
    // });
  }

  renderOptions(slotCount) {
    let options = [];
    for (let i = 0; i < slotCount; i++) {
      if (i === 0) {
        options.push(<option key={`option-${i}`} value='1'>1 Player</option>);
      } else {
        options.push(<option key={`option-${i}`} value={i + 1}>{i + 1} Players</option>);
      }
    }
    return options;
  }


  render() {
    const style = {};
    if (!this.state.numberOfGuests) {
      style.color = '#999';
    } else {
      style.color = '#555';
    }

    return (
      <div className='number-of-guests-section'>
        <Col md={12} lg={12} sm={12} xs={12}>
          <FormGroup controlId='formControlsSelect'>
            <FormControl style={style} componentClass='select' onChange={this.handleNumberOfPlayersChanged}>
              <option value='number-of-players'>Number of Players</option>
              { this.renderOptions(this.props.slotCount) }
            </FormControl>
          </FormGroup>
        </Col>
      </div>
    );
  }
}

NumberOfGuestsSection.propTypes = {
};

export default NumberOfGuestsSection;