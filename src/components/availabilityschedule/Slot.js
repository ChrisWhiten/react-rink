import React, {PropTypes} from 'react';
import classNames from 'classnames';
import moment from 'moment';
import Add from 'material-ui/svg-icons/content/add';

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
