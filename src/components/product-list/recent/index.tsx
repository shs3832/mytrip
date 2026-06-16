"use client";
export default function ProductListRecentBanner() {
  return (
    <aside className="fixed bottom-5 right-5 z-50 w-[96px] rounded-xl border border-gray-300 bg-white p-3 shadow-sm">
      <h2 className="mb-4 text-center text-sm font-semibold text-black">
        최근 본 상품
      </h2>

      <div className="flex flex-col gap-4">
        <button className="overflow-hidden rounded-lg">
          <img
            src="/images/product-01.png"
            alt="최근 본 상품"
            className="h-[72px] w-full object-cover"
          />
        </button>

        <button className="overflow-hidden rounded-lg">
          <img
            src="/images/product-02.png"
            alt="최근 본 상품"
            className="h-[72px] w-full object-cover"
          />
        </button>

        <button className="overflow-hidden rounded-lg">
          <img
            src="/images/product-03.png"
            alt="최근 본 상품"
            className="h-[72px] w-full object-cover"
          />
        </button>
      </div>
    </aside>
  );
}
