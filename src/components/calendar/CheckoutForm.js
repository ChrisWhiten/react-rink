import React, {PropTypes} from 'react';
import {injectStripe} from 'react-stripe-elements';

import AddressSection from './AddressSection';
import CardSection from './CardSection';

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
      <form onSubmit={this._handleSubmit}>
        <AddressSection />
        <CardSection />
        <button>Confirm order</button>
      </form>
    );
  }
}

CheckoutForm.propTypes = {
  booking: PropTypes.object,
  screenHeight: PropTypes.number,
};

export default injectStripe(CheckoutForm);