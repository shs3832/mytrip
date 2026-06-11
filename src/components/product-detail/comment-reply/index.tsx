import { EnterOutlined, UserOutlined } from "@ant-design/icons";

import ProductDetailQuestionReplyWriteComponent from "../comment-reply-write";
import { useProductCommentReply } from "./hook";
import { IReplyQuestionElement } from "../types";
export default function ProductDetailQuestionReplyComponent({
  el,
  index,
  questionId,
}: {
  el: IReplyQuestionElement;
  index: number;
  questionId: string;
}) {
  const { isReplyEdit, setIsReplyEdit, handleEditReply, handleDeleteReply } =
    useProductCommentReply({ id: el._id, questionId });

  return (
    <>
      <div className="pl-5 mt-4" key={index}>
        <div className="flex items-start gap-4">
          <EnterOutlined className="scale-x-[-1] text-sm self-start mt-1" />
          <div className="w-full">
            <div className="comment-header flex items-center">
              <div className="profile-info flex items-center ">
                <span className="block w-full h-full rounded-[50%]">
                  <UserOutlined />
                </span>
                <span className="text-sm text-gray-700 ml-1 shrink-0">
                  {el.user.name}
                </span>
              </div>
              <div className="comment-btns ml-auto flex items-center gap-2">
                <button onClick={handleEditReply}>수정</button>
                <button
                  onClick={() => {
                    handleDeleteReply(el._id);
                  }}
                >
                  삭제
                </button>
              </div>
            </div>
            <div className="comment-body text-base mt-2 text-gray-800">
              {isReplyEdit ? (
                <ProductDetailQuestionReplyWriteComponent
                  el={el}
                  handleEditReply={handleEditReply}
                  setIsReplyEdit={setIsReplyEdit}
                  questionId={questionId}
                />
              ) : (
                <>{el.contents}</>
              )}
            </div>
            <p className="comment-date text-xs mt-2 text-gray-700">
              {new Date(String(el.createdAt)).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
