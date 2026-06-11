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
      <div className="border border-gray-300 rounded-lg p-6">
        <div className="mb-4">내 정보</div>
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-gray-100 w-8 h-8 flex items-center justify-center">
            <UserOutlined />
          </div>
          <div>이름</div>
        </div>
        <div className="flex items-center gap-4 mt-4 border-y border-gray-300 py-4">
          <span className="font-bold">23,000 P</span>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <button className="py-2 px-3 w-full flex items-center text-left rounded-lg hover:bg-gray-50">
            <span>거래내역 &amp; 북마크</span>
            <RightOutlined className="ml-auto" />
          </button>
          <button className="py-2 px-3 w-full flex items-center text-left rounded-lg hover:bg-gray-50">
            <span>포인트 사용 내역</span>
            <RightOutlined className="ml-auto" />
          </button>
          <button className="py-2 px-3 w-full flex items-center text-left rounded-lg hover:bg-gray-50">
            <span>비밀번호 변경</span>
            <RightOutlined className="ml-auto" />
          </button>
        </div>
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
          <div className="shadow-md rounded-3xl py-6 px-12 mt-5">
            <div className="w-full text-center ">
              <div>
                <div className="table-title flex items-center w-full font-medium text-base text-gray-900">
                  <span className="px-6 py-3 w-[100px] shrink-0">번호</span>
                  <span className="px-6 py-3 grow text-left">상품명</span>
                  <span className="px-6 py-3 w-1/6">판매가격</span>
                  <span className="px-6 py-3 w-1/6">날짜</span>
                  <span className="px-6 py-3 w-20">&nbsp;</span>
                </div>
              </div>
              <div>
                <div className="group flex items-center w-full my-2 rounded-md border border-gray-100 hover:bg-gray-50 cursor-pointer">
                  <span className="px-6 py-3 text-gray-500 font-light w-[100px] shrink-0">
                    123
                  </span>
                  <span className="px-6 py-3 grow text-left font-medium text-gray-900">
                    title
                  </span>
                  <span className="px-6 py-3 w-1/6">202020원</span>
                  <span className="px-6 py-3 w-1/6 text-gray-500">
                    2024-06-01
                  </span>
                  <span className="px-6 py-3 w-20 invisible group-hover:visible">
                    삭제
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mypage-2">
        <div className="mt-8 mb-4">
          <button
            className={`py-2 px-3 bg-black text-white rounded-lg font-bold`}
          >
            전체
          </button>
          <button className={`py-2 px-3 ml-4`}>충전내역</button>
          <button className={`py-2 px-3 ml-4`}>구매내역</button>
          <button className={`py-2 px-3 ml-4`}>판매내역</button>
        </div>

        <div className="my-points-all mt-5">
          <div className="shadow-md rounded-3xl py-6 px-12 mt-5">
            <div className="w-full text-center ">
              <div>
                <div className="table-title flex items-center w-full font-medium text-base text-gray-900">
                  <span className="px-6 py-3 w-1/6 shrink-0">날짜</span>
                  <span className="px-6 py-3 w-1/6">내용</span>
                  <span className="px-6 py-3 grow">거래 및 충전내역</span>
                  <span className="px-6 py-3 w-1/6">잔액</span>
                </div>
              </div>
              <div>
                <div className="group flex items-center w-full my-2 rounded-md border border-gray-100 hover:bg-gray-50 cursor-pointer">
                  <span className="px-6 py-3 text-gray-500 font-light w-[100px] shrink-0">
                    2024-06-01
                  </span>
                  <span className="px-6 py-3 grow text-left font-medium text-gray-900">
                    충전
                  </span>
                  <span className="px-6 py-3 w-1/6">202020원</span>
                  <span className="px-6 py-3 w-1/6 text-gray-500">
                    123333원
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="my-points-charge mt-5">
          <div className="shadow-md rounded-3xl py-6 px-12 mt-5">
            <div className="w-full text-center ">
              <div>
                <div className="table-title flex items-center w-full font-medium text-base text-gray-900">
                  <span className="px-6 py-3 w-1/6 shrink-0">충전일</span>
                  <span className="px-6 py-3 grow">결제 ID</span>
                  <span className="px-6 py-3 grow">충전내역</span>
                  <span className="px-6 py-3 w-1/6">거래 후 잔액</span>
                </div>
              </div>
              <div>
                <div className="group flex items-center w-full my-2 rounded-md border border-gray-100 hover:bg-gray-50 cursor-pointer">
                  <span className="px-6 py-3 text-gray-500 font-light w-[100px] shrink-0">
                    2024-06-01
                  </span>
                  <span className="px-6 py-3 grow text-left font-medium text-gray-900">
                    ㅁㄴㅇㅁㄴㅇ
                  </span>
                  <span className="px-6 py-3 w-1/6">202020원</span>
                  <span className="px-6 py-3 w-1/6 text-gray-500">
                    123333원
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="my-purchase mt-5">
          <div className="shadow-md rounded-3xl py-6 px-12 mt-5">
            <div className="w-full text-center ">
              <div>
                <div className="table-title flex items-center w-full font-medium text-base text-gray-900">
                  <span className="px-6 py-3 w-1/6 shrink-0">거래일</span>
                  <span className="px-6 py-3 grow">상품명</span>
                  <span className="px-6 py-3 grow">거래내역</span>
                  <span className="px-6 py-3 w-1/6">거래 후 잔액</span>
                  <span className="px-6 py-3 w-20">판매자</span>
                </div>
              </div>
              <div>
                <div className="group flex items-center w-full my-2 rounded-md border border-gray-100 hover:bg-gray-50 cursor-pointer">
                  <span className="px-6 py-3 text-gray-500 font-light w-[100px] shrink-0">
                    2024-06-01
                  </span>
                  <span className="px-6 py-3 grow text-left font-medium text-gray-900">
                    ㅁㄴㅇㅁㄴㅇ
                  </span>
                  <span className="px-6 py-3 w-1/6">202020원</span>
                  <span className="px-6 py-3 w-1/6 text-gray-500">
                    123333원
                  </span>
                  <span className="px-6 py-3 w-20 text-gray-500">판매자명</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="my-sell mt-5">
          <div className="shadow-md rounded-3xl py-6 px-12 mt-5">
            <div className="w-full text-center ">
              <div>
                <div className="table-title flex items-center w-full font-medium text-base text-gray-900">
                  <span className="px-6 py-3 w-1/6 shrink-0">충전일</span>
                  <span className="px-6 py-3 grow">상품 명</span>
                  <span className="px-6 py-3 grow">거래내역</span>
                  <span className="px-6 py-3 w-1/6">거래 후 잔액</span>
                </div>
              </div>
              <div>
                <div className="group flex items-center w-full my-2 rounded-md border border-gray-100 hover:bg-gray-50 cursor-pointer">
                  <span className="px-6 py-3 text-gray-500 font-light w-[100px] shrink-0">
                    2024-06-01
                  </span>
                  <span className="px-6 py-3 grow text-left font-medium text-gray-900">
                    ㅁㄴㅇㅁㄴㅇ
                  </span>
                  <span className="px-6 py-3 w-1/6">202020원</span>
                  <span className="px-6 py-3 w-1/6 text-gray-500">
                    123333원
                  </span>
                </div>
              </div>
            </div>
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
