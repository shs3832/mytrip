import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { IBoardListPaginationProps } from "@/components/boards-list/pagination/types";

export default function PaginationComponent({
  handleGoPage,
  handleNextBtn,
  handlePrevBtn,
  lastPage,
  pageGroupStart,
  paginationArray,
  currentPage,
}: IBoardListPaginationProps) {
  return (
    <>
      <div className="my-6 flex justify-center items-center">
        <button
          className="px-2 py-1 disabled:text-gray-300 disabled:cursor-not-allowed"
          onClick={handlePrevBtn}
          disabled={pageGroupStart === 1}
        >
          <LeftOutlined />
        </button>
        <div className="flex items-center">
          {paginationArray.map((_, index) => {
            return (
              index + pageGroupStart <= lastPage && (
                <button
                  key={index + "pagination"}
                  className={`px-2 py-1 ${currentPage === index + pageGroupStart && "text-blue-500"}`}
                  onClick={() => {
                    handleGoPage(index + pageGroupStart);
                  }}
                >
                  {pageGroupStart + index}
                </button>
              )
            );
          })}
        </div>
        <button
          className="px-2 py-1 disabled:text-gray-300 disabled:cursor-not-allowed"
          onClick={handleNextBtn}
          disabled={pageGroupStart + 10 > lastPage}
        >
          <RightOutlined />
        </button>
      </div>
    </>
  );
}
