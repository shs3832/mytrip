import Image from "next/image";
import Link from "next/link";
import {
  UserOutlined,
  CaretDownOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccessTokenStore } from "@/commons/stores/accessToken";
import { useLoadStore } from "@/commons/stores/load-store";
import { getAccessToken } from "@/commons/libraries/getAccessToken";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { FetchUserLoggedInDocument } from "@/commons/graphql/graphql";
import { useUserDataStore } from "@/commons/stores/userData";
import { Modal } from "antd";
import ProfileDropDown from "@/components/profile";

const LOGOUT_USER = gql`
  mutation logoutUser {
    logoutUser
  }
`;

const menus = [
  {
    label: "트립토크",
    href: "/mytrip/boards",
    activePath: "/boards",
  },
  {
    label: "숙박권구매",
    href: "/mytrip/products",
    activePath: "/products",
  },
  {
    label: "마이페이지",
    href: "/mytrip/mypage",
    activePath: "/mypage",
  },
];

export default function NavigationComponent() {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const handleGoToLogin = () => {
    const currentUrl =
      searchParams.toString().length > 0
        ? `${pathName}?${searchParams.toString()}`
        : pathName;
    router.push(`/mytrip/login?redirect=${encodeURIComponent(currentUrl)}`);
  };
  const { accessToken, setAccessToken } = useAccessTokenStore();
  const { isLoaded, setIsLoaded } = useLoadStore();
  const [userInfo] = useLazyQuery(FetchUserLoggedInDocument, {
    fetchPolicy: "network-only",
  });
  const formatNumberWithComma = (value?: number | null) => {
    return new Intl.NumberFormat("ko-KR").format(value ?? 0);
  };
  const [profileOpen, setProfileOpen] = useState(false);
  const { userData, addUserData } = useUserDataStore();
  const handleGetUserInfo = async () => {
    setProfileOpen(true);

    const { data } = await userInfo();
    if (!data?.fetchUserLoggedIn) return;
    addUserData(data?.fetchUserLoggedIn);
  };

  const handleProfileClose = () => {
    setProfileOpen(false);
  };

  const [logoutUser] = useMutation(LOGOUT_USER);
  const handleLogOut = async () => {
    try {
      await logoutUser();
      setAccessToken("");
      addUserData(null);
      setProfileOpen(false);
      Modal.success({
        content: "로그아웃 되었습니다.",
      });
    } catch (error) {
      Modal.success({
        content: "로그아웃 실패했습니다 디시시도해주세요.",
      });
    }
  };

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
        <div
          className="logo mr-6 cursor-pointer"
          onClick={() => {
            router.push("/");
          }}
        >
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
          <div className="ml-auto flex items-center shrink-0 ">
            {accessToken !== "" ? (
              <>
                <div className="relative ">
                  <div
                    className="cursor-pointer flex items-center"
                    onClick={handleGetUserInfo}
                  >
                    <div className="rounded-full bg-gray-100 w-8 h-8 flex items-center justify-center">
                      <UserOutlined />
                    </div>
                    <CaretDownOutlined className="ml-1 text-xs" />
                  </div>
                  {profileOpen && (
                    <ProfileDropDown
                      handleProfileClose={handleProfileClose}
                      handleLogOut={handleLogOut}
                      formatNumberWithComma={formatNumberWithComma}
                      userData={userData}
                    />
                  )}
                </div>
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
