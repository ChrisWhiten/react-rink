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
      top: this.props.active ? '83px' : `${this.props.screenHeight + 100}px`,
      height: this.props.screenHeight - 83,
      zIndex: this.props.zIndex ? this.props.zIndex : 6,
    };

    return (
      <div className={slideUpClass} style={dynamicStyles}>
        { this.props.children }
      </div>
    );
  }
}

SlideUp.propTypes = {
  booking: PropTypes.object,
  screenHeight: PropTypes.number,
};

export default SlideUp;
