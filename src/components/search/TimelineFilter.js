import React from 'react';
import EventFilter from './EventFilter';
import locale from '../../localization/locale';
import './styles/TimelineFilter.css';

class TimelineFilter extends React.Component {

  constructor() {
    super();

    this.state = {
      selected: null,
    };

    this.locale = locale.getLocale();
  }

  _filterClicked(filter) {
    const selected = (filter === this.state.selected) ? null : filter;
    this.setState({
      selected: selected,
    });
  }

  render() {
    // TODO: render actual filter dialogs here, as well.
    return (
      <div className='timeline-filter'>
        <span>
          <EventFilter 
            inverted={this.props.inverted} 
            active={this.state.selected === 'event-type'} 
            handleClick={this._filterClicked.bind(this)} 
            filter={`event-type`} 
            text={`${this.locale.filters.eventType}`} />
        </span>
        <span>
          <EventFilter 
            inverted={this.props.inverted} 
            active={this.state.selected === 'demographic'} 
            handleClick={this._filterClicked.bind(this)} 
            filter={`demographic`} 
            text={`${this.locale.filters.demographic}`} />
        </span>
      </div>
    );
  }
}

export default TimelineFilter;
