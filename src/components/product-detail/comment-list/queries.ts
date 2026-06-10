import {
  TravelProductTravelSet,
  TravelProductUserSet,
} from "@/commons/fragments/fragments";
import { gql } from "@apollo/client";
export const CREATE_TRAVEL_PRODUCT_QUESTION_ANSWER = gql`
  mutation createTravelproductQuestionAnswer(
    $createTravelproductQuestionAnswerInput: CreateTravelproductQuestionAnswerInput!
    $travelproductQuestionId: ID!
  ) {
    createTravelproductQuestionAnswer(
      createTravelproductQuestionAnswerInput: $createTravelproductQuestionAnswerInput
      travelproductQuestionId: $travelproductQuestionId
    ) {
      _id
      contents
      travelproductQuestion {
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

export const FETCH_TRAVEL_PRODUCT_QUESTION_ANSWER = gql`
  ${TravelProductUserSet}
  query fetchTravelproductQuestionAnswersForList(
    $page: Int
    $travelproductQuestionId: ID!
  ) {
    fetchTravelproductQuestionAnswers(
      page: $page
      travelproductQuestionId: $travelproductQuestionId
    ) {
      _id
      contents
      createdAt
      updatedAt
      user {
        ...TravelProductUserSet
      }
    }
  }
`;
