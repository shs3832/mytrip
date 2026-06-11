"use client";
import BoardWriteComponent from "@/components/boards-write";
import { loginCheck } from "@/commons/hoc/login/login";
import { Modal } from "antd";
import { useState } from "react";
import { useRouter } from "next/navigation";

function BoardWriteModal() {
  const router = useRouter();

  const handleCancel = () => {
    router.back();
  };
  return (
    <Modal open={true} footer={null} onCancel={handleCancel}>
      <BoardWriteComponent isEdit={false} />
    </Modal>
  );
}

export default loginCheck(BoardWriteModal);
