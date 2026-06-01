import { gql } from "@apollo/client";

export const CREATE_TRAVEL_PRODUCT_QUESTION = gql`
  mutation createTravelproductQuestion(
    $createTravelproductQuestionInput: CreateTravelproductQuestionInput!
    $travelproductId: ID!
  ) {
    createTravelproductQuestion(
      createTravelproductQuestionInput: $createTravelproductQuestionInput
      travelproductId: $travelproductId
    ) {
      _id
      contents
      travelproduct {
        _id
      }
      createdAt
      updatedAt
      user {
        _id
        name
        email
      }
    }
  }
`;

export const FETCH_TRAVEL_PRODUCT_QUESTIONS = gql`
  query fetchTravelproductQuestions($page: Int, $travelproductId: ID!) {
    fetchTravelproductQuestions(
      page: $page
      travelproductId: $travelproductId
    ) {
      _id
      contents
      travelproduct {
        _id
      }
      createdAt
      updatedAt
      user {
        _id
        name
        email
      }
    }
  }
`;

export const FETCH_TRAVEL_PRODUCT = gql`
  query fetchTravelproduct($travelproductId: ID!) {
    fetchTravelproduct(travelproductId: $travelproductId) {
      _id
      name
      remarks
      price
      contents
      images
      tags
      travelproductAddress {
        address
        addressDetail
        lat
        lng
      }
      buyer {
        _id
        name
        email
      }
      seller {
        _id
        name
        email
      }
    }
  }
`;

export const FETCH_USER_LOGGED_IN = gql`
  query fetchUserLoggedIn {
    fetchUserLoggedIn {
      _id
      email
      name
    }
  }
`;

export const DELETE_TRAVEL_PRODUCT_QUESTION = gql`
  mutation deleteTravelproductQuestion($travelproductQuestionId: ID!) {
    deleteTravelproductQuestion(
      travelproductQuestionId: $travelproductQuestionId
    )
  }
`;

export const UPDATE_TRAVEL_PRODUCT_QUESTION = gql`
  mutation updateTravelproductQuestion(
    $travelproductQuestionId: ID!
    $updateTravelproductQuestionInput: UpdateTravelproductQuestionInput!
  ) {
    updateTravelproductQuestion(
      travelproductQuestionId: $travelproductQuestionId
      updateTravelproductQuestionInput: $updateTravelproductQuestionInput
    ) {
      _id
      contents
      travelproduct {
        _id
      }
      createdAt
      updatedAt
      user {
        _id
        name
        email
      }
    }
  }
`;
