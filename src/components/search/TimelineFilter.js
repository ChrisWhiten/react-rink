import React from 'react';
import EventFilter from './EventFilter';
import locale from '../../localization/locale';
import './styles/TimelineFilter.css';


import Select from 'react-select';
import 'react-select/dist/react-select.css';


class TimelineFilter extends React.Component {

  constructor() {
    super();

    this.state = {
      selected: null,
      selectedLocations: [],
    };

    this.locale = locale.getLocale();
    this.handleSelectedLocationsChange = this.handleSelectedLocationsChange.bind(this);
  }

  _filterClicked(filter) {
    const selected = (filter === this.state.selected) ? null : filter;
    this.setState({
      selected: selected,
    });
  }

  handleSelectedLocationsChange = (selectedLocations) => {
    this.setState({ selectedLocations });
  }

  render() {

    // const options = this.props.locations.items.map(l => {
    //   return {locationId: l.id, locationName: l.locationName};
    // });
    const options = [{
      locationId: 'abcdefg',
      locationName: 'Canadian Tire Centre',
      className: 'test',
    }, {
      locationId: 'fasdf',
      locationName: 'Lansdowne Park',
      className: 'test',
    }, {
      locationId: 'oijew',
      locationName: 'Test123',
      className: 'test',
    }, {
      locationId: 'fasdff',
      locationName: 'Lansdowne Park2',
      className: 'test',
    }, {
      locationId: 'fasdfasdf',
      locationName: 'Lansdowne Park3',
      className: 'test',
    }, {
      locationId: 'fasdfasdfafds',
      locationName: 'Lansdowne Park4',
      className: 'test',
    }];

    return (
      <div className='new-location-picker'>
        <Select
          multi={true}
          className='hello123'
          valueKey='locationId'
          labelKey='locationName'
          value={this.state.selectedLocations}
          onChange={this.handleSelectedLocationsChange}
          options={options}
        />
      </div>
    );
    // TODO: render actual filter dialogs here, as well.
    // return (
    //   <div className='timeline-filter'>
    //     <span>
    //       <EventFilter
    //         inverted={this.props.inverted}
    //         active={this.state.selected === 'event-type'}
    //         handleClick={this._filterClicked.bind(this)}
    //         filter={`event-type`}
    //         text={`${this.locale.filters.eventType}`} />
    //     </span>
    //   </div>
    // );
  }
}

export default TimelineFilter;
