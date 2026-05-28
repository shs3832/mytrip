"use client";
import BoardListBannerComponent from "@/commons/layout/banner";
import NavigationComponent from "@/commons/layout/navigation";
import { useLayoutComponent } from "@/commons/layout/hook";
import Script from "next/script";

export default function LayoutComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isHideBanner, isHideNavigation } = useLayoutComponent();

  return (
    <>
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&libraries=services&autoload=false`}
        strategy="afterInteractive"
      />
      {!isHideNavigation && <NavigationComponent />}
      {!isHideBanner && <BoardListBannerComponent />}
      <div
        className={
          !isHideNavigation ? `mt-10 mb-10 max-w-7xl mx-auto px-10` : ""
        }
      >
        {children}
      </div>
    </>
  );
}
