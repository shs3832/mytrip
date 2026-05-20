import { Rate } from "antd";
import { useState } from "react";
import BoardCommentWrite from "@/components/boards-detail/comment-write";
import { FetchBoardCommentsQuery } from "@/commons/graphql/graphql";

export default function BoardCommentItem({
  el,
}: {
  el: FetchBoardCommentsQuery["fetchBoardComments"][number];
}) {
  const [isCommentEdit, setIsCommentEdit] = useState(false);
  const handleCommentEdit = () => {
    setIsCommentEdit(true);
  };
  return (
    <>
      {isCommentEdit ? (
        <BoardCommentWrite
          isCommentEdit={isCommentEdit}
          setIsCommentEdit={setIsCommentEdit}
          el={el}
        />
      ) : (
        <div className="comment-card mb-5 pb-5 border-b border-gray-200">
          <div className="comment-header flex items-center">
            <div className="profile-info flex items-center mt-2">
              <span className="block w-full h-full rounded-[50%]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </span>
              <span className="text-sm text-gray-700 ml-1 shrink-0">
                {el.writer}
              </span>
              <div className="flex items-center gap-1 ml-3 shrink-0">
                <Rate value={el.rating} disabled />
              </div>
            </div>
            <div className="comment-btns ml-auto flex items-center gap-2">
              <button
                onClick={() => {
                  handleCommentEdit();
                }}
              >
                수정
              </button>
              <button>삭제</button>
            </div>
          </div>
          <div className="comment-body text-base mt-2 text-gray-800">
            {el.contents}
          </div>
          <p className="comment-date text-xs mt-2 text-gray-700">
            {new Date(String(el.createdAt)).toISOString().slice(0, 10)}
          </p>
        </div>
      )}
    </>
  );
}
