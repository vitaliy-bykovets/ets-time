import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';

// Icons
import FaBlocks from 'react-icons/lib/fa/th';
import FaLines from 'react-icons/lib/fa/align-justify';

// Actions
import { changeTrackView } from './../../store/actions/trackActions';

class Topbar extends React.Component {
  changeView = view => {
    this.props.changeTrackView(view);
    localStorage.setItem('viewType', view);
  };

  render() {
    const { viewType } = this.props;

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
