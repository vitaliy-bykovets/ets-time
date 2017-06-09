import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const style = {
  position: 'absolute',
  right: '30px',
  bottom: '30px'
};

class Tracks extends React.Component {
  render() {
    return (
      <div>
        <Table className="container" selectable={false}>
          <TableHeader
            adjustForCheckbox={false}
            enableSelectAll={false}
            displaySelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn>Team member</TableHeaderColumn>
              <TableHeaderColumn>Project</TableHeaderColumn>
              <TableHeaderColumn>Type work</TableHeaderColumn>
              <TableHeaderColumn>Hours</TableHeaderColumn>
              <TableHeaderColumn>Approved time</TableHeaderColumn>
              <TableHeaderColumn>Data</TableHeaderColumn>
              <TableHeaderColumn>Status</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            <TableRow>
              <TableRowColumn>John Smith</TableRowColumn>
              <TableRowColumn>Silverdeer</TableRowColumn>
              <TableRowColumn>Development</TableRowColumn>
              <TableRowColumn>8</TableRowColumn>
              <TableRowColumn>8</TableRowColumn>
              <TableRowColumn>2017-06-06</TableRowColumn>
              <TableRowColumn>Open</TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
        <FloatingActionButton secondary={true} style={style}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }
}

export default Tracks;
