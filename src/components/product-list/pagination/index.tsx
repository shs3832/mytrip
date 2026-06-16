import { LeftOutlined, RightOutlined } from "@ant-design/icons";

export default function ProductListPagination() {
  return (
    <div className="my-6 flex justify-center items-center">
      <button className="px-2 py-1 disabled:text-gray-300 disabled:cursor-not-allowed">
        <LeftOutlined />
      </button>
      <div className="flex items-center">
        <button className={`px-2 py-1 ${"text-blue-500"}`}>1</button>
      </div>
      <button className="px-2 py-1 disabled:text-gray-300 disabled:cursor-not-allowed">
        <RightOutlined />
      </button>
    </div>
  );
}
