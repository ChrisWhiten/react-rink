import React, {PropTypes} from 'react';
import {CardElement} from 'react-stripe-elements';

// import './styles/CardSection.css';

class CardSection extends React.Component {
  constructor() {
    super();

    this.state = {
      active: false,
      selectedBooking: null,
    };
  }

  render() {
    const style = {
      base: {
        color: '#32325d',
        lineHeight: '18px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };
    
    return (
      <CardElement style={style} />
    );
  }
}

CardSection.propTypes = {
  booking: PropTypes.object,
  screenHeight: PropTypes.number,
};

export default CardSection;