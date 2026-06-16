import { usePathname } from "next/navigation";
export function useLayoutComponent() {
  const hideComponentURL = [
    "/new",
    "/edit",
    "/mypage",
    "/products",
    "/login",
    "/signup",
  ];
  const showBannerComponent = ["/mytrip/products"];
  const hideNavigationURL = ["/login", "/signup"];
  const param = usePathname();
  const isHideBanner = hideComponentURL.some((el) => {
    return param.includes(el);
  });
  const isHideNavigation = hideNavigationURL.some((el) => {
    return param.includes(el);
  });
  const isProductBanner = showBannerComponent.some((el) => {
    return param === el;
  });
  return {
    isHideBanner,
    isHideNavigation,
    isProductBanner,
  };
}
