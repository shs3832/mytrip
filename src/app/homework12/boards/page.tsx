"use client";

import useBoardList from "@/commons/boards-list/hook";
import BoardListComponent from "@/commons/boards-list";

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
