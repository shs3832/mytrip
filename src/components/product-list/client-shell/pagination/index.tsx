import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { IPagination } from "../types";

export default function ProductListPagination({
  currentPage,
  handlePageMove,
  hasNextPage,
}: IPagination) {
  return (
    <div className="my-6 flex justify-center items-center">
      <button
        className="px-2 py-1 disabled:text-gray-300 disabled:cursor-not-allowed"
        onClick={() => {
          handlePageMove("prev");
        }}
        disabled={currentPage === 1}
      >
        <LeftOutlined />
        <span className="ml-1">이전</span>
      </button>

      <button
        className="px-2 py-1 disabled:text-gray-300 disabled:cursor-not-allowed"
        onClick={() => {
          handlePageMove("next");
        }}
        disabled={!hasNextPage}
      >
        <span className="mr-1">다음</span>
        <RightOutlined />
      </button>
    </div>
  );
}
