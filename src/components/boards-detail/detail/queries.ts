import { BoardAddressSet } from "@/commons/fragments/fragments";
import { gql } from "@apollo/client";

export const FETCH_BOARD = gql`
  ${BoardAddressSet}
  query fetchBoard($boardId: ID!, $isIncludeBoardAddress: Boolean = false) {
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
      ...BoardAddressSet @include(if: $isIncludeBoardAddress)
    }
  }
`;

export const LIKE_BOARD = gql`
  mutation likeBoard($boardId: ID!) {
    likeBoard(boardId: $boardId)
  }
`;

export const DISLIKE_BOARD = gql`
  mutation dislikeBoard($boardId: ID!) {
    dislikeBoard(boardId: $boardId)
  }
`;
