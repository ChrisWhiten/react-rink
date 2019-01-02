import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import _ from 'lodash';

import './TestTimePicker.css';

class TestTimePicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    this.onStartChange = this.onStartChange.bind(this);
    this.onEndChange = this.onEndChange.bind(this);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  onStartChange(e) {
    this.props.onStartChange(e.target.value);
  }

  onEndChange(e) {
    this.props.onEndChange(e.target.value);
  }

  render() {
    const hourLabelClassName = classNames('hour-label', {
      empty: !this.props.selectedStartTime
    });

    const disabledState = !this.props.selectedStartTime;
    console.log('disabled state', disabledState)
    return (
      <div className='test-time-picker'>
        <h4 className='test-time-picker-date'>
          Saturday, January 5th
        </h4>
        <div className='hour-picker'>
        {/* Start time */}
          <div className='hour-wrapper'>
            <div className={hourLabelClassName}>Starts</div>
            <div className='select-container'>
              <select className='hour-select' name='start' onChange={this.onStartChange}>
                <option value>---</option>
                {
                  this.props.availableStartTimes.map(t => {
                    return <option key={`start-${t.format('HH:mm')}`} value={t.format('HH:mm')}>{t.format('hh:mm A')}</option>
                  })
                }
              </select>
              <div className='select-display'>{this.props.selectedStartTime && this.props.selectedStartTime.format('hh:mm A')}</div>
              <div className='select-down-arrow'>
                <svg width='20' height='45' viewBox='0 0 24 24'>
                  <g fill='none' fillRule='evenodd'>
                    <path d='M0 0h24v24H0z'></path>
                    <path fill='#9a9fa6' d='M6.697 10.354c-.195-.196-.138-.354.147-.354h10.312c.277 0 .338.163.147.354l-4.95 4.949a.505.505 0 0 1-.707 0l-4.949-4.95z'></path>
                  </g>
                </svg>
              </div>
            </div>
          </div>
          {/* Separator arrow */}
          <div className='test-time-picker-arrow'>
            <svg className='test-time-picker-arrow-svg' width='16' height='16' viewBox='0 0 19 19'>
              <path d='M10.7 0v14.394l6.597-6.597L19 9.5 9.5 19 0 9.5l1.703-1.703L8.3 14.394V0h2.4z' fill='#444B53' fillRule='evenodd'></path>
            </svg>
          </div>
          {/* End time */}
          <div className='hour-wrapper'>
            <div className={hourLabelClassName}>Ends</div>
            <div className='select-container'>
              <select className='hour-select' name='end' onChange={this.onEndChange} disabled={disabledState}>
                {
                  this.props.availableEndTimes && this.props.availableEndTimes.map(t => {
                    return <option key={`end-${t.format('HH:mm')}`} value={t.format('HH:mm')}>
                      {t.format('hh:mm A')}  ({moment.duration(t.diff(this.props.selectedStartTime)).as('hours')} hours)
                    </option>
                  })
                }
              </select>
              <div className='select-display'>{this.props.selectedEndTime && this.props.selectedEndTime.format('hh:mm A')}</div>
              <div className='select-down-arrow'>
                <svg width='20' height='45' viewBox='0 0 24 24'>
                  <g fill='none' fillRule='evenodd'>
                    <path d='M0 0h24v24H0z'></path>
                    <path fill='#9a9fa6' d='M6.697 10.354c-.195-.196-.138-.354.147-.354h10.312c.277 0 .338.163.147.354l-4.95 4.949a.505.505 0 0 1-.707 0l-4.949-4.95z'></path>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TestTimePicker.propTypes = {
  availableStartTimes: PropTypes.array,
};

export default TestTimePicker;
