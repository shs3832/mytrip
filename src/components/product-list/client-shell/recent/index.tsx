"use client";

import { useRecentViewStore } from "@/commons/stores/addRecentViewItem";
import { useRouter } from "next/navigation";

export default function ProductListRecentBanner() {
  const router = useRouter();
  const { recentViewItems } = useRecentViewStore();
  return (
    <>
      {recentViewItems.length !== 0 && (
        <aside className="fixed bottom-5 right-5 z-50 w-[96px] rounded-xl border border-gray-300 bg-white p-3 shadow-sm">
          <h2 className="mb-4 text-center text-sm font-semibold text-black">
            최근 본 상품
          </h2>

          <div className="flex flex-col gap-4">
            {recentViewItems.map((item) => {
              const setImage =
                item.image === ""
                  ? "/images/product-01.png"
                  : `https://storage.googleapis.com/${item.image}`;
              return (
                <button
                  className="overflow-hidden rounded-lg"
                  onClick={() => {
                    router.push(`/mytrip/products/${item.id}`);
                  }}
                  key={item.id}
                >
                  <img
                    src={setImage}
                    alt="최근 본 상품"
                    className="h-[72px] w-full object-cover"
                  />
                </button>
              );
            })}
          </div>
        </aside>
      )}
    </>
  );
}
