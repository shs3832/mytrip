import { Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { ISearchComponentProps } from "../types";

export default function MypageSearchComponents({
  setSearchKeyWord,
  handleMypageSearch,
  searchKeyWord,
}: ISearchComponentProps) {
  return (
    <div className="my-product mt-8">
      <div className="search flex w-1/2 justify-self-end items-center gap-3">
        <Input
          variant="borderless"
          prefix={<SearchOutlined className="mr-2 text-sm text-black" />}
          placeholder="필요한 내용을 검색해 주세요."
          className="h-[40px] flex-1 rounded-lg bg-gray-100 px-4 text-base shadow-none 
          focus-within:bg-white focus-within:ring-1 focus-within:ring-gray-300
           [&_.ant-input]:bg-transparent [&_.ant-input]:text-base [&_.ant-input]:placeholder:text-gray-400"
          onChange={(e) => {
            setSearchKeyWord(e.target.value);
          }}
          value={searchKeyWord}
        />
        <Button
          className="h-[40px] rounded-lg bg-black px-4 text-base font-bold text-white 
          hover:!bg-black hover:!text-white"
          onClick={handleMypageSearch}
        >
          검색
        </Button>
      </div>
    </div>
  );
}
