import React, {PropTypes} from 'react';
import classNames from 'classnames';

import './styles/SlideUp.css';

class SlideUp extends React.Component {
  constructor() {
    super();

    this.state = {
      active: false,
      selectedBooking: null,
    };
  }

  render() {
    const slideUpClass = classNames(
      'slide-up',
      {
        active: this.props.active,
      },
    );

    const dynamicStyles = {
      top: this.props.active ? '80px' : `${this.props.screenHeight + 100}px`,
    };
    
    return (
      <div className={slideUpClass} onTouchTap={this.props.onCancel} style={dynamicStyles}>
        Hi
      </div>
    );
  }
}

SlideUp.propTypes = {
  booking: PropTypes.object,
  screenHeight: PropTypes.number,
};

export default SlideUp;
