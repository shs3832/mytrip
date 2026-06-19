import { MyPointsUserInfo } from "../myinfo";
import { IMypagePointsComponents } from "../types";
import { MyPointsTabMenuComponents } from "../tab-menu";
import { useMypageTradingHook } from "./hook";
import { MypageBookMark } from "./bookmark";
import { MypageTrading } from "./trading";
import MypageSearchComponents from "../search";

export function MypageTradingComponents({
  formatNumberWithComma,
  data,
}: Pick<IMypagePointsComponents, "data" | "formatNumberWithComma">) {
  const {
    buyData,
    bookMark,
    totalTradeCount,
    totalBookmarkCount,
    tradeHasMore,
    bookmarkHasMore,
    onTradeNext,
    onBookmarkNext,
    menus,
    activeIndex,
    handleClickShow,
    handleDeleteProduct,
    searchKeyWord,
    setSearchKeyWord,
    handleMypageSearch,
  } = useMypageTradingHook();
  return (
    <>
      <div className="pb-10">
        <h1 className="text-[28px] text-black font-bold">마이 페이지</h1>
      </div>

      <MyPointsUserInfo
        data={data}
        formatNumberWithComma={formatNumberWithComma}
      />

      <MyPointsTabMenuComponents
        menus={menus}
        activeIndex={activeIndex}
        handleClickShow={handleClickShow}
      />

      <MypageSearchComponents
        searchKeyWord={searchKeyWord}
        setSearchKeyWord={setSearchKeyWord}
        handleMypageSearch={handleMypageSearch}
      />

      {activeIndex === 0 && (
        <MypageTrading
          buyData={buyData}
          formatNumberWithComma={formatNumberWithComma}
          totalTradeCount={totalTradeCount}
          tradeHasMore={tradeHasMore}
          onTradeNext={onTradeNext}
          handleDeleteProduct={handleDeleteProduct}
        />
      )}

      {activeIndex === 1 && (
        <MypageBookMark
          bookMark={bookMark}
          formatNumberWithComma={formatNumberWithComma}
          totalBookmarkCount={totalBookmarkCount}
          bookmarkHasMore={bookmarkHasMore}
          onBookmarkNext={onBookmarkNext}
        />
      )}
    </>
  );
}
