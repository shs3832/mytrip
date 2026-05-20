"use client";

import useBoardDetail from "@/components/boards-detail/detail/hook";
import BoardListComponent from "@/components/boards-detail/detail";
import BoardCommentWrite from "@/components/boards-detail/comment-write";
import BoardCommentList from "@/components/boards-detail/comment-list";

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
