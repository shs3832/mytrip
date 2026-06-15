"use client";
import PaginationComponent from "@/components/boards-list/pagination";
import { IBoardListProps } from "@/components/boards-list/list/types";
import BoardSearchComponent from "@/components/boards-list/search";
import { DeleteOutlined } from "@ant-design/icons";
import { useFragment } from "@/commons/graphql";
import { BoardsItemSetFragmentDoc } from "@/commons/graphql/graphql";

export default function BoardListComponent({
  data,
  handleViewDetail,
  handleGoPage,
  handleNextBtn,
  handlePrevBtn,
  lastPage,
  pageGroupStart,
  currentPage,
  paginationArray,
  totalCount,
  handleChangeSearchInput,
  handleSearch,
  search,
  onRangeChange,
  listLoading,
  startDate,
  endDate,
}: IBoardListProps) {
  return (
    <main className="w-full">
      <section>
        <h2 className="mb-8 text-3xl font-bold text-black">트립토크 게시판</h2>

        {listLoading && (
          <div className="w-full h-[100px] text-base text-center justify-center flex items-center">
            게시물 로딩중
          </div>
        )}
        {!listLoading && (
          <>
            <BoardSearchComponent
              handleChangeSearchInput={handleChangeSearchInput}
              handleSearch={handleSearch}
              onRangeChange={onRangeChange}
              search={search}
              startDate={startDate}
              endDate={endDate}
            />
            <div className="rounded-3xl bg-white px-12 py-10 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
              <div className="w-full text-center">
                <div>
                  <div className="flex w-full items-center px-10 pb-5 text-base font-semibold text-gray-900">
                    <span className="w-[80px] shrink-0 text-left">번호</span>
                    <span className="grow text-left">제목</span>
                    <span className="w-[140px]">작성자</span>
                    <span className="w-[160px]">날짜</span>
                    {/* <span className="w-[80px]">&nbsp;</span> */}
                  </div>
                </div>

                <div className="space-y-3">
                  {data?.fetchBoards?.map((el, index) => {
                    const board = useFragment(BoardsItemSetFragmentDoc, el);
                    return (
                      <div
                        key={`el` + index}
                        className="group flex w-full cursor-pointer items-center rounded-lg border border-gray-100 px-10 py-4 transition-colors hover:bg-gray-50"
                        onClick={(event) => {
                          event.preventDefault();
                          handleViewDetail(board._id);
                        }}
                      >
                        <span className="w-[80px] shrink-0 text-left font-light text-gray-400">
                          {totalCount - (currentPage - 1) * 10 - index}
                        </span>
                        <span className="grow truncate text-left font-medium text-gray-900">
                          {search
                            ? board.title
                                .replaceAll(search, `@##${search}@##`)
                                .split("@##")
                                .map((part, index) => {
                                  return (
                                    <span
                                      key={`${part}_${index}`}
                                      style={{
                                        color:
                                          part === search ? "red" : "black",
                                      }}
                                    >
                                      {part}
                                    </span>
                                  );
                                })
                            : board.title}
                        </span>
                        <span className="w-[140px] text-gray-600">
                          {board.writer ?? "익명"}
                        </span>
                        <span className="w-[160px] text-gray-400">
                          {new Date(String(board.createdAt))
                            .toISOString()
                            .slice(0, 10)
                            .replaceAll("-", ".")}
                        </span>
                        {/* <span className="w-[80px] text-right">
                          <span
                            onClick={(event) => {
                              event.stopPropagation();
                              handleDelete(board._id);
                            }}
                            className="invisible inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm text-red-400 group-hover:visible"
                          >
                            <DeleteOutlined />
                            삭제
                          </span>
                        </span> */}
                      </div>
                    );
                  })}
                  {data?.fetchBoards?.length === 0 && (
                    <div className="flex w-full items-center justify-center py-16">
                      <span className="text-gray-500 text-base">
                        게시물이 없습니다.
                      </span>
                    </div>
                  )}
                </div>
              </div>
              {data?.fetchBoards?.length !== 0 && (
                <PaginationComponent
                  handleNextBtn={handleNextBtn}
                  handlePrevBtn={handlePrevBtn}
                  lastPage={lastPage}
                  handleGoPage={handleGoPage}
                  pageGroupStart={pageGroupStart}
                  paginationArray={paginationArray}
                  currentPage={currentPage}
                />
              )}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
