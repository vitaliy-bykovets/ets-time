import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';

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
    const { viewType } = this.props;
    const { settingsOpen } = this.state;

    return (
      <div className="topbar">
        <h4 className="topbar__headline">Selecto tracking system</h4>

        <div className="topbar__icons">
          <FaBlocks
            className={classnames('topbar__icon', {
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
    );
  }
}

function mapStateToProps(state) {
  return {
    viewType: state.trackReducer.view
  };
}

export default connect(mapStateToProps, { changeTrackView })(Topbar);
