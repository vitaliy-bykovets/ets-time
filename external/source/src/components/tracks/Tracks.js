import React from 'react';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';

// Components
import Track from './Track';
import Filters from './Filters';
import SingleTrack from './SingleTrack';

// Actions
import {
  getTracks,
  toggleTrackFilters,
  clearTrackFilters,
  toggleSingleTrack
} from './../../store/actions/trackActions';
import { clearErrors } from './../../store/actions/generalActions';

// Helpers
import { showClearFilters } from './../../shared/HelpService';

// Icons
import FaPlus from 'react-icons/lib/fa/plus';
import FaFilter from 'react-icons/lib/fa/filter';
import FaTimes from 'react-icons/lib/fa/ban';

class Tracks extends React.Component {
  state = { showFilters: false };

  componentDidMount() {
    let { token, filters } = this.props;
    this.props.getTracks(token, filters);
  }

  openFilters = () => {
    this.props.toggleTrackFilters();
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ showFilters: showClearFilters(nextProps.filters) });

    if (!isEqual(nextProps.filters, this.props.filters)) {
      this.props.getTracks(nextProps.token, nextProps.filters);
    }
  }

  clearFilters = () => {
    this.props.clearTrackFilters();
  };

  openSingleTrack = () => {
    this.props.toggleSingleTrack(true);
    this.props.clearErrors();
  };

  render() {
    const { showFilters } = this.state;
    const { bgColor } = this.props;

    const tracks = this.props.tracks.map((t, i) => {
      return (
        <Track trackData={t} key={i} view={this.props.view} bgColor={bgColor} />
      );
    });

    return (
      <div className="container" style={{ background: bgColor }}>
        {tracks}
        <Filters />
        <SingleTrack />
        <div className="mainBtns">
          <button
            className="mainBtns__btn"
            onClick={this.openSingleTrack}
            style={{ color: bgColor }}
          >
            <FaPlus />
          </button>
          <button
            className="mainBtns__btn"
            onClick={this.openFilters}
            style={{ color: bgColor }}
          >
            <FaFilter />
          </button>
          {showFilters
            ? <button
                className="mainBtns__btn"
                onClick={this.clearFilters}
                style={{ color: bgColor }}
              >
                <FaTimes />
              </button>
            : null}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  let { tracks, filters, view } = state.trackReducer;
  let { bgColor, token } = state.generalReducer;

  return {
    tracks,
    filters,
    view,
    bgColor,
    token
  };
}

export default connect(mapStateToProps, {
  getTracks,
  toggleTrackFilters,
  clearTrackFilters,
  toggleSingleTrack,
  clearErrors
})(Tracks);
