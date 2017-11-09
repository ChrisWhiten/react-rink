import Schedule from 'material-ui/svg-icons/action/schedule';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import moment from 'moment';
import locale from '../../localization/locale';

import './styles/TimelineCard.css';

class TimelineCard extends React.Component {
  constructor() {
    super();
    this.locale = locale.getLocale();
  }

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
      return <div className='per-skater'> {`$${event.pricePerSkater} ${this.locale.events.perSkater} (${event.registeredSkaters}/${event.maxSkaters} ${this.locale.events.registered})`} </div>;
    } else {
      return null;
    }
  }

   _perGoalie(event) {
    if (event.maxGoalies) {
      return <div className='per-skater'> {`$${event.pricePerGoalie} ${this.locale.events.perGoalie} (${event.registeredGoalies}/${event.maxGoalies} ${this.locale.events.registered})`} </div>;
    } else {
      return null;
    }
  }

  _skillLevel(event) {
    let skillPhrase = 'All skill levels';

    switch (event.skillLevel) {
      case 'beginner':
        skillPhrase = `${this.locale.events.skillLevel}: ${this.locale.events.beginner}`;
        break;
      case 'intermediate':
        skillPhrase = `${this.locale.events.skillLevel}: ${this.locale.events.intermediate}`;
        break;
      case 'advanced':
        skillPhrase = `${this.locale.events.skillLevel}: ${this.locale.events.advanced}`;
        break;
      default:
        break;
    }

    return <div className='skill-level'> { skillPhrase } </div>;
  }

  _genders(event) {
    let genderPhrase = `${this.locale.events.openTo} ${this.locale.events.allGenders}`;

    switch (event.genders) {
      case 'males':
        genderPhrase = `${this.locale.events.openTo} ${this.locale.events.males}`;
        break;
      case 'females':
        genderPhrase = `${this.locale.events.openTo} ${this.locale.events.females}`;
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
            <span className='action-button'>
              <RaisedButton label={`${this.locale.events.owned}`} disabled={true} fullWidth={true} />
            </span>
          </div>
        );
    } else {
      if (event.maxSkaters && event.maxGoalies) {
        // skater and goalie
        return (
          <div className='join-event-button'>
            <span className='action-button-half'>
              <RaisedButton label={`${this.locale.events.joinAsSkater} ($${event.pricePerSkater})`} primary={true} fullWidth={true} />
            </span>
            <span className='action-button-half'>
              <RaisedButton label={`${this.locale.events.joinAsGoalie} ($${event.pricePerGoalie})`} primary={true} fullWidth={true} />
            </span>
          </div>
        );
      } else {
        // just skater
        return (
          <div className='join-event-button'>
            <span className='action-button'>
              <RaisedButton label={`${this.locale.events.join} ($${event.pricePerSkater})`} primary={true} fullWidth={true} />
            </span>
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
              <h3>
                {`${event.type} ${this.locale.events.hostedBy} ${event.host}`}
              </h3>
            </div>
            <div className='timeline-card-time'>
              <Schedule className='timeline-card-time-svg' />
              {`${moment(event.datetime).format('h:mm a')} - ${moment(new Date(event.datetime)).add(event.duration, 'm').format('h:mm a')}`}
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