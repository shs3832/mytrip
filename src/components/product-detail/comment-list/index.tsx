import { EnterOutlined, UserOutlined } from "@ant-design/icons";
import ProductDetailQuestionReplyComponent from "../comment-reply";
import ProductDetailQuestionWriteComponent from "../comment-write";
import { Input, Button } from "antd";

import { useProductDetail } from "./hook";
import { IReplyQuestionElement } from "../types";

const { TextArea } = Input;
export default function ProductDetailQuestionListComponent({
  question,
  handleDeleteQuestion,
  isMine,
}: {
  question: {
    _id: string;
    contents: string;
    createdAt: string;
    user: { name: string };
  };
  handleDeleteQuestion: (id: string) => void;
  isMine: boolean;
}) {
  const questionId = question._id;
  const {
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
  } = useProductDetail({ questionId });
  return (
    <>
      <div
        className="mt-5 mb-5 pb-5 border-b border-gray-200"
        key={question._id}
      >
        <div className="comment-card mb-4">
          <div>
            <div className="comment-header flex items-center">
              <div className="profile-info flex items-center mt-2">
                <span className="block w-full h-full rounded-[50%]">
                  <UserOutlined />
                </span>
                <span className="text-sm text-gray-700 ml-1 shrink-0">
                  {question.user.name}
                </span>
              </div>
              <div className="comment-btns ml-auto flex items-center gap-2">
                <button
                  onClick={() => {
                    handleEditQuestion();
                  }}
                >
                  수정
                </button>
                <button onClick={() => handleDeleteQuestion(question._id)}>
                  삭제
                </button>
              </div>
            </div>
            <div className="comment-body text-base mt-2 text-gray-800">
              {isEditQuestion ? (
                <ProductDetailQuestionWriteComponent
                  setIsEditQuestion={setIsEditQuestion}
                  isEdit={true}
                  question={question}
                />
              ) : (
                <>{question.contents}</>
              )}
            </div>
            <p className="comment-date text-xs mt-2 text-gray-700">
              {new Date(question.createdAt).toLocaleDateString()}
            </p>
            <div className="mt-2">
              {isMine && (
                <Button
                  type="default"
                  color="default"
                  variant="outlined"
                  size="small"
                  onClick={handleReply}
                >
                  답변하기
                </Button>
              )}
            </div>
            <>
              {reply?.fetchTravelproductQuestionAnswers?.map((el, index) => {
                return (
                  <ProductDetailQuestionReplyComponent
                    el={el}
                    index={index}
                    key={el._id}
                    questionId={questionId}
                  />
                );
              })}
            </>
          </div>
        </div>
        {isWriteReply && (
          <div
            className={`flex flex-col gap-4 ${(reply?.fetchTravelproductQuestionAnswers?.length ?? 0) > 0 && "pl-[48px] mt-4"}`}
          >
            <TextArea
              placeholder="답변내용을 입력해 주세요"
              rows={4}
              value={replyContents}
              onChange={(e) => setReplyContents(e.target.value)}
              className="w-full h-24 border border-gray-300 rounded-lg p-2"
            />
            <div className="flex gap-2 mt-2 justify-end">
              <Button
                type="default"
                color="default"
                variant="outlined"
                size="large"
                onClick={handleReplyCancel}
              >
                취소
              </Button>
              <Button
                type="default"
                color="default"
                variant="solid"
                size="large"
                onClick={() => {
                  handleWriteReply(questionId, replyContents);
                  setReplyContents("");
                }}
              >
                답변하기
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
