"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
const bannerImages = [
  "/images/banner-image-01.png",
  "/images/banner-image-02.png",
  "/images/banner-image-03.png",
];
import styles from "./styles.module.css";
// Import Swiper React components

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

export default function BoardListBannerComponent() {
  return (
    <>
      <div className="relative overflow-hidden w-full h-[360px] mb-4">
        <Swiper
          modules={[Pagination]}
          slidesPerView={1}
          pagination={{
            clickable: true,
          }}
          loop={true}
          className="h-full"
        >
          {bannerImages.map((el) => {
            return (
              <SwiperSlide key={el} className="relative h-full">
                <Image
                  src={el}
                  alt="배너이미지"
                  fill
                  className="w-full h-[360px] object-cover"
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
}
