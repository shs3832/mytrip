"use client";
import { RightOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Input, Button, Modal } from "antd";
import { gql, useQuery } from "@apollo/client";
import { usePathname } from "next/navigation";

const MYPAGE_FETCH_USER_LOGGED_IN = gql`
  query fetchUserLoggedIn {
    fetchUserLoggedIn {
      _id
      email
      name
      userPoint {
        _id
        amount
      }
    }
  }
`;

const MYPAGE_FETCH_POINT_TRANSACTIONS = gql`
  query fetchPointTransactions($search: String, $page: Int) {
    fetchPointTransactions(search: $search, page: $page) {
      _id
      impUid
      amount
      balance
      status
      statusDetail
      travelproduct {
        _id
        name
      }
      user {
        _id
        name
        email
      }
    }
  }
`;

export default function MyPage() {
  const pathname = usePathname();
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
  const { data } = useQuery(MYPAGE_FETCH_USER_LOGGED_IN);
  const { data: dataPoints } = useQuery(MYPAGE_FETCH_POINT_TRANSACTIONS, {
    variables: {
      page: 1,
    },
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const [menu, setMenu] = useState(menus);
  const mypageNav = "/points";
  const handleClickShow = (index: number) => {
    setActiveIndex(index);
  };

  const formatNumberWithComma = (value?: number | null) => {
    return new Intl.NumberFormat("ko-KR").format(value ?? 0);
  };
  const activeNav = pathname.includes(mypageNav);

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
          <div>{data?.fetchUserLoggedIn?.name}</div>
        </div>
        <div className="flex items-center gap-4 mt-4 border-y border-gray-300 py-4">
          <span className="font-bold">
            {formatNumberWithComma(data?.fetchUserLoggedIn?.userPoint.amount)} P
          </span>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <button className="py-2 px-3 w-full flex items-center text-left rounded-lg hover:bg-gray-50">
            <span>거래내역 &amp; 북마크</span>
            <RightOutlined className="ml-auto" />
          </button>
          <button
            className={`py-2 px-3 w-full flex items-center text-left rounded-lg  ${activeNav ? "bg-gray-100" : "hover:bg-gray-50"}`}
          >
            <span>포인트 사용 내역</span>
            <RightOutlined className="ml-auto" />
          </button>
          <button className="py-2 px-3 w-full flex items-center text-left rounded-lg hover:bg-gray-50">
            <span>비밀번호 변경</span>
            <RightOutlined className="ml-auto" />
          </button>
        </div>
      </div>

      <div className="mypage-2">
        <div className="mt-8 mb-4">
          {menu.map((item, index) => {
            return (
              <button
                key={index}
                className={`py-2 px-3 ${item.label !== 0 && "ml-4"} ${activeIndex === index && "bg-black text-white rounded-lg font-bold"}`}
                onClick={() => {
                  handleClickShow(index);
                }}
              >
                {item.value}
              </button>
            );
          })}
        </div>

        {activeIndex === 0 && (
          <div className="my-points-all mt-5">
            {dataPoints?.fetchPointTransactions?.length === 0 ? (
              <p className="text-center py-10">포인트 사용내역이 없습니다</p>
            ) : (
              <div className="shadow-md rounded-3xl py-6 px-12 mt-5">
                <div className="w-full text-center ">
                  <div>
                    <div className="table-title flex items-center w-full font-medium text-base text-gray-900">
                      <span className="px-6 py-3 w-[150px] shrink-0">날짜</span>
                      <span className="px-6 py-3 grow text-left">내용</span>
                      <span className="px-6 py-3 w-1/6">거래 및 충전내역</span>
                      <span className="px-6 py-3 w-1/6">잔액</span>
                    </div>
                  </div>
                  <div>
                    <div className="group flex items-center w-full my-2 rounded-md border border-gray-100 hover:bg-gray-50 cursor-pointer">
                      <span className="px-6 py-3 text-gray-500 font-light w-[150px] shrink-0">
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
            )}
          </div>
        )}
        {activeIndex === 1 && (
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
        )}
        {activeIndex === 2 && (
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
                    <span className="px-6 py-3 w-20 text-gray-500">
                      판매자명
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeIndex === 3 && (
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
        )}
      </div>
    </>
  );
}
