import EventIcon from 'material-ui/svg-icons/action/event';
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
    const events = [{
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
              <div key={e.id} className='timeline-item'>
                <p>{e.datetime.toString()}</p>
                <p>{e.host}</p>
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default Timeline;