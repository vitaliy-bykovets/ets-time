import React from 'react';
import { connect } from 'react-redux';

// UI components
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentFilterList from 'material-ui/svg-icons/content/filter-list';

// Components
import SingleTrack from './SingleTrack';
import Filters from './Filters';
import TracksTable from './TracksTable';

// Actions
import {
  toggleSingleTrack,
  toggleTrackFilters,
  getLibraries
} from './../../store/actions/trackActions';

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

class Tracks extends React.Component {
  componentDidMount() {
    this.props.getLibraries();
  }

  openAddTrack = () => {
    this.props.toggleSingleTrack();
  };

  openFilters = () => {
    this.props.toggleTrackFilters();
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
      </div>
    );
  }
}

export default connect(null, {
  toggleSingleTrack,
  toggleTrackFilters,
  getLibraries
})(Tracks);
