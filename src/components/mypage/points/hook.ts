import { useState } from "react";
import { useQuery } from "@apollo/client";
import { usePathname } from "next/navigation";
import {
  MYPAGE_FETCH_USER_LOGGED_IN,
  MYPAGE_FETCH_POINT_TRANSACTIONS,
  MYPAGE_FETCH_POINT_TRANSACTIONS_OF_LOADING,
  MYPAGE_FETCH_POINT_TRANSACTIONS_OF_BUYING,
  MYPAGE_FETCH_POINT_TRANSACTIONS_OF_SELLING,
} from "./queries";
export function useMypagePoints() {
  const pathname = usePathname();
  const menus = [
    {
      label: 0,
      value: "전체",
    },
    {
      label: 1,
      value: "충전내역",
    },
    {
      label: 2,
      value: "구매내역",
    },
    {
      label: 3,
      value: "판매내역",
    },
  ];
  const { data } = useQuery(MYPAGE_FETCH_USER_LOGGED_IN);
  const { data: dataPoints, loading: pointAllLoading } = useQuery(
    MYPAGE_FETCH_POINT_TRANSACTIONS,
    {
      variables: {
        search: "",
        page: 1,
      },
    },
  );
  const { data: dataPointsOfLoading, loading: pointChargeLoading } = useQuery(
    MYPAGE_FETCH_POINT_TRANSACTIONS_OF_LOADING,
    {
      variables: {
        search: "",
        page: 1,
      },
    },
  );

  const { data: dataPointsOfBuying, loading: pointBuyingLoading } = useQuery(
    MYPAGE_FETCH_POINT_TRANSACTIONS_OF_BUYING,
    {
      variables: {
        search: "",
        page: 1,
      },
    },
  );

  const { data: dataPointsOfSelling, loading: pointSellingLoading } = useQuery(
    MYPAGE_FETCH_POINT_TRANSACTIONS_OF_SELLING,
    {
      variables: {
        search: "",
        page: 1,
      },
    },
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const mypageNav = "/points";
  const handleClickShow = (index: number) => {
    setActiveIndex(index);
  };

  const formatNumberWithComma = (value?: number | null) => {
    return new Intl.NumberFormat("ko-KR").format(value ?? 0);
  };
  const activeNav = pathname.includes(mypageNav);

  const getStatusColor = (status: string) => {
    if (status === "충전") return "text-green-500";
    if (status === "판매") return "text-red-500";
    if (status === "구매") return "text-blue-500";
    return "text-gray-900";
  };

  const tableDataPoints = dataPoints?.fetchPointTransactions ?? [];
  const tableDataChargePoints =
    dataPointsOfLoading?.fetchPointTransactionsOfLoading ?? [];
  const tableDataBuyingPoints =
    dataPointsOfBuying?.fetchPointTransactionsOfBuying ?? [];
  const tableDataSellingPoints =
    dataPointsOfSelling?.fetchPointTransactionsOfSelling ?? [];

  return {
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
  };
}
