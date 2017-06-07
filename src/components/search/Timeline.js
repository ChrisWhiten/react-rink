import React from 'react';
import TimelineCard from './TimelineCard';
import CircularProgress from 'material-ui/CircularProgress';

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
    return (
      <div key={`row-${timelineItem.id}`} className='timeline-row'>
        <div key={timelineItem.id} className='timeline-header'>
          <h3 className='date-label'>
            {timelineItem.date}
          </h3>
        </div>
        <div className='timeline-row-content'>
          {
            timelineItem.events.map(t => {
              return <TimelineCard event={t.value} key={t.id} />;
            })
          }
        </div>
      </div>
    );
  }

  render() {
    if (this.props.events.isFetching) {
      return (
        <div style={{position: 'relative', width: '100%'}}>
          <CircularProgress style={{marginLeft: '50%', position: 'relative'}} />
        </div>
      );
    }

    const events = this.props.events.items;

    events.sort((a, b) => {
      return a.datetime - b.datetime;
    });

    let timelineItems = [];
    let currentDate = new Date(-8640000000000000); // earliest possible date :)
    let currentGroup = null;
    events.forEach(e => {
      if (e.datetime.toDateString() !== currentDate.toDateString()) {
        currentDate = e.datetime;
        if (currentGroup) {
          timelineItems.push(currentGroup);
        }
        currentGroup = {
          date: currentDate.toDateString(),
          id: `date-${currentDate.toDateString()}`,
          events: [],
        };
      }

      currentGroup.events.push({
        value: e,
        id: `timeline-event-${e.id}`,
      });
    });

    if (currentGroup) {
      timelineItems.push(currentGroup);
    }

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