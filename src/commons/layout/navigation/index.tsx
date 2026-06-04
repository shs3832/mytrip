import Image from "next/image";
import Link from "next/link";
import {
  UserOutlined,
  CaretDownOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useAccessTokenStore } from "@/commons/stores/accessToken";
import { useLoadStore } from "@/commons/stores/load-store";
import { getAccessToken } from "@/commons/libraries/getAccessToken";

export default function NavigationComponent() {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const handleGoToLogin = () => {
    const currentUrl =
      searchParams.toString().length > 0
        ? `${pathName}?${searchParams.toString()}`
        : pathName;
    router.push(`/homework31/login?redirect=${encodeURIComponent(currentUrl)}`);
  };
  const { accessToken, setAccessToken } = useAccessTokenStore();
  const { isLoaded, setIsLoaded } = useLoadStore();

  const menus = [
    {
      label: "트립토크",
      href: "/homework31/boards",
      activePath: "/boards",
    },
    {
      label: "숙박권구매",
      href: "/homework31/products",
      activePath: "/products",
    },
    {
      label: "마이페이지",
      href: "/homework31/mypage",
      activePath: "/mypage",
    },
  ];

  useEffect(() => {
    getAccessToken()
      .then((newAccessToken) => {
        if (newAccessToken) {
          setAccessToken(newAccessToken);
        }
      })
      .finally(setIsLoaded);
  }, [setAccessToken, setIsLoaded]);

  return (
    <>
      <div className="py-5 max-w-7xl mx-auto px-10 flex items-center">
        <div className="logo mr-6">
          <Image alt="로고" src="/images/logo.png" width={56} height={32} />
        </div>
        <div className="flex items-center gap-x-5">
          {menus.map((el) => {
            const isActive = pathName.includes(el.activePath);
            return (
              <Link
                key={el.label}
                href={el.href}
                className={`font-medium text-base text-gray-800 p-2 border-b-2 ${isActive ? "border-gray-700" : "border-transparent"}`}
              >
                {el.label}
              </Link>
            );
          })}
        </div>

        {isLoaded && (
          <div className="ml-auto flex items-center shrink-0 cursor-pointer">
            {accessToken !== "" ? (
              <>
                <div className="rounded-full bg-gray-100 w-8 h-8 flex items-center justify-center">
                  <UserOutlined />
                </div>
                <CaretDownOutlined className="ml-1 text-xs" />
              </>
            ) : (
              <div
                className="bg-black rounded-[100px] px-4 py-2 text-white cursor-pointer"
                onClick={handleGoToLogin}
              >
                <span className="mr-1">로그인</span>
                <RightOutlined />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
