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

  render() {
    // TODO:
    // - date splitter
    const events = [
      {
        datetime: new Date(),
        host: 'Chris',
        id: 'asbadfs',
      }, {
        datetime: new Date(),
        host: 'Wayne',
        id: 'weofij',
      },
    ];

    return (
      <div className='timeline'>
        {
          events.map(e => {
            return (
              <div key={`row-${e.id}`} className='timeline-row'>
                <div key={`icon-${e.id}`} className='event-icon'>
                    <Schedule className='event-icon-svg' />
                </div>
                <div key={e.id} className='timeline-item'>
                  <p>{e.datetime.toString()}</p>
                  <p>{e.host}</p>
                </div>
              </div>
            )
          })
        }
        {
          events.length > 0 &&
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