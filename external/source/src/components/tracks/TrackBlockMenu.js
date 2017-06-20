import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';

// Actions
import {
  toggleConfirm,
  clearErrors
} from './../../store/actions/generalActions';
import { toggleSingleTrack } from './../../store/actions/trackActions';

// Helpers
import { formatDateToServer } from './../../shared/HelpService';

class TrackBlockMenu extends React.Component {
  handleDelete = () => {
    const { date_task, status, id } = this.props.t;
    const date = new Date(date_task);
    const dateStr = date ? formatDateToServer(date) : '';

    this.props.toggleConfirm(
      true,
      `Delete track from ${dateStr} with status: ${status.toLowerCase()}?`,
      'removeTrack',
      id
    );
  };

  handleEdit = () => {
    this.props.toggleSingleTrack(true, true, this.props.t);
    this.props.clearErrors();
  };

  handleDecline = () => {};

  handleAccept = () => {};

  render() {
    const { t, menuOpen } = this.props;

    return (
      <div
        className={classnames('track-menu-btns', {
          'track-menu-btns--opened': menuOpen
        })}
      >
        <button className="track-menu-btns__btn" onClick={this.handleEdit}>
          Edit
        </button>
        <button className="track-menu-btns__btn" onClick={this.handleDelete}>
          Delete
        </button>
        {t.status !== 'Declined'
          ? <button
              className="track-menu-btns__btn"
              onClick={this.handleDecline}
            >
              Decline
            </button>
          : null}
        {t.status !== 'Accepted'
          ? <button
              className="track-menu-btns__btn"
              onClick={this.handleAccept}
            >
              Accept
            </button>
          : null}
        <button
          className="track-menu-btns__btn"
          onClick={this.props.toggleMenu}
        >
          Cancel
        </button>
      </div>
    );
  }
}

export default connect(null, { toggleConfirm, toggleSingleTrack, clearErrors })(
  TrackBlockMenu
);
