// TODO: The minutesStep property is not working on the time picker!
import React, {PropTypes} from 'react';
import {
  Panel,
} from 'react-bootstrap';
import classNames from 'classnames';
import Slot from './Slot';
import TimePicker from 'material-ui/TimePicker';
import DatePicker from '../search/DatePicker';
import {
  Button,
  HelpBlock,
  FormGroup,
  ControlLabel,
  FormControl,
  Col,
} from 'react-bootstrap';

import './EditAvailabilitySchedule.css';

function FieldGroup({ id, label, help, validationState, ...props }) {
  return (
    <FormGroup controlId={id} validationState={validationState}>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

class EditAvailabilitySchedule extends React.Component {
  constructor() {
    super();

    this.schedule = {
      Monday: [
        new Date(2017, 3, 3, 8, 30),
        new Date(2017, 3, 3, 9, 30),
        new Date(2017, 3, 3, 10, 30),
      ],
      Tuesday: [
        new Date(2017, 3, 3, 8, 30),
        new Date(2017, 3, 3, 9, 30),
        new Date(2017, 3, 3, 10, 30),
        new Date(2017, 3, 3, 11, 30),
        new Date(2017, 3, 3, 12, 30),
        new Date(2017, 3, 3, 13, 30),
      ],
      Wednesday: [],
      Thursday: [
        new Date(2017, 3, 3, 8, 30),
      ],
      Friday: [
        new Date(2017, 3, 3, 8, 30),
        new Date(2017, 3, 3, 9, 30),
        new Date(2017, 3, 3, 10, 30),
        new Date(2017, 3, 3, 11, 30),
        new Date(2017, 3, 3, 12, 30),
        new Date(2017, 3, 3, 13, 30),
        new Date(2017, 3, 3, 14, 30),
        new Date(2017, 3, 3, 15, 30),
        new Date(2017, 3, 3, 16, 30),
        new Date(2017, 3, 3, 17, 30),
        new Date(2017, 3, 3, 18, 30),
        new Date(2017, 3, 3, 19, 30),
      ],
      Saturday: [
        new Date(2017, 3, 3, 8, 30),
        new Date(2017, 3, 3, 9, 30),
        new Date(2017, 3, 3, 10, 30),
        new Date(2017, 3, 3, 11, 30),
        new Date(2017, 3, 3, 12, 30),
        new Date(2017, 3, 3, 13, 30),
        new Date(2017, 3, 3, 14, 30),
        new Date(2017, 3, 3, 15, 30),
        new Date(2017, 3, 3, 16, 30),
        new Date(2017, 3, 3, 17, 30),
        new Date(2017, 3, 3, 18, 30),
        new Date(2017, 3, 3, 19, 30),
        new Date(2017, 3, 3, 20, 30),
        new Date(2017, 3, 3, 21, 30),
        new Date(2017, 3, 3, 22, 30),
      ],
      Sunday: [
        new Date(2017, 3, 3, 7, 30),
        new Date(2017, 3, 3, 8, 30),
        new Date(2017, 3, 3, 9, 30),
        new Date(2017, 3, 3, 10, 30),
        new Date(2017, 3, 3, 11, 30),
        new Date(2017, 3, 3, 12, 30),
        new Date(2017, 3, 3, 13, 30),
        new Date(2017, 3, 3, 14, 30),
        new Date(2017, 3, 3, 15, 30),
        new Date(2017, 3, 3, 16, 30),
        new Date(2017, 3, 3, 17, 30),
        new Date(2017, 3, 3, 18, 30),
        new Date(2017, 3, 3, 19, 30),
        new Date(2017, 3, 3, 20, 30),
        new Date(2017, 3, 3, 21, 30),
        new Date(2017, 3, 3, 22, 30),
        new Date(2017, 3, 3, 23, 30),
      ],
    };

    this.state = {
      screenWidth: 0,
      screenHeight: 0,
      showSlideup: false,
      addMode: null,
      schedule: this.schedule,
      scheduleName: '',
    };

    this.setAddMode = this.setAddMode.bind(this);
    this.handleTimePickerChange = this.handleTimePickerChange.bind(this);
    this.removeSlot = this.removeSlot.bind(this);
    this.save = this.save.bind(this);
    this.scheduleNameChange = this.scheduleNameChange.bind(this);
  }

  scheduleNameChange(e) {
    this.setState({
      scheduleName: e.target.value,
    });
  }

  save() {
    // save here
    // this is where an API call will go
    console.log('saved');
  }

  handleTimePickerChange(unused, time) {
    let newTime = new Date();
    newTime.setHours(time.getHours());
    newTime.setMinutes(time.getMinutes());
    newTime.setSeconds(0);

    // this is where an API call might go
    this.schedule[this.state.addMode].push(newTime);
    this.setState({
      schedule: this.schedule,
    });
  }

  removeSlot(day, slot) {
    this.schedule[day] = this.schedule[day].filter(s => {
      return s.getHours() !== slot.getHours() || s.getMinutes() !== slot.getMinutes();
    });

    this.setState({
      schedule: this.schedule,
    });
  }

  setAddMode(day) {
    this.setState({
      addMode: day,
    });

    this.refs.timePicker.openDialog();
  }

  renderSchedule(day, schedule) {
    return (
      <div className='container schedule-rendered'>
        <div className='availability-day-of-week'>
          <h5>{ day }</h5>
        </div>
        
        <hr className='external-separator' />

        <div className='availability-slots'>
          {
            schedule.map(s => <Slot time={ s } hoverText='Remove' day={day} onClick={this.removeSlot} />)
          }
          <Slot hoverText='Add Slot' day={day} onClick={this.setAddMode} />
        </div>
      </div>
    );
  }

  render() {
    const timePickerStyle = {
      display: 'none',
    };

    return (
      <div className='availability-schedule'>
        <div className='schedule-name container'>
          <div className='availability-day-of-week'>
            <h5>What should we name this schedule?</h5>
          </div>
          <Col md={3} lg={3} sm={3} xs={12} style={{paddingLeft: 0}}>
            <FieldGroup
              id='schedule-name'
              type='text'
              placeholder='Schedule name'
              onChange={this.scheduleNameChange}
              value={this.state.scheduleName}
            />
          </Col>
        </div>
        <hr className='external-separator' />
        <div className='container schedule-date-range'>
          <div className='availability-day-of-week'>
            <h5>When should this schedule be applied?</h5>
          </div>
          <DatePicker nullText='Start date' hintText='Start date' />
          <DatePicker nullText='End date' hintText='End date' />
          <hr className='external-separator' />
        </div>
        {
          Object.keys(this.state.schedule).map(day => {
            return this.renderSchedule(day, this.state.schedule[day]);
          })
        }

        <hr className='external-separator' />

        <div className='container save-button'>
          <Button
            bsStyle='success'
            bsSize='large'
            onClick={this.save}
            block
          >
            Save
          </Button>
        </div>

      <TimePicker
        minutesStep={15}
        ref='timePicker'
        onChange={this.handleTimePickerChange}
        style={timePickerStyle}
      />
      </div>
    );
  }
}

export default EditAvailabilitySchedule;
