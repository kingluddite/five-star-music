import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CKEditor from 'react-ckeditor-component';

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
  imageUrl: '',
  category: 'Alt Rock',
  description: '',
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

  handleEditorChange = event => {
    const newContent = event.editor.getData();
    this.setState({ description: newContent });
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
    const { title, imageUrl, category, description } = this.state;
    const isInvalid = !title || !imageUrl || !category || !description;
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
    const { title, imageUrl, category, description, username } = this.state;

    return (
      <Mutation
        mutation={ADD_SONG}
        variables={{ title, imageUrl, category, description, username }}
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
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Song Title"
                    onChange={this.handleChange}
                    value={title}
                  />
                  <label htmlFor="imageUrl">Image URL</label>
                  <input
                    type="text"
                    name="imageUrl"
                    placeholder="Song Image"
                    onChange={this.handleChange}
                    value={imageUrl}
                  />
                  <label htmlFor="category">Category</label>
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
                  <label htmlFor="description">Add Description</label>
                  {/* <textarea */}
                  {/*   name="description" */}
                  {/*   placeholder="Add Description" */}
                  {/*   onChange={this.handleChange} */}
                  {/*   value={description} */}
                  {/* /> */}
                  <CKEditor
                    name="description"
                    content={description}
                    events={{ change: this.handleEditorChange }}
                  />
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
