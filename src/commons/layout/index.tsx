"use client";
import BoardListBannerComponent from "@/commons/layout/banner";
import NavigationComponent from "@/commons/layout/navigation";
import { useLayoutComponent } from "@/commons/layout/hook";
import Script from "next/script";
import ProductListBannerComponent from "./product-banner";
import { Suspense } from "react";
export default function LayoutComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isHideBanner, isHideNavigation, isProductBanner } =
    useLayoutComponent();
  const bannerImages = [
    "/images/banner-image-01.png",
    "/images/banner-image-02.png",
    "/images/banner-image-03.png",
  ];
  const productBannerImages = [
    "/images/banner-image-03.png",
    "/images/banner-image-02.png",
    "/images/banner-image-01.png",
  ];
  return (
    <>
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&libraries=services&autoload=false`}
        strategy="afterInteractive"
      />
      {!isHideNavigation && (
        <Suspense fallback={null}>
          <NavigationComponent />
        </Suspense>
      )}
      {!isHideBanner && (
        <BoardListBannerComponent bannerImages={bannerImages} />
      )}
      {isProductBanner && (
        <ProductListBannerComponent productBannerImages={productBannerImages} />
      )}

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
