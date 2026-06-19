import { useState } from "react";
import { useQuery } from "@apollo/client";
import { usePathname } from "next/navigation";
import {
  MYPAGE_FETCH_USER_LOGGED_IN,
  MYPAGE_FETCH_POINT_TRANSACTIONS,
  MYPAGE_FETCH_POINT_TRANSACTIONS_OF_LOADING,
  MYPAGE_FETCH_POINT_TRANSACTIONS_OF_BUYING,
  MYPAGE_FETCH_POINT_TRANSACTIONS_OF_SELLING,
} from "../queries";
import { menus } from "../constants";
export function useMypagePoints() {
  const pathname = usePathname();
  const [searchKeyWord, setSearchKeyWord] = useState("");

  const { data } = useQuery(MYPAGE_FETCH_USER_LOGGED_IN);
  const {
    data: dataPoints,
    loading: pointAllLoading,
    refetch: refetchDataPoints,
  } = useQuery(MYPAGE_FETCH_POINT_TRANSACTIONS, {
    variables: {
      search: "",
      page: 1,
    },
  });
  const {
    data: dataPointsOfLoading,
    loading: pointChargeLoading,
    refetch: refetchDataPointsOfLoading,
  } = useQuery(MYPAGE_FETCH_POINT_TRANSACTIONS_OF_LOADING, {
    variables: {
      search: "",
      page: 1,
    },
  });

  const {
    data: dataPointsOfBuying,
    loading: pointBuyingLoading,
    refetch: refetchDataPointsOfBuying,
  } = useQuery(MYPAGE_FETCH_POINT_TRANSACTIONS_OF_BUYING, {
    variables: {
      search: "",
      page: 1,
    },
  });

  const {
    data: dataPointsOfSelling,
    loading: pointSellingLoading,
    refetch: refetchDataPointsOfSelling,
  } = useQuery(MYPAGE_FETCH_POINT_TRANSACTIONS_OF_SELLING, {
    variables: {
      search: "",
      page: 1,
    },
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const mypageNav = "/points";
  const handleClickShow = (index: number) => {
    setActiveIndex(index);
    setSearchKeyWord("");
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

  const handleMypageSearch = async () => {
    const searchData = {
      search: searchKeyWord.trim(),
      page: 1,
    };
    await refetchDataPoints(searchData);
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
    searchKeyWord,
    setSearchKeyWord,
    handleMypageSearch,
  };
}
