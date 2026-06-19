import { useMutation, useQuery } from "@apollo/client";
import { Modal } from "antd";
import { useState } from "react";
import {
  MYPAGE_CHANGE_PASSWORD,
  MYPAGE_FETCH_USER_LOGGED_IN,
} from "../queries";

export function useMypagePasswords() {
  const { data } = useQuery(MYPAGE_FETCH_USER_LOGGED_IN);
  const [change_password] = useMutation(MYPAGE_CHANGE_PASSWORD);
  const [newPassword, setNewPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const formatNumberWithComma = (value?: number | null) => {
    return new Intl.NumberFormat("ko-KR").format(value ?? 0);
  };

  const stateCheckInput =
    newPassword.trim() !== "" && checkPassword.trim() !== "";

  const handleChangePassword = async () => {
    if (!stateCheckInput) return;
    if (newPassword.trim() !== checkPassword.trim()) {
      Modal.error({
        content: "입력하신 비밀번호가 다릅니다 다시 확인해주세요.",
      });
      return;
    }
    try {
      await change_password({
        variables: {
          password: checkPassword.trim(),
        },
      });
      Modal.success({
        title: "비밀번호 변경 완료",
        content: "비밀번호가 변경 되었습니다",
      });
      setNewPassword("");
      setCheckPassword("");
    } catch (error) {
      console.log(error);
      Modal.error({
        content: "비밀번호 변경에 실패했습니다.",
      });
    }
  };
  return {
    formatNumberWithComma,
    newPassword,
    checkPassword,
    setNewPassword,
    setCheckPassword,
    handleChangePassword,
    data,
    stateCheckInput,
  };
}
