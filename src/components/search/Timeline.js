import React from 'react';
import TimelineCard from './TimelineCard';
import api from '../../data/api';

import './Timeline.css';

class Timeline extends React.Component {
  constructor() {
    super();

    this.state = {
      open: false,
      selectedBooking: null,
    };
  }

  _generateTimelineRow(timelineItem) {
    if (timelineItem.type === 'date') {
      return (
        <div key={`row-${timelineItem.id}`} className='timeline-row'>
          <div key={timelineItem.id} className='timeline-header'>
            <h3 className='date-label'>{timelineItem.value}</h3>
          </div>
        </div>
      );
    } else {
      // type === 'event'
      return (
        <TimelineCard event={timelineItem.value} key={timelineItem.id} /> 
      );
    }
  }

  render() {
    const start = new Date();
    const end = new Date();
    const events = api.getAvailableEvents(start, end);

    events.sort((a, b) => {
      return a.datetime - b.datetime;
    });

    let timelineItems = [];
    let currentDate = new Date(-8640000000000000) // earliest possible date :)
    events.forEach(e => {
      if (e.datetime.toDateString() !== currentDate.toDateString()) {
        currentDate = e.datetime;
        timelineItems.push({
          type: 'date',
          value: currentDate.toDateString(),
          id: `date-${currentDate.toDateString()}`,
        });
      }

      timelineItems.push({
        type: 'event',
        value: e,
        id: `timeline-event-${e.id}`,
      });
    });

    return (
      <div className='timeline'>
        {
          timelineItems.map(e => {
            return this._generateTimelineRow(e)
          })
        }
      </div>
    );
  }
}

export default Timeline;