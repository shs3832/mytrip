"use client";

import useBoardList from "@/commons/board-list/hook";
import BoardListComponent from "@/commons/board-list";

export default function BoardListPage() {
  const { data, handleViewDetail, handleDelete } = useBoardList();

  return (
    <>
      <BoardListComponent
        data={data}
        handleViewDetail={handleViewDetail}
        handleDelete={handleDelete}
      />
    </>
  );
}
