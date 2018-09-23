import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

// react-router
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

// Apollo
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// css
import './index.css';

// custom components
import App from './components/App';
import Navbar from './components/Navbar/Navbar';

// auth
import Signin from './components/Auth/Signin';
import Signup from './components/Auth/Signup';
import withSession from './components/withSession';

// songs
import AddSong from './components/Song/AddSong';
import SongPage from './components/Song/SongPage';
import Search from './components/Song/Search';

// profile
import Profile from './components/Profile/Profile';

// Apollo client
const client = new ApolloClient({
  // uri: 'http://localhost:4444/graphql',
  uri: 'https://fivestarsongs.herokuapp.com/graphql',
  fetchOptions: {
    credentials: 'include',
  },
  request: operation => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token,
      },
    });
  },
  onError: ({ networkError }) => {
    if (networkError) {
      // console.log('Network Error', networkError);
      localStorage.setItem('token', '');
      // if (networkError.statusCode === 401) {
      //   // localStorage.setItem('token', '');
      //   localStorage.removeItem('token');
      // }
    }
  },
});

const Root = ({ refetch, session }) => (
  <Router>
    <Fragment>
      <Navbar session={session} />
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/search" component={Search} />
        <Route path="/song/add" render={() => <AddSong session={session} />} />
        <Route path="/song/:_id" component={SongPage} />

        <Route path="/profile" render={() => <Profile session={session} />} />

        <Route path="/signin" render={() => <Signin refetch={refetch} />} />
        <Route path="/signup" render={() => <Signup refetch={refetch} />} />
        <Redirect to="/" />
      </Switch>
    </Fragment>
  </Router>
);

Root.propTypes = {
  refetch: PropTypes.func,
  session: PropTypes.object,
};

Root.defaultProps = {
  refetch: undefined,
  session: null,
};

const RootWithSession = withSession(Root);

ReactDOM.render(
  <ApolloProvider client={client}>
    <RootWithSession />
  </ApolloProvider>,
  document.getElementById('root')
);
