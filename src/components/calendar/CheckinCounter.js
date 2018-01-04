import React, {PropTypes} from 'react';
import Add from 'material-ui/svg-icons/content/add';
import Remove from 'material-ui/svg-icons/content/remove';
import People from 'material-ui/svg-icons/social/people';
import classNames from 'classnames';

import './styles/CheckinCounter.css';

class CheckinCounter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: props.booking.checkedInCount || 0,
      max: props.booking.slotCount,
    };

    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
  }

  add() {
    if (this.state.count === this.state.max) return;

    const newCount = this.state.count + 1;
    this.setState({
      count: newCount,
    });

    this.props.updateCounter(this.props.booking, newCount);
  }

  remove() {
    if (this.state.count === 0) return;

    const newCount = this.state.count - 1;
    this.setState({
      count: newCount,
    });

    this.props.updateCounter(this.props.booking, newCount);
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
        <div className={removeClass} onTouchTap={this.remove}>
          <Remove className='remove-icon' />
        </div>

        <div className='current-values'>
          <h5 className='checkin-text'>{this.state.count}/{this.state.max} <People className='checkin-people-icon' /></h5>
        </div>

        <div className={addClass} onTouchTap={this.add}>
          <Add className='add-icon' />
        </div>
      </div>
    );
  }
}

CheckinCounter.propTypes = {
  booking: PropTypes.object,
  updateCounter: PropTypes.func,
};

export default CheckinCounter;
