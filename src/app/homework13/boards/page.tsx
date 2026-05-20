"use client";

import useBoardList from "@/components/boards-list/list/hook";
import BoardListComponent from "@/components/boards-list/list";
import BoardListBannerComponent from "@/commons/layout/banner";

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
      <BoardListBannerComponent />
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
