import { gql } from "@apollo/client";

export { FetchBoardCommentsDocument } from "@/commons/graphql/graphql";

export const FETCH_BOARD_COMMENTS = gql`
  query FetchBoardComments($page: Int, $boardId: ID!) {
    fetchBoardComments(page: $page, boardId: $boardId) {
      _id
      writer
      contents
      rating
      createdAt
    }
  }
`;
