import React, { Component } from 'react';

// graphql
import { Mutation } from 'react-apollo';

// graphq queries
import { LIKE_SONG, UNLIKE_SONG, GET_SONG } from '../../queries';

// custom components
import withSession from '../withSession';

export class LikeSong extends Component {
  state = {
    username: '',
    liked: false,
  };

  componentDidMount = () => {
    // console.log(this.props.session);

    if (this.props.session.getCurrentUser) {
      const { username, favorites } = this.props.session.getCurrentUser;
      // console.log(favorites);
      const { _id } = this.props;
      const prevLiked =
        favorites.findIndex(favorite => favorite._id === _id) > -1;

      this.setState({
        liked: prevLiked,
        username,
      });
    }
  };

  handleClick = (likeSong, unlikeSong) => {
    this.setState(
      prevState => ({
        liked: !prevState.liked,
      }),
      () => this.handleLike(likeSong, unlikeSong)
    );
  };

  handleLike = (likeSong, unlikeSong) => {
    if (this.state.liked) {
      // pass control of likeSong to handleLike
      likeSong().then(async ({ data }) => {
        // console.log(data);
        await this.props.refetch();
      });
    } else {
      // unlike song mutation
      // console.log('unlike');
      unlikeSong().then(async ({ data }) => {
        await this.props.refetch();
      });
    }
  };

  updateLike = (cache, { data: { likeSong } }) => {
    const { _id } = this.props;
    const { getSong } = cache.readQuery({
      query: GET_SONG,
      variables: { _id },
    });

    cache.writeQuery({
      query: GET_SONG,
      variables: { _id },
      data: {
        getSong: { ...getSong, likes: likeSong.likes + 1 },
      },
    });
  };

  updateUnlike = (cache, { data: { unlikeSong } }) => {
    const { _id } = this.props;
    const { getSong } = cache.readQuery({
      query: GET_SONG,
      variables: { _id },
    });

    cache.writeQuery({
      query: GET_SONG,
      variables: { _id },
      data: {
        getSong: { ...getSong, likes: unlikeSong.likes - 1 },
      },
    });
  };

  render() {
    const { username, liked } = this.state;
    const { _id } = this.props;
    // console.log(this.props);

    return (
      <Mutation
        mutation={UNLIKE_SONG}
        variables={{ _id, username }}
        update={this.updateUnlike}
      >
        {unlikeSong => (
          <Mutation
            mutation={LIKE_SONG}
            variables={{ _id, username }}
            update={this.updateLike}
          >
            {likeSong =>
              username && (
                <button onClick={() => this.handleClick(likeSong, unlikeSong)}>
                  {liked ? 'Unlike' : 'Like'}
                </button>
              )
            }
          </Mutation>
        )}
      </Mutation>
    );
  }
}

export default withSession(LikeSong);
