import React, { Component } from 'react';
import PropTypes from 'prop-types';

// custom components
import NavbarAuth from './NavbarAuth';
import NavbarUnAuth from './NavbarUnAuth';

class Navbar extends Component {
  static propTypes = {
    session: PropTypes.object,
  };

  static defaultProps = {
    session: null,
  };

  render() {
    const { session } = this.props;
    return (
      <nav>
        {session && session.getCurrentUser ? (
          <NavbarAuth session={session} />
        ) : (
          <NavbarUnAuth />
        )}
      </nav>
    );
  }
}

export default Navbar;
