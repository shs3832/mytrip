"use client";
import { MypageChangePasswordComponents } from "@/components/mypage/password";
import { useMypagePasswords } from "@/components/mypage/password/hook";

export default function MyPage() {
  const {
    formatNumberWithComma,
    activeNav,
    activeIndex,
    handleClickShow,
    menus,

    data,
  } = useMypagePasswords();
  return (
    <>
      <MypageChangePasswordComponents
        formatNumberWithComma={formatNumberWithComma}
        activeNav={activeNav}
        activeIndex={activeIndex}
        handleClickShow={handleClickShow}
        menus={menus}
        data={data}
      />
    </>
  );
}
