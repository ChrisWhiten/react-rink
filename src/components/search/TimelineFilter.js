import React, {PropTypes} from 'react';
import EventFilter from './EventFilter';
import './TimelineFilter.css';

class TimelineFilter extends React.Component {

  render() {

    return (
      <div className='timeline-filter'>
        <span>
          <EventFilter text={`Event Type`} />
        </span>
        <span>
          <EventFilter text={`Demographic`} />
        </span>
        <span>
          <EventFilter text={`More filters`} />
        </span>
      </div>
    );
  }
}

TimelineFilter.propTypes = {
};

export default TimelineFilter;
