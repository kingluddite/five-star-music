import React, { Component } from 'react';

// custom components
import UserInfo from './UserInfo';
import UserSongs from './UserSongs';
import withAuth from '../withAuth';

export class Profile extends Component {
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
