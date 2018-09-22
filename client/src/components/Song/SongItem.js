import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class SongItem extends Component {
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
