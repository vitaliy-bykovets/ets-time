import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Topbar from './Topbar';
import Tracks from './Tracks';
import Users from './Users';
import Login from './Login';
import NotFound from './NotFound';

class App extends React.Component {
  render() {
    // Change to state management, when auth will be available
    const displayTopbar = true;

    return (
      <div>
        {displayTopbar ? <Topbar /> : null}
        <Switch>
          <Route exact path="/" component={Tracks} />
          <Route exact path="/tracks" component={Tracks} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
