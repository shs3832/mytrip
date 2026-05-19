"use client";

import useBoardList from "@/commons/boards-list/list/hook";
import BoardListComponent from "@/commons/boards-list/list";
import BoardListBannerComponent from "@/commons/boards-list/banner";

export default function BoardListPage() {
  const { data, handleViewDetail, handleDelete } = useBoardList();

  return (
    <>
      <BoardListBannerComponent />
      <BoardListComponent
        data={data}
        handleViewDetail={handleViewDetail}
        handleDelete={handleDelete}
      />
    </>
  );
}
