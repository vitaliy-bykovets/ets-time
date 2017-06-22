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

// Actions
import { changeTrackView } from './../../store/actions/trackActions';

class Topbar extends React.Component {
  state = {
    settingsOpen: false
  };

  changeView = view => {
    this.props.changeTrackView(view);
    localStorage.setItem('viewType', view);
  };

  toggleSettings = () => {
    this.setState({ settingsOpen: !this.state.settingsOpen });
  };

  render() {
    const { viewType, location, bgColor } = this.props;
    const { settingsOpen } = this.state;

    return (
      <div className="topbar">
        <h4 className="topbar__headline">Username</h4>

        <div className="topbar__menu">
          <div className="topbar__menu--wrapper">
            <Link
              to="/tracks"
              className={classnames('topbar__menu--btn', {
                'topbar__menu--active': location.pathname.includes('tracks')
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
            <FaBlocks
              className={classnames('topbar__icon', 'p-l-20', {
                'topbar__icon--active': viewType === 'block'
              })}
              onClick={() => this.changeView('block')}
            />
            <FaLines
              className={classnames('topbar__icon', {
                'topbar__icon--active': viewType === 'line'
              })}
              onClick={() => this.changeView('line')}
            />
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
    bgColor: state.generalReducer.bgColor
  };
}

export default withRouter(
  connect(mapStateToProps, { changeTrackView })(Topbar)
);
