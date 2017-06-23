import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';

// Actions
import {
  toggleSingleUser,
  createUser,
  updateUser
} from './../../store/actions/userActions';
import { clearErrorField } from './../../store/actions/generalActions';

// Helpers
import { getInitNewUserData } from './../../shared/HelpService';

const initialState = getInitNewUserData();

class SingeUser extends React.Component {
  state = initialState;

  componentWillReceiveProps(nextProps) {
    if (nextProps.userIsOpen !== this.props.userIsOpen) {
      this.setState(initialState);
    }

    // Set state if opened user edit
    if (!isEqual(nextProps.userData, this.props.userData)) {
      this.setState(nextProps.userData);
    }
  }

  handleClose = () => {
    this.props.toggleSingleUser(false);
  };

  handleSaveUser = () => {
    let { isUserEdit, token } = this.props;
    if (isUserEdit) {
      this.props.updateUser(this.state, token);
    } else {
      this.props.createUser(this.state, token);
    }
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleFocusInput = e => {
    this.props.clearErrorField(e.target.name);
  };

  render() {
    const { errors } = this.props;

    const roles = this.props.roles.map((item, i) =>
      <option key={i} value={item}>{item}</option>
    );

    return (
      <div
        className={classnames('sidebar', {
          'sidebar--open': this.props.userIsOpen
        })}
      >
        <div className="sidebar__wrapper">
          <h4 className="sidebar__title">
            {this.props.isUserEdit ? 'Edit user' : 'Add new user'}
          </h4>

          {this.props.errors.singleUserError
            ? <p className="confirm__error">
                Sorry, but something gone wrong...
              </p>
            : null}

          <label className="filters__headline">
            <span>First name</span>
            {errors.first_name
              ? <span className="error__text">{errors.first_name}</span>
              : null}
          </label>
          <input
            type="text"
            value={this.state.first_name}
            name="first_name"
            onChange={this.handleInputChange}
            className={classnames('input', {
              bgError: errors.first_name
            })}
            onFocus={this.handleFocusInput}
          />

          <label className="filters__headline">
            <span>Last name</span>
            {errors.last_name
              ? <span className="error__text">{errors.last_name}</span>
              : null}
          </label>
          <input
            type="text"
            value={this.state.last_name}
            name="last_name"
            onChange={this.handleInputChange}
            className={classnames('input', {
              bgError: errors.last_name
            })}
            onFocus={this.handleFocusInput}
          />

          <label className="filters__headline">
            <span>Email</span>
            {errors.email
              ? <span className="error__text">{errors.email}</span>
              : null}
          </label>
          <input
            type="email"
            value={this.state.email}
            name="email"
            onChange={this.handleInputChange}
            className={classnames('input', {
              bgError: errors.email
            })}
            onFocus={this.handleFocusInput}
          />

          <label className="filters__headline">
            <span>Roles</span>
            {errors.roles
              ? <span className="error__text">{errors.roles}</span>
              : null}
          </label>
          <select
            multiple
            name="roles"
            className={classnames('filters__select', {
              bgError: errors.roles
            })}
            value={this.state.roles}
            onChange={this.handleInputChange}
            onFocus={this.handleFocusInput}
          >
            <option value="" />
            {roles}
          </select>

        </div>
        <div className="sidebarBtns">
          <button
            className="sidebarBtns__btn sidebarBtns__btn--save"
            onClick={this.handleSaveUser}
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
  let {
    userIsOpen,
    userData,
    isUserEdit,
    roles,
    positions
  } = state.userReducer;
  let { errors, token } = state.generalReducer;
  return {
    roles,
    positions,
    userIsOpen,
    userData,
    isUserEdit,
    errors,
    token
  };
}

export default connect(mapStateToProps, {
  toggleSingleUser,
  createUser,
  updateUser,
  clearErrorField
})(SingeUser);
