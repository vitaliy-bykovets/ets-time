import React from "react";
import { connect } from "react-redux";
import Select from "react-select";
import { getSkillsFromUserApi, attachSkillUser } from "./../../shared/ApiService";
import { getUsers } from './../../store/actions/userActions';
import RangeSkill from "./RangeSkill";

const UsersSelect = function(props) {
  return (
    <Select
        className="select-user"
        multi={false}
        placeholder=""
        options={props.users}
        value={props.state_selected_user}
        labelKey="first_name"
        valueKey="id"
        onChange={props.changeState.bind(null, "user")}
      />
  )
};

class SkillsUser extends React.Component {
  state = {
    skills: [],
    state_selected_user: null
  };

  componentDidMount() {
    this.props.getUsers(this.props.token);
    this.getCacheSelectedUser();
  }

  changeState = (props, selected) => {
    switch (props) {
      case "user":
        const _id = !selected ? null : selected.id;
        this.cacheSelectedUser(_id);
        this.setState({ state_selected_user: _id });
        if(_id) {
          getSkillsFromUserApi(this.props.token, _id).then(resp => {
            this.setState({ skills: resp });
          });
        } else {
          this.setState({ skills: [] });
        }
        break;
      default:
        break;
    }
  };

  cacheSelectedUser = (_id) => {
    localStorage.setItem('selected-user-skills', _id);
  };

  getCacheSelectedUser = () => {
    if(localStorage.getItem('selected-user-skills')) {
      let _id = (+localStorage.getItem('selected-user-skills'));

      this.setState({ state_selected_user: _id });
      getSkillsFromUserApi(this.props.token, _id).then(resp => {
        this.setState({ skills: resp });
      });
    }

  };

  saveSkillUser = (event) => {
    attachSkillUser(this.props.token, event).then(resp => {
      console.log(resp);
    });
  };

  render() {
    const { state_selected_user } = this.state;

    const allSkills = this.state.skills.map((s, index) => (
      <div key={index} className="skills-wrapper">
        <span className="skills__parent">
          {s.name}
        </span>
        <div className="skills__children__outer">
          {s.children.map((c, index) => (
            <div key={index} className="skills__children">
              - {c.name}
              <RangeSkill value={c.user_value}
                          user_id={state_selected_user}
                          skillId={c.id}
                          onSave={this.saveSkillUser} />
            </div>
          ))}
        </div>
      </div>
    ));

    return (
      <div className="container skills-user-wrapper">
        <UsersSelect users={this.props.users}
                     state_selected_user={state_selected_user}
                     changeState={this.changeState}
        />
        <div className="skills">
          {allSkills}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  let { token } = state.generalReducer;

  return {
    token,
    activeUser: state.userReducer.activeUser,
    users: state.userReducer.users
  };
}

export default connect(mapStateToProps, {
  getUsers
})(SkillsUser);