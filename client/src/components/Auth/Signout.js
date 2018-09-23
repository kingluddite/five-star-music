import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ApolloConsumer } from 'react-apollo';
import { withRouter } from 'react-router-dom';

class Signout extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  };

  handleSignout = (client, history) => {
    // clear token
    localStorage.removeItem('token');
    client.resetStore();
    // redirect using withRouter
    this.props.history.push('/');
  };

  render() {
    const { history } = this.props;

    return (
      <ApolloConsumer>
        {client => (
          // console.log(client);

          <button onClick={() => this.handleSignout(client, history)}>
            Signout
          </button>
        )}
      </ApolloConsumer>
    );
  }
}

export default withRouter(Signout);
