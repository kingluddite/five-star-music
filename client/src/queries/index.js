import { gql } from 'apollo-boost';

// fragments
import { songFragments } from './fragments';

// Song Queries

export const GET_ALL_SONGS = gql`
  query {
    getAllSongs {
      ...CompleteSong
    }
  }
  ${songFragments.song}
`;

export const GET_SONG = gql`
  query($_id: ObjectID!) {
    getSong(_id: $_id) {
      ...CompleteSong
    }
  }
  ${songFragments.song}
`;

// search stuff
export const SEARCH_SONGS = gql`
  query($searchTerm: String) {
    searchSongs(searchTerm: $searchTerm) {
      _id
      title
      likes
    }
  }
`;

// Song Mutations
export const ADD_SONG = gql`
  mutation(
    $title: String!
    $imageUrl: String!
    $category: String!
    $description: String
    $username: String
  ) {
    addSong(
      title: $title
      imageUrl: $imageUrl
      category: $category
      description: $description
      username: $username
    ) {
      ...CompleteSong
    }
  }
  ${songFragments.song}
`;

export const LIKE_SONG = gql`
  mutation($_id: ObjectID!, $username: String!) {
    likeSong(_id: $_id, username: $username) {
      ...LikeSong
    }
  }
  ${songFragments.like}
`;

export const UNLIKE_SONG = gql`
  mutation($_id: ObjectID!, $username: String!) {
    unlikeSong(_id: $_id, username: $username) {
      ...LikeSong
    }
  }
  ${songFragments.like}
`;

// User Queries
export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      username
      joinDate
      email
      favorites {
        _id
        title
      }
    }
  }
`;

export const GET_USER_SONGS = gql`
  query($username: String!) {
    getUserSongs(username: $username) {
      _id
      title
      imageUrl
      category
      description
      likes
    }
  }
`;

// User Mutations
export const SIGNUP_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signupUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

export const SIGNIN_USER = gql`
  mutation($username: String!, $password: String!) {
    signinUser(username: $username, password: $password) {
      token
    }
  }
`;

export const DELETE_USER_SONG = gql`
  mutation($_id: ObjectID!) {
    deleteUserSong(_id: $_id) {
      _id
    }
  }
`;

export const UPDATE_USER_SONG = gql`
  mutation(
    $_id: ObjectID!
    $title: String!
    $imageUrl: String!
    $category: String!
    $description: String
  ) {
    updateUserSong(
      _id: $_id
      title: $title
      imageUrl: $imageUrl
      category: $category
      description: $description
    ) {
      _id
      title
      imageUrl
      category
      description
      likes
    }
  }
`;
