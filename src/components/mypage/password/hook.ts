import { useState } from "react";
import { useQuery } from "@apollo/client";
import { usePathname } from "next/navigation";
import { MYPAGE_FETCH_USER_LOGGED_IN } from "./queries";
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
export function useMypagePasswords() {
  const pathname = usePathname();

  const { data } = useQuery(MYPAGE_FETCH_USER_LOGGED_IN);

  const [activeIndex, setActiveIndex] = useState(0);
  const mypageNav = "/password";
  const handleClickShow = (index: number) => {
    setActiveIndex(index);
  };

  const formatNumberWithComma = (value?: number | null) => {
    return new Intl.NumberFormat("ko-KR").format(value ?? 0);
  };
  const activeNav = pathname.includes(mypageNav);

  return {
    formatNumberWithComma,
    activeNav,
    activeIndex,
    handleClickShow,
    menus,

    data,
  };
}
