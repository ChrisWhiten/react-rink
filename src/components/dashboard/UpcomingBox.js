import React, {PropTypes} from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

class UpcomingBox extends React.Component {

  render() {
    const {title, Icon, topColour, upcomingEvents, emptyMessage} = this.props;

    const styles = {
      icon: {
        margin: '0.5em',
      },
      title: {
        margin: '0.5em',
      },
      titleBar: {
        borderBottom: '1px solid #eee',
        display: 'flex',
        alignItems: 'center',
        borderTop: `1px solid ${topColour}`,
      },
      container: {
        margin: '1em',
      },
      emptyContainer: {
        borderColor: '#dFb5b4',
        backgroundColor: '#fcf2f2',
        borderLeft: '5px solid rgb(223, 181, 180)',
        padding: '15px 30px 15px 15px',
        boxSizing: 'border-box',
        color: '#B94A48',
      },
      emptyMessage: {
        marginTop: '0em'
      },
    };

    return (
      <Paper style={styles.container}>
        <div style={styles.titleBar}>
          <Icon style={styles.icon}/>
          <p style={styles.title}>
            {title}
          </p>
        </div>

        {
          upcomingEvents.length === 0 &&
          <div style={styles.emptyContainer}>
            <p style={styles.emptyMessage}>
              {emptyMessage}
            </p>
            <RaisedButton label='Join an event at SF arena' primary={true} fullWidth={true}/>
          </div>
        }

        {
          upcomingEvents.length > 0 &&
          <div>
            We have events
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
