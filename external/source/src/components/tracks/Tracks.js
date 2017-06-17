import React from 'react';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';

// Components
import Track from './Track';
import Filters from './Filters';

// Actions
import {
  getTracks,
  getLibraries,
  toggleTrackFilters,
  clearTrackFilters
} from './../../store/actions/trackActions';

// Helpers
import { showClearFilters } from './../../shared/HelpService';

// Icons
import FaPlus from 'react-icons/lib/fa/plus';
import FaFilter from 'react-icons/lib/fa/filter';
import FaTimes from 'react-icons/lib/fa/ban';

class Tracks extends React.Component {
  state = { showFilters: false };

  componentDidMount() {
    this.props.getLibraries();
    this.props.getTracks(this.props.filters);
  }

  openFilters = () => {
    this.props.toggleTrackFilters();
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ showFilters: showClearFilters(nextProps.filters) });

    if (!isEqual(nextProps.filters, this.props.filters)) {
      this.props.getTracks(nextProps.filters);
    }
  }

  clearFilters = () => {
    this.props.clearTrackFilters();
  };

  render() {
    const tracks = this.props.tracks.map((t, i) => {
      return <Track trackData={t} key={i} view={this.props.view} />;
    });

    const { showFilters } = this.state;

    return (
      <div className="container">
        {tracks}
        <Filters />
        <div className="trackBtns">
          <button className="trackBtns__btn"><FaPlus /></button>
          <button className="trackBtns__btn" onClick={this.openFilters}>
            <FaFilter />
          </button>
          {showFilters
            ? <button className="trackBtns__btn" onClick={this.clearFilters}>
                <FaTimes />
              </button>
            : null}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tracks: state.trackReducer.tracks,
    filters: state.trackReducer.filters,
    view: state.trackReducer.view
  };
}

export default connect(mapStateToProps, {
  getTracks,
  getLibraries,
  toggleTrackFilters,
  clearTrackFilters
})(Tracks);
