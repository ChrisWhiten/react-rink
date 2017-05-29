import React from 'react';
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
    this.props.handleClick(this.props.filter);
    // this.setState({
    //   selected: !this.state.selected,
    // });
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
        active: this.props.active,
      },
    );

    const chevronClass = classNames(
      'chevron',
      {
        active: this.props.active,
      }
    );

    return (
      <div className='event-type-filter'>
        <div className={selectorClass} onClick={this._filterClicked.bind(this)}>
          <h4 className='filter-title'>
            {this.props.text}
          </h4>
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

export default EventFilter;
