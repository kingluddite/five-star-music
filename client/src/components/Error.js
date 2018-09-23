import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Error extends Component {
  static propTypes = {
    error: PropTypes.object,
  };

  static defaultProps = {
    error: {},
  };

  render() {
    const { error } = this.props;
    return <p>{error.message}</p>;
  }
}

export default Error;
