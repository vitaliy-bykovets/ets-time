import React from 'react';
import { connect } from 'react-redux';

// Icons
import FaPlus from 'react-icons/lib/fa/plus';

// Actions
import { getUsers } from './../../store/actions/userActions';

// Components
import User from './User';

class Users extends React.Component {
  componentDidMount() {
    this.props.getUsers(this.props.token);
  }

  render() {
    const users = this.props.users.map((u, i) => {
      return <User user={u} key={i} bgColor={this.props.bgColor} />;
    });

    return (
      <div className="container" style={{ background: this.props.bgColor }}>
        {users}
        <div className="mainBtns">
          <button
            className="mainBtns__btn"
            onClick={this.openSingleUser}
            style={{ color: this.props.bgColor }}
          >
            <FaPlus />
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  let { token, bgColor } = state.generalReducer;
  return {
    token,
    bgColor,
    users: state.userReducer.users
  };
}

export default connect(mapStateToProps, { getUsers })(Users);
