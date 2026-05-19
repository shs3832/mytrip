import useBoardCommentList from "@/commons/boards-detail/comment-list/hook";
import { Rate } from "antd";

export default function BoardCommentList() {
  const { data } = useBoardCommentList();
  return (
    <>
      <div className="mt-6 pt-6 border-t">
        {data?.fetchBoardComments?.length === 0 && (
          <p className="text-center">댓글이 없습니다.</p>
        )}

        {data?.fetchBoardComments.map((el) => {
          return (
            <div
              className="comment-card mb-5 pb-5 border-b border-gray-200"
              key={`${el._id}`}
            >
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
                  <span>수정</span>
                  <span>삭제</span>
                </div>
              </div>
              <div className="comment-body text-base mt-2 text-gray-800">
                {el.contents}
              </div>
              <p className="comment-date text-xs mt-2 text-gray-700">
                {new Date(String(el.createdAt)).toISOString().slice(0, 10)}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}
