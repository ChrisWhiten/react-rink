import Schedule from 'material-ui/svg-icons/action/schedule';
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
            <p className='date-label'>{timelineItem.value}</p>
          </div>
        </div>
      );
    } else {
      // type === 'event'
      return (
        <div key={`row-${timelineItem.id}`} className='timeline-row'>
          <div key={`icon-${timelineItem.id}`} className='event-icon'>
            <Schedule className='event-icon-svg' />
          </div>
          <div key={timelineItem.id} className='timeline-item'>
            <TimelineCard event={timelineItem.value} />
          </div>
        </div>
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
        id: `event-${e.id}`,
      });
    })

    return (
      <div className='timeline'>
        {
          timelineItems.map(e => {
            return this._generateTimelineRow(e)
          })
        }
        {
          timelineItems.length > 0 &&
          <div key='row-close' className='timeline-row'>
            <div key='icon-close' className='event-icon close'>
              <Schedule className='event-icon-svg' />
            </div>
          </div>
        }
      </div>
    );
  }
}

export default Timeline;