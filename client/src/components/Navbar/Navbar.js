import React, { Component } from 'react';

// custom components
import NavbarAuth from './NavbarAuth';
import NavbarUnAuth from './NavbarUnAuth';

export class Navbar extends Component {
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
