import { gql } from "@apollo/client";

export const CREATE_POST = gql`
  mutation createBoard(
    $writer: String
    $password: String
    $title: String!
    $contents: String!
    $youtubeUrl: String
    $boardAddress: BoardAddressInput
  ) {
    createBoard(
      createBoardInput: {
        writer: $writer
        password: $password
        title: $title
        contents: $contents
        youtubeUrl: $youtubeUrl
        boardAddress: $boardAddress
      }
    ) {
      _id
      writer
      title
      contents
      boardAddress {
        _id
        zipcode
        address
        addressDetail
      }
      youtubeUrl
    }
  }
`;

export const FETCH_BOARD = gql`
  query fetchBoardWrite($boardId: ID!) {
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

export const UPDATE_BOARD = gql`
  mutation updateBoard(
    $updateBoardInput: UpdateBoardInput!
    $password: String
    $boardId: ID!
  ) {
    updateBoard(
      updateBoardInput: $updateBoardInput
      password: $password
      boardId: $boardId
    ) {
      _id
      writer
      title
      contents
    }
  }
`;
