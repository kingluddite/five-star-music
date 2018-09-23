import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
// import Spinner from '../Spinner';

// graphql
import { SIGNUP_USER } from '../../queries';

// custom components
import Error from '../Error';

const initialState = {
  username: '',
  email: '',
  password: '',
  passwordConfirmation: '',
};

class Signup extends Component {
  static propTypes = {
    refetch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  };

  state = {
    ...initialState,
  };

  clearState = () => {
    this.setState({
      ...initialState,
    });
  };

  handleChange = event => {
    const { name, value } = event.target;
    // console.log(name, ':', value);
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event, signupUser) => {
    event.preventDefault();
    // call our signupUser function
    signupUser().then(async ({ data }) => {
      // console.log(data);
      localStorage.setItem('token', data.signupUser.token);
      await this.props.refetch();
      this.clearState();
      this.props.history.push('/');
    });
  };

  validateForm = () => {
    const { username, email, password, passwordConfirmation } = this.state;
    const isInvalid =
      !username || !email || !password || password !== passwordConfirmation;

    return isInvalid;
  };

  render() {
    const { username, email, password, passwordConfirmation } = this.state;

    return (
      <div className="App">
        <h2>Signup</h2>
        <Mutation
          mutation={SIGNUP_USER}
          variables={{ username, email, password }}
        >
          {(signupUser, { data, loading, error }) => (
            // if (loading) return <Spinner />;
            // if (error) return <div>Error</div>;
            // console.log(data);

            <form
              className="form"
              onSubmit={event => this.handleSubmit(event, signupUser)}
            >
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
              <button
                className="button-primary"
                disabled={loading || this.validateForm()}
              >
                Submit
              </button>
              {error && <Error error={error} />}
            </form>
          )}
        </Mutation>
      </div>
    );
  }
}

export default withRouter(Signup);
