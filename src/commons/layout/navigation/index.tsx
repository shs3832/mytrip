import Image from "next/image";
import Link from "next/link";
import { UserOutlined, CaretDownOutlined } from "@ant-design/icons";

export default function NavigationComponent() {
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
          <div className="rounded-full bg-gray-100 w-8 h-8 flex items-center justify-center">
            <UserOutlined />
          </div>
          <CaretDownOutlined className="ml-1 text-xs" />
        </div>
      </div>
    </>
  );
}
