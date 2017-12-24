import React, {PropTypes} from 'react';
import {
  HelpBlock,
  FormGroup,
  ControlLabel,
  FormControl,
  Col,
} from 'react-bootstrap';

import './styles/PersonalInfoSection.css';

function FieldGroup({ id, label, help, validationState, ...props }) {
  return (
    <FormGroup controlId={id} validationState={validationState}>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

class PersonalInfoSection extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedBooking: null,
      firstName: '',
    };

    // this.notEmpty = this._notEmpty.bind(this);
    this.handleChange = this._handleChange.bind(this);
  }

  // _notEmpty() {
  //   if (this.state.firstName === null) {
  //     return null;
  //   }

  //   return this.state.firstName.length > 0 ? 'success' : 'error';
  // }

  _handleChange(e) {
    this.setState({
      firstName: e.target.value,
    });
  }


  render() {
    return (
      <div>
        <Col md={6} lg={6} sm={6} xs={12}>
          <FieldGroup
            id='first-name-id'
            type='text'
            placeholder='First name'
            // validationState={this.notEmpty()}
            onChange={this.handleChange}
            value={this.state.firstName}
          />
        </Col>
        <Col md={6} lg={6} sm={6} xs={12}>
          <FieldGroup
            id='last-name-id'
            type='text'
            placeholder='Last name'
          />
        </Col>
        <Col md={6} lg={6} sm={6} xs={12}>
          <FieldGroup
            id='email-id'
            type='text'
            placeholder='Email'
          />
        </Col>
        <Col md={6} lg={6} sm={6} xs={12}>
          <FieldGroup
            id='phone-number-id'
            type='text'
            placeholder='Phone number'
          />
        </Col>
      </div>
    );
  }
}

PersonalInfoSection.propTypes = {
};

export default PersonalInfoSection;