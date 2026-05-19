"use client";

import useBoardDetail from "@/commons/boards-detail/hook";
import BoardListComponent from "@/commons/boards-detail";

export default function BoardsDetailPage() {
  const { data, handleBackToList, handleEditPage, getYoutubeID } =
    useBoardDetail();
  return (
    <BoardListComponent
      data={data}
      handleBackToList={handleBackToList}
      handleEditPage={handleEditPage}
      getYoutubeID={getYoutubeID}
    />
  );
}
