import React from 'react';
import { connect } from 'react-redux';

// Ui components
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

// Actions
import { toggleSingleTrack } from './../../store/actions/trackActions';

class SingleTrack extends React.Component {
  handleClose = () => {
    this.props.toggleSingleTrack();
  };

  render() {
    const actions = [
      <FlatButton label="Save" primary={true} onTouchTap={this.handleClose} />,
      <FlatButton
        label="Cancel"
        primary={false}
        onTouchTap={this.handleClose}
      />
    ];

    return (
      <div>
        <Dialog
          title="Track"
          actions={actions}
          modal={true}
          open={this.props.trackIsOpen}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    trackIsOpen: state.trackReducer.trackIsOpen
  };
}

export default connect(mapStateToProps, { toggleSingleTrack })(SingleTrack);
