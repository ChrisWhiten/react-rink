import React, {PropTypes} from 'react';
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import classNames from 'classnames';

import './EventFilter.css';

class EventFilter extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selected: false,
    }
  }

  _filterClicked() {
    this.setState({
      selected: !this.state.selected,
    });
  }

  render() {
    const iconStyle = {
      height: '16px',
      width: '16px',
      color: '#767676',
    };

    const selectorClass = classNames(
      'filter-selector',
      {
        active: this.state.selected,
      },
    );

    const chevronClass = classNames(
      'chevron',
      {
        active: this.state.selected,
      }
    );

    return (
      <div className='event-type-filter'>
        <div className={selectorClass} onClick={this._filterClicked.bind(this)}>
          <p className='filter-title'>
            {this.props.text}
          </p>
          <div className={chevronClass}>
            <ChevronLeft style={iconStyle} />
          </div>
        </div>
        <div className='filter'>
        </div>
      </div>
    );
  }
}

EventFilter.propTypes = {
};

export default EventFilter;
