import { useState } from "react";
import {
  FETCH_TRAVEL_PRODUCT_QUESTION_ANSWER_REPLY,
  DELET_TRAVEL_PRODUCT_QUESTION_ANSWER,
} from "./queries";
import { useMutation } from "@apollo/client";

export function useProductCommentReply({
  id,
  questionId,
}: {
  id: string;
  questionId: string;
}) {
  const [isReplyEdit, setIsReplyEdit] = useState(false);
  const [deleteReply] = useMutation(DELET_TRAVEL_PRODUCT_QUESTION_ANSWER);
  const handleEditReply = () => {
    setIsReplyEdit(!isReplyEdit);
  };

  const handleDeleteReply = async (id: string) => {
    await deleteReply({
      variables: { travelproductQuestionAnswerId: id },
      refetchQueries: [
        {
          query: FETCH_TRAVEL_PRODUCT_QUESTION_ANSWER_REPLY,
          variables: { travelproductQuestionId: questionId },
        },
      ],
    });
  };
  return {
    isReplyEdit,
    setIsReplyEdit,
    handleEditReply,
    handleDeleteReply,
  };
}
