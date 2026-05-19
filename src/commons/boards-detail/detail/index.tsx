import { IBoardDetailProps } from "@/commons/boards-detail/types";
import BoardCommentWrite from "../comment-write";
import BoardCommentList from "../comment-list";
import { LikeOutlined, DislikeOutlined } from "@ant-design/icons";

export default function BoardListComponent({
  data,
  handleBackToList,
  handleEditPage,
}: IBoardDetailProps) {
  return (
    <>
      <h1 className="font-bold text-[24px] leading-8">
        {data?.fetchBoard?.title}
      </h1>
      <div className="mt-4 flex items-center border-b mb-4 pb-4 border-gray-100">
        <div className="info-container flex items-center gap-1">
          <div className="user-profile w-6 h-6">
            {/* <img src="" className="block w-full h-full rounded-[50%]" /> */}
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
          </div>
          <div className="username text-sm text-gray-700 ">
            <span>{data?.fetchBoard?.writer}</span>
          </div>
        </div>

        <div className="date-container ml-auto">
          <span className="text-sm text-gray-700">
            {String(data?.fetchBoard?.createdAt)}
          </span>
        </div>
      </div>

      <div className="contents-container ">
        <div className="flex justify-end gap-2">
          <button>
            <span className="text-[20px] text-gray-800 flex items-center justify-center">
              <LikeOutlined />
            </span>
          </button>
          <button>
            <span className="text-[24px] text-gray-800 flex items-center justify-center">
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
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
            </span>
          </button>
        </div>
        <div className="contents-section flex flex-col gap-6">
          <div className="image-block">
            <img src="https://picsum.photos/200/300" />
          </div>
          <p className="text-block text-base text-black">
            {data?.fetchBoard?.contents}
          </p>
          <div className="video-block pt-6 pb-6 bg-gray-50">
            <video>123</video>
          </div>
          <div className="like-block flex items-center justify-center gap-6">
            <div className="text-center text-base flex items-center flex-col">
              <LikeOutlined />
              <span className="text-red-500 mt-1 text-sm">
                {data?.fetchBoard?.likeCount}
              </span>
            </div>

            <div className="text-center text-base flex items-center flex-col">
              <DislikeOutlined />
              <span className="text-gray-700 mt-1 text-sm">
                {data?.fetchBoard?.dislikeCount}
              </span>
            </div>
          </div>
          <div className="link-block flex items-center justify-center gap-6">
            <button
              type="button"
              className="border rounded-lg py-2 px-4 border-black font-medium text-sm text-black"
              onClick={handleBackToList}
            >
              목록으로
            </button>
            <button
              type="button"
              className="border rounded-lg py-2 px-4 border-black font-medium text-sm text-black"
              onClick={handleEditPage}
            >
              수정하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
