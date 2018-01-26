import React from 'react';
// import EventFilter from './EventFilter';
import locale from '../../localization/locale';
import './styles/TimelineFilter.css';


import Select from 'react-select';
import 'react-select/dist/react-select.css';


class TimelineFilter extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selected: null,
      selectedLocations: props.multi ? [] : null,
    };

    this.locale = locale.getLocale();
    this.handleSelectedLocationsChange = this.handleSelectedLocationsChange.bind(this);
    this.renderSelectValue = this.renderSelectValue.bind(this);
  }

  _filterClicked(filter) {
    const selected = (filter === this.state.selected) ? null : filter;
    this.setState({
      selected: selected,
    });
  }

  handleSelectedLocationsChange = (selectedLocations) => {
    this.setState({ selectedLocations });
    this.props.onLocationsSelectedChanged(selectedLocations);
  }

  renderSelectValue = (option) => {
    if (!this.props.multi) {
      return option.locationName;
    }

    if (this.state.selectedLocations.indexOf(option) < 2) {
      return option.locationName;
    }

    return <span>{this.state.selectedLocations.length - 2} more</span>
  }

  render() {
    let locationList = this.props.locations ? this.props.locations.items : [];
    console.log('huh', locationList, this.props.locations);
    const options = locationList.map(l => {
      return {locationId: l.id, locationName: l.locationName};
    });
    // const options = [{
    //   locationId: 'abcdefg',
    //   locationName: 'Canadian Tire Centre',
    //   className: 'test',
    // }, {
    //   locationId: 'fasdf',
    //   locationName: 'Lansdowne Park',
    //   className: 'test',
    // }, {
    //   locationId: 'oijew',
    //   locationName: 'Test123',
    //   className: 'test',
    // }, {
    //   locationId: 'fasdff',
    //   locationName: 'Lansdowne Park2',
    //   className: 'test',
    // }, {
    //   locationId: 'fasdfasdf',
    //   locationName: 'Lansdowne Park3',
    //   className: 'test',
    // }, {
    //   locationId: 'fasdfasdfafds',
    //   locationName: 'Lansdowne Park4',
    //   className: 'test',
    // }];

    return (
      <div className='new-location-picker'>
        <Select
          multi={this.props.multi}
          className='location-picker-select'
          valueKey='locationId'
          labelKey='locationName'
          value={this.state.selectedLocations}
          placeholder='Select a location'
          onChange={this.handleSelectedLocationsChange}
          options={options}
          valueRenderer={this.renderSelectValue}
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
