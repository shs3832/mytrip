import { BoardAddressSet } from "@/commons/graphql/fragment";
import { gql } from "@apollo/client";

export const CREATE_POST = gql`
  mutation createBoard(
    $writer: String
    $password: String
    $title: String!
    $contents: String!
    $youtubeUrl: String
    $boardAddress: BoardAddressInput
    $images: [String!]
  ) {
    createBoard(
      createBoardInput: {
        writer: $writer
        password: $password
        title: $title
        contents: $contents
        youtubeUrl: $youtubeUrl
        boardAddress: $boardAddress
        images: $images
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
      images
    }
  }
`;

export const FETCH_BOARD = gql`
  ${BoardAddressSet}
  query fetchBoardWrite(
    $boardId: ID!
    $isIncludeBoardAddress: Boolean = false
  ) {
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

export const UPLOAD_FILE = gql`
  mutation uploadBoardFile($file: Upload!) {
    uploadFile(file: $file) {
      url
      _id
      size
      createdAt
      updatedAt
    }
  }
`;
