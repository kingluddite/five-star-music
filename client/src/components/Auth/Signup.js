import React, { Component } from 'react';

export class Signup extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  };

  handleChange = event => {
    const { name, value } = event.target;
    // console.log(name, ':', value);
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { username, email, password, passwordConfirmation } = this.state;

    return (
      <div className="App">
        <h2>Signup</h2>
        <form className="form" action="">
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={this.handleChange}
            value={username}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={this.handleChange}
            value={email}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={this.handleChange}
            value={password}
          />
          <input
            type="password"
            name="passwordConfirmation"
            placeholder="Confirm Password"
            onChange={this.handleChange}
            value={passwordConfirmation}
          />
          <button className="button-primary">Submit</button>
        </form>
      </div>
    );
  }
}

export default Signup;
