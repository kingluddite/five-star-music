import React, { Component } from 'react';
import './App.css';

import { Query } from 'react-apollo';
import { GET_ALL_SONGS } from '../queries';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Five Star Songs</h1>
        <Query query={GET_ALL_SONGS}>
          {({ data, loading, error }) => {
            if (loading) return <div>Loading...</div>;
            if (error) return <div>Error</div>;
            console.log(data);

            return <p>Songs</p>;
          }}
        </Query>
      </div>
    );
  }
}

export default App;
