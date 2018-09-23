import React, { Component } from 'react';
import PropTypes from 'prop-types';

// apollo
import { Mutation } from 'react-apollo';

// graphql
import { UPDATE_USER_SONG } from '../../queries';

class EditSongModal extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    song: PropTypes.object.isRequired,
  };

  render() {
    const { song, handleSubmit, handleChange, closeModal } = this.props;

    return (
      <Mutation
        mutation={UPDATE_USER_SONG}
        variables={{
          _id: song._id,
          title: song.title,
          imageUrl: song.imageUrl,
          category: song.category,
          description: song.description,
        }}
      >
        {updateUserSong => (
          <div className="modal modal-open">
            <div className="modal-inner">
              <div className="modal-content">
                <form
                  className="modal-content-inner"
                  onSubmit={event => handleSubmit(event, updateUserSong)}
                >
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    name="title"
                    onChange={handleChange}
                    value={song.title}
                  />
                  <label htmlFor="imageUrl">Song Image URL</label>
                  <input
                    type="text"
                    name="imageUrl"
                    onChange={handleChange}
                    value={song.imageUrl}
                  />
                  <label htmlFor="category">Category of Song</label>
                  <select
                    name="category"
                    onChange={handleChange}
                    value={song.category}
                  >
                    <option value="Rock">Rock</option>
                    <option value="Alt-Rock">Alt-Rock</option>
                    <option value="Country">Country</option>
                    <option value="Reggae">Reggae</option>
                  </select>
                  <label htmlFor="description">Description</label>
                  <textarea
                    name="description"
                    onChange={handleChange}
                    value={song.description}
                  />
                  <hr />
                  <div className="modal-buttons">
                    <button type="submit" className="button-primary">
                      Update
                    </button>
                    <button type="button" onClick={closeModal}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}

export default EditSongModal;
