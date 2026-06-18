import { Button, Input } from "antd";

export default function MypageSearchComponents() {
  return (
    <div className="my-product mt-5">
      <div className="search flex items-start gap-2 w-1/2">
        <Input placeholder="Basic usage" />
        <Button>검색</Button>
      </div>
    </div>
  );
}
