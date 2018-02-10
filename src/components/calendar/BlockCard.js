import React from 'react';
import PropTypes from 'prop-types';
import Block from 'material-ui/svg-icons/content/block';
import Delete from 'material-ui/svg-icons/action/delete';
import ThumbsUp from 'material-ui/svg-icons/action/thumb-up';
import ThumbsDown from 'material-ui/svg-icons/action/thumb-down';
import CircularProgress from 'material-ui/CircularProgress';
import moment from 'moment';
import {
  FormGroup,
  FormControl,
  ControlLabel,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';

import './styles/BlockCard.css';
import { RaisedButton } from 'material-ui';

class BlockCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      updatingStatus: false,
      confirmRemoval: false,
      deleting: false,
    };

    this.checkDeleteBlock = this.checkDeleteBlock.bind(this);
    this.deleteBlock = this.deleteBlock.bind(this);
    this.cancelDelete = this.cancelDelete.bind(this);
  }

  deleteBlock() {
    this.setState({
      deleting: true,
    });

    this.props.deleteBlock(this.props.block, this.props.slot, (err) => {
      if (err) {
        console.error('error removing block', err);
        this.setState({
          deleting: false,
          confirmRemoval: false,
        });
      } else {
        this.setState({
          deleting: false,
          confirmRemoval: false,
        });
      }
    });
  }

  cancelDelete() {
    this.setState({
      confirmRemoval: false,
    });
  }

  checkDeleteBlock() {
    this.setState({
      confirmRemoval: true,
    });
  }

  render() {
    const b = this.props.block;
    console.log('b', b);

    const text = b.slotCount === 1 ? 'Blocked Slot' : 'Blocked Slots';

    if (this.state.deleting) {
      return (
        <div className='summary-box block-card' key={`block-${b.id}`}>
          <div className='deleting-container'>
            <div className='deleting-status'><CircularProgress size={80} /></div>
            <h5 className='deleting-text'>Removing block...</h5>
          </div>
        </div>
      );
    }
    if (this.state.confirmRemoval) {
      return (
        <div className='summary-box block-card' key={`block-${b.id}`}>
          <h5 className='confirm-delete-block-msg'>
            Are you sure you want to unblock these slots?
          </h5>
          <div className='confirm-delete-action-section'>
            <div className='confirm-delete-action-button'>
            <RaisedButton
              labelColor='#f54'
              label='No'
              backgroundColor='#fff'
              icon={<ThumbsDown color='#f54'/>}
              onClick={this.cancelDelete}
            />
            </div>
            <div className='confirm-delete-action-button'>
            <RaisedButton
              labelColor='#fff'
              label='Yes'
              backgroundColor='#52B266'
              icon={<ThumbsUp color='#fff' />}
              onClick={this.deleteBlock}
            />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className='summary-box block-card' key={`block-${b.id}`}>
        <div className='delete-section' onClick={this.checkDeleteBlock}>
          <OverlayTrigger placement='bottom' overlay={<Tooltip id='all-clear-tooltip'>Remove Block</Tooltip>}>
            <Delete className='delete-block-icon' />
          </OverlayTrigger>
        </div>

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
      </div>
    );
  }
}

BlockCard.propTypes = {
  block: PropTypes.object,
};

export default BlockCard;