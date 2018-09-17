import { gql } from 'apollo-boost';

// Song Queries

export const GET_ALL_SONGS = gql`
  query {
    getAllSongs {
      title
      likes
      createdDate
    }
  }
`;

// Song Mutations

// User Queries

// User Mutations
export const SIGNUP_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signupUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`;
