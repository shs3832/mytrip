"use client";
import BoardListBannerComponent from "@/commons/layout/banner";
import NavigationComponent from "@/commons/layout/navigation";
import { useLayoutComponent } from "@/commons/layout/hook";

export default function LayoutComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isHideBanner } = useLayoutComponent();

  return (
    <>
      <NavigationComponent />
      {!isHideBanner && <BoardListBannerComponent />}
      <div className="mt-10 mb-10 max-w-7xl mx-auto px-10">{children}</div>
    </>
  );
}
