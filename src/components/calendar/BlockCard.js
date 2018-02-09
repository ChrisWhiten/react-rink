import React from 'react';
import PropTypes from 'prop-types';
import Block from 'material-ui/svg-icons/content/block';
import Delete from 'material-ui/svg-icons/action/delete';
import moment from 'moment';
import {
  FormGroup,
  FormControl,
  ControlLabel,
} from 'react-bootstrap';

import './styles/BlockCard.css';
import { RaisedButton } from 'material-ui';

class BlockCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      updatingStatus: false,
    };

    this.deleteBlock = this.deleteBlock.bind(this);
  }

  deleteBlock() {
    console.log('should delete block');
  }

  render() {
    const b = this.props.block;
    console.log('b', b);

    const text = b.slotCount === 1 ? 'Blocked Slot' : 'Blocked Slots';
    return (
      <div className='summary-box block-card' key={`block-${b.id}`}>
          <div className='title-section'>
            <div className='title'>
              <h4>{b.slotCount} {text}</h4>
            </div>
            <div className='subtitle'>
              <h5>{b.locationName} @ {moment(b.start).format('LT')}</h5>
            </div>
          </div>

          <div className='img-section'>
            <Block className='blocked-slot-avatar' />
          </div>

          <div className='reason-section'>
            <FormGroup controlId='formControlsTextarea'>
              {/* <ControlLabel>Reason</ControlLabel> */}
              <FormControl componentClass='textarea' placeholder='reason'>
                {b.reason}
              </FormControl>
            </FormGroup>
          </div>

          <div className='delete-section'>
            <RaisedButton
              // disabled={this.props.isUpdating}
              labelColor='#fff'
              label='Remove Block'
              backgroundColor='#f54'
              icon={<Delete />}
              onClick={this.deleteBlock}
            />
          </div>
      </div>
    );
  }
}

BlockCard.propTypes = {
  block: PropTypes.object,
};

export default BlockCard;