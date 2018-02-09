import React from 'react';
import Close from 'material-ui/svg-icons/navigation/close';
import Block from 'material-ui/svg-icons/content/block';
import CheckCircle from 'material-ui/svg-icons/action/check-circle';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Form,
  FormGroup,
  FormControl,
  Col,
} from 'react-bootstrap';
import DateAndTimeSection from './DateAndTimeSection';
import './styles/BlockOff.css';

function FieldGroup({ id, label, help, validationState, ...props }) {
  return (
    <FormGroup controlId={id} validationState={validationState}>
      <FormControl {...props} />
    </FormGroup>
  );
}

function getAvailableSlotCount(slot) {
  let availableSlotCount = slot.availabilitySlot.totalSlots;
    if (slot.availabilitySlot.bookings) {
      slot.availabilitySlot.bookings.forEach(b => {
        availableSlotCount -= b.slotCount;
      });
    }

    if (slot.availabilitySlot.blocks) {
      slot.availabilitySlot.blocks.forEach(b => {
        availableSlotCount -= b.slotCount;
      });
    }

    return availableSlotCount;
}

class BlockOff extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      creating: false,
      created: false,
      blockReason: '',
      blockSlotCount: getAvailableSlotCount(props.slot),
    };

    this.handleBlockCountChange = this.handleBlockCountChange.bind(this);
    this.handleBlockReasonChange = this.handleBlockReasonChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      creating: true,
    });

    const block = {
      slotCount: this.state.blockSlotCount,
      start: new Date(this.props.slot.time).getTime(),
      duration: this.props.slot.availabilitySlot.duration,
      locationName: this.props.location.locationName,
      locationId: this.props.location.locationId,
      reason: this.state.blockReason,
    };

    console.log('proposed block', block)
    this.props.createBlock(block, this.props.slot, (err, createdBlock) => {
      console.log('block created callback called!')
      if (err) {
        console.error('but there was an error!', err);
      }
      this.setState({
        creating: false,
        created: true,
      });
      console.log('state set?');

      setTimeout(() => {
        // this.props.onBookingCreated(createdBooking);
        this.props.onRequestClose();
        setTimeout(() => {
          console.log('created falsing...');
          this.setState({
            created: false,
          });
          console.log('created falsed')
        }, 200);
      }, 500);
    });
    return;
  }

  handleBlockCountChange(e) {
    this.setState({
      blockSlotCount: e.target.value,
    });
  }

  handleBlockReasonChange(e) {
    this.setState({
      blockReason: e.target.value,
    });
  }

  renderOptions(slotCount) {
    let options = [];
    for (let i = 0; i < slotCount; i++) {
      if (i === 0) {
        options.push(<option key={`option-${i}`} value='1'>1 Slot</option>);
      } else {
        options.push(<option key={`option-${i}`} value={i + 1}>{i + 1} Slots</option>);
      }
    }
    return options;
  }

  render() {
    if (!this.props.slot || !this.props.slot.availabilitySlot) {
      return null;
    }

    let availableSlotCount = getAvailableSlotCount(this.props.slot);

    return (
      <div className='block-off-form'>
        <div className='block-off-form-header'>
          <div className='block-off-form-header-close invisible'>
            <Close className='block-off-form-close-icon' />
          </div>
          <div className='block-off-form-header-title'>
            Block Off
          </div>
          <div className='block-off-form-header-close' onClick={this.props.onRequestClose}>
            <Close className='block-off-form-close-icon' />
          </div>
        </div>
        <div className='block-off-form-content'>
        {
          this.state.creating &&
          <div className='creation-container'>
            <div className='creation-status'><CircularProgress size={80} /></div>
            <h5 className='creation-text'>Blocking...</h5>
          </div>
        }
        {
          !this.state.creating && this.state.created &&
          <div className='creation-container'>
            <div className='creation-status'><CheckCircle size={80} className='booking-completed-checkmark' /></div>
            <h5 className='creation-text'>Block complete!</h5>
          </div>
        }
        {
          !this.state.creating && !this.state.created &&
          <div>
            <DateAndTimeSection location={this.props.location} slotCount={0} time={this.props.slot.time} />
            <Form onSubmit={this.handleSubmit}>
            <Col sm={6} md={6} xs={12} smOffset={3} mdOffset={3} className='block-off-form-container'>
              <Col md={12} lg={12} sm={12} xs={12}>
                <FieldGroup
                  id='block-reason-id'
                  type='text'
                  placeholder='Reason'
                  onChange={this.handleBlockReasonChange}
                  value={this.state.blockReason}
                />
              </Col>
              <div className='block-count-section'>
                <Col md={12} lg={12} sm={12} xs={12}>
                  <FormGroup controlId='formControlsSelect'>
                    <FormControl componentClass='select' onChange={this.handleBlockCountChange}>
                      <option value='all-open-slots'>All Open Slots ({availableSlotCount})</option>
                      { this.renderOptions(availableSlotCount) }
                    </FormControl>
                  </FormGroup>
                </Col>
              </div>

              <div className='confirm-block-button'>
                <RaisedButton
                  // disabled={this.props.isUpdating}
                  labelColor='#fff'
                  label='Confirm Block'
                  backgroundColor='#f54'
                  icon={<Block color='#fff' />}
                  type='submit'
                />
              </div>
            </Col>
          </Form>
          </div>
        }
        </div>
      </div>
    );
  }
}

export default BlockOff;
