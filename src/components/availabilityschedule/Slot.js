import React from 'react';
import moment from 'moment';

import './Slot.css';

class Slot extends React.Component {
  constructor() {
    super();

    this.state = {
      open: false,
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.onClick(this.props.day, this.props.time);
  }

  render() {
    return (
      <div className='slot' onTouchTap={this.onClick}>
        {
          this.props.time &&
          <div className='slot-time'>
            { moment(this.props.time).format('LT') }
          </div>
        }
        {
          !this.props.time &&
            <div className='add-icon-container'>
              +
            </div>
        }
        <div className='remove-slot'>
          { this.props.hoverText }
        </div>
      </div>
    )
  }
}

export default Slot;
