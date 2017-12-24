import React, {PropTypes} from 'react';
import {injectStripe} from 'react-stripe-elements';
import {
  Form,
  Col,
  Checkbox,
} from 'react-bootstrap';

import PersonalInfoSection from './PersonalInfoSection';
import CardSection from './CardSection';
import DateAndTimeSection from './DateAndTimeSection';
import NumberOfGuestsSection from './NumberOfGuestsSection';

import './styles/CheckoutForm.css';

class CheckoutForm extends React.Component {
  constructor() {
    super();

    this.state = {
      active: false,
      selectedBooking: null,
    };
  }

  _handleSubmit = (ev) => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();
    
    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    this.props.stripe.createToken({name: 'Jenny Rosen'}).then(({token}) => {
      console.log('Received Stripe token:', token);
    });

    // However, this line of code will do the same thing:
    // this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});
  }

  render() {
    return (
      <Form onSubmit={this._handleSubmit}>
        <DateAndTimeSection />
        <Col sm={6} md={6} xs={12} smOffset={3} mdOffset={3}>
          <NumberOfGuestsSection />
          <PersonalInfoSection />
          <Col sm={12} md={12} xs={12}>
            <Checkbox>
              I have read and agree with the waiver
            </Checkbox>
            <CardSection />
            <button className='checkout-button'>Confirm order <small>($24)</small></button>
            <div className='pay-later-button'><a>Or confirm now and pay on-site</a></div>
          </Col>
        </Col>
      </Form>
    );
  }
}

CheckoutForm.propTypes = {
  booking: PropTypes.object,
  screenHeight: PropTypes.number,
};

export default injectStripe(CheckoutForm);