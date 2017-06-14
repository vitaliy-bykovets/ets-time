import React from 'react';
import { connect } from 'react-redux';

// UI components
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentFilterList from 'material-ui/svg-icons/content/filter-list';
import ContentFilterClear from 'material-ui/svg-icons/content/clear';

// Components
import SingleTrack from './SingleTrack';
import Filters from './Filters';
import TracksTable from './TracksTable';

// Actions
import {
  toggleSingleTrack,
  toggleTrackFilters,
  getLibraries,
  clearTrackFilters
} from './../../store/actions/trackActions';

// Helpers
import { showClearFilters } from './../../shared/HelpService';

const addBtnStyle = {
  position: 'absolute',
  right: '30px',
  bottom: '30px'
};

const filterBtnStyle = {
  position: 'absolute',
  left: '30px',
  bottom: '30px'
};

const clearFiltersBtnStyle = {
  position: 'absolute',
  left: '75px',
  bottom: '20px',
  zIndex: '0'
};

class Tracks extends React.Component {
  state = {
    showFilters: false
  };

  componentDidMount() {
    this.props.getLibraries();
  }

  componentWillReceiveProps(nextProps) {
    let showFilters = showClearFilters(nextProps.filters);
    this.setState({ showFilters });
  }

  openAddTrack = () => {
    this.props.toggleSingleTrack();
  };

  openFilters = () => {
    this.props.toggleTrackFilters();
  };

  clearFilters = () => {
    this.props.clearTrackFilters();
  };

  render() {
    return (
      <div className="container">
        <TracksTable />
        <SingleTrack />
        <Filters />

        <FloatingActionButton
          secondary={true}
          style={addBtnStyle}
          onTouchTap={this.openAddTrack}
        >
          <ContentAdd />
        </FloatingActionButton>

        <FloatingActionButton
          backgroundColor="#4CAF50"
          style={filterBtnStyle}
          onTouchTap={this.openFilters}
        >
          <ContentFilterList />
        </FloatingActionButton>

        {this.state.showFilters
          ? <FloatingActionButton
              mini={true}
              onTouchTap={this.clearFilters}
              backgroundColor="#9E9E9E"
              style={clearFiltersBtnStyle}
            >
              <ContentFilterClear />
            </FloatingActionButton>
          : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    filters: state.trackReducer.filters
  };
}

export default connect(mapStateToProps, {
  toggleSingleTrack,
  toggleTrackFilters,
  getLibraries,
  clearTrackFilters
})(Tracks);
