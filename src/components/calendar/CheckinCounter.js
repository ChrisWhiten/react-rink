import React from 'react';
import PropTypes from 'prop-types';
import Add from 'material-ui/svg-icons/content/add';
import Remove from 'material-ui/svg-icons/content/remove';
import People from 'material-ui/svg-icons/social/people';
import classNames from 'classnames';
import {
  Tooltip,
  OverlayTrigger,
} from 'react-bootstrap';
import _ from 'lodash';

import './styles/CheckinCounter.css';

function preventLinking(e) {
  e.stopPropagation();
  e.preventDefault();
}

class CheckinCounter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: props.booking.checkedIn || 0,
      max: props.booking.slotCount,
    };

    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
  }

  add(e) {
    e.preventDefault();

    if (this.state.count === this.state.max) return;

    const newCount = this.state.count + 1;
    this.setState({
      count: newCount,
    });

    this.props.updateCounter(newCount);
  }

  remove(e) {
    e.preventDefault();

    if (this.state.count === 0) return;

    const newCount = this.state.count - 1;
    this.setState({
      count: newCount,
    });

    this.props.updateCounter(newCount);
  }

  render() {
    if (!this.props.booking) {
      return null;
    }

    const removeClass = classNames(
      'remove',
      {
        disabled: this.state.count === 0,
      },
    );

    const addClass = classNames(
      'add',
      {
        add: this.state.count < this.state.max,
      },
    );

    return (
      <div className='checkin-counter'>
        <OverlayTrigger placement='bottom' overlay={<Tooltip id='remove-tooltip'>Remove person</Tooltip>}>
          <div className={removeClass} onClick={preventLinking} onTouchTap={this.remove}>
            <Remove className='remove-icon' />
          </div>
        </OverlayTrigger>

        <div className='current-values'>
          <h5 className='checkin-text'>{this.state.count}/{this.state.max} <People className='checkin-people-icon' /></h5>
        </div>

        <OverlayTrigger placement='bottom' overlay={<Tooltip id='add-tooltip'>Add person</Tooltip>}>
          <div className={addClass} onClick={preventLinking} onTouchTap={this.add}>
            <Add className='add-icon' />
          </div>
        </OverlayTrigger>
      </div>
    );
  }
}

CheckinCounter.propTypes = {
  booking: PropTypes.object,
  updateCounter: PropTypes.func,
};

export default CheckinCounter;
