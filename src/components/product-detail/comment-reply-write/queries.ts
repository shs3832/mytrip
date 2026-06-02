import { gql } from "@apollo/client";
export const UPDATE_EDIT_REPLY_ANSWER = gql`
  mutation updateTravelproductQuestionAnswer(
    $travelproductQuestionAnswerId: ID!
    $updateTravelproductQuestionAnswerInput: UpdateTravelproductQuestionAnswerInput!
  ) {
    updateTravelproductQuestionAnswer(
      travelproductQuestionAnswerId: $travelproductQuestionAnswerId
      updateTravelproductQuestionAnswerInput: $updateTravelproductQuestionAnswerInput
    ) {
      _id
      contents
    }
  }
`;
