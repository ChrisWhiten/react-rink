import React from 'react';
import PropTypes from 'prop-types';
import { injectStripe } from 'react-stripe-elements';
import Snackbar from 'material-ui/Snackbar';
import {
  Form,
  Col
  // Checkbox,
} from 'react-bootstrap';

import PersonalInfoSection from './PersonalInfoSection';
import CardSection from './CardSection';
import DateAndTimeSection from './DateAndTimeSection';
import NumberOfGuestsSection from './NumberOfGuestsSection';

import './styles/CheckoutForm.css';

function getAvailableSlotCount(slot) {
  let availableSlotCount = slot.availabilitySlot.totalSlots;
  if (slot.availabilitySlot.bookings) {
    slot.availabilitySlot.bookings.forEach(b => {
      availableSlotCount -= b.slotCount;
    });
  }

  if (slot.availabilitySlot.blocks) {
    slot.availabilitySlot.blocks.forEach(b => {
      availableSlotCount -= b.slotCount;
    });
  }

  return availableSlotCount;
}

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      cost: 0,
      guestCount: 0,
      showSnackbar: false,
      snackbarMessage: ''
    };

    this.payLater = this.payLater.bind(this);
    this.onGuestCountChange = this.onGuestCountChange.bind(this);
    this.hideSnackbar = this.hideSnackbar.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.booking &&
      this.props.booking &&
      nextProps.booking.id !== this.props.booking.id
    ) {
      this.personalInfoRef.clear();
    }
  }

  onGuestCountChange(guestCount) {
    this.setState({
      cost: guestCount * 2400,
      guestCount
    });
  }

  renderCurrency(c) {
    let dollarAmount = c / 100;

    if (c % 100 === 0) {
      return parseInt(dollarAmount, 10).toString();
    }

    return dollarAmount.toFixed(2);
  }

  validateForm() {
    if (!this.personalInfoRef.state.firstName) {
      this.setState({
        showSnackbar: true,
        snackbarMessage: 'Please provide a first name'
      });

      return false;
    }

    if (!this.personalInfoRef.state.lastName) {
      this.setState({
        showSnackbar: true,
        snackbarMessage: 'Please provide a last name'
      });

      return false;
    }

    if (!this.personalInfoRef.state.email) {
      this.setState({
        showSnackbar: true,
        snackbarMessage: 'Please provide an email'
      });

      return false;
    }

    if (!this.personalInfoRef.state.phoneNumber) {
      this.setState({
        showSnackbar: true,
        snackbarMessage: 'Please provide a phone number'
      });

      return false;
    }

    if (!this.guestsSection.state.numberOfGuests) {
      this.setState({
        showSnackbar: true,
        snackbarMessage: 'Please select how many guests will join'
      });

      return false;
    }

    return true;
  }

  hideSnackbar() {
    this.setState({
      showSnackbar: false
    });
  }

  payLater() {
    const defaultCost = 2400;
    console.log('pay later');
    console.log(this.personalInfoRef.state);
    console.log(this.guestsSection.state);
    console.warn(this.props.booking);

    if (!this.validateForm()) {
      return;
    }

    if (this.props.payLater) {
      this.props.payLater(
        {
          leaderFirstName: this.personalInfoRef.state.firstName,
          leaderLastName: this.personalInfoRef.state.lastName,
          leaderEmail: this.personalInfoRef.state.email,
          leaderPhoneNumber: this.personalInfoRef.state.phoneNumber,
          slotCount: this.guestsSection.state.numberOfGuests,
          locationName: this.props.location.locationName,
          locationId: this.props.location.locationId,
          start: new Date(
            this.props.booking.availabilitySlot.startTime
          ).getTime(),
          duration: this.props.booking.availabilitySlot.duration,
          bookingCost: defaultCost * this.guestsSection.state.numberOfGuests,
          checkedIn: 0
        },
        bookingCreated => {
          console.log('made it to checkoutform bookingCreated', bookingCreated);
        }
      );
    }
  }

  _handleSubmit = ev => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();

    if (!this.validateForm()) {
      return;
    }

    const defaultCost = 2400;
    const bookingCost = defaultCost * this.guestsSection.state.numberOfGuests;

    // TODO: use rules instead
    const forcePrePay = this.state.guestCount > 10;
    // TODO: payments currently hardcoded
    const payments = forcePrePay ? [bookingCost] : [];

    const func = forcePrePay
      ? this.props.stripe.createToken
      : () => Promise.resolve('fake token');

    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    func({ name: 'Jenny Rosen' }).then(({ token }) => {
      console.log('Received Stripe token:', token);

      // this isn't the same thing, but hacking it together to get the flow right.
      // TODO: fix me

      this.props.createPaidBooking(
        {
          checkedIn: 0,
          leaderFirstName: this.personalInfoRef.state.firstName,
          leaderLastName: this.personalInfoRef.state.lastName,
          leaderEmail: this.personalInfoRef.state.email,
          leaderPhoneNumber: this.personalInfoRef.state.phoneNumber,
          slotCount: this.guestsSection.state.numberOfGuests,
          locationName: this.props.location.locationName,
          locationId: this.props.location.locationId,
          start: new Date(
            this.props.booking.availabilitySlot.startTime
          ).getTime(),
          duration: this.props.booking.availabilitySlot.duration,
          payments,
          bookingCost
        },
        bookingCreated => {
          console.log('made it to checkoutform bookingCreated', bookingCreated);
        }
      );
    });

    // However, this line of code will do the same thing:
    // this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});
  };

  render() {
    let slotCount = 0;

    if (this.props.booking && this.props.booking.availabilitySlot) {
      slotCount = getAvailableSlotCount(this.props.booking);
    }

    // TODO: use rules instead
    const forcePrePay = this.state.guestCount > 10;

    const proposedTime = this.props.booking ? this.props.booking.time : '';
    const proposedSlotCount = this.props.booking
      ? this.props.booking.slotCount
      : 0;
    return (
      <Form onSubmit={this._handleSubmit}>
        <DateAndTimeSection
          location={this.props.location}
          time={proposedTime}
          slotCount={proposedSlotCount}
        />
        <Col
          sm={6}
          md={6}
          xs={12}
          smOffset={3}
          mdOffset={3}
          className="checkout-form-container"
        >
          <NumberOfGuestsSection
            ref={guestsSection => (this.guestsSection = guestsSection)}
            slotCount={slotCount}
            onGuestCountChange={this.onGuestCountChange}
          />
          <PersonalInfoSection
            ref={personalInfoRef => (this.personalInfoRef = personalInfoRef)}
          />
          <Col sm={12} md={12} xs={12}>
            {/* <Checkbox>
              Yes, I have read and agree with the waiver
            </Checkbox> */}
            {forcePrePay && <CardSection />}
            <button className="checkout-button" disabled={!this.state.cost}>
              Confirm order{' '}
              {forcePrePay && (
                <small>(${this.renderCurrency(this.state.cost)})</small>
              )}
            </button>
          </Col>
        </Col>

        <Snackbar
          open={this.state.showSnackbar}
          message={this.state.snackbarMessage}
          autoHideDuration={4000}
          onRequestClose={this.hideSnackbar}
        />
      </Form>
    );
  }
}

CheckoutForm.propTypes = {
  booking: PropTypes.object,
  screenHeight: PropTypes.number
};

export default injectStripe(CheckoutForm);
// export default CheckoutForm
