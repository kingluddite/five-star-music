import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import posed from 'react-pose';

const SongLi = posed.li({
  shown: { opacity: 1 },
  hidden: { opacity: 0 },
});

class SongItem extends Component {
  static propTypes = {
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  };

  render() {
    const { _id, title, imageUrl, category } = this.props;
    return (
      <SongLi
        style={{
          background: `url(${imageUrl}) center center / cover no-repeat`,
        }}
        className="card"
      >
        <span className={category}>{category}</span>
        <div className="card-text">
          <Link to={`/song/${_id}`}>
            <h4>{title}</h4>
          </Link>
        </div>
      </SongLi>
    );
  }
}

export default SongItem;
