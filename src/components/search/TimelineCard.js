import Schedule from 'material-ui/svg-icons/action/schedule';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import React from 'react';

import './TimelineCard.css';

class TimelineCard extends React.Component {
  render() {
    return (
      <div className='timeline-card'>
        <Paper zDepth={2} rounded={true}>
          {`${this.props.event.type} hosted by ${this.props.event.host}`}
          <Divider />
          {`Hello there`}
        </Paper>
      </div>
    );
  }
}

export default TimelineCard;