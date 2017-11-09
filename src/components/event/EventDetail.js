import React, {PropTypes} from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import moment from 'moment';

import './styles/EventDetail.css';

class EventDetail extends React.Component {


  render() {
    const {event} = this.props;

    return (
      <Paper className='event-detail-container'>
        <div className='event-detail-header'>
          Adult Pickup Hockey
        </div>
        <div className='event-detail-content'>
          <div className='summary-details'>
            <p>Organizer: <em>{`${event.organizer}`}</em></p>
            <p>Where: <em>{`${event.venueCity} - ${event.venue}`}</em></p>
            <p>When: <em>{moment(event.time).format('ddd, MMMM Do YYYY, h:mm a')}</em></p>
          </div>
          <SelectField floatingLabelText='Skill Level' value={1} disabled={true}>
            <MenuItem value={1} primaryText='Beginner' />
            <MenuItem value={2} primaryText='Every Night' />
          </SelectField>

          <SelectField floatingLabelText='Gender' value={1} disabled={true}>
            <MenuItem value={1} primaryText='Any' />
            <MenuItem value={2} primaryText='Every Night' />
          </SelectField>
          <br />
          <RaisedButton label="Participating" disabled={true} fullWidth={true}/>
        </div>
      </Paper>
    );
  }
}

EventDetail.propTypes = {
  event: PropTypes.object,
};

export default EventDetail;
