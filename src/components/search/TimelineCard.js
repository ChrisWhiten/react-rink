import Schedule from 'material-ui/svg-icons/action/schedule';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import moment from 'moment';

import './TimelineCard.css';

class TimelineCard extends React.Component {
  // pricePerSkater: 107,
  //   pricePerGoalie: 50,
  //   skillLevel: 'advanced', //beginner, intermediate, advanced
  //   genders: 'female',
  //   maxSkaters: 25,
  //   maxGoalies: 3,
  //   registeredSkaters: 2,
  //   registeredSkaters: 2,
  _perSkater(event) {
    if (event.maxSkaters) {
      return <div className='per-skater'> {`$${event.pricePerSkater} per skater (${event.registeredSkaters}/${event.maxSkaters} registered)`} </div>;
    } else {
      return null;
    }
  }

   _perGoalie(event) {
    if (event.maxGoalies) {
      return <div className='per-skater'> {`$${event.pricePerGoalie} per goalie (${event.registeredGoalies}/${event.maxGoalies} registered)`} </div>;
    } else {
      return null;
    }
  }

  _skillLevel(event) {
    let skillPhrase = 'All skill levels';

    switch (event.skillLevel) {
      case 'beginner':
        skillPhrase = 'Skill level: Beginner';
        break;
      case 'intermediate':
        skillPhrase = 'Skill level: Intermediate';
        break;
      case 'advanced':
        skillPhrase = 'Skill level: Advanced';
        break;
      default:
        break;
    }

    return <div className='skill-level'> { skillPhrase } </div>;
  }

  _genders(event) {
    let genderPhrase = 'Open to all genders';

    switch (event.genders) {
      case 'males':
        genderPhrase = 'Open to males';
        break;
      case 'females':
        genderPhrase = 'Open to females';
        break;
      default:
        break;
    }

    return <div className='genders'> { genderPhrase } </div>;
  }

  _join(event) {
    if (event.owned) {
      // disabled
      //<RaisedButton label="Disabled" disabled={true} style={style} />
      return (
          <div className='join-event-button'>
            <RaisedButton label="Owned" disabled={true} />
          </div>
        );
    } else {
      if (event.maxSkaters && event.maxGoalies) {
        // skater and goalie
        return (
          <div className='join-event-button'>
            <RaisedButton label={`Join as Skater($${event.pricePerSkater})`} primary={true} />
            <RaisedButton label={`Join as Goalie($${event.pricePerGoalie})`} primary={true} />
          </div>
        );
      } else {
        // just skater
        return (
          <div className='join-event-button'>
            <RaisedButton label={`Join ($${event.pricePerSkater})`} primary={true} />
          </div>
        );
      }
    }
  }

  render() {
    const event = this.props.event;
    return (
      <div className='timeline-card'>
        <Paper zDepth={2} rounded={true}>
          <div className='timeline-card-header'>
            <div className='timeline-card-title'>
              {`${event.type} hosted by ${event.host}`}
            </div>
            <div className='timeline-card-time'>
              <Schedule className='timeline-card-time-svg' />
              {`${moment(event.datetime).format('h:mm a')} - ${moment(new Date(event.datetime )).add(event.duration, 'm').format('h:mm a')}`}
            </div>
          </div>
          <Divider />
          <div className='timeline-card-content'>
            { this._perSkater(event) }
            { this._perGoalie(event) }
            { this._skillLevel(event) }
            { this._genders(event) }
            { this._join(event) }
          </div>
        </Paper>
      </div>
    );
  }
}

export default TimelineCard;