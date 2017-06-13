import React from 'react';
import { connect } from 'react-redux';

// Ui components
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

// Actions
import { toggleTrackFilters } from './../../store/actions/trackActions';

class Filters extends React.Component {
  handleClose = () => {
    this.props.toggleTrackFilters();
  };

  render() {
    const actions = [
      <FlatButton label="Go" primary={true} onTouchTap={this.handleClose} />,
      <FlatButton
        label="Cancel"
        primary={false}
        onTouchTap={this.handleClose}
      />
    ];

    return (
      <div>
        <Dialog
          title="Filters"
          actions={actions}
          modal={true}
          open={this.props.filtersIsOpen}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    filtersIsOpen: state.trackReducer.filtersIsOpen
  };
}

export default connect(mapStateToProps, { toggleTrackFilters })(Filters);
