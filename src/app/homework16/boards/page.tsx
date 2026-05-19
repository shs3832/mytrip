"use client";

import useBoardList from "@/commons/boards-list/list/hook";
import BoardListComponent from "@/commons/boards-list/list";

export default function BoardListPage() {
  const {
    data,
    handleViewDetail,
    handleDelete,
    handleGoPage,
    handleNextBtn,
    handlePrevBtn,
    lastPage,
    page,
    setPage,
    currentPage,
    setCurrentPage,
    paginationArray,
    totalCount,
  } = useBoardList();

  return (
    <>
      <BoardListComponent
        data={data}
        handleViewDetail={handleViewDetail}
        handleDelete={handleDelete}
        handleGoPage={handleGoPage}
        handleNextBtn={handleNextBtn}
        handlePrevBtn={handlePrevBtn}
        lastPage={lastPage}
        page={page}
        setPage={setPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        paginationArray={paginationArray}
        totalCount={totalCount}
      />
    </>
  );
}
