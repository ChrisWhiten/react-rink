import React from 'react';
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import MorningIcon from 'material-ui/svg-icons/image/brightness-5';
import AfternoonIcon from 'material-ui/svg-icons/image/brightness-6';
import EveningIcon from 'material-ui/svg-icons/image/brightness-3';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import classNames from 'classnames';

import './styles/EventFilter.css';

class EventFilter extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selected: false,
      morningChecked: false,
      afternoonChecked: false,
      eveningChecked: false,
      screenWidth: 0,
      screenHeight: 0,
    };

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
    });
  }

  _filterClicked() {
    this.props.handleClick(this.props.filter);
  }

  _handleMorningClick() {
    this.setState({
      morningChecked: !this.state.morningChecked,
    });

    // TODO: pass current state up to props
  }

  _handleAfternoonClick() {
    this.setState({
      afternoonChecked: !this.state.afternoonChecked,
    });
  }

  _handleEveningClick() {
    this.setState({
      eveningChecked: !this.state.eveningChecked,
    });
  }

  _selectedCount() {
    let selectedCount = 0;
    if (this.state.morningChecked) {
      selectedCount++;
    }

    if (this.state.afternoonChecked) {
      selectedCount++;
    }

    if (this.state.eveningChecked) {
      selectedCount++;
    }

    return selectedCount;
  }

  render() {
    const iconStyle = {
      height: '16px',
      width: '16px',
      color: '#767676',
    };

    if (this.props.inverted) {
      iconStyle.color = '#fff';
    }

    const checkboxStyle = {
      marginTop: 'auto',
      marginBottom: 'auto',
      display: 'inline',
      width: 'inherit !important',
    };

    const selectorClass = classNames(
      'filter-selector',
      {
        active: this.props.active,
      },
      {
        inverted: this.props.inverted,
      },
    );

    const chevronClass = classNames(
      'chevron',
      {
        active: this.props.active,
      },
      {
        inverted: this.props.inverted,
      },
    );

    const chevronSvgClass = classNames(
      'chevron-svg',
      {
        inverted: this.props.inverted,
      },
      {
        active: this.props.active,
      },
    )

    const filterClass = classNames(
      'filter-panel',
      {
        active: this.props.active,
      },
    );

    const titleClass = classNames(
      'filter-title',
      {
       inverted:  this.props.inverted,
      },
    );

    const filterStyles = {
      maxHeight: this.state.screenHeight - 200,
    };

    const selectedCount = this._selectedCount();

    // TODO: pass the actual filter page as this.props.children rather than hard-coding it in the filter div
    return (
      <div className='event-type-filter'>
        <div className='filter'>
          <Paper className={filterClass} style={filterStyles}>
            <div className='time-range-filter' onClick={this._handleMorningClick.bind(this)}>
              <Checkbox
                checked={this.state.morningChecked}
                style={checkboxStyle}
              />
              <div className='foobar'>
                <div className='time-range-title'>
                  <span>Mornings</span>
                </div>
                <div className='time-range-description'>
                  <span>Open - 12PM</span>
                </div>
              </div>
              <div className='time-icon'>
                <MorningIcon className='time-icon-svg' />
              </div>
            </div>

            <div className='time-range-filter' onClick={this._handleAfternoonClick.bind(this)}>
              <Checkbox
                checked={this.state.afternoonChecked}
                style={checkboxStyle}
              />
              <div className='foobar'>
                <div className='time-range-title'>
                  <span>Afternoon</span>
                </div>
                <div className='time-range-description'>
                  <span>12PM - 5PM</span>
                </div>
              </div>
              <div className='time-icon'>
                <AfternoonIcon className='time-icon-svg' />
              </div>
            </div>

            <div className='time-range-filter' onClick={this._handleEveningClick.bind(this)}>
              <Checkbox
                checked={this.state.eveningChecked}
                style={checkboxStyle}
              />
              <div className='foobar'>
                <div className='time-range-title'>
                  <span>Evening</span>
                </div>
                <div className='time-range-description'>
                  <span>5PM - Close</span>
                </div>
              </div>
              <div className='time-icon'>
                <EveningIcon className='time-icon-svg' />
              </div>
            </div>






            <div className='time-range-filter' onClick={this._handleEveningClick.bind(this)}>
              <Checkbox
                checked={this.state.eveningChecked}
                style={checkboxStyle}
              />
              <div className='foobar'>
                <div className='time-range-title'>
                  <span>Evening</span>
                </div>
                <div className='time-range-description'>
                  <span>5PM - Close</span>
                </div>
              </div>
              <div className='time-icon'>
                <EveningIcon className='time-icon-svg' />
              </div>
            </div><div className='time-range-filter' onClick={this._handleEveningClick.bind(this)}>
              <Checkbox
                checked={this.state.eveningChecked}
                style={checkboxStyle}
              />
              <div className='foobar'>
                <div className='time-range-title'>
                  <span>Evening</span>
                </div>
                <div className='time-range-description'>
                  <span>5PM - Close</span>
                </div>
              </div>
              <div className='time-icon'>
                <EveningIcon className='time-icon-svg' />
              </div>
            </div><div className='time-range-filter' onClick={this._handleEveningClick.bind(this)}>
              <Checkbox
                checked={this.state.eveningChecked}
                style={checkboxStyle}
              />
              <div className='foobar'>
                <div className='time-range-title'>
                  <span>Evening</span>
                </div>
                <div className='time-range-description'>
                  <span>5PM - Close</span>
                </div>
              </div>
              <div className='time-icon'>
                <EveningIcon className='time-icon-svg' />
              </div>
            </div><div className='time-range-filter' onClick={this._handleEveningClick.bind(this)}>
              <Checkbox
                checked={this.state.eveningChecked}
                style={checkboxStyle}
              />
              <div className='foobar'>
                <div className='time-range-title'>
                  <span>Evening</span>
                </div>
                <div className='time-range-description'>
                  <span>5PM - Close</span>
                </div>
              </div>
              <div className='time-icon'>
                <EveningIcon className='time-icon-svg' />
              </div>
            </div><div className='time-range-filter' onClick={this._handleEveningClick.bind(this)}>
              <Checkbox
                checked={this.state.eveningChecked}
                style={checkboxStyle}
              />
              <div className='foobar'>
                <div className='time-range-title'>
                  <span>Evening</span>
                </div>
                <div className='time-range-description'>
                  <span>5PM - Close</span>
                </div>
              </div>
              <div className='time-icon'>
                <EveningIcon className='time-icon-svg' />
              </div>
            </div><div className='time-range-filter' onClick={this._handleEveningClick.bind(this)}>
              <Checkbox
                checked={this.state.eveningChecked}
                style={checkboxStyle}
              />
              <div className='foobar'>
                <div className='time-range-title'>
                  <span>Evening</span>
                </div>
                <div className='time-range-description'>
                  <span>5PM - Close</span>
                </div>
              </div>
              <div className='time-icon'>
                <EveningIcon className='time-icon-svg' />
              </div>
            </div><div className='time-range-filter' onClick={this._handleEveningClick.bind(this)}>
              <Checkbox
                checked={this.state.eveningChecked}
                style={checkboxStyle}
              />
              <div className='foobar'>
                <div className='time-range-title'>
                  <span>Evening</span>
                </div>
                <div className='time-range-description'>
                  <span>5PM - Close</span>
                </div>
              </div>
              <div className='time-icon'>
                <EveningIcon className='time-icon-svg' />
              </div>
            </div><div className='time-range-filter' onClick={this._handleEveningClick.bind(this)}>
              <Checkbox
                checked={this.state.eveningChecked}
                style={checkboxStyle}
              />
              <div className='foobar'>
                <div className='time-range-title'>
                  <span>Evening</span>
                </div>
                <div className='time-range-description'>
                  <span>5PM - Close</span>
                </div>
              </div>
              <div className='time-icon'>
                <EveningIcon className='time-icon-svg' />
              </div>
            </div><div className='time-range-filter' onClick={this._handleEveningClick.bind(this)}>
              <Checkbox
                checked={this.state.eveningChecked}
                style={checkboxStyle}
              />
              <div className='foobar'>
                <div className='time-range-title'>
                  <span>Evening</span>
                </div>
                <div className='time-range-description'>
                  <span>5PM - Close</span>
                </div>
              </div>
              <div className='time-icon'>
                <EveningIcon className='time-icon-svg' />
              </div>
            </div><div className='time-range-filter' onClick={this._handleEveningClick.bind(this)}>
              <Checkbox
                checked={this.state.eveningChecked}
                style={checkboxStyle}
              />
              <div className='foobar'>
                <div className='time-range-title'>
                  <span>Evening</span>
                </div>
                <div className='time-range-description'>
                  <span>5PM - Close</span>
                </div>
              </div>
              <div className='time-icon'>
                <EveningIcon className='time-icon-svg' />
              </div>
            </div>
          </Paper>
        </div>
        <div className={selectorClass} onClick={this._filterClicked.bind(this)}>
          <h4 className={titleClass}>
            {this.props.text}
          </h4>
          {
            selectedCount > 0 &&
            <div className='selected-count'>
              { selectedCount }
            </div>
          }
          <div className={chevronClass}>
            <ChevronLeft className={chevronSvgClass} style={iconStyle} />
          </div>
        </div>
      </div>
    );
  }
}

export default EventFilter;
