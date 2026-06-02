import { useEffect, useState } from "react";
import { FETCH_TRAVEL_PRODUCT_QUESTION_ANSWER_REPLY } from "../comment-reply/queries";
import { useMutation } from "@apollo/client";
import { UPDATE_EDIT_REPLY_ANSWER } from "../comment-reply-write/queries";
import { Modal } from "antd";
import { IReplyQuestionElement } from "../types";

export function useProductReplyWrite({
  el,
  setIsReplyEdit,
  questionId,
}: {
  el: IReplyQuestionElement;
  setIsReplyEdit: React.Dispatch<React.SetStateAction<boolean>>;
  questionId: string;
}) {
  const [replyText, setReplyText] = useState("");
  const [edit_reply] = useMutation(UPDATE_EDIT_REPLY_ANSWER);
  const handleEditReplyAnswer = async () => {
    try {
      await edit_reply({
        variables: {
          travelproductQuestionAnswerId: el._id,
          updateTravelproductQuestionAnswerInput: {
            contents: replyText,
          },
        },
        refetchQueries: [
          {
            query: FETCH_TRAVEL_PRODUCT_QUESTION_ANSWER_REPLY,
            variables: { travelproductQuestionId: questionId },
          },
        ],
      });

      Modal.success({
        content: "답변이 수정되었습니다.",
      });
      setIsReplyEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setReplyText(el.contents);
  }, [el]);
  return { replyText, setReplyText, handleEditReplyAnswer };
}
