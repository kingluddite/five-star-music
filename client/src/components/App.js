import React, { Component } from 'react';
import posed from 'react-pose';

import { Query } from 'react-apollo';
import { GET_ALL_SONGS } from '../queries';

// custom components
import SongItem from './Song/SongItem';
import Spinner from './Spinner';

// styles
import './App.css';

const SongList = posed.ul({
  shown: {
    x: '0%',
    staggerChildren: 100,
  },
  hidden: {
    x: '-100%',
  },
});

class App extends Component {
  state = {
    on: false,
  };

  componentDidMount = () => {
    setTimeout(this.slideIn, 200);
  };

  slideIn = () => {
    this.setState({
      on: !this.state.on,
    });
  };

  render() {
    return (
      <div className="App">
        <h1 className="main-title">
          Five Star <strong>Songs</strong>
        </h1>
        <Query query={GET_ALL_SONGS}>
          {({ data, loading, error }) => {
            if (loading) return <Spinner />;
            if (error) return <div>Error</div>;
            // console.log(data);

            const { on } = this.state;

            return (
              <SongList className="cards" pose={on ? 'shown' : 'hidden'}>
                {data.getAllSongs.map(song => (
                  <SongItem key={song._id} {...song} />
                ))}
              </SongList>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default App;
