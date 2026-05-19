import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { IBoardListPaginationProps } from "@/commons/boards-list/pagination/types";

export default function PaginationComponent({
  handleGoPage,
  handleNextBtn,
  handlePrevBtn,
  lastPage,
  page,
  paginationArray,
  currentPage,
  setCurrentPage,
}: IBoardListPaginationProps) {
  return (
    <>
      <div className="my-6 flex justify-center items-center">
        <button
          className="px-2 py-1 disabled:text-gray-300 disabled:cursor-not-allowed"
          onClick={handlePrevBtn}
          disabled={page === 1}
        >
          <LeftOutlined />
        </button>
        <div className="flex items-center">
          {paginationArray.map((_, index) => {
            return (
              index + page <= lastPage && (
                <button
                  key={index + "pagination"}
                  className={`px-2 py-1 ${currentPage === index + page && "text-blue-500"}`}
                  onClick={() => {
                    handleGoPage(index + page);
                    setCurrentPage(index + page);
                  }}
                >
                  {page + index}
                </button>
              )
            );
          })}
        </div>
        <button
          className="px-2 py-1 disabled:text-gray-300 disabled:cursor-not-allowed"
          onClick={handleNextBtn}
          disabled={page + 10 > lastPage}
        >
          <RightOutlined />
        </button>
      </div>
    </>
  );
}
