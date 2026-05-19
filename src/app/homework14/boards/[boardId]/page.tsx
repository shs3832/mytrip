"use client";

import useBoardDetail from "@/commons/boards-detail/detail/hook";
import BoardListComponent from "@/commons/boards-detail/detail";
import BoardCommentWrite from "@/commons/boards-detail/comment-write";
import BoardCommentList from "@/commons/boards-detail/comment-list";

export default function BoardsDetailPage() {
  const { data, handleBackToList, handleEditPage, getYoutubeID } =
    useBoardDetail();
  return (
    <>
      <BoardListComponent
        data={data}
        handleBackToList={handleBackToList}
        handleEditPage={handleEditPage}
        getYoutubeID={getYoutubeID}
      />
      <BoardCommentWrite />

      <BoardCommentList />
    </>
  );
}
