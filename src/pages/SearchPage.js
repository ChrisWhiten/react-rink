import React, { Component } from 'react';
import Timeline from '../components/search/Timeline';
import TimelineFilter from '../components/search/TimelineFilter';
import TimePlaceFilter from '../components/search/TimePlaceFilter';

class SearchPage extends Component {
  componentDidMount() {
    // dispatch to fetch data
    let start = new Date();
    start.setHours(0, 0, 0, 0); // midnight this morning
    let end = new Date();
    end.setHours(23, 59, 59, 999); // end of day
    this.props.searchEvents(start, end);
  }

  render() {
    return (
        <div>
          <TimePlaceFilter />
          <TimelineFilter />
          <Timeline events={this.props.searchableEvents} />
        </div>
    );
  }
}

export default SearchPage;
