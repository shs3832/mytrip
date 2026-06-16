export default function ProductListCustomBanner() {
  return (
    <div className="mt-10 flex h-[300px] overflow-hidden rounded-2xl bg-[#d6d4bd]">
      <div className="relative w-[42%] h-full">
        <img
          src="/images/product-banner-01.jpg"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-r from-transparent to-[#d6d4bd]" />
      </div>
      <div className="flex flex-1 flex-col items-end justify-center pr-16">
        <div className="mb-4 flex gap-3">
          <span className="rounded-md bg-[#aaa789] text-[18px] px-4 py-2 text-white font-semibold">
            슬로트립 독점 숙소
          </span>
          <span className="rounded-md bg-[#aaa789] text-[18px] px-4 py-2 text-white font-semibold">
            9.24 얼리버드 오픈 예약
          </span>
        </div>

        <h2 className="text-right text-4xl font-bold leading-tight text-black">
          천만 관객이 사랑한
          <br />빌 페소 르꼬 전시회 근처 숙소 특가 예약
        </h2>
      </div>
    </div>
  );
}
