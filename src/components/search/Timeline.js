import Schedule from 'material-ui/svg-icons/action/schedule';
import React from 'react';

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
            <p>{timelineItem.value}</p>
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
            <p>{timelineItem.value.datetime.toString()}</p>
            <p>{timelineItem.value.host}</p>
          </div>
        </div>
      );
    }
  }

  render() {
    const today = new Date();
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    let lastHour = today;
    lastHour.setHours(lastHour.getHours() - 1);

    const events = [
      {
        datetime: today,
        host: 'Chris',
        id: 'asbadfs',
      }, {
        datetime: lastHour,
        host: 'Jim',
        id: 'ojiefw',
      }, {
        datetime: yesterday,
        host: 'Wayne',
        id: 'weofij',
      },
    ];

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

  // render() {
  //   // TODO:
  //   // - date splitter
  //   // - end clock (grayed out)
  //   const events = [
  //     {
  //       datetime: new Date(),
  //       host: 'Chris',
  //       id: 'asbadfs',
  //     }, {
  //       datetime: new Date(),
  //       host: 'Wayne',
  //       id: 'weofij',
  //     },
  //   ];

  //   return (
  //     <div className='timeline'>
  //       {
  //         events.map(e => {
  //           return (
  //             <div key={e.id} className='timeline-item'>
  //               <div key={`icon-${e.id}`} className='event-icon'>
  //                 <Schedule className='event-icon-svg' />
  //               </div>
  //               <p>{e.datetime.toString()}</p>
  //               <p>{e.host}</p>
  //             </div>
  //           )
  //         })
  //       }
  //     </div>
  //   );
  // }
}

export default Timeline;