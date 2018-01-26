import React from 'react';
// import PropTypes from 'prop-types';
import CheckCircle from 'material-ui/svg-icons/action/check-circle';
import Info from 'material-ui/svg-icons/action/info';
// import CircularProgress from 'material-ui/CircularProgress';
import AttachMoney from 'material-ui/svg-icons/editor/attach-money';
import GroupAdd from 'material-ui/svg-icons/social/group-add';
import EventIcon from 'material-ui/svg-icons/action/event';
import People from 'material-ui/svg-icons/social/people';
import RaisedButton from 'material-ui/RaisedButton';
import Print from 'material-ui/svg-icons/action/print';
import ComingSoonModal from '../booking/ComingSoonModal';
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
      showComingSoonModal: false,
    };

    this.loadInvitationForm = this.loadInvitationForm.bind(this);
    this.printDetails = this.printDetails.bind(this);
    this.hideComingSoonModal = this.hideComingSoonModal.bind(this);
  }

  hideComingSoonModal() {
    this.setState({
      showComingSoonModal: false,
    });
  }

  printDetails() {
    console.log(JSON.stringify(this.props));
    this.setState({
      showComingSoonModal: true,
    });
  }

  loadInvitationForm() {
    console.log('load invitation form');
    this.setState({
      showComingSoonModal: true,
    });
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

              <div className='info-option section'>
                <div className='section-title info-title'>
                  <Info className='things-to-know-info-icon' />
                  <h4 className='section-title-text'>
                    Things to know
                  </h4>
                </div>
                <div className='section-content things-to-know-content'>
                  <ul>
                    <li><h5>Please arrive 15 minutes early for registration and setup.</h5></li>
                    <li><h5>There is plenty of free parking on site and washrooms/change rooms.</h5></li>
                    <li><h5>Please bring athletic footwear and clothing</h5></li>
                  </ul>
                </div>
              </div>

              <div className='actions-option section'>
                <div className='section-content actions-content'>
                  <RaisedButton
                    labelColor='#fff'
                    label='Invite your friends'
                    backgroundColor='#0088cc'
                    icon={<GroupAdd className='invite-friends-button' />}
                    onClick={this.loadInvitationForm}
                  />
                  <RaisedButton
                    labelColor='#fff'
                    label='Print details'
                    backgroundColor='#f54'
                    icon={<Print className='print-details-button' />}
                    onClick={this.printDetails}
                  />
                </div>
              </div>
            </div>
          </div>
        </Col>
        <ComingSoonModal ok={this.hideComingSoonModal} show={this.state.showComingSoonModal} hide={this.hideComingSoonModal} />
      </div>
    );
  }
}

export default BookingCompleted;
