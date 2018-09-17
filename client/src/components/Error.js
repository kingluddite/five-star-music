import React, { Component } from 'react';

export class Error extends Component {
  render() {
    const { error } = this.props;
    return <p>{error.message}</p>;
  }
}

export default Error;
