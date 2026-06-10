import PaginationComponent from "@/components/boards-list/pagination";
import { IBoardListProps } from "@/components/boards-list/list/types";
import BoardSearchComponent from "@/components/boards-list/search";
import { DeleteOutlined, HeartOutlined, UserOutlined } from "@ant-design/icons";

const hotTalkImages = [
  "/images/product-01.png",
  "/images/product-02.png",
  "/images/product-03.png",
  "/images/product-04.png",
];

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
    <main>
      <section className="mb-14">
        <h2 className="mb-8 text-3xl font-bold text-black">
          오늘 핫한 트립토크
        </h2>
        <div className="grid grid-cols-4 gap-10">
          {data?.fetchBoards?.slice(0, 4).map((el, index) => {
            return (
              <article
                key={`hotTalk_${el._id}`}
                className="group flex cursor-pointer gap-4"
                onClick={() => {
                  handleViewDetail(el._id);
                }}
              >
                <div className="h-[132px] w-[132px] shrink-0 overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={hotTalkImages[index % hotTalkImages.length]}
                    alt="트립토크 이미지"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col">
                  <h3 className="line-clamp-2 text-base font-bold leading-relaxed text-gray-900">
                    {el.title}
                  </h3>
                  <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-gray-500">
                      <UserOutlined />
                    </span>
                    <span>{el.writer ?? "익명"}</span>
                  </div>
                  <div className="mt-auto flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1 text-red-400">
                      <HeartOutlined />
                      <span>24</span>
                    </span>
                    <span className="text-gray-500">
                      {new Date(String(el.createdAt))
                        .toISOString()
                        .slice(0, 10)
                        .replaceAll("-", ".")}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="mb-8 text-3xl font-bold text-black">트립토크 게시판</h2>
        <BoardSearchComponent
          handleChangeSearchInput={handleChangeSearchInput}
          handleSearch={handleSearch}
          onRangeChange={onRangeChange}
          search={search}
        />
        <div className="rounded-3xl bg-white px-12 py-10 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
          <div className="w-full text-center">
            <div>
              <div className="flex w-full items-center px-10 pb-5 text-base font-semibold text-gray-900">
                <span className="w-[80px] shrink-0 text-left">번호</span>
                <span className="grow text-left">제목</span>
                <span className="w-[140px]">작성자</span>
                <span className="w-[160px]">날짜</span>
                <span className="w-[80px]">&nbsp;</span>
              </div>
            </div>
            <div className="space-y-3">
              {data?.fetchBoards?.map((el, index) => {
                return (
                  <div
                    key={`el` + index}
                    className="group flex w-full cursor-pointer items-center rounded-lg border border-gray-100 px-10 py-4 transition-colors hover:bg-gray-50"
                    onClick={(event) => {
                      event.preventDefault();
                      handleViewDetail(el._id);
                    }}
                  >
                    <span className="w-[80px] shrink-0 text-left font-light text-gray-400">
                      {totalCount - (currentPage - 1) * 10 - index}
                    </span>
                    <span className="grow truncate text-left font-medium text-gray-900">
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
                    <span className="w-[140px] text-gray-600">
                      {el.writer ?? "익명"}
                    </span>
                    <span className="w-[160px] text-gray-400">
                      {new Date(String(el.createdAt))
                        .toISOString()
                        .slice(0, 10)
                        .replaceAll("-", ".")}
                    </span>
                    <span className="w-[80px] text-right">
                      <span
                        onClick={(event) => {
                          event.stopPropagation();
                          handleDelete(el._id);
                        }}
                        className="invisible inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm text-red-400 group-hover:visible"
                      >
                        <DeleteOutlined />
                        삭제
                      </span>
                    </span>
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
              page={page}
              paginationArray={paginationArray}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </div>
      </section>
    </main>
  );
}
