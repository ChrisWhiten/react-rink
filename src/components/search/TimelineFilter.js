import React from 'react';
import EventFilter from './EventFilter';
import './TimelineFilter.css';

class TimelineFilter extends React.Component {

  constructor() {
    super();

    this.state = {
      selected: null,
    };
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
          <EventFilter active={this.state.selected === 'event-type'} handleClick={this._filterClicked.bind(this)} filter={`event-type`} text={`Event Type`} />
        </span>
        <span>
          <EventFilter active={this.state.selected === 'demographic'} handleClick={this._filterClicked.bind(this)} filter={`demographic`} text={`Demographic`} />
        </span>
        <span>
          <EventFilter active={this.state.selected === 'more'} handleClick={this._filterClicked.bind(this)} filter={`more`} text={`More filters`} />
        </span>
      </div>
    );
  }
}

export default TimelineFilter;
