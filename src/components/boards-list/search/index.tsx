"use client";
import { Button, DatePicker, Input } from "antd";
import {
  CalendarOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { IBoardListProps } from "@/components/boards-list/list/types";
// import Link from "next/link";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

export default function BoardSearchComponent({
  handleChangeSearchInput,
  handleSearch,
  onRangeChange,
  search,
  startDate,
  endDate,
}: Pick<
  IBoardListProps,
  | "handleChangeSearchInput"
  | "handleSearch"
  | "onRangeChange"
  | "search"
  | "startDate"
  | "endDate"
>) {
  const { RangePicker } = DatePicker;
  const router = useRouter();
  const handleBoardsWrite = () => {
    router.push("/mytrip/boards/new");
  };

  return (
    <>
      <div className="mb-8 flex w-full items-center gap-4">
        <RangePicker
          className="h-12 w-[340px] rounded-lg bg-gray-100 px-4"
          placeholder={["YYYY . MM . DD", "YYYY . MM . DD"]}
          suffixIcon={<CalendarOutlined className="text-lg text-gray-500" />}
          onChange={onRangeChange}
          value={[
            startDate ? dayjs(startDate) : null,
            endDate ? dayjs(endDate) : null,
          ]}
        />
        <Input
          placeholder="제목을 검색해 주세요."
          onChange={handleChangeSearchInput}
          value={search}
          className="h-12 flex-1 rounded-lg bg-gray-100 px-4 text-base"
          prefix={<SearchOutlined className="mr-2 text-xl text-black" />}
        />
        <Button
          className="h-12 rounded-lg bg-black px-7 text-base font-semibold"
          type="primary"
          onClick={handleSearch}
        >
          검색
        </Button>
        <Button
          type="primary"
          icon={<EditOutlined />}
          className="ml-auto h-12 rounded-lg bg-blue-500 px-7 text-base font-semibold"
          onClick={handleBoardsWrite}
        >
          트립토크 등록
        </Button>
        {/* <Link
        href="/homework38/boards/new"
        className="ml-auto h-12 rounded-lg bg-blue-500 px-7 text-base font-semibold"
      >
        트립토크 등록
      </Link> */}
      </div>
    </>
  );
}
