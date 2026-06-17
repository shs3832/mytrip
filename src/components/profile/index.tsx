import { FetchUserLoggedInQuery } from "@/commons/graphql/graphql";
import {
  UserOutlined,
  CaretUpOutlined,
  LogoutOutlined,
  WalletOutlined,
} from "@ant-design/icons";
export default function ProfileDropDown({
  handleProfileClose,
  handleLogOut,
  formatNumberWithComma,
  userData,
}: {
  handleProfileClose: () => void;
  handleLogOut: () => void;
  formatNumberWithComma: (num?: number | null) => string;
  userData: FetchUserLoggedInQuery["fetchUserLoggedIn"] | null;
}) {
  if (!userData) return null;
  return (
    <div className="absolute right-0 top-0 z-50 w-[240px] rounded-2xl border border-gray-200 bg-white p-4 shadow-lg">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={handleProfileClose}
      >
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
            <UserOutlined className="text-base text-gray-500" />
          </div>

          <strong className="text-base font-semibold text-black">
            {userData.name}
          </strong>
        </div>

        <CaretUpOutlined className="text-sm text-black" />
      </div>

      <div className="my-4 h-px bg-gray-200" />

      <div className="flex items-center gap-2">
        <WalletOutlined className="text-base text-gray-700" />
        <strong className="text-base font-semibold text-black">
          {formatNumberWithComma(userData.userPoint?.amount) ?? 0}P
        </strong>
      </div>

      <div className="my-4 h-px bg-gray-200" />
      {/* 구현전까진 주석처리 */}
      {/* <button className="flex w-full items-center gap-2 py-2 text-left text-base text-black">
                        <ThunderboltFilled className="text-base text-gray-700" />
                        <span>포인트 충전</span>
                      </button> */}

      <button
        className="flex w-full items-center gap-2 py-2 text-left text-base text-black"
        onClick={handleLogOut}
      >
        <LogoutOutlined className="text-base text-gray-700" />
        <span>로그아웃</span>
      </button>
    </div>
  );
}
