import { gql } from "@apollo/client";
export const FETCH_BOARDS = gql`
  query fetchBoardsLegacyList($page: Int) {
    fetchBoards(page: $page) {
      _id
      writer
      title
      createdAt
    }
  }
`;

export const DELETE_BOARD = gql`
  mutation deleteBoardLegacyList($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;
