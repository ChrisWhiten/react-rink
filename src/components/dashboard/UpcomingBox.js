import React, {PropTypes} from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import moment from 'moment';

import './UpcomingBox.css';

class UpcomingBox extends React.Component {

  _renderEvents(events) {
    if (events.length > 0) {
      return (
        events.map(e => {
          return (
            <div className='rendered-container'>
              <p>
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
              </p>
            </div>
          );
        })
      );
    }
    // if (cameraList.length > 0) {
    //   return (
    //     cameraList.filter(cam => {
    //       return cam.location === location.id;
    //     }).map(mapObj => {
    //       mapObj.camObj.location = location;
    //       const camId = ObjectProcessor.GetCameraDeviceIdCombo(mapObj.camObj);

    //       return (
    //         <CameraItem
    //           key={mapObj.camObj.id}
    //           s3={this.props.s3}
    //           s3BucketPrefix={this.props.s3BucketPrefix}
    //           camera={mapObj.camObj}
    //           active={this.state.playList.hasOwnProperty(camId)}
    //           mini={this.props.mini}
    //           playLive={this.state.isLive} />
    //       );
    //     })
    //   );
    // }
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
