import { IBoardDetailProps } from "@/components/boards-detail/detail/types";

import {
  LikeOutlined,
  DislikeOutlined,
  YoutubeOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";
import YouTube from "react-youtube";

export default function BoardDetailComponent({
  data,
  handleBackToList,
  handleEditPage,
  getYoutubeID,
  handleLike,
  handleDislike,
  header,
  likeCount,
  disLikeCount,
}: IBoardDetailProps) {
  const youtubeId = getYoutubeID(data?.fetchBoard.youtubeUrl ?? "");
  return (
    <>
      <h1 className="font-bold text-[24px] leading-8">
        {data?.fetchBoard?.title}
      </h1>
      {header}
      <div className="contents-container ">
        <div className="flex justify-end gap-2">
          <button>
            <span className="text-[20px] text-gray-800 flex items-center justify-center">
              <YoutubeOutlined />
            </span>
          </button>
          <button>
            <span className="text-[20px] text-gray-800 flex items-center justify-center">
              <Tooltip title={data?.fetchBoard.boardAddress?.address}>
                <ExclamationCircleOutlined />
              </Tooltip>
            </span>
          </button>
        </div>
        <div className="contents-section flex flex-col gap-6">
          <div className="image-block">
            {data?.fetchBoard?.images
              ?.filter(Boolean)
              .map((url, index) => (
                <img
                  key={index}
                  src={`https://storage.googleapis.com/${url}`}
                  className="mb-4"
                />
              )) ?? null}
          </div>
          <p className="text-block text-base text-black">
            {data?.fetchBoard?.contents}
          </p>
          {data?.fetchBoard.youtubeUrl && (
            <div className="video-block pt-6 pb-6 bg-gray-50">
              <YouTube videoId={youtubeId} />
            </div>
          )}
          <div className="like-block flex items-center justify-center gap-6">
            <div className="text-center text-base flex items-center flex-col">
              <LikeOutlined onClick={handleLike} />
              <span className="text-red-500 mt-1 text-sm">{likeCount}</span>
            </div>

            <div className="text-center text-base flex items-center flex-col">
              <DislikeOutlined onClick={handleDislike} />
              <span className="text-gray-700 mt-1 text-sm">{disLikeCount}</span>
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
