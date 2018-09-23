import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';

class UserInfo extends Component {
  static propTypes = {
    session: PropTypes.shape({
      getCurrentUser: PropTypes.shape({
        username: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        joinDate: PropTypes.string.isRequired,
        favorites: PropTypes.array,
      }).isRequired,
    }).isRequired,
  };
  // formatDate = date => {
  //   const newDate = new Date(date).toLocaleDateString('en-US');
  //   const newTime = new Date(date).toLocaleTimeString('en-US');
  //   return `${newDate} at ${newTime}`;
  // };

  render() {
    const {
      username,
      email,
      joinDate,
      favorites,
    } = this.props.session.getCurrentUser;

    return (
      <div>
        <h3>UserInfo</h3>
        <p>Username: {username}</p>
        <p>Email: {email}</p>
        <p>Join Date: {moment(joinDate, 'x').format('MMMM MM, YYYY')}</p>
        <ul>
          <h3>
            {username.toUpperCase()}
            's Favorites
          </h3>
          {favorites.map(favorite => (
            <li key={favorite._id}>
              <Link to={`/song/${favorite._id}`}>
                <p>{favorite.title}</p>
              </Link>
            </li>
          ))}
          {/* no favorites? let user know to add some */}
          {!favorites.length && (
            <p>
              <strong>You currently have no favorites. Go add some!</strong>
            </p>
          )}
        </ul>
      </div>
    );
  }
}

export default UserInfo;
