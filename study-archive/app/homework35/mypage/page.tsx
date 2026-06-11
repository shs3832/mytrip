"use client";
import { RightOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Input, Button, Modal } from "antd";

export default function MyPage() {
  const [isMyProduct, setIsMyProduct] = useState(true);
  const [isBookMark, setIsBookMark] = useState(false);
  const handlePasswordChange = () => {
    Modal.success({
      title: "비밀번호 변경 완료",
      content: "비밀번호를 변경 되었습니다",
    });
  };
  return (
    <>
      <div className="py-10">
        <h1 className="text-[28px] text-black font-bold">마이 페이지</h1>
      </div>

      <div className="mypage-1">
        <div className="mt-8 mb-4">
          <button
            className={`py-2 px-3 ${isMyProduct && `bg-black text-white rounded-lg font-bold`}`}
          >
            나의 상품
          </button>
          <button
            className={`py-2 px-3 ml-4 ${isBookMark && `bg-black text-white rounded-lg font-bold`}`}
          >
            북마크
          </button>
        </div>

        <div className="my-product mt-5">
          <div className="search flex items-start gap-2 w-1/2">
            <Input placeholder="Basic usage" />
            <Button>검색</Button>
          </div>
        </div>
      </div>

      <div className="mypage-3">
        <h3 className="font-bold">비밀번호 변경</h3>
        <div className="flex flex-col gap-4 mt-4">
          <div>
            <span className="flex items-center gap-1">
              새 비밀번호 <small className="text-red-500 self-start">*</small>
            </span>
            <Input.Password placeholder="새 비밀번호" />
          </div>
          <div>
            <span className="flex items-center gap-1">
              새 비밀번호 확인
              <small className="text-red-500 self-start">*</small>
            </span>
            <Input.Password placeholder="새 비밀번호 확인" />
          </div>
          <Button
            type="primary"
            size="large"
            className="w-auto ml-auto"
            onClick={handlePasswordChange}
          >
            비밀번호 변경
          </Button>
        </div>
      </div>
    </>
  );
}
