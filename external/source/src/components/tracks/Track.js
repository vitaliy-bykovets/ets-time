import React from 'react';
import classnames from 'classnames';
import numeraljs from 'numeraljs';
import {connect} from 'react-redux';

// Icons
import FaEllipsis from 'react-icons/lib/fa/ellipsis-h';

// Helpers
import {formatDateToServer, getFirstLetter} from './../../shared/HelpService';

// Actions
import {clearErrors} from './../../store/actions/generalActions';
import {toggleChangeTrack} from './../../store/actions/trackActions';

// Components
import TrackBlockMenu from './TrackBlockMenu';
import TrackLineMenu from './TrackLineMenu';

class Track extends React.Component {
  state = {
    menuOpen: false
  };

  toggleMenu = () => {
    this.setState({menuOpen: !this.state.menuOpen});
  };

  handleOpen = e => {
    e.preventDefault();
    this.props.toggleChangeTrack(true, true, this.props.trackData);
    this.props.clearErrors();
  };

  render() {
    const {trackData: t, view, bgColor, token, TypeWorkIcon, isStartDay, dateOfGroup, hoursSum} = this.props;
    const date = new Date(t.date_task);
    const dateStr = date ? formatDateToServer(date) : '';
    const project =
      typeof t.project === 'string' && t.project.length > 20 ? t.project.substring(0, 20) + ' ...' : t.project;

    return (

      <div
        className={classnames('track', {
          track__block: view === 'block',
          track__line: view === 'line'
        })}
      >
        <div
          className={classnames({
            'track__info--line': view === 'line',
            'track__info--block': view === 'block'
          })}
        >
          <div
            className={classnames('track__type', {
              'track__type--line': view === 'line'
            })}
          >
            {TypeWorkIcon(t.type_work)}
            {view === 'block'
              ? <span className="track__type-title">
                    {t.type_work}
                  </span>
              : null}
          </div>
          {view === 'block' || (!isStartDay && !dateOfGroup)
            ? <p
              className={classnames('track__date', {
                'track__date--line': view === 'line'
              })}
              style={{color: bgColor}}
            >
              {dateStr}
            </p>
            : null}

          <h3
            className={classnames('track__user', {
              'track__user--line': view === 'line'
            })}
          >
            {`${getFirstLetter(t.first_name)}. ${t.last_name}`}
          </h3>
          <h4 className="track__project">
            {project}
          </h4>
          {view === 'block'
            ? <a className="track__task" onClick={this.handleOpen} title="Open the task">
              "{t.task}"
            </a>
            : null}
        </div>

        {view === 'line'
          ? <a className="track__task" onClick={this.handleOpen} title="Open the task">
            "{t.task}"
          </a>
          : null}

        <div
          className={classnames('track__statusWrapper', {
            'track__statusWrapper--line': view === 'line'
          })}
        >
          <div
            className={classnames('track__status', {
              'track__status--open': t.status === 'Open',
              'track__status--accepted': t.status === 'Accepted',
              'track__status--declined': t.status === 'Declined',
              'track__status--line': view === 'line'
            })}
            title={t.status}
          />
          <span
            className={classnames('track__hours', {
              'track__hours--line': view === 'line'
            })}
          >
              {numeraljs(t.hours).format('0.[00]')}h.
            </span>

          <TrackLineMenu view={view} t={t} token={token}/>
        </div>

        {view === 'block'
          ? <button
            className="track__menuBtn"
            onClick={this.toggleMenu}
            style={{
              borderColor: bgColor,
              color: bgColor
            }}
          >
            <FaEllipsis/>
          </button>
          : null}

        {view === 'block'
          ? <TrackBlockMenu t={t} menuOpen={this.state.menuOpen} toggleMenu={this.toggleMenu} token={token}/>
          : null}
      </div>

    );
  }
}

function mapStateToProps(state) {
  return {
    activeUser: state.userReducer.activeUser
  };
}

export default connect(mapStateToProps, {
  clearErrors,
  toggleChangeTrack
})(Track);
