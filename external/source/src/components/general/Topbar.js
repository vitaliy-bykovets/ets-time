import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

// Components
import Settings from './Settings';

// Icons
import FaBlocks from 'react-icons/lib/fa/th';
import FaLines from 'react-icons/lib/fa/align-justify';
import FaCog from 'react-icons/lib/fa/cog';
import FaPower from 'react-icons/lib/fa/power-off';

// Actions
import { changeTrackView } from './../../store/actions/trackActions';
import { setActiveUser } from './../../store/actions/userActions';
import { setToken } from './../../store/actions/generalActions';

// Helpers
import { logoutApi } from './../../shared/ApiService';

// Actions
import { getLibraries } from './../../store/actions/trackActions';

class Topbar extends React.Component {
  state = {
    settingsOpen: false
  };

  componentDidMount() {
    let { token } = this.props;
    this.props.getLibraries(token);
  }

  changeView = view => {
    this.props.changeTrackView(view);
    localStorage.setItem('viewType', view);
  };

  toggleSettings = () => {
    this.setState({ settingsOpen: !this.state.settingsOpen });
  };

  logoutHandler = () => {
    logoutApi(this.props.token).then(resp => {
      if (resp.status >= 200 && resp.status < 300) {
        this.props.setActiveUser({ first_name: '', last_name: '' });
        this.props.setToken('');
        localStorage.removeItem('token');
        this.props.history.push('/login');
      }
    });
  };

  render() {
    const { viewType, location, bgColor, activeUser } = this.props;
    const { settingsOpen } = this.state;
    const trackUrl =
      location.pathname.includes('tracks') || location.pathname === '/';

    return (
      <div className="topbar">
        <h4 className="topbar__headline">
          <span>{`${activeUser.first_name} ${activeUser.last_name}`}</span>
          <FaPower className="logout" onClick={this.logoutHandler} />
        </h4>

        <div className="topbar__menu" style={{ color: bgColor }}>
          {trackUrl && activeUser.roles && activeUser.roles.includes('owner')
            ? <FaBlocks
                className={classnames('topbar__icon', {
                  'topbar__icon--active': viewType === 'block'
                })}
                onClick={() => this.changeView('block')}
              />
            : null}
          {trackUrl && activeUser.roles && activeUser.roles.includes('owner')
            ? <FaLines
                className={classnames('topbar__icon', 'p-r-20', {
                  'topbar__icon--active': viewType === 'line'
                })}
                onClick={() => this.changeView('line')}
              />
            : null}

          <div className="topbar__menu--wrapper">
            <Link
              to="/tracks"
              className={classnames('topbar__menu--btn', {
                'topbar__menu--active': trackUrl
              })}
              style={{ background: bgColor }}
            >
              tracks
            </Link>
            <Link
              to="/users"
              className={classnames('topbar__menu--btn', {
                'topbar__menu--active': location.pathname.includes('users')
              })}
              style={{ background: bgColor }}
            >
              users
            </Link>
          </div>

          <div className="topbar__icons" style={{ color: bgColor }}>
            <FaCog
              className="topbar__icon p-l-20"
              onClick={this.toggleSettings}
            />
            <Settings
              settingsOpen={settingsOpen}
              toggleSettings={this.toggleSettings}
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    viewType: state.trackReducer.view,
    bgColor: state.generalReducer.bgColor,
    token: state.generalReducer.token,
    activeUser: state.userReducer.activeUser
  };
}

export default withRouter(
  connect(mapStateToProps, {
    changeTrackView,
    setActiveUser,
    setToken,
    getLibraries
  })(Topbar)
);
