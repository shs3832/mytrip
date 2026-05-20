import { gql } from "@apollo/client";

export const FETCH_BOARD = gql`
  query fetchBoardLegacyDetail($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
      createdAt
      likeCount
      dislikeCount
      images
      youtubeUrl
      boardAddress {
        _id
        zipcode
        address
        addressDetail
      }
    }
  }
`;
