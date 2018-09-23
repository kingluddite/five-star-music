import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class SearchItem extends Component {
  static propTypes = {
    _id: PropTypes.string,
    title: PropTypes.string,
    likes: PropTypes.number,
  };

  static defaultProps = {
    _id: '',
    title: '',
    likes: 0,
  };

  render() {
    const { _id, title, likes } = this.props;
    return (
      <li>
        <Link to={`/song/${_id}`}>
          <h4>{title}</h4>
        </Link>
        <p>{likes}</p>
      </li>
    );
  }
}

export default SearchItem;
