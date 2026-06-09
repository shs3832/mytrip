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
  query fetchTravelproductForDetail($travelproductId: ID!) {
    fetchTravelproduct(travelproductId: $travelproductId) {
      _id
      name
      remarks
      price
      contents
      images
      tags
      pickedCount
      travelproductAddress {
        address
        addressDetail
        lat
        lng
        zipcode
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
      userPoint {
        _id
        amount
      }
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

export const TOGGLE_TRAVEL_PRODUCT_PICK = gql`
  mutation toggleTravelproductPick($travelproductId: ID!) {
    toggleTravelproductPick(travelproductId: $travelproductId)
  }
`;

export const CREATE_POINT_TRANSACTION_OF_BUYING_AND_SELLING = gql`
  mutation createPointTransactionOfBuyingAndSelling($useritemId: ID!) {
    createPointTransactionOfBuyingAndSelling(useritemId: $useritemId) {
      _id
    }
  }
`;

export const CREATE_POINT_TRANSACTION_OF_LOADING = gql`
  mutation createPointTransactionOfLoading($paymentId: ID!) {
    createPointTransactionOfLoading(paymentId: $paymentId) {
      _id
    }
  }
`;

export const FETCH_TRAVEL_PRODUCTS_PICKED = gql`
  query fetchTravelproductsIPicked($search: String, $page: Int) {
    fetchTravelproductsIPicked(search: $search, page: $page) {
      _id
    }
  }
`;
