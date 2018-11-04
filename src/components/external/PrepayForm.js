import React from 'react';
import PropTypes from 'prop-types';
import { injectStripe } from 'react-stripe-elements';
import {
  Form
  // Checkbox,
} from 'react-bootstrap';

import CardSection from '../calendar/CardSection';

import '../calendar/styles/CheckoutForm.css';

class PrepayForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  renderCurrency(c) {
    let dollarAmount = c / 100;

    if (c % 100 === 0) {
      return parseInt(dollarAmount, 10).toString();
    }

    return dollarAmount.toFixed(2);
  }

  handleSubmit = ev => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();

    const cost = this.props.booking.bookingCost;

    const payments = [cost];

    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    this.props.stripe.createToken({ name: 'Jenny Rosen' }).then(({ token }) => {
      console.log('Received Stripe token:', token);

      // this isn't the same thing, but hacking it together to get the flow right.
      // TODO: fix me

      const updatedBooking = Object.assign({}, this.props.booking, {
        payments
      });
      this.props.paymentProcessed(updatedBooking, cost);
    });

    // However, this line of code will do the same thing:
    // this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});
  };

  render() {
    console.log('prepay form booking', this.props.booking);
    const cost = this.props.booking.bookingCost;
    return (
      <Form onSubmit={this.handleSubmit}>
        <CardSection />
        <button className="checkout-button">
          Confirm order <small>(${this.renderCurrency(cost)})</small>
        </button>
      </Form>
    );
  }
}

PrepayForm.propTypes = {
  booking: PropTypes.object,
  screenHeight: PropTypes.number
};

export default injectStripe(PrepayForm);
