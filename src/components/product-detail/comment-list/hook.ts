import { gql, useMutation } from "@apollo/client";

import { useState } from "react";

const CREATE_TRAVEL_PRODUCT_QUESTION_ANSWER = gql`
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

const FETCH_TRAVEL_PRODUCT_QUESTION_ANSWER = gql`
  query fetchTravelproductQuestionAnswers(
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

export function useProductDetail() {
  const [isEditQuestion, setIsEditQuestion] = useState(false);
  const [isWriteReply, setIsWriteReply] = useState(false);
  const [replyContents, setReplyContents] = useState("");

  const [createTravelproductQuestionAnswer] = useMutation(
    CREATE_TRAVEL_PRODUCT_QUESTION_ANSWER,
  );

  const handleReplyCancel = () => {
    // 문의 취소 버튼 클릭 시 실행되는 함수
    setIsWriteReply(false);
  };

  const handleEditQuestion = () => {
    setIsEditQuestion(true);
  };

  const handleReply = () => {
    if (isWriteReply) {
      setIsWriteReply(false);
    } else {
      setIsWriteReply(true);
    }
  };

  const handleWriteReply = async (id: string, contents: string) => {
    try {
      await createTravelproductQuestionAnswer({
        variables: {
          createTravelproductQuestionAnswerInput: {
            contents: contents,
          },
          travelproductQuestionId: id,
        },
        refetchQueries: [
          {
            query: FETCH_TRAVEL_PRODUCT_QUESTION_ANSWER,
            variables: {
              travelproductQuestionId: id,
              page: 1,
            },
          },
        ],
      });
      setIsWriteReply(false);
    } catch (error) {
      console.error("답변 등록 실패:", error);
    }
  };

  return {
    isEditQuestion,
    setIsEditQuestion,
    handleEditQuestion,
    handleReply,
    isWriteReply,
    replyContents,
    setReplyContents,
    handleWriteReply,
    handleReplyCancel,
  };
}
