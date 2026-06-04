"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

export default function ProductListBannerComponent({
  productBannerImages,
}: {
  productBannerImages: string[];
}) {
  return (
    <>
      <div className="relative overflow-hidden w-full h-[510px] mb-4">
        <Swiper
          modules={[Pagination]}
          slidesPerView={1}
          pagination={{
            clickable: true,
          }}
          loop={true}
          className="h-full"
        >
          {productBannerImages.map((el) => {
            return (
              <SwiperSlide key={el} className="relative h-full">
                <Image
                  src={el}
                  alt="배너이미지"
                  fill
                  className="w-full h-[510px] object-cover aspect-[4/3]"
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
}
