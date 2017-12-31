import React from 'react';
import Slot from './Slot';
import TimePicker from 'material-ui/TimePicker';
import DatePicker from '../search/DatePicker';
import CircularProgress from 'material-ui/CircularProgress';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import classNames from 'classnames';
import {
  Button,
  HelpBlock,
  FormGroup,
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
  constructor(props) {
    super(props);

    this.schedule = {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: [],
    };

    if (this.props.schedule && this.props.schedule.schedule) {
      this.schedule = this.props.schedule.schedule.schedule;
    }

    this.state = {
      screenWidth: 0,
      screenHeight: 0,
      showSlideup: false,
      addMode: null,
      schedule: this.schedule,
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
      this.schedule = nextProps.schedule.schedule.schedule;

      this.setState({
        schedule: this.schedule,
        scheduleName: nextProps.schedule.schedule.name,
        id: nextProps.schedule.schedule.id,
        isChanged: false,
        startDate: new Date(nextProps.schedule.schedule.start),
        endDate: new Date(nextProps.schedule.schedule.end),
        selectedLocations: nextProps.schedule.schedule.locations,
      });
    }
  }

  handleSelectedLocationsChange(event, index, values) {
    console.log('values...', values);
    console.log('prev...', this.state.selectedLocations);
    const newSelectedLocations = this.props.locations.items
    .filter(l => values.indexOf(l.id) > -1)
    .map(l => {
      return { locationId: l.id, locationName: l.locationName };
    });
    this.setState({
      selectedLocations: newSelectedLocations,
      isChanged: true,
    });
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

    console.log('saving...', this.state.selectedLocations);
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

    // this is where an API call might go
    this.schedule[this.state.addMode].push(newTime);
    this.setState({
      schedule: this.schedule,
      isChanged: true,
    });
  }

  removeSlot(day, slot) {
    this.schedule[day] = this.schedule[day].filter(s => {
      const _s = new Date(s);
      return _s.getHours() !== slot.getHours() || _s.getMinutes() !== slot.getMinutes();
    });

    this.setState({
      schedule: this.schedule,
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
            schedule.map(s => <Slot key={`slot-${day}-${s}`} time={ new Date(s) } hoverText='Remove' day={day} onClick={this.removeSlot} />)
          }
          <Slot hoverText='Add Slot' day={day} onClick={this.setAddMode} />
        </div>
      </div>
    );
  }

  renderLocations(locations, selectedLocations) {
    console.log('shoudl it be checked?', selectedLocations.map(l => l.id).indexOf(location.id) > -1);
    console.log(selectedLocations.map(l => l.locationId));
    console.log(locations);
    return locations.map(location => (
      <MenuItem
        key={location.locationName}
        insetChildren={true}
        checked={selectedLocations.map(l => l.locationId).indexOf(location.id) > -1}
        value={location.id}
        primaryText={location.locationName}
      />
    ));
  }

  render() {
    console.log('render avail', this.state.selectedLocations);
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

    return (
      <div className='availability-schedule'>
        <div className='schedule-name container'>
          <Col md={3} lg={3} sm={3} xs={12} style={{paddingLeft: 0}}>
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
          <Col md={9} lg={9} sm={9} xs={12} style={{paddingLeft: 0}}>
            <div className='availability-day-of-week'>
              <h5>What locations should follow this schedule?</h5>
            </div>
            <SelectField
              multiple={true}
              hintText='Assigned locations'
              value={this.state.selectedLocations.map(l => l.locationId)}
              onChange={this.handleSelectedLocationsChange}
            >
              {this.renderLocations(this.props.locations.items, this.state.selectedLocations)}
            </SelectField>
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
          Object.keys(this.state.schedule).map(day => {
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
