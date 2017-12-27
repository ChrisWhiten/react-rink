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
import RaisedButton from 'material-ui/RaisedButton';
import Add from 'material-ui/svg-icons/content/add';
import {List, ListItem} from 'material-ui/List';
import {
  Link,
} from 'react-router';

import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import Subheader from 'material-ui/Subheader';
import ActionInfo from 'material-ui/svg-icons/action/info';

import './ScheduleSummary.css';

class ScheduleSummary extends React.Component {
  constructor() {
    super();

    this.state = {
      // schedules: [],
      schedules: [{
        name: 'My schedule',
      }],
    };
  }

  render() {
    return (
      <div className='schedule-summary'>
        <div className='create-new'>
          <Link to='availabilitySchedules/new'>
          <RaisedButton
            label="Create schedule"
            primary={true}
            icon={<Add className="muidocs-icon-custom-github" />}
          />
          </Link>
        </div>

        {
          this.state.schedules && this.state.schedules.length === 0 &&
          <div className='no-schedules'>
            No schedules!
          </div>
        }
        {
          this.state.schedules && this.state.schedules.length > 0 &&
          <div className='schedule-list'>
            <List>
              <Subheader inset={true}>Folders</Subheader>
              <ListItem
                leftAvatar={<Avatar icon={<FileFolder />} />}
                rightIcon={<ActionInfo />}
                primaryText="Photos"
                secondaryText="Jan 9, 2014"
              />
              <ListItem
                leftAvatar={<Avatar icon={<FileFolder />} />}
                rightIcon={<ActionInfo />}
                primaryText="Recipes"
                secondaryText="Jan 17, 2014"
              />
              <ListItem
                leftAvatar={<Avatar icon={<FileFolder />} />}
                rightIcon={<ActionInfo />}
                primaryText="Work"
                secondaryText="Jan 28, 2014"
              />
            </List>
          </div>
        }
      </div>
    );
  }
}

export default ScheduleSummary;
