"use client";

import useBoardDetail from "@/commons/board-detail/hook";
import styles from "@/commons/board-detail/styles.module.css";
import BoardListComponent from "@/commons/board-detail";

export default function BoardsDetailPage() {
  const { data, handleBackToList, handleEditPage } = useBoardDetail();
  return (
    <BoardListComponent
      data={data}
      handleBackToList={handleBackToList}
      handleEditPage={handleEditPage}
    />
  );
}
