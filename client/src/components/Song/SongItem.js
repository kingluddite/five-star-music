import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class SongItem extends Component {
  static propTypes = {
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  };

  render() {
    const { _id, title } = this.props;
    return (
      <li>
        <h4>
          <Link to={`/song/${_id}`}>{title}</Link>
        </h4>
      </li>
    );
  }
}

export default SongItem;
