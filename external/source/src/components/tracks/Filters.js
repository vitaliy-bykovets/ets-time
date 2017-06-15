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
import {
  toggleTrackFilters,
  getTracks,
  setTrackFilters
} from './../../store/actions/trackActions';

const wrapper = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around'
};

class Filters extends React.Component {
  state = {};

  componentDidMount() {
    this.setState(this.props.filters);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.filters);
  }

  handleInputChange = (e, value) => this.setState({ [e.target.name]: value });
  handleChangeEndDate = (e, endDate) => this.setState({ endDate });
  handleChangeStartDate = (e, startDate) => this.setState({ startDate });
  handleChangeWorkType = (e, index, workType) => this.setState({ workType });
  handleChangeStatus = (e, index, status) => this.setState({ status });
  handleClose = () => this.props.toggleTrackFilters();
  handleUseFilters = () => {
    let filters = this.state;
    this.props.toggleTrackFilters();
    this.props.setTrackFilters(filters);
    this.props.getTracks(filters);
  };

  render() {
    const actions = [
      <FlatButton
        label="Go"
        primary={true}
        onTouchTap={this.handleUseFilters}
      />,
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
            name="project"
            floatingLabelText="Project"
            value={this.state.project}
            onChange={this.handleInputChange}
          />

          <TextField
            name="task"
            floatingLabelText="Task"
            value={this.state.task}
            onChange={this.handleInputChange}
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
    );
  }
}

function mapStateToProps(state) {
  return {
    filtersIsOpen: state.trackReducer.filtersIsOpen,
    workTypes: state.trackReducer.workTypes,
    statusTypes: state.trackReducer.statusTypes,
    filters: state.trackReducer.filters
  };
}

export default connect(mapStateToProps, {
  toggleTrackFilters,
  getTracks,
  setTrackFilters
})(Filters);
