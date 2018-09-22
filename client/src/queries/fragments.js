import { gql } from 'apollo-boost';

export const songFragments = {
  song: gql`
    fragment CompleteSong on Song {
      _id
      title
      createdDate
      likes
      username
    }
  `,

  like: gql`
    fragment LikeSong on Song {
      _id
      likes
    }
  `,
};
