"use client";
import useRequireAuth from "@/commons/hooks/useRequireAuth";
import { useMypagePoints } from "@/components/mypage/points/hook";
import { MypageTradingComponents } from "@/components/mypage/trading";

export default function MyPageTradingAuth() {
  const { canRender } = useRequireAuth();

  if (!canRender) return null;
  return <MyPageTrading />;
}

function MyPageTrading() {
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
