import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

// Components
import Topbar from './general/Topbar';
import Tracks from './tracks/Tracks';
import Users from './users/Users';
import Login from './general/Login';
import NotFound from './general/NotFound';
import Confirm from './general/Confirm';

class App extends React.Component {
  render() {
    // Change to state management, when auth will be available
    const displayTopbar = true;

    return (
      <div className="wrapper" style={{ background: this.props.bgColor }}>
        {displayTopbar ? <Topbar /> : null}
        <Switch>
          <Route exact path="/" component={Tracks} />
          <Route exact path="/tracks" component={Tracks} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
        <Confirm />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    bgColor: state.generalReducer.bgColor
  };
}

export default connect(mapStateToProps, {})(App);
