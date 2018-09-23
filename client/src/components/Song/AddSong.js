import React, { Component } from 'react';
import PropTypes from 'prop-types';

// react router
import { withRouter } from 'react-router-dom';

// apollo stuff
import { Mutation } from 'react-apollo';

import { ADD_SONG, GET_ALL_SONGS, GET_USER_SONGS } from '../../queries';

// custom components
import Error from '../Error';
// auth custom component
import withAuth from '../withAuth';

const initialState = {
  title: '',
  category: 'Alt Rock',
  username: '',
};

class AddSong extends Component {
  static propTypes = {
    session: PropTypes.object,
    history: PropTypes.object,
  };

  static defaultProps = {
    session: null,
    history: null,
  };

  state = {
    ...initialState,
  };

  componentDidMount = () => {
    // console.log(this.props.session.getCurrentUser.username);
    if (this.props.session) {
      this.setState({
        username: this.props.session.getCurrentUser.username,
      });
    }
  };

  clearState = () => {
    this.setState({ ...initialState });
  };

  handleChange = event => {
    const { name, value } = event.target;
    // console.log(name, ':', value);
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event, addSong) => {
    event.preventDefault();
    addSong().then(({ data }) => {
      // console.log(data);
      this.clearState();
      this.props.history.push('/');
    });
  };

  validateForm = () => {
    const { title, category } = this.state;
    const isInvalid = !title || !category;
    return isInvalid;
  };

  updateCache = (cache, { data: { addSong } }) => {
    const { getAllSongs } = cache.readQuery({
      query: GET_ALL_SONGS,
    });
    // console.log('from cache', getAllSongs);
    // console.log('from data', addSong);

    cache.writeQuery({
      query: GET_ALL_SONGS,
      data: {
        getAllSongs: [addSong, ...getAllSongs],
      },
    });
  };

  render() {
    const { title, category, username } = this.state;

    return (
      <Mutation
        mutation={ADD_SONG}
        variables={{ title, category, username }}
        refetchQueries={() => [
          {
            query: GET_USER_SONGS,
            variables: { username },
          },
        ]}
        update={this.updateCache}
      >
        {(addSong, { data, loading, error }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>Error</div>;
          // console.log(data);

          return (
            <div className="App">
              <h2 className="App">
                <form
                  className="form"
                  onSubmit={event => this.handleSubmit(event, addSong)}
                >
                  <input
                    type="text"
                    name="title"
                    placeholder="Song Title"
                    onChange={this.handleChange}
                    value={title}
                  />
                  <select
                    name="category"
                    onChange={this.handleChange}
                    value={category}
                  >
                    <option value="Rock">Rock</option>
                    <option value="Country">Country</option>
                    <option value="Alt-Rock">Alt Rock</option>
                    <option value="Reggae">Reggae</option>
                  </select>

                  <button
                    type="submit"
                    className="primary-button"
                    disabled={loading || this.validateForm()}
                  >
                    Submit
                  </button>
                  {error && <Error error={error} />}
                </form>
              </h2>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default withAuth(session => session && session.getCurrentUser)(
  withRouter(AddSong)
);
