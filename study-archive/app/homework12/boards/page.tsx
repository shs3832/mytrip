"use client";

import useBoardList from "@/components/boards-list/hook";
import BoardListComponent from "@/components/boards-list";

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
