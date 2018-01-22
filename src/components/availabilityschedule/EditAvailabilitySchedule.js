import React from 'react';
import Slot from './Slot';
import TimePicker from 'material-ui/TimePicker';
import DatePicker from '../search/DatePicker';
import CircularProgress from 'material-ui/CircularProgress';
import classNames from 'classnames';
import Select from 'react-select';
import {
  Button,
  HelpBlock,
  FormGroup,
  FormControl,
  Col,
} from 'react-bootstrap';

import './EditAvailabilitySchedule.css';
import 'react-select/dist/react-select.css';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function FieldGroup({ id, label, help, validationState, ...props }) {
  return (
    <FormGroup controlId={id} validationState={validationState}>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

class EditAvailabilitySchedule extends React.Component {
  constructor(props) {
    super(props);

    let initialSchedule = {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: [],
    };

    // only work with a fetched schedule if we are viewing a fetched schedule...makese sense
    if (props.router && props.router.params.scheduleId && props.schedule && props.schedule.schedule) {
      initialSchedule = props.schedule.schedule.schedule;
    }

    this.state = {
      screenWidth: 0,
      screenHeight: 0,
      showSlideup: false,
      addMode: null,
      schedule: Object.assign({}, initialSchedule),
      scheduleName: '',
      isChanged: false,
      startDate: null,
      endDate: null,
      updating: false,
      selectedLocations: [],
    };

    this.setAddMode = this.setAddMode.bind(this);
    this.handleTimePickerChange = this.handleTimePickerChange.bind(this);
    this.removeSlot = this.removeSlot.bind(this);
    this.save = this.save.bind(this);
    this.scheduleNameChange = this.scheduleNameChange.bind(this);
    this.onStartChange = this.onStartChange.bind(this);
    this.onEndChange = this.onEndChange.bind(this);
    this.handleSelectedLocationsChange = this.handleSelectedLocationsChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.schedule && nextProps.schedule.schedule) {

      this.setState({
        schedule: nextProps.schedule.schedule.schedule,
        scheduleName: nextProps.schedule.schedule.name,
        id: nextProps.schedule.schedule.id,
        isChanged: false,
        startDate: new Date(nextProps.schedule.schedule.start),
        endDate: new Date(nextProps.schedule.schedule.end),
        selectedLocations: nextProps.schedule.schedule.locations,
      });
    }
  }

  handleSelectedLocationsChange = (selectedLocations) => {
    this.setState({ selectedLocations });
  }

  onStartChange(d) {
    this.setState({
      startDate: d,
      isChanged: true,
    });
  }

  onEndChange(d) {
    this.setState({
      endDate: d,
      isChanged: true,
    });
  }

  scheduleNameChange(e) {
    this.setState({
      scheduleName: e.target.value,
      isChanged: true,
    });
  }

  save() {
    this.setState({
      updating: true,
    });

    const fn = this.state.id ? this.props.updateSchedule : this.props.createSchedule;

    fn({
      id: this.state.id,
      name: this.state.scheduleName,
      schedule: this.state.schedule,
      start: this.state.startDate,
      end: this.state.endDate,
      locations: this.state.selectedLocations,
    }, (err, success) => {
      this.setState({
        updating: false,
        isChanged: false,
      });

      this.props.router.push('/availabilitySchedules');
    });
  }

  handleTimePickerChange(unused, time) {
    let newTime = new Date();
    newTime.setHours(time.getHours());
    newTime.setMinutes(time.getMinutes());
    newTime.setSeconds(0);

    const newSlot = {
      startTime: newTime,
      duration: 60,
      totalSlots: 20,
      isPublic: true,
    };

    const newSchedule = Object.assign({}, this.state.schedule);
    newSchedule[this.state.addMode] = newSchedule[this.state.addMode].concat([newSlot]);
    this.setState({
      schedule: newSchedule,
      isChanged: true,
    });
  }

  removeSlot(day, slot) {
    const newSchedule = Object.assign({}, this.state.schedule);
    newSchedule[day] = newSchedule[day].filter(s => {
      const _s = new Date(s.startTime);
      return _s.getHours() !== slot.getHours() || _s.getMinutes() !== slot.getMinutes();
    });
    this.setState({
      schedule: newSchedule,
      isChanged: true,
    });
  }

  setAddMode(day) {
    this.setState({
      addMode: day,
    });

    this.refs.timePicker.openDialog();
  }

  renderSchedule(day, schedule) {
    const scheduleClass = classNames(
      'container',
      'schedule-rendered',
      {
        last: day === 'Sunday',
      },
    );

    return (
      <div key={`schedule-${day}`} className={scheduleClass}>
        <div className='availability-day-of-week'>
          <h5>{ day }</h5>
        </div>

        <hr className='external-separator' />

        <div className='availability-slots'>
          {
            schedule.map(s => <Slot key={`slot-${day}-${s.startTime}`} time={ new Date(s.startTime) } hoverText='Remove' day={day} onClick={this.removeSlot} />)
          }
          <Slot hoverText='Add Slot' day={day} onClick={this.setAddMode} />
        </div>
      </div>
    );
  }

  render() {
    if (this.props.schedule && this.props.schedule.isFetching) {
      return <div className='loading-schedule'>
        <CircularProgress />
      </div>
    }
    const timePickerStyle = {
      display: 'none',
    };

    const saveButtonContainer = classNames(
      'save-button-container',
      {
        active: this.state.isChanged,
      },
    );

    const options = this.props.locations.items.map(l => {
      return {locationId: l.id, locationName: l.locationName};
    });

    return (
      <div className='availability-schedule'>
        <div className='schedule-name container'>
          <Col md={8} lg={8} sm={8} xs={12} style={{paddingLeft: 0}}>
            <div className='availability-day-of-week'>
              <h5>What should we name this schedule?</h5>
            </div>
            <FieldGroup
              id='schedule-name'
              type='text'
              placeholder='Schedule name'
              onChange={this.scheduleNameChange}
              value={this.state.scheduleName}
            />
          </Col>
          <Col md={8} lg={8} sm={8} xs={12} style={{paddingLeft: 0}}>
            <div className='availability-day-of-week'>
              <h5>What locations should follow this schedule?</h5>
            </div>
            <Select
              multi={true}
              valueKey='locationId'
              labelKey='locationName'
              value={this.state.selectedLocations}
              onChange={this.handleSelectedLocationsChange}
              options={options}
            />
          </Col>
        </div>
        <hr className='external-separator' />
        <div className='container schedule-date-range'>
          <div className='availability-day-of-week'>
            <h5>When should this schedule be applied?</h5>
          </div>
          <span className='schedule-date-picker'>
            <DatePicker date={this.state.startDate} onChange={this.onStartChange} nullText='Start date' hintText='Start date' />
          </span>
          <span className='schedule-date-picker'>
            <DatePicker date={this.state.endDate} onChange={this.onEndChange} nullText='End date' hintText='End date' />
          </span>
          <hr className='external-separator' />
        </div>
        {
          daysOfWeek.map(day => {
            return this.renderSchedule(day, this.state.schedule[day]);
          })
        }

        <hr className='external-separator' />

        <div className={saveButtonContainer}>
          <div className='container save-button'>
            <Button
              bsStyle='success'
              bsSize='large'
              onClick={this.save}
              disabled={this.state.updating}
              block
            >
            {
              this.state.updating &&
              <CircularProgress color='white' size={18} style={{ position: 'relative'}} />
            }
            {
              !this.state.updating &&
              <span>Save</span>
            }
            </Button>
          </div>
        </div>

      <TimePicker
        minutesStep={15}
        ref='timePicker'
        name='availability-time-picker'
        onChange={this.handleTimePickerChange}
        style={timePickerStyle}
      />
      </div>
    );
  }
}

export default EditAvailabilitySchedule;
