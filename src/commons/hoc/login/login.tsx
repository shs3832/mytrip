"use client";

import { Modal } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const loginCheck = (Component: any) => (props: any) => {
  const router = useRouter();
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      Modal.confirm({
        content: "로그인이 필요합니다.",
        onOk: () => {
          router.push("/homework25/login");
        },
      });
      return;
    }
    setCanRender(true);
  }, [router]);
  if (!canRender) return null;
  return <Component {...props} />;
};
