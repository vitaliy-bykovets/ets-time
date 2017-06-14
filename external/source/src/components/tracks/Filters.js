import React from 'react';
import { connect } from 'react-redux';

// Ui components
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';

// Actions
import { toggleTrackFilters } from './../../store/actions/trackActions';

const wrapper = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around'
};

class Filters extends React.Component {
  state = {
    workType: null,
    status: null,
    project: '',
    task: '',
    startDate: new Date(),
    endDate: new Date()
  };

  handleClose = () => this.props.toggleTrackFilters();

  handleChangeWorkType = (e, index, workType) => this.setState({ workType });

  handleChangeStatus = (e, index, status) => this.setState({ status });

  handleProjectChange = (e, project) => this.setState({ project });

  handleTaskChange = (e, task) => this.setState({ task });

  handleChangeStartDate = (e, startDate) => this.setState({ startDate });

  handleChangeEndDate = (e, endDate) => this.setState({ endDate });

  render() {
    const actions = [
      <FlatButton label="Go" primary={true} onTouchTap={this.handleClose} />,
      <FlatButton
        label="Cancel"
        primary={false}
        onTouchTap={this.handleClose}
      />
    ];

    const workTypes = this.props.workTypes.map((item, i) =>
      <MenuItem key={i} value={item} primaryText={item} />
    );

    const statusTypes = this.props.statusTypes.map((item, i) =>
      <MenuItem key={i} value={item} primaryText={item} />
    );

    return (
      <div>
        <Dialog
          title="Filters"
          actions={actions}
          modal={true}
          autoOk={true}
          open={this.props.filtersIsOpen}
          autoScrollBodyContent={true}
          contentStyle={
            window.innerWidth < 768
              ? {}
              : { width: '65%', minWidth: '560px', maxWidth: '600px' }
          }
        >
          <div style={wrapper}>
            <TextField
              floatingLabelText="Project"
              onChange={this.handleProjectChange}
            />
            <TextField
              floatingLabelText="Task"
              onChange={this.handleTaskChange}
            />

            <SelectField
              floatingLabelText="Work type"
              value={this.state.workType}
              onChange={this.handleChangeWorkType}
            >
              <MenuItem value={null} primaryText="" />
              {workTypes}
            </SelectField>

            <SelectField
              floatingLabelText="Status"
              value={this.state.status}
              onChange={this.handleChangeStatus}
            >
              <MenuItem value={null} primaryText="" />
              {statusTypes}
            </SelectField>

            <DatePicker
              onChange={this.handleChangeStartDate}
              floatingLabelText="Start date"
              defaultDate={this.state.startDate}
              disableYearSelection={true}
              textFieldStyle={window.innerWidth < 768 ? { width: '100%' } : {}}
              style={window.innerWidth < 768 ? { width: '100%' } : {}}
            />

            <DatePicker
              onChange={this.handleChangeEndDate}
              floatingLabelText="End date"
              defaultDate={this.state.endDate}
              disableYearSelection={true}
              textFieldStyle={window.innerWidth < 768 ? { width: '100%' } : {}}
              style={window.innerWidth < 768 ? { width: '100%' } : {}}
            />
          </div>
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    filtersIsOpen: state.trackReducer.filtersIsOpen,
    workTypes: state.trackReducer.workTypes,
    statusTypes: state.trackReducer.statusTypes
  };
}

export default connect(mapStateToProps, { toggleTrackFilters })(Filters);
