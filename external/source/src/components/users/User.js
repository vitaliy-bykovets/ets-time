import React from 'react';
import { connect } from 'react-redux';

// Icons
import FaPencil from 'react-icons/lib/fa/pencil';

// Actions
import { toggleSingleUser } from './../../store/actions/userActions';
import { clearErrors } from './../../store/actions/generalActions';

class User extends React.Component {
  handleEdit = () => {
    this.props.toggleSingleUser(true, true, this.props.user);
    this.props.clearErrors();
  };

  render() {
    const { user, bgColor } = this.props;

    return (
      <div className="track track__line">
        <div className="track__info--line">
          <h3 className="track__project track__project--line">
            {user.email}
          </h3>
          <h4 className="track__type track__type--line">
            {user.roles}
          </h4>
          <h4 className="track__type track__type--line">
            {user.position}
          </h4>
          <p className="track__date track__date--line">
            {user.first_name + ' ' + user.last_name}
          </p>
        </div>
        <div className="track__menuBtn--line" style={{ color: bgColor }}>
          <div className="track__menuBtnLine--btn" onClick={this.handleEdit}>
            <FaPencil />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    bgColor: state.generalReducer.bgColor
  };
}

export default connect(mapStateToProps, { toggleSingleUser, clearErrors })(
  User
);
