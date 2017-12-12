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

  _slideupClick() {
    console.warn('slide up clicked');
    // this.props.onCancel();
  }

  render() {
    console.log('rendering?', this.props.active);
    const slideUpClass = classNames(
      'slide-up',
      {
        active: this.props.active,
      },
    );

    const dynamicStyles = {
      top: this.props.active ? '83px' : `${this.props.screenHeight + 100}px`,
    };
    
    return (
      <div className={slideUpClass} onTouchTap={this._slideupClick.bind(this)} style={dynamicStyles}>
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
