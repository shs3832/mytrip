"use client";
import { Button, Input } from "antd";

import { EditOutlined, SearchOutlined } from "@ant-design/icons";
export default function ProductListSearch({
  isSoldOut,
  handleTabMenu,
  handleGoToCreateProduct,
  handleSearchProducts,
  search,
  setSearch,
}: {
  isSoldOut: boolean;
  handleTabMenu: (state: boolean) => void;
  handleGoToCreateProduct: () => void;
  handleSearchProducts: (value: string) => void;
  search: string;
  setSearch: (value: string) => void;
}) {
  return (
    <section className="mt-14">
      <h2 className="mb-8 text-3xl font-bold text-black">
        여기에서만 예약할 수 있는 숙소
      </h2>

      <div className="mb-7 flex items-center gap-5">
        <Button
          type="text"
          className={`h-11 rounded-lg  px-6 text-base text-gray-600 ${!isSoldOut && "font-semibold bg-black text-white"}`}
          onClick={() => {
            handleTabMenu(false);
          }}
        >
          예약 가능 숙소
        </Button>

        <Button
          type="text"
          className={`h-11 rounded-lg  px-6 text-base text-gray-600 ${isSoldOut && "font-semibold bg-black text-white"}`}
          onClick={() => {
            handleTabMenu(true);
          }}
        >
          예약 마감 숙소
        </Button>
      </div>

      <div className="flex items-center gap-4">
        {/* 날짜 선택이 api에 존재하지않으므로 구현은 하지않음 피그마엔 있으므로 우선 주석처리 */}
        {/* <RangePicker
          className="h-12 w-[340px] rounded-lg bg-gray-100 px-4"
          placeholder={["YYYY . MM . DD", "YYYY . MM . DD"]}
          suffixIcon={<CalendarOutlined className="text-lg text-gray-500" />}
        /> */}

        <Input
          className="h-12 flex-1 rounded-lg bg-gray-100 px-4 text-base"
          placeholder="제목을 검색해 주세요."
          prefix={<SearchOutlined className="mr-2 text-xl text-black" />}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          value={search}
        />

        <Button
          type="primary"
          className="h-12 rounded-lg bg-black px-7 text-base font-semibold"
          onClick={() => {
            handleSearchProducts(search);
          }}
        >
          검색
        </Button>

        <Button
          type="primary"
          icon={<EditOutlined />}
          className="ml-auto h-12 rounded-lg bg-blue-500 px-7 text-base font-semibold"
          onClick={handleGoToCreateProduct}
        >
          숙박권 판매하기
        </Button>
      </div>
    </section>
  );
}
