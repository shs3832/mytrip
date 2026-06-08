import { RightOutlined, UserOutlined } from "@ant-design/icons";
import { IMypagePointsComponents } from "../types";
import { usePathname, useRouter } from "next/navigation";

export function MyPointsUserInfo({
  data,
  formatNumberWithComma,
}: Pick<IMypagePointsComponents, "data" | "formatNumberWithComma">) {
  const router = useRouter();
  const pathname = usePathname();

  const mypageMenus = [
    {
      title: "거래내역 & 북마크",
      path: "/trading",
      activeNav: "trading",
    },
    {
      title: "포인트 사용 내역",
      path: "/points",
      activeNav: "points",
    },
    {
      title: "비밀번호 변경",
      path: "/password",
      activeNav: "password",
    },
  ];
  const mypageNav = pathname.split("/").at(-1);
  // console.log(mypageMenus);
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
        {mypageMenus.map((menu, index) => {
          const isActive = pathname.includes(menu.activeNav);
          return (
            <button
              key={index}
              className={`py-2 px-3 w-full flex items-center text-left rounded-lg  ${isActive ? "bg-gray-100" : "hover:bg-gray-50"}`}
              onClick={() => {
                router.push(menu.path);
              }}
            >
              <span>{menu.title}</span>
              <RightOutlined className="ml-auto" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
