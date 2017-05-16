import React, {PropTypes} from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router';
import moment from 'moment';

import './UpcomingBox.css';

class UpcomingBox extends React.Component {

  _renderEvents(events) {
    if (events.length > 0) {
      return (
        events.map(e => {
          return (
            <Link key={`link-${e.id}`} to={`/events/${e.id}`} style={{textDecoration: 'none'}}>
              <div className='rendered-container'>
                <div className='upcoming-box-event-container'>
                  <h4 className='upcoming-box-location'>
                    { `${e.venue} - ${e.venueCity}` }
                  </h4>
                  <div className='upcoming-box-date-container'>
                    <h4 className='upcoming-box-date'>
                      { moment(e.time).format('ddd, MMMM Do YYYY, h:mm a') }
                    </h4>
                  </div>
                  <div className='upcoming-event-info'>
                    { e.type }
                  </div>
                  <div className='upcoming-event-info'>
                    { `Organized by ${e.organizer}` }
                  </div>
                  <div className='upcoming-event-info'>
                    { e.duration }
                  </div>
                </div>
              </div>
            </Link>
          );
        })
      );
    }
  }

  render() {
    const {title, Icon, topColour, upcomingEvents, emptyMessage} = this.props;

    const styles = {
      titleBar: {
        borderTop: `1px solid ${topColour}`,
      },
    };

    return (
      <Paper className='upcoming-box-container'>
        <div style={styles.titleBar} className='upcoming-box-title-bar'>
          <Icon className='upcoming-box-icon' />
          <h3 className='upcoming-box-title'>
            {title}
          </h3>
        </div>

        {
          upcomingEvents.length === 0 &&
          <div className='upcoming-box-empty-container'>
            <p className='upcoming-box-empty-message'>
              {emptyMessage}
            </p>
            <RaisedButton label='Join an event at SF arena' primary={true} fullWidth={true}/>
          </div>
        }

        {
          upcomingEvents.length > 0 &&
          <div>
            { this._renderEvents(upcomingEvents) }
          </div>
        }
      </Paper>
    );
  }
}

UpcomingBox.propTypes = {
  Icon: PropTypes.any, // eslint-disable-line
  title: PropTypes.string,
  topColour: PropTypes.string,
  upcomingEvents: PropTypes.array,
  emptyMessage: PropTypes.string,
};

export default UpcomingBox;
