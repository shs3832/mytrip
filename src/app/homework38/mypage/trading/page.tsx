"use client";
import { useMypagePoints } from "@/components/mypage/points/hook";
import { MypageTradingComponents } from "@/components/mypage/trading";

export default function MyPage() {
  const { formatNumberWithComma, data } = useMypagePoints();
  return (
    <>
      <MypageTradingComponents
        formatNumberWithComma={formatNumberWithComma}
        data={data}
      />
    </>
  );
}
