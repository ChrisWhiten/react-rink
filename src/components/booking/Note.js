import React, { Component } from 'react';
import Delete from 'material-ui/svg-icons/action/delete';
import {
  Tooltip,
  OverlayTrigger,
} from 'react-bootstrap';
import moment from 'moment';

import './styles/Note.css';

class Note extends Component {
  render() {
    const n = this.props.note;

    return (
      <div className='booking-note' key={`note-${n.noteId}`}>
        <div className='booking-header'>
          <div className='booking-header-text'>
            <h5 className='note-author'>
              {n.author}
            </h5>
            <h5 className='note-wrote'>
              {moment(n.createdAt).calendar()}
            </h5>
          </div>

          <div className='delete-note' onClick={this.props.deleteNote}>
            <OverlayTrigger placement='bottom' overlay={<Tooltip id='delete-note-tooltip'>Delete note</Tooltip>}>
                <Delete className='delete-note-icon' />
            </OverlayTrigger>
          </div>
        </div>
        <div className='note-details'>
          {n.note}
        </div>
      </div>
    );
  }
};

export default Note;