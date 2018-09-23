import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

// graphql
import { Query } from 'react-apollo';
import { GET_SONG } from '../../queries';

// custom components
import LikeSong from '../Song/LikeSong';
import Spinner from '../Spinner';

class SongPage extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        _id: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

  render() {
    const { _id } = this.props.match.params;
    return (
      <Query query={GET_SONG} variables={{ _id }}>
        {({ data, loading, error }) => {
          if (loading) return <Spinner />;
          if (error) return <div>Error</div>;
          // console.log(data);

          return (
            <div className="App">
              <div
                style={{
                  background: `url(${
                    data.getSong.imageUrl
                  }) center center / cover no-repeat`,
                }}
                className="song-image"
              />

              <div className="song">
                <div className="song-header">
                  <h2 className="song-name">
                    <strong>{data.getSong.title}</strong>
                  </h2>
                  <h5>
                    <strong>{data.getSong.category}</strong>
                  </h5>
                  <p>Created By: {data.getSong.username}</p>
                  <p>
                    Likes: {data.getSong.likes}
                    <span role="img" aria-label="heart">
                      ❤️
                    </span>
                  </p>
                </div>
                <blockquote
                  className="analogy-description"
                  dangerouslySetInnerHTML={{ __html: data.getSong.description }}
                />
                <LikeSong _id={_id} />
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(SongPage);
