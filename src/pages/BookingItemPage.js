import React, { Component } from 'react';
import moment from 'moment';
import CircularProgress from 'material-ui/CircularProgress';
import AddPaymentModal from '../components/booking/AddPaymentModal';
import CancelBookingModal from '../components/booking/CancelBookingModal';
import DateAndTimeSection from '../components/calendar/DateAndTimeSection';
import UncancelBookingModal from '../components/booking/UncancelBookingModal';
import EditParticipantsModal from '../components/booking/EditParticipantsModal';
import ContactMail from 'material-ui/svg-icons/communication/email';
import AttachMoney from 'material-ui/svg-icons/editor/attach-money';
import People from 'material-ui/svg-icons/social/people';
import Block from 'material-ui/svg-icons/content/block';
import RaisedButton from 'material-ui/RaisedButton';
import ContactPhone from 'material-ui/svg-icons/communication/phone';
// import Subheader from 'material-ui/Subheader';
import EventIcon from 'material-ui/svg-icons/action/event';

import Divider from 'material-ui/Divider';
import {
  Col,
} from 'react-bootstrap';

import './styles/BookingItemPage.css';

class BookingItemPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showParticipantsModal: false,
      showAddPaymentModal: false,
      isUpdating: false,
      showCancelModal: false,
      showUncancelModal: false,
    };

    this.showPaymentModal = this.showPaymentModal.bind(this);
    this.hidePaymentModal = this.hidePaymentModal.bind(this);
    this.addPayment = this.addPayment.bind(this);
    this.showEditParticipantsModal = this.showEditParticipantsModal.bind(this);
    this.hideEditParticipantsModal = this.hideEditParticipantsModal.bind(this);
    this.editParticipantCount = this.editParticipantCount.bind(this);
    this.cancelBooking = this.cancelBooking.bind(this);
    this.showCancelBookingModal = this.showCancelBookingModal.bind(this);
    this.hideCancelBookingModal = this.hideCancelBookingModal.bind(this);
    this.showUncancelBookingModal = this.showUncancelBookingModal.bind(this);
    this.hideUncancelBookingModal = this.hideUncancelBookingModal.bind(this);
    this.uncancelBooking = this.uncancelBooking.bind(this);
  }

  componentDidMount() {
    this.props.fetchBooking(this.props.params.bookingId);
  }

  showUncancelBookingModal() {
    this.setState({
      showUncancelModal: true,
    });
  }

  hideUncancelBookingModal() {
    this.setState({
      showUncancelModal: false,
    });
  }

  showCancelBookingModal() {
    this.setState({
      showCancelModal: true,
    });
  }

  hideCancelBookingModal() {
    this.setState({
      showCancelModal: false,
    });
  }

  showPaymentModal() {
    this.setState({
      showAddPaymentModal: true,
    });
  }

  showEditParticipantsModal() {
    this.setState({
      showParticipantsModal: true,
    });
  }

  hideEditParticipantsModal() {
    this.setState({
      showParticipantsModal: false,
    });
  }

  hidePaymentModal() {
    this.setState({
      showAddPaymentModal: false,
    });
  }

  uncancelBooking() {
    this.setState({
      isUpdating: true,
    });

    const update = {
      id: this.props.booking.item.id,
      isCancelled: false,
      cancellationReason: null,
      otherCancellationReason: null,
    };

    this.props.updateBooking(update, (updatedBooking) => {
      this.setState({
        showUncancelModal: false,
        isUpdating: false,
      });
    });
  }

  cancelBooking(cancellationReason, otherCancellationReason) {
    this.setState({
      isUpdating: true,
    });

    const update = {
      id: this.props.booking.item.id,
      isCancelled: true,
      cancellationReason,
    };

    if (cancellationReason === 'other') {
      update.otherCancellationReason = otherCancellationReason;
    }

    this.props.updateBooking(update, (updatedBooking) => {
      this.setState({
        showCancelModal: false,
        isUpdating: false,
      });
    });
  }

  editParticipantCount(count) {
    this.setState({
      isUpdating: true,
    });

    this.props.updateBooking({
      slotCount: count,
      id: this.props.booking.item.id,
    }, (updatedBooking) => {
      this.setState({
        showParticipantsModal: false,
        isUpdating: false,
      });
    });
  }

  addPayment(amount) {
    this.setState({
      isUpdating: true,
    });

    this.props.updateBooking({
      id: this.props.booking.item.id,
      payments: [amount],
    }, (updatedBooking) => {
      this.setState({
        showAddPaymentModal: false,
        isUpdating: false,
      });
    });
  }

  renderCurrency(c) {
    let dollarAmount = c/100;

    if (c % 100 === 0) {
      return parseInt(dollarAmount, 10).toString();
    }

    return dollarAmount.toFixed(2);
  }

  renderHeader(b) {
    const paidAmount = b.payments ? b.payments.reduce((a, b) => { return a + b; }, 0) : 0;

    let paymentDetails = `$${this.renderCurrency(paidAmount)}/$${this.renderCurrency(b.bookingCost)} paid`;
    if (paidAmount < b.bookingCost) {
      paymentDetails +=  ` ($${(this.renderCurrency(b.bookingCost - paidAmount))} outstanding)`;
    }

    return (
      <div className='booking-item-summary'>
        <div className='booking-item'>
          <div className='booking-item-title'>
            <h4>Where:</h4>
          </div>
          <div className='booking-item-detail'>
            <h5>{b.locationName}</h5>
          </div>
        </div>
        <div className='booking-item'>
          <div className='booking-item-title'>
            <h4>When:</h4>
          </div>
          <div className='booking-item-detail'>
            <h5>{moment(b.start).format('dddd, MMM Do, YYYY @ LT')}</h5>
          </div>
        </div>
        <div className='booking-item'>
          <div className='booking-item-title'>
            <h4>Duration:</h4>
          </div>
          <div className='booking-item-detail'>
            <h5>{b.duration} minutes</h5>
          </div>
        </div>
        <div className='booking-item'>
          <div className='booking-item-title'>
            <h4>Participant count:</h4>
          </div>
          <div className='booking-item-detail'>
            <h5>{b.slotCount}</h5>
          </div>
        </div>
        <div className='booking-item'>
          <div className='booking-item-title'>
            <h4>Paid amount:</h4>
          </div>
          <div className='booking-item-detail'>
            <h5>{paymentDetails}</h5>
          </div>
        </div>
        <div className='booking-item'>
          <div className='booking-item-title'>
            <h4>Booked on:</h4>
          </div>
          <div className='booking-item-detail'>
            <h5>{moment(b.createdAt).format('dddd, MMM Do, YYYY @ LT')}</h5>
          </div>
        </div>
      </div>
    );
  }

  renderActionBar(b) {
    return (
      <div className='action-bar'>
        <div className='add-payment-button action-bar-button'>
          <RaisedButton
            onClick={this.showPaymentModal}
            labelColor='#fff'
            label="Add payment"
            backgroundColor='#52B266'
            icon={<AttachMoney color='#fff' />}
          />
        </div>
        {
          !b.isCancelled &&
          <div className='cancel-booking-button action-bar-button'>
            <RaisedButton
              labelColor='#fff'
              backgroundColor='#f54'
              onClick={this.showCancelBookingModal}
              label='Cancel booking'
              icon={<Block color='#fff' />}
            />
          </div>
        }
        {
          b.isCancelled &&
          <div className='uncancel-booking-button action-bar-button'>
            <RaisedButton
              labelColor='#f54'
              backgroundColor='#fff'
              onClick={this.showUncancelBookingModal}
              label='Uncancel booking'
              icon={<Block color='#f54' />}
            />
          </div>
        }
        <div className='edit-participants-button action-bar-button'>
          <RaisedButton
            onClick={this.showEditParticipantsModal}
            labelColor='#fff'
            label="Edit participants"
            backgroundColor='#ffa000'
            icon={<People color='#fff' />}
          />
        </div>
      </div>
    );
  }

  renderContactInfo(b) {
    // email, phone number
    return (
      <div className='contact-section'>
        <div className='contact-title-section'>
          <h4 className='contact-title'>Contact</h4>
        </div>
        <div className='contact-details'>
          <div className='name-section'>
            <div className='name-title'>
              Some kind of person icon
            </div>
            <div className='name-content'>
            <h4>{b.leaderFirstName} {b.leaderLastName}</h4>
            </div>
          </div>

          <div className='email-section'>
            <div className='email-title'>
              <ContactMail />
            </div>
            <div className='email-content'>
              { b.leaderEmail || 'Not available' }
            </div>
          </div>

          <div className='phone-section'>
            <div className='phone-title'>
              <ContactPhone />
            </div>
            <div className='phone-content'>
              { b.leaderPhoneNumber || 'Not available' }
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderHistory(b) {
    // a timeline history of the booking.
    // when it was booked, when participants were checked in (by who), etc
    // this is a rd 2 feature
    return null;
  }

  render() {
    if (this.props.booking.isFetching) {
      return <CircularProgress style={{marginLeft: '50%', position: 'relative'}} />;
    }

    const b = this.props.booking.item;

    if (!b) {
      return null;
    }

    const l = {
      locationName: b.locationName,
    };

    const peopleText = b.slotCount === 1 ? '1 person' : `${b.slotCount} people`;

    const paidAmount = b.payments ? b.payments.reduce((a, b) => { return a + b; }, 0) : 0;

    let paymentDetails = `$${this.renderCurrency(paidAmount)}/$${this.renderCurrency(b.bookingCost)} paid`;
    if (paidAmount < b.bookingCost) {
      paymentDetails +=  ` ($${(this.renderCurrency(b.bookingCost - paidAmount))} outstanding)`;
    }

    return (
      <div className='booking-item-page'>
        <DateAndTimeSection location={l} booking={b} />
        <Col sm={6} md={6} xs={12} smOffset={3} mdOffset={3}>
          <div className='booking-item-content'>
            <div className='item-title'>
              <EventIcon className='booking-item-icon' />
              <h3 className='title-text'>{`${b.leaderFirstName} ${b.leaderLastName}`}</h3>
            </div>

            <div className='item-details section'>
              <div className='summary-details'>
                <h4>{b.locationName}</h4>
                <div className='summary-detail'>
                  <EventIcon className='summary-detail-icon' />
                  <h5>{moment(b.start).format('dddd, MMM Do @ LT')}</h5>
                </div>

                <div className='summary-detail'>
                  <People className='summary-detail-icon' />
                  <h5>{peopleText}</h5>
                </div>

                <div className='summary-detail'>
                  <AttachMoney className='summary-detail-icon' />
                  <h5>{paymentDetails}</h5>
                </div>
              </div>
            </div>

            <div className='contact section'>
              <div className='summary-details'>
                <h4>Contact</h4>
                <div className='summary-detail'>
                  <People className='summary-detail-icon' />
                  <h5>{`${b.leaderFirstName} ${b.leaderLastName}`}</h5>
                </div>

                <div className='summary-detail'>
                  <ContactMail className='summary-detail-icon' />
                  <h5>{b.leaderEmail || 'Not available'}</h5>
                </div>

                <div className='summary-detail'>
                  <ContactPhone className='summary-detail-icon' />
                  <h5>{b.leaderPhoneNumber || 'Not available'}</h5>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col sm={12} md={12} xs={12} className='action-bar-column'>
          <Divider />
          { this.renderActionBar(b) }
        </Col>
        { this.renderHistory(b) }
        <AddPaymentModal isUpdating={this.state.isUpdating} onSubmit={this.addPayment} show={this.state.showAddPaymentModal} hide={this.hidePaymentModal} />
        <EditParticipantsModal booking={this.props.booking} isUpdating={this.state.isUpdating} onSubmit={this.editParticipantCount} show={this.state.showParticipantsModal} hide={this.hideEditParticipantsModal} />
        <CancelBookingModal isUpdating={this.state.isUpdating} onSubmit={this.cancelBooking} show={this.state.showCancelModal} hide={this.hideCancelBookingModal} />
        <UncancelBookingModal isUpdating={this.state.isUpdating} onSubmit={this.uncancelBooking} decline={this.hideUncancelBookingModal} show={this.state.showUncancelModal} hide={this.hideUncancelBookingModal} />
      </div>
    );
  }
};

export default BookingItemPage;