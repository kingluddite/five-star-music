import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// graphql
import { Query } from 'react-apollo';
import { GET_SONG } from '../../queries';

// custom components
import LikeSong from '../Song/LikeSong';

export class SongPage extends Component {
  render() {
    const { _id } = this.props.match.params;
    return (
      <Query query={GET_SONG} variables={{ _id }}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>Error</div>;
          // console.log(data);

          return (
            <div className="App">
              <h2>{data.getSong.title}</h2>
              <p>Created Date: {data.getSong.createdDate}</p>
              <p>Likes: {data.getSong.likes}</p>
              <p>Created By: {data.getSong.username}</p>
              <LikeSong _id={_id} />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(SongPage);