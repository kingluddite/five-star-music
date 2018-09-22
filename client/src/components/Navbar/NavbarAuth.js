import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';

// custom components
import Signout from '../Auth/Signout';

export class NavbarAuth extends Component {
  render() {
    const { session } = this.props;
    return (
      <Fragment>
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
            <NavLink to="/song/add">Add Song</NavLink>
          </li>
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>
          <li>
            <Signout />
          </li>
        </ul>
        <h4>
          Welcome, <strong>{session.getCurrentUser.username}</strong>
        </h4>
      </Fragment>
    );
  }
}

export default NavbarAuth;
