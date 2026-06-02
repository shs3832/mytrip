import { gql, useMutation, useQuery } from "@apollo/client";

import { useState } from "react";

import {
  CREATE_TRAVEL_PRODUCT_QUESTION_ANSWER,
  FETCH_TRAVEL_PRODUCT_QUESTION_ANSWER,
} from "./queries";

export function useProductDetail({ questionId }: { questionId: string }) {
  const [isEditQuestion, setIsEditQuestion] = useState(false);
  const [isWriteReply, setIsWriteReply] = useState(false);
  const [replyContents, setReplyContents] = useState("");

  const [createTravelproductQuestionAnswer] = useMutation(
    CREATE_TRAVEL_PRODUCT_QUESTION_ANSWER,
  );

  const { data: reply } = useQuery(FETCH_TRAVEL_PRODUCT_QUESTION_ANSWER, {
    variables: {
      travelproductQuestionId: questionId,
    },
  });

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
    reply,
  };
}
