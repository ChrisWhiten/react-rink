import React from 'react';
import PropTypes from 'prop-types';
import {Elements} from 'react-stripe-elements';
import CheckCircle from 'material-ui/svg-icons/action/check-circle';
import CircularProgress from 'material-ui/CircularProgress';
import AttachMoney from 'material-ui/svg-icons/editor/attach-money';
import EventIcon from 'material-ui/svg-icons/action/event';
import People from 'material-ui/svg-icons/social/people';
import moment from 'moment';
import {
  Col,
} from 'react-bootstrap';

import './BookingCompleted.css';

class BookingCompleted extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      creating: false,
      created: false,
    };
  }

  _onClose() {
    this.props.onRequestClose();
  }

  renderCurrency(c) {
    let dollarAmount = c/100;

    if (c % 100 === 0) {
      return parseInt(dollarAmount, 10).toString();
    }

    return dollarAmount.toFixed(2);
  }

  render() {
    const b = this.props.booking;
    if (!b) return null;

    const peopleText = b.slotCount === 1 ? '1 person' : `${b.slotCount} people`;

    const paidAmount = b.payments ? b.payments.reduce((a, b) => { return a + b; }, 0) : 0;
    let moneyText = 'Booking pre-paid in full'
    if (paidAmount < b.bookingCost) {
      moneyText = `$${(this.renderCurrency(b.bookingCost - paidAmount))} to be paid on-site`;
    }

    return (
      <div className='booking-completed-form'>
        <Col sm={6} md={6} xs={12} smOffset={3} mdOffset={3}>
          <div className='booking-completed-content'>
            <div className='completed-announcement'>
              <CheckCircle className='booking-confirmed-check' />
              <h3 className='announcement-text'>Thanks {b.leaderFirstName}, you're all set!</h3>
            </div>

            <div className='completed-details section'>
              <div className='summary-details'>
                <h4>{b.locationName}</h4>
                <div className='summary-detail'>
                  <EventIcon className='summary-detail-event-icon' />
                  <h5>{moment(b.start).format('dddd, MMM Do @ LT')}</h5>
                </div>

                <div className='summary-detail'>
                  <People className='summary-detail-people-icon' />
                  <h5>{peopleText}</h5>
                </div>

                <div className='summary-detail'>
                  <AttachMoney className='summary-detail-money-icon' />
                  <h5>{moneyText}</h5>
                </div>
              </div>

              <div className='invitation-option section'>
                <div className='section-title invitation-title'>
                  <h4 className='section-title-text'>
                    Invite friends
                  </h4>
                </div>
                <div className='section-content invitation-content'>
                  <h5>{b.locationName} is more fun when friends are involved</h5>
                  <button>Invite via Email</button>
                  <button>Invite through Facebook</button>
                </div>
              </div>

              <div className='info-option section'>
                <div className='section-title info-title'>
                  <h4 className='section-title-text'>
                    Info
                  </h4>
                </div>
                <div className='section-content info-content'>
                  {JSON.stringify(this.props)}
                  <button>Email details</button>
                  <button>Print details</button>
                  <button>Get directions</button>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </div>
    );
  }
}

export default BookingCompleted;
