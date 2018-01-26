import React from 'react';
import {
  HelpBlock,
  FormGroup,
  FormControl,
  Col,
} from 'react-bootstrap';
import MaskedInput from 'react-text-mask';

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
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
  }

  // _notEmpty() {
  //   if (this.state.firstName === null) {
  //     return null;
  //   }

  //   return this.state.firstName.length > 0 ? 'success' : 'error';
  // }

  handleFirstNameChange(e) {
    this.setState({
      firstName: e.target.value,
    });
  }

  handleLastNameChange(e) {
    this.setState({
      lastName: e.target.value,
    });
  }

  handleEmailChange(e) {
    this.setState({
      email: e.target.value,
    });
  }

  handlePhoneNumberChange(e) {
    this.setState({
      phoneNumber: e.target.value,
    });
  }

  clear() {
    this.setState({
      phoneNumber: '',
      email: '',
      lastName: '',
      firstName: '',
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
            onChange={this.handleFirstNameChange}
            value={this.state.firstName}
          />
        </Col>
        <Col md={6} lg={6} sm={6} xs={12}>
          <FieldGroup
            id='last-name-id'
            type='text'
            onChange={this.handleLastNameChange}
            placeholder='Last name'
          />
        </Col>
        <Col md={6} lg={6} sm={6} xs={12}>
          <FieldGroup
            id='email-id'
            type='email'
            placeholder='Email'
            onChange={this.handleEmailChange}
          />
        </Col>
        <Col md={6} lg={6} sm={6} xs={12}>
          <MaskedInput
            className='form-control'
            mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
            placeholder='(613) 555-5555'
            name='phone-number'
            id='phone-number-id'
            type='tel'
            onChange={this.handlePhoneNumberChange}
          />
          {/* <FieldGroup
            id='phone-number-id'
            type='text'
            placeholder='Phone number'
            onChange={this.handlePhoneNumberChange}
          /> */}
        </Col>
      </div>
    );
  }
}

PersonalInfoSection.propTypes = {
};

export default PersonalInfoSection;