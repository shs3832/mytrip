"use client";
import { MypagePointsComponents } from "@/components/mypage/points";
import { useMypagePoints } from "@/components/mypage/points/hook";

export default function MyPage() {
  const {
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
  } = useMypagePoints();
  return (
    <>
      <MypagePointsComponents
        formatNumberWithComma={formatNumberWithComma}
        activeNav={activeNav}
        activeIndex={activeIndex}
        handleClickShow={handleClickShow}
        menus={menus}
        getStatusColor={getStatusColor}
        pointAllLoading={pointAllLoading}
        pointChargeLoading={pointChargeLoading}
        pointBuyingLoading={pointBuyingLoading}
        pointSellingLoading={pointSellingLoading}
        data={data}
        tableDataPoints={tableDataPoints}
        tableDataChargePoints={tableDataChargePoints}
        tableDataBuyingPoints={tableDataBuyingPoints}
        tableDataSellingPoints={tableDataSellingPoints}
      />
    </>
  );
}
