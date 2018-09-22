import React, { Component } from 'react';

// apollo
import { ApolloConsumer } from 'react-apollo';
import { SEARCH_SONGS } from '../../queries';

// custom components
import SearchItem from './SearchItem';

export class Search extends Component {
  state = {
    searchResults: [],
  };

  handleChange = ({ searchSongs }) => {
    // console.log(data);
    this.setState({
      searchResults: searchSongs,
    });
  };

  render() {
    const { searchResults } = this.state;

    return (
      <ApolloConsumer>
        {client => {
          return (
            <div className="App">
              <input
                type="search"
                placeholder="Search for Songs"
                name="search"
                id="search"
                onChange={async event => {
                  event.persist();
                  const { data } = await client.query({
                    query: SEARCH_SONGS,
                    variables: { searchTerm: event.target.value },
                  });
                  this.handleChange(data);
                }}
              />
              <ul>
                {searchResults.map(song => (
                  <SearchItem key={song._id} {...song} />
                ))}
              </ul>
            </div>
          );
        }}
      </ApolloConsumer>
    );
  }
}

export default Search;
