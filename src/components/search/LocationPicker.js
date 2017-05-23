import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RoomIcon from 'material-ui/svg-icons/action/room';

import './LocationPicker.css';

class LocationPicker extends React.Component {
  constructor() {
  	super();

  	this.state = {
  		open: false,
  	};
  }

  _handleOpen() {
  	this.setState({
  		open: true,
  	});
  }

  _handleClose() {
  	this.setState({
  		open: false,
  	});
  }

  render() {
  	const actions = [
      <FlatButton
        label='Cancel'
        primary={true}
        onTouchTap={this._handleClose.bind(this)}
      />,
      <FlatButton
        label='Submit'
        primary={true}
        keyboardFocused={true}
        onTouchTap={this._handleClose.bind(this)}
      />,
    ];

    return (
      <div className='location-picker' onTouchTap={this._handleOpen.bind(this)}>
        <div className='location-target'>
        	<div className='location-icon'>
        		<RoomIcon className='location-icon-svg' />
    		</div>
        	Anywhere
        </div>
        <Dialog
          title='Pick locations'
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this._handleClose.bind(this)}
          autoScrollBodyContent={true}
        >
          <div>sup</div>
        </Dialog>
      </div>
    );
  }
}

export default LocationPicker;