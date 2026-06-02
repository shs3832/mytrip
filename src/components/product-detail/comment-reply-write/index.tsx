import { gql } from "@apollo/client";
import { Input, Button } from "antd";
import { useProductReplyWrite } from "./hook";
import { IReplyQuestionElement } from "../types";
const { TextArea } = Input;

export default function ProductDetailQuestionReplyWriteComponent({
  el,
  handleEditReply,
  setIsReplyEdit,
  questionId,
}: {
  el: IReplyQuestionElement;
  handleEditReply: () => void;
  setIsReplyEdit: React.Dispatch<React.SetStateAction<boolean>>;
  questionId: string;
}) {
  const { replyText, setReplyText, handleEditReplyAnswer } =
    useProductReplyWrite({ el, setIsReplyEdit, questionId });
  return (
    <>
      <div className="flex flex-col gap-4">
        <TextArea
          placeholder="내용을 입력해주세요."
          rows={4}
          className="w-full h-24 border border-gray-300 rounded-lg p-2"
          id="reply"
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
        />
        <div className="flex gap-2 mt-2 items-center justify-end">
          <Button
            type="default"
            color="default"
            variant="outlined"
            size="large"
            className="ml-auto"
            onClick={handleEditReply}
          >
            취소
          </Button>

          <Button type="primary" size="large" onClick={handleEditReplyAnswer}>
            답변수정
          </Button>
        </div>
      </div>
    </>
  );
}
