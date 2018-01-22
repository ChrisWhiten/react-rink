import React, { Component } from 'react';
import AttachMoney from 'material-ui/svg-icons/editor/attach-money';
import RaisedButton from 'material-ui/RaisedButton';
import {
  HelpBlock,
  FormGroup,
  FormControl,
  Modal,
} from 'react-bootstrap';

import './styles/AddPaymentModal.css';
import CircularProgress from 'material-ui/CircularProgress/CircularProgress';

function FieldGroup({ id, label, help, validationState, ...props }) {
  return (
    <FormGroup controlId={id} validationState={validationState}>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

class AddPaymentModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputVal: '',
    };

    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.submitPayment = this.submitPayment.bind(this);
  }

  submitPayment(e) {
    e.preventDefault();
    let val = this.state.inputVal;
    if (val.startsWith('$')) {
      val = val.substr(1);
    }

    try {
      const submittedPayment = Math.round(100 * parseFloat(val.replace(/[$,]/g, '')));
      if (isNaN(submittedPayment) || submittedPayment <= 0) {
        console.error('Invalid payment');
        return;
      }
      this.props.onSubmit(submittedPayment);
    } catch (err) {
      console.error('Error submitting payment', err);
    }
  }

  handleCurrencyChange(e) {
    this.setState({
      inputVal: e.target.value,
    });
  }

  render() {
    const label = this.props.isUpdating ? 'Processing...' : 'Add payment';
    const icon = this.props.isUpdating ? <CircularProgress className='processing-payment-progress' thickness={1.75} /> : <AttachMoney color='#fff' />;

    return (
      <Modal show={this.props.show} onHide={this.props.hide}>
        <Modal.Header closeButton>
          <Modal.Title>Add a Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.submitPayment}>
            <FieldGroup
              autoFocus
              id='payment-id'
              type='text'
              placeholder='$12.34'
              onChange={this.handleCurrencyChange}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
        <RaisedButton
          disabled={this.props.isUpdating}
          labelColor='#fff'
          label={label}
          backgroundColor='#52B266'
          icon={icon}
          onTouchTap={this.submitPayment}
        />
        </Modal.Footer>
      </Modal>
    );
  }
};

export default AddPaymentModal;