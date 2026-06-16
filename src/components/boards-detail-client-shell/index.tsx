"use client";

import useBoardDetail from "@/components/boards-detail/detail/hook";
import BoardDetailComponent from "@/components/boards-detail/detail";
import BoardCommentWrite from "@/components/boards-detail/comment-write";
import BoardCommentList from "@/components/boards-detail/comment-list";
import { FetchBoardQuery } from "@/commons/graphql/graphql";

export default function BoardDetailClientShell({
  data,
  header,
}: {
  data: FetchBoardQuery;
  header: React.ReactNode;
}) {
  const {
    handleBackToList,
    handleEditPage,
    getYoutubeID,
    handleLike,
    handleDislike,
    likeCount,
    disLikeCount,
    youtubeId,
  } = useBoardDetail({ data });

  return (
    <>
      <BoardDetailComponent
        data={data}
        handleBackToList={handleBackToList}
        handleEditPage={handleEditPage}
        getYoutubeID={getYoutubeID}
        handleLike={handleLike}
        handleDislike={handleDislike}
        header={header}
        likeCount={likeCount}
        disLikeCount={disLikeCount}
        youtubeId={youtubeId}
      />
      <BoardCommentWrite />

      <BoardCommentList />
    </>
  );
}
