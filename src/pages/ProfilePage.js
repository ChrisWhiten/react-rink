import React from 'react';
import {Link} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import Toggle from 'material-ui/Toggle';
import {grey400} from 'material-ui/styles/colors';
import PageBase from '../components/PageBase';
import Paper from 'material-ui/Paper';
import globalStyles from '../styles';

import './styles/ProfilePage.css';

const ProfilePage = () => {

  const styles = {
    toggleDiv: {
      maxWidth: 300,
      marginTop: 40,
      marginBottom: 5
    },
    toggleLabel: {
      color: grey400,
      fontWeight: 100
    },
    buttons: {
      marginTop: 30,
      float: 'right'
    },
    saveButton: {
      marginLeft: 5
    }
  };

  let possibleDates = [];
  for (let i = 1; i <= 31; i++) {
    possibleDates.push(i);
  };

  const possibleMonths = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  let possibleYears = [];
  for (let i = 1900; i <= 2017; i++) {
    possibleYears.push(i);
  }

  return (
    <PageBase>
      <Paper style={globalStyles.paper}>
        <div className='profile-section-title' style={globalStyles.title}>
          About Me
        </div>
        <div className='name'>
          <TextField
            floatingLabelText='First Name'
            fullWidth={false}
            className='name-text-field' />

          <TextField
            floatingLabelText='Last Name'
            fullWidth={false} />
        </div>

        <div className='dob'>
          <SelectField
            floatingLabelText='Day'
            value={1}
            fullWidth={false}
            className='dob-day'>
            {
              possibleDates.map(date => {
                return <MenuItem key={date} primaryText={`${date}`} />
              })
            }
          </SelectField>

          <SelectField
            floatingLabelText='Month'
            value={1}
            fullWidth={false}
            className='dob-month'>
            {
              possibleMonths.map(month => {
                return <MenuItem key={month} primaryText={`${month}`} />
              })
            }
          </SelectField>

          <SelectField
            floatingLabelText='Year'
            value={1}
            fullWidth={false}
            className='dob-year'>
            {
              possibleYears.map(year => {
                return <MenuItem key={year} primaryText={`${year}`} />
              })
            }
          </SelectField>
        </div>

        <SelectField
          floatingLabelText="City"
          value=""
          fullWidth={true}>
          <MenuItem key={0} primaryText="London"/>
          <MenuItem key={1} primaryText="Paris"/>
          <MenuItem key={2} primaryText="Rome"/>
        </SelectField>

        <SelectField
          floatingLabelText="Gender"
          value={1}
          fullWidth={false}>
          <MenuItem key={2} primaryText=''/>
          <MenuItem key={0} primaryText='Male'/>
          <MenuItem key={1} primaryText='Female'/>
        </SelectField>
      </Paper>

      <Paper style={globalStyles.paper}>
        <div className='profile-section-title' style={globalStyles.title}>
          Preferences
        </div>

        <TextField floatingLabelText='TODO: skill level' />
        <TextField floatingLabelText='TODO: add positions to list' />
        <TextField floatingLabelText='TODO: should we assign arenas?' />
        <TextField floatingLabelText='TODO: add positions to list' />
        <Toggle label='Invite me to events' />
      </Paper>

      <Paper style={globalStyles.paper}>
        <div className='profile-section-title' style={globalStyles.title}>
          Contact me...
        </div>

        <Toggle label='when users interact with me' />
        <Toggle label='with offers and updates' />
      </Paper>

      <div style={styles.buttons}>
        <Link to="profile/preferences">
          <RaisedButton label="Cancel"/>
        </Link>

        <RaisedButton label="Save"
                      style={styles.saveButton}
                      type="submit"
                      primary={true}/>
      </div>
    </PageBase>
  );
};

export default ProfilePage;
