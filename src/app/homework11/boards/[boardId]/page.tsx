"use client";

import useBoardDetail from "@/components/boards-detail/hook";
import BoardListComponent from "@/components/boards-detail";

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
