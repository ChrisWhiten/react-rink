import React, { Component } from 'react';
import TestTimePicker from '../components/external/TestTimePicker';
import moment from 'moment';
import { DayPickerSingleDateController } from 'react-dates';
import EventIcon from 'material-ui/svg-icons/action/event';
import 'react-dates/initialize';
import mem from '../img/mem.jpg';
import zamb from '../img/zamb.jpg';
import lobby from '../img/lobby.jpg';
import classNames from 'classnames';

import './styles/ExternalTestPage.css';

class ExternalTestPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: moment(),
      focused: true,
      selectedStartTime: null,
      selectedEndTime: null,
      showPicker: false
    };

    this.state.availableStartTimes = this.getAvailableStartTimes(); // generate this for now.
    this.state.availableEndTimes = this.getAvailableEndTimes();
    console.log(this.state);

    this.onDateChange = this.onDateChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
    this.isDayBlocked = this.isDayBlocked.bind(this);
    this.onStartChange = this.onStartChange.bind(this);
    this.onEndChange = this.onEndChange.bind(this);
    this.showPicker = this.showPicker.bind(this);
  }

  showPicker() {
    console.log('setting show picker..')
    this.setState({ showPicker: true });
  }

  getAvailableEndTimes(start) {
    if (!start) return [];

    const minDurationInMinutes = 60;
    const incrementAmountInMinutes = 30;
    const availableTimes = [];

    // TODO: need to stop this loop at the closest existing booking.  Currently setting it to closing time
    const nextBlockedSlot = moment(this.state.date).add(1, 'days').set({
      hour: 2, 
      minute: 0, 
      second: 0, 
      millisecond: 0
    });

    let currentTime = moment(start).add(minDurationInMinutes, 'minutes');

    while (moment(currentTime).add(minDurationInMinutes, 'minutes').isSameOrBefore(nextBlockedSlot)) {
      availableTimes.push(moment(currentTime));
      currentTime = currentTime.add(incrementAmountInMinutes, 'minutes');
    }

    return availableTimes;
  }

  onEndChange(t) {
    // parse out time format
    const parts = t.split(':');
    if (parts.length !== 2) {
      return this.setState({
        selectedStartTime: null,
        selectedEndTime: null,
        availableEndTimes: this.getAvailableEndTimes(null)
      });
    }

    const newEnd = moment(this.state.date).set({
      hour: parseInt(parts[0], 10),
      minute: parseInt(parts[1], 10),
      second: 0,
      millisecond: 0
    });

    this.setState({
      selectedEndTime: newEnd
    });
  }

  onStartChange(t) {
    // parse out time format
    const parts = t.split(':');
    if (parts.length !== 2) {
      return this.setState({
        selectedStartTime: null,
        selectedEndTime: null,
        availableEndTimes: this.getAvailableEndTimes(null)
      });
    }

    const newStart = moment(this.state.date).set({
      hour: parseInt(parts[0], 10),
      minute: parseInt(parts[1], 10),
      second: 0,
      millisecond: 0
    });

    this.setState({
      selectedStartTime: newStart,
      selectedEndTime: moment(newStart).add(60, 'minutes'), // should the default be 60?  configurable by venue?
      availableEndTimes: this.getAvailableEndTimes(newStart)
    });
  }

  getAvailableStartTimes() {
    // for now, from 8am-10pm on current day.
    // TODO: should also take into account opening/closing times,
    // and existing bookings.  Also, doing it on 30 minute increments,
    // this shold probably be a property of the venue
    const incrementAmountInMinutes = 30;
    const availableTimes = [];
    const opening = moment(this.state.date).set({
      hour: 8, 
      minute: 0, 
      second: 0, 
      millisecond: 0
    });

    const closing = moment(this.state.date).add(1, 'days').set({
      hour: 2, 
      minute: 0, 
      second: 0, 
      millisecond: 0
    });

    const minDurationInMinutes = 60;
    let currentTime = opening;

    while (moment(currentTime).add(minDurationInMinutes, 'minutes').isSameOrBefore(closing)) {
      availableTimes.push(moment(currentTime));
      currentTime = currentTime.add(incrementAmountInMinutes, 'minutes');
    }

    return availableTimes;
  }

  isDayBlocked(day) {
    return [1, 3, 5, 10].indexOf(day.date()) > -1 || day < new Date();
  }

  onDateChange(date) {
    console.log('changing date', date);
    this.setState({ date });
  }

  onFocusChange() {
    // Force the focused states to always be truthy so that date is always selectable
    this.setState({ focused: true });
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
  }


  render() {
    const { date, focused } = this.state;

    const dateTimeResultsButtonClass = classNames('date-time-results-button', {
      active: this.state.showPicker
    });

    return (
      <div className='external-test-page'>
        {/* Start image header */}
        <div className='image-container'>
          <div className='large-img-container'>
            <img className='large-img' src={mem} />
          </div>
          <div className='small-imgs'>
            <div className='small-img-column'>
              <img className='top-img' src={zamb} />
              <img className='bottom-img' src={lobby} />
            </div>
          </div>
        </div>
        {/* End image header */}
        {/* Start main content */}
        <div className='content-body'>
          <div className='info-section'>
            {/* Breadcrumbs */}
            <a className='info-breadcrumbs' href='#'>
              <span className='breadcrumb-text'>Smiths Falls - Memorial Centre</span>
            </a>
            {/* Title (address) section */}
            <div className='address-section'>
              <h2 className='booking-address'>71 Cornelia St W, Smiths Falls, ON K7A 2H7</h2>
            </div>

            {/* Separator */}
            <div className='info-separator' />

            {/* Hours and rates */}
            <div className='info-subsection'>
              <div className='left-subsection'>
                <h3 className='subsection-header'>Rates</h3>
                <ul className='rates-list'>
                  <li className='rate'>
                    <span className='rate-title'>Adult, Prime time</span>
                    <span className='rate-cost'>$171/hr</span>
                  </li>
                  <li className='rate'>
                    <span className='rate-title'>Adult, Non-Prime time</span>
                    <span className='rate-cost'>$111/hr</span>
                  </li>
                  <li className='rate'>
                    <span className='rate-title'>Minor, Prime time</span>
                    <span className='rate-cost'>$126/hr</span>
                  </li>
                  <li className='rate'>
                    <span className='rate-title'>Minor, Non-Prime time</span>
                    <span className='rate-cost'>$90/hr</span>
                  </li>
                </ul>
              </div>

              <div className='right-subsection'>
                <h3 className='subsection-header'>Opening hours</h3>
                <ul className='hours-list'>
                  <li className='hour-item'>
                    <span className='hour-title'>Mon - Wed</span>
                    <span className='hour-value'>8:00 am - 10:00 pm</span>
                  </li>
                  <li className='hour-item'>
                    <span className='hour-title'>Thurs - Sat</span>
                    <span className='hour-value'>8:00 am - 10:00 pm</span>
                  </li>
                  <li className='hour-item'>
                    <span className='hour-title'>Sun</span>
                    <span className='hour-value'>8:00 am - 10:00 pm</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Separator */}
            <div className='info-separator' />

            {/* About the rink */}
            <div className='info-subsection'>
              <h3 className='subsection-header'>About the rink</h3>
              <p className='about-description'>
                The Smiths Falls Memorial Community Centre is a place for many recreational opportunities, inside and outside. From the skateboard park, baseball diamond, tennis courts to the walking concourse, figure skating, hockey and events, the Community Centre cater’s to the active lifestyle.
              </p>
              <p className='about-description'>
                The Community Centre can seat up to 1500 people and features six large dressing rooms, two rooms for referees, a first-aid room, boys and girls minor hockey office/program areas, a large main lobby with concession and staff offices, second floor community halls; viewing area, handicap accessible washrooms, elevators, a walking concourse around the entire upper tier of the building. The facility also features an NHL-sized ice surface, 200 x 85, with state-of-the-art refrigeration, lighting and a heating re-capture system that makes it one of the most energy efficient buildings in the town.
              </p>
              <p className='about-description'>
                In addition there is a huge facility geared completely for the Bears – junior A hockey team. The Bears’ facility takes up almost 2,500 square feet and offers the team a large dressing facility, workout areas, offices for key staff, including the coach, who has his own private bathroom and shower.
              </p>
              <p className='about-description'>
                The Community Centre provides the ideal location for winter sports activities and summer events including weddings, concerts, trade fairs and any other special event requiring a bright new venue.
              </p>
            </div>

          </div>

          {/* Right-side booking panel */}
          <div className='booking-section'>
            <div className='always-in-view-booking'>
              <div className='booking-form-container'>
                <div className='booking-form-test'>
                {/* Top.  Date picker */}
                  <div className='date-time-results'>
                    <button onClick={this.showPicker} className={dateTimeResultsButtonClass}>
                      <span className='dt-results-btn-span'>
                        <div className='dt-results-calendar-icon'>
                          <EventIcon className='dt-results-calendar-icon-svg' />
                        </div>
                        <div className='dt-results-text'>
                          <p className='dt-results-p'>Fri, Dec 28, 09:30 AM  → 05:00 PM</p>
                        </div>
                      </span>
                    </button>
                    {/* Start the date/time picker */}
                    { this.state.showPicker && (
                      <div>
                        <div className='dp-container'>
                          <div className='picker-filters'>
                            <button className='b-btn selected'>All times</button>
                            <button className='b-btn'>Mornings</button>
                            <button className='b-btn'>Evenings</button>
                            <button className='b-btn'>Late nights</button>
                          </div>

                          <div className='date-pickers'>
                            <DayPickerSingleDateController
                              onDateChange={this.onDateChange}
                              isDayBlocked={this.isDayBlocked}
                              onFocusChange={this.onFocusChange}
                              focused={focused}
                              date={date}
                              numberOfMonths={1}
                              hideKeyboardShortcutsPanel={true}
                            />
                            <div className='time-picker-divider' />
                            <TestTimePicker
                              selectedStartTime={this.state.selectedStartTime}
                              selectedEndTime={this.state.selectedEndTime}
                              availableStartTimes={this.state.availableStartTimes}
                              availableEndTimes={this.state.availableEndTimes}
                              onStartChange={this.onStartChange}
                              onEndChange={this.onEndChange}
                            />
                          </div>
                          <div className='save-dt'>
                            <div className='dt-separator' />
                            <div className='confirm-section'>
                              <button className='confirm-dt'><span>OK</span></button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {/* End the date/time picker */}
                  </div>

                  {/* Next, a separator */}
                  <div className='booking-section-separator-container' />

                  {/* Next, price summary */}
                  <div className='booking-section-price-summary-container'>
                    <div className='price-summary'>
                      <div className='breakdown'>
                        <span className='breakdown-text'>$89.00 x 2.5 hours</span>
                        <span className='breakdown-total'>$222.50</span>
                      </div>
                      <div className='large-total'>$222.50</div>
                    </div>
                  </div>

                  {/* Next, another separator */}
                  <div className='booking-section-separator-container' />

                  {/* Next, Book Now section */}
                  <div className='book-now-section'>
                    {/* Book now button */}
                    <div className='book-now-button-container'>
                      <button className='book-now-button'>
                        <span className='book-now-text'>Book Now</span>
                      </button>
                    </div>
                    {/* Next, some quick notes (cancellation policy) */}
                  </div>

                  
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End main content */}
      </div>
    );
  }
};

export default ExternalTestPage;