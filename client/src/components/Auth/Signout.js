import React, { Component } from 'react';
import { ApolloConsumer } from 'react-apollo';
import { withRouter } from 'react-router-dom';

export class Signout extends Component {
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
        {client => {
          // console.log(client);

          return (
            <button onClick={() => this.handleSignout(client, history)}>
              Signout
            </button>
          );
        }}
      </ApolloConsumer>
    );
  }
}

export default withRouter(Signout);
