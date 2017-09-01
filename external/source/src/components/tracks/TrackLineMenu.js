import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';

// Icons
import FaDelete from 'react-icons/lib/fa/trash-o';
import FaAccept from 'react-icons/lib/fa/check-square-o';
import FaDecline from 'react-icons/lib/fa/ban';

// Actions
import { toggleConfirm } from './../../store/actions/generalActions';
import { changeTrackStatus } from './../../store/actions/trackActions';

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

  handleChangeStatus = action => {
    let { t, token } = this.props;
    if (t.status !== action) {
      this.props.changeTrackStatus(token, t.id, action);
    }
  };

  render() {
    const { view, bgColor, activeUser, t } = this.props;
    const isOwnerOrPm = activeUser.roles && (activeUser.roles.includes('owner') || activeUser.roles.includes('pm'));
    const isUserTrack = t.user_id && activeUser.id ? activeUser.id === t.user_id : true;

    return (
      <div>
        {view === 'line'
          ? <div className="track__menuBtn--line" style={{ color: bgColor }}>
              {isUserTrack
                ? <div className="track__menuBtnLine--btn" onClick={this.handleDelete} title="Delete track">
                    <FaDelete />
                  </div>
                : null}
              {isOwnerOrPm
                ? <div
                    className={classnames('track__menuBtnLine--btn', {
                      disabled: t.status === 'Accepted'
                    })}
                    onClick={this.handleChangeStatus.bind(this, 'Accepted')}
                    title="Accept track"
                  >
                    <FaAccept />
                  </div>
                : null}
              {isOwnerOrPm
                ? <div
                    className={classnames('track__menuBtnLine--btn', {
                      disabled: t.status === 'Declined'
                    })}
                    onClick={this.handleChangeStatus.bind(this, 'Declined')}
                    title="Decline track"
                  >
                    <FaDecline />
                  </div>
                : null}
            </div>
          : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    bgColor: state.generalReducer.bgColor,
    activeUser: state.userReducer.activeUser
  };
}

export default connect(mapStateToProps, {
  toggleConfirm,
  changeTrackStatus
})(TrackLineMenu);
