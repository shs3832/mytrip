"use client";
import { Button, DatePicker, Input } from "antd";
const { RangePicker } = DatePicker;
import {
  CalendarOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
export default function ProductListSearch({
  isSoldOut,
  handleTabMenu,
}: {
  isSoldOut: boolean;
  handleTabMenu: (state: boolean) => void;
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
        <RangePicker
          className="h-12 w-[340px] rounded-lg bg-gray-100 px-4"
          placeholder={["YYYY . MM . DD", "YYYY . MM . DD"]}
          suffixIcon={<CalendarOutlined className="text-lg text-gray-500" />}
        />

        <Input
          className="h-12 flex-1 rounded-lg bg-gray-100 px-4 text-base"
          placeholder="제목을 검색해 주세요."
          prefix={<SearchOutlined className="mr-2 text-xl text-black" />}
        />

        <Button
          type="primary"
          className="h-12 rounded-lg bg-black px-7 text-base font-semibold"
        >
          검색
        </Button>

        <Button
          type="primary"
          icon={<EditOutlined />}
          className="ml-auto h-12 rounded-lg bg-blue-500 px-7 text-base font-semibold"
        >
          숙박권 판매하기
        </Button>
      </div>
    </section>
  );
}
