import React from 'react';
import PropTypes from 'prop-types';
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
      {
        headless: this.props.headless,
      },
    );

    const tabBarHeight = this.props.headless ? 0 : 80;
    const dynamicStyles = {
      top: this.props.active ? '80px' : `${this.props.screenHeight + 100}px`,
      height: this.props.screenHeight - tabBarHeight, // don't subtract so we get a buffer
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
