import PaginationComponent from "@/components/boards-list/pagination";
import { IBoardListProps } from "@/components/boards-list/list/types";
import BoardSearchComponent from "@/components/boards-list/search";

export default function BoardListComponent({
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
}: IBoardListProps) {
  return (
    <>
      <BoardSearchComponent
        handleChangeSearchInput={handleChangeSearchInput}
        handleSearch={handleSearch}
        onRangeChange={onRangeChange}
      />
      <div className="shadow-md rounded-3xl py-6 px-12 ">
        <div className="w-full text-center ">
          <div>
            <div className="table-title flex items-center w-full font-medium text-base text-gray-900">
              <span className="px-6 py-3 w-[100px] shrink-0">번호</span>
              <span className="px-6 py-3 grow text-left">제목</span>
              <span className="px-6 py-3 w-1/6">작성자</span>
              <span className="px-6 py-3 w-1/6">날짜</span>
              <span className="px-6 py-3 w-20">&nbsp;</span>
            </div>
          </div>
          <div>
            {data?.fetchBoards?.map((el, index) => {
              return (
                <div
                  key={`el` + index}
                  className="group flex items-center w-full my-2 rounded-md border border-gray-100 hover:bg-gray-50 cursor-pointer"
                  onClick={(event) => {
                    event.preventDefault();
                    handleViewDetail(el._id);
                  }}
                >
                  <span className="px-6 py-3 text-gray-500 font-light w-[100px] shrink-0">
                    {totalCount - (currentPage - 1) * 10 - index}
                  </span>
                  <span className="px-6 py-3 grow text-left font-medium text-gray-900">
                    {search
                      ? el.title
                          .replaceAll(search, `@##${search}@##`)
                          .split("@##")
                          .map((part, index) => {
                            return (
                              <span
                                key={`${part}_${index}`}
                                style={{
                                  color: part === search ? "red" : "black",
                                }}
                              >
                                {part}
                              </span>
                            );
                          })
                      : el.title}
                  </span>
                  <span className="px-6 py-3 w-1/6">{el.writer}</span>
                  <span className="px-6 py-3 w-1/6 text-gray-500">
                    {new Date(String(el.createdAt)).toISOString().slice(0, 10)}
                  </span>
                  <span className="px-6 py-3 w-20">
                    <span
                      onClick={(event) => {
                        event.stopPropagation();
                        handleDelete(el._id);
                      }}
                      className="invisible inline-block group-hover:visible"
                    >
                      삭제
                    </span>
                  </span>
                </div>
              );
            })}
            {data?.fetchBoards?.length === 0 && (
              <div className="flex items-center justify-center w-full py-10">
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
            page={page}
            paginationArray={paginationArray}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </>
  );
}
