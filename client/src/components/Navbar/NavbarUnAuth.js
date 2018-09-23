import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class NavbarUnAuth extends Component {
  render() {
    return (
      <ul>
        <li>
          <NavLink to="/" exact>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/search">Search</NavLink>
        </li>
        <li>
          <NavLink to="/signin">Signin</NavLink>
        </li>
        <li>
          <NavLink to="/signup">Signup</NavLink>
        </li>
      </ul>
    );
  }
}

export default NavbarUnAuth;
