import { gql } from "@apollo/client";

export const BoardAddressSet = gql`
  fragment BoardAddressSet on Board {
    boardAddress {
      _id
      zipcode
      address
      addressDetail
    }
  }
`;

export const BoardsItemSet = gql`
  fragment BoardsItemSet on Board {
    _id
    writer
    title
    createdAt
  }
`;

export const TravelProductTravelSet = gql`
  fragment TravelProductTravelSet on Travelproduct {
    _id
  }
`;

export const TravelProductUserSet = gql`
  fragment TravelProductUserSet on User {
    _id
    name
    email
  }
`;
