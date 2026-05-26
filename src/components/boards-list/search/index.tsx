import { Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { IBoardListProps } from "@/components/boards-list/list/types";
import { DatePicker } from "antd";

export default function BoardSearchComponent({
  handleChangeSearchInput,
  handleSearch,
  onRangeChange,
}: Pick<
  IBoardListProps,
  "handleChangeSearchInput" | "handleSearch" | "onRangeChange"
>) {
  const { RangePicker } = DatePicker;

  return (
    <div className="w-full flex items-center mb-3">
      <RangePicker className="w-full" onChange={onRangeChange} />
      <Input
        placeholder="제목을 검색해 주세요"
        onChange={handleChangeSearchInput}
        className="ml-3"
      />
      <Button
        className="ml-3"
        type="primary"
        icon={<SearchOutlined />}
        onClick={handleSearch}
      >
        검색
      </Button>
      <div className="w-full flex items-center justify-end">
        <Button type="primary">등록하기</Button>
      </div>
    </div>
  );
}
