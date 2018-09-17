import { gql } from 'apollo-boost';

export const GET_ALL_SONGS = gql`
  query {
    getAllSongs {
      title
      likes
      createdDate
    }
  }
`;
