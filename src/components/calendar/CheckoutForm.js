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
  constructor(props) {
    super(props);

    this.state = {
      active: false,
    };

    this.payLater = this.payLater.bind(this);
  }

  payLater() {
    const defaultCost = 2400;
    console.log('pay later??');
    console.log(this.personalInfoRef.state);
    console.log(this.guestsSection.state);
    console.warn(this.props.booking);
    if (this.props.payLater) {
      this.props.payLater({
        leaderFirstName: this.personalInfoRef.state.firstName,
        leaderLastName: this.personalInfoRef.state.lastName,
        leaderEmail: this.personalInfoRef.state.email,
        leaderPhoneNumber: this.personalInfoRef.state.phoneNumber,
        slotCount: this.guestsSection.state.numberOfGuests,
        locationName: this.props.location.locationName,
        locationId: this.props.location.locationId,
        start: new Date(this.props.booking.availabilitySlot.startTime).getTime(),
        duration: this.props.booking.availabilitySlot.duration,
        paidAmount: 0,
        bookingCost: defaultCost * this.guestsSection.state.numberOfGuests,
      }, (bookingCreated => {
        console.log('made it to checkoutform bookingCreated', bookingCreated);
      }));
    }
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
          <NumberOfGuestsSection ref={(guestsSection) => this.guestsSection = guestsSection} />
          <PersonalInfoSection ref={(personalInfoRef) => this.personalInfoRef = personalInfoRef} />
          <Col sm={12} md={12} xs={12}>
            <Checkbox>
              I have read and agree with the waiver
            </Checkbox>
            <CardSection />
            <button className='checkout-button'>Confirm order <small>($24)</small></button>
            <div className='pay-later-button' onTouchTap={this.payLater}><a>Or confirm now and pay on-site</a></div>
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