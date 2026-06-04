import { RightOutlined, UserOutlined } from "@ant-design/icons";
import { IMypagePointsComponents } from "../types";

export function MyPointsUserInfo({
  data,
  formatNumberWithComma,
  activeNav,
}: Pick<
  IMypagePointsComponents,
  "data" | "formatNumberWithComma" | "activeNav"
>) {
  return (
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
  );
}
