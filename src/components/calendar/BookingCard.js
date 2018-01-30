import React from 'react';
import PropTypes from 'prop-types';
import CheckinCounter from './CheckinCounter';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import CheckCircle from 'material-ui/svg-icons/action/check-circle';
import CircularProgress from 'material-ui/CircularProgress';
import Warning from 'material-ui/svg-icons/alert/warning';
import moment from 'moment';
import classNames from 'classnames';
import {
  Tooltip,
  OverlayTrigger,
} from 'react-bootstrap';
import {
  Link,
} from 'react-router';
import _ from 'lodash';


import './styles/BookingCard.css';

function isCheckinDOMNode(classList) {
  return classList.contains('add-icon') || classList.contains('remove-icon');
}

class BookingCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      slots: this.props.booking.checkedIn || 0, // slotCount is the other
      updatingStatus: false,
    };

    this.updateCounter = this.updateCounter.bind(this);
    this.goToBooking = this.goToBooking.bind(this);
    this.onLinkClick = this.onLinkClick.bind(this);
    this.updateDebounced = _.debounce(this.props.updateBooking, 300);
  }

  onLinkClick(e) {
    const target = e.srcElement || e.target;

    if (isCheckinDOMNode(target.classList) || (target.nodeName === 'path' && isCheckinDOMNode(target.parentNode.classList))) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  updateCounter(newValue) {
    this.setState({
      updatingStatus: true,
    });

    this.updateDebounced({
      id: this.props.booking.id,
      checkedIn: newValue,
    }, (res) => {
      console.log('value updated!');
      this.setState({
        slots: newValue,
        updatingStatus: false,
      });
    });
  }

  goToBooking() {
    this.props.router.push(`/booking/${this.props.booking.id}`)
  }

  issues() {
    let issueList = [];
    const b = this.props.booking;
    const paidAmount = b.payments ? b.payments.reduce((a, b) => { return a + b; }, 0) : 0;
    const missingCheckins = b.slotCount - this.state.slots;
    const outstandingPayment = b.bookingCost - paidAmount;

    if (missingCheckins > 0) {
      const issue = missingCheckins === 1 ? `Missing ${missingCheckins} checkin` : `Missing ${missingCheckins} checkins`;
      issueList.push({
        issue,
        issueId: `missing-checkin-${b.id}`,
      });
    }

    if (outstandingPayment > 0) {
      issueList.push({
        issue: `$${(outstandingPayment/100).toFixed(2)} owing`,
        issueId: `outstanding-payment-${b.id}`,
      });
    }

    return issueList;
  }

  render() {
    const b = this.props.booking;
    const issueList = this.issues();
    const paidAmount = b.payments ? b.payments.reduce((a, b) => { return a + b; }, 0) : 0;

    const paidSectionClass = classNames(
      'paid-section',
      {
        hide: b.isCancelled,
      },
    );

    const statusSectionClass = classNames(
      'status-section',
      {
        hide: b.isCancelled,
      },
    );

    return (
      <div className='summary-box existing-booking' key={`booking-${b.id}`} onClick={this.goToBooking}>
        <Link to={`/booking/${this.props.booking.id}`} className='booking-link' onClick={this.onLinkClick}>
          <div className={paidSectionClass}>
            {
              b.bookingCost > paidAmount &&
              <OverlayTrigger placement='bottom' overlay={<Tooltip id='owing-tooltip'>${((b.bookingCost - paidAmount)/100).toFixed(2)} owed</Tooltip>}>
                <h5 className='owed'>
                  ${((b.bookingCost - paidAmount)/100).toFixed(2)}
                </h5>
              </OverlayTrigger>
            }
            {
              b.bookingCost <= paidAmount &&
              <OverlayTrigger placement='bottom' overlay={<Tooltip id='paid-tooltip'>Booking paid in full</Tooltip>}>
                <h5 className='paid'>
                  Paid
                </h5>
              </OverlayTrigger>
            }
          </div>

          <div className={statusSectionClass}>
          {
            this.state.updatingStatus &&
            <div className='updating'>
              <OverlayTrigger placement='bottom' overlay={<Tooltip id='all-clear-tooltip'>Updating...</Tooltip>}>
                <CircularProgress size={20} thickness={1.75} />
              </OverlayTrigger>
            </div>
          }
          {
            !this.state.updatingStatus && issueList.length === 0 &&
            <div className='completed'>
              <OverlayTrigger placement='bottom' overlay={<Tooltip id='all-clear-tooltip'>Booking completed</Tooltip>}>
                <CheckCircle className='completed-circle' />
              </OverlayTrigger>
            </div>
          }
          {
            !this.state.updatingStatus && issueList.length > 0 &&
            <OverlayTrigger placement='bottom' overlay={
              <Tooltip id='remove-tooltip'>
                {issueList.map(i => {return <div key={i.issueId}>{i.issue}</div>})}
              </Tooltip>
            }>
              <Warning className='warning-incomplete' />
            </OverlayTrigger>
          }
          </div>

          <div className='title-section'>
            <div className='title'>
              <h4>{b.leaderFirstName} {b.leaderLastName}</h4>
            </div>
            <div className='subtitle'>
              <h5>{b.locationName} @ {moment(b.start).format('LT')}</h5>
            </div>
          </div>

          <div className='img-section'>
            <AccountCircle className='user-no-img-avatar' />
          </div>
          {
            !b.isCancelled &&
            <div className='checkin-section'>
              <CheckinCounter
                booking={b}
                updateCounter={this.updateCounter}
              />
            </div>
          }
          {
            b.isCancelled &&
            <div className='cancelled-section'>
              <h4 className='cancelled-text'>Cancelled</h4>
            </div>
          }
        </Link>
      </div>
    );
  }
}

BookingCard.propTypes = {
  booking: PropTypes.object,
};

export default BookingCard;
