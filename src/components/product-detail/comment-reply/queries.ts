import { gql } from "@apollo/client";
export const FETCH_TRAVEL_PRODUCT_QUESTION_ANSWER_REPLY = gql`
  query fetchTravelproductQuestionAnswersForReply(
    $page: Int
    $travelproductQuestionId: ID!
  ) {
    fetchTravelproductQuestionAnswers(
      page: $page
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

export const DELET_TRAVEL_PRODUCT_QUESTION_ANSWER = gql`
  mutation deleteTravelproductQuestionAnswer(
    $travelproductQuestionAnswerId: ID!
  ) {
    deleteTravelproductQuestionAnswer(
      travelproductQuestionAnswerId: $travelproductQuestionAnswerId
    )
  }
`;
