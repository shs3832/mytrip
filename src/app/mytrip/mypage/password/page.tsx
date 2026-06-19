"use client";
import { MypageChangePasswordComponents } from "@/components/mypage/password";
import { useMypagePasswords } from "@/components/mypage/password/hook";

export default function MyPage() {
  const {
    formatNumberWithComma,
    handleChangePassword,
    setNewPassword,
    setCheckPassword,
    data,
    stateCheckInput,
    newPassword,
    checkPassword,
  } = useMypagePasswords();
  return (
    <>
      <MypageChangePasswordComponents
        formatNumberWithComma={formatNumberWithComma}
        handleChangePassword={handleChangePassword}
        data={data}
        setNewPassword={setNewPassword}
        setCheckPassword={setCheckPassword}
        stateCheckInput={stateCheckInput}
        newPassword={newPassword}
        checkPassword={checkPassword}
      />
    </>
  );
}
