"use client";

import { Modal } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccessTokenStore } from "@/commons/stores/accessToken";

export const loginCheck = (Component: any) => (props: any) => {
  const router = useRouter();
  const [canRender, setCanRender] = useState(false);
  const { accessToken } = useAccessTokenStore();
  useEffect(() => {
    if (!accessToken) {
      Modal.confirm({
        content: "로그인이 필요합니다.",
        onOk: () => {
          router.replace("/mytrip/login");
        },
      });
      return;
    }
    setCanRender(true);
  }, [router]);
  if (!canRender) return null;
  return <Component {...props} />;
};
