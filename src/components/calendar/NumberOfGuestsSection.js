import React, {PropTypes} from 'react';
import {
  HelpBlock,
  FormGroup,
  ControlLabel,
  FormControl,
  Col,
} from 'react-bootstrap';
import People from 'material-ui/svg-icons/social/people';

import './styles/NumberOfGuestsSection.css';

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

class NumberOfGuestsSection extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedBooking: null,
    };
  }


  render() {
    return (
      <div className='number-of-guests-section'>
        <Col md={11} lg={11} sm={11} xs={11}>
          <FormGroup controlId='formControlsSelect'>
            <FormControl componentClass='select'>
              <option value='1'>1 Guest</option>
              <option value='2'>2 Guests</option>
              <option value='3'>3 Guests</option>
              <option value='4'>4 Guests</option>
              <option value='5'>5 Guests</option>
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