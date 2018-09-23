import React, { Component } from 'react';
import PropTypes from 'prop-types';

// custom components
import UserInfo from './UserInfo';
import UserSongs from './UserSongs';
import withAuth from '../withAuth';

class Profile extends Component {
  static propTypes = {
    session: PropTypes.object.isRequired,
  };

  render() {
    const { session } = this.props;
    return (
      <div className="App">
        <UserInfo session={session} />
        <UserSongs username={session.getCurrentUser.username} />
      </div>
    );
  }
}

export default withAuth(session => session && session.getCurrentUser)(Profile);
