import Image from "next/image";
import Link from "next/link";
import {
  UserOutlined,
  CaretDownOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NavigationComponent() {
  const router = useRouter();
  const handleGoToLogin = () => {
    router.push("/homework24/login");
  };
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    setToken(localStorage.getItem("token") || "");
  }, []);

  return (
    <>
      <div className="py-5 max-w-7xl mx-auto px-10 flex items-center">
        <div className="logo mr-6">
          <Image alt="로고" src="/images/logo.png" width={56} height={32} />
        </div>
        <div className="flex items-center gap-x-5">
          <Link
            href={`/`}
            className={`font-medium text-base text-gray-800 p-2 border-b-2 border-gray-700`}
          >
            트립토크
          </Link>
          <Link
            href={`/`}
            className="font-medium text-base p-2 text-gray-800 border-b-2 border-transparent"
          >
            숙박권구매
          </Link>
          <Link
            href={`/`}
            className="font-medium text-base p-2 text-gray-800 border-b-2 border-transparent"
          >
            마이페이지
          </Link>
        </div>

        <div className="ml-auto flex items-center shrink-0 cursor-pointer">
          {token !== "" ? (
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
      </div>
    </>
  );
}
