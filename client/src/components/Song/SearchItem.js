import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class SearchItem extends Component {
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
