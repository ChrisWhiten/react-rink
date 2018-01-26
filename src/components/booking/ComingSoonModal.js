import React, { Component } from 'react';
import ThumbsUp from 'material-ui/svg-icons/action/thumb-up';
import ThumbsDown from 'material-ui/svg-icons/action/thumb-down';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Modal,
} from 'react-bootstrap';

import './styles/UncancelBookingModal.css';
import CircularProgress from 'material-ui/CircularProgress/CircularProgress';

class ComingSoonModal extends Component {
  constructor(props) {
    super(props);

    this.uncancel = this.uncancel.bind(this);
  }

  uncancel() {
    this.props.ok();
  }

  render() {
    const label = 'Cool';
    const icon = <ThumbsUp color='#fff' />;

    return (
      <Modal show={this.props.show} onHide={this.props.hide}>
        <Modal.Header closeButton>
          <Modal.Title>This feature is coming soon</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
        <div className='uncancel-button'>
          <RaisedButton
            labelColor='#fff'
            label={label}
            backgroundColor='#52B266'
            icon={icon}
            onClick={this.uncancel}
          />
        </div>
        </Modal.Footer>
      </Modal>
    );
  }
};

export default ComingSoonModal;