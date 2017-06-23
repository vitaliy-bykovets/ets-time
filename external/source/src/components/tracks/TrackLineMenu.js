import React from 'react';
import { connect } from 'react-redux';

// Icons
import FaPencil from 'react-icons/lib/fa/pencil';
import FaDelete from 'react-icons/lib/fa/trash-o';
import FaAccept from 'react-icons/lib/fa/check-square-o';
import FaDecline from 'react-icons/lib/fa/ban';

// Actions
import {
  toggleConfirm,
  clearErrors
} from './../../store/actions/generalActions';
import { toggleChangeTrack } from './../../store/actions/trackActions';

// Helpers
import { formatDateToServer } from './../../shared/HelpService';

class TrackLineMenu extends React.Component {
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
    this.props.toggleChangeTrack(true, true, this.props.t);
    this.props.clearErrors();
  };

  handleDecline = () => {};

  handleAccept = () => {};

  render() {
    const { view, bgColor } = this.props;
    return (
      <div>
        {view === 'line'
          ? <div className="track__menuBtn--line" style={{ color: bgColor }}>
              <div
                className="track__menuBtnLine--btn"
                onClick={this.handleEdit}
              >
                <FaPencil />
              </div>
              <div
                className="track__menuBtnLine--btn"
                onClick={this.handleDelete}
              >
                <FaDelete />
              </div>
              <div
                className="track__menuBtnLine--btn"
                onClick={this.handleAccept}
              >
                <FaAccept />
              </div>
              <div
                className="track__menuBtnLine--btn"
                onClick={this.handleDecline}
              >
                <FaDecline />
              </div>
            </div>
          : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    bgColor: state.generalReducer.bgColor
  };
}

export default connect(mapStateToProps, {
  toggleConfirm,
  clearErrors,
  toggleChangeTrack
})(TrackLineMenu);
