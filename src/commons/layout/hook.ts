import { usePathname } from "next/navigation";
export function useLayoutComponent() {
  const hideComponentURL = ["/new", "/edit"];
  const param = usePathname();
  const isHideBanner = hideComponentURL.some((el) => {
    return param.includes(el);
  });
  return {
    isHideBanner,
  };
}
