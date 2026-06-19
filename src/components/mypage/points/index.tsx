import { MyPointsBuyingComponents } from "./buying";
import { MyPointsChargeComponents } from "./charge";
import { MyPointsUserInfo } from "../myinfo";
import { MyPointsSellingComponents } from "./selling";
import { MyPointsTabMenuComponents } from "../tab-menu";
import { MyPointsTotalComponents } from "./total";
import { IMypagePointsComponents } from "../types";
import MypageSearchComponents from "../search";

export function MypagePointsComponents({
  formatNumberWithComma,
  activeNav,
  activeIndex,
  handleClickShow,
  menus,
  getStatusColor,
  pointAllLoading,
  pointChargeLoading,
  pointBuyingLoading,
  pointSellingLoading,
  data,
  tableDataPoints,
  tableDataChargePoints,
  tableDataBuyingPoints,
  tableDataSellingPoints,
  searchKeyWord,
  setSearchKeyWord,
  handleMypageSearch,
}: IMypagePointsComponents) {
  return (
    <>
      <div className="pb-10">
        <h1 className="text-[28px] text-black font-bold">마이 페이지</h1>
      </div>

      <MyPointsUserInfo
        data={data}
        formatNumberWithComma={formatNumberWithComma}
      />

      <div className="mypage-2">
        <MyPointsTabMenuComponents
          menus={menus}
          activeIndex={activeIndex}
          handleClickShow={handleClickShow}
        />

        {activeIndex === 0 && (
          <>
            <MypageSearchComponents
              searchKeyWord={searchKeyWord}
              setSearchKeyWord={setSearchKeyWord}
              handleMypageSearch={handleMypageSearch}
            />
            <MyPointsTotalComponents
              tableDataPoints={tableDataPoints}
              pointAllLoading={pointAllLoading}
              formatNumberWithComma={formatNumberWithComma}
              getStatusColor={getStatusColor}
            />
          </>
        )}

        {activeIndex === 1 && (
          <MyPointsChargeComponents
            tableDataChargePoints={tableDataChargePoints}
            pointChargeLoading={pointChargeLoading}
            formatNumberWithComma={formatNumberWithComma}
          />
        )}
        {activeIndex === 2 && (
          <MyPointsBuyingComponents
            tableDataBuyingPoints={tableDataBuyingPoints}
            pointBuyingLoading={pointBuyingLoading}
            formatNumberWithComma={formatNumberWithComma}
            getStatusColor={getStatusColor}
          />
        )}
        {activeIndex === 3 && (
          <MyPointsSellingComponents
            tableDataSellingPoints={tableDataSellingPoints}
            pointSellingLoading={pointSellingLoading}
            formatNumberWithComma={formatNumberWithComma}
            getStatusColor={getStatusColor}
          />
        )}
      </div>
    </>
  );
}
