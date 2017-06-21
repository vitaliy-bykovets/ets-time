import React from 'react';

// Helpers
import { loginApi } from './../../shared/ApiService';

class Login extends React.Component {
  state = {
    email: '',
    password: ''
  };

  handleChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    let { email, password } = this.state;
    e.preventDefault();
    loginApi(email, password);
  };

  render() {
    return (
      <form
        autoComplete="true"
        onSubmit={this.handleSubmit}
        className="login-wrapper"
      >
        <input
          type="email"
          name="email"
          value={this.state.email}
          onChange={this.handleChangeInput}
          className="input login__input"
          placeholder="Email"
        />

        <input
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handleChangeInput}
          className="input login__input"
          placeholder="Password"
        />

        <button type="submin" className="button login-button">Login</button>
      </form>
    );
  }
}

export default Login;
