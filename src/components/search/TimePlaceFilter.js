import React from 'react';
import DatePicker from './DatePicker';
import LocationPicker from './LocationPicker';
import './TimePlaceFilter.css';

class TimePlaceFilter extends React.Component {

  render() {
    return (
      <div className='time-place-filter'>
        <LocationPicker />
        <DatePicker />
      </div>
    );
  }
}

export default TimePlaceFilter;