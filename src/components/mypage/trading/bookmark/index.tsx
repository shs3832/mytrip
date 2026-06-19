import InfiniteScroll from "react-infinite-scroll-component";
import { IMypageBookmarkProps } from "../../types";
export function MypageBookMark({
  bookMark,
  formatNumberWithComma,
  totalBookmarkCount,
  bookmarkHasMore,
  onBookmarkNext,
}: {
  bookMark?: IMypageBookmarkProps;
  formatNumberWithComma: (number: number) => string;
  totalBookmarkCount: number;
  bookmarkHasMore: boolean;
  onBookmarkNext: () => void;
}) {
  return (
    <div className="bookmark">
      <div className="shadow-md rounded-3xl py-6 px-12 mt-5">
        <div className="w-full text-center ">
          <div>
            <div className="table-title flex items-center w-full font-medium text-base text-gray-900">
              <span className="px-6 py-3 w-[100px] shrink-0">번호</span>
              <span className="px-6 py-3 grow text-left">상품명</span>
              <span className="px-6 py-3 w-1/6">판매가격</span>
              <span className="px-6 py-3 w-1/6">판매자</span>
              <span className="px-6 py-3 w-1/6">날짜</span>
            </div>
          </div>
          <div id="bookmark" className="h-[450px] overflow-auto">
            <InfiniteScroll
              dataLength={bookMark?.fetchTravelproductsIPicked.length ?? 0}
              next={onBookmarkNext}
              hasMore={bookmarkHasMore}
              loader={
                (bookMark?.fetchTravelproductsIPicked.length ?? 0) > 0 ? (
                  <h4 className="text-center w-full my-10">Loading...</h4>
                ) : null
              }
              endMessage={
                <p className="text-center w-full my-10">All items loaded.</p>
              }
              scrollableTarget="bookmark"
            >
              {bookMark?.fetchTravelproductsIPicked.map((el, index: number) => {
                return (
                  <div
                    className="group flex items-center w-full my-2 rounded-md border border-gray-100 hover:bg-gray-50 cursor-pointer"
                    key={el._id}
                  >
                    <span className="px-6 py-3 text-gray-500 font-light w-[100px] shrink-0">
                      {totalBookmarkCount - index}
                    </span>
                    <span
                      className={`px-6 py-3 grow text-left font-medium  ${el.soldAt !== null ? "text-gray-400" : "text-gray-900"}`}
                    >
                      {el.name}
                      {el.soldAt !== null && (
                        <span className="text-blue-500 ml-2">판매완료</span>
                      )}
                    </span>
                    <span className="px-6 py-3 w-1/6">
                      {formatNumberWithComma(el.price)}
                    </span>
                    <span className="px-6 py-3 w-1/6 text-gray-500">
                      {el.seller.name}
                    </span>
                    <span className="px-6 py-3 w-1/6 text-gray-500">
                      {new Date(el.createdAt).toISOString().slice(0, 10)}
                    </span>
                  </div>
                );
              })}
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </div>
  );
}
