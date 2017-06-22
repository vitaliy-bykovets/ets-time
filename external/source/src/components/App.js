import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// Components
import Topbar from './general/Topbar';
import Tracks from './tracks/Tracks';
import Users from './users/Users';
import Login from './general/Login';
import NotFound from './general/NotFound';
import Confirm from './general/Confirm';
import PrivateRoute from './general/PrivateRoute';

// Actions
import { setToken } from './../store/actions/generalActions';

class App extends React.Component {
  render() {
    return (
      <div className="wrapper" style={{ background: this.props.bgColor }}>
        {this.props.token ? <Topbar /> : null}
        <Switch>
          <PrivateRoute exact path="/" component={Tracks} props={this.props} />
          <PrivateRoute
            exact
            path="/tracks"
            component={Tracks}
            props={this.props}
          />
          <PrivateRoute
            exact
            path="/users"
            component={Users}
            props={this.props}
          />
          <Route exact path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
        <Confirm />
      </div>
    );
  }
}

function mapStateToProps(state) {
  let { bgColor, token } = state.generalReducer;
  return {
    bgColor,
    token
  };
}

export default withRouter(connect(mapStateToProps, { setToken })(App));
