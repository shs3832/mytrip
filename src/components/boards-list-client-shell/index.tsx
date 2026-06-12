"use client";

import useBoardList from "@/components/boards-list/list/hook";
import BoardListComponent from "@/components/boards-list/list";
import { Suspense } from "react";

function BoardListPageContent() {
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
    handleChangeSearchInput,
    handleSearch,
    search,
    onRangeChange,
    listLoading,
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
        handleChangeSearchInput={handleChangeSearchInput}
        handleSearch={handleSearch}
        search={search}
        onRangeChange={onRangeChange}
        listLoading={listLoading}
      />
    </>
  );
}

export default function BoardListClientShell() {
  return (
    <Suspense fallback={null}>
      <BoardListPageContent />
    </Suspense>
  );
}
