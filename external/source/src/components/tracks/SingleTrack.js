import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Actions
import {
  toggleSingleTrack,
  createTrack
} from './../../store/actions/trackActions';

import { clearErrorField } from './../../store/actions/generalActions';

const initialState = {
  project: '',
  task: '',
  workType: '',
  hours: '',
  trackDate: moment()
};

class SingeTrack extends React.Component {
  state = initialState;

  componentWillReceiveProps(nextProps) {
    if (nextProps.trackIsOpen !== this.props.trackIsOpen) {
      this.setState(initialState);
    }
  }

  handleClose = () => {
    this.props.toggleSingleTrack();
  };

  handleSaveTrack = () => {
    this.props.createTrack(this.state);
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChangeDate = date => {
    this.setState({ trackDate: date });
  };

  handleFocusInput = e => {
    let field = e.target.name;
    this.props.clearErrorField(field !== 'workType' ? field : 'type_work');
  };

  handleDateFocus = () => {
    this.props.clearErrorField('date_task');
  };

  render() {
    const workTypes = this.props.workTypes.map((item, i) =>
      <option key={i} value={item}>{item}</option>
    );

    const { errors } = this.props;

    return (
      <div
        className={classnames('sidebar', {
          'sidebar--open': this.props.trackIsOpen
        })}
      >
        <div className="sidebar__wrapper">
          <h4 className="sidebar__title">Add track</h4>

          <label className="filters__headline">
            <span>Project</span>
            {errors.project
              ? <span className="error__text">{errors.project}</span>
              : null}
          </label>
          <input
            type="text"
            value={this.state.project}
            name="project"
            onChange={this.handleInputChange}
            className={classnames('filters__input', {
              bgError: errors.project
            })}
            onFocus={this.handleFocusInput}
          />

          <label className="filters__headline">
            <span>Task</span>
            {errors.task
              ? <span className="error__text">{errors.task}</span>
              : null}
          </label>
          <input
            type="text"
            value={this.state.task}
            name="task"
            onChange={this.handleInputChange}
            className={classnames('filters__input', {
              bgError: errors.task
            })}
            onFocus={this.handleFocusInput}
          />

          <label className="filters__headline">
            <span>Work type</span>
            {errors.type_work
              ? <span className="error__text">{errors.type_work}</span>
              : null}
          </label>
          <select
            name="workType"
            className={classnames('filters__select', {
              bgError: errors.type_work
            })}
            value={this.state.workType}
            onChange={this.handleInputChange}
            onFocus={this.handleFocusInput}
          >
            <option value="" />
            {workTypes}
          </select>

          <label className="filters__headline">
            <span>Hours</span>
            {errors.hours
              ? <span className="error__text">{errors.hours}</span>
              : null}
          </label>
          <input
            type="number"
            value={this.state.hours}
            name="hours"
            onChange={this.handleInputChange}
            className={classnames('filters__input', {
              bgError: errors.hours
            })}
            onFocus={this.handleFocusInput}
          />

          <label className="filters__headline">
            <span>Date</span>
            {errors.date_task
              ? <span className="error__text">{errors.date_task}</span>
              : null}
          </label>
          <DatePicker
            dateFormat="DD-MM-YYYY"
            selected={this.state.trackDate}
            onChange={this.handleChangeDate}
            className={classnames('filters__select', {
              bgError: errors.date_task
            })}
            onFocus={this.handleDateFocus}
          />
        </div>
        <div className="sidebarBtns">
          <button
            className="sidebarBtns__btn sidebarBtns__btn--save"
            onClick={this.handleSaveTrack}
          >
            Save
          </button>
          <button
            className="sidebarBtns__btn sidebarBtns__btn--cancel"
            onClick={this.handleClose}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    trackIsOpen: state.trackReducer.trackIsOpen,
    workTypes: state.trackReducer.workTypes,
    errors: state.generalReducer.errors
  };
}

export default connect(mapStateToProps, {
  toggleSingleTrack,
  createTrack,
  clearErrorField
})(SingeTrack);
