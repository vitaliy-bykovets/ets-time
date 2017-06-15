import React from 'react';
import { connect } from 'react-redux';

// Ui components
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

// Actions
import { getTracks } from './../../store/actions/trackActions';

class Tracks extends React.Component {
  componentDidMount() {
    this.props.getTracks(this.props.filters);
  }

  render() {
    const tracks = this.props.tracks.map((t, i) => {
      const date = new Date(t.date_task);
      const dateStr = date ? date.toLocaleDateString() : '';

      return (
        <TableRow key={i}>
          <TableRowColumn>{t.project}</TableRowColumn>
          <TableRowColumn className="mobile-hide">{t.type_work}</TableRowColumn>
          <TableRowColumn className="mobile-hide">{t.task}</TableRowColumn>
          <TableRowColumn>{t.hours}</TableRowColumn>
          <TableRowColumn>{dateStr}</TableRowColumn>
          <TableRowColumn>{t.status}</TableRowColumn>
        </TableRow>
      );
    });

    return (
      <div className="container">
        <Table selectable={false}>
          <TableHeader
            adjustForCheckbox={false}
            enableSelectAll={false}
            displaySelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn>Project</TableHeaderColumn>
              <TableHeaderColumn className="mobile-hide">
                Type work
              </TableHeaderColumn>
              <TableHeaderColumn className="mobile-hide">
                Task
              </TableHeaderColumn>
              <TableHeaderColumn>Hours</TableHeaderColumn>
              <TableHeaderColumn>Date</TableHeaderColumn>
              <TableHeaderColumn>Status</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>{tracks}</TableBody>
        </Table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tracks: state.trackReducer.tracks,
    filters: state.trackReducer.filters
  };
}

export default connect(mapStateToProps, {
  getTracks
})(Tracks);
