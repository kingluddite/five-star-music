import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// graphql
import { Query, Mutation } from 'react-apollo';
import {
  GET_USER_SONGS,
  DELETE_USER_SONG,
  GET_ALL_SONGS,
  GET_CURRENT_USER,
} from '../../queries';

class UserSongs extends Component {
  static propTypes = {
    username: PropTypes.string.isRequired,
  };

  handleDelete = deleteUserSong => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this song?'
    );

    if (confirmDelete) {
      deleteUserSong().then(({ data }) => {
        // console.log(data);
      });
    }
  };

  render() {
    const { username } = this.props;
    return (
      <Query query={GET_USER_SONGS} variables={{ username }}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>Error</div>;
          // console.log(data);

          return (
            <ul>
              <h3>Your Songs</h3>
              {!data.getUserSongs.length && (
                <p>
                  <strong>You have not added any songs yet</strong>
                </p>
              )}
              {data.getUserSongs.map(song => (
                <li key={song._id}>
                  <Link to={`/song/${song._id}`}>
                    <p>{song.title}</p>
                  </Link>
                  <p style={{ marginBottom: '0' }}>{song.likes}</p>
                  <Mutation
                    mutation={DELETE_USER_SONG}
                    variables={{ _id: song._id }}
                    refetchQueries={() => [
                      {
                        query: GET_ALL_SONGS,
                      },
                      {
                        query: GET_CURRENT_USER,
                      },
                    ]}
                    update={(cache, { data: { deleteUserSong } }) => {
                      // console.log(cache, data);
                      const { getUserSongs } = cache.readQuery({
                        query: GET_USER_SONGS,
                        variables: { username },
                      });

                      cache.writeQuery({
                        query: GET_USER_SONGS,
                        variables: { username },
                        data: {
                          getUserSongs: getUserSongs.filter(
                            song => song._id !== deleteUserSong._id
                          ),
                        },
                      });
                    }}
                  >
                    {(deleteUserSong, attrs = {}) => (
                      <button
                        className="delete-button"
                        onClick={() => this.handleDelete(deleteUserSong)}
                      >
                        {attrs.loading ? 'deleting...' : 'X'}
                      </button>
                    )}
                  </Mutation>
                </li>
              ))}
            </ul>
          );
        }}
      </Query>
    );
  }
}

export default UserSongs;
